'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmtalk_comments extends Model {

    static associate(models) {

    }
  }
  filmtalk_comments.init({
    filmtalk_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    contents: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'filmtalk_comments',
  });
  return filmtalk_comments;
};