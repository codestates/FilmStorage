"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        email: "wooga@wooga.com",
        password: "1234abc!",
        nickname: "woogawooga",
        mobile: "010-9394-5856",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "woogaman@wooga.com",
        password: "4321abc!",
        nickname: "woogaman",
        mobile: "010-7583-1512",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "woogagirl@naver.com",
        password: "4321abc!",
        nickname: "woogagirl",
        mobile: "010-7583-4142",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "boo1996@naver.com",
        password: "4321abc!",
        nickname: "hyeongeolife",
        mobile: "010-7583-9848",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
