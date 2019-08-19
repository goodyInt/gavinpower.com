'use strict';

var $ = require('jquery');

function HelloScreen() {
  
  var _this = this;
  var callback = function () {};
  var creditDivs = [];

  var aboutHolderDiv = document.createElement('div');
  aboutHolderDiv.id = "aboutHolderDiv";
  aboutHolderDiv.className = "infoHolderDiv infoCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv ";
  introDiv.innerHTML = "<span class = 'introTitle'>Hello</span><span class ='introBody'>Thanks for checking this out. </span> ";
  aboutHolderDiv.appendChild(introDiv);
  creditDivs.push(introDiv);

  var aboutDiv = document.createElement('div');
  aboutDiv.id = "aboutDiv";
  aboutDiv.className = "infoDiv";
  aboutDiv.innerHTML = "<span class='infoTitle'>Gavin Power</span><span class='infoBody'>is my name. I designed and developed this bad boy because I wanted to learn three.js and WebGL and take a deep dive into what the web is capable of today. </span>" +
  "<br><br><span class='infoBody'>Now that I have completed it, I gotta tell ya, I'm pretty impressed, optimistic and inspired. I feel like we are on the cusp of a real revolution in content again. GPUs are getting faster which means that the sky is the limit for this type of thing. It is great news for Art Directors. Let's blow off the shackles. Are we ready now? It appears so.</span>" +
  "<br><br><span class='infoBody'>If you like what you see here, are inspired, and want to blow some socks off, get in touch and we will do something amazing together - G. </span>";
  
  aboutHolderDiv.appendChild(aboutDiv);
  creditDivs.push(aboutDiv);


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

module.exports = HelloScreen;