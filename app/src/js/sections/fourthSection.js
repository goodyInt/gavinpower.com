'use strict';

var Section = require('../classes/SectionClass');
var CampScene = require('../objects/CampSceneObject');
var TextPanel = require('../objects/TextPanelObject');
var Fire = require('../objects/FireObject');
var fourthSection = new Section('fourth');


var fourthCampFire = new Fire({
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

fourthSection.add(fourthCampFire.el);

var fireX = -1;
var fireY = -19;
var fireZ = 13;
fourthCampFire.el.position.x = fireX;
fourthCampFire.el.position.y = fireY;
fourthCampFire.el.position.z = fireZ;
fourthCampFire.el.visible = false;

var ourCampScene = new CampScene();
fourthSection.add(ourCampScene.el);

var nextBtnTextString = '<<< I like code. I like details. I love...';
var nextBtn = new TextPanel(
  nextBtnTextString, {
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
  fourthSection.nextBtnIsIn = true;
}

fourthSection.add(nextBtn.el);

fourthSection.onIn(function () {
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
  fourthCampFire.el.position.x = fireX;
  fourthCampFire.el.position.y = fireY;
  fourthCampFire.el.position.z = fireZ;
}

var animateTheFire;

function prepFire() {
  console.log('prepFire');
  fourthCampFire.start();
  fourthCampFire.el.visible = true;
  animateTheFire = setInterval(animateFire, 100);
}

function extinguishFire() {
  console.log('extinguishFire');
  fourthCampFire.stop();
  fourthCampFire.el.visible = false;
  clearInterval(animateTheFire);
}

fourthSection.onOut(function () {
  console.log('fourthSection.onOut');
  ourCampScene.onOut();
});

fourthSection.onStart(function () {
  console.log('fourthSection.onStart');
  ourCampScene.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

fourthSection.onStop(function () {
  console.log('fourthSection.onStop');
  extinguishFire();
  ourCampScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
});

////
fourthSection.nextBtnIsIn = false;
fourthSection.nextBtnIsOver = false;
fourthSection.nextBtnIsDown = false;

fourthSection.getTheNextBtn = function () {
  //console.log('fourthSection.getTheNextBtn');
  return nextBtn;
};
fourthSection.theNextBtnIsOver = function () {
  console.log('fourthSection.theNextBtnIsOver');
  nextBtn.over();
  fourthSection.nextBtnIsOver = true;

};
fourthSection.theNextBtnIsDown = function () {
  console.log('fourthSection.theNextBtnIsDown');
  nextBtn.down('#0000ff');
  fourthSection.nextBtnIsDown = true;
};
fourthSection.theNextBtnIsUp = function () {
  console.log('fourthSection.theNextBtnIsUp');
  nextBtn.overOut();
  fourthSection.nextBtnIsDown = false;
};

fourthSection.theNextBtnIsOut = function () {
  console.log('fourthSection.theNextBtnIsOut');
  nextBtn.overOut();
  fourthSection.nextBtnIsOver = false;
};

fourthSection.setUp = function (scene,camera) {
  ourCampScene.el.position.x = 0;
  ourCampScene.el.position.y = 10;
  ourCampScene.el.position.z = 0;

  nextBtn.el.position.x = 20;
  nextBtn.el.position.y = 20;
  nextBtn.el.position.z = -30;
  nextBtn.el.rotation.y = -40 * (Math.PI / 180);
  nextBtn.el.rotation.z = -20 * (Math.PI / 180);

};

module.exports = fourthSection;
