const router = require('express').Router()
const Accounts = require('../models/account.model')

router.route('/').get((req, res) => {
    Accounts.find()
        .then(balance_account => res.json(balance_account))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:accountId').get((req, res) => {
    Accounts.findById(req.params.accountId)
        .then(balance_account => res.json(balance_account))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/update/:accountId').put((req, res) => {
    Operation.findByIdAndUpdate(req.params.accountId, req.body)
    .then(() => { res.json('Account updated!')})
    .catch(err => res.status(400).json('Error' + err))
})

router.route('/updateInitialValue/:accountId').put((req,res) => {
    Accounts.findByIdAndUpdate(req.params.accountId, req.body)
        .then(() => { res.json('Account updated!')})
        .catch(err => res.status(400).json('Error' + err))
})

module.exports = router