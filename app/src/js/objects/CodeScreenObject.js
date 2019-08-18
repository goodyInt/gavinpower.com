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
  introDiv.innerHTML = "<span class = 'introTitle'>Code</span><span class ='introBody'>This project exists thanks to a lot of people. I owe a huge debt of gratitude to: </span> ";
  codeScreenHolderDiv.appendChild(introDiv);
  codeScreenDivs.push(introDiv);

  var thankYouDiv = document.createElement('div');
  thankYouDiv.id = "thankYouDiv";
  thankYouDiv.className = "infoDiv";
  thankYouDiv.innerHTML = "<span class='infoTitle'>Mr.doob</span><span class='infoBody'>Mr.doob is an award losing non creative junior developer, who is also known as Ricardo Cabello, from Barcelona, Spain and he created three.js - the 3D JavaScript library that is taking over the web - and has been generously sharing his code and knowledge for a long, long, time (since back in the flash PaperVision3D days).</span>"+
  "<br><span class='infoBody'>If you are not familiar, please check out his library<a href= https://threejs.org/ target='blank'> <span class='artistLink'>threejs</span></a> and his <a href= https://mrdoob.com target='blank'> <span class='artistLink'>website</span></a> and his <a href= https://twitter.com/mrdoob target='blank'> <span class='artistLink'>twitter.</span></a></span>";
  codeScreenHolderDiv.appendChild(thankYouDiv);
  codeScreenDivs.push(thankYouDiv);

  var thankYouDiv_b = document.createElement('div');
  thankYouDiv_b.id = "thankYouDiv_b";
  thankYouDiv_b.className = "infoDiv";
  thankYouDiv_b.innerHTML = "<span class='infoTitle'>AlteredQualia</span><span class='infoBody'>AlteredQualia is a brilliant graphics programmer and has been a major contributor to threes.js - generally involving materials, shaders and post-processing. His examples are extraordinary. His real name is Branislav Ulicny. He is from Slovakia and he holds a PHD in computer science from EPFL.</span>"+
  "<br><span class='infoBody'>Please check out his <a href= https://alteredqualia.com/ target='blank'> <span class='artistLink'>website</span></a> and his <a href= https://twitter.com/alteredq target='blank'> <span class='artistLink'>twitter.</span></a></span>";
 codeScreenHolderDiv.appendChild(thankYouDiv_b);
  codeScreenDivs.push(thankYouDiv_b);

  var thankYouDiv2 = document.createElement('div');
  thankYouDiv2.id = "thankYouDiv2";
  thankYouDiv2.className = "infoDiv";
  thankYouDiv2.innerHTML = "<span class='infoTitle'>Valentin Marmonier</span><span class='infoBody'>Valentin Marmonier, also known as V, is a world travelling developer who has worked for B-Reel and Media Monks and also created the WebGL website through which I created this one. I borrowed much of his structure, some of his ideas and some of his code because he was kind enough to post his source code on github. Thank you. I learned so much studying your project.</span>"+
  "<br><span class='infoBody'>Please check out his<a href= https://github.com/vaalentin target='blank'> <span class='artistLink'>github</span></a> his <a href= https://www.linkedin.com/in/valentin-marmonier-42955867/ target='blank'> <span class='artistLink'>linkedIn</span></a> and his original <a href= http://vaalentin.github.io/2015/ target='blank'> <span class='artistLink'>website.</span></a></span>";
  codeScreenHolderDiv.appendChild(thankYouDiv2);
  codeScreenDivs.push(thankYouDiv2);

  var thankYouDiv3 = document.createElement('div');
  thankYouDiv3.id = "thankYouDiv3";
  thankYouDiv3.className = "infoDiv";
  thankYouDiv3.innerHTML = "<span class='infoTitle'>Khangeldy </span><span class='infoBody'>I don't know a lot about Khangeldy except that he lives in Almaty, Kazakhstan and he wrote the water shader that I manipulated in the StoryTelling section and graciiously shared it.</span>"+
  "<br><span class='infoBody'>You can it out on <a href= https://codepen.io/Khangeldy/pen/pgXNMZ target='blank'> <span class='artistLink'>codepen</span></a> and his <a href= https://github.com/khangeldy target='blank'> <span class='artistLink'>github</span></a></span>";
 
  
  codeScreenHolderDiv.appendChild(thankYouDiv3);
  codeScreenDivs.push(thankYouDiv3);

  var thankYouDiv4 = document.createElement('div');
  thankYouDiv4.id = "thankYouDiv4";
  thankYouDiv4.className = "infoDiv";
  thankYouDiv4.innerHTML = "<span class='infoTitle'>Joshua Koo </span><span class='infoBody'>Joshua is an occasional three.js contributor and perpetuator of random crazy ideas. Organizes creative coding meetups in Singapore. He implimented the awesome sky shader (first implimented by Martin Upitis and improved by Simon Wallner) used in the last three sections.</span>"+
  "<br><span class='infoBody'>Check out his <a href= https://www.linkedin.com/in/joshua-koo-8889b89/ target='blank'> <span class='artistLink'>linkedIn</span></a> and his <a href= https://twitter.com/blurspline target='blank'> <span class='artistLink'>twitter.</span></a></span>";
 
  codeScreenHolderDiv.appendChild(thankYouDiv4);
  codeScreenDivs.push(thankYouDiv4);

  var thankYouDiv5 = document.createElement('div');
  thankYouDiv5.id = "thankYouDiv5";
  thankYouDiv5.className = "infoDiv ";
  thankYouDiv5.innerHTML = "<span class='infoTitle'>Conner Luzier </span><span class='infoBody'>Conner was kind enough to post the model for the evergreen tree, from the Design Section, on CodePen. Thanks Conner.</span>" +
  "<br><span class='infoBody'>Check out his <a href= https://codepen.io/cluzier/ target='blank'> <span class='artistLink'>CodePen.</span></a></span>";
 
  codeScreenHolderDiv.appendChild(thankYouDiv5);
  codeScreenDivs.push(thankYouDiv5);

  var thankYouDiv6 = document.createElement('div');
  thankYouDiv6.id = "thankYouDiv6";
  thankYouDiv6.className = "infoDiv";
  thankYouDiv6.innerHTML = "<span class='infoTitle'>Victor Vergara </span><span class='infoBody'>Victor is a visual designer from Columbia who enjoys exporting, creating and leading digital projects. His project Lab City 3D experiment was the starting point for the City Section. Thanks Victor.</span>" + 
  "<br><span class='infoBody'>Check out his <a href= https://codepen.io/vcomics/ target='blank'> <span class='artistLink'>CodePen.</span></a></span>";
 
  codeScreenHolderDiv.appendChild(thankYouDiv6);
  codeScreenDivs.push(thankYouDiv6);

  var thankYouDiv7 = document.createElement('div');
  thankYouDiv7.id = "thankYouDiv7";
  thankYouDiv7.className = "infoDiv";
  thankYouDiv7.innerHTML = "<span class='infoTitle'>David Hoskins </span><span class='infoBody'> Dave has been loving CG since the early 80s. And he is from England. He wrote the sick shader from the final, 'Thanks for Watching' section. He has written lots more too.</span>"+
  "<br><span class='infoBody'>Check out his work - ridiculously awesome: <a href= https://www.shadertoy.com/user/Dave_Hoskins target='blank'> <span class='artistLink'>Shadertoy.</span></a></span>";
  codeScreenHolderDiv.appendChild(thankYouDiv7);
  codeScreenDivs.push(thankYouDiv7);


  var thankYouDiv8 = document.createElement('div');
  thankYouDiv8.id = "thankYouDiv8";
  thankYouDiv8.className = "infoDiv";
  thankYouDiv8.innerHTML = "<span class='infoTitle'>thisCode</span><span class='infoBody'>is available to download under an MIT License.</span>"+
  "<br><span class='infoBody'>Check it out on <a href=https://github.com/goodyInt target='blank'> <span class='artistLink'>GitHub.</span></a></span><br><br><br>";
 
  codeScreenHolderDiv.appendChild(thankYouDiv8);
  codeScreenDivs.push(thankYouDiv8);

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