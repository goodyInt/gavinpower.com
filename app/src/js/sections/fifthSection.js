'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var fifthSection = new Section('fifth');

var fifthAnimatedText = new animatedSprite();

var fifthSmoke = new Smoke({  
 
  frontColor: '#b904ff',
  backColor: '#b904ff',
  
  layers: 3,
  data: [
    { positionX : 40.7, positionY: 5.9, positionZ: 1.8, rotationZ: 4.7, scale: 6.9 },
    { positionX : -3.8, positionY: 12.6, positionZ: -12, rotationZ: 1.7, scale: 1.7 },
    { positionX : 3, positionY: 5.5, positionZ: 7.3, rotationZ: -2, scale: 3.7 } 
  ]
});

fifthSection.add(fifthSmoke.el);
fifthSection.add(fifthAnimatedText.el);
fifthAnimatedText.out();

fifthSmoke.el.visible = false;

fifthSection.onIn(function () {
  fifthAnimatedText.in();
});

fifthSection.onOut(function () {
  fifthAnimatedText.out();
});

fifthSection.onStart(function () {
  fifthAnimatedText.start();
});

fifthSection.onStop(function () {
  fifthAnimatedText.stop();
});

var fifthSmokePlaying = false;

fifthSection.smokeStart = function () {
  
  if (fifthSmokePlaying) {
    return false;
  }
  fifthSmokePlaying = true;
  fifthSmoke.start();
  fifthSmoke.el.visible = true;
};

fifthSection.smokeStop = function () {
  if (!fifthSmokePlaying) {
    return false;
  }

  fifthSmokePlaying = false;

  fifthSmoke.stop();

  fifthSmoke.el.visible = false;
};

fifthSection.updateColors = function (color1, color2) {
  fifthSmoke.updateColors(color1, color2);
};

fifthSection.setPositions = function () {
  var thisPos= {x: fifthSection.el.position.x, y: fifthSection.el.position.y,z: fifthSection.el.position.z}
  console.log('');
  console.log('fifthSection.setPositions()');
  console.log('x: ' + thisPos.x);
  console.log('y: ' + thisPos.y);
  console.log('z: ' + thisPos.z);
};

module.exports = fifthSection;