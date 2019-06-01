'use strict';
var jQuery = require('jquery');
var THREE = require('three');
var random = require('../utils/randomUtil');

/**
 * Background floating particles/strips
 *
 * @class BackgroundParticles
 * @constructor
 * @param {Object} [options]
 * @param {Object} [strips=true] Strips?
 * @param {Number} [options.count=1000] Number of particles
 * @param {Number} [options.particleSize=0.5] Size of a particle
 * @param {Array} [options.rangeY=[-100, 100]] Y range for positions
 * @requires jQuery, THREE, random
 */

function BackgroundParticles(options) {
  var parameters = jQuery.extend(BackgroundParticles.defaultOptions, options);

  var material = new THREE.PointsMaterial({
    color: parameters.color1,
    size: parameters.particleSize

  });
  this.starsGeometry = new THREE.Geometry();
  for (var i = 0; i < parameters.count; i++) {
    var particle = new THREE.Vector3(
      random(parameters.rangeX[0], parameters.rangeX[1]),
      random(parameters.rangeY[0], parameters.rangeY[1]),
      random(parameters.rangeZ[0], parameters.rangeZ[1])
    );
    
    this.starsGeometry.vertices.push(particle);
  }
  var group = new THREE.Object3D();
  this.thePoints = new THREE.Points(this.starsGeometry, material);
  group.add(this.thePoints);

  if (parameters.strips) {
    var stripsGeometry = new THREE.Geometry();
    var stripGeometry = new THREE.PlaneGeometry(5, 2);
    var stripMaterial = new THREE.MeshLambertMaterial({
      color: parameters.color2
    });

   
    for (var i = 0; i < parameters.stripsCount; i++) {
      var stripMesh = new THREE.Mesh(stripGeometry, stripMaterial);
      stripMesh.position.set(

        
        random(parameters.stripsRangeX[0], parameters.stripsRangeX[1]),
        random(parameters.stripsRangeY[0], parameters.stripsRangeY[1]),
        random(parameters.stripsRangeZ[0], parameters.stripsRangeZ[1])
       
      );
      stripMesh.scale.set(
        random(0.5, 1),
        random(0.1, 1),
        1
      );
      stripMesh.updateMatrix();
      stripsGeometry.merge(stripMesh.geometry, stripMesh.matrix);
    }
    this.theStrips = new THREE.Mesh(stripsGeometry, stripMaterial);
    group.add(this.theStrips);
  }
  this.el = group;
}
BackgroundParticles.defaultOptions = {
  count: 1000,
  particleSize: .35,
  rangeX: [-100, 100],
  rangeY: [-100, 100],
  rangeZ: [-100, 100],
  stripsRangeX: [-50, 50],
  stripsRangeY: [-80, 80],
  stripsRangeZ: [-50, 0],
  strips: true,
  stripsCount: 15,
  color1: '#ffffff',
  color2: '#ffffff'

};

BackgroundParticles.prototype.updateColor = function (color1, color2) {
  this.thePoints.material.color = new THREE.Color(color1); //{r:.25, g:.25 , b: 1};
  this.theStrips.material.color = new THREE.Color(color2);
};
module.exports = BackgroundParticles;