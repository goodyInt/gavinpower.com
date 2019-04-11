'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var introSection = new Section('intro');

var introAnimatedText = new animatedSprite();

var introSmoke = new Smoke({  
 
  //frontColor: '#ff7704',
  //backColor: '#ff7704',
  frontColor: '#eb0013',
  backColor: '#eb0013',

  
 //1) 0xeb0013,0xff7704,0xfff46a,0x47aff,0xffb577
  
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 4.7 } 
  ]
});

introSection.add(introSmoke.el);
introSection.add(introAnimatedText.el);

introSmoke.el.visible = false;

introSection.onIn(function () {
  introAnimatedText.in();
});

introSection.onOut(function () {
  introAnimatedText.out();
});

introSection.onStart(function () {
  introAnimatedText.start();
});

introSection.onStop(function () {
  introAnimatedText.stop();
});

var introSmokePlaying = false;

introSection.smokeStart = function () {
  if (introSmokePlaying) {
    return false;
  }
  introSmokePlaying = true;
  introSmoke.start();
  introSmoke.el.visible = true;
};

introSection.smokeStop = function () {
  if (!introSmokePlaying) {
    return false;
  }
  introSmokePlaying = false;
  introSmoke.stop();
  introSmoke.el.visible = false;
};

introSection.updateColors = function (color1, color2) {
  introSmoke.updateColors(color1, color2);
};

module.exports = introSection;