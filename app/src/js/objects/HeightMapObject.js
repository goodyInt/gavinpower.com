'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var tweenMax = require('tweenMax');
var Events = require('../classes/EventsClass');
var random = require('../utils/randomUtil');
var map = require('../utils/mapUtil');

function HeightMap(options) {

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
  this.totalVerts = this.geometry.vertices.length;
  this.lastVert = this.totalVerts - 1;
  this.theIdleTween;
  this.introAnimationInterval;
  this.whenCompleteFunction;
  this.completeAnimationFunction;

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
   
  }

  if (this.firstRun) {
    for (var i = 0; i < this.totalVerts; i++) {
      this.originalVertices.push(new THREE.Vector3(this.geometry.vertices[i].x, this.geometry.vertices[i].y, this.geometry.vertices[i].z));
      this.geometry.vertices[i].x = Math.random() * 600 - 300;
      this.geometry.vertices[i].y = Math.random() * 600 - 300;
      this.geometry.vertices[i].z = Math.random() * 600 - 300;
    }
  };

  this.loadMaps();

  this.el = group;

  this.start = function () {
  };

  this.stop = function () {};

  this.on('ready', function () {
    
    this.ready = true;
    this.start = function () {
      //console.log('heightmap start start start rotateHorTween: ' + rotateHorTween)
      if (!rotateHorTween) {
        rotateRight();
        rotateUp();
      } else {
        this.theIdleTween.resume();
        rotateHorTween.resume();
        rotateVertTween.resume();
      }
    };
    this.stop = function () {
      this.theIdleTween.pause();
      rotateHorTween.pause();
      rotateVertTween.pause();
    };
  }.bind(this));

  var thisRotation = this.el.rotation;

  var rotateHorTween;
  var rotateLeft = function () {
    ////console.log('rotateLeft');
    rotateHorTween = tweenMax.to(thisRotation, 20, {
      ease: Power2.easeInOut,
      y: .25,
      onComplete: rotateRight
    });
  }
  var rotateRight = function () {
    //console.log('rotateRight');
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
  fromColor: '#2a2a2a',
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
var tweenPauseTime = 1;
HeightMap.prototype.getIdleTween = function () {
  //console.log('');
  //console.log('getIdleTween tweenCounter:' + tweenCounter);
  //console.log('getIdleTween tweenPauseTime:' + tweenPauseTime);
  var _this = this;
  return tweenMax.to({}, tweenPauseTime, {
    paused: false,
    onComplete: function () {
      _this.current++;
      if (_this.current === _this.total) {
        _this.current = 0;
      }
      switch (tweenCounter) {
        case -1:
          tweenPauseTime = .35;
               //console.log('H hold: ' + tweenPauseTime);
          break;
        case 0:
          tweenPauseTime = .35;
             //console.log('He hold: ' + tweenPauseTime);
          break;
        case 1:
          tweenPauseTime = .35;
            //console.log('Hel hold: ' + tweenPauseTime);
          break;
        case 2:
          tweenPauseTime = .35;
             //console.log('Hell hold: ' + tweenPauseTime);
          break;
        case 3:
          tweenPauseTime = .35;
            //console.log('Hello hold: ' + tweenPauseTime);
          break;
        case 4:
          tweenPauseTime = 4;
           //console.log('Friend hold: ' + tweenPauseTime);
          break;
        case 5:
          tweenPauseTime = .5;
           //console.log('blank5 hold: ' + tweenPauseTime);
          break;
        case 6:
          tweenPauseTime = .65;
           //console.log('I hold: ' + tweenPauseTime);
          break;
        case 7:
          tweenPauseTime = .65;
            //console.log('AM hold: ' + tweenPauseTime);
          break;
        case 8:
          tweenPauseTime = 2;
            //console.log('A hold: ' + tweenPauseTime);
          break;
        case 9:
          tweenPauseTime = 6;
            //console.log('DEVELOPER hold: ' + tweenPauseTime);
          break;
        case 10:
          tweenPauseTime = 4.5;
             //console.log('Blank hold: ' + tweenPauseTime);
          break;
        case 11:
          tweenPauseTime = 10;
            //console.log('face hold: ' + tweenPauseTime);
          break;
        case 12:
          tweenCounter = -2;
          tweenPauseTime = 3;
            //console.log('default 12 hold: ' + tweenPauseTime);
          break;
        default:
          tweenPauseTime = 1;
             //console.log('default hold: ' + tweenPauseTime);
          break;
      }
      _this.applyMap();
      tweenCounter++;
      _this.theIdleTween = _this.getIdleTween();
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
    //console.log('loadMap: ' + index);
    loader.load(map.url, function (image) {
      addMap(map.name, image);
      loaded++;
      if (loaded === 1) {
        _this.current = 0;
        //console.log('loadMap');
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
  var previousName = typeof this.previous === 'undefined' ? 'default' :
  this.parameters.maps[this.previous].name;
  var currentName = this.parameters.maps[this.current].name;
  var previousData = this.data[previousName];
  var currentData = this.data[currentName];
  var thisTweenTime = 2;
  var _this = this;
  var thisEase = Power1.easeOut;
  //console.log('applyMap currentName : ' + currentName);
  //console.log('applyMap this.current : ' + this.current);
  
  //console.log('tweenCounter: ' + tweenCounter);
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
    //console.log('updateFirstInt');
    _this.loops += 25;
    _this.tweenSpeed *= 1.02;
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
      for (var i = 0, j = _this.totalVerts; i < j; i++) {
        var vertex = _this.geometry.vertices[i];
        vertex.x = _this.originalVerticesSquare[i].x
        vertex.y = _this.originalVerticesSquare[i].y
        vertex.z = _this.originalVerticesSquare[i].z
      }
      _this.geometry.verticesNeedUpdate = true;

      _this.el.add(_this.lines);
      currentData = [];
      previousData = [];
      for (var i = 0, j = _this.totalVerts; i < j; i++) {
        previousData.push(_this.geometry.vertices[i].x)
        currentData.push(_this.originalVertices[i].x)
      }
      tweenMax.to({
        factor: 1
      }, 2, {
        factor: 0,
        ease: Elastic.easeInOut,
        onUpdate: updateStretchy,
        onComplete: function () {
          //console.log('this is the end of stretchy: time for maps and menu');
          _this.start();
          _this.firstRun = false;
          _this.theIdleTween = _this.getIdleTween();
          _this.whenCompleteFunction();
        }
      });
    }
  };
  this.applyMap.updateFirstInt = updateFirstInt;
  if (!this.firstRun) {
    thisEase = Power1.easeOut;
    switch (tweenCounter) {
      case -1:
        thisTweenTime = .3;
           //console.log('H tweenTime: ' + thisTweenTime);
        break;
      case 0:
        thisTweenTime = .3;
            //console.log('He tweenTime: ' + thisTweenTime);
        break;
      case 1:
        thisTweenTime = .3;
            //console.log('Hel tweenTime: ' + thisTweenTime);
        break;
      case 2:
        thisTweenTime = .3;
            //console.log('Hell tweenTime: ' + thisTweenTime);
        break;
      case 3:
        thisTweenTime = .3;
         //console.log('Hello tweenTime: ' + thisTweenTime);
        break;
      case 4:
        thisEase = Elastic.easeOut;
        thisTweenTime = 3.25;
           //console.log('Friend tweenTime: ' + thisTweenTime);
        break;
      case 5:
          //console.log('Blank5 tweenTime: ' + thisTweenTime);
        thisTweenTime = .5;
        break;
      case 6:
        thisTweenTime = .65;
        thisEase = Power1.easeIn;
           //console.log('I tweenTime: ' + thisTweenTime);
        break;
      case 7:
        thisEase = Power1.easeIn;
        thisTweenTime = .65;
           //console.log('AM tweenTime: ' + thisTweenTime);
        break;
      case 8:
        thisEase = Power1.easeIn;
        thisTweenTime = .65;
          //console.log('A tweenTime: ' + thisTweenTime);
        break;
      case 9:
        thisTweenTime = 2.65;
        thisEase = Power1.easeOut;
        //console.log('DEVELOPER tweenTime: ' + thisTweenTime);
        break;
      case 10:
        thisEase = Power1.easeOut;
        thisTweenTime = 1.5;
        _this.completeAnimationFunction();
         //console.log('blank10 tweenTime: ' + thisTweenTime);
        break;
      case 11:
        thisEase = Power1.easeOut;
        thisTweenTime = 5.5;
      
             //console.log('face tweenTime: ' + thisTweenTime);
        break;
      case 12:
        thisTweenTime = 4;
           //console.log('blank12 tweenTime: ' + thisTweenTime);
        break;
      default:
        thisTweenTime = 1;
           //console.log('default tweenTime: ' + thisTweenTime);
        break;
    }
    //  console.log('thisEase: '+ thisEase);
    tweenMax.to({
      factor: 1
    }, thisTweenTime, {
      factor: 0,
    
      ease: thisEase,
      onUpdate: updateFun
    });
    this.previous = this.current;
  } else {
    //console.log('HERE is where it was was');
    //this.startItUp();
  }
};
HeightMap.prototype.startItUp = function (whenCompleteFunction) {
  //console.log('starting animation in 1 secs:')
  this.whenCompleteFunction = whenCompleteFunction;
  var _this = this;
  this.loops = 0;
  this.tweenSpeed = .01;

  var startIntro = function () {
    //console.log('startIntro.startItUp');
    _this.introAnimationInterval = setInterval(_this.applyMap.updateFirstInt, 25);
  }
  setTimeout(startIntro, 1000)

}

HeightMap.prototype.setOnCompleteFunction = function (theCompleteAnimationFunction) {
  
  this.completeAnimationFunction = theCompleteAnimationFunction;
 
}

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