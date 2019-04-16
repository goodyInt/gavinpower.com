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
  './img/sprite-none-shrunk2.png',
  './img/glitchSpriteBW.png',
  './img/fireConvert.png',
  './img/heightMap/heightMap-start.jpg',
  './img/heightMap/heightMap-H.jpg',
  './img/heightMap/heightMap-HE.jpg',
  './img/heightMap/heightMap-HEL.jpg',
  './img/heightMap/heightMap-HELL.jpg',
  './img/heightMap/heightMap-hello.jpg',
  './img/heightMap/heightMap-helloFriend.jpg',
  './img/heightMap/heightMap-restart.jpg',
  './img/heightMap/heightMap-I.jpg',
  './img/heightMap/heightMap-AM.jpg',
  './img/heightMap/heightMap-A.jpg', 
  './img/heightMap/heightMap-developer.jpg',
  './img/heightMap/heightMap-break.jpg' ,
  './img/heightMap/heightMap-Gav.jpg'
]);


/*

{ name: 'start', url: './img/heightMap/heightMap-start.jpg' },
    { name: 'H', url: './img/heightMap/heightMap-H.jpg' },
    { name: 'HE', url: './img/heightMap/heightMap-HE.jpg' },
    { name: 'HEL', url: './img/heightMap/heightMap-HEL.jpg' },
    { name: 'HELL', url: './img/heightMap/heightMap-HELL.jpg' },
    { name: 'Hello', url: './img/heightMap/heightMap-hello.jpg' },
    { name: 'P&G', url:  agencyURL},
    { name: 'restart', url: './img/heightMap/heightMap-restart.jpg' },
    { name: 'I', url: './img/heightMap/heightMap-I.jpg' },
    { name: 'AM', url: './img/heightMap/heightMap-AM.jpg' },
    { name: 'A', url: './img/heightMap/heightMap-A.jpg' },
    
    { name: 'Developer', url: './img/heightMap/heightMap-developer.jpg' },
    { name: 'break', url: './img/heightMap/heightMap-break.jpg' },
    { name: 'Gav', url: './img/heightMap/heightMap-Gav.jpg' }


*/
// preload
imagesLoader.start();

imagesLoader.onProgress(function (percent) {
  loader.update(percent);
});
imagesLoader.onComplete(function () {
  loader.out();
  tweenMax.delayedCall(0.8, SCENE.in);

  tweenMax.delayedCall(1.5, function () {
    map.in();
     menu.in();
     introSection.show();
    introSection.in();
    introSection.start();
  });
});

menu.onClick(function () {
  var $el = jQuery(this);
  var name = $el.attr('data-button');
  switch (name){
    case  ('sounds'): 
    break;
    case  ('help'): 
    break;
    case  ('resume'): 
    break;
    case  ('email'): 
    break;
    case  ('close'): 
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
  console.log('changeBegin');
  var way = this.way;
  var to = this.to.name;
  var from = this.from.name;

  ;
  switch (to) {
    case 'intro':
      introSection.in();
      introSection.start();
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
  console.log('changeComplete');

  var to = this.to.name;
  var from = this.from.name;

  switch (from) {
    case 'intro':
      introSection.stop();
   //   introSection.smokeStop();
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