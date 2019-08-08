'use strict';

var $ = require('jquery');

function Credits() {

  var creditsHolderDiv;
  var closeButtonDiv;
  var divCloseBtn;
  var _this = this;
  var callback = function (){}
  var creditDivs =[];

  creditsHolderDiv = document.createElement('div');
  creditsHolderDiv.id = "creditsHolderDiv";
  creditsHolderDiv.className = "creditsHolderDiv creditsCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv ";
  introDiv.innerHTML = "<span class = 'introTitle'>Credits</span><span class ='introBody'>Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people:</span> " ;
  creditsHolderDiv.appendChild(introDiv);
  creditDivs.push(introDiv);

  var thankYouDiv = document.createElement('div');
  thankYouDiv.id = "thankYouDiv";
  thankYouDiv.className = "thanksDiv";
  thankYouDiv.innerHTML = "<span class='thanksTitle'>Mr Doob! </span><span class='thanksBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  creditsHolderDiv.appendChild(thankYouDiv);
  creditDivs.push(thankYouDiv);

  var thankYouDiv2 = document.createElement('div');
  thankYouDiv2.id = "thankYouDiv2";
  thankYouDiv2.className = "thanksDiv ";
  thankYouDiv2.innerHTML = "<span class='thanksTitle'>Valentin Marmonier </span><span class='thanksBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  creditsHolderDiv.appendChild(thankYouDiv2);
  creditDivs.push(thankYouDiv2);

  var thankYouDiv3 = document.createElement('div');
  thankYouDiv3.id = "thankYouDiv3";
  thankYouDiv3.className = "thanksDiv ";
  thankYouDiv3.innerHTML = "<span class='thanksTitle'>Khangeldy </span><span class='thanksBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  creditsHolderDiv.appendChild(thankYouDiv3);
  creditDivs.push(thankYouDiv3);

  var thankYouDiv4 = document.createElement('div');
  thankYouDiv4.id = "thankYouDiv4";
  thankYouDiv4.className = "thanksDiv ";
  thankYouDiv4.innerHTML = "<span class='thanksTitle'>Joshua Koo </span><span class='thanksBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. </span>";
  creditsHolderDiv.appendChild(thankYouDiv4);
  creditDivs.push(thankYouDiv4);

  var thankYouDiv5 = document.createElement('div');
  thankYouDiv5.id = "thankYouDiv5";
  thankYouDiv5.className = "thanksDiv ";
  thankYouDiv5.innerHTML = "<span class='thanksTitle'>Conner Luzier </span><span class='thanksBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  creditsHolderDiv.appendChild(thankYouDiv5);
  creditDivs.push(thankYouDiv5);

  var thankYouDiv6 = document.createElement('div');
  thankYouDiv6.id = "thankYouDiv6";
  thankYouDiv6.className = "thanksDiv ";
  thankYouDiv6.innerHTML = "<span class='thanksTitle'>Victor Vergara </span><span class='thanksBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  creditsHolderDiv.appendChild(thankYouDiv6);
  creditDivs.push(thankYouDiv6);

  var thankYouDiv7 = document.createElement('div');
  thankYouDiv7.id = "thankYouDiv7";
  thankYouDiv7.className = "thanksDiv ";
  thankYouDiv7.innerHTML = "<span class='thanksTitle'>David Hoskins </span><span class='thanksBody'>Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you.</span>";
  creditsHolderDiv.appendChild(thankYouDiv7);
  creditDivs.push(thankYouDiv7);

  closeButtonDiv = document.createElement('div');
  closeButtonDiv.id = "closeButtonDiv";
  closeButtonDiv.className = "closeButtonDiv";
  closeButtonDiv.style.position = "absolute";

  divCloseBtn = document.createElement('img');
  divCloseBtn.src = "./img/closeButton0.png";
  divCloseBtn.id = "divCloseBtn";
  divCloseBtn.className = "divCloseBtn";
  closeButtonDiv.appendChild(divCloseBtn);

  closeButtonDiv.onclick = function () {
    console.log('closeButtonDiv');
    _this.removeFromStage();
    callback()
  };

  closeButtonDiv.style.cursor = "pointer";
  

  this.setCallBack = function(theCallback) {
    callback = theCallback;

  }

  this.addToStage = function () {
    console.log('this.addToStage');
    if (!document.getElementById(creditsHolderDiv.id)) {

      document.body.appendChild(creditsHolderDiv);
      document.body.appendChild(closeButtonDiv);

      $("#closeButtonDiv").css("opacity", 0.0);
      $("#screenHolderBackgroundDiv").css("opacity", 0.0);

      var tSpeed = .35;

      TweenMax.to($("#closeButtonDiv"), tSpeed, {
        opacity: 1,
        ease: Quad.easeOut
      });

     for (var i = 0 ; i < creditDivs.length; i++){
      TweenMax.to(creditDivs[i], 0, {
        opacity: 0
      });
    }

      for (var i = 0 ; i < creditDivs.length; i++){
        TweenMax.to(creditDivs[i], 1, {
          opacity: 1,
          delay: .1*i,
          ease: Quad.easeInOut
        });
      }
      
      TweenMax.to($("#screenHolderBackgroundDiv"), tSpeed, {
        delay: 0,
        opacity: 1,
        ease: Quad.easeOut
      });
    }
  }

  this.removeFromStage = function () {
    console.log('this.removeFromStage');
    if (document.getElementById(creditsHolderDiv.id)) {
  
      document.body.removeChild(creditsHolderDiv);
      document.body.removeChild(closeButtonDiv);
    }
  }
}

module.exports = Credits;