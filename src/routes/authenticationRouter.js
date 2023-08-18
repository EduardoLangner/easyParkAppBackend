const express = require('express')
const AuthenticationController = require('../controllers/AuthenticationController')
const router = express.Router()

router.post('/login', AuthenticationController.login)    
router.post('/refreshToken', AuthenticationController.refreshToken)

module.exports = router