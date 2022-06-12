const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { json } = require('express/lib/response');
const pool = require('../utils/db');
// for hash
// npm i bcrypt
const bcrypt = require('bcrypt');

// for img upload
// npm i multer
const multer = require('multer');
const path = require('path');
// 圖片上傳需要地方放，在public 建立 uploads 檔案夾
// 設定圖片儲存位置
const storage = multer.diskStorage({
  // 設定儲存目的地
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'members'));
  },
  // 重新命名上傳圖片名稱
  filename: function (req, file, cb) {
    console.log('multer filename', file);
    let ext = file.originalname.split('.').pop();
    let newFilename = `${Date.now()}.${ext}`;
    cb(null, newFilename);
  },
});
const uploader = multer({
  // 設定儲存位置
  storage: storage,
  // 過濾圖片
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
      cb('這些是不被接受的格式', false);
    } else {
      cb(null, true);
    }
  },
  // 檔案尺寸過濾
  limits: {
    // 縮圖200k, 400k, 600k
    fileSize: 200 * 1024,
  },
});

const registerRules = [
  body('email').isEmail().withMessage('Email 欄位請填寫正確格式'),
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為8'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('密碼驗證不一樣'),
];

router.post('/register', uploader.single('photo'), registerRules, async (req, res) => {
  // 1. req.params <-- 網址上的路由參數
  // 2. req.query  <-- 網址上的 query string
  // 3. req.body <-- 通常是表單 post 用的
  console.log('register body ', req.body);

  // 驗證資料
  const validateResults = validationResult(req);
  console.log('validationResults', validateResults);
  if (!validateResults.isEmpty()) {
    let error = validateResults;
    return res.status(400).json({ code: 3001, error: error });
  }
  // 確認email有沒有註冊過
  let [members] = await pool.execute('SELECT id, email From members WHERE email = ?', [req.body.email]);
  if (members.length !== 0) {
    //有註冊過
    return res.status(400), json({ code: 3002, error: '這個 email 已經註冊過' });
  }

  // 密碼雜湊 hash
  // bcrypt(60), argon2(95)
  // npm i bcrypt
  let hashPassword = await bcrypt.hash(req.body.password, 10);
  console.log('hashPassword', hashPassword);

  // 圖片處理完成後，會被放在 req 物件中
  console.log('req.file', req.file);
  // 可以由後端來組合這個網址，也可以由前端來組合
  // 記得不要把 base_url 存進資料庫，
  // members/檔名
  let photo = req.file ? '/members/' + req.file.filename : '';

  // save to DB
  // let [result] = await pool.execute('INSERT INTO members (email, password, name) VALUES (?,?,?)',
  // [req.body.email, hashPassword, req.body.name]);
  let [result] = await pool.execute('INSERT INTO members (email, password, name, photo) VALUES (?,?,?,?)', [req.body.email, hashPassword, req.body.name, photo]);
  console.log('insert res', result);

  // response
  res.json({ code: 0, result: 'OK' });
});

module.exports = router;
