const { Model, DataTypes } = require('sequelize')

class UserModel extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = UserModel