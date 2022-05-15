const fs = require('fs/promises');

fs.readFile('test.txt', 'utf-8')
  .then((result)=>{
    console.log('這是內建 promise 版本的 readfile',result)
  }).catch((error)=>{
    console.log(error)
  })