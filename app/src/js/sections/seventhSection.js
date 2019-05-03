'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var seventhSection = new Section('seventh');

var seventhAnimatedText = new animatedSprite();


var seventhSmoke = new Smoke({  
 
  frontColor: '#ff691d',
  backColor: '#ff691d',
  
  layers: 3,
  data: [
    { positionX : 6.7, positionY: -3.9, positionZ: 11.8, rotationZ: 4.7, scale: 4.9 },
    { positionX : 4.8, positionY: 12.6, positionZ: -5, rotationZ: 2.7, scale: 3.7 },
    { positionX : 11, positionY: 13.5, positionZ: 4.3, rotationZ: 3.3, scale: 1.7 } 
  ]
});

seventhSection.add(seventhSmoke.el);
seventhSection.add(seventhAnimatedText.el);
seventhAnimatedText.out();

seventhSmoke.el.visible = false;

seventhSection.onIn(function () {
  seventhAnimatedText.in();
  seventhSection.smokeStart();
});

seventhSection.onOut(function () {
  seventhAnimatedText.out();
});

seventhSection.onStart(function () {
  seventhAnimatedText.start();
});

seventhSection.onStop(function () {
  seventhAnimatedText.stop();
  seventhSection.smokeStop();
});

var seventhSmokePlaying = false;

seventhSection.smokeStart = function () {
  
  if (seventhSmokePlaying) {
    return false;
  }
  seventhSmokePlaying = true;
  seventhSmoke.start();
  seventhSmoke.el.visible = true;
};

seventhSection.smokeStop = function () {
  if (!seventhSmokePlaying) {
    return false;
  }

  seventhSmokePlaying = false;

  seventhSmoke.stop();

  seventhSmoke.el.visible = false;
};

seventhSection.updateColors = function (color1, color2) {
  seventhSmoke.updateColors(color1, color2);
};

seventhSection.setPositions = function () {
  var thisPos= {x: seventhSection.el.position.x, y: seventhSection.el.position.y,z: seventhSection.el.position.z}
  //console.log('');
  //console.log('seventhSection.setPositions()');
  //console.log('x: ' + thisPos.x);
  //console.log('y: ' + thisPos.y);
  //console.log('z: ' + thisPos.z);
  
};



module.exports = seventhSection;