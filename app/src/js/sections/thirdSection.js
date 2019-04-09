'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var thirdSection = new Section('third');

var animatedSprite = new animatedSprite();

var smoke = new Smoke({  
  //frontColor: '#4c4c4c',
  //backColor: '#ffffff',
  frontColor: '#0000ff',
  backColor: '#0000ff',
  
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 4.7 } 
  ]
});

thirdSection.add(smoke.el);
thirdSection.add(animatedSprite.el);

smoke.el.visible = false;

thirdSection.onIn(function () {
  animatedSprite.in();
});

thirdSection.onOut(function () {
  animatedSprite.out();
});

thirdSection.onStart(function () {
  animatedSprite.start();
});

thirdSection.onStop(function () {
  animatedSprite.stop();
});

var smokePlaying = false;

thirdSection.smokeStart = function () {
  
  if (smokePlaying) {
    return false;
  }
  smokePlaying = true;
  smoke.start();
  smoke.el.visible = true;
};

thirdSection.smokeStop = function () {
  if (!smokePlaying) {
    return false;
  }

  smokePlaying = false;

  smoke.stop();

  smoke.el.visible = false;
};

thirdSection.updateColors = function (color1, color2) {
  smoke.updateColors(color1, color2);
};

module.exports = thirdSection;