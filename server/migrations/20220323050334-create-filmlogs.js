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
      views: {
        type: Sequelize.INTEGER
      },
      likesCount: {
        type: Sequelize.INTEGER
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