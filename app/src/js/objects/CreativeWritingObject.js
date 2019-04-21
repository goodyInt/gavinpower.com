'use strict';
var THREE = require('three');
var tweenMax = require('tweenMax');

var linesMaterial = require('../materials/customLinesMaterial');

function CreativeWriting() {
  this.object = {};
  
  console.log('CreativeWriting');
  console.log('linesMaterial: ' + linesMaterial);
  this.el = new THREE.Object3D();
  this.thisRotation = this.el.rotation;
  this.rotateHorTween;
  this.rotateVertTween;
  console.log(this.thisRotation);
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
      transparent: true
    });

    var geometry = new THREE.TextBufferGeometry('creative', {
      font: font,
      size: 25,
      height: 5,
      curveSegments: 5,
      bevelThickness: 1,
      bevelSize: .35,
      bevelEnabled: true,
      bevelSegments: 9
    });

    //geometry.center();
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
    _this.object = new THREE.Line(geometry, shaderMaterial);
    _this.el.add(_this.object);
    _this.object.visible = false;
    console.log('_this.el.position.z:' + _this.el.position.z);
  }
  console.log(this.el);

  var rotateLeft = function () {
    ////console.log('rotateLeft');
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 20, {
      ease: Power2.easeInOut,
      y: .25,
      onComplete: rotateRight
    });
  }
  var rotateRight = function () {
    //console.log('rotateRight');
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 20, {
      ease: Power2.easeInOut,
      y: -.25,
      onComplete: rotateLeft
    });
  }

  var rotateUp = function () {
    _this.rotateVertTween = tweenMax.to(_this.thisRotation, 15, {
      ease: Power2.easeInOut,
      x: .25,
      onComplete: rotateDown
    });
  }
  var rotateDown = function () {
    _this.rotateVertTween = tweenMax.to(_this.thisRotation, 15, {
      ease: Power2.easeInOut,
      x: -.15,
      onComplete: rotateUp
    });
  }

CreativeWriting.prototype.start = function () {
  console.log(this);
  console.log(this.rotateHorTween);
  if (!this.rotateHorTween) {
    rotateRight();
    rotateUp();
  } else {

    this.rotateHorTween.resume();
    this.rotateVertTween.resume();
  }
};

}

 

CreativeWriting.prototype.stop = function () {
  console.log(this);
  this.rotateHorTween.pause();
  this.rotateVertTween.pause();
};
CreativeWriting.prototype.show = function () {
  console.log('object');
  console.log(this);

  console.log(this.object)
  // console.log(object);

  this.object.visible = true;
};
CreativeWriting.prototype.hide = function () {
  this.object.visible = false;
};

CreativeWriting.prototype.addWriting = function () {
  console.log('add the writing...');
};

module.exports = CreativeWriting;