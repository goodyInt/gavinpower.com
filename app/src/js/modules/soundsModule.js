var myHowler = require('howler');
var jQuery = require('jquery');
var tweenMax = require('tweenMax');
/**
 * Sounds module
 *
 * @module SOUNDS
 * @requires Howler
 */
var SOUNDS = (function () {

  var instance;

  var toggleSwitchDiv;
  toggleSwitchDiv = document.createElement('div');
  toggleSwitchDiv.id = "toggleSwitchDiv";
  toggleSwitchDiv.className = "toggleSwitchDiv";

  function init() {

    var isMuted = true;
    myHowler.Howler.mute(isMuted);

    var divToggleBtnOn = document.createElement('img');
    divToggleBtnOn.src = "./img/sound-on-outline_on_stroke_40.png";
    divToggleBtnOn.id = "divToggleBtnOn";
    divToggleBtnOn.className = "divToggleBtnOn";
    toggleSwitchDiv.appendChild(divToggleBtnOn);

    var divToggleBtnOff = document.createElement('img');
    divToggleBtnOff.src = "./img/sound-on-outline_off_stroke_40.png";
    divToggleBtnOff.id = "divToggleBtnOff";
    divToggleBtnOff.className = "divToggleBtnOff";
    toggleSwitchDiv.appendChild(divToggleBtnOff);

    toggleSwitchDiv.onclick = function () {

      instance.toggle();


    };

    document.body.appendChild(toggleSwitchDiv);


    return {
      /**
       * Toggle on/off sounds
       *
       * @method toogle
       */
      in: function () {
        console.log('soubndButtonIn: ' + toggleSwitchDiv);
        jQuery(toggleSwitchDiv).animate({
          right: 60,
          opacity: 1
        }, 500);

      },

      toggle: function () {

        isMuted = !isMuted;

        myHowler.Howler.mute(isMuted);

        if (isMuted) {
          divToggleBtnOn.style.visibility = 'hidden';
          divToggleBtnOff.style.visibility = 'visible';
        } else {
          divToggleBtnOn.style.visibility = 'visible';
          divToggleBtnOff.style.visibility = 'hidden';
        }

        console.log('toggle END isMuted: ' + isMuted);

      },
      fadeOut: function (theHowl) {

        theHowl.fade(.5, 0, 1000); //: function(from, to, len, id) {
      },
      fadeIn: function (theHowl, newVol) {
        console.log('newVol: ' + newVol);
        theHowl.fade(0, newVol, 1000); //: function(from, to, len, id) {
      },


      /**
       * Is muted
       * @method isMuted
       * @return {Boolean}
       */
      isMuted: function () {
        return myHowler.Howler.mute;
      },

      background0: new Howl({
        src: [
          './sounds/walking_in_depreston.mp3',
          './sounds/walking_in_depreston.ogg',
          './sounds/walking_in_depreston.wav'
        ],
        loop: true,
        volume: 0.5
      }),


      background2: new Howl({
        src: [
          './sounds/Waking_Up_to_the_Sun.mp3',
          './sounds/Waking_Up_to_the_Sun.ogg',
          './sounds/Waking_Up_to_the_Sun.wav'
        ],
        loop: true,
        volume: 0.5
      }),

      background4: new Howl({
        src: [
          './sounds/Forgive_Me_Bells.mp3',
          './sounds/Forgive_Me_Bells.ogg',
          './sounds/Forgive_Me_Bells.wav'
        ],
        loop: true,
        volume: 0.5
      }),

      background5: new Howl({
        src: [
          './sounds/Surge_and_Swell.mp3',
          './sounds/Surge_and_Swell.ogg',
          './sounds/Surge_and_Swell.wav'

        ],
        loop: true,
        volume: 0.5
      }),



      click: new Howl({
        src: [
          './sounds/wind.mp3',
          './sounds/wind.ogg',
          './sounds/wind.wav'
        ]
      }),

      neon: new Howl({
        src: [
          './sounds/neon.mp3',
          './sounds/neon.ogg',
          './sounds/neon.wav'
        ],
        volume: 0.05
      })
    };

  }

  return {
    /**
     * Return SOUNDS instance
     *
     * @method getInstance
     * @return {SOUNDS}
     */
    getInstance: function () {

      if (!instance) {
        instance = init();
        // work around for default audio off 
        instance.background0.once('play', function () {
          instance.toggle();
        })
      }


      return instance;
    }
  };
})();




module.exports = SOUNDS.getInstance();