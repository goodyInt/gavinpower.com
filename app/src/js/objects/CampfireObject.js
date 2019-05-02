'use strict';
var THREE = require('three');
var tweenMax = require('tweenMax');
var linesMaterial = require('../materials/customLinesMaterial');

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
      color: '#111111'
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

    var firePlacePath = new THREE.Mesh(new THREE.BoxBufferGeometry(12, 1, 40), firePlaceMat);
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
      specular: 0xffffff
    });
    var designSign = new THREE.Mesh(designSignGeo, designSignMaterial);
    designSign.castShadow = true;
    designSign.receiveShadow = true;
    _this.el.add(designSign);

    designSign.position.x = centerOffset;
    designSign.position.y = -25;
    designSign.position.z = -25;

  });
  
  const TWOPI = Math.PI * 2;
  const HALFPI = Math.PI / 2;
  function Log(){

    let logMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x111111, 
      shininess: 10
    });
   

  let logEndMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x000000, 
    shininess: 0
  });

  
    let geometry = new THREE.BoxGeometry(2.5,2.5,10);
  
    THREE.Mesh.call(this,geometry, logMaterial);


    let endGeometry = new THREE.BoxGeometry(2.5,2.5,0.25);
    let end = new THREE.Mesh(endGeometry, logEndMaterial);
    end.position.z = 5;
    this.add(end);
    
    let otherEnd = new THREE.Mesh(endGeometry, logEndMaterial);
    otherEnd.position.z = -5;
    this.add(otherEnd);
    
    this.castShadow = true;
    this.receiveShadow = true;
  }
  
  Log.prototype = Object.assign(THREE.Mesh.prototype, {
    constructor: Log
  });
  
 

  for(var i = 0 ; i < 3; i++){ 
    var log = new Log();
   
    log.position.x = 5 * Math.sin((i / 3) * TWOPI) ;
    log.position.y = -24;
    log.position.z = 15;
    
    log.rotation.z = HALFPI / 2;
    log.rotation.y = HALFPI / 2;
    _this.el.add(log);
  };
  
}

Campfire.prototype.start = function () {
  console.log('Campfire.prototype.start');

};
Campfire.prototype.onOut = function () {
  console.log('Campfire.prototype.onOut');
};

Campfire.prototype.stop = function () {
  console.log('Campfire.prototype.stop');

};
Campfire.prototype.show = function () {
  console.log('Campfire.prototype.show');
}

Campfire.prototype.hide = function () {
  console.log('Campfire.prototype.hide');
};

module.exports = Campfire;