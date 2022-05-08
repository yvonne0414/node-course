function sum1(n){
  //for迴圈
  sum = 0
  for(let i = 1; i <= n; i++){
    sum += i;
  }
  return sum;
}

function sum2(n){
  //公式解
  return (n + 1) * n /2;
}

function sum3(n){
  //reduce
  // let arr = [];
  // for(let i = 1; i <= n; i++){
  //   arr.push(i)
  // }
  // let sum = arr.reduce((acc, num) => {
  //   acc +=num
  //   return acc
  // }, 0)
  // return sum;

  
  return [...Array(n+1).keys()].reduce((acc, num) => {
    acc +=num
    return acc
  }, 0)
}
//recursive版本（遞迴）
function sum4(n){
  if(n === 1){
    return n;
  }
  return sum4(n - 1) +n;
}

// console.log(sum(1));
// console.log(sum(2));
// console.log(sum(10));
// console.log(sum(100));

console.time('SUM1');
sum1(1000);
console.timeEnd('SUM1');

console.time('SUM2');
sum2(1000);
console.timeEnd('SUM2');

console.time('SUM3');
sum3(1000);
console.timeEnd('SUM3');

console.time('SUM4');
sum4(1000);
console.timeEnd('SUM4');