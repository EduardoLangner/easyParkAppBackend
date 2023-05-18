const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express() 

require('./database/index')

app.use((req, res, next) => {
    app.use(cors())
    next()
})

app.use(express.json())
app.use(morgan('dev'))
module.exports = app    