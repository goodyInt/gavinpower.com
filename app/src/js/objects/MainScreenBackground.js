'use strict';

var $ = require('jquery');

function mainScreenBackground() {
  var mainScreenHolderBackgroundDiv;
  mainScreenHolderBackgroundDiv = document.createElement('div');
  mainScreenHolderBackgroundDiv.id = "mainScreenHolderBackgroundDiv";
  mainScreenHolderBackgroundDiv.className = "mainScreenHolderBackground";

  this.addToStage = function () {
    if (!document.getElementById(mainScreenHolderBackgroundDiv.id)) {
      document.body.appendChild(mainScreenHolderBackgroundDiv);
      $("#mainScreenHolderBackgroundDiv").css("opacity", 0.0);
      var tSpeed = .35;
      TweenMax.to($("#mainScreenHolderBackgroundDiv"), tSpeed, {
        delay: 0,
        opacity: 1,
        ease: Quad.easeOut
      });
    }
  }

  this.removeFromStage = function () {
    if (document.getElementById(mainScreenHolderBackgroundDiv.id)) {
      document.body.removeChild(mainScreenHolderBackgroundDiv);
    }
  }
}

module.exports = mainScreenBackground;