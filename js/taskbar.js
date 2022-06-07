function showAppList(e){
    listTarget = e.currentTarget.getElementsByClassName("list")[0];
    appName = e.currentTarget.getAttribute("data-app");
    appRows = getAppProcesses(appName);
    listTarget.innerHTML = '';
    appRows.forEach((instance)=>{
        const node = document.createElement("div");
        node.classList.add("row");
        node.classList.add("instance");
        node.setAttribute("data-pid",instance.key);
        const textnode = document.createTextNode(appName+"("+instance.key+")");
        node.appendChild(textnode);
        listTarget.appendChild(node);
    });
    const nodeNew = document.createElement("div");
    nodeNew.classList.add("row");
    nodeNew.classList.add("new");
    const textnode = document.createTextNode("Nuova finestra");
    nodeNew.appendChild(textnode);
    listTarget.appendChild(nodeNew);
    listTarget.style.display = "block";
}
function onAppClick(e){
    e_class = e.target.getAttribute("class");
    listTarget = e.currentTarget.getElementsByClassName("list")[0];
    
    

    if(e_class.includes("appname") || e_class.includes("logo")){
        if(listTarget.style.display=="block")
            listTarget.style.display="none"
        else
            showAppList(e)
        return;
    }
    else if(e_class.includes("instance")){
        // console.log(e.target.getAttribute("data-pid"))
        showWindow(e.target.getAttribute("data-pid"))
    }
    else if(e_class.includes("new")){
        // console.log(e.target.getAttribute("data-pid"))
        createWindow(e.currentTarget.getAttribute("data-app"));
    }
    e.currentTarget.getElementsByClassName("list")[0].style.display = "none";
    // console.log(e.target)
}
function initializeTaskbar(){
    let taskbar = document.getElementsByClassName("taskbar")[0];
    console.log(taskbar);
    apps = taskbar.getElementsByClassName("item-taskbar");
    console.log(apps.length);
    for(let i = 0; i < apps.length; i++){
        console.log(apps[i]);
        apps[i].addEventListener("click",onAppClick);
    } 
    
}

document.getElementsByClassName("taskbar")[0].onload = initializeTaskbar();
