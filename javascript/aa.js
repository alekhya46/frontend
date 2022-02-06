function mul(){
    var a =document.getElementById('one');
    var b = document.getElementById('two');
    var result=document.querySelector('div');
    result.innerText=parseInt(a.value)*parseInt(b.value);
}
function add(){
    var a =document.getElementById('one');
    var b = document.getElementById('two');
    var result=document.querySelector('div');
    result.innerText=parseInt(a.value)+parseInt(b.value);

}
function sub(){
    var a =document.getElementById('one');
    var b = document.getElementById('two');
    var result=document.querySelector('div');
    result.innerText=parseInt(a.value)-parseInt(b.value);
}