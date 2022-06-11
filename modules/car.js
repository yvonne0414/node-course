// exports=module.exports={};
let speed = 100;
let brand = 'Ford';
let color = 'blue';
function run() {
  console.log("i'm running", speed);
}

// exports.brand = 'Ford';
// exports.color = 'blue';
// exports.run = function () {
//   console.log("i'm running", speed);
// };

// 沒有匯出 speed ，把外部不需要的資料封裝起來
module.exports = {
  brand,
  color,
  run,
};

//return module.exports;
