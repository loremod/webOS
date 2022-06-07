var processes = {};
var last_pid = 1;

var actual_z_index = 0;
var lastTarget = {};

var mousePosition;
var offset = [0, 0, 0, 0];
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

function applyListeners(instance) {
  processes[instance.getAttribute("data-pid")] = {
    instance: instance,
    app: instance.getAttribute("data-app"),
  };
  // console.log(instance.getAttribute("data-id"));
  instance.addEventListener("click", manageWindow);
  instance.addEventListener("mousedown", function (e) {
    if (e.target.getAttribute("class").includes("header")) {
      isDown = true;
      movingElement = e.currentTarget;
      offset = [
        movingElement.offsetLeft - e.clientX,
        movingElement.offsetTop - e.clientY,
        window.innerWidth -
          (movingElement.offsetWidth + movingElement.offsetLeft) -
          (window.innerWidth - e.clientX),
        window.innerHeight -
          (movingElement.offsetHeight + movingElement.offsetTop) -
          (window.innerHeight - e.clientY),
      ];
    }
  });

  document.addEventListener("mouseup", function () {
    isDown = false;
  });

  document.addEventListener("mousemove", function (event) {
    event.preventDefault();
    if (isDown) {
      console.log(offset);
      console.log(movingElement.offsetLeft);
      console.log(
        window.innerWidth -
          (movingElement.offsetWidth + movingElement.offsetLeft)
      );
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      movingElement.style.left = mousePosition.x + offset[0] + "px";
      movingElement.style.top = mousePosition.y + offset[1] + "px";
      movingElement.style.right =
        window.innerWidth - mousePosition.x + offset[2] + "px";
      movingElement.style.bottom =
        window.innerHeight - mousePosition.y + offset[3] + "px";
    }
  });
}

function getNewPid() {
  last_pid += 1;
  return last_pid;
}
function createShell() {
  const node = document.createElement("div");
  node.classList.add("window");
  node.classList.add("shell");
  node.setAttribute("data-size", "normal");
  node.setAttribute("data-pid", getNewPid());
  node.setAttribute("data-app", "shell");
  node.style.zIndex = actual_z_index;
  node.innerHTML = `
    <div class="header">
        <div class="btns-container">
        <div class="round-btn close-btn"></div>
        <div class="round-btn hide-btn"></div>
        <div class="round-btn resize-btn"></div>
        </div>
        <div class="shell-title">lorenzo@modicaOS</div>
    </div>
    <div class="content">
        <!-- lorenzo@modicaOS:~ -->
        <textarea class="shell-content" spellcheck="false"></textarea>
    </div>
    
    `;
  document.body.appendChild(node);
    applyListeners(node);
    initializeShell(node);
}

function createCamera(){
  const node = document.createElement("div");
  node.classList.add("window");
  // node.classList.add("shell");
  node.setAttribute("data-size", "normal");
  node.setAttribute("data-pid", getNewPid());
  node.setAttribute("data-app", "camera");
  node.style.zIndex = actual_z_index;
  node.innerHTML = `
  <div class="header">
      <div class="btns-container">
      <div class="round-btn close-btn"></div>
      <div class="round-btn hide-btn"></div>
      <div class="round-btn resize-btn"></div>
      </div>
      <div class="window-title">Camera</div>
  </div>
  <div class="content">
      
  </div>
  
  `;
  document.body.appendChild(node);
  applyListeners(node);
  startCamera(node);
}


function createOpenADoorTutorial(){
  const node = document.createElement("div");
  node.classList.add("window");
  // node.classList.add("shell");
  node.setAttribute("data-size", "normal");
  node.setAttribute("data-pid", getNewPid());
  node.setAttribute("data-app", "open-door-tutorial");
  node.style.zIndex = actual_z_index;
  node.innerHTML = `
  <div class="header">
      <div class="btns-container">
      <div class="round-btn close-btn"></div>
      <div class="round-btn hide-btn"></div>
      <div class="round-btn resize-btn"></div>
      </div>
      <div class="window-title">Open a door - Tutorial</div>
  </div>
  <div class="content">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/qsKoT__cmAw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></iframe>
  </div>
  
  `;
  document.body.appendChild(node);
  applyListeners(node);
}

function createPizzaTutorial(){
  const node = document.createElement("div");
  node.classList.add("window");
  // node.classList.add("shell");
  node.setAttribute("data-size", "normal");
  node.setAttribute("data-pid", getNewPid());
  node.setAttribute("data-app", "pizza-tutorial");
  node.style.zIndex = actual_z_index;
  node.innerHTML = `
  <div class="header">
      <div class="btns-container">
      <div class="round-btn close-btn"></div>
      <div class="round-btn hide-btn"></div>
      <div class="round-btn resize-btn"></div>
      </div>
      <div class="window-title">Make a beautiful PIZZA, MAMMA MIA!- Tutorial</div>
  </div>
  <div class="content">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1-SJGQ2HLp8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  
  `;
  document.body.appendChild(node);
  applyListeners(node);
}

function createWindow(appName) {
  console.log("New " + appName);
  switch (appName) {
    case "shell":
      createShell();
      break;
    case "camera":
      createCamera();
      break;
    case "open-door-tutorial":
      createOpenADoorTutorial()
      break;
    case "pizza-tutorial":
      createPizzaTutorial()
      break;
  }
}

function getAppProcesses(app) {
  appProcessesList = [];
  for (const [key, value] of Object.entries(processes)) {
    if (value["app"] == app)
      appProcessesList.push({ key: key, instance: value.instance });
  }
  return appProcessesList;
}

//utilizza l'istanza del processo
function closeWindow(instance) {
  console.log(processes);
  console.log("closing");
  delete processes[instance.getAttribute("data-pid")];
  instance.remove();
  console.log(processes);
}
//utilizza l'istanza del processo
function hideWindow(instance) {
  console.log("hiding");
  instance.style.display = "none";
}
//utilizza il process id
function showWindow(pid) {
  console.log("showing");
  processes[pid]["instance"].style.display = "block";
}
//utilizza l'istanza del processo
function resizeWindow(instance) {
  console.log("resizing");
  if (instance.getAttribute("data-size") == "normal") {
    instance.style.width = "";
    instance.style.height = "";
    instance.style.top = "0";
    instance.style.left = "0";
    instance.style.right = "0";
    instance.style.bottom = "70px";
    instance.setAttribute("data-size", "fullscreen");
  } else if (instance.getAttribute("data-size") == "fullscreen") {
    instance.style.width = "";
    instance.style.height = "";
    instance.style.top = "25%";
    instance.style.left = "25%";
    instance.style.right = "25%";
    instance.style.bottom = "25%";
    instance.setAttribute("data-size", "normal");
  }
}

function manageWindow(e) {
  let actions = {
    "close-btn": closeWindow,
    "hide-btn": hideWindow,
    "resize-btn": resizeWindow,
  };

  if(e.currentTarget != lastTarget){
    actual_z_index += 1;
    e.currentTarget.style.zIndex = actual_z_index.toString();
    lastTarget = e.currentTarget;
    console.log(actual_z_index);
  }
  
  let e_classes = e.target.getAttribute("class").split(" ");
  e_classes.forEach((e_class) => {
    if (e_class in actions) actions[e_class](e.currentTarget);
  });

  // console.log(e.target.getAttribute("class").split(' ') )
}



//CODE
applyListeners(document.getElementsByClassName("window")[0]);
initializeShell(document.getElementsByClassName("window")[0]);

/*e.target
    e.target.getAttribute("attr")
    e.currentTarget

    */
