'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmtalk_comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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