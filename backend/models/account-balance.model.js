const mongoose = require('mongoose')
// const BalanceSheetAccount = require('./balance-sheet-account.model')

const Schema = mongoose.Schema

const balanceSchema = new Schema({
    accounts: { type: [Schema.Types.ObjectId] }    
}, {
    timestamps: true
})

const AccontBalance = mongoose.model('Balance', balanceSchema)

module.exports = AccontBalance