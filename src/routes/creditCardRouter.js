const express = require('express')
const router = express.Router()
const CreditCardController = require('../controllers/CreditCardController')
const Auth = require('../middleware')

router.post('/creditcard', Auth.Auth, CreditCardController.createCreditCard)
router.get('/creditcard', Auth.Auth, CreditCardController.getCreditCard)
router.get('/creditcard/:id', Auth.Auth, CreditCardController.getCreditCardById)
router.get('/creditcardbyuser/:id', Auth.Auth, CreditCardController.getCreditCardByUserId)
router.delete('/creditcard/:id', Auth.Auth, CreditCardController.deleteCreditCardById)

module.exports = router