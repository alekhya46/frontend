
// hoisting

console.log(abc);
var abc=20;

function sample(){
    console.log(xyz);
    var xyz='hello';
};
sample()
//functionscope
//global variable
var xyz='hello';
function sample(){
    console.log(xyz);
};
sample()
console.log("----------");

var xyz ='hello';
console.log(xyz);

function sample(){
    xyz='good morning';
    console.log(xyz);
};
console.log(xyz);
sample()
console.log("-----------");

//we cant take same function name
//we caant take same vaar name


//same variable name 


var xyz ='hello';
console.log(xyz);

function sample(){
   var xyz='good morning';
    console.log(xyz);
};
console.log(xyz);
sample()
console.log(xyz);
console.log("-----------");










