const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const CreditCard = require('../models/CreditCard')

const connection = new Sequelize(dbConfig)

User.init(connection)
CreditCard.init(connection)

console.log('\nDatabase connection successful!')

module.exports = connection