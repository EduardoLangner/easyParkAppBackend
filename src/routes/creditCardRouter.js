const express = require('express')
const router = express.Router()

const CreditCardController = require('../controllers/CreditCardController.js')

router.post('/creditcard', CreditCardController.createCreditCard)
router.get('/creditcard', CreditCardController.getCreditCards)
router.get('/creditcard/:id', CreditCardController.getCreditCardById)
router.delete('/creditcard/:id', CreditCardController.deleteCreditCardById)

module.exports = router