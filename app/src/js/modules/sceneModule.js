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
      fogColor: '#0a0a0a',
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
    var light;
    var camera;
    var frameId;
    var cameraShakeY = 0;
    var cameraShakeX = 0;
    var cameraMuse = new THREE.Vector3(0, 0, 0);

    // mouse
    var mouseX = 0;
    var mouseY = 0;

    // general
    var isLocked = false; // used to prevent additional event when slide() called from outside
    var isActive  = false;
    var isStarted = false;

    // camera
    var isScrolling = false;

    // background lines and particles
    var theAtmosphereParticles;

    var backgroundLines;
    var theBackgroundParticles;
    var backgroundLines2;
    var theBackgroundParticles2;
    var backgroundLines3;
    var theBackgroundParticles3;
    var backgroundLines4;
    var theBackgroundParticles4;
    var backgroundLines5;
    var theBackgroundParticles5;
    var backgroundLines6;
    var theBackgroundParticles6;
    var backgroundLines7;
    var theBackgroundParticles7;

    // sections
    var sections = [];
    var sectionLocations = [{
        x: 0,
        y: 0,
        z: 0
      },
      {
        x: 100,
        y: 50,
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
    var sectionsMap = {}; // map name with index
    var totalSections;
    var currentIndex = 0;
    var previousIndex = 0;

    // events
    var events = new Events();

    function navigation() {
      function next() {
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
        if (currentIndex === 0) {
          return false;
        }
        currentIndex--;
        animateCamera(currentIndex);
      }

      // scroll
      var newDate;
      var oldDate = new Date();
      var colorUpdated = false;

      function onScroll(event) {

        var zSpeed = event.originalEvent.wheelDelta * .01;
        theAtmosphereParticles.el.position.z += zSpeed;
        theBackgroundParticles.el.position.z += zSpeed;
        backgroundLines.el.position.z += zSpeed;
        theBackgroundParticles2.el.position.z += zSpeed;
        backgroundLines2.el.position.z += zSpeed;
        theBackgroundParticles3.el.position.z += zSpeed;
        backgroundLines3.el.position.z += zSpeed;
        theBackgroundParticles4.el.position.z += zSpeed;
        backgroundLines4.el.position.z += zSpeed;
        theBackgroundParticles5.el.position.z += zSpeed;
        backgroundLines5.el.position.z += zSpeed;
        theBackgroundParticles6.el.position.z += zSpeed;
        backgroundLines6.el.position.z += zSpeed;
        theBackgroundParticles7.el.position.z += zSpeed;
        backgroundLines7.el.position.z += zSpeed;

        sections[0].el.position.z += zSpeed;
        sections[1].el.position.z += zSpeed;
        sections[2].el.position.z += zSpeed;
        sections[3].el.position.z += zSpeed;
        sections[4].el.position.z += zSpeed;
        sections[5].el.position.z += zSpeed;
        sections[6].el.position.z += zSpeed;

        if (!colorUpdated) {
          colorUpdated = true;
          //theBackgroundParticles.updateColor('#6666ff', '#6666ff');
          //sections[currentIndex].updateColors('#6666ff', '#6666ff');
        }
        newDate = new Date();
        var elapsed = newDate.getTime() - oldDate.getTime();
        // handle scroll smoothing (mac trackpad for instance)
        if (elapsed > 50 && !isScrolling) {
          if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
            //next();
          } else {
            //prev();
          }
        }
        oldDate = new Date();
        return false;
      }

      function onKeyDown(event) {
        if (!isScrolling && isActive) {
          var keyCode = event.keyCode;
          if (keyCode === 40) {
            next();
          } else if (keyCode === 38) {
            prev();
          }
        }
      }
      $viewport.on('DOMMouseScroll mousewheel', onScroll);
      jQuery(document).on('keydown', onKeyDown);
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

      renderer.setClearColor('#0a0a0a', 1);
      renderer.setSize(width * resolution, height * resolution);
      $viewport.append(renderer.domElement);

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(parameters.fogColor, 0.01);

      light = new THREE.DirectionalLight('#ffffff', .5);
      light.position.set(0.2, 1, 0.5);
      scene.add(light);

      camera = new THREE.PerspectiveCamera(190, width / height, 1, 4000);
      camera.position.set(0, 0, 50);

      function onMouseMove(event) {
        mouseX = ((event.clientX / window.innerWidth) * 2 - 1);
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      }

      jQuery(window).on('resize', onResize);
      $viewport.on('mousemove', onMouseMove);

      navigation();
      draw();

      return SCENE.getInstance();
    }

    function setupBackground() {

      // add background particles and lines

      var rangeX = [-100, 100];
      var rangeY = [-100, 100];
      var rangeZ = [0, -1400];
      var numOfParticles = 750;
      var numOfLines = 150;

      theAtmosphereParticles = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
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
      numOfParticles = 600;
      numOfLines = 100;

      theBackgroundParticles = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#eb0013',
        color2: '#ff7704'
        // 0xeb0013,0xff7704,0xfff46a,0x47aff,0xffb577
      });
      scene.add(theBackgroundParticles.el);
      theBackgroundParticles.el.position.x = sectionLocations[0].x;
      theBackgroundParticles.el.position.y = sectionLocations[0].y;
      theBackgroundParticles.el.position.z = sectionLocations[0].z;

      backgroundLines = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(backgroundLines.el);
      backgroundLines.el.position.x = sectionLocations[0].x;
      backgroundLines.el.position.y = sectionLocations[0].y;
      backgroundLines.el.position.z = sectionLocations[0].z;
      //
      theBackgroundParticles2 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#e9b700',
        color2: '#b5f900'
      });
      // 0xe9b700,0xb5f900,0x7bff55,0x5400f9,0xd1ff55
      scene.add(theBackgroundParticles2.el);
      theBackgroundParticles2.el.position.x = sectionLocations[1].x;
      theBackgroundParticles2.el.position.y = sectionLocations[1].y;
      theBackgroundParticles2.el.position.z = sectionLocations[1].z;

      backgroundLines2 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(backgroundLines2.el);
      backgroundLines2.el.position.x = sectionLocations[1].x;
      backgroundLines2.el.position.y = sectionLocations[1].y;
      backgroundLines2.el.position.z = sectionLocations[1].z;
      //
      theBackgroundParticles3 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#78ff37',
        color2: '#00f358' 
        //  4) 0xe4ff77,0x78ff37,0xf358,0xcb37ff,0xc6ffaa
      });

      scene.add(theBackgroundParticles3.el);
      theBackgroundParticles3.el.position.x = sectionLocations[2].x;
      theBackgroundParticles3.el.position.y = sectionLocations[2].y;
      theBackgroundParticles3.el.position.z = sectionLocations[2].z;

      backgroundLines3 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(backgroundLines3.el);
      backgroundLines3.el.position.x = sectionLocations[2].x;
      backgroundLines3.el.position.y = sectionLocations[2].y;
      backgroundLines3.el.position.z = sectionLocations[2].z;
      //
      theBackgroundParticles4 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#00d4ed',
        color2: '#1579ff'
        // 0xeb94,0xd4ed,0x1579ff,0xed0009,0x19e7ff
      });
      scene.add(theBackgroundParticles4.el);
      theBackgroundParticles4.el.position.x = sectionLocations[3].x;
      theBackgroundParticles4.el.position.y = sectionLocations[3].y;
      theBackgroundParticles4.el.position.z = sectionLocations[3].z;

      backgroundLines4 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(backgroundLines4.el);
      backgroundLines4.el.position.x = sectionLocations[3].x;
      backgroundLines4.el.position.y = sectionLocations[3].y;
      backgroundLines4.el.position.z = sectionLocations[3].z;
      //
      theBackgroundParticles5 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#a800e9',
        color2: '#f400c6'
        // 0x3a00f5,0xa800e9,0xf400c6,0x52e900,0xb904ff
      });
      scene.add(theBackgroundParticles5.el);
      theBackgroundParticles5.el.position.x = sectionLocations[4].x;
      theBackgroundParticles5.el.position.y = sectionLocations[4].y;
      theBackgroundParticles5.el.position.z = sectionLocations[4].z;

      backgroundLines5 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(backgroundLines5.el);

      backgroundLines5.el.position.x = sectionLocations[4].x;
      backgroundLines5.el.position.y = sectionLocations[4].y;
      backgroundLines5.el.position.z = sectionLocations[4].z;
      //
      theBackgroundParticles6 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#ea006f',
        color2: '#ef0000'
        // 0xfc00f1,0xea006f,0xef0000,0xea9d,0xff0c7f
      });
      scene.add(theBackgroundParticles6.el);
      theBackgroundParticles6.el.position.x = sectionLocations[5].x;
      theBackgroundParticles6.el.position.y = sectionLocations[5].y;
      theBackgroundParticles6.el.position.z = sectionLocations[5].z;
      backgroundLines6 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(backgroundLines6.el);
      backgroundLines6.el.position.x = sectionLocations[5].x;
      backgroundLines6.el.position.y = sectionLocations[5].y;
      backgroundLines6.el.position.z = sectionLocations[5].z;
      //
      theBackgroundParticles7 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#ff1536',
        color2: '#ee5000'
        // 0xff1536,0xee5000,0xebcc00,0x7eee,0xff691d
      });
      scene.add(theBackgroundParticles7.el);
      theBackgroundParticles7.el.position.x = sectionLocations[6].x;
      theBackgroundParticles7.el.position.y = sectionLocations[6].y;
      theBackgroundParticles7.el.position.z = sectionLocations[6].z;
      backgroundLines7 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(backgroundLines7.el);
      backgroundLines7.el.position.x = sectionLocations[6].x;
      backgroundLines7.el.position.y = sectionLocations[6].y;
      backgroundLines7.el.position.z = sectionLocations[6].z;
    }

    function draw() {
      SPRITE3D.update();
      render();
      frameId = window.requestAnimationFrame(draw);
    }

    function render() {
      // camera noise
      camera.position.y += Math.cos(cameraShakeY) / 50;
      cameraShakeY += 0.005;
      camera.position.x += Math.cos(cameraShakeX) / 50;
      cameraShakeX += 0.006;
      // mouse camera move
      // camera.position.x += (((mouseX) * 20) - camera.position.x) * 0.05 ;//
      // camera.position.y += ((mouseY * 5) - camera.position.y) * 0.05;

      camera.lookAt(cameraMuse);
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

      tweenMax.to(cameraMuse, tweenTime, {
        x: nextPosition.x,
        y: nextPosition.y,
        z: nextPosition.z - 50,
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
          scene.add(section.el);
        }
        setupBackground();
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
        }, 2, {delay:.35,
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