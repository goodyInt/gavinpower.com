'use strict';

var THREE = require('three');
var tweenMax = require('tweenMax');
var SPRITE3D = require('../libs/sprite3DLib');

/**
 * AnimatedSprite
 *
 * @class AnimatedSprite
 * @constructor
 * @requires THREE, tweenMax, SPRITE3D
 */
function AnimatedSprite() {
  var path;
  var sprites = {
   // none: './img/sprite-none_1024.png'
   //none: './img/sprite-none.png'
   none: './img/sprite-none-shrunk2.png'

   //none: './img/glitchSpriteBW.png'

 //none: './img/sprite-none-red.png'
 //  none: './img/guy.png'
  };
  path = sprites.none;
  var texture = new THREE.TextureLoader().load(path);
  texture.flipY = true;
  var sprite = new SPRITE3D.Sprite(texture, {
    horizontal: 4,
    vertical: 10,
    total: 40,
    duration: 70,
    loop: true
  });
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    depthWrite: false,
    depthTest: true,
    transparent: true
  });
  var geometry = new THREE.PlaneGeometry(30, 15);
  var plane = new THREE.Mesh(geometry, material);

  function update() {
    plane.position.y = cache.y;
    material.opacity = cache.opacity;
  }
  var cache = {
    y: 20,
    opacity: 0
  };
  
  var inTween = tweenMax.to(cache, 1, {
    y: 0,
    opacity: 1,
    paused: true,
    onUpdate: update
  });
  this.el = plane;
  this.in = function () {
    inTween.play();
  };
  this.out = function () {
    inTween.reverse();
  };
  this.start = function () {
    sprite.start();
  };
  this.stop = function () {
    sprite.stop();
  };
}
module.exports = AnimatedSprite;