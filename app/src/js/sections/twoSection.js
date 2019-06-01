'use strict';

var THREE = require('three');
var Section = require('../classes/SectionClass');
var twoSection = new Section('two');
var StoryScene = require('../objects/StoryTellingSceneObject');
var TextPanel = require('../objects/TextPanelObject');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var BackgroundLines = require('../objects/BackgroundLinesObject');

var theSectionParticles2 = new BackgroundParticles({
  rangeX: [-115, 115],
  rangeY: [40, 10],
  rangeZ: [400, 60],
  stripsRangeX: [-115, 115],
  stripsRangeY: [30, 10],
  stripsRangeZ: [400, 60],
  count: 500,
  particleSize: .35,
  strips: true,
  color1: '#00ffff',
  color2: '#00ffff'
});
twoSection.add(theSectionParticles2.el);

var sectionLines2 = new BackgroundLines({
  rangeX: [-115, 115],
  rangeY: [40, 10],
  rangeZ: [400, 60],
  count: 200
});
twoSection.add(sectionLines2.el);

var theSectionParticlesWhite2 = new BackgroundParticles({
  rangeX: [-115, 115],
  rangeY: [20, 10],
  rangeZ: [130, 0],
  count: 200,
  particleSize: .25,
  strips: true,
  color1: '#ffffff',
  color2: '#ffffff'
});
twoSection.add(theSectionParticlesWhite2.el);

var ourStoryScene = new StoryScene();
ourStoryScene.el.position.x = 0;
ourStoryScene.el.position.y = 10;
ourStoryScene.el.position.z = 350;
twoSection.add(ourStoryScene.el);

var moonLight = new THREE.SpotLight(0x888888, 1.65, 0, Math.PI / 2);
moonLight.position.set(0, 500, -250);
moonLight.castShadow = true;
twoSection.add(moonLight);

var spotLightHelper = new THREE.SpotLightHelper(moonLight);
//twoSection.add(spotLightHelper);

var moonShadowCamera = new THREE.PerspectiveCamera(70, 1, 100, 3000)
moonLight.shadow = new THREE.LightShadow(moonShadowCamera);
moonLight.shadow.bias = 0.0001;

var nectBtnTextString = "<<< let's tell one together";
var nextBtn = new TextPanel(
  nectBtnTextString, {
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
  twoSection.nextBtnIsIn = true;
}
twoSection.add(nextBtn.el);
twoSection.onIn(function () {});

twoSection.onOut(function () {
  //  console.log('twoSection.onOut');
  ourStoryScene.onOut();
});

twoSection.onStart(function () {
  // console.log('twoSection.onStart');
  ourStoryScene.start();
  // _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

twoSection.onStop(function () {
  // console.log('twoSection.onStop');
  ourStoryScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
});

twoSection.handleResize = function () {
  ourStoryScene.updateShaderHW();
}

////
twoSection.nextBtnIsIn = false;
twoSection.nextBtnIsOver = false;
twoSection.nextBtnIsDown = false;

twoSection.getTheNextBtn = function () {
  return nextBtn;
};
twoSection.theNextBtnIsOver = function () {
  nextBtn.over();
  twoSection.nextBtnIsOver = true;
};
twoSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  twoSection.nextBtnIsDown = true;
};
twoSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  twoSection.nextBtnIsDown = false;
};

twoSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  twoSection.nextBtnIsOver = false;
};

module.exports = twoSection;