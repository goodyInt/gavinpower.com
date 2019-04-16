'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var TweenLite = require('tweenlite');
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
    console.log('ready');
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
    rotateHorTween = TweenLite.to(thisRotation, 20, {
      ease: Power2.easeInOut,
      y: .25,
      onComplete: rotateRight
    });
  }
  var rotateRight = function () {
    rotateHorTween = TweenLite.to(thisRotation, 20, {
      ease: Power2.easeInOut,
      y: -.25,
      onComplete: rotateLeft
    });
  }
  var rotateVertTween;
  var rotateUp = function () {
    rotateVertTween = TweenLite.to(thisRotation, 15, {
      ease: Power2.easeInOut,
      x: .25,
      onComplete: rotateDown
    });
  }
  var rotateDown = function () {
    rotateVertTween = TweenLite.to(thisRotation, 15, {
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
  console.log('getIdleTween');
  var _this = this;

  return TweenLite.to({}, tweenPauseTime, {
    paused: false,
    onComplete: function () {
      _this.current++;
      if (_this.current === _this.total) {
        _this.current = 0;
      }
      console.log('tweenCounter: ' + tweenCounter);
      switch (tweenCounter) {
        case -1:
          tweenPauseTime = .35;
          console.log('H wait: ' + tweenPauseTime);
          break;
        case 0:
          tweenPauseTime = .35;
          console.log('He wait: ' + tweenPauseTime);
          break;
        case 1:
          tweenPauseTime = .35;
          console.log('Hel wait: ' + tweenPauseTime);
          break;
        case 2:
          tweenPauseTime = .35;
          console.log('Hell wait: ' + tweenPauseTime);
          break;
        case 3:
          tweenPauseTime = .85;
          console.log('Hello wait: ' + tweenPauseTime);
          break;
        case 4:
          tweenPauseTime = 5;
          console.log('Friend wait: ' + tweenPauseTime);
          break;
        case 5:
          tweenPauseTime = .5;
          console.log('blank5 wait: ' + tweenPauseTime);
          break;
        case 6:
          tweenPauseTime = 1.35;
          console.log('I wait: ' + tweenPauseTime);
          break;
        case 7:
          tweenPauseTime = 1;
          console.log('AM wait: ' + tweenPauseTime);
          break;
        case 8:
          tweenPauseTime = 2;
          console.log('A wait: ' + tweenPauseTime);
          break;
        case 9:
          tweenPauseTime = 6;
          console.log('DEVELOPER wait: ' + tweenPauseTime);
          break;
        case 10:
          tweenPauseTime = .5;
          console.log('Blank wait: ' + tweenPauseTime);
          break;
        case 11:
          tweenPauseTime = 4;
          console.log('face wait: ' + tweenPauseTime);
          break;
        case 12:
          tweenCounter = -2;
          tweenPauseTime = 1;
          console.log('default 12 wait: ' + tweenPauseTime);
          break;
        default:
          tweenPauseTime = 1;
          console.log('default wait: ' + tweenPauseTime);
          break;
      }
      _this.applyMap();
      tweenCounter++;
      this.duration(tweenPauseTime);
      this.restart();
    }
  });
};

HeightMap.prototype.loadMaps = function () {
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
  console.log('applyMap this.firstRun: ' + this.firstRun);
  var previousName = typeof this.previous === 'undefined' ? 'default' :
    this.parameters.maps[this.previous].name;
  var currentName = this.parameters.maps[this.current].name;
  var previousData = this.data[previousName];
  var currentData = this.data[currentName];
  var thisTweenTime = 2;
  var _this = this;
  var thisEase = "Power1.easeOut";

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
  }

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
      _this.loops = 0;
      _this.tweenSpeed = .05;
      _this.stretchAnimationInterval = setInterval(stretchIt, 25);
    }
  }
 
  var stretchIt = function () {
    _this.tweenSpeed *= 1.005;

    for (var i = 0, j = _this.totalVerts; i < j; i++) {
      var vertex = _this.geometry.vertices[i];
      var offsetX = vertex.x + ((_this.originalVertices[i].x - vertex.x) * _this.tweenSpeed);
      vertex.x = offsetX;
    }
    _this.geometry.verticesNeedUpdate = true;

    if (_this.lines) {
      for (var k = 0, l = _this.lines.children.length; k < l; k++) {
        _this.lines.children[k].geometry.verticesNeedUpdate = true;
      }
    }
    _this.setColors();

    var lastX = _this.geometry.vertices[_this.lastVert].x;
    var lastXDiff = (_this.originalVertices[_this.lastVert].x - lastX) * 100;
  
    if (lastXDiff < 1 || _this.loops > 100) {

      clearInterval(_this.stretchAnimationInterval);
      _this.firstRun = false;
   _this.getIdleTween();
    }
  }
 
  thisEase = 'Power1.easeOut';
  switch (tweenCounter) {
    case -1:
      console.log('H');
      thisTweenTime = .35;
      break;
    case 0:
      console.log('He');
      thisTweenTime = .3;
      break;
    case 1:
      console.log('Hel');
      thisTweenTime = .25;
      break;
    case 2:
      console.log('Hell');
      thisTweenTime = .2;
      break;
    case 3:
      console.log('Hello');
      thisTweenTime = .15;
      break;
    case 4:
      console.log('Friend');
      //
      thisEase = 'Elastic.easeOut.config(1.1, 0.4)';
      thisTweenTime = 2.25;
      break;
    case 5:
      console.log('Blank5');
      thisTweenTime = .5;
      break;
    case 6:
      console.log('I');
      thisTweenTime = 1;
      break;
    case 7:
      console.log('AM');
      thisTweenTime = 1;
      break;
    case 8:
      console.log('A');
      thisTweenTime = 1;
      break;
    case 9:
      console.log('DEVELOPER');
      thisTweenTime = 4.5;
      thisEase = 'window.Elastic.easeOut';
      break;
    case 10:
      console.log('blank10');
      thisTweenTime = .5;
      break;
    case 11:
      console.log('face');
      thisEase = 'Power1.easeOut';
      thisTweenTime = 3.5;
      break;
    case 12:
      console.log('blank12');
      thisTweenTime = 4;
      break;
    default:
      console.log('default');
      thisTweenTime = 1;
      break;
  }
  if (!this.firstRun) {
    TweenLite.to({
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