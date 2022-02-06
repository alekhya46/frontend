//prints date
// var date=new Date();
// console.log(date);

// var dateShin = new Date(1995,11,4,30,10,20)
// console.log(dateShin);

var dateObj = new Date(1997,8,16);
console.log(dateObj);
var mili =dateObj.getTime();
console.log(mili);
var date= new Date(mili);
console.log(date);