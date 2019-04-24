'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var thirdSection = new Section('third');

var thirdAnimatedText = new animatedSprite();

var thirdSmoke = new Smoke({  
 
 // frontColor: '#0000ff',
 // backColor: '#0000ff',
  frontColor: '#c6ffaa',
  backColor: '#c6ffaa',
  
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 4.7 } 
  ]
});

thirdSection.add(thirdSmoke.el);
thirdSection.add(thirdAnimatedText.el);
thirdAnimatedText.out();

thirdSmoke.el.visible = false;

thirdSection.onIn(function () {
  thirdAnimatedText.in();
});

thirdSection.onOut(function () {
  thirdAnimatedText.out();
});

thirdSection.onStart(function () {
  thirdAnimatedText.start();
});

thirdSection.onStop(function () {
  thirdAnimatedText.stop();
});

var thirdSmokePlaying = false;

thirdSection.smokeStart = function () {
  
  if (thirdSmokePlaying) {
    return false;
  }
  thirdSmokePlaying = true;
  thirdSmoke.start();
  thirdSmoke.el.visible = true;
};

thirdSection.smokeStop = function () {
  if (!thirdSmokePlaying) {
    return false;
  }

  thirdSmokePlaying = false;

  thirdSmoke.stop();

  thirdSmoke.el.visible = false;
};

thirdSection.updateColors = function (color1, color2) {
  thirdSmoke.updateColors(color1, color2);
};
thirdSection.setPositions = function () {
  var thisPos= {x: thirdSection.el.position.x, y: thirdSection.el.position.y,z: thirdSection.el.position.z}
  //console.log('');
  //console.log('thirdSection.setPositions()');
  //console.log('x: ' + thisPos.x);
  //console.log('y: ' + thisPos.y);
  //console.log('z: ' + thisPos.z);
};


module.exports = thirdSection;