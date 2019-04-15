'use strict';

var jQuery = require('jquery');

function Menu() {
  var $el = jQuery('.menu');
  var $button = $el.find('.menuButton');
  var $itemsContainer = $el.find('.menuItems');
  var $items = $el.find('.menuItem');
  var _callback = function () {};
  var timeouts = [];

  function onButtonClick() {
    $items.on('click', _callback);
    $itemsContainer.css('display', 'block');
    $el.stop().animate( { left: 0 } , 350  , 'swing');
    $button.stop().animate({ opacity: 0 }, 350);
 
    $items.each(function (i) {
      var $el = jQuery(this);
      var timeout = window.setTimeout(function () {
        $el.stop().animate({ opacity: 1 }, 350);
      }, i * 100);
      timeouts.push(timeout);
    });
  }

  $el.on('click', '.menuButton', onButtonClick);

  function onCloseClick() {
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
    
  }
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
       _callback = callback;
    }
  };
}


module.exports = Menu;