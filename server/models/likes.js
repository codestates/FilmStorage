'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {

    static associate(models) {

    }
  }
  likes.init({
    user_id: DataTypes.INTEGER,
    filmlog_id: DataTypes.INTEGER,
    like: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};