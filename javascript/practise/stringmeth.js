// // 3 wys to declare javascript variable 
// // 1. using var , 2 .let and 3. const
// //var are container to store data 

// var x = 5;
// var y = 6;
// var z = x + y;

// // var can hold numbers and strings
// var person = "shin";
// var x = 5;

//string
//javaScript strings are for storing and manipulating text

// //STRING MANIPULATION

// var str = "alekhya"; //create variable 
// var str2 = `hi ${str}`;//storing in another string using template literal
// console.log(str2);

// escape character

// var str = "alekhya\nshiva"; // {\n sends the text of a string to other line}
// console.log(str);
// var str = "google\tchrome";// \t takes tab space in the string
// console.log(str); 
// var str = "internet\\explorer"; // to insert back slash in the string
// console.log(str);
// var str = "my \"google\" nnnnn"; // to insert "in the string
// console.log(str);
// var str = "my \'google";//to insert ' in the string
// console.log(str);

// // tofindstringlength or no of characters 
//  var str ="abcdefgh";
//  console.log(str.length);

//  //tofetch 3 rd character
//  console.log(str[3]);

// //  to add String[CONCAT] 
// var str = "google";
// var str1 ="chrome";
// console.log(str+" "+str1);
// console.log(str,str1);
// console.log(str.concat(str1));
// console.log("google".concat("chrome"));

// //comparing two strings

// var str ="hello";
// if("Hello"==str) {
//     console.log("equal");
// }
// else{
//     console.log("not equal");

// }

// //to fetch a string using substring
// var txt = "this is java tutorial";
// var txt1 = txt.substr(8,13);//2nd parameter length of the text to fetch
// console.log(txt1);
// var txt ="using visual studio cde";
// console.log(txt.substring(6,12));

// //to find the posiiton of char in a string
// var txt= " i am Learning javascript ";
// console.log(txt.indexOf('am'));
// console.log(txt.lastIndexOf('z'));//gives -1 outpiut if there is no z i string
// console.log(txt);
// //trim() method removes the white space from both sides of a string
// console.log(txt.trim());
// console.log(txt.trimStart());
// console.log(txt.trimEnd());
// //to convert the string to upper n lower case
// console.log(txt.toUpperCase());
// console.log(txt.toLowerCase());
// //to replace 
// console.log(txt.replace('Learning','practising'));
// //slice to fetch a string
// console.log(txt.slice(2,5));
// //2017 ecmascript string padding
// //stringpadding
// // var txt ="4";
// // console.log(txt.padStart(5,1));

// //to extract char 
// console.log(txt.charAt(4));
// console.log(txt.charCodeAt(0));//returns ascii value of char
// console.log()

// //to extract char in a string
// // ECMAScript 5 (2009) allows property access [ ] on strings:

// console.log(txt[4]);


// //array
// // An array is a special variable, which can hold more than one value
// //array methods

var book=["bio","math","science","neuro"]; // way to create an array 
// // // var book = new Array("bio","math","science");//way to create an array

// // console.log(book);
// // console.log(book[1]);//access an element of array
// // book[1]="social";//change an element in an array
// // console.log(book);
// // // operations on Array

// // console.log(book.length);//to find length of the array returns length "number"pi
// // console.log(book.push("neuro"));
// // // console.log(book);
// // // book.splice(1,2);
// // // console.log(book);
// // console.log(Array.isArray(txt));

// // for(i=0;i<book.length;i++){
// //     console.log(book[i]);
// // }
// // function myfun(value){
// //     console.log(value);
// // }
// // book.forEach(myfun)
// // book1 =book.toString('');
// // console.log(book1);
// // book2= book.join('*');
// // console.log(book2);
// // console.log(book.splice(1,2));
// var fruits =[ "orange","apple","kiwi","pomo"];
// console.log(fruits.slice(1));
var xyz =console.log(book.slice(1,2));
// // console.log(fruits.splice(1,2));
// // var txt= "hi i am learning";
// // console.log(txt.split(""));
// console.log(fruits.sort());
// console.log(fruits.reverse());

// var txt = "i am learning javascript";
// var a= txt.split("");
// console.log(a);
// var b= a.reverse();
// console.log(b);
// console.log(b.join(''));





