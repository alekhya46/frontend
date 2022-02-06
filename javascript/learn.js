let employeeDetails = [
    {
        name : "shinchan",
        age : 20,
    },
    {
        name : "doremon",
        age : 20,
    },
    {
        name : "shizuka",
        age : 20,
    }
]
// w use JSON.stringify to convert javascript object to json string (sendn to backend data)
let ans = JSON.stringify(employeeDetails);
console.log(ans);
//WE USE JSON.parse to convrt json string to javascript object to apply js methods 
let obb = JSON.parse(ans);
console.log(obb)
//or
let str ='[{"name":"shinchan","age":20},{"name":"doremon","age":20},{"name":"shizuka","age":20}]'
let obc = JSON.parse(str);
console.log(obc);
//access backend data by using fetch method
///FETCH -- GET  METHOD
console.log(fetch('https://api.github.com/users'));
fetch('https://api.github.com/users').then((res)=>{
    console.log(res)
})
fetch('https://api.github.com/users').then((res)=>res.json())
.then((data)=>{
    console.log(data)})
    fetch('https://api.github.com/users').then(res=>res.json()).then(data=>console.log(data));

    //FETCH POST METHOD
    fetch('https://api.github.com/users',
    {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            name :'doremon'
        })
    }).then(res=> { return res.json()} ).then(data=>console.log(data)).catch(error=>console.log('error'));

let p = new Promise((resolve,reject)=>{
    let a =1+1
    if(a==2){
        resolve('sucess')
    }
    else{
        reject('failed')
    }

})
//then is called when promise is resolved succesfully and

// catch is called when pormise is rejcted
p.then(message=>{
    console.log(message)  
}).catch((message)=>{
    console.log(message)
})
// var store= JSON.stringify(car)
// localStorage.setItem('car',store);
// var res = localStorage.getItem('car');
// console.log(res);
// // console.log(JSON.parse(res));
// JSON.parse(localStorage.getItem('car'));
car ={
    name : 'santro',
    model : 2450,
    price : "10lakh"
}
var store = JSON.stringify(car);
var abc =localStorage.setItem('car',store);

var xyz= localStorage.getItem('car');
console.log(xyz)
console.log('hello');
var res = JSON.parse(xyz)
console.log(res)






