require('dotenv').config();

module.exports = {
  development: {
    dialect: 'mariadb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  production: {
    dialect: 'mariadb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
