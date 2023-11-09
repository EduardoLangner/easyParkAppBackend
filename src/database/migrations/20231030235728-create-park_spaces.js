'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.createTable('park_spaces', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      token: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true,
      }, 

      status: {
        type: Sequelize.ENUM('free', 'occupied'),
        allowNull: true,
        defaultValue: 'free',
      },

      latitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      longitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING,
        allowNull: false,
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