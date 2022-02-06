// program to generate a multiplication table

// take input from the user
const number = parseInt(prompt('Enter an integer: '));

//creating a multiplication table
for(let i = 1; i <= 10; i++) {

    // multiply i with number
    const result = i * number;

    // display the result
    console.log(`${number} * ${i} = ${result}`);
}

// In the above program, the user is prompted to enter an integer value.
//  Then, the for loop is used to iterate through 1 to 10 to create a multiplication table.

/* program to generate a multiplication table
upto a range */

// take number input from the user
const number = parseInt(prompt('Enter an integer: '));

// take range input from the user
const range = parseInt(prompt('Enter a range: '));

//creating a multiplication table
for(let i = 1; i <= range; i++) {
    const result = i * number;
    console.log(`${number} * ${i} = ${result}`);
}


// In the above example, the user is prompted to enter an integer and also a range for which they want to create a multiplication table.

// The user enters an integer (here 7) and a range (here 5). Then a multiplication table is created using a for loop for that range.
