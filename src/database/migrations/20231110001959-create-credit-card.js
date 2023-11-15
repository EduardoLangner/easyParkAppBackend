'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.createTable('credit_cards', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      asaas_creditcard_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      credit_card_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      credit_card_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      credit_card_token: {
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