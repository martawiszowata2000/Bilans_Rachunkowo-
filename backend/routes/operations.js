const router = require('express').Router()
const BalanceSheetOperation = require('../models/balance-sheet-operation.model')

router.route('/').get((req, res) => {
    BalanceSheetOperation.find()
        .then(balance_operation => res.json(balance_operation))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const amount = req.body.amount
    console.log(amount)

    const newOperation = new BalanceSheetOperation({amount})

    newOperation.save()
        .then(() => res.json('Operation added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router