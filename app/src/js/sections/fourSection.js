'use strict';
var Section = require('../classes/SectionClass');
var CityScene = require('../objects/CitySceneObject');
var TextPanel = require('../objects/TextPanelObject');
var fourSection = new Section('four');
var _this = this;
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var BackgroundLines = require('../objects/BackgroundLinesObject');

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
  color1: '#a800e9',
  color2: '#f400c6'
});
fourSection.add(theSectionParticles4.el);

var sectionLines4 = new BackgroundLines({
  rangeX: [-115, 115],
  rangeY: [40, 10],
  rangeZ: [300, -5],
  count: 20
});
fourSection.add(sectionLines4.el);

var ourCityScene = new CityScene();
ourCityScene.el.position.x = 0;
ourCityScene.el.position.y = 0;
ourCityScene.el.position.z = 0;
fourSection.add(ourCityScene.el);

fourSection.nextBtnIsIn = false;
fourSection.nextBtnIsOver = false;
fourSection.nextBtnIsDown = false;

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
//  ourCityScene.start();
});

fourSection.onStart(function () {
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

fourSection.onStop(function () {
  ourCityScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
});

module.exports = fourSection;