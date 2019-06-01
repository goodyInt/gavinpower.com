'use strict';

var Section = require('../classes/SectionClass');
var THREE = require('three');
var CampScene = require('../objects/CampSceneObject');
var TextPanel = require('../objects/TextPanelObject');
var Fire = require('../objects/FireObject');
var threeSection = new Section('three');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
//////////// 3
 var theSectionParticles3 = new BackgroundParticles({
      rangeX: [-115, 115],
       rangeY: [-30, 50],
       rangeZ: [-90, -30],
       count: 500,
       particleSize: .5,
       strips: false,
       color1: '#ffffff',
       color2: '#5D5D5D'
     });
 threeSection.add(theSectionParticles3.el);
  
var moonLight = new THREE.SpotLight(0x888888, 1.65, 0, Math.PI / 2);
moonLight.position.set(0, 500, -650);
moonLight.castShadow = true;
threeSection.add(moonLight);

//var spotLightHelper = new THREE.SpotLightHelper(moonLight);
//threeSection.add(spotLightHelper);

var moonShadowCamera = new THREE.PerspectiveCamera(70, 1, 100, 3000)
moonLight.shadow = new THREE.LightShadow(moonShadowCamera);
moonLight.shadow.bias = 0.0001;

var threeCampFire = new Fire({
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

threeSection.add(threeCampFire.el);

var fireX = -1;
var fireY = -19;
var fireZ = 13;
threeCampFire.el.position.x = fireX;
threeCampFire.el.position.y = fireY;
threeCampFire.el.position.z = fireZ;
threeCampFire.el.visible = false;

var ourCampScene = new CampScene();
ourCampScene.el.position.x = 0;
ourCampScene.el.position.y = 10;
ourCampScene.el.position.z = 0;
threeSection.add(ourCampScene.el);

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
nextBtn.el.position.x = 20;
nextBtn.el.position.y = 20;
nextBtn.el.position.z = -30;
nextBtn.el.rotation.y = -40 * (Math.PI / 180);
nextBtn.el.rotation.z = -20 * (Math.PI / 180);

var _this = this;
this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  threeSection.nextBtnIsIn = true;
}

threeSection.add(nextBtn.el);

threeSection.onIn(function () {
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
  threeCampFire.el.position.x = fireX;
  threeCampFire.el.position.y = fireY;
  threeCampFire.el.position.z = fireZ;
}

var animateTheFire;

function prepFire() {
  console.log('prepFire');
  threeCampFire.start();
  threeCampFire.el.visible = true;
  animateTheFire = setInterval(animateFire, 100);
}

function extinguishFire() {
  console.log('extinguishFire');
  threeCampFire.stop();
  threeCampFire.el.visible = false;
  clearInterval(animateTheFire);
}

threeSection.onOut(function () {
  console.log('threeSection.onOut');
  ourCampScene.onOut();
});

threeSection.onStart(function () {
  console.log('threeSection.onStart');
  ourCampScene.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

threeSection.onStop(function () {
  console.log('threeSection.onStop');
  extinguishFire();
  ourCampScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
});

////
threeSection.nextBtnIsIn = false;
threeSection.nextBtnIsOver = false;
threeSection.nextBtnIsDown = false;

threeSection.getTheNextBtn = function () {
  return nextBtn;
};
threeSection.theNextBtnIsOver = function () {
  nextBtn.over();
  threeSection.nextBtnIsOver = true;
};
threeSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  threeSection.nextBtnIsDown = true;
};
threeSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  threeSection.nextBtnIsDown = false;
};

threeSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  threeSection.nextBtnIsOver = false;
};

module.exports = threeSection;
