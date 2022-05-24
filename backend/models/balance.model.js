const mongoose = require('mongoose')
const BalanceItem = require('./balance-item.model')

const Schema = mongoose.Schema

const balanceSchema = new Schema({
    name: { type: String, required: true },
    sumActive: { type: Number, default: 0 }, // suma aktywów
    sumPassive: { type: Number, default: 0 }, // suma pasywów
    currency: { type: String, required: true },
    accountsActive: { type: [Schema.Types.BalanceItem], required: true },  //lista kont aktywów
    accountsPassive: { type: [Schema.Types.BalanceItem], required: true }  //lista kont pasywów
})

const Balance = mongoose.model('Balance', balanceSchema)

module.exports = Balance