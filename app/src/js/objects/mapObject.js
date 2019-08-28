'use strict';
var jQuery = require('jquery');

function Map () {
  this.$el = jQuery('<div class="map"></div>');
  this.mapBackground = jQuery('<div class="mapBackground"></div>');
  this.$el.append( this.mapBackground);
  this.$nodes = null;
  this.callback = function () {};
  this.hoverCallback = function () {};
}

Map.prototype.$node = jQuery('<div class="mapNode"></div>');

Map.prototype.addNode = function (index) {
  var $node = this.$node.clone();
  $node.attr('data-index', index);
  this.$el.append($node);
};

Map.prototype.init = function () {
  var _this = this;

  this.$el.on('click', '.mapNode', function () {
    var index = jQuery(this).data('index');
    _this.callback(index);
  });

  this.$el.on('mouseenter', '.mapNode', function () {
    var index = jQuery(this).data('index');
    _this.hoverCallback(index);
  });
  this.$el.css('margin-top', - this.$el.height() / 2);
  this.$nodes = this.$el.find('.mapNode'); 
};

Map.prototype.onClick = function (callback) {
  this.callback = callback;
};

Map.prototype.onHover = function (hoverCallback) {
  this.hoverCallback = hoverCallback;
};

Map.prototype.setActive = function (index) {
  this.$nodes.removeClass('isActive');
  jQuery(this.$nodes[index]).addClass('isActive');
};

Map.prototype.in = function () {
  this.$nodes.each(function (i) {
    jQuery(this).delay(i * 100).animate({ right: 0, opacity: .25 }, 500);
  });
};

module.exports = Map;