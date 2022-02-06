console.log('');
//string methods :imp in project
const fname ="alekhya";
const greeting ="good morning";
console.log(fname+' '+greeting);
let html= "hello";
html = html.concat(' ', 'where ',' are' ,' you');
console.log(html.length);
console.log(html.toUpperCase());
console.log(html.toLowerCase());
console.log(html)

let css ="how are you"
console.log(css.indexOf('a'));//gives index of the string
console.log(css[0]);//return value at index 0
console.log(css[1]);//returns value at index 1
console.log(css.indexOf('are'));//returns index -number
console.log(css.indexOf('this'));//returns index
console.log(css.lastIndexOf('u'));//returns index
console.log(css.charAt(4));//gives the (value) at that index
console.log(css.endsWith('u'));//returns boolean
console.log(css.includes('is'));//searchs thestring returns boolean
console.log(css.substring(0,5));//(n-1)returns string upto 5 dosnt include 5
console.log(css.substring(-4)); //return entire string
console.log(css.slice(-4));//return last 4 string
console.log(css.slice(0,5));//return n-1 string
console.log(css.split(''));//to covert a string into array
console.log(css.replace('how','where'));//replace how with where,doesnt change the  original string
console.log(css);
//template literal
let fruit1="orange";
let fruit2="apple";
let myHtml=`hello ${css}
<h1>this is template literal<h1>
<p>you like ${fruit1} and ${fruit2}<p>
`
console.log(myHtml)
document.body.innerHTML= myHtml;
// document.body.innerText= "hello"








