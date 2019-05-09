'use strict';

var Section = require('../classes/SectionClass');
var CreativeWriting = require('../objects/CreativeWritingObject');
var TextPanel = require('../objects/TextPanelObject');

var secondSection = new Section('second');

var creativeWriting = new CreativeWriting();
secondSection.add(creativeWriting.el);

var secondSectionString = 'Writing.'; //\nAnd I have a passion\n...<<<<\n';
var writingText = new TextPanel(
  secondSectionString, {
    align: 'center',
   // font: 'Times New Roman, Times, serif',
    style: '',
    size: 95,
    lineSpacing: 40,
    color: 'rgba(255, 255, 255, 1)'
  }
);

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

var secondSectionStringCounter = 0;
var stringToType = '';
var _this = this;
this.typeTheCopy = function () {
  stringToType += secondSectionString[secondSectionStringCounter];
 // console.log(secondSectionString[secondSectionStringCounter]);
  writingText.updateCopy(stringToType);
  secondSectionStringCounter++;
  //console.log('secondSectionString.length' + secondSectionString.length);
  if (secondSectionStringCounter == secondSectionString.length) {
    clearInterval(_this.typeTheCopyInterval);
    _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
  }
}
this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  secondSection.nextBtnIsIn = true;
}

this.startTheTyping = function () {
  clearInterval(_this.startTheTypeingInterval);
  _this.typeTheCopyInterval = setInterval(_this.typeTheCopy, 350);
}

secondSection.add(writingText.el);
secondSection.add(nextBtn.el);

secondSection.onIn(function () {
  console.log('secondSection.onIn');
  console.log('secondSection.el.position.z: ' + secondSection.el.position.z);
  writingText.in();
});

secondSection.onOut(function () {
  console.log('secondSection.onOut');
  creativeWriting.onOut();
});

secondSection.onStart(function () {
  console.log('secondSection.onStart');
  secondSectionStringCounter = 0;
  stringToType = '';
  writingText.updateCopy('');
  creativeWriting.show();
  creativeWriting.start();
  _this.startTheTypeingInterval = setInterval(_this.startTheTyping, 4500);
});

secondSection.onStop(function () {
  console.log('secondSection.onStop');
  creativeWriting.stop();
  creativeWriting.hide();
  nextBtn.overOut();
  nextBtn.out('up'); 
});

////
secondSection.nextBtnIsIn = false;
secondSection.nextBtnIsOver = false;
secondSection.nextBtnIsDown = false;

secondSection.getTheNextBtn = function () {
  //console.log('secondSection.getTheNextBtn');
  return nextBtn;
};
secondSection.theNextBtnIsOver = function () {
  //console.log('secondSection.theNextBtnIsOver');
  nextBtn.over();
  secondSection.nextBtnIsOver = true;

};
secondSection.theNextBtnIsDown = function () {
  //console.log('secondSection.theNextBtnIsDown');
  nextBtn.down('#00ff00');
  secondSection.nextBtnIsDown = true;
};
secondSection.theNextBtnIsUp = function () {
  //console.log('secondSection.theNextBtnIsUp');
  nextBtn.overOut();
  secondSection.nextBtnIsDown = false;
};

secondSection.theNextBtnIsOut = function () {
  //console.log('secondSection.theNextBtnIsOut');
  nextBtn.overOut();
  secondSection.nextBtnIsOver = false;
};

/////

secondSection.setPositions = function () {
  creativeWriting.el.position.x = 0;
  creativeWriting.el.position.y = 10;
  creativeWriting.el.position.z = -20;

  writingText.el.position.x = 0;
  writingText.el.position.y = -10;
  writingText.el.position.z = 0;
  writingText.el.rotation.y = 20 * (Math.PI / 180);

  nextBtn.el.position.x = -20;
  nextBtn.el.position.y = -20;
  nextBtn.el.position.z = -10;
  nextBtn.el.rotation.y = -30 * (Math.PI / 180);

};

module.exports = secondSection;