const router = require('express').Router()
const Balance = require('../models/balance.model')
const Account = require('../models/account.model')
const jsonActive = require('../data/activeOp.json');
const jsonPassive = require('../data/passiveOp.json');

router.route('/').get((req, res) => {
    Balance.find()
        .then(balance_list => res.json(balance_list))
        .catch(err => res.status(400).json('Error' + err))
})
router.route('/getSchema').get((req, res) => {
    const name = 'default'
    const defaultSum = 0
    const defaultOperations = {}
    const currency = 'default'
    const newBalance = new Balance({name, defaultSum, defaultSum, currency})

    for (const el of jsonActive) {
        const path = el.path
        const name = el.name
        const account = new Account({path, name, defaultSum, defaultOperations, defaultOperations})
        newBalance.accountsActive.push(account)
    }
    for (const el of jsonPassive) {
        const path = el.path
        const name = el.name
        const account = new Account({path, name, defaultSum, defaultOperations, defaultOperations})
        newBalance.accountsPassive.push(account)
    }
    res.json(newBalance)
})

router.route('/add').post(async (req,res) => {
    const name = req.body.name
    const date = req.body.date
    const accountsDefault = []
    const currency = req.body.currency
    let sumAct = 0
    let sumPas = 0
    const newBalance = new Balance(
        {name,date,sumAct,sumPas,currency, accountsDefault, accountsDefault}
    )
    req.body.accountsActive.forEach(async account => {
        account.balance = account.initialBalance
        newBalance.accountsActive.push(new Account(account))
    })
    req.body.accountsPassive.forEach(async account =>{
        account.balance = account.initialBalance
        newBalance.accountsPassive.push(new Account(account))
    })

    newBalance.accountsActive.forEach(account => {
        sumAct += account.balance
    })
    newBalance.accountsPassive.forEach(account => {
        sumPas += account.balance
    })

    newBalance.sumActive = sumAct
    newBalance.sumPassive = sumPas
    if(sumAct !== sumPas)
        res.send({ error: 'Totals are different' })
    else
    newBalance.save()
        .then(() => res.json(newBalance._id))
        .catch(err => res.json('Error: ' + err))
})

router.route('/:balanceId').get((req, res) => {
    Balance.findById(req.params.balanceId)
        .then(balance_list => res.json(balance_list))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/delete/:balanceId').delete((req,res) =>{
    Balance.findByIdAndDelete(req.params.balanceId)
        .then(() => res.json("Balance deleted!"))
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router
