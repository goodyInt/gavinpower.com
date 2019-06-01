'use strict';
  
var jQuery = require('jquery');
var THREE = require('three');
var random = require('../utils/randomUtil');

/**
 * Background floating lines
 *
 * @class BackgroundLines
 * @constructor
 * @param {Object} [options]
 * @param {Number} [options.count=200] Number of lines
 * @param {Array} [options.rangeY=[-100, 100]] Y range for the random
 * @requires jQuery, THREE, random
 */
var parameters;
function BackgroundLines (options) {
   parameters = jQuery.extend(BackgroundLines.defaultOptions, options);

  var group = new THREE.Object3D();

  var line = this.getLine();

  for (var i = 0; i < parameters.count; i++) {
    var lineCopy = line.clone();

    lineCopy.position.x = random(parameters.rangeX[0], parameters.rangeX[1]);
    lineCopy.position.y = random(parameters.rangeY[0], parameters.rangeY[1]);
    lineCopy.position.z = random(parameters.rangeZ[0], parameters.rangeZ[1]);

    group.add(lineCopy);
  }

  this.el = group;
  this.line = line;
}

BackgroundLines.defaultOptions = {
  count: 200,
  rangeX: [-100, 100],
  rangeY: [-100, 100],
  rangeZ: [-100, 100],
  color1: '#ffffff'
  
};

/**
 * Get base line
 *
 * @method getLine
 * @return {THREE.Line} 
 */
BackgroundLines.prototype.getLine = function () {
  var material = new THREE.LineBasicMaterial({color:parameters.color1, linewidth:1});

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0.2, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));

  var line = new THREE.Line(geometry, material);

  return line;  
};

/**
 * Update lines Y size
 *
 * @method updateY
 * @param {Number} [speed]
 */
BackgroundLines.prototype.updateY = function (speed) {
 
  this.line.geometry.vertices[0].y = speed + 0.2;
  this.line.geometry.verticesNeedUpdate = true;
  this.line.geometry.computeBoundingSphere();
};

/**
 * Update lines Z size
 *
 * @method updateZ
 * @param {Number} [speed]
 */
BackgroundLines.prototype.updateZ = function (speed) {
  
  this.line.geometry.vertices[0].z = speed;
  this.line.geometry.verticesNeedUpdate = true;
  this.line.geometry.computeBoundingSphere();
};

module.exports = BackgroundLines;