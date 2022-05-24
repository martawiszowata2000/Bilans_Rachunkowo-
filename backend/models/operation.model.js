const mongoose = require('mongoose')

const Schema = mongoose.Schema

const operationSchema = new Schema({
    operationType: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true }
}, {
    timestamps: true
})

const BalanceSheetOperation = mongoose.model('Operation', operationSchema)

module.exports = BalanceSheetOperation