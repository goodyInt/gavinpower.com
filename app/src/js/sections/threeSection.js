'use strict';

var Section = require('../classes/SectionClass');
var THREE = require('three');
var CampScene = require('../objects/CampSceneObject');
var TextPanel = require('../objects/TextPanelObject');
var threeSection = new Section('three');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var Events = require('../classes/EventsClass');
var threeEvents = new Events();

var theSectionParticles3 = new BackgroundParticles({
  rangeX: [-185, 185],
  rangeY: [-100, 100],
  rangeZ: [-90, -30],
  count: 400,
  particleSize: .5,
  strips: false,
  color1: '#ffffff',
  color2: '#ffffff'
});
threeSection.add(theSectionParticles3.el);

var ourCampScene = new CampScene();
ourCampScene.el.position.x = 0;
ourCampScene.el.position.y = 10;
ourCampScene.el.position.z = 0;
threeSection.add(ourCampScene.el);

threeSection.on =  function () {
  threeEvents.on.apply(threeEvents, arguments);
}
ourCampScene.on('sectionFullyLoaded', function () {
  console.table(this);
  threeEvents.trigger('sectionFullyLoaded', {section: 3 , message: 'Section Three is Loaded'});
});

ourCampScene.on('sectionIsIn', function () {
  console.table(this);
  threeEvents.trigger('sectionIsIn', {section: 3 , message: 'Section Three sectionIsIn'});
});

ourCampScene.on('sectionUnloaded', function () {
  console.table(this);
  threeEvents.trigger('sectionUnloaded', {section: 3 , message: 'Section Three is UnLoaded'});
});

var nextBtnTextString = "Let's work as a team and >>>";
var nextBtn = new TextPanel(
  nextBtnTextString, {
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

var _this = this;
this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  threeSection.nextBtnIsIn = true;
}
threeSection.add(nextBtn.el);

threeSection.onIn(function () {
  theSectionParticles3.el.visible = true;
  ourCampScene.el.visible = true;
  nextBtn.el.visible = true;
  ourCampScene.onIn();
});

threeSection.onOut(function () {
  ourCampScene.onOut();
  nextBtn.fadeOut(0);
});

function logAnalytics(){
  threeEvents.trigger('logAnalytics', {section: "3"}); 
}

threeSection.onStart(function () {
  logAnalytics();
  ourCampScene.start();
});

threeSection.onStartNotShared = function () {
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 3000);
};

threeSection.onStop(function () {
  ourCampScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
  threeSection.hide();
  threeSection.nextBtnIsIn = false;
});

threeSection.hide = function () {
  theSectionParticles3.el.visible = false;
  ourCampScene.el.visible = false;
  nextBtn.el.visible = false;
};

threeSection.nextBtnIsIn = false;
threeSection.nextBtnIsOver = false;
threeSection.nextBtnIsDown = false;

threeSection.getTheNextBtn = function () {
  return nextBtn.el;
};
threeSection.theNextBtnIsOver = function () {
  nextBtn.over();
  threeSection.nextBtnIsOver = true;
};
threeSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  threeSection.nextBtnIsDown = true;
};
threeSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  threeSection.nextBtnIsDown = false;
};

threeSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  threeSection.nextBtnIsOver = false;
};

module.exports = threeSection;