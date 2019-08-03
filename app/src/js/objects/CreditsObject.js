'use strict';

var jQuery = require('jquery');

function Credits() {

  var screenHolderDiv;
  var screenHolderBackgroundDiv;
  var titleDiv;
  var bodyDiv;

  var closeButtonDiv;
  var divCloseBtn;
  var _this = this;

  screenHolderDiv = document.createElement('div');
  screenHolderDiv.id = "screenHolderDiv";
  screenHolderDiv.className = "screenHolderDiv";

  screenHolderBackgroundDiv = document.createElement('div');
  screenHolderBackgroundDiv.id = "screenHolderBackgroundDiv";
  screenHolderBackgroundDiv.className = "screenHolderBackgroundDiv";

  titleDiv = document.createElement('div');
  titleDiv.id = "titleDiv";
  titleDiv.className = "titleDiv";
  titleDiv.innerHTML = 'CREDITS';

  bodyDiv = document.createElement('div');
  bodyDiv.id = "bodyDiv";
  bodyDiv.className = "bodyDiv";
  bodyDiv.innerHTML = 'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor ' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor' +
    'Thanks a lot to the vast number of people who made this happen from afar. I made this site myself but was only able to do it because of the open source work provided by all these people: <br>Mr Doob! Thanks man. You are amazing and Three.js is amazing. Thank you. Thank you. <br> Victor';


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
  };

  closeButtonDiv.style.cursor = "pointer";
  screenHolderDiv.appendChild(titleDiv);
  screenHolderDiv.appendChild(bodyDiv);


  this.addToStage = function () {
    console.log('this.addToStage');
    document.body.appendChild(screenHolderBackgroundDiv);
    document.body.appendChild(screenHolderDiv);
    document.body.appendChild(closeButtonDiv);
  }

  this.removeFromStage = function () {
    console.log('this.removeFromStage');
    if (document.getElementById(screenHolderBackgroundDiv.id)) {
      document.body.removeChild(screenHolderBackgroundDiv);
      document.body.removeChild(screenHolderDiv);
      document.body.removeChild(closeButtonDiv);
    }
  }
}

module.exports = Credits;