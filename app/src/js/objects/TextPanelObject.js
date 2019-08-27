'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var tweenMax = require('tweenMax');

function TextPanel(text, options) {
  var parameters = jQuery.extend(TextPanel.defaultOptions, options);

  text = text || '';
  var words = text.split('\n');
  var wordsCount = words.length;
  for (var i = 0; i < wordsCount; i++) {
    words[i] = words[i].replace(/^\s+|\s+$/g, '');
  }

  var canvas = document.createElement('canvas');

  var context = canvas.getContext('2d');

  var canvas2 = document.createElement('canvas');

  var context2 = canvas2.getContext('2d');

  var font = parameters.style + ' ' + parameters.size + 'px' + ' ' + parameters.font;

  context.font = font;

  var width;

  var maxWidth = 0;
  for (var j = 0; j < wordsCount; j++) {
    var tempWidth = context.measureText(words[j]).width;
    if (tempWidth > maxWidth) {
      maxWidth = tempWidth;
    }
  }
  width = floorPowerOfTwo(maxWidth);
  width = maxWidth;
  var lineHeight = parameters.size + parameters.lineSpacing;
  var height = lineHeight * wordsCount +25;
  canvas.width = width;
  canvas.height = height;
  canvas2.width = floorPowerOfTwo(width);;
  canvas2.height = floorPowerOfTwo(height);;
  context.font = font;
  context.fillStyle = parameters.color;
  context.textAlign = parameters.align;
  context.textBaseline = 'top';

  for (var k = 0; k < wordsCount; k++) {
    var word = words[k];
    var left;
    if (parameters.align === 'left') {
      left = 0;
    } else if (parameters.align === 'center') {
      left = canvas.width / 2;
    } else {
      left = canvas.width;
    }
   // context.fillStyle = '#99f500'
   // context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = parameters.color;
    context.fillText(word, left, lineHeight * k+20);
  }
  var textureOrig = new THREE.Texture(canvas);
  textureOrig.needsUpdate = true;

  var texture = new THREE.Texture(canvas2);
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  context2.drawImage(textureOrig.image, 0, 0, canvas2.width, canvas2.height);
  texture.needsUpdate = true;

  var material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    opacity: 0
  });

  var geometry = new THREE.PlaneGeometry(canvas.width / 20, canvas.height / 20);
  var group = new THREE.Object3D();
  var mesh = new THREE.Mesh(geometry, material);
  mesh.material.fog = false;
  mesh.position.y = -20;
  group.add(mesh);
  group.visible = false;

  this.el = group;

  var cache = {
    y: mesh.position.y,
    opacity: mesh.material.opacity
  };

  function floorPowerOfTwo(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
  }

  function update() {
    mesh.position.y = cache.y;
    mesh.material.opacity = cache.opacity;
  }

  this.updateCopy = function (text) {
    text = text || '';
    var words = text.split('\n');
    var wordsCount = words.length;
    for (var i = 0; i < wordsCount; i++) {
      words[i] = words[i].replace(/^\s+|\s+$/g, '');
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var k = 0; k < wordsCount; k++) {
      var word = words[k];
      var left;
      if (parameters.align === 'left') {
        left = 0;
      } else if (parameters.align === 'center') {
        left = canvas.width / 2;
      } else {
        left = canvas.width;
      }
      context.fillText(word, left, lineHeight * k+20);
    }
    textureOrig.needsUpdate = true

    context2.clearRect(0, 0, canvas2.width, canvas2.height);

    context2.drawImage(textureOrig.image, 0, 0, canvas2.width, canvas2.height);

    texture.needsUpdate = true;
  }

  this.resetValues = function () {
    mesh.position.y = 0;
    mesh.material.opacity = 0;
    cache.y =  mesh.position.y;
    cache.opacity = mesh.material.opacity;

  };

  this.in = function () {
    tweenMax.to(cache, 2.35, {
      y: 0,
      opacity: 1,
      onStart: function () {
        group.visible = true;
      },
      ease: Power1.easeOut,
      onUpdate: update
    });
  };

  this.fadeIn = function (speed) {
    tweenMax.to(cache, speed, {
      opacity: 1,
      onStart: function () {
        group.visible = true;
      },
      ease: Power1.easeInOut,
      onUpdate: update
    });
  };

  this.out = function (way) {
    var y = way === 'up' ? -20 : 20;
    tweenMax.to(cache, 1, {
      y: y,
      opacity: 0,
      onUpdate: update,
      onComplete: function () {
        group.visible = false;
      }
    });
  };

  this.fadeOut = function (theDelay) {
   tweenMax.to(cache, 1, {
      delay: theDelay,
      opacity: 0,
      onUpdate: update,
      ease: Power1.easeIn
    });
  };

  this.over = function () {
    context.fillStyle = '#ffffff';
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(word, left, 20);
    textureOrig.needsUpdate = true
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.drawImage(textureOrig.image, 0, 0, canvas2.width, canvas2.height);
    texture.needsUpdate = true;
  }
  this.overOut = function () {
    context.fillStyle = '#999999';
   // context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(word, left, 20);
    textureOrig.needsUpdate = true
   // context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.drawImage(textureOrig.image, 0, 0, canvas2.width, canvas2.height);
    texture.needsUpdate = true;
  }
  this.down = function (fillColour) {
    context.fillStyle = fillColour;
   // context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(word, left, 20);
    textureOrig.needsUpdate = true
  //  context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.drawImage(textureOrig.image, 0, 0, canvas2.width, canvas2.height);
    texture.needsUpdate = true;
  }
}


TextPanel.defaultOptions = {
  size: 100,
  font: 'Futura, Trebuchet MS, Arial, sans-serif',
  style: 'Bold',
  align: 'center',
  lineSpacing: 20,
  color: '#999999'
};

module.exports = TextPanel;