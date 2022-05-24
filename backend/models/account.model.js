const mongoose = require('mongoose')
const Operation = require('./operation.model')

const Schema = mongoose.Schema

const AccountSchema = new Schema({ //konto bilansowe
    path: { type: String, required: true },
    name: { type: String, required: true },
    balance: { type: Number, defaul: 0 },
    debit: { type: [Schema.Types.Operation], default: [] },
    credit: { type: [Schema.Types.Operation], default: [] }
    // debit: { type: [BalanceSheetOperation] },
    // credit: { type: [BalanceSheetOperation] }
}, {
    timestamps: true
})

const Account = mongoose.model('Account', AccountSchema)

module.exports = Account