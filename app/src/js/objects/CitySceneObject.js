'use strict';
var THREE = require('three');
var skyMaterial = require('../materials/skyMaterial');
var orbitControls = require('../objects/GoodyOrbitControls');

function CitySceneObject() {
  this.el = new THREE.Object3D();
  var _this = this;
  var city = new THREE.Object3D();
  var theParticles = new THREE.Object3D();
  var downtown = new THREE.Object3D();
  var sky, sunObjectPos;
  var ranColor = new THREE.Color(0xffffff);
  var sunLight;
  var rotateDownInterval;
  var rotateParticlesInterval;
  var sunriseInterval;

  var grountMat = new THREE.MeshPhongMaterial({
    color: 0x111111,
    shininess: 75,
    side: THREE.DoubleSide
  });
 

  var ground = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), grountMat);
  ground.rotation.x = -90 * Math.PI / 180;
  ground.position.y = -0.001;
  ground.receiveShadow = true;
  ground.both = true;
  city.add(ground);
  //var gridHelper = new THREE.GridHelper(60, 120, 0x000000, 0x000000);
  //city.add(gridHelper);
  //----------------------------------------------------------------- Buildings

  var segments = 2;
  var buildingMatArray = [
    new THREE.MeshLambertMaterial({
      color: 0x333333
    }),
    new THREE.MeshLambertMaterial({
      color: 0x444444
    }),
    new THREE.MeshLambertMaterial({
      color: 0x555555
    }),
    new THREE.MeshLambertMaterial({
      color: 0x666666
    }),
    new THREE.MeshLambertMaterial({
      color: 0x777777
    }),
    new THREE.MeshLambertMaterial({
      color: 0x888888
    }),
    new THREE.MeshLambertMaterial({
      color: 0x999999
    }),
    new THREE.MeshLambertMaterial({
      color: 0xaaaaaa
    })
  ];
  var buildingGeo = new THREE.CubeGeometry(1, 0, 0, segments, segments, segments);
  var buildingWidth = 0.85;
  var buildingX = -6;
  var buildingZ = -6;
  var buildingHeight;
  var buildingCounter = 0;
  for (var i = 0; i < 49; i++) {
    var building = new THREE.Mesh(buildingGeo, buildingMatArray[Math.floor(Math.random() * 8)]);
    downtown.add(building);
    building.castShadow = true;
    building.receiveShadow = true;
    if (buildingX < 0) {
      buildingHeight = 3 + buildingX * .5;
    }
    if (buildingX >= 0) {
      buildingHeight = 3 - buildingX * .5;
    }
    if (buildingZ < 0) {
      buildingHeight += (3 + buildingZ * .5);
    }
    if (buildingZ >= 0) {
      buildingHeight += (3 - buildingZ * .5);
    }
    building.scale.y = Math.random() * (buildingHeight * .75) + buildingHeight * .25 + .5;
    building.scale.x = building.scale.z = buildingWidth + Math.random() * .3 - .15;
    building.position.x = buildingX;
    building.position.z = buildingZ
    building.position.y = building.scale.y * .5;
    buildingX += 2;
    if (buildingCounter == 6) {
      buildingCounter = -1;
      buildingX = -6;
      buildingZ += 2
    }
    buildingCounter++;
  };
  city.add(downtown);

  //----------------------------------------------------------------- particles
  var particleMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: .035
  });
  var particleGeography = new THREE.Geometry();
  for (var i = 0; i < 300; i++) {
    var smokeParticle = new THREE.Vector3(
      Math.random() * 12 - 6,
      Math.random() * 12 - 6,
      Math.random() * 12 - 6
    );
    particleGeography.vertices.push(smokeParticle);
  }
  _this.thePoints = new THREE.Points(particleGeography, particleMaterial);
  theParticles.add(_this.thePoints);
  city.add(theParticles);

  //----------------------------------------------------------------- Scene Lights

  sunLight = new THREE.DirectionalLight(0x000000, 0.5);

  sunLight.position.set(0, -2, -60);
  sunLight.castShadow = true;
  sunLight.shadow.camera.right = 8;
  sunLight.shadow.camera.left = -8;
  var sunLightHelper = new THREE.CameraHelper(sunLight.shadow.camera);
  _this.el.add(sunLightHelper);

  //----------------------------------------------------------------- Cars

  var carGeo = new THREE.CubeGeometry(.65, .025, .025);
  var carMatRanCol = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0x222222,
    shininess: 10
  });
  var targetVal = 8;
  var carOnX = true;
  var xCars = [];
  var xLights = [];
  var zCars = [];
  var zLights = [];
  var createCar = function () {
    var carLight = new THREE.PointLight(ranColor, 3.5, 2);
    var carMesh = new THREE.Mesh(carGeo, carMatRanCol);
    carMesh.position.y = .25;
    carLight.position.y = .25 - .01;
    if (carOnX) {
      carMesh.position.x = carLight.position.x = targetVal;
      xCars.push(carMesh);
      xLights.push(carLight);
      //  resetX(carMesh, carLight, Math.random() * 5 + 3);
    } else {
      carMesh.rotation.y = 90 * Math.PI / 180;
      carMesh.position.z = carLight.position.z = targetVal;
      carLight.position.y = .25;
      targetVal = -targetVal;
      // resetZ(carMesh, carLight, Math.random() * 5 + 3);
      zCars.push(carMesh);
      zLights.push(carLight);
    };

    carOnX = !carOnX;
  };

  for (var i = 0; i < 6; i++) {
    createCar();
  };

  var carLanes = [-5, -3, -1, 1, 3, 5];

  function tweenX(car, light, theDelay = 0) {
    //car.rotation.y = 0 * Math.PI / 180;
    ranColor.setHex(Math.random() * 0xffffff);
    car.material.color.set(ranColor);
    light.color.set(ranColor);
    var tweenTime = Math.random() * 2 + .15;

    TweenMax.to(light.position, tweenTime, {
      x: -car.position.x,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      x: -car.position.x,
      ease: Power2.easeInOut,
      delay: theDelay,
      onComplete: resetX,
      onCompleteParams: [car, light]
    });
  }

  function resetX(car, light, theDelay = 0) {
    var carZ = carLanes[Math.floor((Math.random() * 6))];
    var carY = Math.random() * 1.5 + .2;
    var tweenTime = 1;
    TweenMax.to(light.position, tweenTime, {
      z: carZ,
      y: carY,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      z: carZ,
      y: carY + .25,
      delay: theDelay,
      ease: Power2.easeInOut,
      onComplete: tweenX,
      onCompleteParams: [car, light]
    });
  }

  function tweenZ(car, light, theDelay = 0) {
    ranColor.setHex(Math.random() * 0xffffff);
    car.material.color.set(ranColor);
    light.color.set(ranColor);
    var tweenTime = Math.random() * 2 + .15;
    TweenMax.to(light.position, tweenTime, {
      z: -car.position.z,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      z: -car.position.z,
      delay: theDelay,
      ease: Power2.easeInOut,
      onComplete: resetZ,
      onCompleteParams: [car, light]
    });
  }

  function resetZ(car, light, theDelay = 0) {
    var carX = carLanes[Math.floor((Math.random() * 6))];
    var carY = Math.random() * 1.5 + .2;
    var tweenTime = 1;
    TweenMax.to(light.position, tweenTime, {
      x: carX,
      y: carY,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      x: carX,
      y: carY + .25,
      delay: theDelay,
      ease: Power2.easeInOut,
      onComplete: tweenZ,
      onCompleteParams: [car, light]
    });
  }

  function landCar(car, light) {


  console.log('landCar');
    var carY = 0;
    var tweenTime = 1;
    var theDelay = 0 ;

    TweenMax.killTweensOf(light.position);
    TweenMax.killTweensOf(car.position);
    
    TweenMax.to(light.position, tweenTime, {
    
      y: carY-.25,
      delay: theDelay,
      ease: Power2.easeOut
    });
    TweenMax.to(car.position, tweenTime, {
      y: carY ,
      delay: theDelay,
      ease: Power2.easeOut
  
    });
    
  }

  // ----------------------------------------------------------SKY

  sky = new THREE.Sky();
  sky.scale.setScalar(450000);
  _this.el.add(sky);

  sunObjectPos = new THREE.Object3D();
  sunObjectPos.position.y = -700000;

  var sunInclination = .515;
  var distance = 400000;
  var colorObject = {
    sunlightColor: '#000000'
  }
  var warmUpSunlight = function () {
    TweenMax.to(colorObject, 1, {
      delay: 0,
      sunlightColor: '#b5441a',
      ease: Power0.easeOut,
      onStart: function () {
        console.log('start to Warm Sunlight');
      },
      onComplete: coolSunlight
    });
  }
  var coolSunlight = function () {
    console.log('sunlight warmed');
    TweenMax.to(colorObject, 30, {
      delay: 20,
      sunlightColor: '#ecbe9e',
      ease: Power0.easeNone,
      onStart: function () {
        console.log('start to Cool Sunlight');
      },
      onComplete: function () {
        console.log('sunlight cooled');
      }
    });
  }
  var phi = 2 * Math.PI * (-.25);
  var uniforms = sky.material.uniforms;
  var theta = Math.PI * (sunInclination - 0.5);

  var sunset = function () {
    var sunObject = {
      sunInc: sunInclination
    }
    TweenMax.to(sunObject, 1, {
      sunInc: .515,
      ease: Power2.easeInOut,
      onUpdate: function () {
        sunInclination = sunObject.sunInc;
        console.log('onUpdate:   ' + sunInclination)
        theta = Math.PI * (sunInclination - 0.5);
        sunObjectPos.position.x = distance * Math.cos(phi);
        sunObjectPos.position.y = distance * Math.sin(phi) * Math.sin(theta);
        sunObjectPos.position.z = distance * Math.sin(phi) * Math.cos(theta);
        uniforms["sunPosition"].value.copy(sunObjectPos.position);
      }
    });
    TweenMax.to(sunLight.position, 1, {
      y: -2,
      ease: Power2.easeInOut

    });
    TweenMax.to(sunLight, 1, {
      intensity: .5,
      ease: Power2.easeInOut
    });
    TweenMax.to(colorObject, 1, {
      delay: 0,
      sunlightColor: '#000000',
      ease: Power0.easeOut,
      onUpdate: function () {
        sunLight.color.set(colorObject.sunlightColor);
      }
    });
  }
  var sunrise = function () {
    console.log('sunInclination: ' + sunInclination);
    if (rotateXSpeed > .04) {
      // console.log('');
      //  console.log('rotateXSpeed: ' + rotateXSpeed);
      rotateXSpeed *= .9925;
    }
    if (rotateYSpeed > .05) {
      //    console.log('rotateYSpeed: ' + rotateYSpeed);
      rotateYSpeed *= .9925;
    }

    sunInclination -= .00004
    theta = Math.PI * (sunInclination - 0.5);
    sunObjectPos.position.x = distance * Math.cos(phi);
    sunObjectPos.position.y = distance * Math.sin(phi) * Math.sin(theta);
    sunObjectPos.position.z = distance * Math.sin(phi) * Math.cos(theta);
    uniforms["sunPosition"].value.copy(sunObjectPos.position);
    sunLight.color.set(colorObject.sunlightColor);
    if (sunLight.intensity < 1.5) {
      sunLight.intensity += .0005;
    }
    sunLight.position.y += .02;
    if (sunLight.position.y > 150) {
      clearInterval(sunriseInterval);
    }
  }
  var nightIsOver = function () {
    warmUpSunlight();
    sunriseInterval = setInterval(sunrise, 40);
  }
  var rotateDown = function () {
    console.log('ROTATE rotateDown!!!')
    nightIsOver();
    clearInterval(rotateDownInterval);
    rotateYTime = true;
  }
  var rotateXTime = true;
  var rotateXSpeed = .35;
  var rotateYSpeed = .35;
  var rotateYTime = false;
  var rotateZTime = true;

  function spinCamera() {
    if (rotateXTime) {
      // controls.rotate(rotateXSpeed * Math.PI / 180);
    }
    if (rotateYTime) {
      // controls.rotateItUp(-rotateYSpeed * Math.PI / 180);
    }
    if (rotateZTime) {
      // controls.zoomDistance(.00000000001);
    }
  }
  //var rotateDownInterval = setInterval(rotateDown, 10000);
  // var spinCameraInterval = setInterval(spinCamera, 40);

  var rotateParticles = function () {
    //console.log('rotateParticles');

    theParticles.rotation.y += 0.002;
    theParticles.rotation.x += 0.002;
  }

  _this.el.add(city);
  city.rotateY(-4 * Math.PI / 180);

  this.start = function () {
    console.log('CitySceneObject.start');
    rotateDownInterval = setInterval(rotateDown, 3000);
    rotateParticlesInterval = setInterval(rotateParticles, 40);
    for (var i = 0; i < xCars.length; i++) {
      city.add(xLights[i]);
      city.add(xCars[i]);
      resetX(xCars[i], xLights[i], Math.random() * 5 + 3);

    }
    for (var i = 0; i < zCars.length; i++) {
      city.add(zLights[i]);
      city.add(zCars[i]);
      resetZ(zCars[i], zLights[i], Math.random() * 5 + 3);
    }
    _this.el.add(sunLight);
  }
  var sitCars = function () {
    for (var i = 0; i < xCars.length; i++) {
      city.remove(xLights[i]);
      city.remove(xCars[i]);
    }
    for (var i = 0; i < zCars.length; i++) {
      city.remove(zLights[i]);
      city.remove(zCars[i]);
    }

  }
  this.stop = function () {
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('CitySceneObject.stop');
    console.log('CitySceneObject.stop');
    console.log('CitySceneObject.stop');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    //  _this.el.remove(sunLight);
    clearInterval(sunriseInterval);
    clearInterval(rotateParticlesInterval);
    for (var i = 0; i < xCars.length; i++) {
      //city.remove(xLights[i]);
      //city.remove(xCars[i]);

      landCar(xCars[i], xLights[i])
    }
    for (var i = 0; i < zCars.length; i++) {
      // city.remove(zLights[i]);
      // city.remove(zCars[i]);
      landCar(zCars[i], zLights[i])
    }
    sunset();
  }


}



module.exports = CitySceneObject;