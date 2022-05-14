// 變數交換
let fruit = 'banana';
let veg = 'tomato';
// 最初寫法
let temp =fruit
fruit = veg
veg=temp

//ES6
[fruit, veg] = [veg, fruit]; // 左邊是新的變數名，右邊是交換後的值
console.log(fruit, veg); // "tomato" "banana"