// 建立一個routers檔案夾
// 在routers 裡建立一個stockRouter.js

const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

router.get('', async (req, res, next) => {
  let [data, fields] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});

// router.get('/stocks/:stockId', async (req, res, next) => {
//   // req.params
//   console.log(req.params);
//   let [data, fields] = await pool.execute('SELECT * FROM stocks WHERE id =?', [req.params.stockId]);
//   res.json(data);
// });

router.get('/:stockId', async (req, res, next) => {
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

module.exports = router;
