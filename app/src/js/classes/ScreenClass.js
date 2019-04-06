'use strict';

var THREE = require('three');

/**
 * Screen class
 * 
 * @class Screen
 * @constructor
 * @param {String} [name]
 * @requires THREE
 */
function Screen (name) {
  console.log("new Screen: " + name);
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
Screen.prototype.add = function (object) {
  this.el.add(object);
};
/**
 * Screen's in animation
 *
 * @method in
 * @param {String} [way]
 */
Screen.prototype.in = function (way) {
  this._in(way);
};

/**
 * Screen's out animation
 *
 * @method out
 * @param {String} [way]
 */
Screen.prototype.out = function (way) {
  this._out(way);
};

/**
 * Start the Screen
 *
 * @method start
 */
Screen.prototype.start = function () {
  if (this.playing) {
    return false;
  }
  this._start();

  this.playing = true;
};

/**
 * Stop the Screen
 *
 * @method stop
 */
Screen.prototype.stop = function () {
  if (!this.playing) {
    return false;
  }

  this._stop();

  this.playing = false;
};

/**
 * Pass the in handler
 *
 * @method onIn
 * @param {Function} [callback]
 */
Screen.prototype.onIn = function (callback) {
  this._in = callback;
};

/**
 * Pass the out handler
 *
 * @method onOut
 * @param {Function} [callback]
 */
Screen.prototype.onOut = function (callback) {
  this._out = callback;
};

/**
 * Pass the start handler
 *
 * @method onStart
 * @param {Function} [callback]
 */
Screen.prototype.onStart = function (callback) {
  this._start = callback;
};

/**
 * Pass the stop handler
 *
 * @method onStop
 * @param {Function} [callback]
 */
Screen.prototype.onStop = function (callback) {
  this._stop = callback;
};

module.exports = Screen;