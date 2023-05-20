const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

    async createUser(req, res){

        try{
            const {name, cpf, email, password} = req.body
            const hash = bcrypt.hashSync(password, 10)
            const user = await UserModel.create({name, cpf, email, password: hash})
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})
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
    }
}