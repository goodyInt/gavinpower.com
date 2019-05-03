'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var SPRITE3D = require('../libs/sprite3DLib');
var random = require('../utils/randomUtil');

/**
 * Animated Fire
 *
 * @class Fire
 * @constructor
 * @param {Object} [options]
 * @param {String} [options.frontColor='#9b69b2'] Front layers color
 * @param {String} [options.backColor='#e1455f'] Back layers color
 * @param {Number} [options.layers=5] Planes number
 * @param {Array} [options.data=[]] Non random values
 * @requires jQuery, THREE, SPRITE3D, random
 */

function Fire(options) {
  var parameters = jQuery.extend(Fire.defaultOptions, options);

  var texture = new THREE.TextureLoader().load('./img/fireConvertInnerLRG.png');
  texture.flipY = false;

  this.sprite = new SPRITE3D.Sprite(texture, {
    horizontal: 8,
    vertical: 8,
    total: 64,
    duration: 50
  });

  var baseMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    depthWrite: false,
    depthTest: true,
    transparent: true,
    opacity: .5
  });

  var material1 = baseMaterial.clone();
  material1.color = new THREE.Color(parameters.color1);
  var material2 = baseMaterial.clone();
  material2.color = new THREE.Color(parameters.color2);
  var material3 = baseMaterial.clone();
  material3.color = new THREE.Color(parameters.color3);
  var material4 = baseMaterial.clone();
  material4.color = new THREE.Color(parameters.color4);
  var matArray = [material1, material2, material3, material4];
  var geometry = new THREE.PlaneGeometry(25, 25);

  this.el = new THREE.Object3D();
  this.planeArray = [];
  for (var i = 0; i < parameters.layers; i++) {
    console.log('fire: ' + i);
    var positionX;
    var positionY;
    var positionZ;
    var rotationZ;
    var scale;
    if (parameters.data[i]) {
      positionX = parameters.data[i].positionX || random(-20, 20);
      positionY = parameters.data[i].positionY || random(-20, 20);
      positionZ = parameters.data[i].positionZ || random(-20, 20);
      rotationZ = parameters.data[i].rotationZ || random(0, Math.PI);
      scale = parameters.data[i].scale || random(1, 10);
    } else {
      positionX = random(-20, 20);
      positionY = random(-20, 20);
      positionZ = random(-20, 20);
      rotationZ = random(0, Math.PI);
      scale = random(1, 10);
    }

    var plane = new THREE.Mesh(geometry, matArray[i]);
    plane.position.set(positionX, positionY, positionZ);
    plane.rotation.z = rotationZ;
    plane.scale.set(scale, scale, 1);
    this.planeArray.push(plane);
    this.el.add(plane);
  }
}

Fire.prototype.start = function () {

  this.sprite.start(10);
};

Fire.prototype.stop = function () {

  this.sprite.stop();
};

Fire.prototype.updateColors = function (color1, color2) {

  for (var i = 0; i < this.planeArray.length; i++) {

    this.planeArray[i].material.color = new THREE.Color(color1);
  }

};

Fire.defaultOptions = {
  frontColor: '#9b69b2',
  backColor: '#e1455f',
  layers: 5,
  data: []
};

module.exports = Fire;