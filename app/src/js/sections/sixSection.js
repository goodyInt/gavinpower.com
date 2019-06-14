'use strict';

var Section = require('../classes/SectionClass');
var animatedSprite = require('../objects/AnimatedSpriteObject');
var Smoke = require('../objects/SmokeObject');
var sixSection = new Section('six');
var Events = require('../classes/EventsClass');
var sixEvents = new Events();

var sixAnimatedText = new animatedSprite();
var TextPanel = require('../objects/TextPanelObject');
var _this = this;
var sixSmoke = new Smoke({  
  frontColor: '#0cff7f',
  backColor: '#0cff7f',
  layers: 3,
  data: [
    { positionX : 7.7, positionY: 8.4, positionZ: 12.8, rotationZ: .7, scale: 5.7 },
    { positionX : -4.8, positionY: 9.6, positionZ: 4, rotationZ: 1.7, scale: 2.2 },
    { positionX : 3, positionY: 7.5, positionZ: -4.3, rotationZ: 3, scale: 1.7 } 
  ]
});


sixSection.on =  function () {
  sixEvents.on.apply(sixEvents, arguments);
}
sixSmoke.on('sectionFullyLoaded', function () {
  console.table(this);
  sixEvents.trigger('sectionFullyLoaded', {section: 6 , message: 'Section Six is Loaded'});
});

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
  console.log('section six bring in the BTN')
  clearInterval(_this.bringInTheNextBtnInterval);
  nextBtn.in();
  sixSection.nextBtnIsIn = true;
}

sixSection.add(sixSmoke.el);
sixSection.add(sixAnimatedText.el);
sixAnimatedText.out();
sixSmoke.el.visible = false;

sixSection.onIn(function () {
  console.log('sixSection.onIn');
  sixAnimatedText.in();
  sixSection.smokeStart();
});

sixSection.onOut(function () {
  console.log('sixSection.onOut');
  sixAnimatedText.out();
  sixEvents.trigger('sectionUnloaded', {section: 6 , message: 'Section Six is UnLoaded'});

});

sixSection.onStart(function () {
  console.log('sixSection.onStart');
  sixAnimatedText.start();
  sixSection.show();
  _this.bringInTheNextBtnInterval = setInterval(_this.bringInTheBtn, 4500);
});

sixSection.onStop(function () {
  console.log('sixSection.onStop');
  sixAnimatedText.stop();
  sixSection.smokeStop();
  sixSection.hide();
  clearInterval(_this.bringInTheNextBtnInterval);
});
sixSection.show = function () {
  console.log('sixSection.show');
  sixSmoke.el.visible = true;
  sixAnimatedText.el.visible = true;
  nextBtn.el.visible = true;
 
};
sixSection.hide = function () {
  console.log('sixSection.hide');
  sixSmoke.el.visible = false;
  sixAnimatedText.el.visible = false;
  nextBtn.el.visible = false;
};

var sixSmokePlaying = false;

sixSection.smokeStart = function () {
  
  if (sixSmokePlaying) {
    return false;
  }
  sixSmokePlaying = true;
  sixSmoke.start();
  sixSmoke.el.visible = true;
};

sixSection.smokeStop = function () {
  if (!sixSmokePlaying) {
    return false;
  }

  sixSmokePlaying = false;
  sixSmoke.stop();
  sixSmoke.el.visible = false;
};

sixSection.updateColors = function (color1, color2) {
  sixSmoke.updateColors(color1, color2);
};

////
sixSection.nextBtnIsIn = false;
sixSection.nextBtnIsOver = false;
sixSection.nextBtnIsDown = false;

sixSection.getTheNextBtn = function () {
  return nextBtn;
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

module.exports = sixSection;