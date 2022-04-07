"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
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
