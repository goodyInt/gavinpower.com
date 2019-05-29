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

SCENE.on('section:changeBegin', function () {
  var way = this.way;
  var to = this.to.name;
  var from = this.from.name;
  console.log('');
  console.log('changeBegin to: ' + to);
  console.log('changeBegin from: ' + from);
  SCENE.setUpNextScene(to,from);
  switch (to) {
    case 'zero':
      if (from !== 'zero') {
        zeroSection.in();
        zeroSection.start();
      }
      break;
    case 'one':
      oneSection.in();
      oneSection.start();

      break;
    case 'two':
    if (from !== 'three') {
      twoSection.in();
      twoSection.start();
      //
      threeSection.in();
      threeSection.start();
    }
      break;
    case 'three':
    if (from !== 'two') {
      twoSection.in();
      twoSection.start();
      threeSection.in();
      threeSection.start();
    }
      break;
    case 'four':
      fourSection.in();
      fourSection.start();

      break;
    case 'five':
      fiveSection.in();
      fiveSection.start();

      break;
    case 'six':
      sixSection.in();
      sixSection.start();

      break;
    default:
      break;
  }
  switch (from) {
    case 'zero':
      if (to !== 'zero') {
        zeroSection.out(way);
      }
      break;
    case 'one':
      oneSection.out(way);
      break;
    case 'two':
     if (to !== 'three') {
      twoSection.out(way);
      threeSection.out(way);
     }
      break;
    case 'three':
     if (to !== 'two') {
      twoSection.out(way);
      threeSection.out(way);
     }
      break;
    case 'four':
      fourSection.out(way);
      break;
    case 'five':
      fiveSection.out(way);
      break;
    case 'six':
      sixSection.out(way);
      break;
    default:
      break;
  }
});

SCENE.on('section:changeComplete', function () {

  var to = this.to.name;
  var from = this.from.name;
  console.log('');
  console.log('changeComplete to: ' + to);
  console.log('changeComplete from: ' + from);
  SCENE.cleanUpLastScene(from,to);

  switch (from) {
    case 'zero':
      console.log('calling zero.stop() changeComplete');
      zeroSection.stop();
      break;
    case 'one':
      oneSection.stop();

      break;
    case 'two':
      if (to !== 'three') {
        threeSection.stop();
        twoSection.stop();
      }
      break;
    case 'three':
      if (to !== 'two') {
        threeSection.stop();
        twoSection.stop();
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