'use strict';
var THREE = require('three');
var dilate = require('../utils/dilateUtil');
var outlineMaterial = require('../materials/outlineMaterial');
var waterMaterial = require('../materials/waterMaterial');


function StoryTellingScene() {
  this.creativeObject = {};
  this.el = new THREE.Object3D();
  this.thisRotation = this.el.rotation;
  this.rotateHorTween;
  this.rotateVertTween;
  this.frontPosArray = [];
  this.storySignHolder;
  this.tellingSignHolder;

  var loader = new THREE.FontLoader();
  var _this = this;
  var shaderMaterial;
  var waterShaderMaterial;
  var clock = new THREE.Clock();
  var waterSpeed = 1;

  this.moveTheWater = function () {
    waterShaderMaterial.uniforms.uGlobalTime.value += clock.getDelta() * waterSpeed;
  }
  this.updateShaderHW = function () { 
    waterShaderMaterial.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
  }
  loader.load('fonts/helvetiker_bold.typeface.json', function (font) {
    var signMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      specular: 0xffffff,
      shininess: .1,
      fog: true
    });

    var platformMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      specular: 0x222222,
    });
    var platformMaterialSteps = new THREE.MeshPhongMaterial({
      color: 0x101010,
      specular: 0x000000,
    });
    var platformMaterialBorder = new THREE.MeshPhongMaterial({
      color: 0x333333,
      specular: 0x333333,
    });

    var platformBottom = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 2, 10), platformMaterial);
    platformBottom.position.x= 0;
    platformBottom.position.y = -27;
    platformBottom.position.z = 40;
    platformBottom.castShadow = false;
    platformBottom.receiveShadow = true;
    _this.el.add(platformBottom);

    var platformStep0 = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 2, 10), platformMaterialSteps);
    platformStep0.position.x= 0;
    platformStep0.position.y = -27;
    platformStep0.position.z = -180;
    platformStep0.castShadow = false;
    platformStep0.receiveShadow = true;
    _this.el.add(platformStep0);

    var platformStep1 = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 2, 10), platformMaterialSteps);
    platformStep1.position.x= 0;
    platformStep1.position.y = -27;
    platformStep1.position.z = -210;
    platformStep1.castShadow = false;
    platformStep1.receiveShadow = true;
    _this.el.add(platformStep1);

    var platformStep2 = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 2, 10), platformMaterialSteps);
    platformStep2.position.x= 0;
    platformStep2.position.y = -27;
    platformStep2.position.z = -240;
    platformStep2.castShadow = false;
    platformStep2.receiveShadow = true;
    _this.el.add(platformStep2);

    var platformLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 2, 200), platformMaterial);
    platformLeft.position.x= -58;
    platformLeft.position.y = -27;
    platformLeft.position.z = -55;
    platformLeft.castShadow = false;
    platformLeft.receiveShadow = true;
    _this.el.add(platformLeft);
    
    var borderGeometry = new THREE.PlaneGeometry(200, 2);

    var platformLeftBorder = new THREE.Mesh(borderGeometry, platformMaterialBorder);
    platformLeftBorder.position.x= -8;
    platformLeftBorder.position.y = -27;
    platformLeftBorder.position.z = -55;
    platformLeftBorder.castShadow = false;
    platformLeftBorder.receiveShadow = true;
    platformLeftBorder.rotateY(90 * (Math.PI / 180));
    _this.el.add(platformLeftBorder);

    var platformRight = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 2, 200), platformMaterial);
    platformRight.position.x= 58;
    platformRight.position.y = -27;
    platformRight.position.z = -55;
    platformRight.castShadow = false;
    platformRight.receiveShadow = true;
    _this.el.add(platformRight);

    var platformRightBorder = new THREE.Mesh(borderGeometry, platformMaterialBorder);
    platformRightBorder.position.x= 8;
    platformRightBorder.position.y = -27;
    platformRightBorder.position.z = -55;
    platformRightBorder.castShadow = false;
    platformRightBorder.receiveShadow = true;
    platformRightBorder.rotateY(-90 * (Math.PI / 180));
    _this.el.add(platformRightBorder);
    
    waterShaderMaterial = new THREE.ShaderMaterial({
      uniforms: waterMaterial.uniforms,
      vertexShader: waterMaterial.vertexShader,
      fragmentShader: waterMaterial.fragmentShader,
      fog: true
    });

    var theRiver = new THREE.Mesh(new THREE.BoxBufferGeometry(16, .1, 194), waterShaderMaterial);
    theRiver.position.y = -29;
    theRiver.position.z = -60;
    theRiver.castShadow = false;
    theRiver.receiveShadow = false;
    _this.el.add(theRiver);

    _this.storySignHolder = new THREE.Object3D();
    var copySize = 20;
    var copyWidth = 5;
    var copyBevelThickness = .025;
    var copyCurveSegments = 12;
    var copyBevelSize = .0625;

    var storySignGeo = new THREE.TextGeometry("STORY", {
      font: font,
      size: copySize,
      height: copyWidth,
      curveSegments: copyCurveSegments,
      bevelThickness: copyBevelThickness,
      bevelSize: copyBevelSize,
      bevelEnabled: true
    });

    storySignGeo.computeBoundingBox();
    storySignGeo.center();

    var storySign = new THREE.Mesh(storySignGeo, signMaterial);
    storySign.castShadow = true;
    storySign.receiveShadow = true;

    var outlineGeometry = storySignGeo.clone();
    dilate(outlineGeometry, 1.5);
    var localOutlineMaterial = outlineMaterial.clone();

    shaderMaterial = new THREE.ShaderMaterial({
      uniforms: localOutlineMaterial.uniforms,
      vertexShader: localOutlineMaterial.vertexShader,
      fragmentShader: localOutlineMaterial.fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: false,
      fog: true
    });

    var outlineMesh = new THREE.Mesh(outlineGeometry, shaderMaterial);
    outlineGeometry.computeBoundingBox();
    outlineMesh.castShadow = false;
    outlineMesh.receiveShadow = false;
    _this.storySignHolder.add(outlineMesh);
    _this.storySignHolder.add(storySign);

    _this.el.add(_this.storySignHolder);

    _this.tellingSignHolder = new THREE.Object3D();
    var tellingSignGeo = new THREE.TextGeometry("TELLING", {
      font: font,
      size: copySize,
      height: copyWidth,
      curveSegments: copyCurveSegments,
      bevelThickness: copyBevelThickness,
      bevelSize: copyBevelSize,
      bevelEnabled: true
    });
    tellingSignGeo.computeBoundingBox();
    tellingSignGeo.center();

    var tellingSign = new THREE.Mesh(tellingSignGeo, signMaterial);
    tellingSign.castShadow = false;
    tellingSign.receiveShadow = false;

    var outlineGeometryTelling = tellingSignGeo.clone();
    dilate(outlineGeometryTelling, 1.5);
    var outlineMeshTelling = new THREE.Mesh(outlineGeometryTelling, shaderMaterial);
    outlineGeometryTelling.computeBoundingBox();

    _this.tellingSignHolder.add(tellingSign);
    _this.tellingSignHolder.add(outlineMeshTelling);
    _this.el.add(_this.tellingSignHolder);
    ////

    _this.storySignHolder.position.x = -50;
    _this.storySignHolder.position.y = -5;
    _this.storySignHolder.position.z = -75;
    _this.storySignHolder.rotateY(65 * (Math.PI / 180));
    _this.storySignHolder.rotateX(25 * (Math.PI / 180));
    _this.storySignHolder.rotateZ(2 * (Math.PI / 180));
    //
    _this.tellingSignHolder.position.x = 50;
    _this.tellingSignHolder.position.y = -6;
    _this.tellingSignHolder.position.z = -75;
    _this.tellingSignHolder.rotateY(-65 * (Math.PI / 180));
    _this.tellingSignHolder.rotateX(25 * (Math.PI / 180));
    _this.tellingSignHolder.rotateZ(-2 * (Math.PI / 180));
  });

  StoryTellingScene.prototype.start = function () {
    console.log('StoryTellingScene.prototype.start');
    this.moveTheWaterInterval = setInterval(this.moveTheWater, 40);
    // this.el.visible = true;
  };

  StoryTellingScene.prototype.onOut = function () {
    console.log('StoryTellingScene.prototype.onOut');
    clearInterval(this.moveTheWaterInterval);
  };

  StoryTellingScene.prototype.stop = function () {
    console.log('StoryTellingScene.prototype.stop');
    //  this.el.visible = false;
  };

  StoryTellingScene.prototype.hide = function () {
    console.log('StoryTellingScene.prototype.hide');
  };
}

module.exports = StoryTellingScene;