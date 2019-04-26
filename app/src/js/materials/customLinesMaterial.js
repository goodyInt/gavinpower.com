'use strict';

var THREE = require('three');

var customLines = new THREE.ShaderMaterial({
  uniforms: {
    amplitude: {
      value: 5.0
    },
    opacity: {
      value: 0.35
    },
    color: {
      value: new THREE.Color(0xffffff)
    },
    fogDensity: {
      value:  0.0
    },
    fogColor: {
      value: 0x00ff00
    }
  },

  vertexShader: [
    'uniform float amplitude;',
    'attribute vec3 displacement;',
    'attribute vec3 customColor;',
    'varying vec3 vColor;',
    'void main () {',
    'vec3 newPosition = position + amplitude * displacement;',
    'vColor = customColor;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);',
    '}'

  ].join('\n'),
  fragmentShader: [

    'uniform vec3 color;',
    'uniform float opacity;',
    'uniform float fogDensity;',
    'uniform vec3 fogColor;',
    'varying vec3 vColor;',
    
    'void main() {',

      'gl_FragColor = vec4( vColor * color, opacity );',

      'float depth = gl_FragCoord.z / gl_FragCoord.w;',

      'const float LOG2 = 1.442695;',
      'float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );',
      'fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );',

      'gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );',

   '}',

  ].join('\n')
});

module.exports = customLines;