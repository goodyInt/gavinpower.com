var newButton = require('./buttons/newButton.js');
var $ = require('jquery');


// disable console
console.log('Check Out: http://www.goodyint.com');

function disableConsole() {
    if (!window.console) {
        window.console = {};
    }
    var methods = ['log', 'debug', 'warn', 'info'];
    for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () {};
    }
}
//disableConsole();


var button2 = newButton("fuck");
var blankDiv = document.createElement("div");
blankDiv.id = "blankDiv";
blankDiv.className = "buttonStyle";
document.body.appendChild(blankDiv);
$('#blankDiv').append(button2);



  