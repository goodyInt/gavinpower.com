'use strict';

var $ = require('jquery');

function SoundScreen() {
  
  var _this = this;
  var callback = function () {};
  var soundScreenDivs = [];

  var soundScreenHolderDiv = document.createElement('div');
  soundScreenHolderDiv.id = "soundScreenHolderDiv";
  soundScreenHolderDiv.className = "infoHolderDiv infoCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv ";
  introDiv.innerHTML = "<span class = 'introTitle'>Sound</span><span class ='introBody'>Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people:</span> ";
  soundScreenHolderDiv.appendChild(introDiv);
  soundScreenDivs.push(introDiv);

  var soundScreenDiv = document.createElement('div');
  soundScreenDiv.id = "soundScreenDiv";
  soundScreenDiv.className = "infoDiv";
  soundScreenDiv.innerHTML = "<span class='infoTitle'>Mr Doob! </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv);
  soundScreenDivs.push(soundScreenDiv);

  var soundScreenDiv2 = document.createElement('div');
  soundScreenDiv2.id = "soundScreenDiv2";
  soundScreenDiv2.className = "infoDiv";
  soundScreenDiv2.innerHTML = "<span class='infoTitle'>Valentin Marmonier </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv2);
  soundScreenDivs.push(soundScreenDiv2);

  var soundScreenDiv3 = document.createElement('div');
  soundScreenDiv3.id = "soundScreenDiv3";
  soundScreenDiv3.className = "infoDiv";
  soundScreenDiv3.innerHTML = "<span class='infoTitle'>Khangeldy </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv3);
  soundScreenDivs.push(soundScreenDiv3);

  var soundScreenDiv4 = document.createElement('div');
  soundScreenDiv4.id = "soundScreenDiv4";
  soundScreenDiv4.className = "infoDiv";
  soundScreenDiv4.innerHTML = "<span class='infoTitle'>Joshua Koo </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. </span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv4);
  soundScreenDivs.push(soundScreenDiv4);

  var soundScreenDiv5 = document.createElement('div');
  soundScreenDiv5.id = "soundScreenDiv5";
  soundScreenDiv5.className = "infoDiv";
  soundScreenDiv5.innerHTML = "<span class='infoTitle'>Conner Luzier </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv5);
  soundScreenDivs.push(soundScreenDiv5);

  var soundScreenDiv6 = document.createElement('div');
  soundScreenDiv6.id = "soundScreenDiv6";
  soundScreenDiv6.className = "infoDiv";
  soundScreenDiv6.innerHTML = "<span class='infoTitle'>Victor Vergara </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv6);
  soundScreenDivs.push(soundScreenDiv6);

  var soundScreenDiv7 = document.createElement('div');
  soundScreenDiv7.id = "soundScreenDiv7";
  soundScreenDiv7.className = "infoDiv";
  soundScreenDiv7.innerHTML = "<span class='infoTitle'>David Hoskins </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv7);
  soundScreenDivs.push(soundScreenDiv7);

  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.id = "closeButtonDivSoundScreen";
  closeButtonDiv.className = "closeButtonDiv";
  closeButtonDiv.style.position = "absolute";

  var divCloseBtn = document.createElement('img');
  divCloseBtn.src = "./img/closeButton0.png";
  divCloseBtn.id = "divCloseBtnSoundScreen";
  divCloseBtn.className = "divCloseBtn";
  closeButtonDiv.appendChild(divCloseBtn);

  closeButtonDiv.onclick = function () {
    _this.removeFromStage();
    callback();
  };

  this.setCallBack = function (theCallback) {
    callback = theCallback;
  }

  this.addToStage = function () {
    if (!document.getElementById(soundScreenHolderDiv.id)) {
      document.body.appendChild(soundScreenHolderDiv);
      document.body.appendChild(closeButtonDiv);

      for (var i = 0; i < soundScreenDivs.length; i++) {
        $(soundScreenDivs[i]).css("opacity", 0.0);
        TweenMax.to(soundScreenDivs[i], 1, {
          opacity: 1,
          delay: .1 * i,
          ease: Quad.easeInOut
        });
      }
    }
  }

  this.removeFromStage = function () {  
    if (document.getElementById(soundScreenHolderDiv.id)) {
      document.body.removeChild(soundScreenHolderDiv);
      document.body.removeChild(closeButtonDiv);
    }
  }
}

module.exports = SoundScreen;