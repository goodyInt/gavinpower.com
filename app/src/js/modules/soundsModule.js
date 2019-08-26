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
  var isMuted = true;

  var toggleSwitchDiv;
  toggleSwitchDiv = document.createElement('div');
  toggleSwitchDiv.id = "toggleSwitchDiv";
  toggleSwitchDiv.className = "toggleSwitchDiv";

  

  function init() {

   
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
    jQuery(toggleSwitchDiv).mouseover(function () {
      console.log('mute mouseover')
      if (!isMuted) {
         instance.muteButton.play();
      }
       });
   

    document.body.appendChild(toggleSwitchDiv);


    return {
      /**
       * Toggle on/off sounds
       *
       * @method toogle
       */
      in: function () {
        
        jQuery(toggleSwitchDiv).animate({
          right: 20,
          opacity: 1
        }, 500);

      },

      playMapButton: function (index) {
        console.log('SOUNDS playMapButton: ' + index);
        if (!isMuted) {
        switch (index) {
          case 0:
            instance.map0.play();
            break;
          case 1:
            instance.map1.play();
            break;
          case 2:
            instance.map2.play();
            break;
          case 3:
            instance.map3.play();
            break;
          case 4:
            instance.map4.play();
            break;
          case 5:
            instance.map5.play();
            break;
          case 6:
            instance.map6.play();
            break;
          case 7:
            instance.map7.play();
            break;
        }
      }
      },
      playMenuButton: function (name) {
        console.log('SOUNDS playMenuButton: ' + name);
        if (!isMuted) {
        switch (name) {
          case 'hello':
            instance.menu1.play();
            break;
          case 'sounds':
            instance.menu2.play();
            break;
          case 'code':
            instance.menu3.play();
            break;
          case 'connect':
            instance.menu4.play();
            break;
          case 'close':
            instance.menu5.play();
            break;
        }
      }
      },
      playonBurgerButtonSound: function () {
        if (!isMuted) {
        instance.menu0.play();
        }
      },
     
      playonMenuCloseSound: function () {
        if (!isMuted) {
        instance.downSwoosh.play();
        }
      },
      playonMenuOpenSound: function () {
        if (!isMuted) {
        instance.upSwoosh.play();
        }
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

      map0: new Howl({
        src: [
          './sounds/effects/map0.mp3',
          './sounds/effects/map0.ogg',
          './sounds/effects/map0.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      map1: new Howl({
        src: [
          './sounds/effects/map1.mp3',
          './sounds/effects/map1.ogg',
          './sounds/effects/map1.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      map2: new Howl({
        src: [
          './sounds/effects/map2.mp3',
          './sounds/effects/map2.ogg',
          './sounds/effects/map2.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      map3: new Howl({
        src: [
          './sounds/effects/map3.mp3',
          './sounds/effects/map3.ogg',
          './sounds/effects/map3.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      map4: new Howl({
        src: [
          './sounds/effects/map4.mp3',
          './sounds/effects/map4.ogg',
          './sounds/effects/map4.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      map5: new Howl({
        src: [
          './sounds/effects/map5.mp3',
          './sounds/effects/map5.ogg',
          './sounds/effects/map5.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      map6: new Howl({
        src: [
          './sounds/effects/map6.mp3',
          './sounds/effects/map6.ogg',
          './sounds/effects/map6.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      map7: new Howl({
        src: [
          './sounds/effects/map7.mp3',
          './sounds/effects/map7.ogg',
          './sounds/effects/map7.wav'
        ],
        loop: false,
        volume: 0.05
      }),

      menu0: new Howl({
        src: [
          './sounds/effects/menu0.mp3',
          './sounds/effects/menu0.ogg',
          './sounds/effects/menu0.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      menu1: new Howl({
        src: [
          './sounds/effects/menu1.mp3',
          './sounds/effects/menu1.ogg',
          './sounds/effects/menu1.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      menu2: new Howl({
        src: [
          './sounds/effects/menu2.mp3',
          './sounds/effects/menu2.ogg',
          './sounds/effects/menu2.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      menu3: new Howl({
        src: [
          './sounds/effects/menu3.mp3',
          './sounds/effects/menu3.ogg',
          './sounds/effects/menu3.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      menu4: new Howl({
        src: [
          './sounds/effects/menu4.mp3',
          './sounds/effects/menu4.ogg',
          './sounds/effects/menu4.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      menu5: new Howl({
        src: [
          './sounds/effects/menu5.mp3',
          './sounds/effects/menu5.ogg',
          './sounds/effects/menu5.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      menu6: new Howl({
        src: [
          './sounds/effects/menu6.mp3',
          './sounds/effects/menu6.ogg',
          './sounds/effects/menu6.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      menu7: new Howl({
        src: [
          './sounds/effects/menu7.mp3',
          './sounds/effects/menu7.ogg',
          './sounds/effects/menu7.wav'
        ],
        loop: false,
        volume: 0.05
      }),
      upSwoosh: new Howl({
        src: [
          './sounds/effects/upSwoosh.mp3',
          './sounds/effects/upSwoosh.ogg',
          './sounds/effects/upSwoosh.wav'
        ],
        loop: false,
        volume: 0.25
      }),
      downSwoosh: new Howl({
        src: [
          './sounds/effects/downSwoosh.mp3',
          './sounds/effects/downSwoosh.ogg',
          './sounds/effects/downSwoosh.wav'
        ],
        loop: false,
        volume: 0.25
      }),
     
      muteButton: new Howl({
        src: [
          './sounds/effects/mainButton.mp3',
          './sounds/effects/mainButton.ogg',
          './sounds/effects/mainButton.wav'
        ],
        loop: false,
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