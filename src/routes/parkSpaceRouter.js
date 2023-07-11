const express = require('express')
const router = express.Router()

const ParkSpaceController = require('../controllers/ParkSpaceController')

router.post('/parkSpace', ParkSpaceController.createParkSpace)
router.get('/parkSpaces', ParkSpaceController.getParkSpaces)
router.get('/parkSpace/:id', ParkSpaceController.getParkSpaceById)
router.delete('/parkSpace/:id', ParkSpaceController.deleteParkSpaceById)

module.exports = router