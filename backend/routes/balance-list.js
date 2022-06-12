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
        newBalance.accountsActive.push(account)
        let currentAccount = await Account.findById(account._id)
        currentAccount.initialBalance = account.initialBalance
        currentAccount.save()
      await updateAccount(account._id, account.initialBalance)
    })
    req.body.accountsPassive.forEach(async account =>{
        newBalance.accountsPassive.push(account)
        let currentAccount = await Account.findById(account._id)
        currentAccount.initialBalance = account.initialBalance
        currentAccount.save()
        await updateAccount(account._id, account.initialBalance)
    })

//     await newBalance.accountsActive.reduce(async (promise, account) => {
//         await promise
//         await updateAccount(account._id, account.initialBalance)
//     }, Promise.resolve())

//     await newBalance.accountsPassive.reduce(async (promise, account) => {
//         await promise
//         await updateAccount(account._id, account.initialBalance)
//     }, Promise.resolve())


    newBalance.accountsActive.forEach(account => {
        sumAct += account.initialBalance
    })
    newBalance.accountsPassive.forEach(account => {
        sumPas += account.initialBalance
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

async function updateAccount(accountId, initialBalance) {
    var account = await Account.findById(accountId)
    account.initialBalance = initialBalance
    account.save()
    return account
}
module.exports = router
