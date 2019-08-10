'use strict';

var $ = require('jquery');

function About() {
  
  var _this = this;
  var callback = function () {};
  var creditDivs = [];

  var aboutHolderDiv = document.createElement('div');
  aboutHolderDiv.id = "aboutHolderDiv";
  aboutHolderDiv.className = "infoHolderDiv infoCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv ";
  introDiv.innerHTML = "<span class = 'introTitle'>About</span><span class ='introBody'>Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people:</span> ";
  aboutHolderDiv.appendChild(introDiv);
  creditDivs.push(introDiv);

  var aboutDiv = document.createElement('div');
  aboutDiv.id = "aboutDiv";
  aboutDiv.className = "infoDiv";
  aboutDiv.innerHTML = "<span class='infoTitle'>Mr Doob! </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  aboutHolderDiv.appendChild(aboutDiv);
  creditDivs.push(aboutDiv);

  var aboutDiv2 = document.createElement('div');
  aboutDiv2.id = "aboutDiv2";
  aboutDiv2.className = "infoDiv";
  aboutDiv2.innerHTML = "<span class='infoTitle'>Valentin Marmonier </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  aboutHolderDiv.appendChild(aboutDiv2);
  creditDivs.push(aboutDiv2);

  var aboutDiv3 = document.createElement('div');
  aboutDiv3.id = "aboutDiv3";
  aboutDiv3.className = "infoDiv";
  aboutDiv3.innerHTML = "<span class='infoTitle'>Khangeldy </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  aboutHolderDiv.appendChild(aboutDiv3);
  creditDivs.push(aboutDiv3);

  var aboutDiv4 = document.createElement('div');
  aboutDiv4.id = "aboutDiv4";
  aboutDiv4.className = "infoDiv";
  aboutDiv4.innerHTML = "<span class='infoTitle'>Joshua Koo </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. </span>";
  aboutHolderDiv.appendChild(aboutDiv4);
  creditDivs.push(aboutDiv4);

  var aboutDiv5 = document.createElement('div');
  aboutDiv5.id = "aboutDiv5";
  aboutDiv5.className = "infoDiv";
  aboutDiv5.innerHTML = "<span class='infoTitle'>Conner Luzier </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  aboutHolderDiv.appendChild(aboutDiv5);
  creditDivs.push(aboutDiv5);

  var aboutDiv6 = document.createElement('div');
  aboutDiv6.id = "aboutDiv6";
  aboutDiv6.className = "infoDiv";
  aboutDiv6.innerHTML = "<span class='infoTitle'>Victor Vergara </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  aboutHolderDiv.appendChild(aboutDiv6);
  creditDivs.push(aboutDiv6);

  var aboutDiv7 = document.createElement('div');
  aboutDiv7.id = "aboutDiv7";
  aboutDiv7.className = "infoDiv";
  aboutDiv7.innerHTML = "<span class='infoTitle'>David Hoskins </span><span class='infoBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  aboutHolderDiv.appendChild(aboutDiv7);
  creditDivs.push(aboutDiv7);

  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.id = "closeButtonDivAbout";
  closeButtonDiv.className = "closeButtonDiv";
  closeButtonDiv.style.position = "absolute";

  var divCloseBtn = document.createElement('img');
  divCloseBtn.src = "./img/closeButton0.png";
  divCloseBtn.id = "divCloseBtnAbout";
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
    if (!document.getElementById(aboutHolderDiv.id)) {
      document.body.appendChild(aboutHolderDiv);
      document.body.appendChild(closeButtonDiv);

      for (var i = 0; i < creditDivs.length; i++) {
        $(creditDivs[i]).css("opacity", 0.0);
        TweenMax.to(creditDivs[i], 1, {
          opacity: 1,
          delay: .1 * i,
          ease: Quad.easeInOut
        });
      }
    }
  }

  this.removeFromStage = function () {  
    if (document.getElementById(aboutHolderDiv.id)) {
      document.body.removeChild(aboutHolderDiv);
      document.body.removeChild(closeButtonDiv);
    }
  }
}

module.exports = About;