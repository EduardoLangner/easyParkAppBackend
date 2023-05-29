'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.createTable('credit_card', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING, 
        allowNull: false,
      }, 

      number: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true,
      }, 

      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cvv: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize){}
};