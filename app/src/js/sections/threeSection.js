'use strict';

var Section = require('../classes/SectionClass');
var THREE = require('three');
var CampScene = require('../objects/CampSceneObject');
var TextPanel = require('../objects/TextPanelObject');
var threeSection = new Section('three');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var Events = require('../classes/EventsClass');
var threeEvents = new Events();

//////////// 3
var theSectionParticles3 = new BackgroundParticles({
  rangeX: [-115, 115],
  rangeY: [-30, 50],
  rangeZ: [-90, -30],
  count: 500,
  particleSize: .5,
  strips: false,
  color1: '#ffffff',
  color2: '#5D5D5D'
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

ourCampScene.on('sectionUnloaded', function () {
  console.table(this);
  threeEvents.trigger('sectionUnloaded', {section: 3 , message: 'Section Three is UnLoaded'});
});


var nextBtnTextString = '<<< I like code. I like details. I love...';
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
  console.log('threeSection.onIn');
  ourCampScene.onIn();
  threeSection.show();
});

threeSection.onOut(function () {
  console.log('threeSection.onOut');
  ourCampScene.onOut();
  
});

threeSection.onStart(function () {
  console.log('threeSection.onStart');
 
  ourCampScene.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

threeSection.onStop(function () {
  console.log('threeSection.onStop');
  ourCampScene.stop();
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.overOut();
  nextBtn.out('up');
  threeSection.hide();
});

threeSection.show = function () {
  console.log('threeSection.show');
  theSectionParticles3.el.visible = true;
  ourCampScene.el.visible = true;
  nextBtn.el.visible = true;
};
threeSection.hide = function () {
  console.log('threeSection.hide');
  theSectionParticles3.el.visible = false;
  ourCampScene.el.visible = false;
  nextBtn.el.visible = false;
};
////
threeSection.nextBtnIsIn = false;
threeSection.nextBtnIsOver = false;
threeSection.nextBtnIsDown = false;

threeSection.getTheNextBtn = function () {
  return nextBtn;
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