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
  aboutDiv.innerHTML = "<span class='infoTitle'></span><span class='infoBody'> This is my deep dive into three.js and WebGL - heading in I knew how to maniputale vertex buffers in real time but not alot about heightmaps, materials (specular highlights, diffusion etc.), or about lighting, shaders or GLSL. </span>" +
  "<br><br><span class='infoBody'>It all seems amazing to me now and I'm optimistic and inspired and on the look out for like-minded agencies, Art Directors and Clients. If you are interested, please get in touch. - Gavin  </span>" 
 
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