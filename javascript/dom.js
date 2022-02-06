document.write('hello people');
var ele = document.createElement('h1');
document.body.append(ele);
// ele.innerText='welcome to the app';
// ele.textContent='welcome';
// ele.innerHTML='<a href="#"> Google </a>';
// document.write(Date.now());
// document.write(Date());

// setInterval(() => {
//     var time= new Date();
//     ele.innerText= time;
    
// }, )

// var time= new Date();
// ele.innerText= time;

// var b =Array.from(document.getElementsByClassName('select'));
var b=Array.from(document.getElementsByTagName('div'));
// b.forEach(changeColor);
// function changeColor(ele){
//     ele.style.color='green';
// }

//only document.get gives html collection{object} which has to be converted to array
var b =Array.from(document.getElementsByClassName('select'))
b.forEach(changeColor);
function changeColor(ele){
    setInterval(( )=> {
    var x =Math.random();
    if (x>0 && x<0.25){
        ele.style.color="green";
    }

    else if(x>=0.25 && x<0.5){
    ele.style.color="red";
}
else if(x>=0.5 && x<0.75){
    ele.style.color="blue";
}
else{
    ele.style.color="pink";
}
    },100);
}

//query selector
// var queryEle = document.querySelector('div');//queryselectorAll//can write id and class selector
// queryEle.forEach(ele) => {
//     ele.style.color='hot pink';
// }

