const jwt = require('jsonwebtoken')

module.exports = {

    async Auth(req, res, next){
        try{
            console.log("Authenticating...")
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        }catch{
            return res.status(401).json({error: 'Invalid token'})
        }
    }
}