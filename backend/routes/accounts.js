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

    // nie mozna tworzyc konta z poziomu fornta nie? stworzymy wszystkie przy tworzeniu bilansu nie?
// router.route('/add').post((req, res) => {
//     const name = req.body.name

//     const newAccounts = new Accounts({name})

//     newAccounts.save()
//         .then(() => res.json('Accounts added!'))
//         .catch(err => res.status(400).json('Error: ' + err))
// })

router.route('/update/:accountId').put((req, res) => {
    Operation.findByIdAndUpdate(req.params.accountId, req.body)
    .then(() => { res.json('Account updated!')})
    .catch(err => res.status(400).json('Error' + err))
})
    //usuwac tez nie mozna chyba, jedynie co to usunac jakies operacje
// router.route('/delete/:accountId').delete((req, res) => {
//     Operation.findByIdAndDelete(req.params.accountId)
//         .then(() => { res.json('Accounts deleted!')})
//         .catch(err => res.status(400).json('Error' + err))
// })

module.exports = router