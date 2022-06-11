require('dotenv').config();
const mysql = require('mysql2');
let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
    // 為了pool新增的參數
    connectionLimit: 10,
  })
  .promise();

module.exports = pool;
