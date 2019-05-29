'use strict';

var Section = require('../classes/SectionClass');

var HeightMap = require('../objects/HeightMapObject');

var zeroSection = new Section('zero');

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
  maps: [{
      name: 'blackScreen',
      url: './img/heightMap/heightMap-black.jpg'
    },
    /*
    {
      name: 'H',
      url: './img/heightMap/heightMap-H.jpg'
    },
    {
      name: 'HE',
      url: './img/heightMap/heightMap-HE.jpg'
    },
    {
      name: 'HEL',
      url: './img/heightMap/heightMap-HEL.jpg'
    },
    {
      name: 'HELL',
      url: './img/heightMap/heightMap-HELL.jpg'
    },
    */
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
  //console.log('zeroSection.onIn()');
  // text.in();
});

zeroSection.onOut(function (way) {
  //console.log('zeroSection.onOut()');
  // text.out(way);
});

zeroSection.onStart(function () {
  //console.log('zeroSection.onStart');
  if (!heightMap.ready) {
    return false;
  }
  heightMap.start();
});

zeroSection.onStop(function () {
  //console.log('zeroSection.onStop() heightMap.ready: ' + heightMap.ready);
  if (!heightMap.ready) {
    return false;
  }
  heightMap.stop();
  nextBtn.overOut();
  zeroSection.nextBtnIsOver = false;
  zeroSection.nextBtnIsDown = false;
});

zeroSection.show = function () {
  //console.log('zeroSection.show()');
  heightMap.el.visible = true;
};

zeroSection.textIn = function () {
  //console.log('zeroSection.textIn');
  nextBtn.in();
  zeroSection.nextBtnIsIn = true;
};

heightMap.setOnCompleteFunction(zeroSection.textIn);

zeroSection.startUpFirstTime = function (mainFunction) {
  //console.log('zeroSection.startUpFirstTime()');
  heightMap.startItUp(mainFunction);
  this.playing = true;
};

zeroSection.hide = function () {
  //console.log('zeroSection.hide()');
  heightMap.el.visible = false;
};

////
zeroSection.nextBtnIsIn = false;
zeroSection.nextBtnIsOver = false;
zeroSection.nextBtnIsDown = false;

zeroSection.getTheNextBtn = function () {
  return nextBtn;
};
zeroSection.theNextBtnIsOver = function () {
  //console.log('zeroSection.theNextBtnIsOver');
  nextBtn.over();
  zeroSection.nextBtnIsOver = true;

};
zeroSection.theNextBtnIsDown = function () {
  //console.log('zeroSection.theNextBtnIsDown');
  nextBtn.down('#ff0000');
  zeroSection.nextBtnIsDown = true;
};
zeroSection.theNextBtnIsUp = function () {
  //console.log('zeroSection.theNextBtnIsUp');
  nextBtn.overOut();
  zeroSection.nextBtnIsDown = false;
};

zeroSection.theNextBtnIsOut = function () {
  //console.log('zeroSection.theNextBtnIsOut');
  nextBtn.overOut();
  zeroSection.nextBtnIsOver = false;
};

/////

zeroSection.setUp = function (scene,camera) {
  var thisPos = {
    x: zeroSection.el.position.x,
    y: zeroSection.el.position.y,
    z: zeroSection.el.position.z
  }
  //console.log('');
  //console.log('zeroSection.setPositions()');
  //console.log('x: ' + thisPos.x);
  //console.log('y: ' + thisPos.y);
  //console.log('z: ' + thisPos.z);
};

module.exports = zeroSection;