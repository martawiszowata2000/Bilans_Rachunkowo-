const router = require('express').Router()
const AccontBalance = require('../models/account-balance.model')

router.route('/').get((req, res) => {
    AccontBalance.find()
        .then(balance_list => res.json(balance_list))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    // const accounts = req.body.accounts

    const newAccount = new AccontBalance()

    newAccount.save()
        .then(() => res.json('Account added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router