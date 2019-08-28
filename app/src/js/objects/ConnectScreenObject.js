'use strict';

var $ = require('jquery');

function ConnectScreen() {

  var _this = this;
  var callback = function () {};
  var contactDivs = [];

  var contactsHolderDiv = document.createElement('div');
  contactsHolderDiv.id = "contactsHolderDiv";
  contactsHolderDiv.className = "infoHolderDiv infoCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv ";
  introDiv.innerHTML = "<span class = 'introTitle'>Connect</span><span class ='introBody'>Thanks a lot for checking out my WebGL experiment. Please reach out and say hello.</span> ";
  contactsHolderDiv.appendChild(introDiv);
  contactDivs.push(introDiv);

  var contactDiv = document.createElement('div');
  contactDiv.id = "contactDiv";
  contactDiv.className = "infoDiv";
  contactDiv.innerHTML = "<span class='infoTitle'>Website: </span><span class='infoBody'>  <a href='http://www.goodyint.com' target='blank'> www.goodyint.com</a></span>";
  contactsHolderDiv.appendChild(contactDiv);
  contactDivs.push(contactDiv);

  var contactDiv2 = document.createElement('div');
  contactDiv2.id = "contactDiv2";
  contactDiv2.className = "infoDiv";
  contactDiv2.innerHTML = "<span class='infoTitle'>Email: </span><span class='infoBody'><a href='mailto:gavin@goodyInt.com?Subject=Hi%20from%20gavinpower.com'target='_top'>gavin@goodyInt.com</a></span>";
  contactsHolderDiv.appendChild(contactDiv2);
  contactDivs.push(contactDiv2);

  var contactDiv3 = document.createElement('div');
  contactDiv3.id = "contactDiv3";
  contactDiv3.className = "infoDiv ";
  contactDiv3.innerHTML = "<span class='infoTitle'>Twitter: </span><span class='infoBody'>  <a href='https://www.twitter.com/goodyInt' target='blank'> @goodyInt</a></span>";
  contactsHolderDiv.appendChild(contactDiv3);
  contactDivs.push(contactDiv3);

  var contactDiv4 = document.createElement('div');
  contactDiv4.id = "contactDiv4";
  contactDiv4.className = "infoDiv ";
  contactDiv4.innerHTML = "<span class='infoTitle'>Facebook: </span><span class='infoBody'>  <a href='https://www.facebook.com/goodyInt/' target='blank'> @goodyInt</a></span>";
  contactsHolderDiv.appendChild(contactDiv4);
  contactDivs.push(contactDiv4);


  var contactDiv5 = document.createElement('div');
  contactDiv5.id = "contactDiv5";
  contactDiv5.className = "infoDiv";
  contactDiv5.innerHTML = "<span class='infoTitle'>LinkedIn: </span><span class='infoBody'>  <a href='https://www.linkedin.com/in/gavin-power-a9057b3/' target='blank'> Gavin Power</a></span>";
  contactsHolderDiv.appendChild(contactDiv5);
  contactDivs.push(contactDiv5);

  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.id = "closeButtonDivContacts";
  closeButtonDiv.className = "closeButtonDiv";
  closeButtonDiv.style.position = "absolute";

  var divCloseBtn = document.createElement('img');
  divCloseBtn.src = "./img/closeButton0.png";
  divCloseBtn.id = "divCloseBtnContacts";
  divCloseBtn.className = "divCloseBtn";
  closeButtonDiv.appendChild(divCloseBtn);

  closeButtonDiv.onclick = function () {
    _this.removeFromStage();
    callback();
  };

  this.addToStage = function () {
    if (!document.getElementById(contactsHolderDiv.id)) {
      document.body.appendChild(contactsHolderDiv);
      document.body.appendChild(closeButtonDiv);
      for (var i = 0; i < contactDivs.length; i++) {
        $(contactDivs[i]).css("opacity", 0.0);
        TweenMax.to(contactDivs[i], 1, {
          opacity: 1,
          delay: .1 * i,
          ease: Quad.easeInOut
        });
      }
    }
  }

  this.removeFromStage = function () {
    if (document.getElementById(contactsHolderDiv.id)) {
      document.body.removeChild(contactsHolderDiv);
      document.body.removeChild(closeButtonDiv);
    }
  }

  this.setCallBack = function (theCallback) {
    callback = theCallback;
  }
}

module.exports = ConnectScreen;