'use strict';

var Section = require('../classes/SectionClass');
var HeightMap = require('../objects/HeightMapObject');
var agencyURL = './img/heightMap/heightMap-helloFriend.jpg';
var HASH = require('../modules/hashModule');
var TextPanel = require('../objects/TextPanelObject');
var zeroSection = new Section('zero');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var BackgroundLines = require('../objects/BackgroundLinesObject');

var theSectionParticles0 = new BackgroundParticles({
  rangeX: [-50, 50],
  rangeY: [30, -30],
  rangeZ: [-100, 100],
  stripsRangeX: [-50, 50],
  stripsRangeY: [-80, 80],
  stripsRangeZ: [-80, -45],
  count: 400,
  strips: true,
  color1: '#eb0013',
  color2: '#8D000C'
});
zeroSection.add(theSectionParticles0.el);

var sectionLines0 = new BackgroundLines({
  rangeX: [-50, 50],
  rangeY: [30, -30],
  rangeZ: [-100, 100],
  count: 100
});
zeroSection.add(sectionLines0.el);

var sprites = {
  jam3: './img/heightMap/heightMap-helloJam3.jpg',
  poundandgrain: './img/heightMap/heightMap-helloP&G.jpg',
  ubisoft: './img/heightMap/heightMap-helloUbisoft.jpg',
  tbwa: './img/heightMap/heightMap-helloTBWA.jpg',
  churchandstate: './img/heightMap/heightMap-helloC+S.jpg'
};

zeroSection.nextBtnIsIn = false;
zeroSection.nextBtnIsOver = false;
zeroSection.nextBtnIsDown = false;

if (sprites[HASH.hash]) {
  agencyURL = sprites[HASH.hash];
}

var heightMap = new HeightMap({
  horizontal: true,
  vertical: true,
  plane: false,
  points: true,
  maps: [{
      name: 'blackScreen',
      url: './img/heightMap/heightMap-black.jpg'
    },
    {
      name: 'Hello',
      url: './img/heightMap/heightMap-hello.jpg'
    },
    {
      name: 'agency',
      url: agencyURL
    },
    {
      name: 'whiteScreen',
      url: './img/heightMap/heightMap-white.jpg'
    },
    {
      name: 'I',
      url: './img/heightMap/heightMap-I.jpg'
    },
    {
      name: 'AM',
      url: './img/heightMap/heightMap-AM.jpg'
    },
    {
      name: 'A',
      url: './img/heightMap/heightMap-A.jpg'
    },
    {
      name: 'Developer',
      url: './img/heightMap/heightMap-developer.jpg'
    },
    {
      name: 'blackScreen2',
      url: './img/heightMap/heightMap-black.jpg'
    },
    {
      name: 'Gav',
      url: './img/heightMap/heightMap-GavMimeDark.jpg'
    }
  ]
});

heightMap.el.position.z = -20;
heightMap.el.rotation.y = 0.25;
heightMap.el.rotation.x = 0.1;
heightMap.el.visible = false;
zeroSection.add(heightMap.el);

var nextBtn = new TextPanel(
  'with a degree in... >>>', {
    align: 'left',
    style: '',
    size: 65,
    lineSpacing: 0
  }
);

nextBtn.el.position.set(20, 0, 0);
nextBtn.el.rotation.y = .35;
zeroSection.add(nextBtn.el);

zeroSection.onIn(function () {
  console.log('zeroSection.onIn');
});

zeroSection.onOut(function (way) {
  console.log('zeroSection.onOut');

});

zeroSection.onStart(function () {
  console.log('zeroSection.onStart');
  if (!heightMap.ready) {
    return false;
  }
  zeroSection.show();
  heightMap.start();
});

zeroSection.onStop(function () {
  console.log('zeroSection.onStop');
  if (!heightMap.ready) {
    return false;
  }
  heightMap.stop();
  nextBtn.overOut();
  zeroSection.nextBtnIsOver = false;
  zeroSection.nextBtnIsDown = false;
  zeroSection.hide();
});

zeroSection.show = function () {
  console.log('zeroSection.show');
  heightMap.el.visible = true;
  theSectionParticles0.el.visible = true;
  nextBtn.el.visible = true;
  sectionLines0.el.visible = true;
};
zeroSection.hide = function () {
  console.log('zeroSection.hide');
  heightMap.el.visible = false;
  theSectionParticles0.el.visible = false;
  sectionLines0.el.visible = false;
  nextBtn.el.visible = false;
};

zeroSection.textIn = function () {
  nextBtn.in();
  zeroSection.nextBtnIsIn = true;
};

heightMap.setOnCompleteFunction(zeroSection.textIn);

zeroSection.startUpFirstTime = function (mainFunction) {
  heightMap.startItUp(mainFunction);
  this.playing = true;
};

zeroSection.getTheNextBtn = function () {
  return nextBtn;
};
zeroSection.theNextBtnIsOver = function () {
  nextBtn.over();
  zeroSection.nextBtnIsOver = true;
};
zeroSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  zeroSection.nextBtnIsDown = true;
};
zeroSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  zeroSection.nextBtnIsDown = false;
};
zeroSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  zeroSection.nextBtnIsOver = false;
};

module.exports = zeroSection;