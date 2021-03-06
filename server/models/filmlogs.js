'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmlogs extends Model {

    static associate(models) {

    }
  }
  filmlogs.init({
    user_id: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    filmtype: DataTypes.STRING,
    contents: DataTypes.TEXT,
    location: DataTypes.STRING,
    lat: DataTypes.DECIMAL(20, [17]),
    log: DataTypes.DECIMAL(20, [17]),
    likesCount: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'filmlogs',
  });
  return filmlogs;
};