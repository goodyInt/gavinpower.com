'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var sixthSection = new Section('sixth');

var sixthAnimatedText = new animatedSprite();

var sixthSmoke = new Smoke({  
 
  frontColor: '#ff0c7f',
  backColor: '#ff0c7f',
  
  layers: 3,
  data: [
    { positionX : 7.7, positionY: 8.4, positionZ: 12.8, rotationZ: .7, scale: 5.7 },
    { positionX : -4.8, positionY: 9.6, positionZ: 4, rotationZ: 1.7, scale: 2.2 },
    { positionX : 3, positionY: 7.5, positionZ: -4.3, rotationZ: 3, scale: 1.7 } 
  ]
});

sixthSection.add(sixthSmoke.el);
sixthSection.add(sixthAnimatedText.el);
sixthAnimatedText.out();

sixthSmoke.el.visible = false;

sixthSection.onIn(function () {
  sixthAnimatedText.in();
});

sixthSection.onOut(function () {
  sixthAnimatedText.out();
});

sixthSection.onStart(function () {
  sixthAnimatedText.start();
});

sixthSection.onStop(function () {
  sixthAnimatedText.stop();
});

var sixthSmokePlaying = false;

sixthSection.smokeStart = function () {
  
  if (sixthSmokePlaying) {
    return false;
  }
  sixthSmokePlaying = true;
  sixthSmoke.start();
  sixthSmoke.el.visible = true;
};

sixthSection.smokeStop = function () {
  if (!sixthSmokePlaying) {
    return false;
  }

  sixthSmokePlaying = false;

  sixthSmoke.stop();

  sixthSmoke.el.visible = false;
};

sixthSection.updateColors = function (color1, color2) {
  sixthSmoke.updateColors(color1, color2);
};

module.exports = sixthSection;