'use strict';
var Section = require('../classes/SectionClass');
var CityScene = require('../objects/CitySceneObject');
var TextPanel = require('../objects/TextPanelObject');
var fourSection = new Section('four');
var _this = this;
var BackgroundParticles = require('../objects/backgroundParticlesObject');

var theSectionParticles4 = new BackgroundParticles({
  rangeX: [-30, 30],
  rangeY: [-60, 150],
  rangeZ: [-100, 100],
  stripsRangeX: [-50, 50],
  stripsRangeY: [-80, 0],
  stripsRangeZ: [-80, -45],
  count: 100,
  particleSize: .35,
  strips: false,
  color1: '#ffffff',
  color2: '#5D5D5D'
});
fourSection.add(theSectionParticles4.el);

var ourCityScene = new CityScene();
ourCityScene.el.position.x = 0;
ourCityScene.el.position.y = 0;
ourCityScene.el.position.z = 0;
fourSection.add(ourCityScene.el);

fourSection.nextBtnIsIn = false;
fourSection.nextBtnIsOver = false;
fourSection.nextBtnIsDown = false;

var nextBtnTextString = '<<<...';
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

this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  fourSection.nextBtnIsIn = true;
}
fourSection.getTheNextBtn = function () {
  return nextBtn;
};
fourSection.theNextBtnIsOver = function () {
  nextBtn.over();
  fourSection.nextBtnIsOver = true;

};
fourSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  fourSection.nextBtnIsDown = true;
};
fourSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  fourSection.nextBtnIsDown = false;
};

fourSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  fourSection.nextBtnIsOver = false;
};

fourSection.add(nextBtn.el);

fourSection.onIn(function () {
});

fourSection.onOut(function () {

ourCityScene.stop();
clearInterval(_this.bringInTheNextBtnInterval);
});

fourSection.onStart(function () {
  ourCityScene.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

fourSection.onStop(function () {
 
});

module.exports = fourSection;