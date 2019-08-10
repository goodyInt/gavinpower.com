'use strict';

var Section = require('../classes/SectionClass');
var sixSection = new Section('six');
var Events = require('../classes/EventsClass');
var sixEvents = new Events();
var ThankYouScene = require('../objects/ThankYouObject');
var TextPanel = require('../objects/TextPanelObject');
var _this = this;

var ourThankYouScene = new ThankYouScene();

sixSection.finalInit = function () {
  ourThankYouScene.finalInit(this.sceneRenderer)
};

sixSection.on =  function () {
  sixEvents.on.apply(sixEvents, arguments);
}

ourThankYouScene.on('sectionFullyLoaded', function () {
  console.table(this);
  sixEvents.trigger('sectionFullyLoaded', {
    section: 6,
    message: 'Section Six is Loaded'
  });
});

ourThankYouScene.el.position.x = 0;
ourThankYouScene.el.position.y = 0;
ourThankYouScene.el.position.z = 0;

sixSection.add(ourThankYouScene.el);

var nextBtnTextString = '<<< Section 6 Lets go to 1...';

var nextBtn = new TextPanel(
  nextBtnTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);

sixSection.add(nextBtn.el);

this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  sixSection.nextBtnIsIn = true;
}

ourThankYouScene.on('sectionIsIn', function () {
  console.table(this);
  sixEvents.trigger('sectionIsIn', {section: 6 , message: 'Section Six is IN'});
});

sixSection.onIn(function () {
  ourThankYouScene.el.visible = true;
  ourThankYouScene.onIn();  
});

sixSection.onOut(function () {
  ourThankYouScene.onOut();
  nextBtn.fadeOut(.5);

});

ourThankYouScene.on('sectionUnloaded', function () {
  console.table(this);
  sixEvents.trigger('sectionUnloaded', {section: 6 , message: 'Section Six is UnLoaded'});
});

function logAnalytics(){
  sixEvents.trigger('logAnalytics', {section: "6"}); 
}

sixSection.onStart(function () {
  ourThankYouScene.start();
  logAnalytics();
  sixSection.show();
//  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

sixSection.onStop(function () {
  ourThankYouScene.onStop();
  sixSection.hide();
  clearInterval(_this.bringInTheNextBtnInterval);
  sixSection.nextBtnIsIn = false;
});

sixSection.show = function () {
  nextBtn.el.visible = true;
  ourThankYouScene.el.visible = true;
};

sixSection.hide = function () {
  nextBtn.el.visible = false;
  ourThankYouScene.el.visible = false;
};

sixSection.nextBtnIsIn = false;
sixSection.nextBtnIsOver = false;
sixSection.nextBtnIsDown = false;

sixSection.getTheNextBtn = function () {
  return nextBtn.el;
};

sixSection.theNextBtnIsOver = function () {
  nextBtn.over();
  sixSection.nextBtnIsOver = true;
};

sixSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  sixSection.nextBtnIsDown = true;
};

sixSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  sixSection.nextBtnIsDown = false;
};

sixSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  sixSection.nextBtnIsOver = false;
};

sixSection.handleResize = function () {
  ourThankYouScene.handleResize ();
  
}

module.exports = sixSection;