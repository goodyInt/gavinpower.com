'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var HeightMap = require('../objects3D/HeightMapObject3D');

var heightSection = new Section('height');
var agencyURL = './app/public/img/heightMap-helloFriend.jpg';

var HASH = require('../modules/hashModule');


var sprites = {
  jam3: './app/public/img/heightMap-helloJam3.jpg',
  poundandgrain: './app/public/img/heightMap-helloP&G.jpg',
  ubisoft: './app/public/img/heightMap-helloUbisoft.jpg',
  tbwa: './app/public/img/heightMap-helloTBWA.jpg',
  churchandstate: './app/public/img/heightMap-helloC+S.jpg'
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
    { name: 'start', url: './app/public/img/heightMap-start.jpg' },
    { name: 'H', url: './app/public/img/heightMap-H.jpg' },
    { name: 'HE', url: './app/public/img/heightMap-HE.jpg' },
    { name: 'HEL', url: './app/public/img/heightMap-HEL.jpg' },
    { name: 'HELL', url: './app/public/img/heightMap-HELL.jpg' },
    { name: 'Hello', url: './app/public/img/heightMap-hello.jpg' },
    { name: 'P&G', url:  agencyURL},
    { name: 'restart', url: './app/public/img/heightMap-restart.jpg' },
    { name: 'I', url: './app/public/img/heightMap-I.jpg' },
    { name: 'AM', url: './app/public/img/heightMap-AM.jpg' },
    { name: 'A', url: './app/public/img/heightMap-A.jpg' },
    
    { name: 'Developer', url: './app/public/img/heightMap-developer.jpg' },
    { name: 'break', url: './app/public/img/heightMap-break.jpg' },
    { name: 'Gav', url: './app/public/img/heightMap-Gav.jpg' }
  ]
});

heightMap.el.position.z = -40;
heightMap.el.rotation.y = 0.1;
heightMap.el.rotation.x = 0.1;
heightSection.add(heightMap.el);

var text = new TextPanel(
  'Hire me',
  {
    align: 'right',
    style: '',
    size: 50,
    lineSpacing: 40,
  }
);
text.el.position.set(-20, 0, 0);
heightSection.add(text.el);

heightMap.el.visible = false;

heightSection.onIn(function () {
  text.in();
});

heightSection.onOut(function (way) {
  text.out(way);
});

heightSection.onStart(function () {
  if (!heightMap.ready) {
    return false;
  }
  heightMap.start();
});

heightSection.onStop(function () {
  if (!heightMap.ready) {
    return false;
  }

  heightMap.stop();
});

heightSection.show = function () {
  heightMap.el.visible = true;
};

heightSection.hide = function () {
  heightMap.el.visible = false;
};

module.exports = heightSection;