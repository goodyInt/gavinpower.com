'use strict';

var $ = require('jquery');

function CodeScreen() {

  var _this = this;
  var callback = function () {};
  var codeScreenDivs = [];

  var codeScreenHolderDiv = document.createElement('div');
  codeScreenHolderDiv.id = "codeScreenHolderDiv";
  codeScreenHolderDiv.className = "infoHolderDiv infoCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv";
  introDiv.innerHTML = "<span class = 'introTitle'>Code</span><span class ='introBody'>Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people:</span> ";
  codeScreenHolderDiv.appendChild(introDiv);
  codeScreenDivs.push(introDiv);

  var thankYouDiv = document.createElement('div');
  thankYouDiv.id = "thankYouDiv";
  thankYouDiv.className = "infoDiv";
  thankYouDiv.innerHTML = "<span class='infoTitle'>Mr Doob! </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  codeScreenHolderDiv.appendChild(thankYouDiv);
  codeScreenDivs.push(thankYouDiv);

  var thankYouDiv_b = document.createElement('div');
  thankYouDiv_b.id = "thankYouDiv_b";
  thankYouDiv_b.className = "infoDiv";
  thankYouDiv_b.innerHTML = "<span class='infoTitle'>AlteredQualia </span><span class='infoBody'>@alteredq alteredqualia.com Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  codeScreenHolderDiv.appendChild(thankYouDiv_b);
  codeScreenDivs.push(thankYouDiv_b);

  var thankYouDiv2 = document.createElement('div');
  thankYouDiv2.id = "thankYouDiv2";
  thankYouDiv2.className = "infoDiv";
  thankYouDiv2.innerHTML = "<span class='infoTitle'>Valentin Marmonier </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  codeScreenHolderDiv.appendChild(thankYouDiv2);
  codeScreenDivs.push(thankYouDiv2);

  var thankYouDiv3 = document.createElement('div');
  thankYouDiv3.id = "thankYouDiv3";
  thankYouDiv3.className = "infoDiv";
  thankYouDiv3.innerHTML = "<span class='infoTitle'>Khangeldy </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  codeScreenHolderDiv.appendChild(thankYouDiv3);
  codeScreenDivs.push(thankYouDiv3);

  var thankYouDiv4 = document.createElement('div');
  thankYouDiv4.id = "thankYouDiv4";
  thankYouDiv4.className = "infoDiv";
  thankYouDiv4.innerHTML = "<span class='infoTitle'>Joshua Koo </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. </span>";
  codeScreenHolderDiv.appendChild(thankYouDiv4);
  codeScreenDivs.push(thankYouDiv4);

  var thankYouDiv5 = document.createElement('div');
  thankYouDiv5.id = "thankYouDiv5";
  thankYouDiv5.className = "infoDiv ";
  thankYouDiv5.innerHTML = "<span class='infoTitle'>Conner Luzier </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  codeScreenHolderDiv.appendChild(thankYouDiv5);
  codeScreenDivs.push(thankYouDiv5);

  var thankYouDiv6 = document.createElement('div');
  thankYouDiv6.id = "thankYouDiv6";
  thankYouDiv6.className = "infoDiv";
  thankYouDiv6.innerHTML = "<span class='infoTitle'>Victor Vergara </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  codeScreenHolderDiv.appendChild(thankYouDiv6);
  codeScreenDivs.push(thankYouDiv6);

  var thankYouDiv7 = document.createElement('div');
  thankYouDiv7.id = "thankYouDiv7";
  thankYouDiv7.className = "infoDiv";
  thankYouDiv7.innerHTML = "<span class='infoTitle'>David Hoskins </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  codeScreenHolderDiv.appendChild(thankYouDiv7);
  codeScreenDivs.push(thankYouDiv7);

  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.id = "closeButtonDivCodeScreen";
  closeButtonDiv.className = "closeButtonDiv";
  closeButtonDiv.style.position = "absolute";

  var divCloseBtn = document.createElement('img');
  divCloseBtn.src = "./img/closeButton0.png";
  divCloseBtn.id = "divCloseBtnCodeScreen";
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
    if (!document.getElementById(codeScreenHolderDiv.id)) {
      document.body.appendChild(codeScreenHolderDiv);
      document.body.appendChild(closeButtonDiv);

      for (var i = 0; i < codeScreenDivs.length; i++) {
        $(codeScreenDivs[i]).css("opacity", 0.0);
        TweenMax.to(codeScreenDivs[i], 1, {
          opacity: 1,
          delay: .1 * i,
          ease: Quad.easeInOut
        });
      }
    }
  }

  this.removeFromStage = function () {  
    if (document.getElementById(codeScreenHolderDiv.id)) {
      document.body.removeChild(codeScreenHolderDiv);
      document.body.removeChild(closeButtonDiv);
    }
  }
}

module.exports = CodeScreen;