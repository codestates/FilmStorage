'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmtalks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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