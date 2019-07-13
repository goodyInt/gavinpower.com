'use strict';
var THREE = require('three');
var Section = require('../classes/SectionClass');
var CityScene = require('../objects/CitySceneObject');
var TextPanel = require('../objects/TextPanelObject');
var fourSection = new Section('four');
var _this = this;
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var Events = require('../classes/EventsClass');
var fourEvents = new Events();
var signHolder = new THREE.Object3D();

var theSectionParticles4 = new BackgroundParticles({
  rangeX: [-30, 30],
  rangeY: [-60, 150],
  rangeZ: [-100, 100],
  stripsRangeX: [-50, 50],
  stripsRangeY: [-80, 0],
  stripsRangeZ: [-80, -45],
  count: 100,
  particleSize: .35,
  strips: false,
  color1: '#ffffff',
  color2: '#5D5D5D'
});

fourSection.add(theSectionParticles4.el);
var ourCityScene = new CityScene();

fourSection.finalInit = function () {
  ourCityScene.finalInit(this.sceneRenderer)
};

fourSection.on = function () {
  fourEvents.on.apply(fourEvents, arguments);
}

ourCityScene.on('sectionFullyLoaded', function () {
  console.table(this);
  fourEvents.trigger('sectionFullyLoaded', {
    section: 4,
    message: 'Section Four is Loaded'
  });
});

ourCityScene.on('sectionUnloaded', function () {
  console.table(this);
  fourEvents.trigger('sectionUnloaded', {
    section: 4,
    message: 'Section Four is UnLoaded'
  });
});

ourCityScene.el.position.x = 0;
ourCityScene.el.position.y = 0;
ourCityScene.el.position.z = 0;

fourSection.add(ourCityScene.el);

fourSection.nextBtnIsIn = false;
fourSection.nextBtnIsOver = false;
fourSection.nextBtnIsDown = false;

var nextBtnTextString = "Make";
var nextBtn = new TextPanel(
  nextBtnTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);

var nextBtnTextString2 = "Something";
var nextBtn2 = new TextPanel(
  nextBtnTextString2, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);

var nextBtnTextString3 = "Amazing";
var nextBtn3 = new TextPanel(
  nextBtnTextString3, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);

nextBtn.resetValues();
nextBtn2.resetValues();
nextBtn3.resetValues();
nextBtn.down('#ffffff');
nextBtn2.down('#ffffff');
nextBtn3.down('#ffffff');

function createCircle(radius, color) {
  let geom = new THREE.CircleGeometry(radius, 32);
  geom.vertices.shift();
  let mat = new THREE.LineBasicMaterial({
    color: color,
    linewidth: 2.0
  });
  return new THREE.LineLoop(geom, mat);
}

var tempCircle = createCircle(14, '#ffffff');
signHolder.add(tempCircle);
tempCircle.position.z = -5;
tempCircle.position.y = 2;

var signCirc = new THREE.CircleGeometry(14, 32);

var signBackgroundMat = new THREE.MeshLambertMaterial({
  color: '#000000',
  transparent: true,
  depthWrite: false,
  depthTest: true,
  side: THREE.DoubleSide,
  opacity: 0
});

var sign = new THREE.Mesh(signCirc, signBackgroundMat);

nextBtn.el.position.x = 0;
nextBtn.el.position.y = 5;
nextBtn.el.position.z = 0;

nextBtn2.el.position.x = 0;
nextBtn2.el.position.y = 0;
nextBtn2.el.position.z = 0;

nextBtn3.el.position.x = 0;
nextBtn3.el.position.y = -5;
nextBtn3.el.position.z = 0;

sign.rotation.x = -180 * (Math.PI / 180);
sign.position.y = 2;
sign.position.z = -5;
sign.material.opacity = 0.25;

signHolder.add(sign);
signHolder.add(nextBtn.el);
signHolder.add(nextBtn2.el);
signHolder.add(nextBtn3.el);

signHolder.position.x = 0;
signHolder.position.y = -20;
signHolder.position.z = 150;
signHolder.rotation.y = -180 * (Math.PI / 180);

fourSection.add(signHolder);

this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  signHolder.visible = true;

  nextBtn.fadeIn(.1);
  nextBtn2.fadeIn(.1);
  nextBtn3.fadeIn(.1);

  TweenMax.to(signHolder.position, 30, {
    delay: 0,
    ease: Power1.easeOut,
    y: 20,
    onUpdate: function () {
      if (this.target.y > 0) {
        fourSection.nextBtnIsIn = true;
      }
    }
  });
}

fourSection.getTheNextBtn = function () {
  return signHolder;
};

fourSection.theNextBtnIsOver = function () {
  nextBtn.down('#999999');
  nextBtn2.down('#999999');
  nextBtn3.down('#999999');
  fourSection.nextBtnIsOver = true;
};

fourSection.theNextBtnIsDown = function () {
  nextBtn.down('#999999');
  nextBtn2.down('#999999');
  nextBtn3.down('#999999');
  fourSection.nextBtnIsDown = true;
};

fourSection.theNextBtnIsUp = function () {
  nextBtn.down('#ffffff');
  nextBtn2.down('#ffffff');
  nextBtn3.down('#ffffff');
  fourSection.nextBtnIsDown = false;
};

fourSection.theNextBtnIsOut = function () {
  nextBtn.down('#ffffff');
  nextBtn2.down('#ffffff');
  nextBtn3.down('#ffffff');
  fourSection.nextBtnIsOver = false;
};

fourSection.onIn(function () {
  fourSection.show();
  fourEvents.trigger('sectionIsIn', {
    section: 4,
    message: 'Section Four is IN'
  });
});

fourSection.onOut(function () {
  TweenMax.killTweensOf(sign.material);
  TweenMax.killTweensOf(signHolder.position);
  clearInterval(_this.bringInTheNextBtnInterval);
  ourCityScene.onOut();
});

fourSection.outToFive = function () {
  TweenMax.killTweensOf(sign.material);
  TweenMax.killTweensOf(signHolder.position);
  clearInterval(_this.bringInTheNextBtnInterval);
  ourCityScene.outToFive();
  fourSection.nextBtnIsIn = false;
  TweenMax.to(signHolder.position, .5, {
    delay: 0,
    ease: Power1.easeOut,
    y: -20,
    onComplete: function () {
      signHolder.visible = false;
    }
  });
};

function logAnalytics() {
  fourEvents.trigger('logAnalytics', {
    section: "4"
  });
}

fourSection.onStart(function () {

  ourCityScene.start();
  logAnalytics();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 25000);
});

fourSection.startFromFive = function() {
  ourCityScene.startFromFive();
  logAnalytics();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 25000);
};


 fourSection.outFromFive = function(currentIndex){
  ourCityScene.onOutFromFive(currentIndex);
 };

fourSection.onStop(function () {
  signHolder.position.y = -20;
  ourCityScene.onStop();
  fourSection.hide();
  fourSection.nextBtnIsIn = false;
});

fourSection.stopForFive = function () {
  signHolder.position.y = -20;
  ourCityScene.onStop();
  theSectionParticles4.el.visible = false;
 // ourCityScene.el.visible = false;
  signHolder.visible = false;
  fourSection.nextBtnIsIn = false;
  this.playing = false;
};

fourSection.show = function () {
  theSectionParticles4.el.visible = true;
  ourCityScene.show();
  ourCityScene.el.visible = true;
};

fourSection.hide = function () {
  theSectionParticles4.el.visible = false;
  ourCityScene.el.visible = false;
  signHolder.visible = false;
};

fourSection.prepForSectionFive = function (from) {
  ourCityScene.el.visible = true;
  ourCityScene.prepForSectionFive(from);
};

fourSection.theSunlight = function () {
  return ourCityScene.theSunlight();
};

module.exports = fourSection;