'use strict';

var Section = require('../classes/SectionClass');
var CreativeWriting = require('../objects/CreativeWritingObject');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var secondSection = new Section('second');

var secondAnimatedText = new animatedSprite();
secondAnimatedText.out();

var creativeWriting = new CreativeWriting();
creativeWriting.addWriting();

var secondSmoke = new Smoke({  

  frontColor: '#d1ff55',
  backColor: '#d1ff55',
  
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 4.7 } 
  ]
});

//secondSection.add(secondSmoke.el);
//secondSection.add(secondAnimatedText.el);

secondSmoke.el.visible = false;

secondSection.onIn(function () {
  console.log('secondSection.onIn');
  //secondAnimatedText.in();
});

secondSection.onOut(function () {
  console.log('secondSection.onOut');
  //secondAnimatedText.out();
});

secondSection.onStart(function () {
  console.log('secondSection.onStart');
  //secondAnimatedText.start();
});

secondSection.onStop(function () {
  console.log('secondSection.onStop');
  //secondAnimatedText.stop();
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