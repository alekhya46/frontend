let projectArray=[]
function addProject(){
    let ele=document.getElementById('projects');
    projectArray.push(ele.value);
    localStorage.setItem('projectArray');
}