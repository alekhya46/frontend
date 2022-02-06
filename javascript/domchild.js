//  var unorderList = document.getElementsById('order');
//  var childrens = unorderList.childNodes;
//  console.log(childrens);
 function removeSomeone(){
     var unList= document.getElementById('unorder');
     var children = unList.childNodes;
     console.log(children);
    //  unList.removeChild(unList.firstElementChild);
    //  unList.removeChild(unList.lastElementChild);
     unList.removeChild(children[0]);
    //  unList.removeChild(unList.firstChild);
 }