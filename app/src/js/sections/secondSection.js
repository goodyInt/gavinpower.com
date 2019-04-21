'use strict';

var Section = require('../classes/SectionClass');
var CreativeWriting = require('../objects/CreativeWritingObject');

//var animatedSprite = require('../objects/AnimatedSpriteObject');
//var Smoke = require('../objects/SmokeObject');

var secondSection = new Section('second');

var creativeWriting = new CreativeWriting();
creativeWriting.addWriting();

//creativeWriting.el.rotation.y = -20 * (Math.PI/180);
secondSection.add(creativeWriting.el);

console.log('secondSection.el.position.z: ' +secondSection.el.position.z);

/*
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
secondSmoke.el.visible = false;
  
secondSection.add(secondSmoke.el);
  
*/
/*
var secondAnimatedText = new animatedSprite();
secondAnimatedText.out();
secondSection.add(secondAnimatedText.el);
*/


secondSection.onIn(function () {
  console.log('secondSection.onIn');
  console.log('secondSection.el.position.z: ' +secondSection.el.position.z);

  //secondAnimatedText.in();
});

secondSection.onOut(function () {
  console.log('secondSection.onOut');

  //secondAnimatedText.out();
});

secondSection.onStart(function () {
  console.log('secondSection.onStart');
  creativeWriting.show();
  creativeWriting.start();
 
});

secondSection.onStop(function () {
  console.log('secondSection.onStop');
  creativeWriting.stop();
  creativeWriting.hide();
});

/*
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
*/

secondSection.setPositions = function () {
  var thisPos= {x: secondSection.el.position.x, y: secondSection.el.position.y,z: secondSection.el.position.z}
  console.log('');
  console.log('secondSection.setPositions()');
  console.log('x: ' + thisPos.x);
  console.log('y: ' + thisPos.y);
  console.log('z: ' + thisPos.z);
  

  //creativeWriting.el.position.set(thisPos.x-100, thisPos.y, thisPos.z-50);
  creativeWriting.el.position.x  = -50;
  creativeWriting.el.position.y  = 0;
  creativeWriting.el.position.z  = -20;
  
};



module.exports = secondSection;