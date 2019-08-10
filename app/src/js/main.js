var ImagesLoader = require('./classes/LoaderClass');
var Loader = require('./objects/LoaderObject');
var Menu = require('./objects/MenuObject');
var Credits = require('./objects/CreditsObject');
var Contacts = require('./objects/ContactsObject');
var About = require('./objects/AboutObject');
var Sound = require('./objects/SoundScreenObject');
var ScreenBackground = require('./objects/MainScreenBackground');
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
var ourScreenBackground = new ScreenBackground();

var contacts = new Contacts();
contacts.setCallBack(removeBack);

var credits = new Credits();
credits.setCallBack(removeBack);

var about = new About();
about.setCallBack(removeBack);

var sound = new Sound();
sound.setCallBack(removeBack);

var loader = new Loader();
var toFromCallbackData;

function removeBack() {
  menu.removeTheActive();
  ourScreenBackground.removeFromStage();
}
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
  menu.removeTheActive();
  var $el = jQuery(this);
  $el.addClass('isActive');
  var name = $el.attr('data-button');
  console.log('window.innerWidth');
  console.log(window.innerWidth);
  switch (name) {
    case ('sounds'):
      about.removeFromStage();
      credits.removeFromStage();
      contacts.removeFromStage();
      sound.addToStage();
      ourScreenBackground.addToStage();
      if (window.innerWidth < 600) {
        menu.outPhone();
      }
      break;
    case ('credits'):
      sound.removeFromStage();
      about.removeFromStage();
      contacts.removeFromStage();
      credits.addToStage();
      ourScreenBackground.addToStage();
      if (window.innerWidth < 600) {
        menu.outPhone();
      }
      break;
    case ('about'):
      sound.removeFromStage();
      credits.removeFromStage();
      contacts.removeFromStage();
      ourScreenBackground.addToStage();
      about.addToStage();
      //href="/downloads/gavinBryanPower.pdf" download
      if (window.innerWidth < 600) {
        menu.outPhone();
      }
      break;
    case ('contact'):
      sound.removeFromStage();
      about.removeFromStage();
      credits.removeFromStage();
      contacts.addToStage();
      ourScreenBackground.addToStage();
      if (window.innerWidth < 600) {
        menu.outPhone();
      }
      break;
    case ('close'):
      sound.removeFromStage();
      about.removeFromStage();
      credits.removeFromStage();
      contacts.removeFromStage();
      ourScreenBackground.removeFromStage();
      menu.out();
      break;
  };
});

// scene
var $app = jQuery('.app');
var $map = jQuery('.mapApp');

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
  if (this.section == 2) {
    return;
  }
  switch (toFromCallbackData.to.name) {
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
      fourSection.prepForSectionFive(toFromCallbackData.from.name);
      fiveSection.in();
      break;
    case 'six':
      fourSection.prepForSectionFive(toFromCallbackData.from.name);
      sixSection.in();
      break;
    default:
      break;
  }

});
SCENE.on('sectionIsIn', function () {
  console.table(this);
  if (this.section == 2) {
    // sectioon 2 and 3 load at the same time
    return;
  }
  toFromCallbackData.callback.func();
});

SCENE.on('section:changeBegin', function () {
  console.log('');
  console.log('changeBegin');

  console.table(this);
  map.setActive(this.to.index);
  toFromCallbackData = this;
  var from = toFromCallbackData.from.name;
  var to = toFromCallbackData.to.name;
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
      if (to == 'five' || to == 'six') {
        fourSection.outToFive();
      } else {
        fourSection.out();
      }
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
  console.table(this);
  var to = this.to.name;
  var from = this.from.name;

  switch (from) {
    case 'zero':
      zeroSection.stop();
      break;
    case 'one':
      oneSection.stop();
      break;

    case 'two':
      if (to == 'three') {} else {
        twoSection.stop();
        threeSection.stop();
      }
      break;

    case 'three':
      if (to == 'two') {} else {
        twoSection.stop();
        threeSection.stop();
      }
      break;

    case 'four':
      if (to == 'five' || to == 'six') {
        fourSection.stopForFiveSix();
      } else {
        fourSection.stop();
      }
      break;

    case 'five':
      if (to !== 'four') {
        fourSection.stop();
      }
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
      if (from == 'five') {
        fourSection.startFromFive();
      } else {
        fourSection.start();
      }
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
//$app.prepend(map.$el);
$map.prepend(map.$el);

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