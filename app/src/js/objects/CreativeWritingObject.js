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
    console.log('shaderMaterial.fog:' + shaderMaterial.fog);

    var geometry = new THREE.TextBufferGeometry('creative', {
      font: font,
      size: 20,
      height: 5,
      curveSegments: 5,
      bevelThickness: 1,
      bevelSize: .35,
      bevelEnabled: true,
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

  }

  var rotateLeft = function () {
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 20, {
      ease: Power2.easeInOut,
      y: .25,
      onComplete: rotateRight
    });
  }
  var rotateRight = function () {
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