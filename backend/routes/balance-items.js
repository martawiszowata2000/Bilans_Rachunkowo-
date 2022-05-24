const router = require('express').Router()
const BalanceItems = require('../models/balance-item.model')

// let json = require('./data/activeOp.json');
// function jsonToArray(json) {
//     var array = [];
//     for (var key in json) {
//         if (json.hasOwnProperty(key)) {
//             var item = json[key];
//             if(item.list) {
//                 item.list = jsonToArray(item.list)
//                 array.push({
//                     name: item.name,
//                     list: item.list
//                 });    
//             }
//             else {
//                 array.push({name: item.name})
//                 return array
//             }   
//         }
//     }
//     return array
// }
// activeOpList = jsonToArray(json)
// console.log(activeOpList)

router.route('/').get((req, res) => {
    BalanceItems.find()
        .then(balance_item => res.json(balance_item))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:itemId').get((req, res) => {
    BalanceItems.findById(req.params.itemId)
        .then(balance_item => res.json(balance_item))
        .catch(err => res.status(400).json('Error' + err))
})

// router.route('/add').post((req, res) => {
//     const name = req.body.name
//     const list = req.body.list

//     const newOperation = new BalanceItem({name, list})

//     newOperation.save()
//         .then(() => res.json('Balance Item added!'))
//         .catch(err => res.status(400).json('Error: ' + err))
// })

module.exports = router