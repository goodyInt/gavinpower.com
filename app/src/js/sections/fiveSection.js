'use strict';

var Section = require('../classes/SectionClass');
var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');
var fiveSection = new Section('five');

var fiveAnimatedText = new animatedSprite();
var TextPanel = require('../objects/TextPanelObject');
var _this = this;
var fiveSmoke = new Smoke({  
  frontColor: '#ff0c7f',
  backColor: '#ff0c7f',
  layers: 3,
  data: [
    { positionX : 7.7, positionY: 8.4, positionZ: 12.8, rotationZ: .7, scale: 5.7 },
    { positionX : -4.8, positionY: 9.6, positionZ: 4, rotationZ: 1.7, scale: 2.2 },
    { positionX : 3, positionY: 7.5, positionZ: -4.3, rotationZ: 3, scale: 1.7 } 
  ]
});

var nextBtnTextString = '<<< Section 5 Lets go to 6...';
var nextBtn = new TextPanel(
  nextBtnTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);

fiveSection.add(nextBtn.el);

this.bringInTheBtn = function () {
  console.log('section five bring in the BTN')
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  fiveSection.nextBtnIsIn = true;
}

fiveSection.add(fiveSmoke.el);
fiveSection.add(fiveAnimatedText.el);
fiveAnimatedText.out();
fiveSmoke.el.visible = false;

fiveSection.onIn(function () {
  fiveAnimatedText.in();
  fiveSection.smokeStart();
});

fiveSection.onOut(function () {
  fiveAnimatedText.out();
});

fiveSection.onStart(function () {
  fiveAnimatedText.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

fiveSection.onStop(function () {
  fiveAnimatedText.stop();
  fiveSection.smokeStop();
  clearInterval(_this.bringInTheNextBtnInterval);
});

var fiveSmokePlaying = false;

fiveSection.smokeStart = function () {
  
  if (fiveSmokePlaying) {
    return false;
  }
  fiveSmokePlaying = true;
  fiveSmoke.start();
  fiveSmoke.el.visible = true;
};

fiveSection.smokeStop = function () {
  if (!fiveSmokePlaying) {
    return false;
  }

  fiveSmokePlaying = false;
  fiveSmoke.stop();
  fiveSmoke.el.visible = false;
};

fiveSection.updateColors = function (color1, color2) {
  fiveSmoke.updateColors(color1, color2);
};

////
fiveSection.nextBtnIsIn = false;
fiveSection.nextBtnIsOver = false;
fiveSection.nextBtnIsDown = false;

fiveSection.getTheNextBtn = function () {
  return nextBtn;
};
fiveSection.theNextBtnIsOver = function () {
  nextBtn.over();
  fiveSection.nextBtnIsOver = true;
};
fiveSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  fiveSection.nextBtnIsDown = true;
};
fiveSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  fiveSection.nextBtnIsDown = false;
};

fiveSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  fiveSection.nextBtnIsOver = false;
};

module.exports = fiveSection;