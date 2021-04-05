
//a global reference can cause problems
function getConsoleMessage(){
    let console='hello world'; //its a local name
    return console;
}

console.log(getConsoleMessage()); //console is still javascript default console