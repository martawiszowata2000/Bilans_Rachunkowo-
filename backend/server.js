const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true }
)
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const balanceListRouter = require('./routes/balance-list')
const accountsRouter = require('./routes/accounts')
const operationRouter = require('./routes/operations')
const balanceItemRouter = require('./routes/balance-items')

app.use('/balanceList', balanceListRouter)
app.use('/accounts', accountsRouter)
app.use('/operations', operationRouter)
app.use('/balance-items', balanceItemRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

// command to start server - nodemon server