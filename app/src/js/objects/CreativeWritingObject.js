'use strict';
var THREE = require('three');
var tweenMax = require('tweenMax');
var linesMaterial = require('../materials/customLinesMaterial');

function CreativeWriting() {
  this.creativeObject = {};
  console.log('CreativeWriting.5');
  this.el = new THREE.Object3D();
  this.thisRotation = this.el.rotation;
  this.rotateHorTween;
  this.rotateVertTween;
  this.frontPosArray = [];
  this.textInterval;

  var loader = new THREE.FontLoader();
  var _this = this;
  loader.load('fonts/[z] Arista_Regular.json', function (font) {
    init(font);
    //animate();
  });

  function init(font) {
    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms: linesMaterial.uniforms,
      vertexShader: linesMaterial.vertexShader,
      fragmentShader: linesMaterial.fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      fog: true
    });


    var geometry = new THREE.TextBufferGeometry('creative', {
      font: font,
      size: 20,
      height: 10,
      //119688
      curveSegments: 5,
      bevelThickness: .1,
      bevelSize: .35,
      bevelEnabled: true,
      // bevelOffset: 100,
      bevelSegments: 9
    });

    geometry.center();

    var count = geometry.attributes.position.count;

    var displacement = new THREE.Float32BufferAttribute(count * 3, 3);
    geometry.addAttribute('displacement', displacement);
    var customColor = new THREE.Float32BufferAttribute(count * 3, 3);
    geometry.addAttribute('customColor', customColor);
    var color = new THREE.Color(0xffffff);
    for (var i = 0, l = customColor.count; i < l; i++) {
      color.setHSL(i / l, 0.5, 0.5);
      color.toArray(customColor.array, i * customColor.itemSize);
    }

    _this.creativeObject = new THREE.Line(geometry, shaderMaterial);
    _this.el.add(_this.creativeObject);
    _this.creativeObject.visible = false;

    var time = Date.now();
    console.log("time:" + time);

    var gArray = geometry.attributes.position;
    // console.log(gArray);

    for (var i = 0; i < gArray.array.length; i += 3) {

      if (gArray.array[i + 2] < 0) {
        _this.frontPosArray.push(i + 2);

      }
    }
    var time1 = Date.now();
    console.log("time1:" + time1);
    var totalTime = time1 - time;
    console.log("totalTime:" + totalTime);
    console.log(_this.frontPosArray);

  }

  this.rotateLeft = function () {
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 20, {
      ease: Power2.easeInOut,
      y: .35,
      onComplete: _this.rotateRight
    });
  }
  this.rotateRight = function () {
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 20, {
      ease: Power2.easeInOut,
      y: -.35,
      onComplete: _this.rotateLeft
    });
  }

  this.rotateUp = function () {
    _this.rotateVertTween = tweenMax.to(_this.thisRotation, 15, {
      ease: Power2.easeInOut,
      x: .25,
      onComplete: _this.rotateDown
    });
  }
  this.rotateDown = function () {
    _this.rotateVertTween = tweenMax.to(_this.thisRotation, 15, {
      ease: Power2.easeInOut,
      x: -.25,
      onComplete: _this.rotateUp
    });
  }
  var counter = 0;
  this.animateText = function () {
    counter++;
    //console.log('animateText _this.creativeObject.geometry.parameters: ' + _this.creativeObject.geometry.parameters);
    // console.log(_this.creativeObject.geometry.parameters.options.height);
    // _this.creativeObject.geometry.parameters.options.height--;
    //  _this.creativeObject.geometry.attributes.position.needsUpdate = true;
    console.log('counter: ' + counter);
    var attributes = _this.creativeObject.geometry.attributes;
    var array = attributes.displacement.array;
    if (counter == 1) {
      for (var i = 0; i < _this.frontPosArray.length; i++) {
        array[_this.frontPosArray[i]] -= 1;
      }

    }
    if (counter > 100) {
      if (counter == 170) {
        clearInterval(_this.textInterval);
        // console.log('_this.frontPosArray: ' + _this.frontPosArray);
      }
      for (var i = 0; i < _this.frontPosArray.length; i++) {
        array[_this.frontPosArray[i]] *= 1.05;
      }
    }
    // console.log('this.animateText');
    attributes.displacement.needsUpdate = true;
  }
}

  CreativeWriting.prototype.start = function () {

    this.textInterval = setInterval(this.animateText, 40);
    if (!this.rotateHorTween) {
      this.rotateRight();
      this.rotateUp();
    } else {
      this.rotateHorTween.resume();
      this.rotateVertTween.resume();
    }
  };

  CreativeWriting.prototype.stop = function () {
    this.rotateHorTween.pause();
    this.rotateVertTween.pause();
  };
  CreativeWriting.prototype.show = function () {
    this.creativeObject.visible = true;
  };
  CreativeWriting.prototype.hide = function () {
    this.creativeObject.visible = false;
  };

  CreativeWriting.prototype.addWriting = function () {
    // console.log('add the writing...');
  };

  module.exports = CreativeWriting;