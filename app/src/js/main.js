var ImagesLoader = require('./classes/LoaderClass');
var Loader = require('./objects/LoaderObject');
var Menu = require('./objects/MenuObject');
var tweenMax = require('tweenMax');
var SCENE = require('./modules/sceneModule');
var jQuery = require('jquery');
var introSection = require('./sections/introSection');
var secondSection = require('./sections/secondSection');
var thirdSection = require('./sections/thirdSection');
var fourthSection = require('./sections/fourthSection');
var fifthSection = require('./sections/fifthSection');
var sixthSection = require('./sections/sixthSection');
var seventhSection = require('./sections/seventhSection');
var menu = new Menu();
var loader = new Loader();

var imagesLoader = new ImagesLoader([
  './img/heightMap/heightMap-white.jpg'
]);

// preload
imagesLoader.start();
imagesLoader.onProgress(function (percent) {
  loader.update(percent);
});

imagesLoader.onComplete(function () {
 
  loader.out();
  tweenMax.delayedCall(0.8, SCENE.in);
  tweenMax.delayedCall(1.5, function () {
    //console.log(introSection);
    introSection.show();
    var thisIntroSection = introSection;
    introSection.startUpFirstTime(function () {
     // console.log(thisIntroSection);
      map.$el.show();
      map.in();
      menu.in();
     
      console.log('all set in main - bring in the map')
     // thisIntroSection.textIn();
      //console.log(theIntroSection);
     
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
  console.log('');
  console.log('changeBegin to: ' + to);
  console.log('changeBegin from: ' + from);
  SCENE.setUpNextScene(to);
  switch (to) {
    case 'intro':
      if (from !== 'intro') {
        introSection.in();
        introSection.start();
      }
      break;
    case 'second':
      secondSection.in();
      secondSection.start();
    
      break;
    case 'third':
     
      thirdSection.in();
      thirdSection.start();
      break;
    case 'fourth':
      fourthSection.in();
      fourthSection.start();
    
      break;
    case 'fifth':
      fifthSection.in();
      fifthSection.start();
  
      break;
    case 'sixth':
      sixthSection.in();
      sixthSection.start();

      break;
    case 'seventh':
      seventhSection.in();
      seventhSection.start();
    
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
  console.log('');
  console.log('changeComplete to: ' + to);
  console.log('changeComplete from: ' + from);
  SCENE.cleanUpLastScene(from);
  switch (from) {
    case 'intro':
    console.log('calling intro.stop() changeComplete');
      introSection.stop();
      break;
    case 'second':
      secondSection.stop();
  
      break;
    case 'third':
      thirdSection.stop();
  
      break;
    case 'fourth':
      fourthSection.stop();
   
      break;
    case 'fifth':
      fifthSection.stop();
     
      break;
    case 'sixth':
      sixthSection.stop();
     
      break;
    case 'seventh':
      seventhSection.stop();
    
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