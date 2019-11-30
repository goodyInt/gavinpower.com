'use strict';

var jQuery = require('jquery');

/**
 * Extract the current hash
 * and return the corresponding name
 *
 * @module HASH
 * @requires jQuery
 */
var HASH = HASH || (function () {
  var instance = null;
  
  function init () {
    var agencies = {
      jam3: 'jam3',
      poundandgrain: 'Pound & Grain',
      ubisoft: 'Ubisoft',
      tbwa: 'tbwa',
      churchandstate: 'Church & State',
      publicis: 'publicis',
      CM: 'criticalMass',
      cg: 'creativeGroup',
      wundermanThompson: 'wundermanThompson',
      havas: 'havas',
      grey: 'grey',
      lg2: 'lg2',
      cossette: 'cossette',
      blastRadius: 'blastRadius',
      artAndScience: 'artAndScience',
      concrete: 'concrete',
      fcb: 'fcb',
      threeJS: 'threeJS',
      linkedIn: 'linkedIn',
      ogilvy: 'ogilvy',
      shopify: 'shopify',
      facebook: 'facebook',
      twitter: 'twitter',
      oneLocal: 'oneLocal',
      goodyInt: 'goodyInt',
      mrdoob: 'mrdoob',
      alteredQualia: 'alteredQualia',
      PathFactory: 'PathFactory',
      NeilTaylor: 'NeilTaylor',
      Myplanet: 'Myplanet',
      SBDF: 'SBDF',
      cbc: 'cbc',
      john: 'john',
      Torstar: 'Torstar',
      V: 'V',
      aa: 'aa',
      Hussain: 'Hussain',
      wefail: 'wefail',
      ps: 'ps',
      tacu: 'tacu'
    };

    function getHash () {
      return window.location.hash.split('#')[1];
    }

    function getAgency (hash) {
      var agency;
      if (hash && agencies[hash]) {
        agency = agencies[hash];
      } else {
        agency = '';
      }
      return agency;
    }

    var hash = getHash();
    var agency = getAgency(hash);

    return {
      hash: hash,
      agency: agency,

      /**
       * Replace all the placeholders by correct agency name
       *
       * @method replacePlaceholders
       */
      replacePlaceholders: function () {
        var $placeholders = jQuery('.placeholder--agency');
        
        $placeholders.each(function () {
          var $placeholder = jQuery(this);

          if ($placeholder.hasClass('placeholder--agency--you')) {
            if (agency !== '') {
              $placeholder.html(agency);
            } else {
              $placeholder.html('you');
            }
          } else {
            if ($placeholder.hasClass('placeholder--agency--capital')) {
              $placeholder.html(agency.toUpperCase());
            } else {
              $placeholder.html(agency);
            }
          }
        });

        var $email = jQuery('.placeholder--email');

        var subject = hash ? '?subject=Hi from ' + agency : '?subject=Hi';
        var body = hash ? '&body=Hi Gav, we liked your resume and want to set up a chat.' : '&body=Hi V';

        $email.attr('href', [
          'mailto:gavin@goodyint.com',
          subject,
          body
        ].join(''));
      }
    };
  }

  return {
    /**
     * Get HASH current instance
     *
     * @method getInstance
     * @return {HASH}
     */
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();

module.exports = HASH.getInstance();