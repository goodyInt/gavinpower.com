'use strict';

var $ = require('jquery');

function ExperienceScreenBackground(screenId) {
  var thisScreenId = screenId;
  var mainScreenHolderBackgroundDiv;
  mainScreenHolderBackgroundDiv = document.createElement('div');
  mainScreenHolderBackgroundDiv.id = thisScreenId;
  mainScreenHolderBackgroundDiv.className = "experienceScreenHolderBackground";

  this.addToStage = function () {
    if (!document.getElementById(mainScreenHolderBackgroundDiv.id)) {
      document.body.appendChild(mainScreenHolderBackgroundDiv);
      $("#"+thisScreenId).css("opacity", 0.0);
      var tSpeed = .35;
      TweenMax.to($("#"+thisScreenId), tSpeed, {
        delay: 0,
        opacity: 1,
        ease: Quad.easeOut
      });
    }
  }

  this.removeFromStage = function () {
    if (document.getElementById(thisScreenId)) {
      document.body.removeChild(mainScreenHolderBackgroundDiv);
    }
  }
}

module.exports = ExperienceScreenBackground;