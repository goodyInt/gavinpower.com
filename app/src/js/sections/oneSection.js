'use strict';

var Section = require('../classes/SectionClass');
var CreativeWriting = require('../objects/CreativeWritingObject');
var TextPanel = require('../objects/TextPanelObject');
var oneSection = new Section('one');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var BackgroundLines = require('../objects/BackgroundLinesObject');
var Events = require('../classes/EventsClass');
var oneEvents = new Events();

var theSectionParticles1 = new BackgroundParticles({
  rangeX: [-100, 100],
  rangeY: [100, -100],
  rangeZ: [-100, 100],
  stripsRangeX: [-50, 50],
  stripsRangeY: [-80, 80],
  stripsRangeZ: [-50, 0],
  count: 1000,
  strips: true,
  color1: '#ffffff',
  color2: '#4C4C4C'
});
oneSection.add(theSectionParticles1.el);

var sectionLines1 = new BackgroundLines({
  rangeX: [-100, 100],
  rangeY: [100, -100],
  rangeZ: [-100, 100],
  count: 100
});
oneSection.add(sectionLines1.el);

var creativeWriting = new CreativeWriting();
creativeWriting.el.position.x = 0;
creativeWriting.el.position.y = 10;
creativeWriting.el.position.z = -20;
oneSection.add(creativeWriting.el);

oneSection.on =  function () {
  oneEvents.on.apply(oneEvents, arguments);
}
creativeWriting.on('sectionFullyLoaded', function () {
  console.table(this);
  oneEvents.trigger('sectionFullyLoaded', {section: 1 , message: 'Section One is Loaded'});
});
creativeWriting.on('sectionUnloaded', function () {
  console.table(this);
  oneEvents.trigger('sectionUnloaded', {section: 1 , message: 'Section One is UnLoaded'});

});

var oneSectionString = 'Writing.'; //\nAnd I have a passion\n...<<<<\n';
var writingText = new TextPanel(
  oneSectionString, {
    align: 'center',
    // font: 'Times New Roman, Times, serif',
    style: '',
    size: 65,
    lineSpacing: 40,
    color: 'rgba(255, 255, 255, 1)'
  }
);
writingText.el.position.x = 0;
writingText.el.position.y = -10;
writingText.el.position.z = 0;
writingText.el.rotation.y = 20 * (Math.PI / 180);

var passionTextString = '<<< and a passion for...';
var nextBtn = new TextPanel(
  passionTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999'
  }
);
nextBtn.el.position.x = -20;
nextBtn.el.position.y = -20;
nextBtn.el.position.z = -10;
nextBtn.el.rotation.y = -30 * (Math.PI / 180);

var oneSectionStringCounter = 0;
var stringToType = '';
var _this = this;
this.typeTheCopy = function () {
  stringToType += oneSectionString[oneSectionStringCounter];
  writingText.updateCopy(stringToType);
  oneSectionStringCounter++;
  if (oneSectionStringCounter == oneSectionString.length) {
    clearInterval(_this.typeTheCopyInterval);
    _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 1000);
  }
}
this.bringInTheBtn = function () {
  nextBtn.el.visible = true;
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  oneSection.nextBtnIsIn = true;
}

this.startTheTyping = function () {
  clearInterval(_this.startTheTypeingInterval);
  _this.typeTheCopyInterval = setInterval(_this.typeTheCopy, 250);
}

oneSection.add(writingText.el);
oneSection.add(nextBtn.el);

oneSection.onIn(function () {
  oneSectionStringCounter = 0;
  stringToType = '';
  writingText.updateCopy('');
  oneSection.show();
  creativeWriting.start();
  oneEvents.trigger('sectionIsIn', {section: 1 , message: 'Section One is IN'});
});

oneSection.onOut(function () {

 
  creativeWriting.onOut();
  nextBtn.fadeOut(.5);
  writingText.fadeOut(1);

});

function logAnalytics(){
  oneEvents.trigger('logAnalytics', {section: "1"}); 
}
oneSection.onStart(function () {
 _this.startTheTypeingInterval = setInterval(_this.startTheTyping, 2000);
 logAnalytics();
  writingText.in();
});

oneSection.onStop(function () {
  creativeWriting.stop();
  nextBtn.overOut();
  nextBtn.out('up');
  oneSection.hide();
  oneSection.nextBtnIsIn = false;
});
oneSection.show = function () {
  creativeWriting.show();
  theSectionParticles1.el.visible = true;
  sectionLines1.el.visible = true;
  writingText.el.visible = true;
 
};
oneSection.hide = function () {
  creativeWriting.hide();
  theSectionParticles1.el.visible = false;
  sectionLines1.el.visible = false;
  writingText.el.visible = false;
  nextBtn.el.visible = false;
};

oneSection.nextBtnIsIn = false;
oneSection.nextBtnIsOver = false;
oneSection.nextBtnIsDown = false;

oneSection.getTheNextBtn = function () {
  return nextBtn.el;
};
oneSection.theNextBtnIsOver = function () {
  nextBtn.over();
  oneSection.nextBtnIsOver = true;
};
oneSection.theNextBtnIsDown = function () {
  nextBtn.down('#ffffff');
  oneSection.nextBtnIsDown = true;
};
oneSection.theNextBtnIsUp = function () {
  nextBtn.overOut();
  oneSection.nextBtnIsDown = false;
};

oneSection.theNextBtnIsOut = function () {
  nextBtn.overOut();
  oneSection.nextBtnIsOver = false;
};

module.exports = oneSection;