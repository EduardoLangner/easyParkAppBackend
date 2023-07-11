const ParkSpace = require('../models/ParkSpace')

module.exports = {

    async createParkSpace(req, res){
        const {token, status, latitude, longitude, type} = req.body
        try{
            const parkSpace = await ParkSpace.create({token, status, latitude, longitude, type})
            return res.status(200).json({
                message: 'Park space created successfully',
                parkSpace
            })
        }catch(error){
            return res.status(400).json({error: 'Error creating park space: ' + error})
        }
    },

    async getParkSpaces(req, res){
        try{
            const parkSpaces = await ParkSpace.findAll()
            return res.status(200).json(parkSpaces)
        }catch(error){
            return res.status(400).json({error: 'Error to get park spaces: ' + error})
        }
    },

    async getParkSpaceById(req, res){
        const {id} = req.params
        try{
            const parkSpace = await ParkSpace.findByPk(id)
            return res.status(200).json(parkSpace)
        }catch(error){
            return res.status(400).json({error: 'Error to get park space with id ' + id + ': ' + error})
        }
    },

    async deleteParkSpaceById(req, res){
        const {id} = req.params
        try{
            const parkSpace = await ParkSpace.findByPk(id)
            await parkSpace.destroy()
            return res.status(200).json({message: 'Park space ' + id + ' deleted successfully'})
        }catch(error){
            return res.status(400).json({error: 'Error to delete park space with id ' + id + ': ' + error})
        }
    }
}