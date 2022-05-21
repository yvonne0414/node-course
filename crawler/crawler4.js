// read stock no from mysql database

// mysql2 是一個第三方套件
// npm i mysql2
// 引用進來
const mysql = require('mysql2/promise');
const axios = require('axios');

require('dotenv').config();

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
  });

  let [data, fields] = await connection.execute('SELECT * FROM stocks');
  // console.log(data);
  let mapResult = data.map(async (stock, i) => {
    let res = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
      params: {
        // 設定 query string
        response: 'json',
        date: '20220301',
        stockNo: stock.id,
      },
    });
    return res.data.data;
  });
  // console.log(mapResult);

  let priceRes = await Promise.all(mapResult);
  console.log(priceRes);

  connection.end();
})();
