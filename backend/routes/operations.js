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
    const createdAt = req.body.createdAt
    const newOperation = new Operation({operationType, from, to, amount, createdAt})

    var balance = await Balance.findById(req.params.balanceId)

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

router.route('/update/:operationId').put(async (req, res) => {
    var balance = await Balance.findById(req.body.balanceId)
    const operationType = req.body.operation.operationType
    const from = req.body.operation.from
    const to = req.body.operation.to
    const amount = req.body.operation.amount
    const operation = req.body.operation
    //jesli konto 'z' jest aktywne
    if (operationType === 'active' || operationType === 'active_passive_down') {
        balance.accountsActive.map(account => {
            if(account._id.toString() == from){
                const index = account.credit.findIndex(op => op._id.toString() == req.params.operationId)
                account.credit[index] = operation
             return account
            }
        })
    }
    //jesli konto 'z' jest pasywne
    else {
        balance.accountsPassive.map(account => {
            if(account._id.toString() == from){
                const index = account.credit.findIndex(op => op._id.toString() == req.params.operationId)
                account.credit[index] = operation
                return account
            }
        })
    }
    //jesli konto 'do' jest aktywne
    if(operationType === 'active' || operationType === 'active_passive_up'){
        balance.accountsActive.map(account => {
            if(account._id.toString() == to){
                const index = account.debit.findIndex(op => op._id.toString() == req.params.operationId)
                account.debit[index] = operation
                return account
            }
        })
    }
    //jesli konto 'do' jest pasywne
    else{
        balance.accountsPassive.map(account => {
            if(account._id.toString() == to){
                const index = account.debit.findIndex(op => op._id.toString() == req.params.operationId)
                   account.debit[index] = operation
                   return account
            }
        })
    }

    balance = updateBalanceAccounts(balance)
    Balance.findByIdAndUpdate(req.body.balanceId.toString(), balance)
        .then((res.json(balance)))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/delete/:balanceId/:accountId/:operationId').put( async (req, res) => {
    const operationType = req.body.operationType
    const from = req.body.from
    const to = req.body.to
    console.log(from)
    var balance = await Balance.findById(req.params.balanceId)

    //jesli konto 'z' jest aktywne
    if (operationType === 'active' || operationType === 'active_passive_down') {
        balance.accountsActive.map(account => {
            if(account._id.toString() == from) {
                const index = account.credit.findIndex(op => op._id.toString() == req.params.operationId)
                return account.credit.splice(index,1)
            }
                else
                return account.credit
            })
    }
    //jesli konto 'z' jest pasywne
    else {
        balance.accountsPassive.map(account => {
            if(account._id.toString() == from) {
                const index = account.credit.findIndex(op => op._id.toString() == req.params.operationId)
                return account.credit.splice(index,1)
            }
                else
                return account.credit
            })
    }
    //jesli konto 'do' jest aktywne
    if(operationType === 'active' || operationType === 'active_passive_up'){
        balance.accountsActive.map(account => {
            if(account._id.toString() == to){
                const index = account.debit.findIndex(op => op._id.toString() == req.params.operationId)
                return account.debit.splice(index,1)
            }
                else
                return account.debit
            })
    }
    //jesli konto 'do' jest pasywne
    else{
        balance.accountsPassive.map(account => {
            if(account._id.toString() == to){
                const index = account.debit.findIndex(op => op._id.toString() == req.params.operationId)
                return account.debit.splice(index,1)
            }
                else
                return account.debit
            })
    }

    balance = updateBalanceAccounts(balance)
    Balance.findByIdAndUpdate(balance._id.toString(), balance)
        .then((res.json(balance)))
})

function  updateBalanceAccounts(balance) {
    var sumActive = 0
    var sumPassive = 0

    balance.accountsActive.map(account => {
        var nestedAccounts = balance.accountsActive.filter(account => account.path.startsWith(account.path) && 
        account.path.startsWith(account.path).length > account.path.length)
        account = updateAccount(account, nestedAccounts, 'active')
        sumActive += account.balance
        return account
    })
    balance.accountsPassive.map(account => {
        var nestedAccounts = balance.accountsPassive.filter(account => account.path.startsWith(account.path) && 
        account.path.startsWith(account.path).length > account.path.length)
        account = updateAccount(account, nestedAccounts, 'passive')
        sumPassive += account.balance
        return account
    })

    balance.sumActive = sumActive
    balance.sumPassive = sumPassive
    //zwracamy bilans z zaktualizowanymi kontami, trzeba go pozniej zapisac do bazy
    return balance
}

function updateAccount(account, nestedAccounts, type) {
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
    account.balance = type === 'active'?
    +(account.initialBalance + sumCredit - sumDebit)
    : +(account.initialBalance - sumCredit + sumDebit)

    //jezeli ma zagniezdzone konta to sumujemy ich salda i dodajemy do salda konta
    if(nestedAccounts.length > 0) {
        account.balance += nestedAccounts.reduce((a,b) => a.balance + b.balance,0) 
    }    
    return account
}
module.exports = router