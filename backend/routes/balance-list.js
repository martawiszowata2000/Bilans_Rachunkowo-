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

router.route('/:balanceId').get((req, res) => {
    Balance.findById(req.params.balanceId)
        .then(balance_list => res.json(balance_list))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const defaultSum = 0
    const defaultOperations = {}
    const currency = req.body.currency
    const newBalance = new Balance({name, defaultSum, defaultSum, currency})

    for (const el of jsonActive) {
        const path = el.path
        const name = el.name
        const account = new Account({path, name, defaultSum, defaultOperations, defaultOperations})
        account.save()
        newBalance.accountsActive.push(account)
    }
    for (const el of jsonPassive) {
        const path = el.path
        const name = el.name
        const account = new Account({path, name, defaultSum, defaultOperations, defaultOperations})
        account.save()
        newBalance.accountsPassive.push(account)
    }
    newBalance.save()
        .then(() => res.json('Balance added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router