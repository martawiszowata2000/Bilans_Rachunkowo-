const mongoose = require('mongoose')
// const BalanceSheetOperation = require('./balance-sheet-operation.model')

const Schema = mongoose.Schema

const accountSchema = new Schema({
    name: { type: String, required: true },
    balance: { type: Number },
    debit: { type: [Schema.Types.ObjectId] },
    credit: { type: [Schema.Types.ObjectId] }
    // debit: { type: [BalanceSheetOperation] },
    // credit: { type: [BalanceSheetOperation] }
}, {
    timestamps: true
})

const BalanceSheetAccount = mongoose.model('Account', accountSchema)

module.exports = BalanceSheetAccount