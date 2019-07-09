'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var tweenMax = require('tweenMax');
var SPRITE3D = require('../libs/sprite3DLib');
var HASH = require('../modules/hashModule');
var SOUNDS = require('../modules/soundsModule');
var Events = require('../classes/EventsClass');
var MapObj = require('../objects/mapObject');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var controls = require('../utils/GoodyOrbitControls');

var SCENE = (function () {
  var instance;
  var map;

  function init() {
    var parameters = {
      fogColor: '#000000',
      quality: 1,
      sectionHeight: 30
    };

    var $viewport;
    var renderer;
    var scene;
    var ambientLight;
    var moonLight;
    var moonLightLightTarget = new THREE.Object3D();

    var camera;
    var cameraShakeY = 0;
    var cameraShakeX = 0;
    var cameraTarget = new THREE.Vector3(0, 0, 0);
    var cameraShake = true;
    var frameId;
    var mouse = new THREE.Vector2();
    var mouseDown = false;
    var raycaster = new THREE.Raycaster();
    var isLocked = false;
    var isActive = false;
    var isStarted = false;

    var navFrozen = false;
    var theAtmosphereParticles;
    var theAtmosphereParticlesCity;
    var cityDevMode = false;
    var rotatePolarAngleObject = {
      rotateToPolarAngle: 1.5
    }
    var sections = [];
    var sectionData = [{
        //scene0 hello friend
        x: 0,
        y: 0,
        z: 0,
        fogDensity: 0.01,
        zCameraOffset: 60,
        forward: 10,
        backward: 100,
        cameraShake: true,
        rotateToPolarAngle: 1.5,
        minAzimuthAngle: -Math.PI * .25,
        maxAzimuthAngle: Math.PI * .2,
        minPolarAngle: Math.PI * .2,
        maxPolarAngle: Math.PI * .80,
        maxPolarAngleFinish: Math.PI * .80
      },
      {
        //scene1 creative writing
        x: 150,
        y: 0,
        z: -200,
        zCameraOffset: 60,
        fogDensity: 0.0125,
        forward: 20,
        backward: 150,
        cameraShake: true,
        rotateToPolarAngle: 1.5,
        minAzimuthAngle: -Math.PI * .25,
        maxAzimuthAngle: Math.PI * .25,
        minPolarAngle: Math.PI * .25,
        maxPolarAngle: Math.PI * .75,
        maxPolarAngleFinish: Math.PI * .75
      },
      {
        //scene2 story telling
        x: -150,
        y: -100,
        z: -600,
        zCameraOffset: 420,
        fogDensity: 0.0055,
        forward: 78,
        backward: 420,
        cameraShake: false,
        rotateToPolarAngle: 1.5,
        minAzimuthAngle: 0,
        maxAzimuthAngle: 0,
        minPolarAngle: Math.PI * .5,
        maxPolarAngle: Math.PI * .5,
        maxPolarAngleFinish: Math.PI * .5
        //   maxPolarAngleFinish: Math.PI * .5
      },
      {
        //scene3 campfire
        x: -150,
        y: -100,
        z: -620,
        zCameraOffset: 60,
        fogDensity: 0.0055,
        forward: 30,
        backward: 100,
        cameraShake: false,
        rotateToPolarAngle: 1.5,
        minAzimuthAngle: 0,
        maxAzimuthAngle: 0,
        minPolarAngle: Math.PI * .5,
        maxPolarAngle: Math.PI * .5,
        maxPolarAngleFinish: Math.PI * .5
      },
      {
        //scene4 city
        x: 150,
        y: -200,
        z: -620,
        zCameraOffset: 30,
        fogDensity: 0.025,
        forward: 10,
        //  backward: 2000,
        backward: 20,
        // backward: 420,
        cameraShake: false,
        rotateToPolarAngle: 0,
        minAzimuthAngle: -Math.PI * 2,
        maxAzimuthAngle: Math.PI * 2,
        minPolarAngle: 0,
        maxPolarAngle: 0,
        // maxPolarAngleFinish: Math.PI *2
        maxPolarAngleFinish: Math.PI * .45
      },
      {
        //scene5 birds
        x: 150,
        y: -180,
        z: -620,
        zCameraOffset: 10,
        fogDensity: 0.01,
        forward: 20,
        //  backward: 2000,
        backward: 1200,
        // backward: 420,
        cameraShake: false,
        rotateToPolarAngle: 0,
        minAzimuthAngle: -Math.PI * 2,
        maxAzimuthAngle: Math.PI * 2,
        minPolarAngle: 0,
        maxPolarAngle: 0,
        // maxPolarAngleFinish: Math.PI *2
        maxPolarAngleFinish: Math.PI * .45

      },
      {
        //scene6
        x: 50,
        y: -50,
        z: -1400,
        zCameraOffset: 60,
        fogDensity: 0.01,
        forward: 10,
        backward: 100,
        cameraShake: true,
        rotateToPolarAngle: 1.5,
        minAzimuthAngle: -Math.PI * .5,
        maxAzimuthAngle: Math.PI * .5,
        minPolarAngle: Math.PI * .1,
        maxPolarAngle: Math.PI * .9,
        maxPolarAngleFinish: Math.PI * .9
      }
    ];

    var sectionsMap = {};
    var totalSections;
    var currentIndex = 0;
    var previousIndex = 0;
    var events = new Events();

    function navigation() {
      function next() {
        jQuery('html,body').css('cursor', 'default');
        if (currentIndex === totalSections) {
          if (!isLocked) {
            events.trigger('end');
            currentIndex = 0;
            animateCamera(currentIndex);
          }
          return false;
        }
        currentIndex++;
        animateCamera(currentIndex);
      }

      function prev() {
        jQuery('html,body').css('cursor', 'default');
        if (currentIndex === 0) {
          return false;
        }
        currentIndex--;
        animateCamera(currentIndex);
      }

      document.addEventListener('mouseup', onDocumentMouseUp, false);
      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);
      document.addEventListener('mouseup', onDocumentMouseUp, false);

      function onDocumentMouseDown(event) {
        mouseDown = true;
        if (currentIndex == 4 && spinningDownStarted) {
          clearInterval(spinCameraDownInt);
        }
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var sectionNextBtn = raycaster.intersectObject(sections[currentIndex].getTheNextBtn(), true);
        if (sectionNextBtn.length > 0) {
          sections[currentIndex].theNextBtnIsDown();
        }
      }

      function onDocumentMouseUp(event) {
        if (currentIndex == 4 && spinningDownStarted) {
          if (controls.getPolarAngle() < sectionData[currentIndex].maxPolarAngleFinish) {
            clearInterval(spinCameraDownInt);
            spinCameraDownInt = setInterval(spinCameraDown, 40);
          }
        }

        mouseDown = false;
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var sectionNextBtn = raycaster.intersectObject(sections[currentIndex].getTheNextBtn(), true);
        if (sectionNextBtn.length > 0) {
          if (sections[currentIndex].nextBtnIsIn) {
            next();
          }
        }
      }

      function onDocumentTouchStart(event) {
        event.preventDefault();
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        onDocumentMouseUp(event);
      }
    }

    function setup() {

      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: false,
        precision: 'highp'

      });

      renderer.debug.checkShaderErrors = true;

      console.log('renderer.capabilities');
      console.table(renderer.capabilities);
      console.log('renderer.info');
      console.table(renderer.info);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.setClearColor('#000000', 1);
      renderer.setSize($viewport.width(), $viewport.height());
      $viewport.append(renderer.domElement);

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(parameters.fogColor, 0.01);

      ambientLight = new THREE.AmbientLight(0x404040, 1.5); // 
      scene.add(ambientLight);

      moonLight = new THREE.SpotLight(0xcccccc, 0.00, 0, Math.PI / 2);
      moonLight.position.set(sectionData[3].x + 0, sectionData[3].y + 610, sectionData[3].z - 650);
      moonLight.castShadow = true;
      scene.add(moonLight);
      moonLightLightTarget.position.set(sectionData[3].x + 0, sectionData[3].y + 10, sectionData[3].z - 155);
      moonLight.target = moonLightLightTarget;
      scene.add(moonLightLightTarget);

      var moonShadowCamera = new THREE.PerspectiveCamera(70, 1, 100, 3000)
      moonLight.shadow = new THREE.LightShadow(moonShadowCamera);
      moonLight.shadow.bias = 0.0001;

      camera = new THREE.PerspectiveCamera(190, $viewport.width() / $viewport.height(), 1, 8000);
      camera.position.set(0, 0, 60);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = .50;
      controls.enablePan = false;
      controls.enableZoom = true;
      controls.zoomSpeed = .5;
      controls.maxAzimuthAngle = Math.PI * .5;
      controls.maxDistance = 100;
      controls.maxPolarAngle = Math.PI * .90;
      controls.minAzimuthAngle = -Math.PI * .5;
      controls.minDistance = 10;
      controls.minPolarAngle = Math.PI * .1;

      function onMouseMove(event) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        var sectionNextBtn = raycaster.intersectObject(sections[currentIndex].getTheNextBtn(), true);
        if (sectionNextBtn.length > 0) {
          jQuery('html,body').css('cursor', 'pointer');
          if (!sections[currentIndex].nextBtnIsDown) {
            if (!mouseDown) {
              sections[currentIndex].theNextBtnIsOver();
            } else {
              sections[currentIndex].theNextBtnIsDown();
            }
          }
        } else {
          jQuery('html,body').css('cursor', 'default');
          if (sections[currentIndex].nextBtnIsOver) {
            if (!sections[currentIndex].nextBtnIsDown) {
              sections[currentIndex].theNextBtnIsOut();
            }
          }
          if (sections[currentIndex].nextBtnIsDown) {
            sections[currentIndex].theNextBtnIsUp();
          }
        }
      }
      jQuery(window).on('resize', onResize);
      $viewport.on('mousemove', onMouseMove);
      navigation();
      draw();
      return SCENE.getInstance();
    }

    function draw() {
      SPRITE3D.update();
      render();
      frameId = window.requestAnimationFrame(draw);
      stats.update();
    }

    function render() {
      if (cameraShake) {
        cameraShakeY += 0.005;
        cameraShakeX += 0.006;
        camera.position.y += Math.cos(cameraShakeY) / 50;
        camera.position.x += Math.cos(cameraShakeX) / 50;
      }
      controls.target = cameraTarget;
      controls.update();
      renderer.render(scene, camera);
    }

    function onResize() {
      camera.aspect = $viewport.width() / $viewport.height();
      camera.updateProjectionMatrix();
      sections[2].handleResize();
      renderer.setSize($viewport.width(), $viewport.height());
    }

    var spinCameraDownInt;
    var spinningDownStarted = false;
    var rotateDownSpeed = .01;

    function cityCameraDownInt() {
      rotateDownSpeed = .01;
      spinningDownStarted = true;
      tweenMax.to(scene.fog, 10, {
        delay: 5,
        density: 0.001,
        ease: Power2.easeInOut
      });
      spinCameraDownInt = setInterval(spinCameraDown, 40);
    }

    function spinCameraDown() {
      if (currentIndex !== 4) {
        clearInterval(spinCameraDownInt);
      }
      if (!mouseDown) {
        if (rotateDownSpeed < .35) {
          rotateDownSpeed *= 1.01;
        }
        controls.rotateItUp(-rotateDownSpeed * Math.PI / 180);
        if (controls.getPolarAngle() >= sectionData[currentIndex].maxPolarAngleFinish) {
          clearInterval(spinCameraDownInt);
        }
      }
    }

    function flyCameraBirdSection() {

      tweenMax.to(camera.position, 10, {
        delay: 2,
        // x: nextPosition.x,
        y: nextPosition.y + 1000,
        z: nextPosition.z + 50,
        ease: Power2.easeInOut,

        onComplete: function () {
          console.log('bird fly done');
          controls.minDistance = 50;


        }
      });

      tweenMax.to(cameraTarget, 10, {
        delay: 2,
        x: nextPosition.x,
        y: nextPosition.y +500,
        z: nextPosition.z,
        ease: Power2.easeInOut
      });

    }

    var nextPosition;
    var toFromCallbackData;

    function animateCamera(index) {
      navFrozen = true;

      controls.autoRotateSpeed = 0;
      currentIndex = index;
      cameraShakeY = 0;
      cameraShakeX = 0;

      nextPosition = {
        x: sectionData[currentIndex].x,
        y: sectionData[currentIndex].y,
        z: sectionData[currentIndex].z,
        zCameraOffset: sectionData[currentIndex].zCameraOffset
      }
      toFromCallbackData = {
        from: {
          name: sectionsMap[previousIndex],
          index: previousIndex
        },
        to: {
          name: sectionsMap[index],
          index: index
        },
        callback: {
          func: contAnimateCamera
        }
      };
      console.log('previousIndex: ' + previousIndex);
      console.log('currentIndex: ' + currentIndex);
      if (previousIndex == 0 || previousIndex == 1 || previousIndex == 4 || previousIndex == 5 || previousIndex == 6) {
        clearInterval(spinCameraDownInt);
        spinningDownStarted = false;
        controls.autoRotate = false;
        tweenMax.killTweensOf(controls);
        tweenMax.killTweensOf(scene.fog);

        tweenMax.to(controls, 2, {
          ease: Power2.easeInOut,
          minAzimuthAngle: 0,
          maxAzimuthAngle: 0,
          minPolarAngle: Math.PI * .45,
          maxPolarAngle: Math.PI * .45,
          onUpdate: function () {
            // console.log(controls.getAzimuthalAngle())
          },
          onComplete: function () {
            events.trigger('section:changeBegin', toFromCallbackData);
          }
        });
      } else {
        events.trigger('section:changeBegin', toFromCallbackData);
      }
    }

    function contAnimateCamera() {
      console.log('contAnimateCamera');
      var cameraTargetYOffset = 0;
      var tweenTime = 3.0;
      var index = currentIndex;
      var theDelay = 0;
      if (currentIndex == 0 || currentIndex == 1 || currentIndex == 4 || currentIndex == 5 || currentIndex == 6) {
        TweenMax.to(moonLight, tweenTime, {
          delay: theDelay,
          distance: 0,
          intensity: 0,
          ease: Power1.easeInOut
        });
      }
      if (currentIndex == 2 || currentIndex == 3) {
        TweenMax.to(moonLight, tweenTime, {
          delay: 0,
          intensity: 5,
          distance: 1450,
          ease: Power1.easeInOut
        });
      }
      if (currentIndex == 5) {
        cameraTargetYOffset = -20;
      }
      tweenMax.to(scene.fog, tweenTime, {
        delay: theDelay,
        density: sectionData[currentIndex].fogDensity,
        ease: Power2.easeInOut
      });
      tweenMax.to(camera.position, tweenTime, {
        delay: theDelay,
        x: nextPosition.x,
        y: nextPosition.y,
        z: nextPosition.z + nextPosition.zCameraOffset,
        ease: Power2.easeInOut,
        onStart: function () {
          // SOUNDS.wind.play();
        },
        onComplete: function () {
          if (previousIndex === index) {
            return false;
          }
          events.trigger('section:changeComplete', toFromCallbackData);
          cameraShake = sectionData[currentIndex].cameraShake;
          previousIndex = index;
          navFrozen = false;
          if (index == 5) {
            flyCameraBirdSection();
          }

        }
      });

      tweenMax.to(cameraTarget, tweenTime, {
        delay: theDelay,
        x: nextPosition.x,
        y: nextPosition.y + cameraTargetYOffset,
        z: nextPosition.z,
        ease: Power2.easeInOut
      });

      tweenMax.to(controls, tweenTime, {
        delay: theDelay,
        minAzimuthAngle: sectionData[currentIndex].minAzimuthAngle,
        maxAzimuthAngle: sectionData[currentIndex].maxAzimuthAngle,
        minPolarAngle: sectionData[currentIndex].minPolarAngle,
        maxPolarAngle: sectionData[currentIndex].maxPolarAngle,
        minDistance: sectionData[currentIndex].forward,
        maxDistance: sectionData[currentIndex].backward,
        ease: Power2.easeInOut
      });
      tweenMax.to(controls, .1, {
        delay: theDelay + tweenTime + .1,
        maxPolarAngle: sectionData[currentIndex].maxPolarAngleFinish,
        ease: Power2.easeInOut
      });
    }
    return {
      setViewport: function ($el) {
        $viewport = $el;
        setup();
      },
      config: function (options) {
        parameters = jQuery.extend(parameters, options);
      },
      addSections: function (_sections) {
        sections = _sections;
        totalSections = sections.length - 1;
        for (var i = 0, j = sections.length; i < j; i++) {
          var section = sections[i];
          section.sceneRenderer = renderer;
          sectionsMap[i] = section.name;
          section.el.position.x = sectionData[i].x;
          section.el.position.y = sectionData[i].y;
          section.el.position.z = sectionData[i].z;
          scene.add(section.el);
          if (i > 0) {
            section.hide();
          }
        }
        if (cityDevMode) {
          // set cityDevMode to true to add helper to sunlight shadow cam in city scene
          scene.add(new THREE.CameraHelper(sections[4].theSunlight().shadow.camera));
        }
        for (var i = 0; i < sections.length; i++) {
          sections[i].on('sectionFullyLoaded', function () {
            events.trigger('sectionFullyLoaded', this);
          });
          sections[i].on('sectionUnloaded', function () {
            events.trigger('sectionUnloaded', this);
          });
          sections[i].on('sectionIsIn', function () {
            events.trigger('sectionIsIn', this);
          });
          sections[i].on('logAnalytics', function () {
            var visitor = HASH.hash;
            if (visitor == undefined) {
              visitor = "friend";
            }
            visitor = visitor += ("_" + this.section);
            visitor = visitor += "_dev";
            gtag('event', visitor);
          });
        }
        // special listening and init
        sections[4].finalInit();
        sections[4].on('sectionFullyLoaded', function () {
          controls.autoRotateSpeed = 0;
          controls.autoRotate = true;
          tweenMax.to(controls, 10, {
            autoRotateSpeed: .4,
            ease: Power2.easeInOut,
            onComplete: cityCameraDownInt
          });
        });

        sections[5].finalInit();

        sections[5].on('sectionFullyLoaded', function () {
          console.log('sectionFullyLoaded');
        });

        sections[5].finalInit();

        theAtmosphereParticles = new BackgroundParticles({
          rangeX: [-200, 200],
          rangeY: [-200, 200],
          rangeZ: [0, 800],
          count: 500,
          strips: false,
          color1: '#ffffff',
          color2: '#ffffff'
        });
        scene.add(theAtmosphereParticles.el);

        theAtmosphereParticlesCity = new BackgroundParticles({
          rangeX: [-100, 200],
          rangeY: [-50, -185],
          rangeZ: [-580, -660],
          count: 200,
          particleSize: 0.25,
          strips: false,
          color1: '#ffffff',
          color2: '#ffffff'
        });
        scene.add(theAtmosphereParticlesCity.el);
      },
      on: function () {
        events.on.apply(events, arguments);
      },
      goTo: function (index) {
        if (index === currentIndex) {
          return false;
        }
        if (navFrozen) {
          return false;
        }
        animateCamera(index);
      },
      getMap: function () {
        map = new MapObj();
        for (var i = 0, j = sections.length; i < j; i++) {
          map.addNode(i);
        }
        return map;
      },
      start: function () {
        isActive = true;
        if (!isStarted) {
          var data = {
            from: {
              name: sectionsMap[previousIndex],
              index: previousIndex
            },
            to: {
              name: sectionsMap[currentIndex],
              index: currentIndex
            },
            callback: {
              func: function () {
                // placeholder function 
              }
            }
          };
          events.trigger('section:changeBegin', data);
          isStarted = true;
        }
        if (!frameId) {
          draw();
        }
      },
      stop: function () {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = undefined;
          isActive = false;
        }
      },
      quality: function (value) {
        resolution = value;
        renderer.setSize($viewport.width(), $viewport.height());
      },
      lock: function () {
        isLocked = true;
      },
      unlock: function () {
        isLocked = false;
      },
      in: function () {
        tweenMax.to({
          fov: 190,
          speed: 0
        }, 2, {
          delay: .35,
          bezier: {
            type: 'soft',
            values: [{
              speed: 20
            }, {
              speed: 0
            }]
          },
          fov: 60,
          ease: 'easeOutCubic',
          onUpdate: function () {
            camera.fov = this.target.fov;
            camera.updateProjectionMatrix();
          }
        });
      }
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

module.exports = SCENE.getInstance();