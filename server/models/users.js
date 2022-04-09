"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {

    }
  }
  users.init(
    {
      email: {
        type: DataTypes.STRING,
        defaultValue: "카카오 유저"
      },
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      profile: {
        type: DataTypes.STRING,
        defaultValue:
          "https://user-images.githubusercontent.com/89354370/161719211-8d182204-a775-417e-9165-399fa6df48ef.png",
      },
      mobile: DataTypes.STRING,
      kakaouser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
