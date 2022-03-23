'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmlog_comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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