var myHowler = require("howler");
var jQuery = require("jquery");

var SOUNDS = (function() {
  var instance;
  var isMuted = true;
  var silence4Dev = false;

  var toggleSwitchDiv;
  toggleSwitchDiv = document.createElement("div");
  toggleSwitchDiv.id = "toggleSwitchDiv";
  toggleSwitchDiv.className = "toggleSwitchDiv";

  function init() {
    myHowler.Howler.mute(isMuted);
    var divToggleBtnOn = document.createElement("img");
    divToggleBtnOn.src = "./img/sound-on-outline_on_stroke_40.png";
    divToggleBtnOn.id = "divToggleBtnOn";
    divToggleBtnOn.className = "divToggleBtnOn";
    toggleSwitchDiv.appendChild(divToggleBtnOn);

    var divToggleBtnOff = document.createElement("img");
    divToggleBtnOff.src = "./img/sound-on-outline_off_stroke_40.png";
    divToggleBtnOff.id = "divToggleBtnOff";
    divToggleBtnOff.className = "divToggleBtnOff";
    toggleSwitchDiv.appendChild(divToggleBtnOff);

    toggleSwitchDiv.onclick = function() {
      instance.toggle();
    };
    jQuery(toggleSwitchDiv).mouseover(function() {
      if (!isMuted) {
        instance.muteButton.play();
      }
    });

    document.body.appendChild(toggleSwitchDiv);

    return {
      in: function() {
        jQuery(toggleSwitchDiv).animate(
          {
            right: 20,
            opacity: 1
          },
          500
        );
      },

      playMapButton: function(index) {
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
      playMenuButton: function(name) {
        if (!isMuted) {
          switch (name) {
            case "hello":
              instance.menu1.play();
              break;
            case "sounds":
              instance.menu2.play();
              break;
            case "code":
              instance.menu3.play();
              break;
            case "connect":
              instance.menu4.play();
              break;
            case "close":
              instance.menu5.play();
              break;
          }
        }
      },
      playonBurgerButtonSound: function() {
        if (!isMuted) {
          instance.menu0.play();
        }
      },

      playonMenuCloseSound: function() {
        if (!isMuted) {
          instance.downSwoosh.play();
        }
      },
      playonMenuOpenSound: function() {
        if (!isMuted) {
          instance.upSwoosh.play();
        }
      },

      toggle: function() {
        isMuted = !isMuted;
        if (silence4Dev) {
          isMuted = true;
        }
        myHowler.Howler.mute(isMuted);

        if (isMuted) {
          divToggleBtnOn.style.visibility = "hidden";
          divToggleBtnOff.style.visibility = "visible";
        } else {
          divToggleBtnOn.style.visibility = "visible";
          divToggleBtnOff.style.visibility = "hidden";
        }
      },
      fadeOut: function(theHowl) {
        theHowl.fade(theHowl.volume(), 0, 1000);
      },
      fadeIn: function(theHowl, newVol) {
        theHowl.fade(0, newVol, 1000);
      },
      playSong: function(theHowl) {
        console.log("theHowl");
        console.log(theHowl);
        console.log("theHowl._state");
        console.log(theHowl._state);
        if(theHowl._state !=="loaded"){
          theHowl.load();
          console.log("LOADING HOWL!!");

        }
        
       
        theHowl.play();
      },

      isMuted: function() {
        return myHowler.Howler.mute;
      },

      background0: new Howl({
        src: [
          "./sounds/walking_in_depreston.mp3",
          "./sounds/walking_in_depreston.ogg",
          "./sounds/walking_in_depreston.wav"
        ],
        loop: true,
        preload: false,
        onload: function() {
          console.log(" background0 LOADED");
        },
        volume: 0.5
      }),

      background2: new Howl({
        src: [
          "./sounds/Waking_Up_to_the_Sun.mp3",
          "./sounds/Waking_Up_to_the_Sun.ogg",
          "./sounds/Waking_Up_to_the_Sun.wav"
        ],
        loop: true,
        preload: false,
        onload: function() {
          console.log(" background2 LOADED");
        },
        volume: 0.5
      }),

      background4: new Howl({
        src: [
          "./sounds/Forgive_Me_Bells.mp3",
          "./sounds/Forgive_Me_Bells.ogg",
          "./sounds/Forgive_Me_Bells.wav"
        ],
        loop: true,
        preload: false,
        onload: function() {
          console.log(" background4 LOADED");
        },
        volume: 0.5
      }),

      background5: new Howl({
        src: [
          "./sounds/Surge_and_Swell.mp3",
          "./sounds/Surge_and_Swell.ogg",
          "./sounds/Surge_and_Swell.wav"
        ],
        loop: true,
        preload: false,
        onload: function() {
          console.log(" background5 LOADED");
        },
        volume: 0.5
      }),

      map0: new Howl({
        src: [
          "./sounds/effects/map0.mp3",
          "./sounds/effects/map0.ogg",
          "./sounds/effects/map0.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map0 LOADED");
        },
        volume: 0.05
      }),
      map1: new Howl({
        src: [
          "./sounds/effects/map1.mp3",
          "./sounds/effects/map1.ogg",
          "./sounds/effects/map1.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map1 LOADED");
        },
        volume: 0.05
      }),
      map2: new Howl({
        src: [
          "./sounds/effects/map2.mp3",
          "./sounds/effects/map2.ogg",
          "./sounds/effects/map2.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map2 LOADED");
        },
        volume: 0.05
      }),
      map3: new Howl({
        src: [
          "./sounds/effects/map3.mp3",
          "./sounds/effects/map3.ogg",
          "./sounds/effects/map3.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map3 LOADED");
        },
        volume: 0.05
      }),
      map4: new Howl({
        src: [
          "./sounds/effects/map4.mp3",
          "./sounds/effects/map4.ogg",
          "./sounds/effects/map4.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map4 LOADED");
        },
        volume: 0.05
      }),
      map5: new Howl({
        src: [
          "./sounds/effects/map5.mp3",
          "./sounds/effects/map5.ogg",
          "./sounds/effects/map5.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map5 LOADED");
        },
        volume: 0.05
      }),
      map6: new Howl({
        src: [
          "./sounds/effects/map6.mp3",
          "./sounds/effects/map6.ogg",
          "./sounds/effects/map6.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map6 LOADED");
        },
        volume: 0.05
      }),
      map7: new Howl({
        src: [
          "./sounds/effects/map7.mp3",
          "./sounds/effects/map7.ogg",
          "./sounds/effects/map7.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" map7 LOADED");
        },
        volume: 0.05
      }),

      menu0: new Howl({
        src: [
          "./sounds/effects/menu0.mp3",
          "./sounds/effects/menu0.ogg",
          "./sounds/effects/menu0.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu0 LOADED");
        },
        volume: 0.05
      }),
      menu1: new Howl({
        src: [
          "./sounds/effects/menu1.mp3",
          "./sounds/effects/menu1.ogg",
          "./sounds/effects/menu1.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu1 LOADED");
        },
        volume: 0.05
      }),
      menu2: new Howl({
        src: [
          "./sounds/effects/menu2.mp3",
          "./sounds/effects/menu2.ogg",
          "./sounds/effects/menu2.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu2 LOADED");
        },
        volume: 0.05
      }),
      menu3: new Howl({
        src: [
          "./sounds/effects/menu3.mp3",
          "./sounds/effects/menu3.ogg",
          "./sounds/effects/menu3.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu3 LOADED");
        },
        volume: 0.05
      }),
      menu4: new Howl({
        src: [
          "./sounds/effects/menu4.mp3",
          "./sounds/effects/menu4.ogg",
          "./sounds/effects/menu4.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu4 LOADED");
        },
        volume: 0.05
      }),
      menu5: new Howl({
        src: [
          "./sounds/effects/menu5.mp3",
          "./sounds/effects/menu5.ogg",
          "./sounds/effects/menu5.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu5 LOADED");
        },
        volume: 0.05
      }),
      menu6: new Howl({
        src: [
          "./sounds/effects/menu6.mp3",
          "./sounds/effects/menu6.ogg",
          "./sounds/effects/menu6.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu6 LOADED");
        },
        volume: 0.05
      }),
      menu7: new Howl({
        src: [
          "./sounds/effects/menu7.mp3",
          "./sounds/effects/menu7.ogg",
          "./sounds/effects/menu7.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" menu7 LOADED");
        },
        volume: 0.05
      }),

      upSwoosh: new Howl({
        src: [
          "./sounds/effects/upSwoosh.mp3",
          "./sounds/effects/upSwoosh.ogg",
          "./sounds/effects/upSwoosh.wav"
        ],
        loop: false,
        preload: false,
        onload: function() {
          console.log(" upSwoosh LOADED");
        },
        volume: 0.25
      }),

      downSwoosh: new Howl({
        src: [
          "./sounds/effects/downSwoosh.mp3",
          "./sounds/effects/downSwoosh.ogg",
          "./sounds/effects/downSwoosh.wav"
        ],
        loop: false,
        preload: false,
        volume: 0.25
      }),

      muteButton: new Howl({
        src: [
          "./sounds/effects/mainButton.mp3",
          "./sounds/effects/mainButton.ogg",
          "./sounds/effects/mainButton.wav"
        ],
        loop: false,
        preload: false,
        nload: function() {
          console.log(" muteButton LOADED");
        },
        volume: 0.05
      }),
      finishLoadingFirstAudio: function() {
        console.log("finishLoadingFirstAudio");
        console.log("SOUNDS: " + SOUNDS);
        console.log(SOUNDS);
        console.log("SOUNDS.map0: " + SOUNDS.map0);
        console.log("this: " + this);
        console.log(this);
        console.log("this.map0: " + this.map0);

        this.map0.load();
        this.map1.load();
        this.map2.load();
        this.map3.load();
        this.map4.load();
        this.map5.load();
        this.map6.load();
        this.map7.load();
        this.menu0.load();
        this.menu1.load();
        this.menu2.load();
        this.menu3.load();
        this.menu4.load();
        this.menu5.load();
        this.menu6.load();
        this.menu7.load();
        this.upSwoosh.load();
        this.downSwoosh.load();
        this.muteButton.load();

        /*
        map7
        menu7
        upSwoosh
        downSwoosh
        muteButton
        */
      }
    };
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
        // work around for default audio off
        instance.background0.once("play", function() {
          instance.toggle();
        });
      }

      return instance;
    }
  };
})();

module.exports = SOUNDS.getInstance();
