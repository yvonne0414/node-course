// npm i express
// 導入express模組
const express = require('express');
// 利用express來建立一個express application
const app = express();
const path = require('path');
// express 是由 middleware （中間件）組成的世界
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));

app.use(cors());

const mysql = require('mysql2');
require('dotenv').config();
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

// express
app.use(express.static(path.join(__dirname, 'assets')));

// app.use((req, res, next) => {
//   console.log('我是一個沒用的中間件aaa');
//   next();
// });
// app.use((req, res, next) => {
//   console.log('我是一個沒用的中間件bbb');
//   next();
// });
// app.use((req, res, next) => {
//   console.log('我是一個沒用的中間件ccc');
//   next();
// });

// http
// get post
app.get('/', (req, res) => {
  // 一定要res
  res.send('首頁');
  // 送回res，結束req-res cycle
  console.log('首頁');
});
app.get('/about', (req, res) => {
  res.send('about');
  console.log('about');
});

app.get('/error', (req, res, next) => {
  // throw new Error('test');
  // res.send('error');
  next('err');
});

app.get('/stocks', async (req, res, next) => {
  let [data, fields] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});

app.get('/stocks/:stockId', async (req, res, next) => {
  // req.params
  console.log(req.params);
  let [data, fields] = await pool.execute('SELECT * FROM stocks WHERE id =?', [req.params.stockId]);
  res.json(data);
});

app.get('/stockDetails/:stockId', async (req, res, next) => {
  // req.params
  // console.log(req.params);
  let [allResults, fields] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ', [req.params.stockId]);
  // RESTful 風格
  // 第幾頁
  let page = req.query.page || 1;
  // console.log('current page:', page);

  // 總筆數
  const total = allResults.length;
  // console.log('total:', total);

  // 總共有幾頁
  const perPage = 5;
  const lastPage = Math.ceil(total / perPage);
  // console.log('lastPage:', lastPage);

  // 計算offset（要跳過的）
  const offset = (page - 1) * perPage;
  // console.log('offset:', offset);

  // 取得這一頁資料
  let [perPageResults] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date DESC limit ? offset ? ', [req.params.stockId, perPage, offset]);

  // 回復給前端
  res.json({
    pagination: {
      total,
      lastPage,
      page,
    },
    data: perPageResults,
  });
});

app.use((req, res, next) => {
  console.log('所有路由後面==>404', req.path);
  res.status(404).send('NOT FOUND');
});

// 5xx
app.use((err, req, res, next) => {
  console.error('來自四個參數的錯誤處理中間件', req.path, err);
  res.status(500).send('Server Error:  請洽系統管理員');
});

app.listen(3001, () => {
  console.log('Server running at port 3001');
});
