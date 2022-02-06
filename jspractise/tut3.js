console.log('tut3');
//variables in js 
// variables r containers to store data
//4 ways to declare js variables
//keywords : var(1995-2015),[let,const](2015 added es6 features)
// var is a keyword var x = 10 ; x is a variable  (identifier)
//var name="alekhya"; name is a varibale- (identifier)
// identifiers : cannot start with numbers
//must start with letters
//can contain letters,digits,underscores and dollar signs
// case senstive and cn start with $ and 

//var  - var can hold number and string aswell .while assigning string to var keyword use ""
var fname ="alekhya";
var channel;
console.log(fname);
console.log(channel);
var marks = 90;
console.log(marks);
var tname =`alekhya's home`;// to use any apostrophee we cn use backticks
console.log(tname);
var city ='delhi';
city ="hyderabad"; // can reinitialise
console.log(city);
var city ="banglore"; //can re-declare
console.log(city);

//const 
//const xyz; cant declare const without intiliazing
const ownerName = "shinchan";
// const ownerName ="doremon"; //cant redeclare with const
// ownerName = "harry";//assignmnt to const is not allowed it gives an error (if we donot wnt to chnage 
// the variable then go with const) // cnt reinitialise
console.log(ownerName);

//let 

{
    let city ="hyd";
   // let city ="kolkata"; // cant redeclare with let
   city ="kolkata"; // can reinitialise
    console.log(city); //have blockscope = can be accessed with in the block
}
console.log(city);

//const with array 
const arr1 =[1,2,3]
arr1.push(4);
console.log(arr1);

//most commmon programming case types
// camelCase
// kebab-case
// snake_case
//PascalCase











