// syntax
// function recurse() {
//     // function code
//     recurse();
//     // function code
// }

// recurse()

// function recurse() {
//     if(condition) {
//         recurse();
//     }
//     else {
//         // stop calling recurse()
//     }
// }

// recurse();


// // program to count down numbers to 1
// function countDown(number) {

//     // display the number
//     console.log(number);

//     // decrease the number value
//     const newNumber = number - 1;

//     // base case
//     if (newNumber > 0) {
//         countDown(newNumber);
//     }
// }

// countDown(4);

//factorial 

function factorial(x) 
{ 

  if (x === 0)
 {
    return 1;
 }
  return x * factorial(x-1);
         
}
console.log(factorial(0));



// function countDown(fromNumber) {
//     console.log(fromNumber);
//     countDown(fromNumber-1);
//     break;
    
// }

// countDown(3);


// regular Expression

// syntax

// /pattern/modifiers;

