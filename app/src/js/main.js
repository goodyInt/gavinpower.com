var ImagesLoader = require('./classes/LoaderClass');
var Loader = require('./objects/loaderObject');
var SCENE = require('./modules/sceneModule');



var loader = new Loader();


var imagesLoader = new ImagesLoader([
    './img/goodyGav.JPG',
    './img/goodyIntLogo_512x512.png'
  ]);
  

  // preload
  imagesLoader.start();

  imagesLoader.onProgress(function (percent) {
      console.log(percent);
    loader.update(percent);
  });

  imagesLoader.onComplete(function () {
    console.log('complete');
    loader.out();
/*
    TweenLite.delayedCall(0.8, SCENE.in);
    TweenLite.delayedCall(1.5, function () {
      map.in();
      menu.in();
   
    });
       */
  });
/*

var $ = require('jquery');
var tweenMax = require('tweenMax');

function LoadingScreen() {
    console.log("this is the loader screen");
    var titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";
    titleDiv.innerHTML = "titleDiv"
    document.body.appendChild(titleDiv);
    $("#titleDiv").css("opacity", 0);
    tweenMax.to($("#titleDiv"), 1, {
        delay: .35,
        opacity: 1,
        ease: Quad.easeOut
    });
}
module.exports = LoadingScreen;
*/ 