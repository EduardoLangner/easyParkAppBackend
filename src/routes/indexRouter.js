const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send({message: 'Wellcome to Easy Parking App'})
})

module.exports = router