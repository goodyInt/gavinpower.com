'use strict';

var Section = require('../classes/SectionClass');

var Smoke = require('../objects/SmokeObject');

var HeightMap = require('../objects/HeightMapObject');

var introSection = new Section('intro');

var agencyURL = './img/heightMap/heightMap-helloFriend.jpg';

var HASH = require('../modules/hashModule');

var TextPanel = require('../objects/TextPanelObject');

var sprites = {
  jam3: './img/heightMap/heightMap-helloJam3.jpg',
  poundandgrain: './img/heightMap/heightMap-helloP&G.jpg',
  ubisoft: './img/heightMap/heightMap-helloUbisoft.jpg',
  tbwa: './img/heightMap/heightMap-helloTBWA.jpg',
  churchandstate: './img/heightMap/heightMap-helloC+S.jpg'
};
console.log('HASH.hash: ' + HASH.hash);
if (sprites[HASH.hash]) {
  agencyURL = sprites[HASH.hash];
} 

var heightMap = new HeightMap({
  horizontal: true,
  vertical: true,
  plane: false,
  points: true,
  maps: [
    { name: 'start', url: './img/heightMap/heightMap-start.jpg' },
    { name: 'H', url: './img/heightMap/heightMap-H.jpg' },
    { name: 'HE', url: './img/heightMap/heightMap-HE.jpg' },
    { name: 'HEL', url: './img/heightMap/heightMap-HEL.jpg' },
    { name: 'HELL', url: './img/heightMap/heightMap-HELL.jpg' },
    { name: 'Hello', url: './img/heightMap/heightMap-hello.jpg' },
    { name: 'P&G', url:  agencyURL},
    { name: 'restart', url: './img/heightMap/heightMap-restart.jpg' },
    { name: 'I', url: './img/heightMap/heightMap-I.jpg' },
    { name: 'AM', url: './img/heightMap/heightMap-AM.jpg' },
    { name: 'A', url: './img/heightMap/heightMap-A.jpg' },
    
    { name: 'Developer', url: './img/heightMap/heightMap-developer.jpg' },
    { name: 'break', url: './img/heightMap/heightMap-break.jpg' },
    { name: 'Gav', url: './img/heightMap/heightMap-Gav.jpg' }
  ]
});

heightMap.el.position.z = -40;
heightMap.el.rotation.y = 0.1;
heightMap.el.rotation.x = 0.1;
introSection.add(heightMap.el);

var text = new TextPanel(
  'Hire me',
  {
    align: 'right',
    style: '',
    size: 50,
    lineSpacing: 40,
  }
);
text.el.position.set(-10, 0, 8);

heightMap.el.visible = false;

introSection.onIn(function () {
  text.in();
});

introSection.onOut(function (way) {
  text.out(way);
});

introSection.onStart(function () {
  console.log('introSection.onStart');
  if (!heightMap.ready) {
    return false;
  }
  heightMap.start();
});

introSection.onStop(function () {
  if (!heightMap.ready) {
    return false;
  }

  heightMap.stop();
});

introSection.show = function () {
  console.log('show');
  heightMap.el.visible = true;
};
introSection.start = function () {
  console.log('start');
  heightMap.start();
};

introSection.hide = function () {
  heightMap.el.visible = false;
};

////////////////////////

var introSmoke = new Smoke({  
  frontColor: '#eb0013',
  backColor: '#eb0013',
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: -47.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -44, rotationZ: 0.7, scale: 6.7 },
    { positionX : 13, positionY: 19.5, positionZ: -44.3, rotationZ: 2, scale: 4.7 } 
  ]
});

introSection.add(introSmoke.el);
introSection.add(text.el);

introSmoke.el.visible = false;

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