'use strict';

var jQuery = require('jquery');

var THREE = require('three');

var tweenMax = require('tweenMax');

var SPRITE3D = require('../libs/sprite3DLib');

var SOUNDS = require('../modules/soundsModule');

var Events = require('../classes/EventsClass');

var MapObj = require('../objects/mapObject');

var BackgroundParticles = require('../objects/backgroundParticlesObject');

var BackgroundLines = require('../objects/BackgroundLinesObject');

var SCENE = (function () {

  var instance;

  function init() {

    // params
    var parameters = {
      fogColor: '#000000',
      quality: 1,
      sectionHeight: 30
    };

    // DOM element
    var $viewport;
    var width;
    var height;

    // THREE Scene
    var resolution;
    var renderer;
    var scene;

    //lights
    var light;
    var moonLight;
    var fireLight;
    var fireLight2;
    var animateTheFire;

    //camera
    var camera;
    var cameraShakeY = 0;
    var cameraShakeX = 0;
    var cameraPointAt = new THREE.Vector3(0, 0, 0);
    var cameraShake = true;

    var frameId;
    // mouse
    var mouse = new THREE.Vector2();
    var mouseDown = false;
    var raycaster = new THREE.Raycaster();

    // general
    var isLocked = false;
    var isActive = false;
    var isStarted = false;

    // camera
    var isScrolling = false;

    // background lines and particles
    var theAtmosphereParticles;

    var sectionLines0;
    var theSectionParticles0;
    var sectionLines1;
    var theSectionParticles1;
    var sectionLines2;
    var theSectionParticles2;
    var sectionLines3;
    var theSectionParticles3;
    var sectionLines4;
    var theSectionParticles4;
    var sectionLines5;
    var theSectionParticles5;
    var sectionLines6;
    var theSectionParticles6;

    // sections
    var sections = [];
    var sectionLocations = [{
        x: 0,
        y: 0,
        z: 0
      },
      {
        x: 200,
        y: 0,
        z: -200
      },
      {
        x: 50,
        y: -50,
        z: -400
      },
      {
        x: 0,
        y: 50,
        z: -600
      },
      {
        x: -50,
        y: -50,
        z: -800
      },
      {
        x: 0,
        y: 50,
        z: -1000
      },
      {
        x: 50,
        y: -50,
        z: -1200
      }
    ];
    var sectionZoomOffset = [{
        min: 0,
        max: 45,
      },
      {
        min: -5,
        max: 90,
      },
      {
        min: -5,
        max: 90,
      },
      {
        min: 0,
        max: 0,
      },
      {
        min: 0,
        max: 0,
      },
      {
        min: 0,
        max: 0,
      },
      {
        min: 0,
        max: 0,
      }
    ];
    var sectionsMap = {}; // map name with index
    var totalSections;
    var currentIndex = 0;
    var previousIndex = 0;

    // events
    var events = new Events();

    function navigation() {
      function next() {
        jQuery('html,body').css('cursor', 'default');
        if (currentIndex === totalSections) {
          if (!isLocked) {
            events.trigger('end');
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

      // scroll

      function onScrollCamera(e) {
        e.preventDefault();
        var zSpeed = e.originalEvent.wheelDelta * .01;
        camera.position.z -= zSpeed;
        console.log(camera.position.z);
      }

      function onScroll(event) {
        var dist = camera.position.z - sections[currentIndex].el.position.z;
        var zSpeed = event.originalEvent.wheelDelta * .01;
        console.log('zSpeed: ' + zSpeed);
        console.log('camera.position.y: ' + camera.position.y);
        if (zSpeed > 0) {
          if (dist > 0 - sectionZoomOffset[currentIndex].min) {
            scrollZ(zSpeed);
          }
        } else {
          if (dist < 50 + sectionZoomOffset[currentIndex].max) {
            scrollZ(zSpeed);
          }
        }
        return false;
      }
      function scrollZ(zSpeed){
        theAtmosphereParticles.el.position.z += zSpeed;
        theSectionParticles0.el.position.z += zSpeed;
        sectionLines0.el.position.z += zSpeed;
        theSectionParticles1.el.position.z += zSpeed;
        sectionLines1.el.position.z += zSpeed;
        theSectionParticles2.el.position.z += zSpeed;
        sectionLines2.el.position.z += zSpeed;
        theSectionParticles3.el.position.z += zSpeed;
        sectionLines3.el.position.z += zSpeed;
        theSectionParticles4.el.position.z += zSpeed;
        sectionLines4.el.position.z += zSpeed;
        theSectionParticles5.el.position.z += zSpeed;
        sectionLines5.el.position.z += zSpeed;
        theSectionParticles6.el.position.z += zSpeed;
        sectionLines6.el.position.z += zSpeed;
        sections[0].el.position.z += zSpeed;
        sections[1].el.position.z += zSpeed;
        sections[2].el.position.z += zSpeed;
        sections[3].el.position.z += zSpeed;
        sections[4].el.position.z += zSpeed;
        sections[5].el.position.z += zSpeed;
        sections[6].el.position.z += zSpeed;
        moonLight.position.z += zSpeed;
        fireLight.position.z += zSpeed;
        fireLight2.position.z += zSpeed;
      }

      function onKeyDown(event) {
        if (!isScrolling && isActive) {
          var keyCode = event.keyCode;
          if (keyCode === 40) {
            prev();
          } else if (keyCode === 38) {
            next();

          }
        }
      }
      //key control
      jQuery(document).on('keydown', onKeyDown);

      // mousewhell
      $viewport.on('DOMMouseScroll mousewheel', onScroll);
      // $viewport.on('DOMMouseScroll mousewheel', onScrollCamera);

      // interactivity
      document.addEventListener('mouseup', onDocumentMouseUp, false);
      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);

      function onDocumentMouseDown(event) {
        mouseDown = true;
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        switch (currentIndex) {
          case 0:
            var sectionNextBtn = raycaster.intersectObject(sections[0].getTheNextBtn().el, true);
            if (sectionNextBtn.length > 0) {
              sections[0].theNextBtnIsDown();
            }
            break;
          case 1:
            console.log('onDocumentMouseDown section 1');
            var sectionNextBtn = raycaster.intersectObject(sections[1].getTheNextBtn().el, true);
            if (sectionNextBtn.length > 0) {
              sections[1].theNextBtnIsDown();
            }
            break;
          case 2:
            console.log('onDocumentMouseDown section 2');
            var sectionNextBtn = raycaster.intersectObject(sections[2].getTheNextBtn().el, true);
            if (sectionNextBtn.length > 0) {
              sections[2].theNextBtnIsDown();
            }
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            break;
        }
      }


      function onDocumentMouseUp(event) {
        mouseDown = false;
        //console.log('onDocumentMouseUp');
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        switch (currentIndex) {
          case 0:
            var sectionNextBtn = raycaster.intersectObject(sections[0].getTheNextBtn().el, true);
            if (sectionNextBtn.length > 0) {
              next();
            }
            break;
          case 1:
            console.log('onDocumentMouseUp section 1');
            var sectionNextBtn = raycaster.intersectObject(sections[1].getTheNextBtn().el, true);
            if (sectionNextBtn.length > 0) {
              next();
            }
            break;
          case 2:
            console.log('onDocumentMouseUp section 1');
            var sectionNextBtn = raycaster.intersectObject(sections[2].getTheNextBtn().el, true);
            if (sectionNextBtn.length > 0) {
              next();
            }
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            break;
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
      if (!$viewport) {
        console.warn('set viewport first');
        return false;
      }
      resolution = parameters.quality;
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: false
      });

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.setClearColor('#0a0a0a', 1);
      renderer.setSize(width * resolution, height * resolution);
      $viewport.append(renderer.domElement);

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(parameters.fogColor, 0.01);

      light = new THREE.AmbientLight('#ffffff');
      scene.add(light);

      moonLight = new THREE.SpotLight(0x777777, 1.65, 0, Math.PI / 2);
      moonLight.position.set(0, 300, -850);
      moonLight.target.position.set(0, 0, 0);
      moonLight.castShadow = true;


      fireLight = new THREE.PointLight(0xff0000, .05, 100);
      fireLight.position.set(50, -62, -412);
      // var pointsLightHelper = new THREE.PointLightHelper(fireLight);
      // scene.add(pointsLightHelper)


      fireLight2 = new THREE.PointLight(0xffa500, .05, 100);
      fireLight2.position.set(50, -62, -408);
      // var pointsLightHelper2 = new THREE.PointLightHelper(fireLight2);
      //scene.add(pointsLightHelper2);

      var moonShadowCamera = new THREE.PerspectiveCamera(70, 1, 100, 3000)
      moonLight.shadow = new THREE.LightShadow(moonShadowCamera);
      moonLight.shadow.bias = 0.0001;
      // var helperShadowCamera = new THREE.CameraHelper(moonLight.shadow.camera);
      //scene.add(helperShadowCamera);

      camera = new THREE.PerspectiveCamera(190, width / height, 1, 4000);
      camera.position.set(0, 0, 60);


      function onMouseMove(event) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        switch (currentIndex) {
          case 0:
            if (sections[0].nextBtnIsIn) {
              var sectionNextBtn = raycaster.intersectObject(sections[0].getTheNextBtn().el, true);
              if (sectionNextBtn.length > 0) {
                jQuery('html,body').css('cursor', 'pointer');
                if (!sections[0].nextBtnIsDown) {
                  if (!mouseDown) {
                    sections[0].theNextBtnIsOver();
                  } else {
                    sections[0].theNextBtnIsDown();
                  }
                }
              } else {
                jQuery('html,body').css('cursor', 'default');
                if (sections[0].nextBtnIsOver) {
                  if (!sections[0].nextBtnIsDown) {
                    sections[0].theNextBtnIsOut();
                  }
                }
                if (sections[0].nextBtnIsDown) {
                  sections[0].theNextBtnIsUp();
                }
              }
            }
            break;
          case 1:
            //console.log('onMouseMove section 1');

            if (sections[1].nextBtnIsIn) {
              var sectionNextBtn = raycaster.intersectObject(sections[1].getTheNextBtn().el, true);
              if (sectionNextBtn.length > 0) {
                jQuery('html,body').css('cursor', 'pointer');
                if (!sections[1].nextBtnIsDown) {
                  if (!mouseDown) {
                    sections[1].theNextBtnIsOver();
                  } else {
                    sections[1].theNextBtnIsDown();
                  }
                }
              } else {
                jQuery('html,body').css('cursor', 'default');
                if (sections[1].nextBtnIsOver) {
                  if (!sections[1].nextBtnIsDown) {
                    sections[1].theNextBtnIsOut();
                  }
                }
                if (sections[1].nextBtnIsDown) {
                  sections[1].theNextBtnIsUp();
                }
              }
            }
            break;
          case 2:
            //console.log('sections[2].nextBtnIsIn: ' + sections[2].nextBtnIsIn);
            if (sections[2].nextBtnIsIn) {
              var sectionNextBtn = raycaster.intersectObject(sections[2].getTheNextBtn().el, true);
              if (sectionNextBtn.length > 0) {
                jQuery('html,body').css('cursor', 'pointer');
                if (!sections[2].nextBtnIsDown) {
                  if (!mouseDown) {
                    sections[2].theNextBtnIsOver();
                  } else {
                    sections[2].theNextBtnIsDown();
                  }
                }
              } else {
                jQuery('html,body').css('cursor', 'default');
                if (sections[2].nextBtnIsOver) {
                  if (!sections[2].nextBtnIsDown) {
                    sections[2].theNextBtnIsOut();
                  }
                }
                if (sections[2].nextBtnIsDown) {
                  sections[2].theNextBtnIsUp();
                }
              }
            }
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            break;
        }
      }

      jQuery(window).on('resize', onResize);
      $viewport.on('mousemove', onMouseMove);

      navigation();
      draw();

      return SCENE.getInstance();
    }

    function setupBackground() {
      var rangeX = [-100, 100];
      var rangeY = [-100, 100];
      var rangeZ = [0, -1400];
      var stripsRangeX = [-50, 50];
      var stripsRangeY = [-80, 80];
      var stripsRangeZ = [-50, 0];
      var numOfParticles = 1850;
      var numOfLines = 150;

      theAtmosphereParticles = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: false,
        color1: '#ffffff',
        color2: '#ffffff'
      });
      scene.add(theAtmosphereParticles.el);
      //
      rangeX = [-50, 50];
      rangeY = [parameters.sectionHeight, -parameters.sectionHeight];
      rangeZ = [-100, 100];
      numOfParticles = 400;
      numOfLines = 100;
      stripsRangeX = [-50, 50];
      stripsRangeY = [-80, 80];
      stripsRangeZ = [-80, -45];

      theSectionParticles0 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        // color1: '#D30012',
        color1: '#eb0013',
        color2: '#8D000C'
        // 0xeb0013,0xff7704,0xfff46a,0x47aff,0xffb577
      });
      scene.add(theSectionParticles0.el);
      theSectionParticles0.el.position.x = sectionLocations[0].x;
      theSectionParticles0.el.position.y = sectionLocations[0].y;
      theSectionParticles0.el.position.z = sectionLocations[0].z;

      sectionLines0 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines0.el);
      sectionLines0.el.position.x = sectionLocations[0].x;
      sectionLines0.el.position.y = sectionLocations[0].y;
      sectionLines0.el.position.z = sectionLocations[0].z;
      //
      rangeX = [-50, 50];
      rangeY = [parameters.sectionHeight, -parameters.sectionHeight];
      rangeZ = [-100, 100];
      numOfParticles = 300;
      numOfLines = 50;
      stripsRangeX = [-50, 50];
      stripsRangeY = [-80, 80];
      stripsRangeZ = [-50, 0];

      theSectionParticles1 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        // color1: '#e9b700',
        //color2: '#b5f900'
        color1: '#ffffff',
        color2: '#4C4C4C'
      });
      // 0xe9b700,0xb5f900,0x7bff55,0x5400f9,0xd1ff55
      scene.add(theSectionParticles1.el);
      theSectionParticles1.el.position.x = sectionLocations[1].x;
      theSectionParticles1.el.position.y = sectionLocations[1].y;
      theSectionParticles1.el.position.z = sectionLocations[1].z;

      sectionLines1 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines1.el);
      sectionLines1.el.position.x = sectionLocations[1].x;
      sectionLines1.el.position.y = sectionLocations[1].y;
      sectionLines1.el.position.z = sectionLocations[1].z;

      //

      rangeX = [-150, 150];
      rangeY = [-60, 150];
      rangeZ = [-80, -40];
      numOfParticles = 500;
      numOfLines = 0;
      stripsRangeX = [-50, 50];
      stripsRangeY = [-80, 80];
      stripsRangeZ = [-100, -50];


      theSectionParticles2 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        particleSize: .5,
        strips: false,
        color1: '#ffffff',
        color2: '#4C4C4C'
        // color1: '#78ff37',
        //  color2: '#00f358'
        //  4) 0xe4ff77,0x78ff37,0xf358,0xcb37ff,0xc6ffaa
      });

      scene.add(theSectionParticles2.el);
      theSectionParticles2.el.position.x = sectionLocations[2].x;
      theSectionParticles2.el.position.y = sectionLocations[2].y;
      theSectionParticles2.el.position.z = sectionLocations[2].z;

      sectionLines2 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(sectionLines2.el);
      sectionLines2.el.position.x = sectionLocations[2].x;
      sectionLines2.el.position.y = sectionLocations[2].y;
      sectionLines2.el.position.z = sectionLocations[2].z;
      //

      rangeX = [-50, 50];
      rangeY = [parameters.sectionHeight, -parameters.sectionHeight];
      rangeZ = [-100, 100];
      numOfParticles = 400;
      numOfLines = 100;
      stripsRangeX = [-50, 50];
      stripsRangeY = [-80, 80];
      stripsRangeZ = [-80, -45];

      theSectionParticles3 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#00d4ed',
        color2: '#1579ff'
        // 0xeb94,0xd4ed,0x1579ff,0xed0009,0x19e7ff
      });
      scene.add(theSectionParticles3.el);
      theSectionParticles3.el.position.x = sectionLocations[3].x;
      theSectionParticles3.el.position.y = sectionLocations[3].y;
      theSectionParticles3.el.position.z = sectionLocations[3].z;

      sectionLines3 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(sectionLines3.el);
      sectionLines3.el.position.x = sectionLocations[3].x;
      sectionLines3.el.position.y = sectionLocations[3].y;
      sectionLines3.el.position.z = sectionLocations[3].z;
      //
      theSectionParticles4 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#a800e9',
        color2: '#f400c6'
        // 0x3a00f5,0xa800e9,0xf400c6,0x52e900,0xb904ff
      });
      scene.add(theSectionParticles4.el);
      theSectionParticles4.el.position.x = sectionLocations[4].x;
      theSectionParticles4.el.position.y = sectionLocations[4].y;
      theSectionParticles4.el.position.z = sectionLocations[4].z;

      sectionLines4 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(sectionLines4.el);

      sectionLines4.el.position.x = sectionLocations[4].x;
      sectionLines4.el.position.y = sectionLocations[4].y;
      sectionLines4.el.position.z = sectionLocations[4].z;
      //
      theSectionParticles5 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#ea006f',
        color2: '#ef0000'
        // 0xfc00f1,0xea006f,0xef0000,0xea9d,0xff0c7f
      });
      scene.add(theSectionParticles5.el);
      theSectionParticles5.el.position.x = sectionLocations[5].x;
      theSectionParticles5.el.position.y = sectionLocations[5].y;
      theSectionParticles5.el.position.z = sectionLocations[5].z;
      sectionLines5 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines5.el);
      sectionLines5.el.position.x = sectionLocations[5].x;
      sectionLines5.el.position.y = sectionLocations[5].y;
      sectionLines5.el.position.z = sectionLocations[5].z;
      //
      theSectionParticles6 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#ff1536',
        color2: '#ee5000'
        // 0xff1536,0xee5000,0xebcc00,0x7eee,0xff691d
      });
      scene.add(theSectionParticles6.el);
      theSectionParticles6.el.position.x = sectionLocations[6].x;
      theSectionParticles6.el.position.y = sectionLocations[6].y;
      theSectionParticles6.el.position.z = sectionLocations[6].z;
      sectionLines6 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines6.el);
      sectionLines6.el.position.x = sectionLocations[6].x;
      sectionLines6.el.position.y = sectionLocations[6].y;
      sectionLines6.el.position.z = sectionLocations[6].z;
    }

    var fireLightX = 50;
    var fireLightY = -62;
    var fireLightZ = -412;
    var fireLight2X = 50;
    var fireLight2Y = -62;
    var fireLight2Z = -408;
    var firelightYCounter = 0;
    var firelightXCounter = 0;
    var firelightZCounter = 0;
    var firelight2YCounter = 0;
    var firelight2XCounter = 0;
    var firelight2ZCounter = 0;

    function animateFire() {

      firelightYCounter += .35;
      firelightXCounter += .5;
      firelightZCounter += .45;
      firelight2YCounter += .3;
      firelight2XCounter += .6;
      firelight2ZCounter += .5;

      fireLightY += Math.sin(firelightYCounter) * .5;
      fireLightX += Math.sin(firelightXCounter) * 2.5;
      fireLightZ += Math.sin(firelightZCounter) * 2;
      fireLight2Y += Math.sin(firelight2YCounter) * .5;
      fireLight2X += Math.sin(firelight2XCounter) * 2.5;
      fireLight2Z += Math.sin(firelight2ZCounter) * 2;
      fireLight.intensity = Math.random() * .25 + .1;
      fireLight2.intensity = Math.random() * .25 + .1;
      fireLight.position.set(fireLightX - 5, fireLightY, fireLightZ);
      fireLight2.position.set(fireLight2X - 5, fireLight2Y, fireLight2Z);
      //   console.log('fireLightZ: ' + fireLightZ)
    }

    function prepCampfireScene() {

      console.log('prepCampfireScene');
      scene.add(moonLight);
      scene.add(fireLight);
      scene.add(fireLight2);
      animateTheFire = setInterval(animateFire, 100);

    }

    function cleanUpCampfireScene() {

      console.log('cleanUpCampfireScene');
      scene.remove(moonLight);
      scene.remove(fireLight);
      scene.remove(fireLight2);
      clearInterval(animateTheFire);
    }

    function draw() {
      SPRITE3D.update();
      render();
      frameId = window.requestAnimationFrame(draw);
      stats.update();
    }

    function render() {
      // camera noise

      if (cameraShake) {
        cameraShakeY += 0.005;
        cameraShakeX += 0.006;
        camera.position.y += Math.cos(cameraShakeY) / 50;
        camera.position.x += Math.cos(cameraShakeX) / 50;
      }
      //  camera.lookAt(cameraPointAt);
      renderer.render(scene, camera);
    }

    function onResize() {
      width = $viewport.width();
      height = $viewport.height();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width * resolution, height * resolution);
    }

    function animateCamera(index) {
      currentIndex = index;
      cameraShakeY = 0;
      cameraShakeX = 0;


      var nextPosition = {
        x: sections[currentIndex].el.position.x,
        y: sections[currentIndex].el.position.y,
        z: sections[currentIndex].el.position.z + 50
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
      var tweenTime = 3.5;

      tweenMax.to(camera.position, tweenTime, {
        x: nextPosition.x,
        y: nextPosition.y,
        z: nextPosition.z,
        ease: window.Quart.easeInOut,
        onStart: function () {
          isScrolling = true;
          // SOUNDS.wind.play();
          events.trigger('section:changeBegin', data);


        },
        onComplete: function () {
          if (previousIndex === index) {
            return false;
          }
          isScrolling = false;
          events.trigger('section:changeComplete', data);
          previousIndex = index;
        }
      });

      tweenMax.to(cameraPointAt, tweenTime, {
        x: nextPosition.x,
        y: nextPosition.y,
        z: nextPosition.z - 60,
        ease: window.Quart.easeInOut
      });
    }

    return {
      setViewport: function ($el) {
        $viewport = $el;
        width = $viewport.width();
        height = $viewport.height();
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
          section.el.position.x = sectionLocations[i].x;
          section.el.position.y = sectionLocations[i].y;
          section.el.position.z = sectionLocations[i].z;
          section.setPositions();
          scene.add(section.el);

        }
        setupBackground();
      },
      setUpNextScene: function (to) {

        console.log('setUpNextScene to: ' + to);

        switch (to) {
          case 'intro':

            // setupBackground();
            cameraShake = true;

            break;
          case 'second':
            //setupBackground();
            cameraShake = true;

            break;
          case 'third':

            prepCampfireScene();
            cameraShake = false;

            break;
          case 'fourth':
            //setupBackground();
            cameraShake = true;

            break;
          case 'fifth':
            // setupBackground();
            cameraShake = true;

            break;
          case 'sixth':
            // setupBackground();
            cameraShake = true;

            break;
          case 'seventh':
            // setupBackground();
            cameraShake = true;

            break;
          default:
            break;
        }


      },
      cleanUpLastScene: function (from) {

        console.log('cleanUpLastScene from: ' + from);

        switch (from) {
          case 'intro':

            // cleanUpCampfireScene();

            break;
          case 'second':
            //cleanUpCampfireScene();

            break;
          case 'third':

            cleanUpCampfireScene();


            break;
          case 'fourth':
            //cleanUpCampfireScene();

            break;
          case 'fifth':
            // cleanUpCampfireScene();

            break;
          case 'sixth':
            // cleanUpCampfireScene();

            break;
          case 'seventh':
            // cleanUpCampfireScene();

            break;
          default:
            break;
        }


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
        var map = new MapObj();
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
        renderer.setSize(width * resolution, height * resolution);
      },
      getQuality: function () {
        return resolution;
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