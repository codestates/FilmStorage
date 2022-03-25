'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('filmtalks', [{
      user_id: 1,
      category: "필름",
      title: "필름사진 찍기 좋은 명소 추천합니다.",
      contents: "영국 성 참 예쁘지 않나요?",
      views: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('filmtalks', null, {});
  }
};
