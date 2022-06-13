const mongoose = require('mongoose')
const Account = require('./account.model')

const Schema = mongoose.Schema

const operationSchema = new Schema({
    operationType: { type: String, required: true },
    from: { type: Schema.Types.ObjectId , required: true },
    to: { type: Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date }
}, {
    timestamps: true
})

const BalanceSheetOperation = mongoose.model('Operation', operationSchema)

module.exports = BalanceSheetOperation