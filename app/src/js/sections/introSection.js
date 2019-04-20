'use strict';

var Section = require('../classes/SectionClass');

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
if (sprites[HASH.hash]) {
  agencyURL = sprites[HASH.hash];
} 

var heightMap = new HeightMap({
  horizontal: true,
  vertical: true,
  plane: false,
  points: true,
  maps: [
    { name: 'blackScreen', url: './img/heightMap/heightMap-black.jpg' },
    { name: 'H', url: './img/heightMap/heightMap-H.jpg' },
    { name: 'HE', url: './img/heightMap/heightMap-HE.jpg' },
    { name: 'HEL', url: './img/heightMap/heightMap-HEL.jpg' },
    { name: 'HELL', url: './img/heightMap/heightMap-HELL.jpg' },
    { name: 'Hello', url: './img/heightMap/heightMap-hello.jpg' },
    { name: 'agency', url:  agencyURL},
    { name: 'whiteScreen', url: './img/heightMap/heightMap-white.jpg' },
    { name: 'I', url: './img/heightMap/heightMap-I.jpg' },
    { name: 'AM', url: './img/heightMap/heightMap-AM.jpg' },
    { name: 'A', url: './img/heightMap/heightMap-A.jpg' },
    { name: 'Developer', url: './img/heightMap/heightMap-developer.jpg' },
    { name: 'blackScreen2', url: './img/heightMap/heightMap-black.jpg' },
    { name: 'Gav', url: './img/heightMap/heightMap-GavMimeDark.jpg' }
  ]
});

heightMap.el.position.z = -30;
heightMap.el.rotation.y = 0.25;
heightMap.el.rotation.x = 0.1;
heightMap.el.visible = false;
introSection.add(heightMap.el);

var text = new TextPanel(
  'with a degree... -->',
  {
    align: 'right',
    style: '',
    size: 50,
    lineSpacing: 40,
  }
);
text.el.position.set(-30, 0, 10);
text.el.rotation.y = .75;

introSection.onIn(function () {
  console.log('introSection.onIn()');
  text.in();
});

introSection.onOut(function (way) {
  console.log('introSection.onOut()');
  text.out(way);
  heightMap.stop();
});

introSection.onStart(function () {
  console.log('introSection.onStart');
  if (!heightMap.ready) {
    return false;
  }
  heightMap.start();
});

introSection.onStop(function () {
  console.log('introSection.onStop()')
  if (!heightMap.ready) {
    return false;
  }
  heightMap.stop();
});

introSection.show = function () {
  console.log('introSection.show()');
  heightMap.el.visible = true;
};

introSection.startUpFirstTime = function (mainFunction) {
  console.log('introSection.startUpFirstTime()');
  heightMap.startItUp(mainFunction);
};

introSection.hide = function () {
  console.log('introSection.hide()');
  heightMap.el.visible = false;
};

introSection.add(text.el);
module.exports = introSection;