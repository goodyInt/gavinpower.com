'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var fourthSection = new Section('fourth');

var fourthAnimatedText = new animatedSprite();

var fourthSmoke = new Smoke({  

  frontColor: '#19e7ff',
  backColor: '#19e7ff',
  
  layers: 3,
  data: [
    { positionX : 3.7, positionY: 13.9, positionZ: 7.8, rotationZ: 3.7, scale: 6.9 },
    { positionX : 2.8, positionY: -2.6, positionZ: -4, rotationZ: 1.2, scale: 2.7 },
    { positionX : 12, positionY: -9.5, positionZ: 6.3, rotationZ: -2, scale: 1.7 } 
  ]
});

fourthSection.add(fourthSmoke.el);
fourthSection.add(fourthAnimatedText.el);
fourthAnimatedText.out();

fourthSmoke.el.visible = false;

fourthSection.onIn(function () {
  fourthAnimatedText.in();
  fourthSection.smokeStart();
});

fourthSection.onOut(function () {
  fourthAnimatedText.out();
});

fourthSection.onStart(function () {
  fourthAnimatedText.start();
});

fourthSection.onStop(function () {
  fourthAnimatedText.stop();
  fourthSection.smokeStop();
});

var fourthSmokePlaying = false;

fourthSection.smokeStart = function () {
  
  if (fourthSmokePlaying) {
    return false;
  }
  fourthSmokePlaying = true;
  fourthSmoke.start();
  fourthSmoke.el.visible = true;
};

fourthSection.smokeStop = function () {
  if (!fourthSmokePlaying) {
    return false;
  }

  fourthSmokePlaying = false;

  fourthSmoke.stop();

  fourthSmoke.el.visible = false;
};

fourthSection.updateColors = function (color1, color2) {
  fourthSmoke.updateColors(color1, color2);
};

fourthSection.setPositions = function () {
  var thisPos= {x: fourthSection.el.position.x, y: fourthSection.el.position.y,z: fourthSection.el.position.z}
  //console.log('');
  //console.log('fourthSection.setPositions()');
  //console.log('x: ' + thisPos.x);
  //console.log('y: ' + thisPos.y);
  //console.log('z: ' + thisPos.z);
};


module.exports = fourthSection;