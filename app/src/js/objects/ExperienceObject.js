'use strict';
var THREE = require('three');
var Events = require('../classes/EventsClass');
var jQuery = require('jquery');
var ScreenBackground = require('./ExperienceScreenBackground');

function Experience() {
  this.el = new THREE.Object3D();
  this.events = new Events();
  this.delayTimeout;
  var experienceScreenBackground = new ScreenBackground('experienceScreenBackground');

  this.on = function () {
    _this.events.on.apply(_this.events, arguments);
  }

  var _this = this;
  var experienceScreenDivs = [];

  var experienceScreenHolderDiv = document.createElement('div');
  experienceScreenHolderDiv.id = "experienceScreenHolderDiv";
  experienceScreenHolderDiv.className = "infoHolderDiv infoCopy";

  var introDiv = document.createElement('div');
  introDiv.id = "introDiv";
  introDiv.className = "introDiv ";
  introDiv.innerHTML = "<span class = 'introTitle'>EXPERIENCE</span><span class ='introBody'>Creative Developer</span> ";
  experienceScreenHolderDiv.appendChild(introDiv);
  experienceScreenDivs.push(introDiv);

  var experienceScreenDiv = document.createElement('div');
  experienceScreenDiv.id = "experienceScreenDiv";
  experienceScreenDiv.className = "infoDiv";
  experienceScreenDiv.innerHTML =
    "<span class='songTitle'> 2007 - Current </span>" +
    "<span class='resumeTitle'>Owner/ Lead Developer</span>" +
    "<br><span class='infoBody'><a href= 'http://www.goodyint.com' target='blank'> <span class='artistLink'>@goodyInt</span></a></span>" +
    "<span class='infoBody'>, developing client projects onsite and offsite - often subcontracting ; recently designed and developed the cross-platform mobile game, "+ 
    "<span class='songArtist'> super goody gogo</span>" +
    "<span class='infoBody'>, in 26 languages. It is available on <a href= 'https://itunes.apple.com/app/id1446777848' target='blank'> <span class='artistLink'>iOS</span></a>, <a href= 'https://play.google.com/store/apps/details?id=air.com.goodyint.supergoodygogo' target='blank'> <span class='artistLink'>Android</span></a> & <a href= 'https://www.amazon.com/goodyInt-super-goody-gogo/dp/B07LGZ2MK4' target='blank'> <span class='artistLink'>Amazon.</span></a></span>";
  experienceScreenHolderDiv.appendChild(experienceScreenDiv);
  experienceScreenDivs.push(experienceScreenDiv);

  var experienceScreenDiv1 = document.createElement('div');
  experienceScreenDiv1.id = "experienceScreenDiv1";
  experienceScreenDiv1.className = "infoDiv";
  experienceScreenDiv1.innerHTML =
    "<span class='songTitle'> 2003 - 2007 </span>" +
    "<span class='resumeTitle'>Contract Flash Developer </span>" +
    "<span class='infoBody'><br>Working onsite. Clients included (among others): McCann, Grip Ltd., InstaClick, Canada Post Borderfree. Brands (among others): Acura, Chevrolet, GMC, Nestle, OLG, LG, Canada Post, Nintendo, Honda.</span>";
    experienceScreenHolderDiv.appendChild(experienceScreenDiv1);
  experienceScreenDivs.push(experienceScreenDiv1);

  var experienceScreenDiv2 = document.createElement('div');
  experienceScreenDiv2.id = "experienceScreenDiv2";
  experienceScreenDiv2.className = "infoDiv";
  experienceScreenDiv2.innerHTML =
    "<span class='songTitle'>1998 - 2003 </span>" +
    "<span class='resumeTitle'>Freelance Writer </span>" +
    "<span class='infoBody'><br>Regularly wrote stories for The National Post, Outpost Magazine, Rosco Magazine, The Fishing News and Vice - these were often artist profiles which included interviews with Coldplay, Snow, Bruce McDonald, Janeane Garofalo, among others. Vice once named me employee of the month.</span>" 
  experienceScreenHolderDiv.appendChild(experienceScreenDiv2);
  experienceScreenDivs.push(experienceScreenDiv2);

  this.addToStage = function () {
    experienceScreenBackground.addToStage();
    if (!document.getElementById(experienceScreenHolderDiv.id)) {
      document.body.appendChild(experienceScreenHolderDiv);

      for (var i = 0; i < experienceScreenDivs.length; i++) {
        jQuery(experienceScreenDivs[i]).css("opacity", 0.0);
        TweenMax.to(experienceScreenDivs[i], 1, {
          opacity: 1,
          delay: .1 * i,
          ease: Quad.easeInOut
        });
      }
    }
  }

  this.removeFromStage = function () {
    experienceScreenBackground.removeFromStage();
    if (document.getElementById(experienceScreenHolderDiv.id)) {
      document.body.removeChild(experienceScreenHolderDiv);

    }
  }
}

Experience.prototype.start = function () {

  this.events.trigger('sectionFullyLoaded', {
    message: 'Experience is Loaded'
  });
  this.delayTimeout = setTimeout(this.addToStage, 11000);

};

Experience.prototype.onOut = function () {
  this.events.trigger('sectionUnloaded', {
    message: 'Experience is UnLoaded'
  });
  clearTimeout(this.delayTimeout);
  this.removeFromStage();
};

Experience.prototype.menuIsClicked = function (name) {
  switch (name) {
    case ('sounds'):
      clearTimeout(this.delayTimeout);
      this.removeFromStage();

      break;
    case ('code'):
      clearTimeout(this.delayTimeout);
      this.removeFromStage();

      break;
    case ('hello'):
      clearTimeout(this.delayTimeout);
      this.removeFromStage();

      break;
    case ('connect'):
      clearTimeout(this.delayTimeout);
      this.removeFromStage();

      break;
    case ('close'):
      clearTimeout(this.delayTimeout);
      this.addToStage();
      break;
  };
}

Experience.prototype.stop = function () {};
Experience.prototype.show = function () {};
Experience.prototype.hide = function () {};

module.exports = Experience;