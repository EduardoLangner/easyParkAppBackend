const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

    async createUser(req, res) {
        try {
            const { name, cpf, email, password } = req.body
            const hash = bcrypt.hashSync(password, 10)

            let emailExists = await User.findOne({ where: { email: email } })
            let cpfExists = await User.findOne({ where: { cpf: cpf } })
            let message = emailExists ? 'Email already exists' : 'CPF already exists'

            if(emailExists || cpfExists){
                return res.status(400).json({ error: message })
            }

            const user = await User.create({ name, cpf, email, password: hash })
            
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

            return res.status(200).json({
                message: 'User created successfully',
                user,
                token: token
            })
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' && error.fields.email) {
                return res.status(400).json({ error: 'Email already exists' })
            } else if (error.name === 'SequelizeUniqueConstraintError' && error.fields.cpf) {
                return res.status(400).json({ error: 'CPF already exists' })
            } else {
                return res.status(400).json({ error: 'Error creating user: ' + error })
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