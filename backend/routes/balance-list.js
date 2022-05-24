const router = require('express').Router()
const Balance = require('../models/balance.model')
const BalanceItem = require('../models/balance-item.model')
const Account = require('../models/account.model')
const jsonActive = require('../data/activeOp.json');

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
    const defaultAccounts = prepareAccounts(jsonActive)
    console.log(defaultAccounts)
    const currency = req.body.currency
    // prepareAccounts(jsonActive)
    const newBalance = new Balance({name, defaultSum, defaultSum, currency, defaultAccounts, defaultAccounts})
    // defaultAccounts.forEach(obj => newBalance.list.push(obj))
    for (const obj of defaultAccounts) {
        newBalance.accountsActive.push(obj)
    }
    // console.log(defaultAccounts)
    // console.log(newBalance)
    newBalance.save()
        .then(() => res.json('Balance added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

function prepareAccounts(json) {
    // console.log(json.values)
    const list = []
    const defaultSum = 0
    const defaultAccounts = []
    for (const el of json) {
        const path = el.path
        const name = el.name
        const account = new Account({path, name, defaultSum, defaultAccounts, defaultAccounts})
        account.save()
        const balanceItem = new BalanceItem({path, name, account})
        balanceItem.save()
        if(el.list) {
            balanceItem.list.push(prepareAccounts(el.list))
        }
        list.push(balanceItem)
    }
    // console.log(list)
    return list
}

module.exports = router