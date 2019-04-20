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
    'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'

  ].join('\n'),
  fragmentShader: [
    'uniform vec3 color;',
    'uniform float opacity;',
    'varying vec3 vColor;',
    'void main () {',
    'gl_FragColor = vec4( vColor * color, opacity );',
    '}'

  ].join('\n')
});

module.exports = customLines;