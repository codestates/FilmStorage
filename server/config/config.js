const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "port": process.env.DATABASE_PORT,
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

  },


  "production": {
    "port": process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
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

  }
}
