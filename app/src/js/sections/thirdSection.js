'use strict';

var Section = require('../classes/SectionClass');
var StoryScene = require('../objects/StoryTellingObject');
var TextPanel = require('../objects/TextPanelObject');
var thirdSection = new Section('third');

var ourStoryScene = new StoryScene();
thirdSection.add(ourStoryScene.el);

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
  thirdSection.nextBtnIsIn = true;
}

thirdSection.add(nextBtn.el);

thirdSection.onIn(function () {
});

thirdSection.onOut(function () {
//  console.log('thirdSection.onOut');
  ourStoryScene.onOut();
});

thirdSection.onStart(function () {
 // console.log('thirdSection.onStart');
  ourStoryScene.start();
 // _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

thirdSection.onStop(function () {
 // console.log('thirdSection.onStop');
  ourStoryScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
});

thirdSection.handleResize = function (){
  ourStoryScene.updateShaderHW();
}

////
thirdSection.nextBtnIsIn = false;
thirdSection.nextBtnIsOver = false;
thirdSection.nextBtnIsDown = false;

thirdSection.getTheNextBtn = function () {
  //console.log('thirdSection.getTheNextBtn');
  return nextBtn;
};
thirdSection.theNextBtnIsOver = function () {
 // console.log('thirdSection.theNextBtnIsOver');
  nextBtn.over();
  thirdSection.nextBtnIsOver = true;

};
thirdSection.theNextBtnIsDown = function () {
 // console.log('thirdSection.theNextBtnIsDown');
  nextBtn.down('#0000ff');
  thirdSection.nextBtnIsDown = true;
};
thirdSection.theNextBtnIsUp = function () {
  //console.log('thirdSection.theNextBtnIsUp');
  nextBtn.overOut();
  thirdSection.nextBtnIsDown = false;
};

thirdSection.theNextBtnIsOut = function () {
 // console.log('thirdSection.theNextBtnIsOut');
  nextBtn.overOut();
  thirdSection.nextBtnIsOver = false;
};

thirdSection.setUp = function (scene,camera) {
  ourStoryScene.el.position.x = 0;
  ourStoryScene.el.position.y = 10;
  ourStoryScene.el.position.z = -10;

  nextBtn.el.position.x = 20;
  nextBtn.el.position.y = 20;
  nextBtn.el.position.z = -30;
  nextBtn.el.rotation.y = -40 * (Math.PI / 180);
  nextBtn.el.rotation.z = -20 * (Math.PI / 180);

};

module.exports = thirdSection;