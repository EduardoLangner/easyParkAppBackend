const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const Auth = require('../middleware')

router.post('/signup', UserController.createUser)
router.get('/users', Auth.Auth, UserController.getUsers)
router.get('/users/:id', Auth.Auth, UserController.getUserById)
router.delete('/users/:id', Auth.Auth, UserController.deleteUserById)
router.put('/users/:id', Auth.Auth, UserController.updateUserById)

module.exports = router