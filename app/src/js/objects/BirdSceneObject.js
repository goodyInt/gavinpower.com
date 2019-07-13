'use strict';
var THREE = require('three');
var birdPosition = require('../materials/birdPosition');
var birdVelocity = require('../materials/birdVelocity');
var birdMaterial = require('../materials/birdMaterial');
var gpuComputeUtil = require('../utils/GPUComputationRenderer');
var Events = require('../classes/EventsClass');

function BirdSceneObject() {

  this.el = new THREE.Object3D();
  var gpuCompute;

  var _this = this;

  this.events = new Events();

  var WIDTH = 16;

  var BIRDS = WIDTH * WIDTH;
  var mouseX = 0,
    mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  var BOUNDS = 800;

  var last = performance.now();

  var velocityVariable;
  var positionVariable;
  var positionUniforms;
  var velocityUniforms;
  var birdUniforms;
  var moveTheBirdsTimeOut;
  var moveTheBirdsInt;

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  THREE.BirdGeometry = function () {

    var triangles = BIRDS * 3;
    var points = triangles * 3;

    THREE.BufferGeometry.call(this);

    var vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    var birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    var references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
    var birdVertex = new THREE.BufferAttribute(new Float32Array(points), 1);

    this.addAttribute('position', vertices);
    this.addAttribute('birdColor', birdColors);
    this.addAttribute('reference', references);
    this.addAttribute('birdVertex', birdVertex);

    var v = 0;
    function verts_push() {
      for (var i = 0; i < arguments.length; i++) {
        vertices.array[v++] = arguments[i];
      }
    }

    var wingsSpan = 20;

    for (var f = 0; f < BIRDS; f++) {

      // Body
      verts_push(
        0, -0, -20,
        0, 4, -20,
        0, 0, 30
      );

      // Left Wing
      verts_push(
        0, 0, -15,
        -wingsSpan, 0, 0,
        0, 0, 15
      );

      // Right Wing
      verts_push(
        0, 0, 15,
        wingsSpan, 0, 0,
        0, 0, -15
      );
    }

    for (var v = 0; v < triangles * 3; v++) {

      var i = ~~(v / 3);
      var x = (i % WIDTH) / WIDTH;
      var y = ~~(i / WIDTH) / WIDTH;

      var c = new THREE.Color(0x444444 + ~~(v / 9) / BIRDS * 0x666666);

      birdColors.array[v * 3 + 0] = c.r;
      birdColors.array[v * 3 + 1] = c.g;
      birdColors.array[v * 3 + 2] = c.b;

      references.array[v * 2] = x;
      references.array[v * 2 + 1] = y;

      birdVertex.array[v] = v % 9;
    }
    this.scale(0.2, 0.2, 0.2);

  };

  THREE.BirdGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);

  function init(sceneRenderer) {
    initComputeRenderer(sceneRenderer);
    initBirds();
  }

  function initComputeRenderer(sceneRenderer) {

    gpuCompute = new gpuComputeUtil(WIDTH, WIDTH, sceneRenderer);

    var dtPosition = gpuCompute.createTexture();
    var dtVelocity = gpuCompute.createTexture();
    fillPositionTexture(dtPosition);
    fillVelocityTexture(dtVelocity);

    var ourBirdPostion = birdPosition;
    var ourBirdVelocity = birdVelocity;

    velocityVariable = gpuCompute.addVariable("textureVelocity", ourBirdVelocity.fragmentShader, dtVelocity);

    positionVariable = gpuCompute.addVariable("texturePosition", ourBirdPostion.fragmentShader, dtPosition);

    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

    positionVariable.material.uniforms = ourBirdPostion.uniforms;
    positionUniforms = positionVariable.material.uniforms;

    velocityVariable.material.uniforms = ourBirdVelocity.uniforms;
    velocityUniforms = velocityVariable.material.uniforms;

    velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(2);

    velocityVariable.wrapS = THREE.RepeatWrapping;
    velocityVariable.wrapT = THREE.RepeatWrapping;
    positionVariable.wrapS = THREE.RepeatWrapping;
    positionVariable.wrapT = THREE.RepeatWrapping;

    var error = gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }
  }

  function initBirds() {
    var ourBirdMaterial = birdMaterial;
    var geometry = new THREE.BirdGeometry();
    birdUniforms = ourBirdMaterial.uniforms;

    birdMaterial = new THREE.ShaderMaterial({
      uniforms: birdUniforms,
      vertexShader: ourBirdMaterial.vertexShader,
      fragmentShader: ourBirdMaterial.fragmentShader,
      side: THREE.DoubleSide
    });

    var birdMesh = new THREE.Mesh(geometry, birdMaterial);
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();

    _this.el.add(birdMesh);
  }

  function fillPositionTexture(texture) {

    var theArray = texture.image.data;
    var startPos = .01; //was 800
    var startPosHalf = startPos / 2;
    for (var k = 0, kl = theArray.length; k < kl; k += 4) {
      // these are global values
      var x = (Math.random() * startPos - startPosHalf) + 150;
      var y = (Math.random() * startPos - startPosHalf) - 200;
      var z = (Math.random() * startPos - startPosHalf) - 620;

      theArray[k + 0] = x;
      theArray[k + 1] = y;
      theArray[k + 2] = z;
      theArray[k + 3] = 1;
    }
  }
  

  function fillVelocityTexture(texture) {

    var theArray = texture.image.data;

    for (var k = 0, kl = theArray.length; k < kl; k += 4) {

      var x = Math.random() - 0.5;
      var y = Math.random() - 0.5;
      var z = Math.random() - 0.5;

      theArray[k + 0] = x * 1;
      theArray[k + 1] = y * 1;
      theArray[k + 2] = z * 1;
      theArray[k + 3] = 1;
    }
  }
 
  var moveTheBirds = function () {
  
    var now = performance.now();
    var delta = (now - last) / 1000;

    if (delta > 1) delta = 1; // safety cap on large deltas
    last = now;

    positionUniforms["time"].value = now;
    positionUniforms["delta"].value = delta;

    velocityUniforms["time"].value = now;
    velocityUniforms["delta"].value = delta;

    birdUniforms["time"].value = now;
    birdUniforms["delta"].value = delta;

    velocityUniforms["predator"].value.set(0.5 * mouseX / windowHalfX,-0.5 * mouseY / windowHalfY, 0);

    mouseX = 10000;
    mouseY = 10000;

    gpuCompute.compute();    

    birdUniforms["texturePosition"].value = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
    birdUniforms["textureVelocity"].value = gpuCompute.getCurrentRenderTarget(velocityVariable).texture;
  }

  this.finalInit = function (sceneRenderer) {
       init(sceneRenderer);
  }

  this.on = function () {
    _this.events.on.apply(_this.events, arguments);
  }

  this.start = function () {
  
    _this.events.trigger('sectionFullyLoaded', {
      message: 'Birds are Loaded'
    });
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    moveTheBirdsTimeOut = setTimeout(startMovingBirds, 4500);
  }

  function startMovingBirds() {
    moveTheBirdsInt = setInterval(moveTheBirds, 25);
  }

  this.onOut = function () {
     document.removeEventListener('mousemove', onDocumentMouseMove, false);
     setTimeout(clearBirds, 1000);
  }
  function clearBirds(){
  
    clearTimeout(moveTheBirdsTimeOut);
    clearInterval(moveTheBirdsInt);
    gpuCompute.resetToStart();

  }

  this.onStop = function () {

   
  }
}

module.exports = BirdSceneObject;