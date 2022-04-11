'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmtalks extends Model {

    static associate(models) {

    }
  }
  filmtalks.init({
    user_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    contents: DataTypes.TEXT,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'filmtalks',
  });
  return filmtalks;
};