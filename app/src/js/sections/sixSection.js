'use strict';

var Section = require('../classes/SectionClass');

var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');

var sixSection = new Section('six');

var sixAnimatedText = new animatedSprite();


var sixSmoke = new Smoke({  
 
  frontColor: '#ff691d',
  backColor: '#ff691d',
  
  layers: 3,
  data: [
    { positionX : 6.7, positionY: -3.9, positionZ: 11.8, rotationZ: 4.7, scale: 4.9 },
    { positionX : 4.8, positionY: 12.6, positionZ: -5, rotationZ: 2.7, scale: 3.7 },
    { positionX : 11, positionY: 13.5, positionZ: 4.3, rotationZ: 3.3, scale: 1.7 } 
  ]
});

sixSection.add(sixSmoke.el);
sixSection.add(sixAnimatedText.el);
sixAnimatedText.out();

sixSmoke.el.visible = false;

sixSection.onIn(function () {
  sixAnimatedText.in();
  sixSection.smokeStart();
});

sixSection.onOut(function () {
  sixAnimatedText.out();
});

sixSection.onStart(function () {
  sixAnimatedText.start();
});

sixSection.onStop(function () {
  sixAnimatedText.stop();
  sixSection.smokeStop();
});

var sixSmokePlaying = false;

sixSection.smokeStart = function () {
  
  if (sixSmokePlaying) {
    return false;
  }
  sixSmokePlaying = true;
  sixSmoke.start();
  sixSmoke.el.visible = true;
};

sixSection.smokeStop = function () {
  if (!sixSmokePlaying) {
    return false;
  }

  sixSmokePlaying = false;

  sixSmoke.stop();

  sixSmoke.el.visible = false;
};

sixSection.updateColors = function (color1, color2) {
  sixSmoke.updateColors(color1, color2);
};

sixSection.setUp = function (scene,camera) {
  var thisPos= {x: sixSection.el.position.x, y: sixSection.el.position.y,z: sixSection.el.position.z}
  //console.log('');
  //console.log('sixSection.setPositions()');
  //console.log('x: ' + thisPos.x);
  //console.log('y: ' + thisPos.y);
  //console.log('z: ' + thisPos.z);
  
};



module.exports = sixSection;