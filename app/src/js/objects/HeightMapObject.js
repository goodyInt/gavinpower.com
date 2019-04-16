'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var tweenMax = require('tweenMax');
//var someThing = require('tweenMax.easing') 
//var easePack = require('easePack');

var Events = require('../classes/EventsClass');
var random = require('../utils/randomUtil');
var map = require('../utils/mapUtil');

function HeightMap(options) {
  console.log('HeightMap');
  this.parameters = jQuery.extend(HeightMap.defaultOptions, options);
  this.events = new Events();
  this.fromColor = new THREE.Color(this.parameters.fromColor);
  this.toColor = new THREE.Color(this.parameters.toColor);
  this.colorsCache = {};
  this.faceIndices = ['a', 'b', 'c', 'd'];
  this.ready = false;
  this.data = null;
  this.total = this.parameters.maps.length;
  this.previous = undefined;
  this.current = undefined;
  var group = new THREE.Object3D();
  this.geometry = new THREE.PlaneGeometry(50, 50, this.parameters.divisionsX, this.parameters.divisionsY);
  this.originalVertices = [];
  this.originalVerticesSquare = [];
  this.firstRun = true;
  this.stretchAnimationInterval;
  this.totalVerts = this.geometry.vertices.length;
  this.lastVert = this.totalVerts - 1;
  if (this.firstRun) {
    for (var i = 0; i < this.totalVerts; i++) {
      this.originalVerticesSquare.push(new THREE.Vector3(this.geometry.vertices[i].x, this.geometry.vertices[i].y, this.geometry.vertices[i].z));;
    }
  };

  if (this.parameters.plane) {
    this.plane = this.getPlane();
    group.add(this.plane);
  }

  if (this.parameters.points) {
    this.points = this.getPoints();
    group.add(this.points);
  }

  if (this.parameters.horizontal || this.parameters.vertical) {
    this.lines = this.getLines();
    //  group.add(this.lines);
  }

  if (this.firstRun) {
    for (var i = 0; i < this.totalVerts; i++) {
      this.originalVertices.push(new THREE.Vector3(this.geometry.vertices[i].x, this.geometry.vertices[i].y, this.geometry.vertices[i].z));
      this.geometry.vertices[i].x = Math.random() * 300 - 150;
      this.geometry.vertices[i].y = Math.random() * 300 - 150;
      this.geometry.vertices[i].z = Math.random() * 300 - 150;
    }
  };

  this.loadMaps();

  this.el = group;

  this.start = function () {};

  this.stop = this.start;

  this.on('ready', function () {
    this.ready = true;
    this.start = function () {
      rotateLeft();
      rotateUp();
    };
    this.stop = function () {
      //idleTween.pause();
      rotateHorTween.pause();
      rotateVertTween.pause();
    };
  }.bind(this));

  var thisRotation = this.el.rotation;
  var rotateHorTween;
  var rotateLeft = function () {
    rotateHorTween = tweenMax.to(thisRotation, 20, {
      ease: Power2.easeInOut,
      y: .25,
      onComplete: rotateRight
    });
  }
  var rotateRight = function () {
    rotateHorTween = tweenMax.to(thisRotation, 20, {
      ease: Power2.easeInOut,
      y: -.25,
      onComplete: rotateLeft
    });
  }
  var rotateVertTween;
  var rotateUp = function () {
    rotateVertTween = tweenMax.to(thisRotation, 15, {
      ease: Power2.easeInOut,
      x: .25,
      onComplete: rotateDown
    });
  }
  var rotateDown = function () {
    rotateVertTween = tweenMax.to(thisRotation, 15, {
      ease: Power2.easeInOut,
      x: -.15,
      onComplete: rotateUp
    });
  }
}
HeightMap.defaultOptions = {
  horizontal: false,
  vertical: false,
  plane: false,
  points: false,
  divisionsX: 66,
  divisionsY: 66,
  fromColor: '#4c4c4c',
  toColor: '#ffffff',
  maps: []
};
HeightMap.prototype.getPlane = function () {
  var material = new THREE.MeshLambertMaterial({
    shading: THREE.FlatShading,
    vertexColors: THREE.VertexColors
  });
  var plane = new THREE.Mesh(this.geometry, material);
  return plane;
};

HeightMap.prototype.getPoints = function () {
  var material = new THREE.PointsMaterial({
    size: .65,
    color: 0xeb0013
  });
  var points = new THREE.Points(this.geometry, material);
  return points;
};

HeightMap.prototype.getLines = function () {
  var material = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors
  });
  var lines = new THREE.Object3D();
  if (this.parameters.vertical) {
    for (var x = 0; x < this.parameters.divisionsX + 1; x++) {
      var lineGeometry = new THREE.Geometry();
      for (var y = 0; y < this.parameters.divisionsY + 1; y++) {
        var vertex = this.geometry.vertices[x + ((y * this.parameters.divisionsX) + y)];
        lineGeometry.vertices.push(vertex);
      }
      var line = new THREE.Line(lineGeometry, material);
      lines.add(line);
    }
  }
  if (this.parameters.horizontal) {
    for (var y = 0; y < this.parameters.divisionsY + 1; y++) {
      var lineGeometry = new THREE.Geometry();
      for (var x = 0; x < this.parameters.divisionsX + 1; x++) {
        var vertex = this.geometry.vertices[(y * (this.parameters.divisionsX + 1)) + x];
        lineGeometry.vertices.push(vertex);
        if (x === 0) {
          vertex.x -= random(0, 20);
        }
        if (x === this.parameters.divisionsX) {
          vertex.x += random(0, 20);
        }
      }
      var line = new THREE.Line(lineGeometry, material);
      lines.add(line);
    }
  }
  return lines;
};

var tweenCounter = -1;
var tweenPauseTime = 0;
HeightMap.prototype.getIdleTween = function () {
console.log('getIdleTween tweenPauseTime: ' + tweenPauseTime);
  var _this = this;

  return tweenMax.to({}, tweenPauseTime, {
    paused: false,
    onComplete: function () {
      console.log('');
      console.log('tweenMax onComplete tweenCounter: ' + tweenCounter);
      _this.current++;
      if (_this.current === _this.total) {
        _this.current = 0;
      }
      switch (tweenCounter) {
        case -1:
          tweenPauseTime = .35;
          console.log('H hold: ' + tweenPauseTime);
          break;
        case 0:
          tweenPauseTime = .35;
          console.log('He hold: ' + tweenPauseTime);
          break;
        case 1:
          tweenPauseTime = .35;
          console.log('Hel hold: ' + tweenPauseTime);
          break;
        case 2:
          tweenPauseTime = .35;
          console.log('Hell hold: ' + tweenPauseTime);
          break;
        case 3:
          tweenPauseTime = .35;
          console.log('Hello hold: ' + tweenPauseTime);
          break;
        case 4:
          tweenPauseTime = 5;
          console.log('Friend hold: ' + tweenPauseTime);
          break;
        case 5:
          tweenPauseTime = .5;
          console.log('blank5 hold: ' + tweenPauseTime);
          break;
        case 6:
          tweenPauseTime = 1.35;
          console.log('I hold: ' + tweenPauseTime);
          break;
        case 7:
          tweenPauseTime = 1;
          console.log('AM hold: ' + tweenPauseTime);
          break;
        case 8:
          tweenPauseTime = 2;
          console.log('A hold: ' + tweenPauseTime);
          break;
        case 9:
          tweenPauseTime = 7;
          console.log('DEVELOPER hold: ' + tweenPauseTime);
          break;
        case 10:
          tweenPauseTime = .5;
          console.log('Blank hold: ' + tweenPauseTime);
          break;
        case 11:
          tweenPauseTime = 4;
          console.log('face hold: ' + tweenPauseTime);
          break;
        case 12:
          tweenCounter = -2;
          tweenPauseTime = 1;
          console.log('default 12 hold: ' + tweenPauseTime);
          break;
        default:
          tweenPauseTime = 1;
          console.log('default hold: ' + tweenPauseTime);
          break;
      }
      _this.applyMap();
      tweenCounter++;
      _this.getIdleTween();
      
    }
   
  });
};

HeightMap.prototype.loadMaps = function () {
  console.log('loadMaps');
  var totalData = (this.parameters.divisionsX + 1) * (this.parameters.divisionsY + 1);
  this.data = {
    default: new Float32Array(totalData)
  };
  var loader = new THREE.ImageLoader();
  var total = this.parameters.maps.length;
  var loaded = 0;
  var addMap = function (name, image) {
    var width = image.width;
    var height = image.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    var stepX = width / this.parameters.divisionsX;
    var stepY = height / this.parameters.divisionsY;
    var data = new Float32Array(totalData);
    var i = 0;
    for (var y = 0; y < height; y += stepY) {
      for (var x = 0; x < width; x += stepX) {
        var pixelData = context.getImageData(x, y, 1, 1).data;
        data[i++] = (pixelData[0] + pixelData[1] + pixelData[2]) / 100;
      }
    }
    _this.data[name] = data;
  }.bind(this);

  var _this = this;

  function loadMap(map, index) {
    loader.load(map.url, function (image) {
      addMap(map.name, image);
      loaded++;
      if (loaded === 1) {
        _this.current = index;
        _this.applyMap();
      }
      if (loaded === total) {
        _this.trigger('ready');
      }
    });
  }

  for (var i = 0; i < total; i++) {
    var map = this.parameters.maps[i];
    loadMap(map, i);
  }
};
HeightMap.prototype.applyMap = function () {
  console.log('applyMap');
  var previousName = typeof this.previous === 'undefined' ? 'default' :
    this.parameters.maps[this.previous].name;
  var currentName = this.parameters.maps[this.current].name;
  var previousData = this.data[previousName];
  var currentData = this.data[currentName];
  var thisTweenTime = 2;
  var _this = this;
  var thisEase = Power1.easeOut;


  var updateFun = function () {
    for (var i = 0, j = _this.totalVerts; i < j; i++) {
      var vertex = _this.geometry.vertices[i];
      var offset = currentData[i] + ((previousData[i] - currentData[i]) * this.target.factor);
      vertex.z = offset;
    }
    _this.geometry.verticesNeedUpdate = true;

    if (_this.lines) {
      for (var k = 0, l = _this.lines.children.length; k < l; k++) {
        _this.lines.children[k].geometry.verticesNeedUpdate = true;
      }
    }
    _this.setColors();
  };
  var updateStretchy = function () {
    for (var i = 0, j = _this.totalVerts; i < j; i++) {
      var vertex = _this.geometry.vertices[i];
      var offset = currentData[i] + ((previousData[i] - currentData[i]) * this.target.factor);
      vertex.x = offset;
    }
    _this.geometry.verticesNeedUpdate = true;

    if (_this.lines) {
      for (var k = 0, l = _this.lines.children.length; k < l; k++) {
        _this.lines.children[k].geometry.verticesNeedUpdate = true;
      }
    }
    _this.setColors();
  };

  var updateFirstInt = function () {
    _this.loops += 25;
    _this.tweenSpeed *= 1.01;
    for (var i = 0, j = _this.totalVerts; i < j; i++) {
      if (i < _this.loops) {
        var vertex = _this.geometry.vertices[i];
        var offsetX = vertex.x + ((_this.originalVerticesSquare[i].x - vertex.x) * _this.tweenSpeed);
        var offsetY = vertex.y + ((_this.originalVerticesSquare[i].y - vertex.y) * _this.tweenSpeed);
        var offsetZ = vertex.z + ((_this.originalVerticesSquare[i].z - vertex.z) * _this.tweenSpeed);

        vertex.x = offsetX;
        vertex.y = offsetY;
        vertex.z = offsetZ;
      }
    }
    _this.geometry.verticesNeedUpdate = true;

    if (_this.lines) {
      for (var k = 0, l = _this.lines.children.length; k < l; k++) {
        _this.lines.children[k].geometry.verticesNeedUpdate = true;
      }
    }
    _this.setColors();

    var lastZ = _this.geometry.vertices[_this.lastVert].z * 100;
    if (lastZ > -1 && lastZ < 1) {
      clearInterval(_this.introAnimationInterval);
      _this.el.add(_this.lines);
      currentData = [];
    previousData=[];
        for (var i = 0, j = _this.totalVerts; i < j; i++) {
         previousData.push(_this.geometry.vertices[i].x)
          currentData.push(_this.originalVertices[i].x)
        }
      tweenMax.to({
        factor: 1
      }, 3, {
        factor: 0,
        ease: Elastic.easeOut,
        onUpdate: updateStretchy,
        onComplete: function() {

          _this.firstRun = false;
      _this.getIdleTween();
        }
      });
    }
  };

  
      
  if (!this.firstRun) {
    thisEase = Power1.easeOut;
    switch (tweenCounter) {
      case -1:
        thisTweenTime = .35;
        console.log('H tweenTime: ' + thisTweenTime);
        break;
      case 0:
        thisTweenTime = .3;
        console.log('He tweenTime: ' + thisTweenTime);
        break;
      case 1:
        thisTweenTime = .25;
        console.log('Hel tweenTime: ' + thisTweenTime);
        break;
      case 2:
        thisTweenTime = .2;
        console.log('Hell tweenTime: ' + thisTweenTime);
        break;
      case 3:
        thisTweenTime = .15;
        console.log('Hello tweenTime: ' + thisTweenTime);
        break;
      case 4:
      thisEase = Elastic.easeOut;
      //thisEase = Power4.easeOut;
        thisTweenTime = 3.25;
        console.log('Friend tweenTime: ' + thisTweenTime);
        break;
      case 5:
        console.log('Blank5 tweenTime: ' + thisTweenTime);
        thisTweenTime = .5;
        break;
      case 6:
        thisTweenTime = 1;
        console.log('I tweenTime: ' + thisTweenTime);
        break;
      case 7:
        thisTweenTime = 1;
        console.log('AM tweenTime: ' + thisTweenTime);
        break;
      case 8:
        thisTweenTime = 1;
        console.log('A tweenTime: ' + thisTweenTime);
        break;
      case 9:
        thisTweenTime = 4.5;
        thisEase = Elastic.easeOut;
        console.log('DEVELOPER tweenTime: ' + thisTweenTime);
        break;
      case 10:
        thisTweenTime = .5;
        console.log('blank10 tweenTime: ' + thisTweenTime);
        break;
      case 11:
      thisEase = Power1.easeOut;
        thisTweenTime = 1.5;
        console.log('face tweenTime: ' + thisTweenTime);
        break;
      case 12:
        thisTweenTime = 4;
        console.log('blank12 tweenTime: ' + thisTweenTime);
        break;
      default:
        thisTweenTime = 1;
        console.log('default tweenTime: ' + thisTweenTime);
        break;
    }
    console.log('thisEase: '+ thisEase);
    console.log(thisEase);
    tweenMax.to({
      factor: 1
    }, thisTweenTime, {
      factor: 0,
      ease: thisEase,
      onUpdate: updateFun
    });
    this.previous = this.current;
  } else {
    this.loops = 0;
    this.tweenSpeed = .01;
    this.introAnimationInterval;
    var startIntro = function () {
      _this.introAnimationInterval = setInterval(updateFirstInt, 25);
    }

    console.log('starting animation in 3.5 secs:')
    setTimeout(startIntro, 3500)
  }
};

HeightMap.prototype.setColors = function () {
  if (this.lines) {
    for (var i = 0, j = this.lines.children.length; i < j; i++) {
      var line = this.lines.children[i];

      for (var k = 0, l = line.geometry.vertices.length; k < l; k++) {
        var vertex = line.geometry.vertices[k];
        var percent = map(vertex.z, [0, 3.8], [0, 2]);
        percent = Math.round(percent * 10) / 10;
        if (!this.colorsCache[percent]) {
          this.colorsCache[percent] = this.fromColor.clone().lerp(this.toColor, percent);
        }
        line.geometry.colors[k] = this.colorsCache[percent];
      }
      line.geometry.colorsNeedUpdate = true;
    }
  }

  if (this.plane || this.points) {
    for (var i = 0, j = this.geometry.faces.length; i < j; i++) {
      var face = this.geometry.faces[i];
      for (var k = 0; k < 3; k++) {
        var vertexIndex = face[this.faceIndices[k]];
        var vertex = this.geometry.vertices[vertexIndex];
        var percent = map(vertex.z, [0, 3.8], [0, 2]);
        percent = Math.round(percent * 10) / 10;
        if (!this.colorsCache[percent]) {
          this.colorsCache[percent] = this.fromColor.clone().lerp(this.toColor, percent);
        }
        face.vertexColors[k] = this.colorsCache[percent];
      }
    }
    this.geometry.colorsNeedUpdate = true;
  }
};

HeightMap.prototype.on = function () {
  this.events.on.apply(this.events, arguments);
};

HeightMap.prototype.trigger = function () {
  this.events.trigger.apply(this.events, arguments);
};

module.exports = HeightMap;