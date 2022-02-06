// fetch("./aa.json").then((res)=> {
//     res.json().then(data=> {
//         console.log(data);
//     })
// })

// var car ={
//     color:'white',
//     model:2021,
//     series:'q7'
// };
// var store= JSON.stringify(car)
// localStorage.setItem('car',store);
// var res = localStorage.getItem('car');
// console.log(res);
// // console.log(JSON.parse(res));
// JSON.parse(localStorage.getItem('car'));

// var store= JSON.stringify(car)
// sessionStorage.setItem('car',store);
// var res = sessionStorage.getItem('car');
// console.log(res);
// // console.log(JSON.parse(res));
// JSON.parse(localStorage.getItem('car'));


// //deep copy
// let country={
//     name:'india',
//     capital:'newdelhi',
//     curency:'india'
// };

// console.log(country);

// let othercountry =JSON.parse(JSON.stringify(country));
// console.log(othercountry);
// othercountry.name='japan';
// othercountry.capital='tokyo';
// console.log(othercountry);
// console.log(country);

// //shallowcopy

// let bike={
//     brand: 'bajaj',
//     version: 'ns200',
//     color : 'red'
// };
// console.log(bike);
// let bike2= bike;
// console.log(bike2);
// bike2.version='rs200';
// bike2.color='pink';
// console.log(bike2);


// //promise

// let ans= confirm('does shin gifted iphn');
// let gift = new Promise ((resolve,reject) => {
//     if(ans==true){
//         resolve('promise iskept')
//     }
//    else{
//        reject('prommisefailed')
//    }
// });
// console.log(gift);
// gift.then((res) =>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// }
// );


// //asyncand await
// function createData(){
//     return new Promise((resolve,reject)=> {
//   let x =20;
//     if(x==10){
//         setTimeout(() => {
//             resolve ('data created')
//         },5000);
//     }
//     else{
//         setTimeout(() =>{
//             reject('data not created')  
//     },5000);
// }
//     })
// };
// async function showData(){
//     console.log('process startd');
//     try{
//         let res = await createData();
//         console.log(res);
//     }
//     catch(err){
//         console.log(err);
//     }
//     setTimeout(() => {
//         console.log('show data');
//     },2000);
// };
//     showData();

    //spread operator

    let a=[1,2,3,4]
    let b=[10,20,30,40,...a]
    console.log(b);

//rest operator
function add(a,...b){
    console.log(a);
    console.log(b);

};
add(10,20,30,40,50);

//array destructring
var arr =[100,200,300,400];
[a,b,c,d]=arr;
console.log(a);

//object destructuring

var obj={
    name :  'shin',
    age: 40,
    salary:30000,

};
let{fname,age,salary:payment=20000}=obj;
console.log(payment);









