const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

fs.readFile('test.txt', 'utf-8', (err, data) => {
  let p = new Promise ((resolve, rejects)=>{
    if (err) {
      // 錯誤了
      // console.log('喔喔喔，發生錯誤了');
      // console.error(err);
      rejects(`喔喔喔，發生錯誤了 ${err}`)
    } else {
      // 因為沒有 err，所以是正確的
      // console.log(data);
      resolve(data)
    }
  })
  p.then((result)=>{
    console.log(result)
  }).catch((error)=>{
    console.log(error)
  })
  
});