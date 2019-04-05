var newButton = require('./buttons/newButton.js');
var $ = require('jquery');
var tweenMax = require('tweenMax');

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


var button2 = newButton("fuck fuck fuck");
var blankDiv = document.createElement("div");
blankDiv.id = "blankDiv";
document.body.appendChild(blankDiv);
$('#blankDiv').append(button2);
$("#blankDiv").css("opacity",0);

tweenMax.to( $("#blankDiv"), 1, {delay:.35,opacity: 1,ease: Quad.easeOut, onComplete:tweenDone});
tweenMax.to( $("#blankDiv"), 1, {delay:2.35,left: '100px',ease: Quad.easeOut, onComplete:tweenDone2});
function tweenDone(){
console.log('tweenDone');;

}
function tweenDone2(){
    console.log('tweenDone2');
    var windowHeight = window.innerHeight - 20;
    console.log(windowHeight);
    tweenMax.to( $("#blankDiv"), 1, {top:  window.innerHeight - 20,ease: Quad.easeOut});
    }








  