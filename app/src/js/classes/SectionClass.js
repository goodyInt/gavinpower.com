'use strict';

var THREE = require('three');

/**
 * Section class
 * 
 * @class Section
 * @constructor
 * @param {String} [name]
 * @requires THREE
 */
function Section (name) {
  this.name = name;
  this.playing = false;
  var fn = function () {};
  this._in = fn;
  this._out = fn;
  this._start = fn;
  this._stop = fn;
  this.el = new THREE.Object3D();
}
/**
 * Add a new object
 *
 * @method add
 * @param {THREE.Object3D} [object]
 */
Section.prototype.add = function (object) {
  this.el.add(object);
};
/**
 * Section's in animation
 *
 * @method in
 * @param {String} [way]
 */
Section.prototype.in = function (way) {
  //console.log('');
  //console.log('SectionClass.in() '+this.name);
  this._in(way);
};

/**
 * Section's out animation
 *
 * @method out
 * @param {String} [way]
 */
Section.prototype.out = function (way) {

  this._out(way);
 
};

/**
 * Start the Section
 *
 * @method start
 */
Section.prototype.start = function () {
  //console.log('');
//  console.log('SectionClass.start() -'+this.name+'.playing: ' + this.playing);
  if (this.playing) {
    return false;
  }
  this._start(); 
  this.playing = true;
 
};
/**
 * Stop the Section
 *
 * @method stop
 */
Section.prototype.stop = function () {
  //console.log('SectionClass.stop() - '+this.name+'.playing: ' + this.playing);
  ////console.log(this);
  if (!this.playing) {
    return false;
  }
  //console.log('SectionClass this._stop: ' + this._stop);
  this._stop();
  this.playing = false;
};

/**
 * Pass the in handler
 *
 * @method onIn
 * @param {Function} [callback]
 */
Section.prototype.onIn = function (callback) {
  ////console.log('Section.prototype.onIn callback: ' + callback)
  this._in = callback;
};

/**
 * Pass the out handler
 *
 * @method onOut
 * @param {Function} [callback]
 */
Section.prototype.onOut = function (callback) {
 
  this._out = callback;
};

/**
 * Pass the start handler
 *
 * @method onStart
 * @param {Function} [callback]
 */
Section.prototype.onStart = function (callback) {
  //console.log('SectionClass.onStart() ' +this.name+'.callback: ' + callback);
  this._start = callback;
};

/**
 * Pass the stop handler
 *
 * @method onStop
 * @param {Function} [callback]
 */
Section.prototype.onStop = function (callback) {
  this._stop = callback;
};

module.exports = Section;