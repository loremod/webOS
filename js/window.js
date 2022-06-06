
var mousePosition;
var offset = [0,0,0,0];
var div;
var isDown = false;
var movingElement;

// div = document.createElement("div");
// div.style.position = "absolute";
// div.style.right = "5px";
// div.style.top = "5px";
// div.style.padding="20px";
// div.setAttribute("contenteditable", "true");
// div.style.width = "110px";
// div.style.height = "120px";
// div.style.background = "yellow";
// div.style.color = "blue";
// div.style.overflow = "hidden";


// document.body.appendChild(div);

function closeWindow(instance){
    console.log("closing");
    instance.remove();
}
function hideWindow(instance){
    console.log("hiding")
    instance.style.display = "none";
}
function resizeWindow(instance){
    console.log("resizing")
    if(instance.getAttribute("data-size") == "normal"){
        instance.style.width = "";
        instance.style.height = "";
        instance.style.top = "0";
        instance.style.left =  "0";
        instance.style.right =  "0";
        instance.style.bottom =  "70px";
        instance.setAttribute("data-size", "fullscreen");
    }
    else if(instance.getAttribute("data-size") == "fullscreen"){
        instance.style.width = "";
        instance.style.height = "";
        instance.style.top = "25%";
        instance.style.left =  "25%";
        instance.style.right =  "25%";
        instance.style.bottom =  "25%";
        instance.setAttribute("data-size", "normal");
    }
}

function manageWindow(e){
    let actions = {'close-btn':closeWindow,'hide-btn':hideWindow,'resize-btn':resizeWindow}
    let e_classes = e.target.getAttribute("class").split(' ') 
    e_classes.forEach((e_class) => {
        if(e_class in actions)
            actions[e_class](e.currentTarget)
       });

    // console.log(e.target.getAttribute("class").split(' ') )
}


let instance = document.getElementsByClassName("window")[0];
console.log(instance.getAttribute("data-id"));
instance.addEventListener("click",manageWindow);
instance.addEventListener('mousedown', function(e) {
    if(e.target.getAttribute("class").includes("header")){
        isDown = true;
        movingElement = e.currentTarget;
        offset = [
            movingElement.offsetLeft - e.clientX,
            movingElement.offsetTop - e.clientY,
            window.innerWidth - (movingElement.offsetWidth + movingElement.offsetLeft) - (window.innerWidth - e.clientX),
            window.innerHeight - (movingElement.offsetHeight + movingElement.offsetTop) - (window.innerHeight - e.clientY)
        ];
    }
    });

instance.addEventListener('mouseup', function() {
    isDown = false;
});

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        console.log(offset)
        console.log(movingElement.offsetLeft)
        console.log( window.innerWidth - (movingElement.offsetWidth + movingElement.offsetLeft))
        mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        movingElement.style.left = (mousePosition.x + offset[0]) + 'px';
        movingElement.style.top  = (mousePosition.y + offset[1]) + 'px';
        movingElement.style.right  = (window.innerWidth - mousePosition.x + offset[2]) + 'px';
        movingElement.style.bottom  = (window.innerHeight - mousePosition.y + offset[3]) + 'px';
    }
});

/*e.target
    e.target.getAttribute("attr")
    e.currentTarget

    */