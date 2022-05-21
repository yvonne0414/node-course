// npm i express
// 導入express模組
const express = require('express');
// 利用express來建立一個express application
const app = express();

// http
// get post
app.get('/', (req, res, next) => {
  // 一定要res
  res.send('首頁');
  console.log('首頁');
});
app.get('/about', (req, res, next) => {
  res.send('about');
  console.log('about');
});

app.listen(3001, () => {
  console.log('Server running at port 3001');
});
