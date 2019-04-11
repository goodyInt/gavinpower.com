'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var secondSection = new Section('second');

var secondAnimatedText = new animatedSprite();
secondAnimatedText.out();

var secondSmoke = new Smoke({  

  //frontColor: '#00ff00',
 // backColor: '#00ff00',

  frontColor: '#d1ff55',
  backColor: '#d1ff55',
  
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 4.7 } 
  ]
});

secondSection.add(secondSmoke.el);
secondSection.add(secondAnimatedText.el);

secondSmoke.el.visible = false;

secondSection.onIn(function () {
  secondAnimatedText.in();
});

secondSection.onOut(function () {
  secondAnimatedText.out();
});

secondSection.onStart(function () {
  secondAnimatedText.start();
});

secondSection.onStop(function () {
  secondAnimatedText.stop();
});

var secondSmokePlaying = false;

secondSection.smokeStart = function () {
  
  if (secondSmokePlaying) {
    return false;
  }
  secondSmokePlaying = true;
  secondSmoke.start();
  secondSmoke.el.visible = true;
};

secondSection.smokeStop = function () {
  if (!secondSmokePlaying) {
    return false;
  }

  secondSmokePlaying = false;

  secondSmoke.stop();

  secondSmoke.el.visible = false;
};

secondSection.updateColors = function (color1, color2) {
  secondSmoke.updateColors(color1, color2);
};

module.exports = secondSection;