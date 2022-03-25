'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { users, filmlogs, filmlog_comments, filmtalks, filmtalk_comments, likes } = sequelize.models;

//users와 각 테이블 간의 관계설정
users.hasMany(filmlogs, {
  foreignKey: "user_id"
});
filmlogs.belongsTo(users, {
  foreignKey: "user_id"
});

users.hasMany(filmtalks, {
  foreignKey: "user_id"
});
filmtalks.belongsTo(users, {
  foreignKey: "user_id"
});

users.hasMany(filmlog_comments, {
  foreignKey: "user_id"
});
filmlog_comments.belongsTo(users, {
  foreignKey: "user_id"
});

users.hasMany(filmtalk_comments, {
  foreignKey: "user_id"
});
filmtalk_comments.belongsTo(users, {
  foreignKey: "user_id"
});

//filmlog와 comments 간의 관계, filmtalk와 comments 간의 관계
filmlogs.hasMany(filmlog_comments, {
  foreignKey: "filmlog_id"
});
filmlog_comments.belongsTo(filmlogs, {
  foreignKey: "filmlog_id"
});

filmtalks.hasMany(filmtalk_comments, {
  foreignKey: "filmtalk_id"
});
filmtalk_comments.belongsTo(filmtalks, {
  foreignKey: "filmtalk_id"
});

likes.hasMany(users, {
  foreignKey: "user_id"
})
users.belongsTo(likes, {
  foreignKey: "user_id"
})

likes.hasMany(filmlogs, {
  foreignKey: "filmlog_id"
})
filmlogs.belongsTo(likes, {
  foreignKey: "filmlog_id"
})


module.exports = db;
