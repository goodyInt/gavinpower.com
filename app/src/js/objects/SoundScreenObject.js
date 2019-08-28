'use strict';

var $ = require('jquery');

function SoundScreen() {
  
  var _this = this;
  var callback = function () {};
  var soundScreenDivs = [];

  var soundScreenHolderDiv = document.createElement('div');
  soundScreenHolderDiv.id = "soundScreenHolderDiv";
  soundScreenHolderDiv.className = "infoHolderDiv infoCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv ";
  introDiv.innerHTML = "<span class = 'introTitle'>Music</span><span class ='introBody'>Thank you to the artists who made their work available for this project.</span> ";
  soundScreenHolderDiv.appendChild(introDiv);
  soundScreenDivs.push(introDiv);

  var soundScreenDiv = document.createElement('div');
  soundScreenDiv.id = "soundScreenDiv";
  soundScreenDiv.className = "infoDiv";
  soundScreenDiv.innerHTML = 
  "<span class='songTitle'>Walking in Depreston</span>"+
  "<span class='infoBody '>This beautiful song was created by </span>"+
  "<span class='songArtist'>Ai Yamamoto, </span>"+
  "<span class='infoBody'> an artist living in Melbourne, Australia. Her music is electronic, abstract and melodic.</span>" +
  "<br><span class='infoBody'>Check out out her<a href= https://soundcloud.com/ai-yamamoto2 target='blank'> <span class='artistLink'>soundcloud</span></a> and <a href= https://www.instagram.com/ai_yamamoto_mel/ target='blank'> <span class='artistLink'>instagram.</span></a></span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv);
  soundScreenDivs.push(soundScreenDiv);

  var soundScreenDiv1 = document.createElement('div');
  soundScreenDiv1.id = "soundScreenDiv1";
  soundScreenDiv1.className = "infoDiv";
  soundScreenDiv1.innerHTML = 
  "<span class='songTitle'>Surge and Swell</span>"+
  "<span class='infoBody '>This amazaing track was created by </span>"+
  "<span class='songArtist'>Pictures of the Floating World, </span>"+
  "<span class='infoBody'>the alter ego of Eric & Magill who are Ryan Weber and Eric Osterman, accomplished musicians, long time friends, and travelers. Together they create cosmic soundscapes.</span>" +
  "<br><span class='infoBody'>Check out their<a href= https://www.ericandmagill.com/ target='blank'> <span class='artistLink'>website</span></a> and <a href= https://www.instagram.com/ericandmagill/ target='blank'> <span class='artistLink'>instagram.</span></a></span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv1);
  soundScreenDivs.push(soundScreenDiv1);


  var soundScreenDiv2 = document.createElement('div');
  soundScreenDiv2.id = "soundScreenDiv2";
  soundScreenDiv2.className = "infoDiv";
  soundScreenDiv2.innerHTML = 
  "<span class='songTitle'>Forgive Me Bells</span>"+
  "<span class='infoBody '>This pretty song was created by </span>"+
  "<span class='songArtist'>Daniel Birch, </span>"+
  "<span class='infoBody'>an artist who specializes in atmospheric soundscapes and rhythms. He recently released a new collection of atmospheric soundscapes directly inspired by the experimental and expressive abstract paintings of artist Sandra Beccarelli. </span>" +
  "<br><span class='infoBody'>Checkout out his<a href= https://www.danielbirchmusic.com/ target='blank'> <span class='artistLink'>website</span></a> and <a href= https://www.instagram.com/danielbirchmusic/ target='blank'> <span class='artistLink'>instagram.</span></a></span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv2);
  soundScreenDivs.push(soundScreenDiv2);

  var soundScreenDiv3 = document.createElement('div');
  soundScreenDiv3.id = "soundScreenDiv3";
  soundScreenDiv3.className = "infoDiv";
  soundScreenDiv3.innerHTML = 
  "<span class='songTitle'>Waking Up To The Sun</span>"+
  "<span class='infoBody '>Another awesome song by </span>"+
  "<span class='songArtist'>Pictures of the Floating World.</span>"+
  "<span class='infoBody'> They are super talented.</span>" +
  "<br><span class='infoBody'>Check out Eric & Magill's <a href= https://ericandmagill.bandcamp.com/ target='blank'> <span class='artistLink'>bandcamp</span></a> and <a href= https://soundcloud.com/ericmagill target='blank'> <span class='artistLink'>soundcloud.</span></a></span>";
  soundScreenHolderDiv.appendChild(soundScreenDiv3);
  soundScreenDivs.push(soundScreenDiv3);

  var soundScreenDiv4 = document.createElement('div');
  soundScreenDiv4.id = "soundScreenDiv3";
  soundScreenDiv4.className = "infoDiv";
  soundScreenDiv4.innerHTML = "<span class='infoLegal '>All songs are Licensed under Creative Commons: By Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) <a href= https://creativecommons.org/licenses/by-nc/4.0/ target='blank'> <span class='legalLink'>creative commons</span></a></span>"
  soundScreenHolderDiv.appendChild(soundScreenDiv4);
  soundScreenDivs.push(soundScreenDiv4);

  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.id = "closeButtonDivSoundScreen";
  closeButtonDiv.className = "closeButtonDiv";
  closeButtonDiv.style.position = "absolute";

  var divCloseBtn = document.createElement('img');
  divCloseBtn.src = "./img/closeButton0.png";
  divCloseBtn.id = "divCloseBtnSoundScreen";
  divCloseBtn.className = "divCloseBtn";
  closeButtonDiv.appendChild(divCloseBtn);

  closeButtonDiv.onclick = function () {
    _this.removeFromStage();
    callback();
  };

  this.setCallBack = function (theCallback) {
    callback = theCallback;
  }

  this.addToStage = function () {
    if (!document.getElementById(soundScreenHolderDiv.id)) {
      document.body.appendChild(soundScreenHolderDiv);
      document.body.appendChild(closeButtonDiv);

      for (var i = 0; i < soundScreenDivs.length; i++) {
        $(soundScreenDivs[i]).css("opacity", 0.0);
        TweenMax.to(soundScreenDivs[i], 1, {
          opacity: 1,
          delay: .1 * i,
          ease: Quad.easeInOut
        });
      }
    }
  }

  this.removeFromStage = function () {  
    if (document.getElementById(soundScreenHolderDiv.id)) {
      document.body.removeChild(soundScreenHolderDiv);
      document.body.removeChild(closeButtonDiv);
    }
  }
}

module.exports = SoundScreen;