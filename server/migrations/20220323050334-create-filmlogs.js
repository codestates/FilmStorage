'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('filmlogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING
      },
      filmtype: {
        type: Sequelize.STRING
      },
      contents: {
        type: Sequelize.TEXT
      },
      location: {
        type : Sequelize.STRING,
      },
      lat: {
        type : Sequelize.DECIMAL(20,[17]),
      },
      log: {
        type : Sequelize.DECIMAL(20,[17]),
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likesCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('filmlogs');
  }
};