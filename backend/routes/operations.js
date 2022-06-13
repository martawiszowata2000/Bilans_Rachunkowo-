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
    const operationType = req.body.operationType
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount
    const newOperation = new Operation({operationType, from, to, amount})


    var balance = await Balance.findById(req.params.balanceId)
    //accountFrom.credit.push(newOperation)
    //accountTo.debit.push(newOperation)
    // console.log(newOperation)
    //jesli konto 'z' jest aktywne
    //jesli konto 'z' jest aktywne
    if (operationType === 'active' || operationType === 'active_passive_down') {
        balance.accountsActive.map(account => {
            if(account._id.toString() == from){
                account.credit.push(newOperation)
            }
        })
    }
    //jesli konto 'z' jest pasywne
    else {
        balance.accountsPassive.map(account => {
            if(account._id.toString() == from){
                account.credit.push(newOperation)
            }
        })
    }
    //jesli konto 'do' jest aktywne
    if(operationType === 'active' || operationType === 'active_passive_up'){
        balance.accountsActive.map(account => {
            if(account._id.toString() == to){
                account.debit.push(newOperation)
            }
        })
    }
    //jesli konto 'do' jest pasywne
    else{
        balance.accountsPassive.map(account => {
            if(account._id.toString() == to){
                account.debit.push(newOperation)
            }
        })
    }

    balance = updateBalanceAccounts(balance)
    Balance.findByIdAndUpdate(balance._id.toString(), balance)
        .then((res.json(balance)))
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

function  updateBalanceAccounts(balance) {


    balance.accountsActive.map(account => {
        var nestedAccounts = balance.accountsActive.filter(account => account.path.startsWith(account.path) && 
        account.path.startsWith(account.path).length > account.path.length)
        account = updateAccount(account, nestedAccounts)
        return account
    })
    balance.accountsPassive.map(account => {
        var nestedAccounts = balance.accountsPassive.filter(account => account.path.startsWith(account.path) && 
        account.path.startsWith(account.path).length > account.path.length)
        account = updateAccount(account, nestedAccounts)
        return account
    })

    //zwracamy bilans z zaktualizowanymi kontami, trzeba go pozniej zapisac do bazy
    return balance
}

function updateAccount(account, nestedAccounts) {
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
    account.balance = +(account.initialBalance + Math.abs(sumCredit - sumDebit))

    //jezeli ma zagniezdzone konta to sumujemy ich salda i dodajemy do salda konta
    if(nestedAccounts.length > 0) {
        account.balance += nestedAccounts.reduce((a,b) => a.balance + b.balance,0) 
    }    
    return account
}

module.exports = router