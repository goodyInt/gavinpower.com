'use strict';
var THREE = require('three');
var Fire = require('../objects/FireObject');

var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
var MTLLoader = require('three-mtl-loader');
var Events = require('../classes/EventsClass');

function CampScene() {
  this.creativeObject = {};
  this.el = new THREE.Object3D();
  this.thisRotation = this.el.rotation;
  this.rotateHorTween;
  this.rotateVertTween;
  this.animateTheFireInt;
  var loader = new THREE.FontLoader();
  var _this = this;
  this.events = new Events();
  this.fireLight;
  this.fireLight2;
  var fireLightX = 2;
  var fireLightY = -18;
  var fireLightZ = 14;
  var fireLight2X = 2;
  var fireLight2Y = -18;
  var fireLight2Z = 14;
  var firelightYCounter = 0;
  var firelightXCounter = 0;
  var firelightZCounter = 0;
  var firelight2YCounter = 0;
  var firelight2XCounter = 0;
  var firelight2ZCounter = 0;

  this.on = function () {
    _this.events.on.apply(_this.events, arguments);
  }

  var fireXYZ = {
    fireX: -1,
    fireY: -29,
    fireZ: 13,
    yOffset: -15
  }
  var fireLightXYZ = {
    fireX: -1,
    fireY: -29,
    fireZ: 13,
    yOffset: -200
  }
  var fireIntensity = .035;
  this.fireLight = new THREE.PointLight(0xff0000, fireIntensity, 80);
  this.fireLight.position.set(fireLightX, fireLightY + fireLightXYZ.yOffset, fireLightZ);
  
  /*var fireLightHelper = new THREE.PointLightHelper(this.fireLight, 1);
  fireLightHelper.matrix = fireLightHelper.light.matrix;
  this.el.add(fireLightHelper);*/

  this.fireLight2 = new THREE.PointLight(0xffa500, fireIntensity, 80);
  this.fireLight2.position.set(fireLight2X, fireLight2Y + fireLightXYZ.yOffset, fireLight2Z);
  
  /*var fireLight2Helper = new THREE.PointLightHelper(this.fireLight2, 1);
  fireLight2Helper.matrix = fireLight2Helper.light.matrix;
  this.el.add(fireLight2Helper);*/

  var fireYCounter = 0;
  var fireXCounter = 0;
  var fireZCounter = 0;

  this.animateFire = function () {
   
    //fire 
    fireYCounter += .65;
    fireXCounter += .15;
    fireZCounter += .35;

    fireXYZ.fireY += Math.sin(fireYCounter) * .35;
    fireXYZ.fireX += Math.sin(fireXCounter) * .1;
    fireXYZ.fireZ += Math.sin(fireZCounter) * .25;

    threeCampFire.el.position.x = fireXYZ.fireX;
    threeCampFire.el.position.y = fireXYZ.fireY + fireXYZ.yOffset;
    threeCampFire.el.position.z = fireXYZ.fireZ;

    //firelights
    firelightYCounter += .35;
    firelightXCounter += .5;
    firelightZCounter += .45;
    firelight2YCounter += .3;
    firelight2XCounter += .6;
    firelight2ZCounter += .5;;
    fireLightY += Math.sin(firelightYCounter) * .5;
    fireLightX += Math.sin(firelightXCounter) * 1.5;
    fireLightZ += Math.sin(firelightZCounter) * 2;
    fireLight2Y += Math.sin(firelight2YCounter) * .5;
    fireLight2X += Math.sin(firelight2XCounter) * 1.5;

    fireLight2Z += Math.sin(firelight2ZCounter) * 2;
    _this.fireLight.intensity = Math.random() * 1.35 + .15;
    _this.fireLight2.intensity = Math.random() * 1.35 + .15;
    _this.fireLight.position.set(fireLightX - 5, fireLightY + fireLightXYZ.yOffset, fireLightZ);
    _this.fireLight2.position.set(fireLight2X - 5, fireLight2Y + fireLightXYZ.yOffset, fireLight2Z);
  }

  var threeCampFire = new Fire({
    color1: '#ff5000',
    color2: '#ff0000',
    color3: '#ff0000',
    color4: '#ff5000',

    layers: 4,
    data: [{
        positionX: -2,
        positionY: -.25,
        positionZ: 1,
        rotationZ: (-5 * Math.PI / 180),
        scale: 1
      },
      {
        positionX: -1.5,
        positionY: -.75,
        positionZ: 3,
        rotationZ: (-5 * Math.PI / 180),
        scale: 1
      },
      {
        positionX: 1.5,
        positionY: -1,
        positionZ: -3,
        rotationZ: (-5 * Math.PI / 180),
        scale: 1
      },
      {
        positionX: 2,
        positionY: -1.5,
        positionZ: -1,
        rotationZ: (-5 * Math.PI / 180),
        scale: 1
      }
    ]
  });

  _this.el.add(threeCampFire.el);
  threeCampFire.el.visible = false;
  threeCampFire.el.position.x = fireXYZ.fireX;
  threeCampFire.el.position.y = fireXYZ.fireY + fireXYZ.yOffset;
  threeCampFire.el.position.z = fireXYZ.fireZ;

  function lightFire() {
    threeCampFire.el.visible = true;
    threeCampFire.start();
    _this.animateTheFireInt = setInterval(_this.animateFire, 100);
  }

  function extinguishFire() {
    threeCampFire.el.visible = false;
    threeCampFire.stop();
    clearInterval(_this.animateTheFireInt);
  }

  loader.load('fonts/helvetiker_bold.typeface.json', function (font) {
    var platformMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      specular: 0x111111,
      shininess: 20
    });

    var platform = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 2, 60), platformMaterial);
    platform.position.y = -27;
    platform.position.z = 5;
    platform.castShadow = false;
    platform.receiveShadow = true;
    _this.el.add(platform);

    var firePlaceBotMat = new THREE.MeshLambertMaterial({
      color: '#000000'
    });

    var platformBottom = new THREE.Mesh(new THREE.BoxBufferGeometry(200, 2, 60), firePlaceBotMat);
    platformBottom.position.y = -29;
    platformBottom.position.z = 5;
    platformBottom.castShadow = false;
    platformBottom.receiveShadow = false;
    _this.el.add(platformBottom);

    var firePlaceMat = new THREE.MeshLambertMaterial({
      color: '#101010'
    });

    var firePlacePath = new THREE.Mesh(new THREE.BoxBufferGeometry(16, 4, 36), firePlaceMat);
    firePlacePath.position.y = -27;
    firePlacePath.position.z = 28;
    firePlacePath.castShadow = false;
    firePlacePath.receiveShadow = false;
    _this.el.add(firePlacePath);

    var seatMaterial = new THREE.MeshPhongMaterial({
      color: 0x101010,
      specular: 0x222222,
      shininess: 20
    });

    var leftSeat = new THREE.Mesh(new THREE.BoxBufferGeometry(5, 4, 10), seatMaterial);
    leftSeat.position.x = -17;
    leftSeat.position.y = -25;
    leftSeat.position.z = 14;
    leftSeat.castShadow = true;
    leftSeat.receiveShadow = false;
    _this.el.add(leftSeat);

    var rightSeat = new THREE.Mesh(new THREE.BoxBufferGeometry(5, 4, 10), seatMaterial);
    rightSeat.position.x = 17;
    rightSeat.position.y = -25;
    rightSeat.position.z = 14;
    rightSeat.castShadow = true;
    rightSeat.receiveShadow = false;
    _this.el.add(rightSeat);

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
      color: 0x111111,
      specular: 0xffffff,
      shininess: 16
    });

    var designSign = new THREE.Mesh(designSignGeo, designSignMaterial);
    designSign.castShadow = true;
    designSign.receiveShadow = true;
    _this.el.add(designSign);
    designSign.position.x = centerOffset;
    designSign.position.y = -25;
    designSign.position.z = -25;
  });

  function Log() {
    var logMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      shininess: 10
    });

    var logEndMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      shininess: 10
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

    this.castShadow = false;
    this.receiveShadow = false;
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

  //addTrees
  var mtlLoader = new MTLLoader();
  var materials = mtlLoader.parse(getTreeMatAsString());
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  var tree0 = objLoader.parse(getTreeGeoAsString());
  tree0.scale.set(4, 4, 4);
  tree0.position.x = -35;
  tree0.position.y = -26;
  tree0.position.z = 20;
  tree0.rotation.y = 0.7;
  tree0.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  _this.el.add(tree0);

  CampScene.prototype.onIn = function () {
    _this.events.trigger('sectionIsIn', {
      message: 'CampScene sectionIsIn'
    });
  };
  
  CampScene.prototype.start = function () {
    this.fireLight.intensity = 0;
    this.fireLight2.intensity = 0;
    _this.el.add(_this.fireLight);
    _this.el.add(_this.fireLight2);

    _this.events.trigger('sectionFullyLoaded', {
      message: 'CampScene Is Loaded'
    });

    var lightTime = 2;
    var delayTime = .25;
    fireXYZ.yOffset = -10;
    fireLightXYZ.yOffset = -200;

    lightFire();

    TweenMax.to(fireXYZ, lightTime, {
      delay: delayTime,
      yOffset: 0,
      ease: Power1.easeOut
    });

    TweenMax.to(fireLightXYZ, lightTime, {
      delay: delayTime,
      yOffset: 0,
      ease: Power1.easeOut
    });
  };

  this.CompleteUnload = function () {
    extinguishFire();
    _this.el.remove(_this.fireLight);
    _this.el.remove(_this.fireLight2);
   
    _this.events.trigger('sectionUnloaded', {
      message: 'Campfire Unload Is Complete'
    });
  }

  CampScene.prototype.onOut = function () {
    var lightTime = 1.5;
    var delayTime = .25;

    TweenMax.to(fireXYZ, lightTime, {
      delay: delayTime,
      yOffset: -10,
      ease: Power1.easeOut
    });
    
    TweenMax.to(fireLightXYZ, lightTime, {
      delay: delayTime,
      yOffset: -200,
      ease: Power1.easeOut,
      onComplete: _this.CompleteUnload
    });
  };

  CampScene.prototype.stop = function () {
  };

  CampScene.prototype.hide = function () {
  };

  function getTreeGeoAsString() {
    return `
# Blender v2.79 (sub 0) OBJ File: 'pine.blend'
# www.blender.org
mtllib pine.mtl
o Cylinder.001
v -0.001001 0.043765 -0.419297
v -0.001001 1.608194 -0.419297
v 0.385635 0.043765 -0.183158
v 0.385635 1.608194 -0.183158
v 0.385635 0.043765 0.289120
v 0.385635 1.608194 0.289120
v -0.001001 0.043765 0.525260
v -0.001001 1.608194 0.525260
v -0.387637 0.043765 0.289120
v -0.387637 1.608194 0.289120
v -0.387637 0.043765 -0.183158
v -0.387637 1.608194 -0.183158
vn 0.5212 0.0000 -0.8534
vn 1.0000 0.0000 0.0000
vn 0.5212 0.0000 0.8534
vn -0.5212 0.0000 0.8534
vn 0.0000 1.0000 0.0000
vn -1.0000 0.0000 0.0000
vn -0.5212 0.0000 -0.8534
vn 0.0000 -1.0000 0.0000
usemtl Material.003
s off
f 1//1 2//1 4//1 3//1
f 3//2 4//2 6//2 5//2
f 5//3 6//3 8//3 7//3
f 7//4 8//4 10//4 9//4
f 4//5 2//5 12//5 10//5 8//5 6//5
f 9//6 10//6 12//6 11//6
f 11//7 12//7 2//7 1//7
f 1//8 3//8 5//8 7//8 9//8 11//8
o Cylinder
v 0.000000 1.096155 -1.000000
v -0.000000 6.568046 -0.017269
v 0.866025 1.096155 -0.500000
v 0.014955 6.568046 -0.008634
v 0.866025 1.096155 0.500000
v 0.014955 6.568046 0.008634
v -0.000000 1.096155 1.000000
v -0.000000 6.568046 0.017269
v -0.866025 1.096155 0.500000
v -0.014955 6.568046 0.008634
v -0.866025 1.096155 -0.500000
v -0.014955 6.568046 -0.008634
v -0.000000 2.008137 -0.867573
v -0.000000 2.920118 -0.735146
v -0.000000 3.832100 -0.602719
v -0.000000 4.744082 -0.470292
v -0.000000 5.656064 -0.337865
v 0.292599 5.656064 -0.168932
v 0.407285 4.744082 -0.235146
v 0.521970 3.832100 -0.301359
v 0.636655 2.920118 -0.367573
v 0.751340 2.008137 -0.433786
v 0.292599 5.656064 0.168932
v 0.407285 4.744082 0.235146
v 0.521970 3.832100 0.301359
v 0.636655 2.920118 0.367573
v 0.751340 2.008137 0.433787
v -0.000000 5.656064 0.337865
v -0.000000 4.744082 0.470292
v -0.000000 3.832100 0.602719
v -0.000000 2.920118 0.735146
v -0.000000 2.008137 0.867573
v -0.292599 5.656064 0.168932
v -0.407285 4.744082 0.235146
v -0.521970 3.832100 0.301359
v -0.636655 2.920118 0.367573
v -0.751340 2.008137 0.433786
v -0.292599 5.656064 -0.168932
v -0.407285 4.744082 -0.235146
v -0.521970 3.832100 -0.301359
v -0.636655 2.920118 -0.367573
v -0.751340 2.008137 -0.433786
v -0.000000 5.656577 -0.580263
v 0.502523 5.535640 -0.290132
v 0.502523 5.535640 0.290132
v -0.000000 5.656577 0.580263
v -0.502523 5.535640 0.290132
v -0.502523 5.535640 -0.290132
v -0.000000 4.750504 -0.846837
v 0.733382 4.629567 -0.423418
v 0.733382 4.629567 0.423418
v -0.000000 4.750504 0.846837
v -0.733382 4.629567 0.423418
v -0.733382 4.629567 -0.423418
v 0.000000 3.834244 -1.116371
v 0.966806 3.713307 -0.558185
v 0.966806 3.713307 0.558185
v -0.000000 3.834244 1.116371
v -0.966806 3.713307 0.558185
v -0.966806 3.713307 -0.558185
v 0.000000 2.927890 -1.381833
v 1.196703 2.806952 -0.690917
v 1.196703 2.806952 0.690917
v -0.000000 2.927889 1.381834
v -1.196703 2.806952 0.690917
v -1.196703 2.806952 -0.690917
v 0.000000 2.008137 -1.566728
v 1.356826 1.887199 -0.783364
v 1.356826 1.887199 0.783364
v -0.000000 2.008137 1.566728
v -1.356826 1.887199 0.783364
v -1.356826 1.887199 -0.783364
v 1.628944 0.975218 -0.940471
v 1.628944 0.975218 0.940471
v -0.000000 1.096155 1.880942
v -1.628944 0.975218 0.940471
v -1.628944 0.975218 -0.940471
v 0.000000 1.096155 -1.880942
vn 0.5234 0.4466 -0.7257
vn 0.9042 0.4270 0.0000
vn 0.5234 0.4466 0.7257
vn -0.5234 0.4466 0.7257
vn 0.0000 1.0000 -0.0000
vn -0.9042 0.4270 0.0000
vn -0.5234 0.4466 -0.7257
vn 0.0000 -1.0000 0.0000
vn -0.3965 0.6697 -0.6279
vn -0.4287 0.5949 -0.6800
vn -0.4397 0.5728 -0.6918
vn -0.4658 0.4992 -0.7307
vn -0.4911 0.4147 -0.7660
vn -0.7621 0.6475 0.0000
vn -0.8203 0.5719 0.0000
vn -0.8353 0.5498 0.0000
vn -0.8789 0.4771 0.0000
vn -0.9189 0.3946 0.0000
vn -0.3965 0.6697 0.6279
vn -0.4287 0.5948 0.6800
vn -0.4397 0.5728 0.6918
vn -0.4658 0.4992 0.7307
vn -0.4911 0.4147 0.7660
vn 0.3965 0.6697 0.6279
vn 0.4287 0.5949 0.6800
vn 0.4397 0.5728 0.6918
vn 0.4658 0.4992 0.7307
vn 0.4911 0.4147 0.7660
vn 0.7621 0.6475 0.0000
vn 0.8203 0.5719 0.0000
vn 0.8353 0.5498 0.0000
vn 0.8789 0.4771 0.0000
vn 0.9189 0.3946 0.0000
vn 0.3965 0.6697 -0.6279
vn 0.4287 0.5949 -0.6800
vn 0.4397 0.5728 -0.6918
vn 0.4658 0.4992 -0.7307
vn 0.4911 0.4147 -0.7660
vn 0.2450 -0.9539 0.1731
vn 0.4976 -0.8674 0.0000
vn 0.2450 -0.9539 -0.1731
vn -0.2450 -0.9539 -0.1731
vn -0.4976 -0.8674 0.0000
vn -0.2450 -0.9539 0.1731
vn -0.1595 -0.9825 0.0959
vn -0.3313 -0.9435 0.0000
vn -0.1595 -0.9825 -0.0959
vn 0.1595 -0.9825 -0.0959
vn 0.3313 -0.9435 0.0000
vn 0.1595 -0.9825 0.0959
vn -0.1251 -0.9891 0.0775
vn -0.2580 -0.9661 0.0000
vn -0.1251 -0.9891 -0.0775
vn 0.1251 -0.9891 -0.0775
vn 0.2580 -0.9661 0.0000
vn 0.1251 -0.9891 0.0775
vn -0.0959 -0.9940 0.0526
vn -0.1981 -0.9802 0.0000
vn -0.0959 -0.9940 -0.0526
vn 0.0959 -0.9940 -0.0526
vn 0.1981 -0.9802 0.0000
vn 0.0959 -0.9940 0.0526
vn -0.0924 -0.9938 0.0613
vn -0.1959 -0.9806 0.0000
vn -0.0924 -0.9938 -0.0613
vn 0.0924 -0.9938 -0.0613
vn 0.1959 -0.9806 0.0000
vn 0.0924 -0.9938 0.0613
vn -0.0757 -0.9960 0.0475
vn -0.1566 -0.9877 0.0000
vn -0.0757 -0.9960 -0.0475
vn 0.0757 -0.9960 -0.0475
vn 0.1566 -0.9877 0.0000
vn 0.0757 -0.9960 0.0475
usemtl Material.004
s off
f 55//9 14//9 16//9 56//9
f 56//10 16//10 18//10 57//10
f 57//11 18//11 20//11 58//11
f 58//12 20//12 22//12 59//12
f 16//13 14//13 24//13 22//13 20//13 18//13
f 59//14 22//14 24//14 60//14
f 60//15 24//15 14//15 55//15
f 13//16 15//16 17//16 19//16 21//16 23//16
f 89//17 54//17 25//17 90//17
f 84//18 53//18 26//18 79//18
f 78//19 52//19 27//19 73//19
f 72//20 51//20 28//20 67//20
f 66//21 50//21 29//21 61//21
f 88//22 49//22 54//22 89//22
f 83//23 48//23 53//23 84//23
f 77//24 47//24 52//24 78//24
f 71//25 46//25 51//25 72//25
f 65//26 45//26 50//26 66//26
f 87//27 44//27 49//27 88//27
f 82//28 43//28 48//28 83//28
f 76//29 42//29 47//29 77//29
f 70//30 41//30 46//30 71//30
f 64//31 40//31 45//31 65//31
f 86//32 39//32 44//32 87//32
f 81//33 38//33 43//33 82//33
f 75//34 37//34 42//34 76//34
f 69//35 36//35 41//35 70//35
f 63//36 35//36 40//36 64//36
f 85//37 34//37 39//37 86//37
f 80//38 33//38 38//38 81//38
f 74//39 32//39 37//39 75//39
f 68//40 31//40 36//40 69//40
f 62//41 30//41 35//41 63//41
f 90//42 25//42 34//42 85//42
f 79//43 26//43 33//43 80//43
f 73//44 27//44 32//44 74//44
f 67//45 28//45 31//45 68//45
f 61//46 29//46 30//46 62//46
f 50//47 60//47 55//47 29//47
f 45//48 59//48 60//48 50//48
f 40//49 58//49 59//49 45//49
f 35//50 57//50 58//50 40//50
f 30//51 56//51 57//51 35//51
f 29//52 55//52 56//52 30//52
f 28//53 61//53 62//53 31//53
f 31//54 62//54 63//54 36//54
f 36//55 63//55 64//55 41//55
f 41//56 64//56 65//56 46//56
f 46//57 65//57 66//57 51//57
f 51//58 66//58 61//58 28//58
f 27//59 67//59 68//59 32//59
f 32//60 68//60 69//60 37//60
f 37//61 69//61 70//61 42//61
f 42//62 70//62 71//62 47//62
f 47//63 71//63 72//63 52//63
f 52//64 72//64 67//64 27//64
f 26//65 73//65 74//65 33//65
f 33//66 74//66 75//66 38//66
f 38//67 75//67 76//67 43//67
f 43//68 76//68 77//68 48//68
f 48//69 77//69 78//69 53//69
f 53//70 78//70 73//70 26//70
f 25//71 79//71 80//71 34//71
f 34//72 80//72 81//72 39//72
f 39//73 81//73 82//73 44//73
f 44//74 82//74 83//74 49//74
f 49//75 83//75 84//75 54//75
f 54//76 84//76 79//76 25//76
f 13//77 90//77 85//77 15//77
f 15//78 85//78 86//78 17//78
f 17//79 86//79 87//79 19//79
f 19//80 87//80 88//80 21//80
f 21//81 88//81 89//81 23//81
f 23//82 89//82 90//82 13//82
o Icosphere_Icosphere.001
v 0.029476 -0.814124 0.035349
v 2.200298 -0.537734 1.612525
v -0.799688 -0.537734 2.587297
v -2.653803 -0.537732 0.035349
v -0.799688 -0.537734 -2.516598
v 2.200298 -0.537734 -1.541827
v 0.858640 -0.090514 2.587297
v -2.141346 -0.090514 1.612525
v -2.141346 -0.090514 -1.541827
v 0.858640 -0.090514 -2.516598
v 2.712754 -0.090516 0.035349
v 0.029476 0.185876 0.035349
v -0.457891 -0.739451 1.535335
v 1.305444 -0.739451 0.962383
v 0.818082 -0.576993 2.462384
v 2.581419 -0.576992 0.035349
v 1.305444 -0.739451 -0.891685
v -1.547714 -0.739450 0.035349
v -2.035092 -0.576992 1.535340
v -0.457891 -0.739451 -1.464637
v -2.035092 -0.576992 -1.464642
v 0.818082 -0.576993 -2.391686
v 2.882649 -0.314124 0.962387
v 2.882649 -0.314124 -0.891689
v 0.029476 -0.314124 3.035349
v 1.792833 -0.314124 2.462399
v -2.823698 -0.314124 0.962387
v -1.733881 -0.314124 2.462399
v -1.733881 -0.314124 -2.391701
v -2.823698 -0.314124 -0.891689
v 1.792833 -0.314124 -2.391701
v 0.029476 -0.314124 -2.964651
v 2.094044 -0.051256 1.535340
v -0.759131 -0.051255 2.462384
v -2.522468 -0.051256 0.035349
v -0.759131 -0.051255 -2.391686
v 2.094044 -0.051256 -1.464642
v 0.516843 0.111203 1.535335
v 1.606665 0.111202 0.035349
v -1.246492 0.111203 0.962383
v -1.246492 0.111203 -0.891685
v 0.516843 0.111203 -1.464637
vn 0.0181 -0.9983 0.0556
vn 0.1733 -0.9826 0.0663
vn -0.0473 -0.9983 0.0343
vn -0.0473 -0.9983 -0.0343
vn 0.0181 -0.9983 -0.0556
vn 0.4122 -0.9029 0.1221
vn 0.0113 -0.9029 0.4297
vn -0.4052 -0.9029 0.1435
vn -0.2617 -0.9029 -0.3410
vn 0.2435 -0.9029 -0.3543
vn 0.6442 -0.6050 0.4680
vn -0.2461 -0.6050 0.7573
vn -0.7962 -0.6050 0.0000
vn -0.2461 -0.6050 -0.7573
vn 0.6442 -0.6050 -0.4680
vn 0.1012 0.9826 0.1555
vn -0.1166 0.9826 0.1443
vn -0.1733 0.9826 -0.0663
vn 0.0095 0.9826 -0.1853
vn 0.1792 0.9826 -0.0482
vn 0.0473 0.9983 -0.0343
vn 0.1022 0.9920 -0.0742
vn 0.1012 0.9826 -0.1555
vn -0.0181 0.9983 -0.0556
vn -0.0390 0.9920 -0.1201
vn -0.1166 0.9826 -0.1443
vn -0.0584 0.9983 0.0000
vn -0.1263 0.9920 0.0000
vn -0.1733 0.9826 0.0663
vn -0.0181 0.9983 0.0556
vn -0.0390 0.9920 0.1201
vn 0.0095 0.9826 0.1853
vn 0.0473 0.9983 0.0343
vn 0.1022 0.9920 0.0742
vn 0.1792 0.9826 0.0482
vn 0.4052 0.9029 -0.1435
vn 0.5319 0.7534 -0.3865
vn 0.2617 0.9029 -0.3410
vn -0.0113 0.9029 -0.4297
vn -0.2032 0.7535 -0.6253
vn -0.2435 0.9029 -0.3543
vn -0.4122 0.9029 -0.1221
vn -0.6575 0.7535 0.0000
vn -0.4122 0.9029 0.1221
vn -0.2435 0.9029 0.3543
vn -0.2032 0.7535 0.6253
vn -0.0113 0.9029 0.4297
vn 0.2617 0.9029 0.3410
vn 0.5319 0.7534 0.3865
vn 0.4052 0.9029 0.1435
vn 0.2461 0.6050 -0.7573
vn 0.2032 -0.7535 -0.6253
vn 0.0113 -0.9029 -0.4297
vn -0.6442 0.6050 -0.4680
vn -0.5319 -0.7534 -0.3865
vn -0.4052 -0.9029 -0.1435
vn -0.6442 0.6050 0.4680
vn -0.5319 -0.7534 0.3865
vn -0.2617 -0.9029 0.3410
vn 0.2461 0.6050 0.7573
vn 0.2032 -0.7535 0.6253
vn 0.2435 -0.9029 0.3543
vn 0.7962 0.6050 0.0000
vn 0.6575 -0.7535 0.0000
vn 0.4122 -0.9029 -0.1221
vn 0.1166 -0.9826 -0.1443
vn 0.0390 -0.9920 -0.1201
vn -0.0095 -0.9826 -0.1853
vn -0.1012 -0.9826 -0.1555
vn -0.1022 -0.9920 -0.0742
vn -0.1792 -0.9826 -0.0482
vn -0.1792 -0.9826 0.0482
vn -0.1022 -0.9920 0.0742
vn -0.1012 -0.9826 0.1555
vn 0.1733 -0.9826 -0.0663
vn 0.1263 -0.9920 0.0000
vn 0.0584 -0.9983 0.0000
vn -0.0095 -0.9826 0.1853
vn 0.0390 -0.9920 0.1201
vn 0.1166 -0.9826 0.1443
usemtl Material.002
s off
f 91//83 104//83 103//83
f 92//84 104//84 106//84
f 91//85 103//85 108//85
f 91//86 108//86 110//86
f 91//87 110//87 107//87
f 92//88 106//88 113//88
f 93//89 105//89 115//89
f 94//90 109//90 117//90
f 95//91 111//91 119//91
f 96//92 112//92 121//92
f 92//93 113//93 116//93
f 93//94 115//94 118//94
f 94//95 117//95 120//95
f 95//96 119//96 122//96
f 96//97 121//97 114//97
f 97//98 123//98 128//98
f 98//99 124//99 130//99
f 99//100 125//100 131//100
f 100//101 126//101 132//101
f 101//102 127//102 129//102
f 129//103 132//103 102//103
f 129//104 127//104 132//104
f 127//105 100//105 132//105
f 132//106 131//106 102//106
f 132//107 126//107 131//107
f 126//108 99//108 131//108
f 131//109 130//109 102//109
f 131//110 125//110 130//110
f 125//111 98//111 130//111
f 130//112 128//112 102//112
f 130//113 124//113 128//113
f 124//114 97//114 128//114
f 128//115 129//115 102//115
f 128//116 123//116 129//116
f 123//117 101//117 129//117
f 114//118 127//118 101//118
f 114//119 121//119 127//119
f 121//120 100//120 127//120
f 122//121 126//121 100//121
f 122//122 119//122 126//122
f 119//123 99//123 126//123
f 120//124 125//124 99//124
f 120//125 117//125 125//125
f 117//126 98//126 125//126
f 118//127 124//127 98//127
f 118//128 115//128 124//128
f 115//129 97//129 124//129
f 116//130 123//130 97//130
f 116//131 113//131 123//131
f 113//132 101//132 123//132
f 121//133 122//133 100//133
f 121//134 112//134 122//134
f 112//135 95//135 122//135
f 119//136 120//136 99//136
f 119//137 111//137 120//137
f 111//138 94//138 120//138
f 117//139 118//139 98//139
f 117//140 109//140 118//140
f 109//141 93//141 118//141
f 115//142 116//142 97//142
f 115//143 105//143 116//143
f 105//144 92//144 116//144
f 113//145 114//145 101//145
f 113//146 106//146 114//146
f 106//147 96//147 114//147
f 107//148 112//148 96//148
f 107//149 110//149 112//149
f 110//150 95//150 112//150
f 110//151 111//151 95//151
f 110//152 108//152 111//152
f 108//153 94//153 111//153
f 108//154 109//154 94//154
f 108//155 103//155 109//155
f 103//156 93//156 109//156
f 106//157 107//157 96//157
f 106//158 104//158 107//158
f 104//159 91//159 107//159
f 103//160 105//160 93//160
f 103//161 104//161 105//161
f 104//162 92//162 105//162
`;
  }

  function getTreeMatAsString() {
    return `
# Blender MTL File: 'pine.blend'
# Material Count: 3

newmtl Material.002

#this is the base of tree
# Ka - Ambient Colour
Ka 1.000000 1.000000 1.000000
# Kd - Diffuse Colour
Kd 0.066666 0.066666 0.066666
# Ks - Specular Colour
Ks 0.200000 0.200000 0.200000
# Ns - weighted specular exponent - ranges between 0 and 1000
Ns 96.078431
Ke 0.000000 0.000000 0.000000
Ni 1.000000
# d is disovled - can be thought of as transparency
d 1.000000
illum 2

#this is the trunk of the tree
newmtl Material.003
Ns 56.078431
Ka 1.000000 1.000000 1.000000
Kd 0.06295 0.062289 0.0650408
Ks 0.100000 0.100000 0.100000
Ke 0.000000 0.000000 0.000000
Ni 1.000000

d 1.000000
illum 2

#these are the leaves
newmtl Material.004
Ns 96.078431
Ka 1.000000 1.000000 1.000000
Kd 0.062745 0.100000 0.005882
Ks 0.500000 0.500000 0.500000
Ke 0.000000 0.000000 0.000000
Ni 1.000000
d 1.000000
illum 2

`;
  }
}

module.exports = CampScene;