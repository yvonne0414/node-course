// npm i express
// 導入express模組
const express = require('express');
// 利用express來建立一個express application
const app = express();
const path = require('path');
// express 是由 middleware （中間件）組成的世界
const cors = require('cors');
require('dotenv').config();

// 啟用 sesstion
// npm i express-session
// expression-session 預設是存在應用程式的記憶體（node server.js)
const expressSession = require('express-session');
let FileStore = require('session-file-store')(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, '..', 'sesstions'),
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// 使用第三方套件 cors
// app.use(cors());
// origin: *
// 全開，但不包括跨源讀取 cookie
// 若想跨源讀取 cookie:
app.use(
  cors({
    // origin不能是*
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = require('./utils/db');

// express 處理靜態資料
// 不指定網址
app.use(express.static(path.join(__dirname, 'assets')));

// 指定網址
app.use('/images/members', express.static(path.join(__dirname, 'public', 'members')));

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

const StockRouter = require('./routers/stockRouter');
app.use('/api/stocks', StockRouter);

const AuthRouter = require('./routers/authRouter');
app.use('/api/auth', AuthRouter);

const MemberRouter = require('./routers/memberRouter');
app.use('/api/member', MemberRouter);

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
