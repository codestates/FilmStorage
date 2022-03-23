const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+09:00",
    "dialectOptions": {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    // [출처][nodejs - sequelize] timezone 적용, 조회시 시간 제대로 표기하기| 작성자 demonic


    // "define": {
    //   timestamps: true,
    //   supportBigNumbers: true,
    // }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+09: 00"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+09: 00"
  }
}
