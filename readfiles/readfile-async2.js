const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

(async ()=> {
  let p = await fs.readFile("test.txt",'utf-8')
  console.log(p)
})();