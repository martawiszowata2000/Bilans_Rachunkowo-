const mongoose = require('mongoose')

const Schema = mongoose.Schema

const operationSchema = new Schema({
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const BalanceSheetOperation = mongoose.model('Operation', operationSchema)

module.exports = BalanceSheetOperation