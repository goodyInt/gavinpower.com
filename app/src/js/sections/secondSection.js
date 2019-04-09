'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var secondSection = new Section('second');

var animatedSprite = new animatedSprite();

var smoke = new Smoke({  
  //frontColor: '#4c4c4c',
  //backColor: '#ffffff',
  frontColor: '#00ff00',
  backColor: '#00ff00',
  
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 4.7 } 
  ]
});

secondSection.add(smoke.el);
secondSection.add(animatedSprite.el);

smoke.el.visible = false;

secondSection.onIn(function () {
  animatedSprite.in();
});

secondSection.onOut(function () {
  animatedSprite.out();
});

secondSection.onStart(function () {
  animatedSprite.start();
});

secondSection.onStop(function () {
  animatedSprite.stop();
});

var smokePlaying = false;

secondSection.smokeStart = function () {
  
  if (smokePlaying) {
    return false;
  }
  smokePlaying = true;
  smoke.start();
  smoke.el.visible = true;
};

secondSection.smokeStop = function () {
  if (!smokePlaying) {
    return false;
  }

  smokePlaying = false;

  smoke.stop();

  smoke.el.visible = false;
};

secondSection.updateColors = function (color1, color2) {
  smoke.updateColors(color1, color2);
};

module.exports = secondSection;