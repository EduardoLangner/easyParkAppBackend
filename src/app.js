const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express() 

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')
const LoginRouter = require('./routes/loginRouter')

require('./database/index')

app.use((req, res, next) => {
    app.use(cors())
    next()
})

app.use(express.json())
app.use(morgan('dev'))
app.use(indexRouter)
app.use(userRouter)
app.use(LoginRouter)

module.exports = app    