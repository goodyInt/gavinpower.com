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

  width = maxWidth;

  var lineHeight = parameters.size + parameters.lineSpacing;
  var height = lineHeight * wordsCount;

  canvas.width = width + 20;
  canvas.height = height + 20;

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
    console.log('k: ' + k);
    context.fillText(word, left, lineHeight * k);
  }

  var texture = new THREE.Texture(canvas);
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
  mesh.position.y = -20;
  group.add(mesh);
  group.visible = false;

  this.el = group;

  var cache = {
    y: mesh.position.y,
    opacity: mesh.material.opacity
  };

  function update() {
    mesh.position.y = cache.y;
    mesh.material.opacity = cache.opacity;
  }

  this.in = function () {
    tweenMax.to(cache, 1.5, {
      y: 0,
      opacity: 1,
      onStart: function () {
        group.visible = true;
      },
      ease: Power1.easeOut,
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

  this.over = function () {
    console.log('TextPanel.over white');
    context.fillStyle = '#ffffff';
    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.fillText(word, left, 0);
    texture.needsUpdate = true;
  }
  this.overOut = function () {
    console.log('TextPanel.overOut');
    context.fillStyle = '#bbbbbb';
    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
    context.fillText(word, left, 0);
    texture.needsUpdate = true;
  }
}

TextPanel.defaultOptions = {
  size: 100,
  font: 'Futura, Trebuchet MS, Arial, sans-serif',
  style: 'Bold',
  align: 'center',
  lineSpacing: 20,
  color: '#bbbbbb'
};

module.exports = TextPanel;