'use strict';
var Section = require('../classes/SectionClass');
var CityScene = require('../objects/CitySceneObject');
var TextPanel = require('../objects/TextPanelObject');
var fourSection = new Section('four');
var _this = this;
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var Events = require('../classes/EventsClass');
var fourEvents = new Events();

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

fourSection.theNextBtnIsOver = function () {
  nextBtn.over();
  fourSection.nextBtnIsOver = true;
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
  fourEvents.trigger('sectionUnloaded', {section: 4 , message: 'Section Four is UnLoaded'});
});

ourCityScene.el.position.x = 0;
ourCityScene.el.position.y = 0;
ourCityScene.el.position.z = 0;
fourSection.add(ourCityScene.el);
fourSection.nextBtnIsIn = false;
fourSection.nextBtnIsOver = false;
fourSection.nextBtnIsDown = false;

var nextBtnTextString = '<<<...';
var nextBtn = new TextPanel(
  nextBtnTextString, {
    align: 'center',
    style: '',
    size: 25,
    lineSpacing: 40,
    color: '#999999'
  }
);
nextBtn.el.position.x = 0;
nextBtn.el.position.y = 6;
nextBtn.el.position.z = 0;
//nextBtn.el.rotation.y = -40 * (Math.PI / 180);
//nextBtn.el.rotation.z = -20 * (Math.PI / 180);

fourSection.add(nextBtn.el);

this.bringInTheBtn = function () {
  console.log('fourSection bringInTheBtn');
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  fourSection.nextBtnIsIn = true;
}
fourSection.getTheNextBtn = function () {
  return nextBtn;
};
fourSection.theNextBtnIsOver = function () {
  nextBtn.over();
  fourSection.nextBtnIsOver = true;
};
fourSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  fourSection.nextBtnIsDown = true;
};
fourSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  fourSection.nextBtnIsDown = false;
};

fourSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  fourSection.nextBtnIsOver = false;
};

fourSection.onIn(function () {
  console.log('fourSection.onIn');
  fourSection.show();
  fourEvents.trigger('sectionIsIn', {section: 4 , message: 'Section Four is IN'});

});

fourSection.onOut(function () {
  console.log('fourSection.onOut');
  ourCityScene.onOut();
  clearInterval(_this.bringInTheNextBtnInterval);
});

fourSection.onStart(function () {
  console.log('fourSection.onStart');
  ourCityScene.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 20000);
});

fourSection.onStop(function () {
  console.log('fourSection.onStop');
  ourCityScene.onStop();
  fourSection.hide();
});

fourSection.show = function () {
  console.log('fourSection.show');
  theSectionParticles4.el.visible = true;
  ourCityScene.el.visible = true;
  nextBtn.el.visible = true;
};
fourSection.hide = function () {
  console.log('fourSection.hide');
  theSectionParticles4.el.visible = false;
  ourCityScene.el.visible = false;
  nextBtn.el.visible = false;
};

fourSection.theSunlight = function () {
  return ourCityScene.theSunlight();
};

module.exports = fourSection;