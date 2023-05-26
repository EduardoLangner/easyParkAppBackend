const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    
    async createUser(req, res){
        try{
            const {name, cpf, email, password} = req.body
            const hash = bcrypt.hashSync(password, 10)
            const user = await User.create({name, cpf, email, password: hash})
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
            console.log(`\nemail: ${email}\n`)
            console.log(`\npassword: ${password}\n`)
            console.log(`\nHASH: ${hash}\n`)
            return res.status(200).json({
                message: 'User created successfully',
                user,
                token: token
            })
        }catch(error){
            if(error.name === 'SequelizeUniqueConstraintError'){
                return res.status(400).json({error: 'Email already exists'})
            }else{
                return res.status(400).json({error: 'Error to create user: ' + error})
            }
        }
    },

    async getUsers(req, res){
        try{
            const users = await User.findAll()
            return res.status(200).json(users)
        }catch(error){
            return res.status(400).json({error: 'Error to get users: ' + error})
        }
    },

    async getUserById(req, res){
        const {id} = req.params
        try{
            const user = await User.findByPk(id)
            return res.status(200).json(user)
        }catch(error){
            return res.status(400).json({error: 'Error to get user with id ' + id + ': ' + error})
        }
    },

    async deleteUserById(req, res){
        const {id} = req.params
        try{
            const user = await User.findByPk(id)
            await user.destroy()
            return res.status(200).json({message: 'User ' + id + ' deleted successfully'})
        }catch(error){
            return res.status(400).json({error: 'Error to delete user with id ' + id + ': ' + error})
        }
    },  

    async updateUserById(req, res){
        const {id} = req.params
        try{
            const user = await User.findByPk(id)
            await user.update(req.body)
            return res.status(200).json({message: 'User ' + id + ' updated successfully'})
        }catch(error){
            return res.status(400).json({error: 'Error to update user with id ' + id + ': ' + error})
        }
    }
}