'use strict';

var jQuery = require('jquery');

function Menu() {
  var $el = jQuery('.menu');
  var $button = $el.find('.menuButton');
  var $itemsContainer = $el.find('.menuItems');
  var $items = $el.find('.menuItem');
  var _callback = function () {};
  var hoverCallback = function () {};
  var timeouts = [];
  var isOpen = false;
  var previousInnerWidth = window.innerWidth;

  jQuery(window).on('resize', onResize);


  function onResize() {
    console.log('isOpen: ' + isOpen);
    console.log('previousInnerWidth: ' + previousInnerWidth);

    if (window.innerWidth < 600) {
      if (isOpen) {
        if (previousInnerWidth >= 600) {
          console.log('close menu here!')
          onCloseClickFast();
          jQuery($el).css("left", -100.0);
        } else {
          jQuery($el).css("left", 0.0);
        }
      } else {

        jQuery($el).css("left", -100.0);
      }

    } else {
      if (isOpen) {
        jQuery($el).css("left", 0.0);
      } else {
        jQuery($el).css("left", -30.0);
      }
    }
    previousInnerWidth = window.innerWidth;

  }

  function onButtonClick() {
    $items.on('click', _callback);
    $itemsContainer.css('display', 'block');

    $el.stop().animate({
      left: 0
    }, 350, 'swing');

    $button.stop().animate({
      opacity: 0
    }, 350, 'swing', function () {
      console.log('buttonOut');
      jQuery($button).css("visibility", 'hidden');
    });

    // .animate( properties [, duration ] [, easing ] [, complete ] )Returns: jQuery

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
  }

  $el.on('click', '.menuButton', onButtonClick);

  $el.on('mouseenter', '.menuButton', function () {
    console.log('main button');
  });

  jQuery($items).hover(function () {
  //console.log(this.getAttribute("data-button"));
    hoverCallback(this.getAttribute('data-button'));
  });

  function removeTheActive() {
    $items.removeClass('isActive');

  }

  function onCloseClickFast() {

    if (timeouts) {
      for (var i = 0, j = timeouts.length; i < j; i++) {
        window.clearTimeout(timeouts[i]);
      }
      timeouts = [];
    }
    jQuery($button).css("visibility", 'visible');
    jQuery($button).css("opacity", 1.0);
    jQuery($itemsContainer).css("opacity", 0.0);
    jQuery($items).css("opacity", 0.0);
    $itemsContainer.css('display', 'none');
    $items.off('click', _callback);
    isOpen = false;

  }

  function onCloseClick() {
    jQuery($button).css("visibility", 'visible');
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
        left: -30
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
    isOpen = false;

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
          left: -30,
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
    onHover: function (callback) {
      console.log('onHoverCallback');
      hoverCallback = callback;
    },

    removeTheActive: function () {
      removeTheActive();
    }
  };
}

module.exports = Menu;