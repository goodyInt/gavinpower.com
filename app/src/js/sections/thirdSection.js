'use strict';

var Section = require('../classes/SectionClass');
var Campfire = require('../objects/CampfireObject');
var TextPanel = require('../objects/TextPanelObject');
var Fire = require('../objects/FireObject');
var thirdSection = new Section('third');


var fourthFire = new Fire({
  color1: '#ff5000',
  color2: '#ff0000',
  color3: '#ff0000',
  color4: '#ff5000',

  layers: 4,
  data: [{
      positionX: -2,
      positionY: -.25,
      positionZ: 1,
      rotationZ: (-5 * Math.PI / 180),
      scale: 1
    },
    {
      positionX: -1.5,
      positionY: -.75,
      positionZ: 3,
      rotationZ: (-5 * Math.PI / 180),
      scale: 1
    },
    {
      positionX: 1.5,
      positionY: -1,
      positionZ: -3,
      rotationZ: (-5 * Math.PI / 180),
      scale: 1
    },
    {
      positionX: 2,
      positionY: -1.5,
      positionZ: -1,
      rotationZ: (-5 * Math.PI / 180),
      scale: 1
    }
  ]
});
thirdSection.add(fourthFire.el);

var fireLightX = -0;
var fireLightY = -20;
var fireLightZ = -7;
fourthFire.el.position.x = fireLightX;
fourthFire.el.position.y = fireLightY;
fourthFire.el.position.z = fireLightZ;
fourthFire.el.visible = false;

var ourCampfire = new Campfire();
thirdSection.add(ourCampfire.el);

var nectBtnTextString = '<<< I like code. I like details. I love...';
var nextBtn = new TextPanel(
  nectBtnTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);

var _this = this;
this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  thirdSection.nextBtnIsIn = true;
}

thirdSection.add(nextBtn.el);

thirdSection.onIn(function () {
 

  prepFire();
 

});


var firelightYCounter = 0;
var firelightXCounter = 0;
var firelightZCounter = 0;


function animateFire() {
//console.log('animateFire: ' + fireLightY);
  firelightYCounter += .65;
  firelightXCounter += .5;
  firelightZCounter += .45;

  fireLightY += Math.sin(firelightYCounter) * .25;
  fireLightX += Math.sin(firelightXCounter) * 2.5;
  fireLightZ += Math.sin(firelightZCounter) * 2;

 // fourthFire.el.position.x = fireLightX;
  fourthFire.el.position.y = fireLightY;
 // fourthFire.el.position.z = fireLightZ;
}

var animateTheFire;

function prepFire() {
  console.log('prepFire');
  fourthFire.start();
  fourthFire.el.visible = true;
  animateTheFire = setInterval(animateFire, 100);
}

function extinguishFire() {

  console.log('extinguishFire');
  fourthFire.stop();
  fourthFire.el.visible = false;
  clearInterval(animateTheFire);
}

thirdSection.onOut(function () {
  console.log('thirdSection.onOut');
  ourCampfire.onOut();
});

thirdSection.onStart(function () {
  console.log('thirdSection.onStart');
  ourCampfire.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

thirdSection.onStop(function () {
  console.log('thirdSection.onStop');
  extinguishFire();
  ourCampfire.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
});

////
thirdSection.nextBtnIsIn = false;
thirdSection.nextBtnIsOver = false;
thirdSection.nextBtnIsDown = false;

thirdSection.getTheNextBtn = function () {
  //console.log('thirdSection.getTheNextBtn');
  return nextBtn;
};
thirdSection.theNextBtnIsOver = function () {
  console.log('thirdSection.theNextBtnIsOver');
  nextBtn.over();
  thirdSection.nextBtnIsOver = true;

};
thirdSection.theNextBtnIsDown = function () {
  console.log('thirdSection.theNextBtnIsDown');
  nextBtn.down('#0000ff');
  thirdSection.nextBtnIsDown = true;
};
thirdSection.theNextBtnIsUp = function () {
  console.log('thirdSection.theNextBtnIsUp');
  nextBtn.overOut();
  thirdSection.nextBtnIsDown = false;
};

thirdSection.theNextBtnIsOut = function () {
  console.log('thirdSection.theNextBtnIsOut');
  nextBtn.overOut();
  thirdSection.nextBtnIsOver = false;
};

thirdSection.setPositions = function () {
  ourCampfire.el.position.x = 0;
  ourCampfire.el.position.y = 10;
  ourCampfire.el.position.z = -20;

  nextBtn.el.position.x = 20;
  nextBtn.el.position.y = 20;
  nextBtn.el.position.z = -30;
  nextBtn.el.rotation.y = -40 * (Math.PI / 180);
  nextBtn.el.rotation.z = -20 * (Math.PI / 180);

};

module.exports = thirdSection;