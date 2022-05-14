const router = require('express').Router()
const BalanceSheetAccount = require('../models/balance-sheet-account.model')

router.route('/').get((req, res) => {
    BalanceSheetAccount.find()
        .then(balance_account => res.json(balance_account))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    // const balance = req.body.balance
    // const debit = req.body.debit
    // const credit = req.body.credit

    const newBalanceAccount = new BalanceSheetAccount({name})

    newBalanceAccount.save()
        .then(() => res.json('Balance account added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router