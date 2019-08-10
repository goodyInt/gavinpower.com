'use strict';

var jQuery = require('jquery');

function Menu() {
  var $el = jQuery('.menu');
  var $button = $el.find('.menuButton');
  var $itemsContainer = $el.find('.menuItems');
  var $items = $el.find('.menuItem');
  var _callback = function () {};
  var timeouts = [];
  var isOpen = false;

  jQuery(window).on('resize', onResize);


  function onResize() {
    console.log('Menu onResize');
    console.log('$el: ');
    console.log($el);
    //jQuery($el).css("left", 0.0);
    var menuLeft = parseInt(jQuery($el).css("left"));
    console.log('menuLeft');
    console.log(menuLeft);

    if (window.innerWidth < 600) {
      if (isOpen) {
        jQuery($el).css("left", 0.0);
      } else {
        jQuery($el).css("left", -100.0);
      }

    } else {
      if (isOpen) {
        jQuery($el).css("left", 0.0);
      } else {
        jQuery($el).css("left", 30.0);
      }


    }
    console.log('isOpen: ' + isOpen);

  }

  function onButtonClick() {
    $items.on('click', _callback);
    $itemsContainer.css('display', 'block');

    $el.stop().animate({
      left: 0
    }, 350, 'swing');

    $button.stop().animate({
      opacity: 0
    }, 350);

    $itemsContainer.stop().animate({
      opacity: 1.0
    }, 350);

    $items.each(function (i) {
      var $el = jQuery(this);
      var timeout = window.setTimeout(function () {
        $el.stop().animate({
          opacity: 1
        }, 350);
      }, i * 100);
      timeouts.push(timeout);
    });
    isOpen = true;
    console.log('isOpen: ' + isOpen);
  }

  $el.on('click', '.menuButton', onButtonClick);

  function removeTheActive() {
    $items.removeClass('isActive');

  }

  function onCloseClick() {
    isOpen = false;
    if (timeouts) {
      for (var i = 0, j = timeouts.length; i < j; i++) {
        window.clearTimeout(timeouts[i]);
      }
      timeouts = [];
    }

    if (window.innerWidth < 600) {
      $el.stop().animate({
        left: -100
      }, 350, 'swing');
    } else {
      $el.stop().animate({
        left: 30
      }, 350, 'swing');
    }

    $button.stop().animate({
      opacity: 1.0
    }, 350);

    $itemsContainer.stop().animate({
      opacity: 0.0
    }, 350);

    $items.stop().animate({
      opacity: 0.0
    }, 350, function () {
      $itemsContainer.css('display', 'none');
      $items.off('click', _callback);
    });

  }
  return {
    in: function () {
      if (window.innerWidth < 600) {
        $el.animate({
          top: 0,
          left: -100,
          opacity: 1
        }, 500);
      } else {
        $el.animate({
          top: 0,
          left: 30,
          opacity: 1
        }, 500);
      }
    },
    out: function () {
      onCloseClick();
      removeTheActive();
    },
    outPhone: function () {
      onCloseClick();
    },
    onClick: function (callback) {
      _callback = callback;
    },
    removeTheActive: function () {
      removeTheActive();
    }
  };
}

module.exports = Menu;