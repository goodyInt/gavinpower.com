'use strict';

var THREE = require('three');
var Section = require('../classes/SectionClass');
var twoSection = new Section('two');
var StoryScene = require('../objects/StoryTellingSceneObject');
var TextPanel = require('../objects/TextPanelObject');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var BackgroundLines = require('../objects/BackgroundLinesObject');
var _this = this;
var Events = require('../classes/EventsClass');
var twoEvents = new Events();

var theSectionParticles2 = new BackgroundParticles({
  rangeX: [-115, 115],
  rangeY: [40, 10],
  rangeZ: [500, 60],
  stripsRangeX: [-115, 115],
  stripsRangeY: [30, 10],
  stripsRangeZ: [400, 60],
  count: 500,
  particleSize: .35,
  strips: true,
  color1: '#00ffff',
  color2: '#00ffff'
});
twoSection.add(theSectionParticles2.el);

var sectionLines2 = new BackgroundLines({
  rangeX: [-115, 115],
  rangeY: [40, 10],
  rangeZ: [400, 60],
  count: 200
});
twoSection.add(sectionLines2.el);

var theSectionParticlesWhite2 = new BackgroundParticles({
  rangeX: [-115, 115],
  rangeY: [50, 25],
  rangeZ: [130, -10],
  count: 300,
  particleSize: .35,
  strips: false,
  color1: '#ffffff',
  color2: '#ffffff'
});
twoSection.add(theSectionParticlesWhite2.el);

var ourStoryScene = new StoryScene();
ourStoryScene.el.position.x = 0;
ourStoryScene.el.position.y = 10;
ourStoryScene.el.position.z = 350;
twoSection.add(ourStoryScene.el);

twoSection.on =  function () {
  twoEvents.on.apply(twoEvents, arguments);
}

ourStoryScene.on('sectionFullyLoaded', function () {
  console.table(this);
  twoEvents.trigger('sectionFullyLoaded', {section: 2 , message: 'Section Two is Loaded'});
});

ourStoryScene.on('sectionUnloaded', function () {
  console.table(this);
  twoEvents.trigger('sectionUnloaded', {section: 2 , message: 'Section Two is UnLoaded'});
});

ourStoryScene.on('sectionIsIn', function () {
  console.table(this);
  twoEvents.trigger('sectionIsIn', {section: 2 , message: 'Section Two sectionIsIn'});
});


var nectBtnTextString = "<<< let's tell one together";
var nextBtn = new TextPanel(
  nectBtnTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);
nextBtn.el.position.x = 20;
nextBtn.el.position.y = 20;
nextBtn.el.position.z = -30;
nextBtn.el.rotation.y = -40 * (Math.PI / 180);
nextBtn.el.rotation.z = -20 * (Math.PI / 180);


this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  twoSection.nextBtnIsIn = true;
}
twoSection.add(nextBtn.el);

twoSection.onIn(function () {
  console.log('twoSection.onIn');
  ourStoryScene.el.visible = true;
  theSectionParticles2.el.visible = true;
  theSectionParticlesWhite2.el.visible = true;
  sectionLines2.el.visible = true;
  nextBtn.el.visible = true;
  ourStoryScene.onIn();
  
});

twoSection.onOut(function () {
  console.log('twoSection.onOut');
  ourStoryScene.onOut();
});

function logAnalytics(){
  twoEvents.trigger('logAnalytics', {section: "2"}); 
}
twoSection.onStart(function () {
  console.log('twoSection.onStart');
  logAnalytics();
  ourStoryScene.start();
});

twoSection.onStop(function () {
   console.log('twoSection.onStop');
  twoSection.hide();
  ourStoryScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
});

twoSection.hide = function () {
  console.log('twoSection.hide');
  theSectionParticlesWhite2.el.visible = false;
  sectionLines2.el.visible = false;
  theSectionParticles2.el.visible = false;
  ourStoryScene.el.visible = false;
  nextBtn.el.visible = false;
};

twoSection.handleResize = function () {
  ourStoryScene.updateShaderHW();
}

twoSection.nextBtnIsIn = false;
twoSection.nextBtnIsOver = false;
twoSection.nextBtnIsDown = false;

twoSection.getTheNextBtn = function () {
  return nextBtn;
};
twoSection.theNextBtnIsOver = function () {
  nextBtn.over();
  twoSection.nextBtnIsOver = true;
};
twoSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  twoSection.nextBtnIsDown = true;
};
twoSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  twoSection.nextBtnIsDown = false;
};

twoSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  twoSection.nextBtnIsOver = false;
};

module.exports = twoSection;