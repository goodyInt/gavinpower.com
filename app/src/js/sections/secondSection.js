'use strict';

var Section = require('../classes/SectionClass');
var CreativeWriting = require('../objects/CreativeWritingObject');
var TextPanel = require('../objects/TextPanelObject');

var secondSection = new Section('second');

var creativeWriting = new CreativeWriting();
//creativeWriting.addWriting();
secondSection.add(creativeWriting.el);

var secondSectionString = 'Writing.\nAnd I have a passion\n...<<<<\n';
var text = new TextPanel(
  secondSectionString, {
    align: 'center',
    font: 'Times New Roman, Times, serif',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: 'rgba(255, 255, 255, 1)'
  }
);

var secondSectionStringCounter = 0;
var stringToType = '';
var _this = this;
this.typeTheCopy = function () {
  stringToType+=secondSectionString[secondSectionStringCounter];
  console.log(secondSectionString[secondSectionStringCounter]);
  text.updateCopy(stringToType);
  secondSectionStringCounter++;
  //console.log('secondSectionString.length' + secondSectionString.length);
  if(secondSectionStringCounter == secondSectionString.length ){
    clearInterval(_this.typeTheCopyInterval);
  }
}

this.startTheTyping = function () {
  clearInterval(_this.startTheTypeingInterval);
  _this.typeTheCopyInterval = setInterval(_this.typeTheCopy, 250);
}

text.el.position.set(0, -15, 0);
text.el.rotation.y = .35;
secondSection.add(text.el);


secondSection.onIn(function () {
  console.log('secondSection.onIn');
  console.log('secondSection.el.position.z: ' + secondSection.el.position.z);
  text.in();
});

secondSection.onOut(function () {
  console.log('secondSection.onOut');
  creativeWriting.onOut();
});

secondSection.onStart(function () {
  console.log('secondSection.onStart');
   secondSectionStringCounter = 0;
 stringToType = '';
  text.updateCopy('');
  creativeWriting.show();
  creativeWriting.start();
  _this.startTheTypeingInterval = setInterval(_this.startTheTyping, 3000);
  
  
});

secondSection.onStop(function () {
  console.log('secondSection.onStop');
  creativeWriting.stop();
  creativeWriting.hide();
});

secondSection.setPositions = function () {
  creativeWriting.el.position.x = 0;
  creativeWriting.el.position.y = 10;
  creativeWriting.el.position.z = -20;
};

module.exports = secondSection;