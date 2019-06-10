'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var tweenMax = require('tweenMax');
var SPRITE3D = require('../libs/sprite3DLib');
var SOUNDS = require('../modules/soundsModule');
var Events = require('../classes/EventsClass');
var MapObj = require('../objects/mapObject');
var BackgroundParticles = require('../objects/backgroundParticlesObject');
var controls = require('../objects/GoodyOrbitControls');

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
    var isScrolling = false;
    var theAtmosphereParticles;
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
        y: 200,
        z: -600,
        zCameraOffset: 420,
        forward: 78,
        backward: 420,
        cameraShake: false,
        rotateToPolarAngle: 1.5,
        minAzimuthAngle: 0,
        maxAzimuthAngle: 0,
        minPolarAngle: Math.PI * .5,
        maxPolarAngle: Math.PI * .5,
        maxPolarAngleFinish: Math.PI * .5
      },
      {
        //scene3 campfire
        x: -150,
        y: 200,
        z: -620,
        zCameraOffset: 60,
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
        y: 400,
        z: -820,
        zCameraOffset: 30,
        forward: 10,
        backward: 20,
        //backward: 420,
        cameraShake: false,

        rotateToPolarAngle: 0,
        minAzimuthAngle: -Math.PI,
        maxAzimuthAngle: Math.PI * 2,
        minPolarAngle: 0,
        maxPolarAngle: 0,
       
       // maxPolarAngle: Math.PI * .45,
        maxPolarAngleFinish: Math.PI * .45
        // maxPolarAngleFinish: Math.PI
      },
      {
        //scene5
        x: 0,
        y: 50,
        z: -1200,
        zCameraOffset: 60,
        forward: 10,
        backward: 100,
        cameraShake: true,

        rotateToPolarAngle: 1.5,
        minAzimuthAngle: -Math.PI * .5,
        maxAzimuthAngle: Math.PI * .5,
        minPolarAngle: Math.PI * .1,
        maxPolarAngle: Math.PI * .9,
        maxPolarAngleFinish: Math.PI * .9

      },
      {
        //scene6
        x: 50,
        y: -50,
        z: -1400,
        zCameraOffset: 60,
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
        console.log('');
        console.log('next');
        console.log('currentIndex ' + currentIndex);
        console.log('totalSections ' + totalSections);
        console.log('isLocked ' + isLocked);
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
        if (currentIndex == 4) {
          clearInterval(spinCameraDownInt);
        }
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var sectionNextBtn = raycaster.intersectObject(sections[currentIndex].getTheNextBtn().el, true);
        if (sectionNextBtn.length > 0) {
          sections[currentIndex].theNextBtnIsDown();
        }
      }

      function onDocumentMouseUp(event) {
   
        if (currentIndex == 4) {
          if (controls.getPolarAngle() <  sectionData[currentIndex].maxPolarAngleFinish) {
            spinCameraDownInt = setInterval(spinCameraDown, 40);
          }
        }
        mouseDown = false;
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var sectionNextBtn = raycaster.intersectObject(sections[currentIndex].getTheNextBtn().el, true);
        if (sectionNextBtn.length > 0) {
          next();
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
        antialias: false
      });

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.setClearColor('#000000', 1);
      renderer.setSize($viewport.width(), $viewport.height());
      $viewport.append(renderer.domElement);

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(parameters.fogColor, 0.01);
      //scene.fog = new THREE.FogExp2(parameters.fogColor, 0.000001);

      ambientLight = new THREE.AmbientLight(0x404040); // 
      scene.add(ambientLight);

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

        var sectionNextBtn = raycaster.intersectObject(sections[currentIndex].getTheNextBtn().el, true);
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
    function cityCameraDownInt() {
      console.log('cityCameraDownInt');
      rotateDownSpeed = .01;
      spinCameraDownInt = setInterval(spinCameraDown, 40);
    }

    var rotateDownSpeed = .01;

    function spinCameraDown() {
      console.log('spinCameraDown');
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

    function animateCamera(index) {
     
      var tweenTime = 3.0;
      if (currentIndex == 4) {
        console.log('spinCameraDownInt');
        console.log(spinCameraDownInt);
        clearInterval(spinCameraDownInt);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0;
        tweenMax.killTweensOf(controls);
      }

      currentIndex = index;
      cameraShakeY = 0;
      cameraShakeX = 0;

      var nextPosition = {
        x: sectionData[currentIndex].x,
        y: sectionData[currentIndex].y,
        z: sectionData[currentIndex].z,
        zCameraOffset: sectionData[currentIndex].zCameraOffset
      }
      var data = {
        from: {
          name: sectionsMap[previousIndex],
          index: previousIndex
        },
        to: {
          name: sectionsMap[index],
          index: index
        },
      };


      events.trigger('section:changeBegin', data);

      var theDelay = 1.35;
      tweenMax.to(camera.position, tweenTime, {
        delay: theDelay,
        x: nextPosition.x,
        y: nextPosition.y,
        z: nextPosition.z + nextPosition.zCameraOffset,
        ease: Power2.easeInOut,
        onStart: function () {
          isScrolling = true;
          // SOUNDS.wind.play();

        },
        onComplete: function () {
          if (previousIndex === index) {
            return false;
          }
          isScrolling = false;
          events.trigger('section:changeComplete', data);
          cameraShake = sectionData[currentIndex].cameraShake;
          previousIndex = index;
        }
      });

      tweenMax.to(cameraTarget, tweenTime, {
        delay: theDelay,
        x: nextPosition.x,
        y: nextPosition.y,
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
        ease: Power2.easeInOut,
        onComplete: function () {
          console.log('controls onComplete');
        }
      });
      tweenMax.to(controls, .1, {
        delay: theDelay + tweenTime + .1,
        maxPolarAngle: sectionData[currentIndex].maxPolarAngleFinish,
        ease: Power2.easeInOut,
        onComplete: function () {
          console.log('controls onComplete maxPolarAngleFinish');
        }
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
          sectionsMap[i] = section.name;
          section.el.position.x = sectionData[i].x;
          section.el.position.y = sectionData[i].y;
          section.el.position.z = sectionData[i].z;
          scene.add(section.el);
          if(i>0){
            section.hide();
          }
        }
        // set cityDevMode to true to add helper to sunlight shadow cam in city scene

        if (cityDevMode) {
          scene.add(new THREE.CameraHelper(sections[4].theSunlight().shadow.camera));
        }

        sections[4].on('cityLightsAreOn', function () {
          console.log('cityLights are on IN FOUR: ' + this.data);
          controls.autoRotateSpeed = 0;
          controls.autoRotate = true;
          tweenMax.to(controls, 10, {
            autoRotateSpeed: .4,
            ease: Power2.easeInOut,
            onComplete: cityCameraDownInt
          });

        });

        theAtmosphereParticles = new BackgroundParticles({
          rangeX: [-100, 100],
          rangeY: [-100, 100],
          rangeZ: [0, -1400],
          count: 150,
          strips: false,
          color1: '#ffffff',
          color2: '#ffffff'
        });
        scene.add(theAtmosphereParticles.el);
      },
      on: function () {

        events.on.apply(events, arguments);
      },
      goTo: function (index) {
        if (index === currentIndex) {
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