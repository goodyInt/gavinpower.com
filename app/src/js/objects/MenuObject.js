'use strict';

var jQuery = require('jquery');

/**
 * Menu
 *
 * @class Menu
 * @constructor
 * @requires jQuery
 */
function Menu() {
  var $el = jQuery('.menu');
  var $button = $el.find('.menuButton');
  var $itemsContainer = $el.find('.menuItems');
  var $items = $el.find('.menuItem');
  var _callback = function () {};
  var timeouts = [];

  /*
    function onMouseover () {
      console.log('mouseOver');
      console.log("$items: " + $items);
      console.log($items);
      $items.on('click', _callback);
      $itemsContainer.css('display', 'block');
      console.log('block');
      $el.stop().animate( { left: 0 } , 350  , 'swing');
      $button.stop().animate({ opacity: 0 }, 350);
      $items.each(function (i) {
        console.log('i:' + i)
        var $el = jQuery(this);
        var timeout = window.setTimeout(function () {
          $el.stop().animate({ opacity: 1 }, 350);
        }, i * 200);
        timeouts.push(timeout);
      });
      $el.one('mouseleave', onMouseout);
    }
    */

  function onButtonClick() {
    console.log('onButtonClick');
    
    console.log("$items: " + $items);
    console.log($items);
    $items.on('click', _callback);
    $itemsContainer.css('display', 'block');
    console.log('block');
    $el.stop().animate( { left: 0 } , 350  , 'swing');
    $button.stop().animate({ opacity: 0 }, 350);
 
    $items.each(function (i) {
      console.log('i:' + i)
      var $el = jQuery(this);
      var timeout = window.setTimeout(function () {
        $el.stop().animate({ opacity: 1 }, 350);
      }, i * 100);
      timeouts.push(timeout);
    });
    
  //  $el.one('mouseleave', onMouseout);
    
  }
  //$button.click(onButtonClick());
  $el.on('click', '.menuButton', onButtonClick);
  console.log('is this thing on???!');
/*
  function onMouseout() {
    console.log('mouseOut');
    if (timeouts) {
      for (var i = 0, j = timeouts.length; i < j; i++) {
        window.clearTimeout(timeouts[i]);
      }
      timeouts = [];
    }
    $el.stop().animate({
      left: 30
    }, 350, 'swing');
    $button.stop().animate({
      opacity: 0.5
    }, 350);
    $items.stop().animate({
      opacity: 0
    }, 350, function () {
      $itemsContainer.css('display', 'none');
      $items.off('click', _callback);
    });
    // $button.one('mouseover click', onMouseover);
  }
  */
  function onCloseClick() {
    console.log('onCloseClick');
    if (timeouts) {
      for (var i = 0, j = timeouts.length; i < j; i++) {
        window.clearTimeout(timeouts[i]);
      }
      timeouts = [];
    }
    $el.stop().animate({
      left: 30
    }, 350, 'swing');
    $button.stop().animate({
      opacity: 0.5
    }, 350);
    $items.stop().animate({
      opacity: 0
    }, 350, function () {
      $itemsContainer.css('display', 'none');
      $items.off('click', _callback);
    });
    // $button.one('mouseover click', onMouseover);
  }
  // $button.one('mouseover click', onMouseover);
  return {
    in: function () {
      $el.animate({
        top: 0,
        opacity: 1
      }, 500);
    },
    out: function () {
      onCloseClick();
    },
    onClick: function (callback) {
      //    console.log("in: callback onClick " + callback);
      _callback = callback;
    }
  };
}
/*
Menu.prototype.init = function () {
  var _this = this;

  // event
  this.$el.on('click', '.mapNode', function () {
    var index = jQuery(this).data('index');
    _this.callback(index);
  });

  // center
  this.$el.css('margin-top', -this.$el.height() / 2);

  // nodes
  this.$nodes = this.$el.find('.mapNode');
};
*/

module.exports = Menu;