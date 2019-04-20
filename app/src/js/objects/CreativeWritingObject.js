'use strict';

var THREE = require('three');

var outlineMaterial = require('../materials/customLinesMaterial');

function CreativeWriting () {
  console.log('CreativeWriting');
  this.el = new THREE.Object3D();
  this.groups = {};
  this.baseMaterial = new THREE.MeshLambertMaterial({ color: '#33ff33' });

}

CreativeWriting.prototype.addWriting = function () {
  console.log('add the writing...');
};

CreativeWriting.prototype.addGroup = function (data) {
  if (!this.groups[data.name]) {
    this.groups[data.name] = new THREE.Object3D();
  }

  if (!data.outline) {
    data.outline = {};
  }

  var groupName = data.name;

  for (var objName in data.objs) {
    if (data.objs.hasOwnProperty(objName)) {
      var url = data.objs[objName];

      if (!data.outline[objName]) {
        data.outline[objName] = {};
      }

      var isSolid = data.outline[objName].solid ? true : false;
      var offset = data.outline[objName].offset
        ? data.outline[objName].offset
        : 0.15;

      this.loadObj(groupName, url, offset, isSolid);
    }
  }
};

CreativeWriting.prototype.loadObj = function (groupName, url, offset, isSolid) {
  var _this = this;

  this.loader.load(url, function (geometry) {
    _this.processObj({
      geometry: geometry,
      group: groupName,
      offset: offset,
      solid: isSolid
    });
  });
};

CreativeWriting.prototype.processObj = function (data) {
  var groupName = data.group;
  var geometry = data.geometry;

  var mesh = new THREE.Mesh(geometry, this.baseMaterial);

  this.groups[groupName].add(mesh);

  var outlineGeometry = geometry.clone();
  
  var localOutlineMaterial = outlineMaterial.clone();
  localOutlineMaterial.uniforms = THREE.UniformsUtils.clone(outlineMaterial.uniforms);
  localOutlineMaterial.attributes = THREE.UniformsUtils.clone(outlineMaterial.attributes);

  var outlineMesh = new THREE.Mesh(outlineGeometry, localOutlineMaterial);
  outlineGeometry.computeBoundingBox();

  var height = outlineGeometry.boundingBox.max.y - outlineGeometry.boundingBox.min.y;

  for (var i = 0, j = outlineGeometry.vertices.length; i < j; i++) {
    var color;

    if (data.solid) {
      color = new THREE.Vector4(.7, 0.7, 1.0, 1.0);
    } else {
      var vertex = outlineGeometry.vertices[i];
      var percent = Math.floor(vertex.y * 100 / height) -1;
      color = new THREE.Vector4(1.0, 0.1, 0.1, percent / 100);
    }

    localOutlineMaterial.attributes.customColor.value[i] = color;
  }

  this.groups[groupName].add(outlineMesh);
};

CreativeWriting.prototype.showGroup = function (name) {
  this.el.add(this.groups[name]);
};

module.exports = CreativeWriting;