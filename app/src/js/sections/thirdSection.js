'use strict';

var Section = require('../classes/SectionClass');
var CampScene = require('../objects/CampSceneObject');
var TextPanel = require('../objects/TextPanelObject');
var Fire = require('../objects/FireObject');
var thirdSection = new Section('third');


var thridCampFire = new Fire({
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

thirdSection.add(thridCampFire.el);

var fireX = -1;
var fireY = -20;
var fireZ = 13;
thridCampFire.el.position.x = fireX;
thridCampFire.el.position.y = fireY;
thridCampFire.el.position.z = fireZ;
thridCampFire.el.visible = false;

var ourCampScene = new CampScene();
thirdSection.add(ourCampScene.el);

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

var fireYCounter = 0;
var fireXCounter = 0;
var fireZCounter = 0;

function animateFire() {
  fireYCounter += .65;
  fireXCounter += .15;
  fireZCounter += .35;

  fireY += Math.sin(fireYCounter) * .35;
  fireX += Math.sin(fireXCounter) * .1;
  fireZ += Math.sin(fireZCounter) * .25;

 // console.log(fireX,fireY,fireZ);
  thridCampFire.el.position.x = fireX;
  thridCampFire.el.position.y = fireY;
  thridCampFire.el.position.z = fireZ;
}

var animateTheFire;

function prepFire() {
  console.log('prepFire');
  thridCampFire.start();
  thridCampFire.el.visible = true;
  animateTheFire = setInterval(animateFire, 100);
}

function extinguishFire() {
  console.log('extinguishFire');
  thridCampFire.stop();
  thridCampFire.el.visible = false;
  clearInterval(animateTheFire);
}

thirdSection.onOut(function () {
  console.log('thirdSection.onOut');
  ourCampScene.onOut();
});

thirdSection.onStart(function () {
  console.log('thirdSection.onStart');
  ourCampScene.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

thirdSection.onStop(function () {
  console.log('thirdSection.onStop');
  extinguishFire();
  ourCampScene.stop();
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
  ourCampScene.el.position.x = 0;
  ourCampScene.el.position.y = 10;
  ourCampScene.el.position.z = 0;

  nextBtn.el.position.x = 20;
  nextBtn.el.position.y = 20;
  nextBtn.el.position.z = -30;
  nextBtn.el.rotation.y = -40 * (Math.PI / 180);
  nextBtn.el.rotation.z = -20 * (Math.PI / 180);

};

module.exports = thirdSection;