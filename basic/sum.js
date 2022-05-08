function sum(n){
  //for迴圈
  // sum = 0
  // for(let i = 1; i <= n; i++){
  //   sum += i;
  // }
  // return sum;

  //公式解
  // return (n + 1) * n /2;

  //reduce
  let arr = [];
  for(let i = 1; i <= n; i++){
    arr.push(i)
  }
  let sum = arr.reduce((acc, num) => {
    acc +=num
    return acc
  }, 0)
  return sum;
}

// console.log(sum(1))
// console.log(sum(2))
// console.log(sum(10))
console.log(sum(100))