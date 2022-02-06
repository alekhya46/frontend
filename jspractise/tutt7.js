console.log("tut7");
console.log("arrays");
const marks =[20,30,40,50];
const fruits =['orange','mango','apple'];
const mix = ['str',30, ,[3,5]];
//create array with new keyword
const arr= new Array(23,40,'orange');
console.log(arr);
console.log(marks);
console.log(typeof arr);
console.log(arr[0]);
console.log(arr.length);//length is a property,return length of array
console.log(Array.isArray(arr));//Array.isArray is a method //returns boolean
arr[0]='shin';
console.log(arr);
console.log(arr.indexOf('shin'));//returns the index of the first occurrence of a value in an array, or -1 if it is not present.
//ways to mutate an array
//push
arr.push(90);//append the element to end of array ,returns new length of array if logged
console.log(arr)
//unshift
arr.unshift(94);//inserts new element at the start of an arrray ,returns new length
console.log(arr);
//pop
console.log(marks.pop());//retuns last element and changes the original array
console.log(marks)
//shift
console.log(marks.shift());
const xyz =[23,45,67,78,98,77,666,60]
console.log(xyz.splice(1,3));//to remove elements &returns removed elements into array
console.log(xyz)//splice changes the original array
console.log(xyz.reverse())//reverses an array
let abc=[1,2,3]
let pqr =[4,5,6]
let  op=pqr.concat(abc)
console.log(op)



















