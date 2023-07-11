const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express() 

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')
const loginRouter = require('./routes/loginRouter')
const vehicleRouter = require('./routes/vehicleRouter')
const parkSpaceRouter = require('./routes/parkSpaceRouter')
// const creditCardRouter = require('./routes/creditCardRouter')


require('./database/index')

app.use((req, res, next) => {
    app.use(cors())
    next()
})

app.use(express.json())
app.use(morgan('dev'))
app.use(indexRouter)
app.use(userRouter)
app.use(loginRouter)
app.use(vehicleRouter)
app.use(parkSpaceRouter)
// app.use(creditCardRouter)

module.exports = app    