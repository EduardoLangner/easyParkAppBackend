const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUserById)
router.delete('/users/:id', UserController.deleteUserById)
router.put('/users/:id', UserController.updateUserById)

module.exports = router