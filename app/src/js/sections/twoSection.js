'use strict';

var Section = require('../classes/SectionClass');
var StoryScene = require('../objects/StoryTellingObject');
var TextPanel = require('../objects/TextPanelObject');
var twoSection = new Section('two');

var ourStoryScene = new StoryScene();
twoSection.add(ourStoryScene.el);

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

var _this = this;
this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  twoSection.nextBtnIsIn = true;
}

twoSection.add(nextBtn.el);

twoSection.onIn(function () {
});

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

twoSection.handleResize = function (){
  ourStoryScene.updateShaderHW();
}

////
twoSection.nextBtnIsIn = false;
twoSection.nextBtnIsOver = false;
twoSection.nextBtnIsDown = false;

twoSection.getTheNextBtn = function () {
  //console.log('twoSection.getTheNextBtn');
  return nextBtn;
};
twoSection.theNextBtnIsOver = function () {
 // console.log('twoSection.theNextBtnIsOver');
  nextBtn.over();
  twoSection.nextBtnIsOver = true;

};
twoSection.theNextBtnIsDown = function () {
 // console.log('twoSection.theNextBtnIsDown');
  nextBtn.down('#0000ff');
  twoSection.nextBtnIsDown = true;
};
twoSection.theNextBtnIsUp = function () {
  //console.log('twoSection.theNextBtnIsUp');
  nextBtn.overOut();
  twoSection.nextBtnIsDown = false;
};

twoSection.theNextBtnIsOut = function () {
 // console.log('twoSection.theNextBtnIsOut');
  nextBtn.overOut();
  twoSection.nextBtnIsOver = false;
};

twoSection.setUp = function (scene,camera) {
  ourStoryScene.el.position.x = 0;
  ourStoryScene.el.position.y = 10;
  ourStoryScene.el.position.z = -10;

  nextBtn.el.position.x = 20;
  nextBtn.el.position.y = 20;
  nextBtn.el.position.z = -30;
  nextBtn.el.rotation.y = -40 * (Math.PI / 180);
  nextBtn.el.rotation.z = -20 * (Math.PI / 180);

};

module.exports = twoSection;