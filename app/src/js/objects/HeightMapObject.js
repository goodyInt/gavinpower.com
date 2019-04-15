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

  // console.log(options);
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
  // console.log(this.geometry);
  // console.log(this.geometry.vertices);
  this.originalVertices = [];
  this.firstRun = true;
  for (var i = 0; i < this.geometry.vertices.length; i++) {
    //console.log(i);
    //console.log(this.geometry.vertices[i].x);
    // this.originalVertices.push(new THREE.Vector3(this.geometry.vertices[i].x, this.geometry.vertices[i].y, this.geometry.vertices[i].z));
    this.originalVertices.push(new THREE.Vector3(this.geometry.vertices[i].x, this.geometry.vertices[i].y, this.geometry.vertices[i].z));

    if (i == 0) {
      console.log('STARTED FROM THE BOTTOM');
      //  console.log(this.originalVertices[i].z );
    }
    // console.log('');
    //console.log('this.geometry.vertices['+i+'].x ' + this.geometry.vertices[i].x);
    //console.log('this.geometry.vertices['+i+'].y ' + this.geometry.vertices[i].y);
    //console.log('this.geometry.vertices['+i+'].z ' + this.geometry.vertices[i].z);
    this.geometry.vertices[i].x = Math.random() * 400 - 200;
    this.geometry.vertices[i].y = Math.random() * 400 - 200;
    this.geometry.vertices[i].z = Math.random() * 400 - 200;
    if (i == 0) {
      //  console.log(this.geometry.vertices[i].z );

    }
    //console.log(' this.geometry.vertices[i].z:' +  this.geometry.vertices[i].z);
  }
  if (this.parameters.plane) {
    this.plane = this.getPlane();
    group.add(this.plane);
  }

  if (this.parameters.points) {
    this.points = this.getPoints();
    // console.log(this.points);
    group.add(this.points);
  }

  if (this.parameters.horizontal || this.parameters.vertical) {
    this.lines = this.getLines();
    //  console.log('this.linesHERE');
    //  console.log(this.lines);
    // group.add(this.lines);
  }

  this.loadMaps();

  this.el = group;

  this.start = function () {};

  this.stop = this.start;

  this.on('ready', function () {
    // console.log('ready');
    this.ready = true;
    var idleTween = this.getIdleTween();
    this.start = function () {
      //  console.log('start start start');
      idleTween.resume();
      rotateLeft();
      rotateUp();
      // console.log('startDone startDone startDone');
    };

    this.stop = function () {
      // console.log('stop stop stop');
      idleTween.pause();
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
  //  console.log('getPlane');
  var material = new THREE.MeshLambertMaterial({
    shading: THREE.FlatShading,
    vertexColors: THREE.VertexColors
  });
  var plane = new THREE.Mesh(this.geometry, material);
  return plane;
};

HeightMap.prototype.getPoints = function () {
  // console.log('getPoints');
  var material = new THREE.PointsMaterial({
    //size: .65,
    size: .5,
    color: 0xeb0013
    // color: 0xff7704
    // color: 0xfff46a
    // color: 0x47aff
    // color: 0xffb577
    // 0xeb0013,0xff7704,0xfff46a,0x47aff,0xffb577
  });
  var points = new THREE.Points(this.geometry, material);

  return points;
};

HeightMap.prototype.getLines = function () {
  //  console.log('getLines');
  var material = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors
  });
  var lines = new THREE.Object3D();
  /// console.log('this.parameters.vertical: ' + this.parameters.vertical);
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
  // console.log('this.parameters.horizontal: ' + this.parameters.horizontal);
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
var tweenPauseTime = 10;
HeightMap.prototype.getIdleTween = function () {
  console.log('getIdleTween');
  var _this = this;

  return TweenLite.to({}, tweenPauseTime, {
    paused: true,
    onComplete: function () {
      _this.current++;
      if (_this.current === _this.total) {
        _this.current = 0;
      }
      switch (tweenCounter) {
        case -1:
          tweenPauseTime = .55;
          break;
        case 0:
          tweenPauseTime = .5;
          break;
        case 1:
          tweenPauseTime = .45;
          break;
        case 2:
          tweenPauseTime = .35;
          break;
        case 3:
          tweenPauseTime = 1.25;
          break;
        case 4:
          tweenPauseTime = 5;
          break;
        case 5:
          tweenPauseTime = .5;
          break;
        case 6:
          tweenPauseTime = 2.5;
          break;
        case 7:
          tweenPauseTime = 2.5;
          break;
        case 8:
          tweenPauseTime = 2.5;
          break;
        case 9:
          tweenPauseTime = 5;
          break;
        case 10:
          tweenPauseTime = .5;
          break;
        case 11:
          tweenPauseTime = 4;
          break;
        case 12:
          tweenCounter = -2;
          tweenPauseTime = 1;
          break;
        default:
          tweenPauseTime = 1;
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
  // console.log('loadMaps');
  var totalData = (this.parameters.divisionsX + 1) * (this.parameters.divisionsY + 1);
  this.data = {
    default: new Float32Array(totalData)
  };
  var loader = new THREE.ImageLoader();
  var total = this.parameters.maps.length;
  var loaded = 0;

  var addMap = function (name, image) {
    //   console.log('addMap name: ' + name);
    //  console.log('addMap image: ' + image);
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
        // console.log('pixelData: ' + pixelData);
        data[i++] = (pixelData[0] + pixelData[1] + pixelData[2]) / 100;
      }
    }

    //console.log('i: ' + i);
    _this.data[name] = data;
    // console.log('addMap data: ' + data);
    // console.log('data.length:' + data.length);
    // console.log('_this.data: ' + _this.data);
    // console.log(_this.data);
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
    // console.log('map (in load): ');
    // console.log(map);
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
    // console.log('updateFun');
    for (var i = 0, j = _this.geometry.vertices.length; i < j; i++) {
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
  var updateTest = function () {
    // console.log('updateTest');
    for (var i = 0, j = _this.geometry.vertices.length; i < j; i++) {
      var vertex = _this.geometry.vertices[i];
      var offset = currentData[i] + ((previousData[i] - currentData[i]) * .25);
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

  var updateFirst = function () {

    //
    _this.loops += 20;
    console.log('_this.loops: ' + _this.loops);
    console.log(_this.geometry.vertices.length);

    for (var i = 0, j = _this.geometry.vertices.length; i < j; i++) {
      if (i < _this.loops) {
        var vertex = _this.geometry.vertices[i];
        var offsetX = vertex.x + ((_this.originalVertices[i].x - vertex.x) * .05);
        vertex.x = offsetX;
        var offsetY = vertex.y + ((_this.originalVertices[i].y - vertex.y) * .05);
        vertex.y = offsetY;
        var offsetZ = vertex.z + ((_this.originalVertices[i].z - vertex.z) * .05);
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
  }
  thisEase = 'Power1.easeOut';
  switch (tweenCounter) {
    case -1:
      thisTweenTime = .5;
      break;
    case 0:
      thisTweenTime = .45;
      break;
    case 1:
      thisTweenTime = .35;
      break;
    case 2:
      thisTweenTime = .25;
      break;
    case 3:
      thisTweenTime = .15;
      break;
    case 4:
    //Elastic.easeOut.config(1.1, 0.4)
      thisEase = 'window.Elastic.easeOut';
      thisTweenTime = 5.25;
      break;
    case 5:
      thisTweenTime = .5;
      break;
    case 6:
      thisTweenTime = 1;
      break;
    case 7:
      thisTweenTime = 1;
      break;
    case 8:
      thisTweenTime = 1;
      break;
    case 9:
      thisTweenTime = 2.5;
      thisEase = 'window.Elastic.easeOut';
      break;
    case 10:
      thisTweenTime = .5;
      break;
    case 11:
      thisEase = 'Power1.easeOut';
      thisTweenTime = 3.5;
      break;
    case 12:
      thisTweenTime = 4;
      break;
    default:
      thisTweenTime = 1;
      break;
  }
  console.log('this.firstRun:' + this.firstRun);
  if (!this.firstRun) {
    console.log('IF IF IF');

    TweenLite.to({
      factor: 1
    }, thisTweenTime, {
      factor: 0,
      ease: thisEase,
      onUpdate: updateFun
    });
    this.previous = this.current;

  } else {
    //  updateTest();
    //_this.lines = false;
    // updateFirst();
    console.log('ELSE ELSE ELSE');
    this.loops = 0;
    TweenLite.to({
      factor: 0
    }, 8, {
      delay: 2,
      factor: 2,
      ease: Power3.easeIn,
      onUpdate: updateFirst,
      onComplete: function () {
        console.log('done');
        _this.firstRun = false;
        _this.el.add(_this.lines);
      }
    });

  }




};

HeightMap.prototype.setColors = function () {
  // console.log('setColors this.lines:' + this.lines);

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
  // console.log('on');
  this.events.on.apply(this.events, arguments);
};

HeightMap.prototype.trigger = function () {
  // console.log('trigger');
  this.events.trigger.apply(this.events, arguments);
};

module.exports = HeightMap;