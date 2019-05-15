'use strict';

var Section = require('../classes/SectionClass');
var StoryScene = require('../objects/StoryTellingObject');
var TextPanel = require('../objects/TextPanelObject');
var fourthSection = new Section('fourth');

var ourStoryScene = new StoryScene();
fourthSection.add(ourStoryScene.el);

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
  fourthSection.nextBtnIsIn = true;
}

fourthSection.add(nextBtn.el);

fourthSection.onIn(function () {
});

fourthSection.onOut(function () {
  console.log('fourthSection.onOut');
  ourStoryScene.onOut();
});

fourthSection.onStart(function () {
  console.log('fourthSection.onStart');
  ourStoryScene.start();
 // _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

fourthSection.onStop(function () {
  console.log('fourthSection.onStop');
  ourStoryScene.stop();
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

fourthSection.setPositions = function () {
  ourStoryScene.el.position.x = 0;
  ourStoryScene.el.position.y = 10;
  ourStoryScene.el.position.z = 0;

  nextBtn.el.position.x = 20;
  nextBtn.el.position.y = 20;
  nextBtn.el.position.z = -30;
  nextBtn.el.rotation.y = -40 * (Math.PI / 180);
  nextBtn.el.rotation.z = -20 * (Math.PI / 180);

};

module.exports = fourthSection;