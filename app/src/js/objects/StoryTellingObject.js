'use strict';
var THREE = require('three');
var dilate = require('../utils/dilateUtil');
var outlineMaterial = require('../materials/outlineMaterial');

function StoryTellingScene() {
  this.creativeObject = {};
  console.log('StoryTellingScene 001');
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
  // loader.load('fonts/Brittany Signature_Regular.json', function (font) {
  // loader.load('fonts/Brush Script MT_Italic.json', function (font) {
  // loader.load('fonts/Millennial Solstice_Regular.json', function (font) {
  // loader.load('fonts/optimer_bold.typeface.json', function (font) {
  // loader.load('fonts/[z] Arista_Regular.json', function (font) {
  //  loader.load('fonts/Silhouette_Regular.json', function (font) {
  loader.load('fonts/helvetiker_bold.typeface.json', function (font) {

    //MeshDepthMaterial
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

    // var platformMaterial = new THREE.MeshLambertMaterial({
    // color: '#111111'
    //});


    var platform = new THREE.Mesh(new THREE.BoxBufferGeometry(200, 2, 200), platformMaterial);
    platform.position.y = -27;
    platform.position.z = -55;
    platform.castShadow = false;
    platform.receiveShadow = true;
    _this.el.add(platform);
    ///*
    var firePlaceMat = new THREE.MeshLambertMaterial({
      color: '#111111',
      specular: 0x111111,
    });
    //*/
    //  var firePlaceMat = new THREE.MeshStandardMaterial({
    //  color: '#111111'
    //});


    var firePlacePath = new THREE.Mesh(new THREE.BoxBufferGeometry(16, 1, 200), firePlaceMat);
    firePlacePath.position.y = -26;
    firePlacePath.position.z = -55;
    firePlacePath.castShadow = false;
    firePlacePath.receiveShadow = false;
    _this.el.add(firePlacePath);

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

    //var centerOffset = -0.5 * (storySignGeo.boundingBox.max.x - storySignGeo.boundingBox.min.x);
    _this.storySignHolder.position.x = -50;
    _this.storySignHolder.position.y = -6;
    _this.storySignHolder.position.z = -75;
    _this.storySignHolder.rotateY(65 * (Math.PI / 180));
    _this.storySignHolder.rotateX(25 * (Math.PI / 180));
    _this.storySignHolder.rotateZ(5 * (Math.PI / 180));

    //
    // centerOffset = -0.5 * (tellingSignGeo.boundingBox.max.x - tellingSignGeo.boundingBox.min.x);
    _this.tellingSignHolder.position.x = 50;
    _this.tellingSignHolder.position.y = -6;
    _this.tellingSignHolder.position.z = -75;
    _this.tellingSignHolder.rotateY(-65 * (Math.PI / 180));
    _this.tellingSignHolder.rotateX(25 * (Math.PI / 180));
    _this.tellingSignHolder.rotateZ(-5 * (Math.PI / 180));
  });

  StoryTellingScene.prototype.start = function () {
    console.log('StoryTellingScene.prototype.start');
   // this.el.visible = true;
  };

  StoryTellingScene.prototype.onOut = function () {
    console.log('StoryTellingScene.prototype.onOut');
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