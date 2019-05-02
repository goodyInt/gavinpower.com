'use strict';

var Section = require('../classes/SectionClass');
var Campfire = require('../objects/CampfireObject');
var TextPanel = require('../objects/TextPanelObject');
var Fire = require('../objects/FireObject');
var thirdSection = new Section('third');


var fourthSmoke = new Fire({  
  frontColor: '#ff5000',
  backColor: '#ff0000',
  layers: 4,
  data: [
    { positionX : -2, positionY: -18, positionZ: .2, rotationZ: (-5 * Math.PI / 180), scale: 1 },
    { positionX : -1, positionY: -18, positionZ: .1, rotationZ: (-5 * Math.PI / 180), scale: .9 },
    { positionX : 1, positionY: -18, positionZ: -.1, rotationZ: (-5 * Math.PI / 180), scale: .8 },
    { positionX : 2, positionY: -18, positionZ: -.2, rotationZ: (-5 * Math.PI / 180), scale: .75 }
   // { positionX : 10, positionY: -5, positionZ: -15, rotationZ: 0, scale: 1 },
   // { positionX : 10, positionY: -5, positionZ: -15, rotationZ: 0, scale: 1 } 
  ]
});
thirdSection.add(fourthSmoke.el);
fourthSmoke.el.position.z = -3;

fourthSmoke.start();
fourthSmoke.el.visible = true;

var ourCampfire = new Campfire();
thirdSection.add(ourCampfire.el);

var passionTextString = '<<< I like code. I like details. I love...';
var nextBtn = new TextPanel(
  passionTextString, {
    align: 'center',
    style: '',
    size: 85,
    lineSpacing: 40,
    color: '#999999' 
  }
);

var _this = this;
this.bringInTheBtn = function () {
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  thirdSection.nextBtnIsIn = true;
}

thirdSection.add(nextBtn.el);

thirdSection.onIn(function () {
  console.log('thirdSection.onIn');
  console.log('thirdSection.el.position.z: ' + thirdSection.el.position.z);

});

thirdSection.onOut(function () {
  console.log('thirdSection.onOut');
  ourCampfire.onOut();
});

thirdSection.onStart(function () {
  console.log('thirdSection.onStart');
  ourCampfire.show();
  ourCampfire.start();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

thirdSection.onStop(function () {
  console.log('thirdSection.onStop');
  ourCampfire.stop();
  ourCampfire.hide();
  nextBtn.overOut();
  nextBtn.out('up'); 
});

////
thirdSection.nextBtnIsIn = false;
thirdSection.nextBtnIsOver = false;
thirdSection.nextBtnIsDown = false;

thirdSection.getTheNextBtn = function () {
  console.log('thirdSection.getTheNextBtn');
  return nextBtn;
};
thirdSection.theNextBtnIsOver = function () {
  console.log('thirdSection.theNextBtnIsOver');
  nextBtn.over();
  thirdSection.nextBtnIsOver = true;

};
thirdSection.theNextBtnIsDown = function () {
  console.log('thirdSection.theNextBtnIsDown');
  nextBtn.down('#0000ff');
  thirdSection.nextBtnIsDown = true;
};
thirdSection.theNextBtnIsUp = function () {
  console.log('thirdSection.theNextBtnIsUp');
  nextBtn.overOut();
  thirdSection.nextBtnIsDown = false;
};

thirdSection.theNextBtnIsOut = function () {
  console.log('thirdSection.theNextBtnIsOut');
  nextBtn.overOut();
  thirdSection.nextBtnIsOver = false;
};

thirdSection.setPositions = function () {
  ourCampfire.el.position.x = 0;
  ourCampfire.el.position.y = 10;
  ourCampfire.el.position.z = -20;

  nextBtn.el.position.x = 20;
  nextBtn.el.position.y = 20;
  nextBtn.el.position.z = -30;
  nextBtn.el.rotation.y = -40 * (Math.PI / 180);
  nextBtn.el.rotation.z = -20 * (Math.PI / 180);

};

module.exports = thirdSection;