'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  filmlogs.init({
    user_id: DataTypes.INTEGER,
    photo: DataTypes.BLOB,
    filmtype: DataTypes.STRING,
    contents: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    likesCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'filmlogs',
  });
  return filmlogs;
};