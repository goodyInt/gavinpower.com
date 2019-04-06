var Howler = require('howler');
/**
 * Sounds module
 *
 * @module SOUNDS
 * @requires Howler
 */
var SOUNDS = (function () {
  console.log('Howler: ' + Howler);
  console.log(Howler);
  var instance;

  function init () {
console.log("SOUNDS init");
    var isMuted = false;

    return {
      /**
       * Toggle on/off sounds
       *
       * @method toogle
       */
      toggle: function () {
        if (isMuted) {
          Howler.mute = false;
        } else {
          Howler.mute=true;
        }

        isMuted = !isMuted;
      },

      /**
       * Is muted
       * @method isMuted
       * @return {Boolean}
       */
      isMuted: function () {
        return Howler.mute;
      },

      background: new Howl({
        src: [
          './sounds/background.mp3',
          './sounds/background.ogg',
          './sounds/background.wav'
        ],
        loop: true,
        volume: 0.5
      }),
      wind: new Howl({
        src: [
          './sounds/wind.mp3',
          './sounds/wind.ogg',
          './sounds/wind.wav'
        ]
      }),
      whitenoise: new Howl({
        src: [
          './sounds/whitenoise.mp3',
          './sounds/whitenoise.ogg',
          './sounds/whitenoise.wav'
        ],
        volume: 0.05
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

  return  {
    /**
     * Return SOUNDS instance
     *
     * @method getInstance
     * @return {SOUNDS}
     */
    getInstance: function () {
      console.log ('get instance');
      if (!instance) {
        instance = init();

        // THIS LINE TURNS SOUND OFF FOR DEV
        Howler.mute = true;
      }

      return instance;
    }
  };
})();




module.exports = SOUNDS.getInstance();