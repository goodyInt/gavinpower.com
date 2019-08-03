'use strict';
var THREE = require('three');
var dilate = require('../utils/dilateUtil');
var outlineMaterial = require('../materials/outlineMaterial');
var waterMaterial = require('../materials/waterMaterial');
var Events = require('../classes/EventsClass');

function StoryTellingScene() {
  this.creativeObject = {};
  this.el = new THREE.Object3D();
  this.thisRotation = this.el.rotation;
  this.rotateHorTween;
  this.rotateVertTween;
  this.frontPosArray = [];
  this.storySignHolder;
  this.tellingSignHolder;
  var outlineMeshTelling;
  var outlineMeshStory;
  var storySign;
  var tellingSign;

  this.lightsOn;

  var loader = new THREE.FontLoader();
  var _this = this;
  var shaderMaterial;
  var signMaterial;
  var waterShaderMaterial;
  var clock = new THREE.Clock();
  var waterSpeed = 1;
  var storyLight;
  var storyLight2;
  var storyLightSpotlightTarget = new THREE.Object3D();
  var storyLightSpotlightTarget2 = new THREE.Object3D();
  var storyLightIntensity = 5.0;
  var storyLightDistance = 650;
  var smallScreenZOffset = -100;
  var lightsHolder = new THREE.Object3D();
  var moonLightLightTarget = new THREE.Object3D();
  this.events = new Events();
  this.on = function () {
    this.events.on.apply(this.events, arguments);
  }

  var waterTintObject = {
    tintDensity: 1.0
  };
  var outlineColorObject = {
    oColor: '#000000'
  };
  var outlineColour = new THREE.Color(outlineColorObject.oColor);

  var moonLight = new THREE.SpotLight(0x00ffff, 0.0000, 700, Math.PI * .25);
  moonLight.position.set(0, 150, -150);
  moonLight.castShadow = true;
  lightsHolder.add(moonLight);

  //var moonLightHelper = new THREE.SpotLightHelper(moonLight);
  // moonLightHelper.matrix = moonLightHelper.light.matrix;
  // this.el.add(moonLightHelper);

  moonLightLightTarget.position.x = 0;
  moonLightLightTarget.position.y = 0;
  moonLightLightTarget.position.z = -140;
  moonLight.target = moonLightLightTarget;
  this.el.add(moonLightLightTarget);

  var moonShadowCamera = new THREE.PerspectiveCamera(70, 1, 100, 3000)
  moonLight.shadow = new THREE.LightShadow(moonShadowCamera);
  moonLight.shadow.bias = 0.0001;

  storyLight = new THREE.SpotLight(0x00ffff, 0, storyLightDistance);
  storyLight.penumbra = .65;
  storyLight.angle = Math.PI / 8;
  storyLight.position.set(-120, 200, -550);
  storyLightSpotlightTarget.position.x = -120;
  storyLightSpotlightTarget.position.y = 0;
  storyLightSpotlightTarget.position.z = 0;
  storyLight.target = storyLightSpotlightTarget;
  this.el.add(storyLightSpotlightTarget);

  //var storyLightHelper = new THREE.SpotLightHelper( storyLight );
  // storyLightHelper.matrix = storyLightHelper.light.matrix;
  // this.el.add(storyLightHelper);

  storyLight2 = new THREE.SpotLight(0x00ffff, 0, storyLightDistance);
  storyLight2.penumbra = .65;
  storyLight2.angle = Math.PI / 8;
  storyLight2.position.set(120, 200, -550);
  storyLightSpotlightTarget2.position.x = 120;
  storyLightSpotlightTarget2.position.y = 0;
  storyLightSpotlightTarget2.position.z = 0
  storyLight2.target = storyLightSpotlightTarget2;
  this.el.add(storyLightSpotlightTarget2);

  //var storyLight2Helper = new THREE.SpotLightHelper(storyLight2);
  //storyLight2Helper.matrix = storyLight2Helper.light.matrix;
  //this.el.add(storyLight2Helper);

  this.moveTheWater = function () {

    waterShaderMaterial.uniforms.uGlobalTime.value += clock.getDelta() * waterSpeed;
  }
  this.updateShaderHW = function () {
    waterShaderMaterial.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
  }
  loader.load('fonts/helvetiker_bold.typeface.json', function (font) {
    signMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      specular: 0xffffff,
      shininess: .1,
      fog: true
    });


    var platformMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      specular: 0x222222,
    });
    /*
    var platformMaterialSteps = new THREE.MeshPhongMaterial({
      color: 0x101010,
      specular: 0x000000,
    });
    */
    var platformMaterialSteps = new THREE.MeshPhongMaterial({
      color: 0x000000,
      specular: 0x111111,
      shininess: 20
    });
    var platformMaterialBorder = new THREE.MeshPhongMaterial({
      color: 0x333333,
      specular: 0x333333,
    });

    var platformBottom = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 2, 10), platformMaterial);
    platformBottom.position.x = 0;
    platformBottom.position.y = -27;
    platformBottom.position.z = 40;
    platformBottom.castShadow = false;
    platformBottom.receiveShadow = true;
    _this.el.add(platformBottom);

    var platformStep0 = new THREE.Mesh(new THREE.BoxBufferGeometry(40, 2, 10), platformMaterialSteps);
    platformStep0.position.x = 0;
    platformStep0.position.y = -27;
    platformStep0.position.z = -170 + smallScreenZOffset;
    platformStep0.castShadow = false;
    platformStep0.receiveShadow = true;
    _this.el.add(platformStep0);

    var platformStep1 = new THREE.Mesh(new THREE.BoxBufferGeometry(30, 2, 10), platformMaterialSteps);
    platformStep1.position.x = 0;
    platformStep1.position.y = -27;
    platformStep1.position.z = -190 + smallScreenZOffset;
    platformStep1.castShadow = false;
    platformStep1.receiveShadow = true;
    _this.el.add(platformStep1);

    var platformStep2 = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 2, 10), platformMaterialSteps);
    platformStep2.position.x = 0;
    platformStep2.position.y = -27;
    platformStep2.position.z = -210 + smallScreenZOffset;
    platformStep2.castShadow = false;
    platformStep2.receiveShadow = true;
    _this.el.add(platformStep2);

    var platformLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 2, 300), platformMaterial);
    platformLeft.position.x = -58;
    platformLeft.position.y = -27;
    platformLeft.position.z = -55 + smallScreenZOffset * .5;
    platformLeft.castShadow = false;
    platformLeft.receiveShadow = true;
    _this.el.add(platformLeft);

    var borderGeometry = new THREE.PlaneGeometry(300, 2);

    var platformLeftBorder = new THREE.Mesh(borderGeometry, platformMaterialBorder);
    platformLeftBorder.position.x = -8;
    platformLeftBorder.position.y = -27;
    platformLeftBorder.position.z = -55 + smallScreenZOffset * .5;;
    platformLeftBorder.castShadow = false;
    platformLeftBorder.receiveShadow = true;
    platformLeftBorder.rotateY(90 * (Math.PI / 180));
    _this.el.add(platformLeftBorder);

    var platformRight = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 2, 300), platformMaterial);
    platformRight.position.x = 58;
    platformRight.position.y = -27;
    platformRight.position.z = -55 + smallScreenZOffset * .5;
    platformRight.castShadow = false;
    platformRight.receiveShadow = true;
    _this.el.add(platformRight);

    var platformRightBorder = new THREE.Mesh(borderGeometry, platformMaterialBorder);
    platformRightBorder.position.x = 8;
    platformRightBorder.position.y = -27;
    platformRightBorder.position.z = -55 + smallScreenZOffset * .5;
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

    var theRiver = new THREE.Mesh(new THREE.BoxBufferGeometry(16, .1, 294), waterShaderMaterial);
    theRiver.position.y = -29;
    theRiver.position.z = -60 + smallScreenZOffset * .5;
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

    storySign = new THREE.Mesh(storySignGeo, signMaterial);
    storySign.castShadow = true;
    storySign.receiveShadow = true;
    storySign.renderOrder = 1;

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
    shaderMaterial.uniforms["outlineColor"].value = outlineColour;
    //shaderMaterial.outlineColor =  

    outlineMeshStory = new THREE.Mesh(outlineGeometry, shaderMaterial);
    outlineGeometry.computeBoundingBox();
    outlineMeshStory.castShadow = false;
    outlineMeshStory.receiveShadow = false;
    _this.storySignHolder.add(outlineMeshStory);
    _this.storySignHolder.add(storySign);
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

    tellingSign = new THREE.Mesh(tellingSignGeo, signMaterial);
    tellingSign.castShadow = true;
    tellingSign.receiveShadow = true;
    tellingSign.renderOrder = 1;

    var outlineGeometryTelling = tellingSignGeo.clone();
    dilate(outlineGeometryTelling, 1.5);

    outlineMeshTelling = new THREE.Mesh(outlineGeometryTelling, shaderMaterial);
    outlineGeometryTelling.computeBoundingBox();
    _this.tellingSignHolder.add(tellingSign);
    _this.tellingSignHolder.add(outlineMeshTelling);

    _this.storySignHolder.position.x = -50;
    _this.storySignHolder.position.y = -4;
    _this.storySignHolder.position.z = -75 + smallScreenZOffset;
    _this.storySignHolder.rotateY(65 * (Math.PI / 180));
    _this.storySignHolder.rotateX(25 * (Math.PI / 180));
    _this.storySignHolder.rotateZ(2 * (Math.PI / 180));

    _this.tellingSignHolder.position.x = 50;
    _this.tellingSignHolder.position.y = -4;
    _this.tellingSignHolder.position.z = -75 + smallScreenZOffset;
    _this.tellingSignHolder.rotateY(-65 * (Math.PI / 180));
    _this.tellingSignHolder.rotateX(25 * (Math.PI / 180));
    _this.tellingSignHolder.rotateZ(-2 * (Math.PI / 180));
    _this.el.add(_this.storySignHolder);
    _this.el.add(_this.tellingSignHolder);
  });

  StoryTellingScene.prototype.start = function () {
      storyLight2.intensity = 0;
    storyLight.intensity = 0;
    moonLight.intensity = 0;
    _this.el.add(storyLight);
    _this.el.add(storyLight2);
    _this.el.add(lightsHolder);
    _this.events.trigger('sectionFullyLoaded', {
      message: 'StoryTelling Is Loaded'
    });

    var lightTime = 2;
    var delayTime = .25;

    TweenMax.to(storyLight, lightTime, {
      delay: delayTime,
      intensity: storyLightIntensity,
      ease: Power1.easeOut
    });
    TweenMax.to(storyLight2, lightTime, {
      delay: delayTime,
      intensity: storyLightIntensity,
      ease: Power1.easeOut
    });
    TweenMax.to(moonLight, lightTime, {
      delay: delayTime,
      intensity: 0.65,
      ease: Power1.easeOut
    });
    TweenMax.to(outlineColorObject, lightTime, {
      delay: delayTime,
      oColor: '#00ffff',
      ease: Power1.easeOut,
      onUpdate: function () {
        outlineColour.set(outlineColorObject.oColor);
        shaderMaterial.uniforms["outlineColor"].value = outlineColour;
      }
    });
    TweenMax.to(waterTintObject, lightTime, {
      delay: delayTime,
      tintDensity: 0.0,
      ease: Power1.easeOut,
      onUpdate: function () {
        waterShaderMaterial.uniforms["tintDensity"].value = waterTintObject.tintDensity;
      }
    });
  }
  StoryTellingScene.prototype.onIn = function () {
    _this.moveTheWaterInterval = setInterval(_this.moveTheWater, 40);
    _this.events.trigger('sectionIsIn', {
      message: 'StoryTelling sectionIsIn'
    });
  };

  StoryTellingScene.prototype.onOut = function () {
  
    var lightTime = 1;
    TweenMax.to(storyLight, lightTime, {
      intensity: 0,
      ease: Power1.easeOut
    });
    TweenMax.to(storyLight2, lightTime, {
      intensity: 0,
      ease: Power1.easeOut
    });
    TweenMax.to(moonLight, lightTime, {
      intensity: 0,
      ease: Power1.easeOut
    });
    TweenMax.to(outlineColorObject, lightTime, {
      oColor: '#000000',
      ease: Power1.easeOut,
      onUpdate: function () {
        outlineColour.set(outlineColorObject.oColor);
        shaderMaterial.uniforms["outlineColor"].value = outlineColour;
      }
    });
    
    TweenMax.to(waterTintObject, lightTime, {
      tintDensity: 0.85,
      ease: Power1.easeOut,
      onUpdate: function () {
        waterShaderMaterial.uniforms["tintDensity"].value = waterTintObject.tintDensity;
        
      },
      onComplete: this.CompleteUnload
    });
  };
 
  StoryTellingScene.prototype.stop = function () {
    clearInterval(this.moveTheWaterInterval);
  };
  this.CompleteUnload = function () {
    _this.el.remove(storyLight);
    _this.el.remove(storyLight2);
    _this.el.remove(lightsHolder);
    _this.events.trigger('sectionUnloaded', {
      message: 'StoryTelling Unload Is Complete'
    });
  }
}

module.exports = StoryTellingScene;