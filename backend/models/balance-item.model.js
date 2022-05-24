const mongoose = require('mongoose')
const Account = require('./account.model')
const Schema = mongoose.Schema

const BalanceItemSchema = new Schema({
    path: { type: String, required: true },
    name: { type: String, required: true },
    account: { type: Schema.Types.ObjectId, required: true },
    list: { type: Array }
})

const BalanceItem = mongoose.model('BalanceItem', BalanceItemSchema)

module.exports = BalanceItem