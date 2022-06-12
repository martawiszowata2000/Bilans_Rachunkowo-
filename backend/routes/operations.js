const router = require('express').Router()
const Operation = require('../models/operation.model')
const Account = require('../models/account.model')

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

router.route('/add').post(async (req, res) => {
    const operationType = req.body.type
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount
    const newOperation = new Operation({operationType, from, to, amount})

    const accountFrom = await Account.findById(from)
    const accountTo = await Account.findById(to)

    accountFrom.credit.push(newOperation)
    accountTo.debit.push(newOperation)

    accountTo.save()
    accountFrom.save()

    newOperation.save()
        .then(() => res.json('Operation added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:operationId').put((req, res) => {
    Operation.findByIdAndUpdate(req.params.operationId, req.body)
    .then(() => { res.json('Operation updated!')})
    .catch(err => res.status(400).json('Error' + err))
})

router.route('/delete/:operationId').delete((req, res) => {
    Operation.findByIdAndDelete(req.params.operationId)
        .then(() => { res.json('Operation deleted!')})
        .catch(err => res.status(400).json('Error' + err))

        //to sie pozniej doda bo z tego co czytalam to mongodb chyba nie wspiera kaskadowego usuwania :<<<
    // Account.debit.findByIdAndDelete(req.params.operationId)
    //     .then(() => { res.json('Operation deleted!')})
    //     .catch(err => res.status(400).json('Error' + err))
    // Account.credit.findByIdAndDelete(req.params.operationId)
    //     .then(() => { res.json('Operation deleted!')})
    //     .catch(err => res.status(400).json('Error' + err))
        
})

module.exports = router