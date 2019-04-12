'use strict';
var jQuery = require('jquery');
/**
 * Navigation Map
 *
 * @class Map
 * @constructor
 * @requires jQuery
 */
function Map () {
  this.$el = jQuery('<div class="map"></div>');
  this.$nodes = null;
  this.callback = function () {};
}
/**
 * Default node
 * 
 * @property $node
 */
Map.prototype.$node = jQuery('<div class="mapNode"></div>');
/**
 * Add a new node
 *
 * @method addNode
 * @param {Number} [index]
 */
Map.prototype.addNode = function (index) {
  var $node = this.$node.clone();
  $node.attr('data-index', index);

 
  this.$el.append($node);
};

/**
 * Initialize
 *
 * @method init
 */
Map.prototype.init = function () {
  var _this = this;

  // event
  this.$el.on('click', '.mapNode', function () {
    var index = jQuery(this).data('index');
    _this.callback(index);
  });

  // center
  this.$el.css('margin-top', - this.$el.height() / 2);

  // nodes
  this.$nodes = this.$el.find('.mapNode');
};

/**
 * Set onClick callback
 *
 * @method onClick
 * @param {Function} [callback]
 */
Map.prototype.onClick = function (callback) {
  this.callback = callback;
};
  
/**
 * Set active node (.isActive)
 *
 * @method setActive
 * @param {Number} [index]
 */
Map.prototype.setActive = function (index) {
  this.$nodes.removeClass('isActive');
  jQuery(this.$nodes[index]).addClass('isActive');
};

/**
 * In animation
 *
 * @method in
 */
Map.prototype.in = function () {
  this.$nodes.each(function (i) {
    jQuery(this).delay(i * 100).animate({ right: 0, opacity: .25 }, 500);
  });
};

module.exports = Map;