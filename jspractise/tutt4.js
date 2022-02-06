console.log("tut4");
console.log("datatypes in js");
//js engines automatially finds the datatype
//javascript is dynamically typed because it understand what datatype is used unlike c where we mention int a=10;
//primitve datatypes -memory location in stack -string,number,boolean ,
// null,void,undefined(variable declared but not initialized),symbol;
//reference datattype - memory location in heap-array,object,date,math,function
//string
const fname ="alekhya";
console.log("my string is"+fname);
console.log(typeof fname);
//number 
const marks= 34;
console.log(typeof marks);
//boolean 
const isMarks=true;
console.log(typeof isMarks);
//null
let nullVar=null;
console.log(typeof nullVar);
//undefined
let xyz;
console.log(typeof xyz);
//reference datatypes-memory allocatn -heap
//array
let arr=[1,2,3,4];
console.log(arr,typeof arr); // type of all reference datatype is object
//object
let stuMarks = {
    shin :56,
    doremon:90,
    subject :'english'
};
console.log(stuMarks)
stuMarks.doremon =52;
console.log(stuMarks);
//2nd way to create an object
let car =  new Object();
car.model ="santro";
car.color = "red";
car.price = 120000
console.log(car);

//function 
function example() {

}
console.log(example);
console.log(typeof example);
//date
let todaysDate =new Date();
console.log(todaysDate);





