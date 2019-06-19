var ImagesLoader = require('./classes/LoaderClass');
var Loader = require('./objects/LoaderObject');
var Menu = require('./objects/MenuObject');
var tweenMax = require('tweenMax');
var SCENE = require('./modules/sceneModule');
var jQuery = require('jquery');
var zeroSection = require('./sections/zeroSection');
var oneSection = require('./sections/oneSection');
var twoSection = require('./sections/twoSection');
var threeSection = require('./sections/threeSection');
var fourSection = require('./sections/fourSection');
var fiveSection = require('./sections/fiveSection');
var sixSection = require('./sections/sixSection');
var menu = new Menu();
var loader = new Loader();
var toFromCallbackData;

var imagesLoader = new ImagesLoader([
  './img/heightMap/heightMap-white.jpg'
]);

imagesLoader.start();
imagesLoader.onProgress(function (percent) {
  loader.update(percent);
});

imagesLoader.onComplete(function () {
  loader.out();
  tweenMax.delayedCall(0.8, SCENE.in);
  tweenMax.delayedCall(1.5, function () {
    zeroSection.show();
    zeroSection.startUpFirstTime(function () {
      map.$el.show();
      map.in();
      menu.in();
    });
  });
});

menu.onClick(function () {
  var $el = jQuery(this);
  var name = $el.attr('data-button');
  switch (name) {
    case ('sounds'):
      break;
    case ('help'):
      break;
    case ('resume'):
      break;
    case ('email'):
      break;
    case ('close'):
      menu.out();
      break;
  };
});
// scene
var $app = jQuery('.app');

var $viewport = $app.find('.appViewport');

SCENE.config({
  quality: 1
});
SCENE.setViewport($viewport);
SCENE.addSections([
  zeroSection,
  oneSection,
  twoSection,
  threeSection,
  fourSection,
  fiveSection,
  sixSection
]);

SCENE.on('sectionFullyLoaded', function () {
  console.table(this);
});

SCENE.on('sectionUnloaded', function () {
  console.table(this);

  var from = toFromCallbackData.from.name;
  var to = toFromCallbackData.to.name;
  console.log('from: ' + from);
  console.log(from);
  console.log('this.section: ' + this.section);

  if (this.section == 2) {
    console.log('2 returning...');
    return;
  }
  switch (to) {
    case 'zero':
      zeroSection.in();
      break;
    case 'one':
      oneSection.in();
      break;
    case 'two':
      twoSection.in();
      threeSection.in();
      break;
    case 'three':
      twoSection.in();
      threeSection.in();
      break;
    case 'four':
      fourSection.in();
      break;
    case 'five':
      fiveSection.in();
      break;
    case 'six':
      sixSection.in();
      break;
    default:
      break;
  }
 // toFromCallbackData.callback.func();
});
SCENE.on('sectionIsIn', function () {
  console.table(this);
  var from = toFromCallbackData.from.name;
  var to = toFromCallbackData.to.name;
  console.log('sectionIsIn from: ' + from);
  console.log('sectionIsIn to: ' + to);
  console.log('this.section: ' + this.section);

  console.log(' sectionIsIn this.section: ' + this.section);
  if (this.section == 2) {
    console.log('2 returning...');
    return;
  }

  toFromCallbackData.callback.func();
});

SCENE.on('section:changeBegin', function () {
  map.setActive(this.to.index);
  toFromCallbackData = this;
  var from = toFromCallbackData.from.name;
  var to = toFromCallbackData.to.name;
  console.table(this);

  switch (from) {
    case 'zero':
      zeroSection.out();
      break;
    case 'one':
      oneSection.out();
      break;
    case 'two':
      if (to == 'three') {
       toFromCallbackData.callback.func();
      } else {
        twoSection.out();
        threeSection.out();
      }
      break;
    case 'three':
      if (to == 'two') {
       toFromCallbackData.callback.func();
      } else {
        twoSection.out();
        threeSection.out();
      }
      break;
    case 'four':
      fourSection.out();
      break;
    case 'five':
      fiveSection.out();
      break;
    case 'six':
      sixSection.out();
      break;
    default:
      break;
  }
});

SCENE.on('section:changeComplete', function () {
  console.log('section:changeComplete');
  var to = this.to.name;
  var from = this.from.name;
  console.table(this);
  switch (from) {
    case 'zero':
      zeroSection.stop();
      break;
    case 'one':
      oneSection.stop();
      break;
    case 'two':
      if (to == 'three') {
      } else {
        twoSection.stop();
        threeSection.stop();
      }
      break;
    case 'three':
      if (to == 'two') {
      } else {
        twoSection.stop();
        threeSection.stop();
      }

      break;
    case 'four':
      fourSection.stop();
      break;
    case 'five':
      fiveSection.stop();
      break;
    case 'six':
      sixSection.stop();
      break;
    default:
      break;
  }
  switch (to) {
    case 'zero':
      zeroSection.start();
      break;
    case 'one':
      oneSection.start();
      break;
    case 'two':
      if (from == 'three') {

      } else {
        twoSection.start();
        threeSection.start();
      }
      break;
    case 'three':
      if (from == 'two') {

      } else {
        twoSection.start();
        threeSection.start();
      }
      break;
    case 'four':
      fourSection.start();
      break;
    case 'five':
      fiveSection.start();
      break;
    case 'six':
      sixSection.start();
      break;
    default:
      break;
  }
});

// map
var map = SCENE.getMap();
$app.prepend(map.$el);
map.init();
map.visible = false;
map.$el.hide();

map.onClick(function (index) {
  SCENE.goTo(index);
});
SCENE.on('section:changeBegin', function () {
  map.setActive(this.to.index);
});

SCENE.start();