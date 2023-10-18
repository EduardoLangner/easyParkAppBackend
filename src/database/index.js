const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Vehicle = require('../models/Vehicle')
const ParkSpace = require('../models/ParkSpace')
const CreditCard = require('../models/CreditCard')

const connection = new Sequelize(dbConfig)

User.init(connection)
Vehicle.init(connection)
ParkSpace.init(connection)
CreditCard.init(connection)

console.log('\nDatabase connection successful!')

module.exports = connection