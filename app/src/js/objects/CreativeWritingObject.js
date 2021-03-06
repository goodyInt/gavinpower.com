'use strict';
var THREE = require('three');
var tweenMax = require('tweenMax');
var linesMaterial = require('../materials/customLinesMaterial');
var Events = require('../classes/EventsClass');

function CreativeWriting() {
  this.creativeObject = {};

  this.el = new THREE.Object3D();
  this.thisRotation = this.el.rotation;
  this.rotateHorTween;
  this.rotateVertTween;
  this.frontPosArray = [];
  this.events = new Events();

  var loader = new THREE.FontLoader();
  var _this = this;
  
  this.on = function () {
   
    _this.events.on.apply(_this.events, arguments);
  }
  loader.load('fonts/[z] Arista_Regular.json', function (font) {
    init(font);
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
      height: 1,
      curveSegments: 5,
      bevelThickness: .1,
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

    var gArray = geometry.attributes.position;

    for (var i = 0; i < gArray.array.length; i += 3) {
      if (gArray.array[i + 2] >= 0) {
        _this.frontPosArray.push(i + 2);
      }
    }
  }

  this.rotateLeft = function () {
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 10, {
      ease: Power2.easeInOut,
      y: .35,
      onComplete: _this.rotateRight
    });
  }

  this.rotateRight = function () {
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 10, {
      ease: Power2.easeInOut,
      y: -.35,
      onComplete: _this.rotateLeft
    });
  }

  this.rotateRightStart = function () {
    _this.rotateHorTween = tweenMax.to(_this.thisRotation, 5, {
      ease: Power2.easeInOut,
      y: -.35,
      onComplete: _this.rotateLeft
    });
  }

  this.rotateUp = function () {
    _this.rotateVertTween = tweenMax.to(_this.thisRotation, 12, {
      ease: Power2.easeInOut,
      x: -.25,
      onComplete: _this.rotateDown
    });
  }

  this.rotateUpStart = function () {
    _this.rotateVertTween = tweenMax.to(_this.thisRotation, 5, {
      ease: Power2.easeInOut,
      x: -.25,
      onComplete: _this.rotateDown
    });
  }

  this.rotateDown = function () {
    _this.rotateVertTween = tweenMax.to(_this.thisRotation, 12, {
      ease: Power2.easeInOut,
      x: .25,
      onComplete: _this.rotateUp
    });
  }

  var startZ = 0;
  var finishZ = 35;
  var offsetZ = 0;
  this.animateTextIn = function () {
    var attributes = _this.creativeObject.geometry.attributes;
    var array = attributes.displacement.array;
    offsetZ = finishZ + ((startZ - finishZ) * this.target.factor);
    for (var i = 0; i < _this.frontPosArray.length; i++) {
      array[_this.frontPosArray[i]] = offsetZ;
    }
    attributes.displacement.needsUpdate = true;
  }
  this.animateTextOut = function () {
    var attributes = _this.creativeObject.geometry.attributes;
    var array = attributes.displacement.array;
    offsetZ = startZ + ((finishZ - startZ) * this.target.factor);
    for (var i = 0; i < _this.frontPosArray.length; i++) {
      array[_this.frontPosArray[i]] = offsetZ;
    }
    attributes.displacement.needsUpdate = true;
  }
  this.unloadIsComplete = function () {
    _this.events.trigger('sectionUnloaded', {
      message: 'Creative Writing is UnLoaded'
    });
  }
}

CreativeWriting.prototype.start = function () {
  tweenMax.to({
    factor: 1
  }, 1.5, {
    delay: 1,
    factor: 0,
    ease: Power1.easeIn,
    onUpdate: this.animateTextIn
  });
  this.el.rotation.y = this.el.rotation.x = 0 * (Math.PI / 180);
  this.rotateRightStart();
  this.rotateUpStart();
  this.events.trigger('sectionFullyLoaded', {
    message: 'Creative Writing is Loaded'
  });
};
CreativeWriting.prototype.onOut = function () {

  tweenMax.to({
    factor: 1
  }, 1, {
    delay: 0,
    factor: 0,
    ease: Power1.easeOut,
    onUpdate: this.animateTextOut,
    onComplete: this.unloadIsComplete
  });
  this.rotateHorTween.pause();
  this.rotateVertTween.pause();
};

CreativeWriting.prototype.stop = function () {
};
CreativeWriting.prototype.show = function () {
  this.creativeObject.visible = true;
};
CreativeWriting.prototype.hide = function () {
  this.creativeObject.visible = false;
};

module.exports = CreativeWriting;