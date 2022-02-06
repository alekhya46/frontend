function loginForm(){
    var a = document.getElementById('username');
    var b = document.getElementById('password');

    if(username.value.trim() == ''){
    alert("please enter username field");
    username.style.border = "2px solid red";
    document.getElementById('info').style.visibility='visible';
    return false;
    }
    else if(username.value.length <=3){
        alert("minimum number of characters should be 3 in username");
        username.style.border = "2px solid red"; 
        return false;
    }
    else{
    return true;
    }
}