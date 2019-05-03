'use strict';
var THREE = require('three');

function Campfire() {
  this.creativeObject = {};
  console.log('Campfire 001');
  this.el = new THREE.Object3D();
  this.thisRotation = this.el.rotation;
  this.rotateHorTween;
  this.rotateVertTween;
  this.frontPosArray = [];

  var loader = new THREE.FontLoader();
  var _this = this;

  loader.load('fonts/helvetiker_bold.typeface.json', function (font) {

    var platformMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      specular: 0x222222
    });

    var platform = new THREE.Mesh(new THREE.BoxBufferGeometry(200, 2, 100), platformMaterial);
    platform.position.y = -27;
    platform.position.z = 0;
    platform.castShadow = false;
    platform.receiveShadow = true;
    _this.el.add(platform);

    var firePlaceMat = new THREE.MeshLambertMaterial({
      color: '#111111'
    });

    var firePlacePath = new THREE.Mesh(new THREE.BoxBufferGeometry(16, 1, 40), firePlaceMat);
    firePlacePath.position.y = -26;
    firePlacePath.position.z = 30;
    firePlacePath.castShadow = false;
    firePlacePath.receiveShadow = false;
     _this.el.add(firePlacePath);

    var designSignGeo = new THREE.TextBufferGeometry("DESIGN", {
      font: font,
      size: 16,
      height: 4,
      curveSegments: 12,
      bevelThickness: .25,
      bevelSize: .625,
      bevelEnabled: true
    });
    designSignGeo.computeBoundingBox();

    var centerOffset = -0.5 * (designSignGeo.boundingBox.max.x - designSignGeo.boundingBox.min.x);
    var designSignMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      specular: 0xffffff,
      
    });

    var designSign = new THREE.Mesh(designSignGeo, designSignMaterial);
    designSign.castShadow = true;
    designSign.receiveShadow = true;
    _this.el.add(designSign);

    designSign.position.x = centerOffset;
    designSign.position.y = -25;
    designSign.position.z = -25;

    _this.el.visible = false;

  });

  function Log() {

    var logMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      shininess: 10
    });

    var logEndMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      shininess: 0
    });

    var geometry = new THREE.BoxGeometry(2.5, 2.5, 10);

    THREE.Mesh.call(this, geometry, logMaterial);

    var endGeometry = new THREE.BoxGeometry(2.5, 2.5, 0.25);
    var end = new THREE.Mesh(endGeometry, logEndMaterial);
    end.position.z = 5;
    this.add(end);

    var otherEnd = new THREE.Mesh(endGeometry, logEndMaterial);
    otherEnd.position.z = -5;
    this.add(otherEnd);

    this.castShadow = true;
    this.receiveShadow = true;
  }

  Log.prototype = Object.assign(THREE.Mesh.prototype, {
    constructor: Log
  });

  for (var i = 0; i < 3; i++) {
    var log = new Log();

    log.position.x = 5 * Math.sin((i / 3) * (Math.PI * 2));
    log.position.y = -24;
    log.position.z = 15;

    log.rotation.z = (Math.PI / 2) / 2;
    log.rotation.y = (Math.PI / 2) / 2;
    _this.el.add(log);
  };
}

Campfire.prototype.start = function () {
  console.log('Campfire.prototype.start');
  this.el.visible = true;

};
Campfire.prototype.onOut = function () {
  console.log('Campfire.prototype.onOut');
};

Campfire.prototype.stop = function () {
  console.log('Campfire.prototype.stop');
  this.el.visible = false;

};


Campfire.prototype.hide = function () {
  console.log('Campfire.prototype.hide');
};

module.exports = Campfire;