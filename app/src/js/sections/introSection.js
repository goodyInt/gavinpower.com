'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var introSection = new Section('intro');

var animatedSprite = new animatedSprite();

introSection.add(animatedSprite.el);

var smoke = new Smoke({  
  //frontColor: '#4c4c4c',
  //backColor: '#ffffff',
  frontColor: '#ff0000',
  backColor: '#ff0000',
  
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 4.7 } 
  ]
});

introSection.add(smoke.el);

smoke.el.visible = false;

introSection.onIn(function () {
  animatedSprite.in();
});

introSection.onOut(function () {
  animatedSprite.out();
});

introSection.onStart(function () {
  animatedSprite.start();
});

introSection.onStop(function () {
  animatedSprite.stop();
});

var smokePlaying = false;

introSection.smokeStart = function () {
  
  if (smokePlaying) {
    return false;
  }
  smokePlaying = true;
  smoke.start();
  smoke.el.visible = true;
};

introSection.smokeStop = function () {
  if (!smokePlaying) {
    return false;
  }

  smokePlaying = false;

  smoke.stop();

  smoke.el.visible = false;
};

module.exports = introSection;