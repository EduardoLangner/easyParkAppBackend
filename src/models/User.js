const { Model, DataTypes } = require('sequelize')

class User extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            account_balance: DataTypes.FLOAT,
            refresh_token: DataTypes.STRING,
            asaas_id: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = User       