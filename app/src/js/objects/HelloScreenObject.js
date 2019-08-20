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
  aboutDiv.innerHTML = "<span class='infoTitle'></span><span class='infoBody'> This is my deep dive into three.js and WebGL. Heading in I knew how to maniputale vertex buffers in real time but not alot about materials, specular highlights, specular diffusion, or about lighting, shaders and GLSL. </span>" +
  "<br><br><span class='infoBody'>Now that I have completed it, I gotta tell ya, I'm pretty impressed, optimistic and inspired about the web and what we can do with it. A large peice of me died when flash died but a new day is on the horizon and we are now (praise the lord) further along than we were when we 'transitioned'. I am super happy and optimistic and inspired by the modern web and it's possibilities. I am on the look out for like minded agencies, Art Directors and Clients. Amazing starts now. Get on board. -G  </span>" 
 
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