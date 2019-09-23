'use strict';

var Section = require('../classes/SectionClass');
var HeightMap = require('../objects/HeightMapObject');
var agencyURL = './img/heightMap/heightMap-helloFriend.jpg';
var HASH = require('../modules/hashModule');
var TextPanel = require('../objects/TextPanelObject');
var zeroSection = new Section('zero');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var BackgroundLines = require('../objects/BackgroundLinesObject');
var Events = require('../classes/EventsClass');
var zeroEvents = new Events();

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
  churchandstate: './img/heightMap/heightMap-helloC+S.jpg',
  publicis: './img/heightMap/heightMap-helloPublicis.jpg',
  criticalMass: './img/heightMap/heightMap-helloCriticalMass.jpg',
  wundermanThompson: './img/heightMap/heightMap-helloWundermanThompson.jpg',
  havas: './img/heightMap/heightMap-helloHavas.jpg',
  grey: './img/heightMap/heightMap-helloGrey.jpg',
  lg2: './img/heightMap/heightMap-helloLG2.jpg',
  cossette: './img/heightMap/heightMap-helloCossette.jpg',
  blastRadius: './img/heightMap/heightMap-helloBlastRadius.jpg',
  artAndScience: './img/heightMap/heightMap-helloArtAndScience.jpg',
  concrete: './img/heightMap/heightMap-helloConcrete.jpg',
  fcb: './img/heightMap/heightMap-helloFCB.jpg',
  threeJS: './img/heightMap/heightMap-helloThreeJSFriend.jpg',
  linkedIn: './img/heightMap/heightMap-helloLinkedInFriend.jpg',
  facebook: './img/heightMap/heightMap-helloFacebookFriend.jpg',
  twitter: './img/heightMap/heightMap-helloTwitterFriend.jpg',
  ogilvy: './img/heightMap/heightMap-helloOgilvy.jpg',
  shopify: './img/heightMap/heightMap-helloShopify.jpg',
  oneLocal: './img/heightMap/heightMap-helloOneLocal.jpg',
  goodyInt: './img/heightMap/heightMap-helloGoodyInt.jpg',
  mrdoob: './img/heightMap/heightMap-helloMrDoob.jpg',
  alteredQualia: './img/heightMap/heightMap-helloAlteredQualia.jpg',
  PathFactory: './img/heightMap/heightMap-helloPathFactory.jpg',
  NeilTaylor: './img/heightMap/heightMap-helloNeilTaylor.jpg',
  Myplanet: './img/heightMap/heightMap-helloMyplanet.jpg',
  SBDF: './img/heightMap/heightMap-helloSBDF.jpg',
  cbc: './img/heightMap/heightMap-helloCBC.jpg',
  TorStar: './img/heightMap/heightMap-helloTorStar.jpg',
  V: './img/heightMap/heightMap-helloV.jpg',
  tacu: './img/heightMap/heightMap-tacu.jpg'
};

zeroSection.nextBtnIsIn = false;
zeroSection.nextBtnIsOver = false;
zeroSection.nextBtnIsDown = false;

if (sprites[HASH.hash]) {
  agencyURL = sprites[HASH.hash];
}

function logAnalytics(){
  zeroEvents.trigger('logAnalytics', {section: "0"}); 
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

zeroSection.on =  function () {
  zeroEvents.on.apply(zeroEvents, arguments);
}
heightMap.on('sectionFullyLoaded', function () {
  console.table(this);
  zeroEvents.trigger('sectionFullyLoaded', {section: 0 , message: 'Section Zero is Loaded'});
});

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
  zeroSection.show();
  zeroEvents.trigger('sectionIsIn', {section: 0 , message: 'Section Zero is IN'});
});

zeroSection.onOut(function (way) {
  zeroEvents.trigger('sectionUnloaded', {section: 0 , message: 'Section Zero is UnLoaded'});
});

zeroSection.onStart(function () {
  if (!heightMap.ready) {
    return false;
  }
  logAnalytics();
  heightMap.start();
});

zeroSection.onStop(function () {
  if (!heightMap.ready) {
    return false;
  }
  heightMap.stop();
  heightMap.reset();
  
  nextBtn.overOut();
  nextBtn.out('up');
  zeroSection.nextBtnIsOver = false;
  zeroSection.nextBtnIsDown = false;
  zeroSection.nextBtnIsIn = false;
  zeroSection.hide();
});

zeroSection.show = function () {
  heightMap.el.visible = true;
  theSectionParticles0.el.visible = true;
  sectionLines0.el.visible = true;
};
zeroSection.hide = function () {
  heightMap.el.visible = false;
  theSectionParticles0.el.visible = false;
  sectionLines0.el.visible = false;
  nextBtn.el.visible = false;
};

zeroSection.textIn = function () {
  nextBtn.el.visible = true;
  nextBtn.in();
  zeroSection.nextBtnIsIn = true;
};

heightMap.setOnCompleteFunction(zeroSection.textIn);

zeroSection.startUpFirstTime = function (mainFunction) {
  heightMap.startItUp(mainFunction);
  logAnalytics();
  this.playing = true;
};

zeroSection.getTheNextBtn = function () {
  return nextBtn.el;
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