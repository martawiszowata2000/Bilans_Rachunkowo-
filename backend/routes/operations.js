const router = require('express').Router()
const Operation = require('../models/operation.model')
const Account = require('../models/account.model')
const Balance = require('../models/balance.model')

router.route('/').get((req, res) => {
    Operation.find()
        .then(balance_operation => res.json(balance_operation))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:operationId').get((req, res) => {
    Operation.findById(req.params.operationId)
        .then(balance_operation => res.json(balance_operation))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add/:balanceId').post(async (req, res) => {
    const operationType = req.body.type
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount
    const newOperation = new Operation({operationType, from, to, amount})


    const balance = await Balance.findById(req.params.balanceId)
    //accountFrom.credit.push(newOperation)
    //accountTo.debit.push(newOperation)

    //jesli konto 'z' jest aktywne
    if (newOperation.operationType === 'active' || newOperation.operationType === 'active_passive_down') {
        const accountFrom = balance.accountActive.findById(from)
        balance.accountsActive.accountFrom.credit.push(newOperation)
    }
    //jesli konto 'z' jest pasywne
    else{
        const accountFrom = balance.accountPassive.findById(from)
        balance.accountsPassive.accountFrom.credit.push(newOperation)
    }
    //jesli konto 'do' jest aktywne
    if(newOperation.operationType === 'active' || newOperation.operationType === 'active_passive_up'){
        const accountTo = balance.accountActive.findById(to)
        balance.accountsActive.accountTo.debit.push(newOperation)
    }
    //jesli konto 'do' jest pasywne
    else{
        const accountTo = balance.accountPassive.findById(to)
        balance.accountsPassive.accountTo.debit.push(newOperation)
    }

    updateBalanceAccounts(req.params.balanceId)
    balance.save()
    newOperation.save()
        .then(() => res.json('Operation added!'))
        .catch(err => res.status(400).json('Error: ' + err))

})

router.route('/update/:operationId').put((req, res) => {
    Operation.findByIdAndUpdate(req.params.operationId, req.body)
        .then(() => { res.json('Operation updated!')})
        .catch(err => res.status(400).json('Error' + err))
})

// router.route('/delete/:operationId').delete(async (req, res) => {
//     const operation = Operation.findByIdAndDelete(req.params.operationId)
//         .then(() => {
//             res.json('Operation deleted!')
//         })
//         .catch(err => res.status(400).json('Error' + err))

//     //jesli konto 'z' jest aktywne
//     if (operation.operationType === 'active' || operation.operationType === 'active_passive_down') {
//         const accountFrom = await Account.findById(operation.from)
//         accountFrom.credit.findByIdAndDelete(req.params.operationId)
//         accountFrom.save()


//         // Account.debit.findByIdAndDelete(req.params.operationId)
//         //     .then(() => {
//         //         res.json('Operation deleted!')
//         //     })
//         //     .catch(err => res.status(400).json('Error' + err))
//     }
//     //jesli konto 'z' jest pasywne
//     else {
//         const accountFrom = await Account.findById(operation.from)
//         accountFrom.debit.findByIdAndDelete(req.params.operationId)
//         accountFrom.save()
//     }
//     //jesli konto 'do' jest aktywne
//     if(operation.operationType === 'active' || operation.operationType === 'active_passive_up'){
//         const accountTo = await Account.findById(operation.to)
//         accountTo.debit.findByIdAndDelete(req.params.operationId)
//         accountTo.save()
//     }
//     //jesli konto 'do' jest pasywne
//     else {
//         const accountTo = await Account.findById(operation.to)
//         accountTo.debit.findByIdAndDelete(req.params.operationId)
//         accountTo.save()
    }
        // Account.credit.findByIdAndDelete(req.params.operationId)
    //     .then(() => { res.json('Operation deleted!')})
    //     .catch(err => res.status(400).json('Error' + err))

    router.route('/delete/:balanceId/:accountId/:operationId').delete((req, res) => {
    const balance = Balance.findById(req.params.balanceId)
    const account = balance.accountsActive.find(account => account._id === req.params.accountId) || 
        balance.accountsPassive.find(account => account._id === req.params.accountId)
    console.log(account)
    account.debit = account.debit.filter(op => op._id !== req.params.operationId)
    account.credit = account.credit.filter(op => op._id !== req.params.operationId)

    balance.accountsActive.find(account => account._id === req.params.accountId) ?
    balance.accountsActive.find(account => account._id === req.params.accountId) = account
    : balance.accountsPassive.find(account => account._id === req.params.accountId) = account

    balance.save()
        .then(() => res.json("Operation deleted!"))
        .catch(err => res.status(400).json('Error' + err))
})

async function  updateBalanceAccounts(balanceId) {
    //bierzemy konta z bilansu i tworzymy tymczasowa tablice kont
    //posortowana po dlugosci sciezki malejaco
       const balance = await Balance.findById(balanceId)

    await balance.accountsActive.reduce(async (promise, account) => {
        await promise
        await updateAccount(account._id, balance.accountsActive)
    }, Promise.resolve())

    //analogicznie dla pasywnych o ile aktywne dzialaja hehe

    //zwracamy bilans z zaktualizowanymi kontami, trzeba go pozniej zapisac do bazy
    balance.save()
}

async function updateAccount(accountId, accountsActive) {
    var account = await Account.findById(accountId)
    //sumujemy tylko operacje danego konta
    var sumCredit = 0
    var sumDebit = 0
    account.credit.forEach(op => {
        sumCredit += op.amount
    });
    account.debit.forEach(op => {
        sumDebit += op.amount
    });
    //aktualizujemy saldo konta (debit, credit, initilaBalance)
    account.balance = +(account.initialBalance + sumCredit - sumDebit)
    // console.log(account.balance)

    //tworzymy tablice zagniezdzonych kont
    var nestedAccounts = accountsActive.filter(account => account.path.startsWith(account.path) && 
    account.path.startsWith(account.path).length > account.path.length)

    //jezeli ma zagniezdzone konta to sumujemy ich salda i dodajemy do salda konta
    if(nestedAccounts.length > 0) {
        account.balance += nestedAccounts.reduce((a,b) => a.balance + b.balance,0) 
    }    
    
    account.save()
    return account
}

module.exports = router