function loginform(){
    var username = document.getElementById('username');
    var password = document.getElementById('password');

    if(username.value.trim()== ""){
        alert('please fill the username field')
        username.style.border='2px solid red';
        document.getElementById('info').style.visibility='visible'
        return false;
    }
    else if(username.value.length <=3){
        alert('minimum number of characters should be 3 in username')
        username.style.border='2px solid red'
        return false;
    }
    