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
router.route('/:balanceId').post((req,res) => {
    // wszystko poza kontami
    // Balance.findByIdAndUpdate(req.params.balanceId, req.body)
    //     .then(() => {res.json('Balance updated')})
    //     .catch(err => res.status(400).json('Error'+ err))
    const newBalance = new Balance(req.body)
    newBalance.save()
        .then(() => res.json(newBalance))
        .catch(err => res.status(400).json('Error: ' + err))
    const balance = Balance.findById(req.params.balanceId)
    balance.accountsActive.forEach(account => {
        Balance.findByIdAndUpdate(account.accountId, account)
    });
    balance.accountsPassive.forEach(account => {
        Balance.findByIdAndUpdate(account.accountId, account)
    });


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
    res.json(newBalance)
//        .then(() => res.json(newBalance))
      //  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:balanceId').delete((req,res) =>{
    Balance.findByIdAndDelete(req.params.balanceId)
        .then(() => res.json("Balance deleted!"))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router