'use strict';
var THREE = require('three');
var TextPanel = require('../objects/TextPanelObject');
var Events = require('../classes/EventsClass');

function Skills() {
  this.el = new THREE.Object3D();
  this.events = new Events();
  var loader = new THREE.FontLoader();
  var _this = this;

  this.skillSignHolder = new THREE.Object3D();
  this.el.add(this.skillSignHolder);

  this.javsScriptSkillsHolder = new THREE.Object3D();
  this.el.add(this.javsScriptSkillsHolder);
  this.skillsArray = [];

  this.toolsHolder = new THREE.Object3D();
  this.el.add(this.toolsHolder);
  this.toolsArray = [];

  this.cssHolder = new THREE.Object3D();
  this.el.add(this.cssHolder);
  this.cssArray = [];

  this.on = function () {
    _this.events.on.apply(_this.events, arguments);
  }

  loader.load('fonts/[z] Arista_Regular.json', function (font) {
    init(font);
  });

  function init(font) {

    var skillsSignGeo = new THREE.TextBufferGeometry("SKILLS", {
      font: font,
      size: 18,
      height: 4,
      curveSegments: 12,
      bevelThickness: .25,
      bevelSize: .625,
      bevelEnabled: true
    });
    skillsSignGeo.computeBoundingBox();

    var centerOffset = -0.5 * (skillsSignGeo.boundingBox.max.x - skillsSignGeo.boundingBox.min.x);
    var skillsSignMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 16
    });

    var skillsSign = new THREE.Mesh(skillsSignGeo, skillsSignMaterial);
    skillsSign.castShadow = true;
    skillsSign.receiveShadow = true;
    _this.skillSignHolder.add(skillsSign);
    _this.el.add(skillsSign);

    skillsSign.position.x = centerOffset;
    skillsSign.position.y = 90;
    skillsSign.position.z = 90;

    var javaScriptSignGeo = new THREE.TextBufferGeometry("JavaScript", {
      font: font,
      size: 14,
      height: 4,
      curveSegments: 12,
      bevelThickness: .25,
      bevelSize: .625,
      bevelEnabled: true
    });
    javaScriptSignGeo.computeBoundingBox();

    var centerOffset = -0.5 * (javaScriptSignGeo.boundingBox.max.x - javaScriptSignGeo.boundingBox.min.x);

    var signMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      specular: 0xffffff,
      shininess: 16
    });

    var javaScriptSign = new THREE.Mesh(javaScriptSignGeo, signMaterial);
    javaScriptSign.castShadow = true;
    javaScriptSign.receiveShadow = true;
    _this.javsScriptSkillsHolder.add(javaScriptSign);

    javaScriptSign.position.x = centerOffset;
    javaScriptSign.position.y = 65;
    javaScriptSign.position.z = 95;

    var javaScriptSkillStringArray = [
      'vanillaJS',
      'ES5/ES6',
      'Node.js',
      'jQuery',
      'WebGL',
      'three.js',
      'GSAP',
      'createJS',
      'React',
      'Redux'
    ];

    var posY = 75;
    var posX = -25;
    var counter = 0;
    for (var i = 0; i < javaScriptSkillStringArray.length; i++) {

      var skill = new TextPanel(
        javaScriptSkillStringArray[i], {
          align: 'center',
          style: 'Bold',
          font: 'Arial, sans-serif',
          size: 65,
          lineSpacing: 25,
          color: '#333333'
        }
      );
      _this.skillsArray.push(skill);
      skill.el.position.x = posX;
      skill.el.position.y = posY;
      skill.el.position.z = 100;
      posX += 25;
      counter++;
      if (counter > 2) {
        counter = 0;
        posY -= 10;
        posX = -25;
      }
      _this.javsScriptSkillsHolder.add(skill.el);
    }

    var toolsSignGeo = new THREE.TextBufferGeometry("Tools", {
      font: font,
      size: 14,
      height: 4,
      curveSegments: 12,
      bevelThickness: .25,
      bevelSize: .625,
      bevelEnabled: true
    });
    toolsSignGeo.computeBoundingBox();

    var centerOffset = -0.5 * (toolsSignGeo.boundingBox.max.x - toolsSignGeo.boundingBox.min.x);

    var signMaterial2 = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      specular: 0xffffff,
      shininess: 16
    });

    var toolsSign = new THREE.Mesh(toolsSignGeo, signMaterial2);
    toolsSign.castShadow = true;
    toolsSign.receiveShadow = true;
    _this.toolsHolder.add(toolsSign);
    toolsSign.position.x = centerOffset;
    toolsSign.position.y = 65;
    toolsSign.position.z = 95;

    var toolsSkillStringArray = [
      'VSCode',
      'npm',
      'Bower',
      'Grunt',
      'Gulp',
      'Git',
      'Browserfiy',
      'Babel',
      'Howler'
    ];
   

    var posY = 75;
    var posX = -25;
    var counter = 0;
    for (var i = 0; i < toolsSkillStringArray.length; i++) {

      var tool = new TextPanel(
        toolsSkillStringArray[i], {
          align: 'center',
          style: 'Bold',
          font: 'Arial, sans-serif',
          size: 65,
          lineSpacing: 25,
          color: '#333333'
        }
      );
      _this.toolsArray.push(tool);
      tool.el.position.x = posX;
      tool.el.position.y = posY;
      tool.el.position.z = 100;
      posX += 25;
      counter++;
      if (counter > 2) {
        counter = 0;
        posY -= 10;
        posX = -25;
      }
      _this.toolsHolder.add(tool.el);
    }
    //
    var cssSignGeo = new THREE.TextBufferGeometry("Misc.", {
      font: font,
      size: 14,
      height: 4,
      curveSegments: 12,
      bevelThickness: .25,
      bevelSize: .625,
      bevelEnabled: true
    });
    cssSignGeo.computeBoundingBox();

    var centerOffset = -0.5 * (cssSignGeo.boundingBox.max.x - cssSignGeo.boundingBox.min.x);

    var signMaterial3 = new THREE.MeshPhongMaterial({
      // color: 0x111111,
      color: 0x00ff00,
      specular: 0xffffff,
      shininess: 16
    });
    var cssSign = new THREE.Mesh(cssSignGeo, signMaterial3);
    cssSign.castShadow = true;
    cssSign.receiveShadow = true;
    _this.cssHolder.add(cssSign);
    cssSign.position.x = centerOffset;
    cssSign.position.y = 65;
    cssSign.position.z = 95;

    var cssSkillStringArray = [
      
      'HTML5',
      'CSS',
      'LESS',
      'SASS',
      'Materialize',
      'GLSL',
      'XML',
      'JSON',
      'Firebase',
      'MongoDB',
      'Analytics',
      'Blender',
      'AS2/AS3',
      'Adobe Animate',
      'Photoshop',
      'Illustrator',
      'AfterEffects',
      'Audition',
      'Unity'
    ];

    var posY = 75;
    var posX = -25;
    var counter = 0;
    for (var i = 0; i < cssSkillStringArray.length; i++) {

      var skill = new TextPanel(
        cssSkillStringArray[i], {
          align: 'center',
          style: 'Bold',
          font: 'Arial, sans-serif',
          size: 65,
          lineSpacing: 25,
          color: '#333333'
        }
      );
      _this.cssArray.push(skill);
      skill.el.position.x = posX;
      skill.el.position.y = posY;
      skill.el.position.z = 100;
      posX += 25;
      counter++;
      if (counter > 2) {
        counter = 0;
        posY -= 10;
        posX = -25;
      }
      _this.cssHolder.add(skill.el);
    }


    _this.skillSignHolder.position.set(0, 0, 0);

    _this.cssHolder.position.set(0, -50, -60);
    _this.cssHolder.rotateY(0 * Math.PI / 180);
    _this.cssHolder.rotateX(-15 * Math.PI / 180);

    _this.toolsHolder.position.set(150, 20, -20);
    _this.toolsHolder.rotateY(-40 * Math.PI / 180);
    _this.toolsHolder.rotateX(15 * Math.PI / 180);

    _this.javsScriptSkillsHolder.position.set(-150, 20, -20);
    _this.javsScriptSkillsHolder.rotateY(40 * Math.PI / 180);
    _this.javsScriptSkillsHolder.rotateX(15 * Math.PI / 180);
  }
}

Skills.prototype.start = function () {

  for (var i = 0; i < this.skillsArray.length; i++) {
    this.skillsArray[i].fadeIn();
  }

  for (var i = 0; i < this.toolsArray.length; i++) {
    this.toolsArray[i].fadeIn();
  }

  for (var i = 0; i < this.cssArray.length; i++) {
    this.cssArray[i].fadeIn();
  }
  this.events.trigger('sectionFullyLoaded', {
    message: 'Skills is Loaded'
  });
};

Skills.prototype.onOut = function () {
  for (var i = 0; i < this.skillsArray.length; i++) {
    this.skillsArray[i].fadeOut();
  }

  for (var i = 0; i < this.toolsArray.length; i++) {
    this.toolsArray[i].fadeOut();
  }

  for (var i = 0; i < this.cssArray.length; i++) {
    this.cssArray[i].fadeOut();
  }
  this.events.trigger('sectionUnloaded', {
    message: 'Skills is UnLoaded'
  });
};

Skills.prototype.stop = function () {};
Skills.prototype.show = function () {};
Skills.prototype.hide = function () {};

module.exports = Skills;