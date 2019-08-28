'use strict';

var Section = require('../classes/SectionClass');
var BirdScene = require('../objects/BirdSceneObject');
var Skills = require('../objects/SkillsObject');
var fiveSection = new Section('five');
var Events = require('../classes/EventsClass');
var fiveEvents = new Events();
var TextPanel = require('../objects/TextPanelObject');
var _this = this;
var ourBirdScene = new BirdScene();
var ourSkills = new Skills();

fiveSection.on = function () {
  fiveEvents.on.apply(fiveEvents, arguments);
}

fiveSection.finalInit = function () {
  ourBirdScene.finalInit(this.sceneRenderer)
};

ourBirdScene.on('sectionFullyLoaded', function () {
  console.table(this);
  fiveEvents.trigger('sectionFullyLoaded', {
    section: 5,
    message: 'Section Five is Loaded'
  });
});
fiveSection.add(ourBirdScene.el);


ourSkills.on('sectionFullyLoaded', function () {
  console.table(this);
  console.table('our skills is loaded yo!!!!');
  /*
  fiveEvents.trigger('sectionFullyLoaded', {
    section: 5,
    message: 'Section Five is Loaded'
  });
  */
});
fiveSection.add(ourSkills.el);

var nextBtnTextString = '^^^ Experience ^^^';
var nextBtn = new TextPanel(
  nextBtnTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);
nextBtn.el.position.x = 0;
nextBtn.el.position.y = 80;
nextBtn.el.position.z = 0;
fiveSection.add(nextBtn.el);

this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  fiveSection.nextBtnIsIn = true;
}

fiveSection.onIn(function () {
  fiveEvents.trigger('sectionIsIn', {
    section: 5,
    message: 'Section Five is IN'
  });
});

fiveSection.onOut(function () {
  ourBirdScene.onOut();
  ourSkills.onOut();
  nextBtn.fadeOut(.5);
  fiveEvents.trigger('sectionUnloaded', {
    section: 5,
    message: 'Section Five is UnLoaded'
  });
});

function logAnalytics() {
  fiveEvents.trigger('logAnalytics', {
    section: "5"
  });
}

fiveSection.onStart(function () {
  logAnalytics();
  fiveSection.show();
  ourBirdScene.start();
  ourSkills.start();
  

  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 6500);
});

fiveSection.onStop(function () {
  ourBirdScene.onStop();
  ourSkills.stop();

  clearInterval(_this.bringInTheNextBtnInterval);
  fiveSection.hide();
  fiveSection.nextBtnIsIn = false;
});

fiveSection.show = function () {
  nextBtn.el.visible = true;
  ourBirdScene.el.visible = true;
  ourSkills.el.visible = true;
};

fiveSection.hide = function () {
  nextBtn.el.visible = false;
  ourBirdScene.el.visible = false;
  ourSkills.el.visible = false;
};

fiveSection.nextBtnIsIn = false;
fiveSection.nextBtnIsOver = false;
fiveSection.nextBtnIsDown = false;

fiveSection.getTheNextBtn = function () {
  return nextBtn.el;
};

fiveSection.theNextBtnIsOver = function () {
  nextBtn.over();
  fiveSection.nextBtnIsOver = true;
};

fiveSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  fiveSection.nextBtnIsDown = true;
};

fiveSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  fiveSection.nextBtnIsDown = false;
};

fiveSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  fiveSection.nextBtnIsOver = false;
};

module.exports = fiveSection;