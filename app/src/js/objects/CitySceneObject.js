'use strict';
var THREE = require('three');
var skyMaterial = require('../materials/skyMaterial');
var Events = require('../classes/EventsClass');

function CitySceneObject() {
  this.el = new THREE.Object3D();
  var _this = this;
  var city = new THREE.Object3D();
  var theParticles = new THREE.Object3D();
  var downtown = new THREE.Object3D();
  var carlights = new THREE.Object3D();
  var sky, sunObjectPos;
  var sunObject = {
    sunInc: .515
  }
  var sunColorObject = {
    sunlightColor: '#000000',
    sunColor: '#fb3203'
  };
  var ranColor = new THREE.Color(0xffffff);
  var rotateParticlesInt;
  var sunriseInt;
  var sunSphere;
  var buildings = [];
  var numberOfCars = 10;
  this.events = new Events();

  this.on = function () {
    _this.events.on.apply(_this.events, arguments);
  }

  this.finalInit = function (sceneRenderer) {
    numberOfCars = sceneRenderer.capabilities.maxTextures - 4;
    if (numberOfCars > 10) {
      numberOfCars = 10
    }
    for (var i = 0; i < numberOfCars; i++) {
      createCar();
    };
  }

  var grountMat = new THREE.MeshPhongMaterial({
    color: 0x111111,
    specular: 0xffffff,
    shininess: 20,
    side: THREE.DoubleSide
  });

  var ground = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), grountMat);
  ground.rotation.x = -90 * Math.PI / 180;
  ground.position.y = -0.001;
  ground.receiveShadow = true;
  ground.both = true;
  city.add(ground);

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
    })
  ];

  var buildingGeo = new THREE.CubeGeometry(1, 0, 0, segments, segments, segments);
  var buildingWidth = 0.85;
  var buildingX = -6;
  var buildingZ = -6;
  var buildingHeight;
  var buildingCounter = 0;

  for (var i = 0; i < 49; i++) {
    var building = new THREE.Mesh(buildingGeo, buildingMatArray[Math.floor(Math.random() * 7)]);
    downtown.add(building);
    buildings.push(building);
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
    size: .060
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

  //----------------------------------------------------------------- Sky and Light
  _this.sunLight = new THREE.DirectionalLight(0x000000, 0.5);
  _this.sunLight.position.set(0, 0, -60);
  _this.sunLight.castShadow = true;
  _this.sunLight.shadow.camera.right = 8;
  _this.sunLight.shadow.camera.left = -8;
  _this.sunLight.shadow.camera.top = 6;
  _this.sunLight.shadow.camera.near = 0;
  _this.sunLight.shadow.camera.far = 110;

  var storyLightSpotlightTarget2 = new THREE.Object3D();
  _this.el.add(storyLightSpotlightTarget2);
  _this.sunLight.target = storyLightSpotlightTarget2;

  sky = new THREE.Sky();
  sky.scale.setScalar(450000);

  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(165, 16, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      fog: false
    })
  );

  sunSphere.castShadow = false;
  sunSphere.receiveShadow = false;
  var sunYOffset = 100;
  sunObjectPos = new THREE.Object3D();
  sunObjectPos.position.y = -700000;
  sunObject = {
    sunInc: .515
  }

  //----------------------------------------------------------------- Cars

  var carGeo = new THREE.CubeGeometry(.65, .025, .025);
  var carMatRanCol = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 15
  });
  var targetVal = 8;
  var carOnX = true;
  var xCars = [];
  var xLights = [];
  var zCars = [];
  var zLights = [];

  var createCar = function () {
    var carLight = new THREE.PointLight(0xffffff, 0.05, 1.9);
    carLight.castShadow = false;

    var carMesh = new THREE.Mesh(carGeo, carMatRanCol);
    city.add(carMesh);
    carMesh.castShadow = false;
    carMesh.receiveShadow = false;
    carlights.add(carLight);
    carMesh.position.y = .25;
    carLight.position.y = .25 - .01;

    if (carOnX) {
      carMesh.position.x = carLight.position.x = targetVal;
      xCars.push(carMesh);
      xLights.push(carLight);
    } else {
      carMesh.rotation.y = 90 * Math.PI / 180;
      carMesh.position.z = carLight.position.z = targetVal;
      targetVal = -targetVal;
      zCars.push(carMesh);
      zLights.push(carLight);
    };
    carOnX = !carOnX;
  };

  var carLanes = [-5, -3, -1, 1, 3, 5];

  function tweenX(car, light) {
    ranColor.setHex(Math.random() * 0xffffff);
    car.material.color.set(ranColor);
    car.material.specular.set(ranColor);
    light.color.set(ranColor);
    var tweenTime = Math.random() * 2 + .5;
    TweenMax.to(light.position, tweenTime, {
      x: -car.position.x,
      delay: 0,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      x: -car.position.x,
      ease: Power2.easeInOut,
      delay: 0,
      onComplete: resetX,
      onCompleteParams: [car, light]
    });
  }

  function newPos(currentPos) {
    var nuPos = Math.floor((Math.random() * 6));
    if (carLanes[nuPos] == currentPos) {
      return newPos(currentPos);
    } else {
      return nuPos;
    }
  }

  function resetX(car, light) {
    var carZ = carLanes[newPos(car.position.z)];
    var carY = Math.random() * 1.4 + .1;
    var tweenTime = 1;
    TweenMax.to(light.position, tweenTime, {
      z: carZ,
      y: carY + .1,
      delay: 0,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      z: carZ,
      y: carY,
      delay: 0,
      ease: Power2.easeInOut,
      onComplete: tweenX,
      onCompleteParams: [car, light]
    });
  }

  function resetXStart(car, light, theDelay) {
    var carZ = carLanes[Math.floor((Math.random() * 6))];
    var carY = Math.random() * 1.4 + .1;
    var tweenTime = 1;
    TweenMax.to(light.position, tweenTime, {
      z: carZ,
      y: carY + .1,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(light, tweenTime, {
      intensity: 2,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      z: carZ,
      y: carY,
      delay: theDelay,
      ease: Power2.easeInOut,
      onComplete: tweenX,
      onCompleteParams: [car, light]
    });
  }

  function tweenZ(car, light) {
    ranColor.setHex(Math.random() * 0xffffff);
    car.material.color.set(ranColor);
    car.material.specular.set(ranColor);
    light.color.set(ranColor);
    var tweenTime = Math.random() * 2 + .5;
    TweenMax.to(light.position, tweenTime, {
      z: -car.position.z,
      delay: 0,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      z: -car.position.z,
      delay: 0,
      ease: Power2.easeInOut,
      onComplete: resetZ,
      onCompleteParams: [car, light]
    });
  }

  function resetZ(car, light) {
    var carX = carLanes[newPos(car.position.z)];
    var carY = Math.random() * 1.4 + .1;
    var tweenTime = 1;
    TweenMax.to(light.position, tweenTime, {
      x: carX,
      y: carY + .1,
      delay: 0,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      x: carX,
      y: carY,
      delay: 0,
      ease: Power2.easeInOut,
      onComplete: tweenZ,
      onCompleteParams: [car, light]
    });
  }

  function resetZStart(car, light, theDelay) {
    var carX = carLanes[Math.floor((Math.random() * 6))];
    var carY = Math.random() * 1.4 + .1;
    var tweenTime = 1;
    TweenMax.to(light.position, tweenTime, {
      x: carX,
      y: carY + .1,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(light, tweenTime, {
      intensity: 2,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      x: carX,
      y: carY,
      delay: theDelay,
      ease: Power2.easeInOut,
      onComplete: tweenZ,
      onCompleteParams: [car, light]
    });
  }
  function landCar(car, light) {
    var carY = 0;
    var tweenTime = 1;
    var theDelay = 0;
    TweenMax.killTweensOf(light.position);
    TweenMax.killTweensOf(car.position);
    TweenMax.to(light.position, tweenTime, {
      y: carY,
      delay: theDelay,
      ease: Power2.easeOut,
      onComplete: function () {}
    });
    TweenMax.to(light, tweenTime, {
      intensity: 0,
      delay: theDelay,
      ease: Power2.easeInOut
    });
    TweenMax.to(car.position, tweenTime, {
      y: carY,
      delay: theDelay,
      ease: Power2.easeOut
    });
  }
  var warmUpSunlight = function () {
    TweenMax.to(sunColorObject, 20, {
      delay: 25,
      sunlightColor: '#b5441a',
      ease: Power0.easeOut,
      onComplete: coolSunlight
    });
    TweenMax.to(sunColorObject, 10, {
      sunColor: '#fdfdf5',
      delay: 15,
      ease: Power0.easeOut
    });
  }
  var coolSunlight = function () {
    TweenMax.to(sunColorObject, 30, {
      delay: 20,
      sunlightColor: '#ecbe9e',
      ease: Power0.easeNone
    });

  }
  var phi = 2 * Math.PI * (-.25);
  var uniforms = sky.material.uniforms;
  var sunInclination = .525;
  var theta = Math.PI * (sunInclination - 0.5);
  var distance = 400000;
  var sunDistance = 6400;
  var sunset = function () {
    sunObject.sunInc = sunInclination;
    TweenMax.to(sunObject, 1, {
      sunInc: .525,
      ease: Power2.easeInOut,
      onUpdate: function () {
        sunInclination = sunObject.sunInc;
        theta = Math.PI * (sunInclination - 0.5);
        sunObjectPos.position.x = distance * Math.cos(phi);
        sunObjectPos.position.y = distance * Math.sin(phi) * Math.sin(theta);
        sunObjectPos.position.z = distance * Math.sin(phi) * Math.cos(theta);
        sunSphere.position.x = sunDistance * Math.cos(phi);
        sunSphere.position.y = sunDistance * Math.sin(phi) * Math.sin(theta) - sunYOffset;
        sunSphere.position.z = sunDistance * Math.sin(phi) * Math.cos(theta);
        uniforms["sunPosition"].value.copy(sunObjectPos.position);
      },
      onComplete: function () {
        _this.el.remove(_this.sunLight);
        _this.el.remove(sky);
        city.remove(carlights);
        _this.el.remove(sunSphere);
        _this.events.trigger('sectionUnloaded', {
          message: 'CityScene is Unloaded'
        });
      }
    });
    TweenMax.to(_this.sunLight.position, 1, {
      y: 0,
      ease: Power2.easeInOut
    });
    TweenMax.to(_this.sunLight, 1, {
      intensity: 0,
      ease: Power2.easeInOut
    });
    TweenMax.to(sunColorObject, 1, {
      delay: 0,
      sunlightColor: '#000000',
      sunColor: '#fb3203',
      ease: Power0.easeOut,
      onUpdate: function () {
        _this.sunLight.color.set(sunColorObject.sunlightColor);
        sunSphere.material.color.set(sunColorObject.sunColor);
      },
      onComplete: function () {
        sunColorObject.sunColor = '#000000';
        sunSphere.material.color.set(sunColorObject.sunColor);
      }
    });
  }
  var sunrise = function () {
    sunInclination -= .00004
    theta = Math.PI * (sunInclination - 0.5);
    console.log('sunInclination:' + sunInclination);

    sunObjectPos.position.x = distance * Math.cos(phi);
    sunObjectPos.position.y = distance * Math.sin(phi) * Math.sin(theta);
    sunObjectPos.position.z = distance * Math.sin(phi) * Math.cos(theta);

    sunSphere.position.x = sunDistance * Math.cos(phi);
    sunSphere.position.y = sunDistance * Math.sin(phi) * Math.sin(theta) - sunYOffset;
    sunSphere.position.z = sunDistance * Math.sin(phi) * Math.cos(theta);

    uniforms["sunPosition"].value.copy(sunObjectPos.position);

    _this.sunLight.color.set(sunColorObject.sunlightColor);
    sunSphere.material.color.set(sunColorObject.sunColor);

    if (_this.sunLight.intensity < 1.5) {
      _this.sunLight.intensity += .0005;
    }
    _this.sunLight.position.y += .015;

    if (_this.sunLight.position.y > 70) {
      clearInterval(sunriseInt);
    }
  }
  var nightIsOver = function () {
    warmUpSunlight();
    sunriseInt = setInterval(sunrise, 40);
  }
  var rotateParticles = function () {
    theParticles.rotation.y += 0.002;
    theParticles.rotation.x += 0.002;
  }
  _this.el.add(city);
  city.rotateY(-4 * Math.PI / 180);

  var nightOverTimer;

  this.start = function () {
    sunColorObject.sunlightColor = '#000000';
    sunColorObject.sunColor = '#fb3203';
    var lightDelay = 0;
    city.add(carlights);
    for (var i = 0; i < xCars.length; i++) {
      xLights[i].color.set(0xffffff);
      xCars[i].position.z = xLights[i].position.z = 0;
      xCars[i].position.y = .25;
      xLights[i].position.y = .5;
      xCars[i].position.x = xLights[i].position.x = targetVal;
      xLights[i].intensity = 0;
      TweenMax.to(xLights[i], .35, {
        intensity: .5,
        delay: lightDelay,
        ease: Power2.easeInOut
      });
      resetXStart(xCars[i], xLights[i], Math.random() * 5 + lightDelay);
      lightDelay += .3

      zLights[i].color.set(0xffffff);
      zCars[i].position.x = zLights[i].position.x = 0;
      zCars[i].position.y = .25;
      zLights[i].position.y = .5;
      zCars[i].position.z = zLights[i].position.z = targetVal;
      zLights[i].intensity = 0;
      city.add(zLights[i]);
      TweenMax.to(zLights[i], .35, {
        intensity: .5,
        delay: lightDelay,
        ease: Power2.easeInOut
      });
      resetZStart(zCars[i], zLights[i], Math.random() * 5 + lightDelay);
      targetVal = -targetVal;
      lightDelay += .3
    }
    lightDelay += .5

    _this.el.add(_this.sunLight);
    _this.el.add(sky);
    _this.el.add(sunSphere);
    sunSphere.position.x = 0;
    sunSphere.position.y = 0;
    sunSphere.position.z = -10000;
    nightOverTimer = setTimeout(nightIsOver, 1000);
    rotateParticlesInt = setInterval(rotateParticles, 40);
    _this.events.trigger('sectionFullyLoaded', {
      message: 'City is Loaded'
    });
  }

  this.onOut = function () {
    clearTimeout(nightOverTimer);
    clearInterval(sunriseInt);
    clearInterval(rotateParticlesInt);
    TweenMax.killTweensOf(sunColorObject);
    TweenMax.killTweensOf(_this.sunLight.position);
    TweenMax.killTweensOf(_this.sunLight);
    for (var i = 0; i < xCars.length; i++) {
      landCar(xCars[i], xLights[i])
    }
    for (var i = 0; i < zCars.length; i++) {
      landCar(zCars[i], zLights[i])
    }
    sunset();
  }
  this.onStop = function () {
    _this.sunLight.color.set(sunColorObject.sunlightColor);
    sunSphere.material.color.set(sunColorObject.sunColor);
  }
}
CitySceneObject.prototype.theSunlight = function () {
  return this.sunLight;
}
module.exports = CitySceneObject;