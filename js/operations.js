
let commands = ["sum", "sub", "multiply", "divide", "commands","pow","order","clean","doggify", "random-joke","color"];

//TODO for each terminal
function initializeShell(node){
    let terminal = node.getElementsByTagName("textarea")[0]
    terminal.addEventListener("keydown",(e)=>{shell_onKeyTyped(e)})
}

function shell_onKeyTyped(e) {
    switch(e.key) {
        case "Enter":
            getCommandLine(e.currentTarget);
          break;
        case "Backspace":
          break;
    }
}

function getCommandLine(terminal){
    let lines = terminal.value.split('\n');
    let lineIndex = lines.length - 1;
    execCommand(lines[lineIndex],terminal)
}

function execCommand(line,terminal){
    tokens = line.split(" ");
    command = tokens[0];
    params = tokens.slice(1);
    switch(command){
        case "sum":
            execSum(params,terminal);
            break;
        case "sub":
            execSub(params,terminal);
            break;
        case "multiply":
            execMoltiply(params,terminal);
            break;
        case "divide":
            execDivide(params,terminal);
            break;
        case "commands":
            printCommands(terminal);
            break;
        case "pow":
            execPow(params,terminal);
            break;
        case "order":
            orderList(params,terminal);
            break;
        case "clean":
            svuota(terminal);
            break;
        case "doggify":
            doggify(params,terminal);
            break;
        case "random-joke":
            randomJoke(terminal);
            break;
        case "color":
            changeColor(params,terminal);
            break;
    }
}

function changeColor(params,terminal){
    terminal.style.color = params[0];
}

function randomJoke(terminal){
    jokes = [];
    jokes[0] = "Il commercialista è triste perchè è partita Iva";
    jokes[1] = "Quante foglie ha un albero pasticcere?\nMille foglie"
    jokes[2] = "Quale animale va preso dalla parte del manico?\nIl lama"
    jokes[3] = "Cosa succede se una mucca cade supina?\nPina muore"
    rand = Math.floor(Math.random() * jokes.length);
    terminal.value+="\n"+jokes[rand];
}
function doggify(params,terminal){
    terminal.value += "\n Doggified: "
    for(let i = 0; i < params.length; i++){
       terminal.value += "woof ";
    }
}
function svuota(terminal){
    terminal.value = "";
}

function orderList(params,terminal){
    let num_list = [];
    console.log(params)
    for(let i = 1; i < params.length; i++){
        num_list.push(parseInt(params[i]));
    }
    console.log(num_list)
    console.log("List"+num_list.sort())
    if(params[0] == "-desc")
        terminal.value += "\n Ordered: " + num_list.sort().reverse();
    else if(params[0] == "-asc")
        terminal.value += "\n Ordered: " + num_list.sort();
    else terminal.value += "\n Syntax: order  <-asc | -desc>";
}

function printCommands(terminal){
    terminal.value += "\n ---COMMANDS---";
    commands.forEach(element => {
        terminal.value += "\n -" + element + ".";
    });
}
function execPow(params,terminal){
    terminal.value += "\n Totale:" + Math.pow(parseInt(params[0]), parseInt(params[1]));
}

function execSum(params,terminal){
    let tot = 0;
    params.forEach(element => {
        tot += parseInt(element);
    });
    console.log("Totale: "+tot)
    terminal.value += '\n' + " Totale: " + tot;
}

function execSub(params,terminal){
    let tot = 0;
    let sign = 1;
    params.forEach(element => {
        tot += parseInt(element)*(sign);
        sign = -1;
    });
    console.log("Totale: "+tot)
    terminal.value += '\n' + " Totale: " + tot;
}

function execMoltiply(params,terminal){
    let tot = 1;
    params.forEach(element => {
        tot *= parseInt(element);
    });
    console.log("Totale: "+tot)
    terminal.value += '\n' + " Totale: " + tot;
}

function execDivide(params,terminal){
    let tot = 1;
    let sign = 1;
    params.forEach(element => {
        tot *= Math.pow(parseInt(element), sign);
        sign = -1;
    });
    console.log("Totale: "+tot)
    terminal.value += '\n' + " Totale: " + tot;
}



function myFunction(item) {
    console.log("ciao")
    console.log(item)
  }