'use strict';

var Section = require('../classes/SectionClass');
var CreativeWriting = require('../objects/CreativeWritingObject');
var TextPanel = require('../objects/TextPanelObject');
var oneSection = new Section('one');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var BackgroundLines = require('../objects/BackgroundLinesObject');

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

var passionTextString = '<<< And a passion for...';
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
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  oneSection.nextBtnIsIn = true;
}

this.startTheTyping = function () {
  clearInterval(_this.startTheTypeingInterval);
  _this.typeTheCopyInterval = setInterval(_this.typeTheCopy, 350);
}

oneSection.add(writingText.el);
oneSection.add(nextBtn.el);

oneSection.onIn(function () {
  console.log('oneSection.onIn');
  console.log('oneSection.el.position.z: ' + oneSection.el.position.z);
  writingText.in();
});

oneSection.onOut(function () {
  console.log('oneSection.onOut');
  creativeWriting.onOut();
});

oneSection.onStart(function () {
  console.log('oneSection.onStart');
  oneSectionStringCounter = 0;
  stringToType = '';
  writingText.updateCopy('');
  creativeWriting.show();
  creativeWriting.start();
  _this.startTheTypeingInterval = setInterval(_this.startTheTyping, 4000);
});

oneSection.onStop(function () {
  console.log('oneSection.onStop');
  creativeWriting.stop();
  creativeWriting.hide();
  nextBtn.overOut();
  nextBtn.out('up');
});

oneSection.nextBtnIsIn = false;
oneSection.nextBtnIsOver = false;
oneSection.nextBtnIsDown = false;

oneSection.getTheNextBtn = function () {
  return nextBtn;
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