'use strict';
var THREE = require('three');
var ourRibbonAssualt = require('../materials/ribbonAssault');
var Events = require('../classes/EventsClass');

function ThankYouObject() {
  this.el = new THREE.Object3D();
  this.events = new Events();
  var theSign = new THREE.Object3D();
  var loader = new THREE.FontLoader();
  var _this = this;
  var theShaderMaterial;
  var uniforms;
  var moveTheRibbonsInterval;
  var thankSign;
  var forSign;
  var watchingSign;
  var fullScreenRibbon;
  var fullScreenGeo;
  var watchOffset;
  

  var shaderUniformObject = {
    shaderOpacity: 0.0
  };

  loader.load('./fonts/helvetiker_bold.typeface.json', function (font) {
    init(font);
  });

  function init(font) {
    uniforms = ourRibbonAssualt.uniforms;

    theShaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: ourRibbonAssualt.vertexShader,
      fragmentShader: ourRibbonAssualt.fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: .1
    });

    var thankYouGeo = new THREE.TextBufferGeometry("Thank", {
      font: font,
      size: 10,
      height: .1,
      curveSegments: 10,
      bevelThickness: .1,
      bevelSize: .1,
      bevelEnabled: true
    });
    thankYouGeo.computeBoundingBox();
  
    fullScreenGeo = new THREE.BoxBufferGeometry(window.screen.width,window.screen.height, 1);
    fullScreenRibbon = new THREE.Mesh(fullScreenGeo, theShaderMaterial);
    _this.el.add(fullScreenRibbon);
    fullScreenGeo.computeBoundingBox();
    fullScreenRibbon.position.z = 59;
    fullScreenRibbon.position.x = window.screen.width*.5  ;
    fullScreenRibbon.visible = false;
    var centerOffset = -0.5 * (thankYouGeo.boundingBox.max.x - thankYouGeo.boundingBox.min.x);
    thankSign = new THREE.Mesh(thankYouGeo, theShaderMaterial);
    thankSign.position.x = centerOffset + 1;
    theSign.add(thankSign);

    var forGeo = new THREE.TextBufferGeometry("You For", {
      font: font,
      size: 10,
      height: .1,
      curveSegments: 10,
      bevelThickness: .1,
      bevelSize: .1,
      bevelEnabled: true
    });
    forGeo.computeBoundingBox();

    centerOffset = -0.5 * (forGeo.boundingBox.max.x - forGeo.boundingBox.min.x);
    forSign = new THREE.Mesh(forGeo, theShaderMaterial);
    forSign.position.x = centerOffset + 2;
    theSign.add(forSign);

    var watchingGeo = new THREE.TextBufferGeometry("Watching", {
      font: font,
      size: 10,
      height: .1,
      curveSegments: 10,
      bevelThickness: .1,
      bevelSize: .1,
      bevelEnabled: true
    });
    watchingGeo.computeBoundingBox();

    centerOffset = -0.5 * (watchingGeo.boundingBox.max.x - watchingGeo.boundingBox.min.x);
    watchOffset = centerOffset;
    watchingSign = new THREE.Mesh(watchingGeo, theShaderMaterial);
    watchingSign.position.x = centerOffset + 2.5;
    theSign.add(watchingSign);
    _this.el.add(theSign);

    thankSign.position.y = 5;
    forSign.position.y = -5;
    watchingSign.position.y = -15;

    theSign.position.z = -window.innerWidth * 2;

    theSign.visible = false;

    theShaderMaterial.uniforms.iResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    theShaderMaterial.uniforms.iMouse.value = new THREE.Vector4(window.innerWidth * .5, window.innerHeight * .5, 0.0, 0.0);
  }

  function mouseISMoving(e) {
    uniforms.iMouse.value.x = e.pageX;
    uniforms.iMouse.value.y = e.pageY;
  }

  var moveTheRibbons = function () {
    uniforms.iTime.value += 0.05;
  }

  this.on = function () {
    _this.events.on.apply(_this.events, arguments);
  }

  ThankYouObject.prototype.onIn = function () {
    document.addEventListener('mousemove', mouseISMoving, false);
    moveTheRibbonsInterval = setInterval(moveTheRibbons, 40);
    _this.events.trigger('sectionIsIn', {
      message: 'ThankYouObject sectionIsIn'
    });
  };

  this.start = function () {
    _this.events.trigger('sectionFullyLoaded', {
      message: 'Thank You Object is Loaded'
    });
    var theDelay = 0;
    var finalSpeed = 5;

    TweenMax.to(theSign.position, finalSpeed, {
      z: 20,
      ease: Power2.easeInOut,
      delay: theDelay,
      onStart: function () {
        theSign.visible = true;
      }
    });

    TweenMax.to(shaderUniformObject, 1, {
      delay: theDelay+2,
      shaderOpacity: 1.0,
      ease: Power2.easeIn,
      onUpdate: function () {
        theShaderMaterial.uniforms["opacity"].value = shaderUniformObject.shaderOpacity;
      }
    });

    TweenMax.to(theSign.position, 5, {
      z: 59,
      ease: Power2.easeInOut,
      delay: theDelay + finalSpeed
    });

    fullScreenRibbon.position.z = 59;
    fullScreenRibbon.position.x = window.screen.width*.5;
    var destX  =  window.screen.width*.5+ watchOffset;
  
    TweenMax.to(fullScreenRibbon.position, 1.75, {
      onStart: function () {
       
        fullScreenRibbon.visible = true;
      },
      onComplete: function () {
         fullScreenRibbon.position.x = 0;
     
      },
      x: destX,
     
      ease: Power1.easeIn,
      delay: theDelay + finalSpeed + 4.25
    });
  }

  this.onOut = function () {

    TweenMax.killTweensOf(theSign.position);
    TweenMax.killTweensOf(fullScreenRibbon.position);
    TweenMax.killTweensOf(shaderUniformObject);

    TweenMax.to(fullScreenRibbon.position, 1, {
      onComplete: function () {
        fullScreenRibbon.visible = false;
      },
      x: window.screen.width*.5,
      ease: Power2.easeInOut
    });

    TweenMax.to(theSign.position, 5, {
      z: 20,
      ease: Power2.easeInOut,
      delay: 0.0 
    });

    TweenMax.to(theSign.position, 2, {
      onComplete: function () {
        theSign.visible = false;
        clearInterval(moveTheRibbonsInterval);
        _this.events.trigger('sectionUnloaded', {
          message: 'ThankYou is Unloaded'
        });
      },
      z: -window.innerWidth * 2,
      ease: Power2.easeInOut,
      delay: 5.0
    });

    TweenMax.to(shaderUniformObject, 2, {
      delay: 5.0,
      shaderOpacity: 0.0,
      ease: Power2.easeOut,
      onUpdate: function () {
        theShaderMaterial.uniforms["opacity"].value = shaderUniformObject.shaderOpacity;
      }
    });

  }
  this.onStop = function () {
    console.log('ThankYouObject onStop');
    document.removeEventListener('mousemove', mouseISMoving, false);
  }

  this.handleResize = function () {
    console.log('ThankYouObject.handleResize');
    theShaderMaterial.uniforms.iResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    if(fullScreenRibbon.visible == true){
      fullScreenRibbon.position.x = 0 ;
    }else{
      fullScreenRibbon.position.x = fullScreenGeo.boundingBox.max.x;
    }
  }
}

module.exports = ThankYouObject;