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
    var light;
    var camera;
    var frameId;
    var cameraShakeY = 0;
    var cameraShakeX = 0;
    var cameraMuse = new THREE.Vector3(0, 0, 0);

    // mouse
    var mouse = new THREE.Vector2();
    var mouseX = 0;
    var mouseY = 0;
    var raycaster = new THREE.Raycaster();


    // general
    var isLocked = false; // used to prevent additional event when slide() called from outside
    var isActive = false;
    var isStarted = false;

    // camera
    var isScrolling = false;

    // background lines and particles
    var theAtmosphereParticles;

    var sectionLines;
    var theSectionParticles;
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
    var sectionLines7;
    var theSectionParticles7;

    // sections
    var sections = [];
    var sectionLocations = [{
        x: 0,
        y: 0,
        z: 0
      },
      {
        x: 200,
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
    var sectionZoomOffset = [{
        min: 0,
        max: 25,
      },
      {
        min: 10,
        max: 75,
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
      function onScroll(event) {

        var dist = camera.position.z - sections[currentIndex].el.position.z;
        var zSpeed = event.originalEvent.wheelDelta * .01;
        if (zSpeed > 0) {
          if (dist > 0 - sectionZoomOffset[currentIndex].min) {
            theAtmosphereParticles.el.position.z += zSpeed;
            theSectionParticles.el.position.z += zSpeed;
            sectionLines.el.position.z += zSpeed;
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
            theSectionParticles7.el.position.z += zSpeed;
            sectionLines7.el.position.z += zSpeed;
            sections[0].el.position.z += zSpeed;
            sections[1].el.position.z += zSpeed;
            sections[2].el.position.z += zSpeed;
            sections[3].el.position.z += zSpeed;
            sections[4].el.position.z += zSpeed;
            sections[5].el.position.z += zSpeed;
            sections[6].el.position.z += zSpeed;
          }
        } else {
          if (dist < 50 + sectionZoomOffset[currentIndex].max) {
            theAtmosphereParticles.el.position.z += zSpeed;
            theSectionParticles.el.position.z += zSpeed;
            sectionLines.el.position.z += zSpeed;
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
            theSectionParticles7.el.position.z += zSpeed;
            sectionLines7.el.position.z += zSpeed;
            sections[0].el.position.z += zSpeed;
            sections[1].el.position.z += zSpeed;
            sections[2].el.position.z += zSpeed;
            sections[3].el.position.z += zSpeed;
            sections[4].el.position.z += zSpeed;
            sections[5].el.position.z += zSpeed;
            sections[6].el.position.z += zSpeed;
          }
        }
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

      // interactivity

      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);
    }

    function onDocumentMouseDown(event) {



      event.preventDefault();

      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
      //console.log('[onDocumentMouseDown] mouse.x: ' + mouse.x + ', mouse.y: ' + mouse.y);

      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObjects(scene.children, true);
    //  console.log('sections[0].getTheText(): ' + sections[0].getTheText());
     // console.log(sections[0].getTheText());
      var intersectIntroText = raycaster.intersectObject(sections[0].getTheText().el, true);
      console.log('intersectIntroText.length: ' + intersectIntroText.length);
      console.log(intersectIntroText);
     if(intersectIntroText.length>0){
      sections[0].getTheText().over();
     }else{
      sections[0].getTheText().overOut();

     }
      

     // console.log("scene.children.length: " + scene.children.length);
     // console.log('intersects.length: ' + intersects.length);
     // console.log('raycaster.far: ' + raycaster.far);

     // console.log('raycaster.near: ' + raycaster.near);
     // console.log('raycaster.ray: ' + raycaster.ray);
      



      //  console.log("scene.children: " + scene.children);
      // for (var i = 0 ; i < scene.children.length; i++){
      //  console.log('scene.children['+i+']: ' + scene.children[i]);
      //   console.log(scene.children[i]);

      // }

      /*
            if ( intersects.length > 0 ) {

              new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
                x: Math.random() * 800 - 400,
                y: Math.random() * 800 - 400,
                z: Math.random() * 800 - 400 }, 2000 )
              .easing( TWEEN.Easing.Elastic.Out).start();

              new TWEEN.Tween( intersects[ 0 ].object.rotation ).to( {
                x: Math.random() * 2 * Math.PI,
                y: Math.random() * 2 * Math.PI,
                z: Math.random() * 2 * Math.PI }, 2000 )
              .easing( TWEEN.Easing.Elastic.Out).start();

            }

            /*
            // Parse all the faces
            for ( var i in intersects ) {

              intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

            }
            */
    }

    function onDocumentTouchStart(event) {

      event.preventDefault();

      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
      onDocumentMouseDown(event);

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
      const color = parameters.fogColor; // white
      const near = 1;
      const far = 200;
      // scene.fog = new THREE.Fog(color, near, far);


      light = new THREE.DirectionalLight('#ffffff', .5);
      light.position.set(0.2, 1, 0.5);
      scene.add(light);

      camera = new THREE.PerspectiveCamera(190, width / height, 1, 4000);
      camera.position.set(0, 0, 60);

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
      var stripsRangeX = [-50, 50];
      var stripsRangeY = [-80, 80];
      var stripsRangeZ = [-50, 0];
      var numOfParticles = 750;
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

      theSectionParticles = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#eb0013',
        color2: '#ff7704'
        // 0xeb0013,0xff7704,0xfff46a,0x47aff,0xffb577
      });
      scene.add(theSectionParticles.el);
      theSectionParticles.el.position.x = sectionLocations[0].x;
      theSectionParticles.el.position.y = sectionLocations[0].y;
      theSectionParticles.el.position.z = sectionLocations[0].z;

      sectionLines = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines.el);
      sectionLines.el.position.x = sectionLocations[0].x;
      sectionLines.el.position.y = sectionLocations[0].y;
      sectionLines.el.position.z = sectionLocations[0].z;
      //
      rangeX = [-50, 50];
      rangeY = [parameters.sectionHeight, -parameters.sectionHeight];
      rangeZ = [-100, 100];
      numOfParticles = 600;
      numOfLines = 100;
      stripsRangeX = [-50, 50];
      stripsRangeY = [-80, 80];
      stripsRangeZ = [-50, 0];

      theSectionParticles2 = new BackgroundParticles({
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
        color2: '#ffffff'
      });
      // 0xe9b700,0xb5f900,0x7bff55,0x5400f9,0xd1ff55
      scene.add(theSectionParticles2.el);
      theSectionParticles2.el.position.x = sectionLocations[1].x;
      theSectionParticles2.el.position.y = sectionLocations[1].y;
      theSectionParticles2.el.position.z = sectionLocations[1].z;

      sectionLines2 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines2.el);
      sectionLines2.el.position.x = sectionLocations[1].x;
      sectionLines2.el.position.y = sectionLocations[1].y;
      sectionLines2.el.position.z = sectionLocations[1].z;
      //
      theSectionParticles3 = new BackgroundParticles({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        stripsRangeX: stripsRangeX,
        stripsRangeY: stripsRangeY,
        stripsRangeZ: stripsRangeZ,
        count: numOfParticles,
        strips: true,
        color1: '#78ff37',
        color2: '#00f358'
        //  4) 0xe4ff77,0x78ff37,0xf358,0xcb37ff,0xc6ffaa
      });

      scene.add(theSectionParticles3.el);
      theSectionParticles3.el.position.x = sectionLocations[2].x;
      theSectionParticles3.el.position.y = sectionLocations[2].y;
      theSectionParticles3.el.position.z = sectionLocations[2].z;

      sectionLines3 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(sectionLines3.el);
      sectionLines3.el.position.x = sectionLocations[2].x;
      sectionLines3.el.position.y = sectionLocations[2].y;
      sectionLines3.el.position.z = sectionLocations[2].z;
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
        color1: '#00d4ed',
        color2: '#1579ff'
        // 0xeb94,0xd4ed,0x1579ff,0xed0009,0x19e7ff
      });
      scene.add(theSectionParticles4.el);
      theSectionParticles4.el.position.x = sectionLocations[3].x;
      theSectionParticles4.el.position.y = sectionLocations[3].y;
      theSectionParticles4.el.position.z = sectionLocations[3].z;

      sectionLines4 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(sectionLines4.el);
      sectionLines4.el.position.x = sectionLocations[3].x;
      sectionLines4.el.position.y = sectionLocations[3].y;
      sectionLines4.el.position.z = sectionLocations[3].z;
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
        color1: '#a800e9',
        color2: '#f400c6'
        // 0x3a00f5,0xa800e9,0xf400c6,0x52e900,0xb904ff
      });
      scene.add(theSectionParticles5.el);
      theSectionParticles5.el.position.x = sectionLocations[4].x;
      theSectionParticles5.el.position.y = sectionLocations[4].y;
      theSectionParticles5.el.position.z = sectionLocations[4].z;

      sectionLines5 = new BackgroundLines({
        rangeX: rangeX,
        rangeY: rangeY,
        rangeZ: rangeZ,
        count: numOfLines
      });
      scene.add(sectionLines5.el);

      sectionLines5.el.position.x = sectionLocations[4].x;
      sectionLines5.el.position.y = sectionLocations[4].y;
      sectionLines5.el.position.z = sectionLocations[4].z;
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
        color1: '#ea006f',
        color2: '#ef0000'
        // 0xfc00f1,0xea006f,0xef0000,0xea9d,0xff0c7f
      });
      scene.add(theSectionParticles6.el);
      theSectionParticles6.el.position.x = sectionLocations[5].x;
      theSectionParticles6.el.position.y = sectionLocations[5].y;
      theSectionParticles6.el.position.z = sectionLocations[5].z;
      sectionLines6 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines6.el);
      sectionLines6.el.position.x = sectionLocations[5].x;
      sectionLines6.el.position.y = sectionLocations[5].y;
      sectionLines6.el.position.z = sectionLocations[5].z;
      //
      theSectionParticles7 = new BackgroundParticles({
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
      scene.add(theSectionParticles7.el);
      theSectionParticles7.el.position.x = sectionLocations[6].x;
      theSectionParticles7.el.position.y = sectionLocations[6].y;
      theSectionParticles7.el.position.z = sectionLocations[6].z;
      sectionLines7 = new BackgroundLines({
        rangeY: rangeY,
        count: numOfLines
      });
      scene.add(sectionLines7.el);
      sectionLines7.el.position.x = sectionLocations[6].x;
      sectionLines7.el.position.y = sectionLocations[6].y;
      sectionLines7.el.position.z = sectionLocations[6].z;
    }

    function draw() {
      SPRITE3D.update();
      render();
      frameId = window.requestAnimationFrame(draw);
      stats.update();
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