// function outer(){
//     var outside = 'i am outer variable';
//     console.log('outer function');
//     console.log(outside);
//     inner();
//     function inner(){
//         var inside =' i am a inside varibale';
//         console.log('inner function');
//         console.log(inside);
//     };
// };
// outer();// calling function: thejs engine comes to function call then enters the function

// function chaining


// function one(){
//     console.log('i am one');
    
// };
// function two(){
//     console.log('i am two');
//     //  return one ;
// };
// function three(){
//     console.log('i am three');
//     return two;
// };

// three();
//  var returnedvalue=three;
//  console.log(returnedvalue);
//  returnedvalue();
// three()()();

//callback

// function callMom(callback){
//     setTimeout(() => {
//         console.log('she calls mom');
//         callback();
//     },5000);
// };
// function callRahul(){
//     setTimeout(() => {
//         console.log('she calls rahul');
//     },1000);
// };
// //callMom();
// //call Rahul;
// callMom(callRahul);

// console.log("-----------------------");

// function callMom(func1){
//     setTimeout(() => {
//         console.log('she calls mom');
//         func1(callDad);
//     },5000);
// };
// function callRahul(func2){
//     setTimeout(() => {
//         console.log('she calls rahul');
//         func2();
//     },3000);
// };
// function callDad(){
//     setTimeout(() => {
//         console.log('she calls dad');
//     },1000);
// }
// callMom(callRahul);

// console.log("----------------");

// function callMom(func1){
//     setTimeout(() => {
//         console.log('she calls mom');
//         func1(callDad);
//     },5000);
// };
// function callRahul(func2){
//     setTimeout(() => {
//         console.log('she calls rahul');
//         func2(callGangadhar);
//     },3000);
// };
// function callDad(func3){
//     setTimeout(() => {
//         console.log('she calls dad');
//         func3()
//     },2000);
// }
// function callGangadhar(){
//     setTimeout(() => {
//         console.log('she calls ganghadar');
// },1000);
// };
// callMom(callRahul);


console.log("******************");

// function add(a,b){
// return a+b;
// };
// function sub(a,b){
// return a-b;
// };
// function mul(a,b){
//     return a*b;
// };
// function opt(a,b,opt){
// return opt(a,b);
// };
// var result = opt(10,20 ,add);
// console.log(result);


console.log("-----------------");

// function add(a,b){
//     return a+b;
//     };
//     function sub(a,b){
//     return a-b;
//     };
//     function mul(a,b){
//         return a*b;
//     };


// function opt(a,b,opt,opt2,opt3){
//     var x =opt(a,b);
//     var y=opt2(a,b);
//     var z =opt3(a,b);
//     return [x,y,z];
// };
// var result =opt(10,20,sub,add,mul);
// console.log(result);


// for each
 var arr =['laddu','mathurapeda','kalakand','jamun']
arr.forEach((value,index,array) => {
   console.log(value);
   console.log(index);
   console.log(array);
})
   
//map
   var arr=arr.map((val,index) =>{
    return 'good'+ val;
});
console.log(result);
console.log(arr);

//filter
var arr1 =[12,34,45,67,89];
var result =arr1.filter((val,index) => {
    return val>40;
});
console.log(result);
console.log(arr1);

    







