var ImagesLoader = require('./classes/LoaderClass');
var Loader = require('./objects/loaderObject');

var SCENE = require('./modules/sceneModule');
var jQuery = require('jquery');
var introSection = require('./sections/introSection');
var secondSection = require('./sections/secondSection');
var thirdSection = require('./sections/thirdSection');
var fourthSection = require('./sections/fourthSection');
var fifthSection = require('./sections/fifthSection');
var sixthSection = require('./sections/sixthSection');
var seventhSection = require('./sections/seventhSection');
var loader = new Loader();
var imagesLoader = new ImagesLoader([
  './img/sprite-none-shrunk2.png',
  './img/glitchSpriteBW.png',
  './img/fireConvert.png'

]);
// preload
imagesLoader.start();

imagesLoader.onProgress(function (percent) {

  loader.update(percent);
});
imagesLoader.onComplete(function () {

  loader.out();
  TweenLite.delayedCall(0.8, SCENE.in);

  TweenLite.delayedCall(1.5, function () {
    map.in();
    // menu.in();

  });
});

// scene
var $app = jQuery('.app');

var $viewport = $app.find('.appViewport');

SCENE.config({
  quality: 1
});
SCENE.setViewport($viewport);
SCENE.addSections([
  introSection,
  secondSection,
  thirdSection,
  fourthSection,
  fifthSection,
  sixthSection,
  seventhSection
]);

SCENE.on('section:changeBegin', function () {
  var way = this.way;
  var to = this.to.name;
  var from = this.from.name;

  ;
  switch (to) {
    case 'intro':
      introSection.in();
      introSection.start();
      introSection.smokeStart();

      break;
    case 'second':
      secondSection.in();
      secondSection.start();
      secondSection.smokeStart();
      break;
    case 'third':
      thirdSection.in();
      thirdSection.start();
      thirdSection.smokeStart();
      break;
    case 'fourth':
      fourthSection.in();
      fourthSection.start();
      fourthSection.smokeStart();
      break;
    case 'fifth':
      fifthSection.in();
      fifthSection.start();
      fifthSection.smokeStart();
      break;
    case 'sixth':
      sixthSection.in();
      sixthSection.start();
      sixthSection.smokeStart();
      break;
    case 'seventh':
      seventhSection.in();
      seventhSection.start();
      seventhSection.smokeStart();
      break;
    default:
      break;
  }
  switch (from) {
    case 'intro':
      if (to !== 'intro') {
        introSection.out(way);
      }
      break;
    case 'second':
      secondSection.out(way);
      break;
    case 'third':
      thirdSection.out(way);
      break;
    case 'fourth':
      fourthSection.out(way);
      break;
    case 'fifth':
      fifthSection.out(way);
      break;
    case 'sixth':
      sixthSection.out(way);
      break;
    case 'seventh':
      seventhSection.out(way);
      break;

    default:
      break;
  }
});


SCENE.on('section:changeComplete', function () {
  var to = this.to.name;
  var from = this.from.name;
 
  // out complete
  // stop

  switch (from) {
    case 'intro':
      introSection.stop();
      introSection.smokeStop();
      break;
    case 'second':
      secondSection.stop();
      secondSection.smokeStop();
      break;
    case 'third':
      thirdSection.stop();
      thirdSection.smokeStop();
      break;
    case 'fourth':
      fourthSection.stop();
      fourthSection.smokeStop();
      break;
    case 'fifth':
      fifthSection.stop();
      fifthSection.smokeStop();
      break;
    case 'sixth':
      sixthSection.stop();
      sixthSection.smokeStop();
      break;
    case 'seventh':
      seventhSection.stop();
      seventhSection.smokeStop();
      break;
    default:
      break;
  }
});

// map
var map = SCENE.getMap();
$app.prepend(map.$el);

map.init();

map.onClick(function (index) {
  SCENE.goTo(index);
});

SCENE.on('section:changeBegin', function () {
  map.setActive(this.to.index);
});

SCENE.start();