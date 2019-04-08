var ImagesLoader = require('./classes/LoaderClass');
var Loader = require('./objects/loaderObject');

var SCENE = require('./modules/sceneModule');
var jQuery = require('jquery');
var introSection = require('./sections/introSection');
var loader = new Loader();
var imagesLoader = new ImagesLoader([
    './img/goodyGav.JPG',
    './img/goodyIntLogo_512x512.png'
  ]);
  // preload
  imagesLoader.start();

  imagesLoader.onProgress(function (percent) {
    console.log(percent);
    loader.update(percent);
  });
  imagesLoader.onComplete(function () {
    console.log('complete');
    loader.out();
    TweenLite.delayedCall(0.8, SCENE.in);

    
    TweenLite.delayedCall(1.5, function () {
      map.in();
     // menu.in();
     console.log("delayedCall");
    });
       
  });

  // scene
  var $app = jQuery('.app');
  console.log("$app: " + $app);
  var $viewport = $app.find('.appViewport');
  console.log( $app);
  console.log( $viewport);

  SCENE.config({ quality: 1 });
  SCENE.setViewport($viewport);
  SCENE.addSections([
    introSection
  ]);

  SCENE.on('section:changeBegin', function () {
    var way = this.way;
    var to = this.to.name;
    var from = this.from.name;
    console.log("section:changeBegin: "  + to);
    // in begin
    if (to === 'intro') {
      introSection.in();
      introSection.start();
      introSection.smokeStart();

     // beamsSection.out('up');
     // beamsSection.start();
    }
    else if (to === 'beams') {
      helloSection.smokeStart();

      beamsSection.in();
      beamsSection.start();
    }
    else if (to === 'drop') {
      beamsSection.out('down');
      beamsSection.start();

      dropSection.in();
      dropSection.start();
    }
    else if (to === 'ball') {
      dropSection.out('down');
      dropSection.start();

      ballSection.in();
      ballSection.start();

      flowSection.fieldIn();
      flowSection.start();
    }
    else if (to === 'flow') {
      flowSection.in();
      flowSection.fieldIn();
      flowSection.start();

      neonsSection.smokeStart();
    }
    else if (to === 'neons') {
      flowSection.fieldIn();
      flowSection.start();

      neonsSection.start();
      neonsSection.smokeStart();

      heightSection.show();
    }
    else if (to === 'height') {
      flowSection.fieldIn();
      flowSection.start();

      neonsSection.smokeStart();

      heightSection.show();
      heightSection.in();
      heightSection.start();
    }
    else if (to === 'wave') {
      heightSection.show();

      waveSection.in(way);
      waveSection.start();
    }
    else if (to === 'face') {
      faceSection.in();
      faceSection.start();

      rocksSection.show();
    }
    else if (to === 'rocks') {
      rocksSection.show();
      rocksSection.in();
      rocksSection.start();
    }
    else if (to === 'galaxy') {
      rocksSection.show();

      galaxySection.in(way);
      galaxySection.start();

      gravitySection.show();
    }
    else if (to === 'gravity') {
      gravitySection.show();
      gravitySection.in();
      gravitySection.start();
    }
    else if (to === 'end') {
      endSection.in();
    }

    // out begin
    if (from === 'hello') {
      helloSection.out(way);
    }
    else if (from === 'beams') {
      beamsSection.out(way);
    }
    else if (from === 'drop') {
      dropSection.out(way);
    }
    else if (from === 'ball') {
      ballSection.out(way);
    }
    else if (from === 'flow') {
      flowSection.out(way);
    }
    else if (from === 'neons') {
      neonsSection.out(way);
    }
    else if (from === 'height') {
      heightSection.out(way);
    }
    else if (from === 'wave') {
      waveSection.out(way);
    }
    else if (from === 'face') {
      faceSection.out(way);
    }
    else if (from === 'rocks') {
      rocksSection.out(way);
    }
    else if (from === 'galaxy') {
      galaxySection.out(way);
    }
    else if (from === 'gravity') {
      gravitySection.out(way);
    }
    else if (from === 'end') {
      endSection.out(way);
    }
  });


  SCENE.on('section:changeComplete', function () {
    var to = this.to.name;
    var from = this.from.name;
    console.log("ection:changeComplete" + to);
    // out complete
    if (from === 'hello') {
      helloSection.stop();

      if (to !== 'beams') {
        helloSection.smokeStop();
      }

      if (to !== 'beams' && to !== 'drop') {
        beamsSection.stop();
      }
    }
    else if (from === 'beams') {
      if (to !== 'hello') {
        helloSection.smokeStop();
      }

      if (to !== 'hello' && to !== 'drop') {
        beamsSection.stop();
      }
    }
    else if (from === 'drop') {
      if (to !== 'hello' && to !== 'beams') {
        beamsSection.stop();
      }

      if (to !== 'ball') {
        dropSection.stop();
      }
    }
    else if (from === 'ball') {
      ballSection.stop();

      if (to !== 'drop') {
        dropSection.stop();
      }

      if (to !== 'flow' && to !== 'neons' && to !== 'height') {
        flowSection.stop();
      }
    }
    else if (from === 'flow') {
      if (to !== 'neons' && to !== 'height') {
        neonsSection.smokeStop();
      }

      if (to !== 'ball' && to !== 'neons' && to !== 'height') {
        flowSection.stop();
      }
    }
    else if (from === 'neons') {
      neonsSection.stop();

      if (to !== 'flow' && to !== 'height') {
        neonsSection.smokeStop();
      }

      if (to !== 'ball' && to !== 'flow' && to !== 'height') {
        flowSection.stop();
      }

      if (to !== 'height' && to !== 'wave') {
        heightSection.hide();
      }
    }
    else if (from === 'height') {
      heightSection.stop();

      if (to !== 'neons' && to !== 'wave') {
        heightSection.hide();
      }

      if (to !== 'flow' && to !== 'neons') {
        neonsSection.smokeStop();
      }

      if (to !== 'ball' && to !== 'flow' && to !== 'neons') {
        flowSection.stop();
      }
    }
    else if (from === 'wave') {
      waveSection.stop();

      if (to !== 'neons' && to !== 'height') {
        heightSection.hide();
      }
    }
    else if (from === 'face') {
      faceSection.stop();

      if (to !== 'rocks' && to !== 'galaxy') {
        rocksSection.hide();
      }
    }
    else if (from === 'rocks') {
      rocksSection.stop();

      if (to !== 'face' && to !== 'galaxy') {
        rocksSection.hide();
      }
    }
    else if (from === 'galaxy') {
      galaxySection.stop();

      if (to !== 'face' && to !== 'rocks') {
        rocksSection.hide();
      }

      if (to !== 'gravity') {
        gravitySection.hide();
      }
    }
    else if (from === 'gravity') {
      gravitySection.stop();

      if (to !== 'galaxy') {
        gravitySection.hide();
      }
    }
  });

  
  // map
  var map = SCENE.getMap();

  $app.prepend(map.$el);

  map.init();

  map.onClick(function (index) {
    SCENE.goTo(index);
  });

  SCENE.on('section:changeBegin', function () {
    map.setActive(this.to.index);
  });
 
  SCENE.start();
 

  

