'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var SPRITE3D = require('../libs/sprite3DLib');
var random = require('../utils/randomUtil');

/**
 * Animated smoke
 *
 * @class Smoke
 * @constructor
 * @param {Object} [options]
 * @param {String} [options.frontColor='#9b69b2'] Front layers color
 * @param {String} [options.backColor='#e1455f'] Back layers color
 * @param {Number} [options.layers=5] Planes number
 * @param {Array} [options.data=[]] Non random values
 * @requires jQuery, THREE, SPRITE3D, random
 */

function Smoke (options) {
  var parameters = jQuery.extend(Smoke.defaultOptions, options);

  //var texture = new THREE.ImageUtils.loadTexture('./img/sprite-smoke.png');
  //var texture = new THREE.ImageUtils.loadTexture('./img/smk.png');
 // var texture = new THREE.ImageUtils.loadTexture('./img/smkBW.png');
 // var texture = new THREE.ImageUtils.loadTexture('./img/smkBW2.png');
  var texture = new THREE.TextureLoader().load('./img/fireConvert.png');

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
    opacity: .2
  });

  var backMaterial = baseMaterial.clone();
  backMaterial.color = new THREE.Color(parameters.backColor);

  var frontMaterial = baseMaterial.clone();
  frontMaterial.color = new THREE.Color(parameters.frontColor);

  var geometry = new THREE.PlaneGeometry(25, 25);

  this.el = new THREE.Object3D();
this.planeArray = [];
  for (var i = 0; i < parameters.layers; i++) {
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

    var material = positionZ < 0 ? backMaterial : frontMaterial;
    console.log("positionZ: " + positionZ);
    var plane = new THREE.Mesh(geometry, material);
    plane.position.set(positionX, positionY, positionZ);
    plane.rotation.z = rotationZ;
    plane.scale.set(scale, scale, 1);
    this.planeArray.push(plane);
    console.log("plane");

    this.el.add(plane);
  }
}

Smoke.prototype.start = function () {
  this.sprite.start();
};

Smoke.prototype.stop = function () {
  this.sprite.stop();
};

Smoke.prototype.updateColors = function (color1,color2) {

  for (var i = 0 ; i < this.planeArray.length; i++){
    console.log("planeArray");
    console.log(this.planeArray[i]);
    console.log(this.planeArray[i].material);
    this.planeArray[i].material.color = new THREE.Color( color1 );
  }

};

Smoke.defaultOptions = {
  frontColor: '#9b69b2',
  backColor: '#e1455f',
  layers: 5,
  data: []
};

module.exports = Smoke;