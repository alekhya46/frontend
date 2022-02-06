// //string method

// // stringlength
// var text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// console.log(text.length);

// //Extracting String Parts
// // slice(start, end)
// // substring(start, end)
// // substr(start, length)

// var str = "Apple, Banana, Kiwi";
//  console.log( str.slice(7,13));

//  var str = "Apple, Banana, Kiwi";
//  console.log(str.slice(-12,-6));

//  var str= "Apple, Banana,kiwi";
//  console.log(str.slice(7));

// // substring() is similar to slice().
// // The difference is that substring() cannot accept negative indexes.

// var str = "Apple, Banana, Kiwi";
// console.log(str.substring(7, 13));

// // The substr() Method
// // substr() is similar to slice().

// // The difference is that the second parameter specifies the length of the extracted part.

// var str = "Apple, Banana, Kiwi";
// console.log(str.substr(7, 6));

// var str ="apple,banana,kiwi";
// console.log(str.substr(7));


// // Replacing String Content

// var str= "Please visit Microsoft!";
// console.log(str.replace("Microsoft", "W3Schools"));

// // The pop() method removes the last element from an array:
// // The pop() method returns the value that was "popped out":

// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits.pop());
// console.log(fruits);

// // The push() method adds a new element to an array (at the end):

// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits.push("Kiwi"));
// console.log(fruits);

// // The push() method returns the new array length:

// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// var length = fruits.push("Kiwi");

// // Deleting Elements
// const fru = ["Banana", "Orange", "Apple", "Mango"];
// fru1 = delete fru[2];

// //splice
// const fr = ["Banana", "Orange", "Apple", "Mango"];
// fr.splice(2, 0, "Lemon", "Kiwi");
// console.log(fruits)

// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.splice(2, 0, "Lemon", "Kiwi");

// const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// const citrus = fruits.slice(1);

// create an array 

// var fruits = ['Apple', 'Banana']
// console.log(fruits.length)

// arrayisarray
// Array.isArray([1, 2, 3]); 
// Array.isArray({foo: 123}); 
// Array.isArray('foobar');   
// Array.isArray(undefined);  
