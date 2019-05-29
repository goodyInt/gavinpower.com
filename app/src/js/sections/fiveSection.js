'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var fiveSection = new Section('five');

var fiveAnimatedText = new animatedSprite();

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
});

fiveSection.onStop(function () {
  fiveAnimatedText.stop();
  fiveSection.smokeStop();
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

fiveSection.setUp = function (scene,camera) {
  var thisPos= {x: fiveSection.el.position.x, y: fiveSection.el.position.y,z: fiveSection.el.position.z}
  //console.log('');
  //console.log('fiveSection.setPositions()');
  //console.log('x: ' + thisPos.x);
  //console.log('y: ' + thisPos.y);
  //console.log('z: ' + thisPos.z);
};

module.exports = fiveSection;