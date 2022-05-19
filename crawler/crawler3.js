// await version
// 1. read stock no from file (fs)
// 2. axios.get to request data

const axios = require('axios');
const fs = require('fs/promises');

(async() => {
  try{
    //先取得股票號碼
    let stockNo = await fs.readFile('stock.txt', 'utf-8');
    // console.log(stokeNo)

    // crawler await
    let res = await axios
      .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
        params: {
          // 設定 query string
          response: 'json',
          date: '20220301',
          stockNo: stockNo,
        }
      })
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

  } catch(err){
    console.error(err);
  }
})();
