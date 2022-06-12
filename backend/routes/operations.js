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
    const accountFrom = await Account.findById(from)
    const accountTo = await Account.findById(to)

    accountFrom.credit.push(newOperation)
    accountTo.debit.push(newOperation)

    accountTo.save()
    accountFrom.save()
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

router.route('/delete/:operationId').delete((req, res) => {
    Operation.findByIdAndDelete(req.params.operationId)
        .then(() => { res.json('Operation deleted!')})
        .catch(err => res.status(400).json('Error' + err))

        //to sie pozniej doda bo z tego co czytalam to mongodb chyba nie wspiera kaskadowego usuwania :<<<
    // Account.debit.findByIdAndDelete(req.params.operationId)
    //     .then(() => { res.json('Operation deleted!')})
    //     .catch(err => res.status(400).json('Error' + err))
    // Account.credit.findByIdAndDelete(req.params.operationId)
    //     .then(() => { res.json('Operation deleted!')})
    //     .catch(err => res.status(400).json('Error' + err))
        
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