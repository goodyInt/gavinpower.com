'use strict';

var Section = require('../classes/SectionClass');

var CityScene = require('../objects/CitySceneObject');

var TextPanel = require('../objects/TextPanelObject');

var fifthSection = new Section('fifth');

var ourCityScene;
var _this = this;

fifthSection.nextBtnIsIn = false;
fifthSection.nextBtnIsOver = false;
fifthSection.nextBtnIsDown = false;

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
  fifthSection.nextBtnIsIn = true;
}
fifthSection.getTheNextBtn = function () {
  return nextBtn;
};
fifthSection.theNextBtnIsOver = function () {
  console.log('fifthSection.theNextBtnIsOver');
  nextBtn.over();
  fifthSection.nextBtnIsOver = true;

};
fifthSection.theNextBtnIsDown = function () {
  console.log('fifthSection.theNextBtnIsDown');
  nextBtn.down('#0000ff');
  fifthSection.nextBtnIsDown = true;
};
fifthSection.theNextBtnIsUp = function () {
  console.log('fifthSection.theNextBtnIsUp');
  nextBtn.overOut();
  fifthSection.nextBtnIsDown = false;
};

fifthSection.theNextBtnIsOut = function () {
  console.log('fifthSection.theNextBtnIsOut');
  nextBtn.overOut();
  fifthSection.nextBtnIsOver = false;
};

fifthSection.add(nextBtn.el);



fifthSection.onIn(function () {
});

fifthSection.onOut(function () {
  ourCityScene.start();
});

fifthSection.onStart(function () {
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

fifthSection.onStop(function () {
  ourCityScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
});

fifthSection.setUp = function (scene,camera) {
  ourCityScene = new CityScene(scene,camera);
  fifthSection.add(ourCityScene.el);
  ourCityScene.el.position.x = 0;
  ourCityScene.el.position.y = 0;
  ourCityScene.el.position.z = 0;
};

module.exports = fifthSection;