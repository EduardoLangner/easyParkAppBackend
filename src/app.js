const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express() 

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')
const authenticationRouter = require('./routes/authenticationRouter')
const vehicleRouter = require('./routes/vehicleRouter')
const parkSpaceRouter = require('./routes/parkSpaceRouter')
// const creditCardRouter = require('./routes/creditCardRouter')

require('./database/index')

app.use((req, res, next) => {
    app.use(cors())
    res.header('Access-Control-Allow-Origin', 'http://192.168.113.125:19000')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    console.log('Request: ', req.method, req.url)
    next()
})

app.use(express.json())
app.use(morgan('dev'))
app.use(indexRouter)
app.use(userRouter)
app.use(authenticationRouter)
app.use(vehicleRouter)
app.use(parkSpaceRouter)
// app.use(creditCardRouter)

module.exports = app    