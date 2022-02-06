console.log('tut5');
///type conversion and type coercion
//  convert to string using --String(),toString();
let xyz =String(34);
console.log(xyz,(typeof xyz));
let boln = String(true);
console.log(boln,(typeof boln));
let tDate= String(new Date());
console.log(tDate,(typeof tDate));
let arr =String([1,2,3,4]);//can apply string methods
console.log(arr,typeof arr);
console.log(arr.length);
let i=8;
console.log(typeof i);
console.log(i.toString(),typeof i);

//number function-Number()
let stri = Number("3434")
console.log(stri,typeof stri);
let  striB = Number(true);
console.log(striB,typeof striB);
//parseInt parseFloat
let num =parseInt('34.09')
console.log(num,typeof num);
console.log(num.toFixed(4))
let numA= parseFloat('34.009999')
console.log(numA.toFixed(9));


///type coercion
let myStr ="698";
let myNum =34;
console.log(myStr+myNum)


















