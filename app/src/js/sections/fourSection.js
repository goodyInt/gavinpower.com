'use strict';

var Section = require('../classes/SectionClass');

var CityScene = require('../objects/CitySceneObject');

var TextPanel = require('../objects/TextPanelObject');

var fourSection = new Section('four');

var ourCityScene;
var _this = this;

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
  console.log('fourSection.theNextBtnIsOver');
  nextBtn.over();
  fourSection.nextBtnIsOver = true;

};
fourSection.theNextBtnIsDown = function () {
  console.log('fourSection.theNextBtnIsDown');
  nextBtn.down('#0000ff');
  fourSection.nextBtnIsDown = true;
};
fourSection.theNextBtnIsUp = function () {
  console.log('fourSection.theNextBtnIsUp');
  nextBtn.overOut();
  fourSection.nextBtnIsDown = false;
};

fourSection.theNextBtnIsOut = function () {
  console.log('fourSection.theNextBtnIsOut');
  nextBtn.overOut();
  fourSection.nextBtnIsOver = false;
};

fourSection.add(nextBtn.el);



fourSection.onIn(function () {
});

fourSection.onOut(function () {
  ourCityScene.start();
});

fourSection.onStart(function () {
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

fourSection.onStop(function () {
  ourCityScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
});

fourSection.setUp = function (scene,camera) {
  ourCityScene = new CityScene(scene,camera);
  fourSection.add(ourCityScene.el);
  ourCityScene.el.position.x = 0;
  ourCityScene.el.position.y = 0;
  ourCityScene.el.position.z = 0;
};

module.exports = fourSection;