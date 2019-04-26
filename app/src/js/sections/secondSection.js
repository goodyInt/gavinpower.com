'use strict';

var Section = require('../classes/SectionClass');
var CreativeWriting = require('../objects/CreativeWritingObject');
var TextPanel = require('../objects/TextPanelObject');

var secondSection = new Section('second');

var creativeWriting = new CreativeWriting();
//creativeWriting.addWriting();
secondSection.add(creativeWriting.el);

var text = new TextPanel(
  'Writing', {
    align: 'center',
    font: 'Times New Roman, Times, serif',
    style: '',
    size: 165,
    lineSpacing: 40,
    color: 'rgba(230, 230, 230, 1)'
  }
);
text.el.position.set(0, -10, 0);
text.el.rotation.y = .35;
secondSection.add(text.el);

secondSection.onIn(function () {
  console.log('secondSection.onIn');
  console.log('secondSection.el.position.z: ' +secondSection.el.position.z);
  text.in();
});

secondSection.onOut(function () {
  console.log('secondSection.onOut');
});

secondSection.onStart(function () {
  console.log('secondSection.onStart');
  creativeWriting.show();
  creativeWriting.start();
});

secondSection.onStop(function () {
  console.log('secondSection.onStop');
  creativeWriting.stop();
  creativeWriting.hide();
});

secondSection.setPositions = function () {
  creativeWriting.el.position.x  = 0;
  creativeWriting.el.position.y  = 10;
  creativeWriting.el.position.z  = 0;
};

module.exports = secondSection;