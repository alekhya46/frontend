// function example(message){
//     console.log(message);
// };
// let message ='hello pals ';
// example(message);
var a = 10;
console.log(a);
var b = "hello";
console.log(b);
var c;
c = 10;
console.log(c);
var d;
d = "hi";
console.log(d);
var e;
console.log(e);
var f;
console.log(f);
// arrays
var arr1 = [10, 20, 30];
var arr = [10, 20, 30, '40']; //union types
var xyz = true; //uniontypes=to chose any datatype
// var xyz :number|string = true; //error
var arr2 = ['hi', 'hello'];
//tuples= heterogenous array
var arr3 = [[10, 20], 'hello', true];
console.log(arr3);
arr3[1] = 'hi';
console.log(arr3);
var obj = {
    age: 25,
    name: 'shin',
    place: 'china'
}; // the order can be any in an object unlike array
//enums : enumeration
var Color;
(function (Color) {
    Color[Color["blue"] = 0] = "blue";
    Color[Color["orange"] = 1] = "orange";
    Color[Color["red"] = 2] = "red";
    Color[Color["hotpink"] = 3] = "hotpink"; //3
})(Color || (Color = {}));
;
console.log(typeof Color);
var abc = Color.orange;
console.log(abc);
var choclate;
choclate = {
    productName: 'cadbury',
    productprice: 10,
    isGood: true
};
console.log(choclate);
var icecream;
icecream = {
    productName: 'blackcurrent',
    productprice: 10,
    isGood: false
};
console.log(icecream);
//function
function example(a) {
    console.log(a);
    return a[0];
}
;
console.log(example(['a', 'b', 'c']));
