'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmlog_comments extends Model {

    static associate(models) {

    }
  }
  filmlog_comments.init({
    filmlog_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    contents: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'filmlog_comments',
  });
  return filmlog_comments;
};