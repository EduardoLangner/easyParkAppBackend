const { Model, DataTypes } = require('sequelize')

class User extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            account_balance: DataTypes.FLOAT
        }, {
            sequelize
        })
    }
}

module.exports = User