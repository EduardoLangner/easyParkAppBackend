// const CreditCard =require('../models/CreditCard')
// const bcrypt = require('bcrypt')

// module.exports = {

//     async createCreditCard(req, res){
//         try{
//             const {name, number, date, cvv, user_id} = req.body
//             const hashName = bcrypt.hashSync(name, 10)
//             const hashNumber = bcrypt.hashSync(number, 10)
//             const hashDate = bcrypt.hashSync(date, 10)
//             const hashCvv = bcrypt.hashSync(cvv, 10)

//             const creditCard = await CreditCard.create({name: hashName, number: hashNumber, date: hashDate, cvv: hashCvv, user_id})

//             return res.status(200).json({
//                 message: 'Credit card created successfully',
//                 creditCard
//             })

//         }catch(error){
//             return res.status(400).json({error: 'Error creating credit card: ' + error})
//         }
//     },

//     async getCreditCards(req, res){
//         try{
//             const creditCards = await CreditCard.findAll()
//             return res.status(200).json(creditCards)
//         }catch(error){
//             return res.status(400).json({error: 'Error to get credit cards: ' + error})
//         }
//     },

//     async getCreditCardById(req, res){
//         const {id} = req.params
//         try{
//             const creditCard = await CreditCard.findByPk(id)
//             return res.status(200).json(creditCard)
//         }catch(error){
//             return res.status(400).json({error: 'Error to get credit card with id ' + id + ': ' + error})
//         }
//     },

//     async deleteCreditCardById(req, res){
//         const {id} = req.params
//         try{
//             const creditCard = await CreditCard.findByPk(id)
//             await creditCard.destroy()
//             return res.status(200).json({message: 'Credit card ' + id + ' deleted successfully'})
//         }catch(error){
//             return res.status(400).json({error: 'Error to delete credit card with id ' + id + ': ' + error})
//         }
//     }
// }