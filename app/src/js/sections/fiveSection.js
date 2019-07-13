'use strict';

var Section = require('../classes/SectionClass');
var BirdScene = require('../objects/BirdSceneObject');
var fiveSection = new Section('five');
var Events = require('../classes/EventsClass');
var fiveEvents = new Events();

var TextPanel = require('../objects/TextPanelObject');
var _this = this;

var ourBirdScene = new BirdScene();

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

ourBirdScene.el.position.x = 0;
ourBirdScene.el.position.y = 0;
ourBirdScene.el.position.z = 0;

fiveSection.add(ourBirdScene.el);

var nextBtnTextString = '<<< Section 5 Lets go to 6...';

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
nextBtn.el.position.y = 20;
nextBtn.el.position.z = 150;

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
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 6500);
});

fiveSection.onStop(function () {
  ourBirdScene.onStop();
  clearInterval(_this.bringInTheNextBtnInterval);
  fiveSection.hide();
  fiveSection.nextBtnIsIn = false;
});

fiveSection.show = function () {
  nextBtn.el.visible = true;
  ourBirdScene.el.visible = true;
};
fiveSection.hide = function () {
  nextBtn.el.visible = false;
  ourBirdScene.el.visible = false;
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