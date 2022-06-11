const mongoose = require('mongoose')
const Account = require('./account.model')

const Schema = mongoose.Schema

const balanceSchema = new Schema({
    name: { type: String, required: true, default: 'default' },
    date: { type: Date, required: true,  default: Date.now()},
    sumActive: { type: Number, default: 0 }, // suma aktywów
    sumPassive: { type: Number, default: 0 }, // suma pasywów
    currency: { type: String, required: true,  default: 'default'},
    accountsActive: { type: [Schema.Types.Account], required: true },  //lista kont aktywów
    accountsPassive: { type: [Schema.Types.Account], required: true }  //lista kont pasywów
})

const Balance = mongoose.model('Balance', balanceSchema)

module.exports = Balance