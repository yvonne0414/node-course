const md5 = require('md5');
console.log('md5', md5('test123456'));
console.log('md5', md5('test123456'));

const bcrypt = require('bcrypt');
(async () => {
  let result1 = await bcrypt.hash('test123456', 10);
  console.log('bcrypt', result1);
  let result2 = await bcrypt.hash('test123456', 10);
  console.log('bcrypt', result2);
})();

const argon2 = require('argon2');
(async () => {
  let result1 = await argon2.hash('test123456', 10);
  console.log('argon2', result1);
  let result2 = await argon2.hash('test123456', 10);
  console.log('argon2', result2);
})();
