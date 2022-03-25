'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('filmlogs', [{
      user_id: 1,
      filmtype: "kodak",
      contents: "인생 첫 출사 입니다.",
      views: "190",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 2,
      filmtype: "fuji",
      contents: "프랑스에서 찍은 사진 입니다.",
      views: "255",
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('filmlogs', null, {});

  }
};
