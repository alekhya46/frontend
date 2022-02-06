// // function example(message){
// //     console.log(message);
// // };
// // let message ='hello pals ';
// // example(message);

// let a:number= 10;
// console.log(a);
// let b:string = "hello";
// console.log(b);
// let c;
// c= 10;
// console.log(c);
// let d;
// d="hi";
// console.log(d);
// let e;
// console.log(e);
// let f: string ;
// console.log(f);
 

// // arrays
// var arr1=[10,20,30];
// var arr=[10,20,30,'40'];//union types
// var xyz : number|string|boolean =true;//uniontypes=to chose any datatype
// // var xyz :number|string = true; //error
// var arr2 : string[]=['hi','hello'];
// //tuples= heterogenous array
// var arr3 :[number[],string,boolean]=[[10,20],'hello',true];
// console.log(arr3);
// arr3[1]='hi';
// console.log(arr3);


// var obj:{name:string,age:number,place:string}={
//     age :25,
//     name: 'shin',
    
//     place:'china',
// };// the order can be any in an object unlike array

// //enums : enumeration
// enum Color {  //color is a userdefined dataype // enums is like array 
//     blue, //0
//     orange, //1
//     red, //2
//     hotpink //3
// };
// console.log(typeof Color);

// var abc :Color = Color.orange
// console.log(abc);


// //interface 
// interface Product{
//     productName : string,
//     productprice :number,
//     isGood : boolean
// }
// let choclate : Product;
// choclate ={
//     productName : 'cadbury',
//     productprice :10,
//     isGood :true
// }
// console.log(choclate);
// var icecream : Product;
// icecream ={
//     productName : 'blackcurrent',
//     productprice:10,
//     isGood : false
// }
// console.log(icecream);

// //function
// function example<T>(a:T[]):T{
//     console.log(a);
//     return a[0];
// };
// console.log(example(['a','b','c']));

 
















