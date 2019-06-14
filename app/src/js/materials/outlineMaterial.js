var THREE = require('three');

var outlineShader = new THREE.ShaderMaterial({
  uniforms: {
   
    fogDensity: {
      value: 0.5
    },
    fogColor: {
      value: 0x000000
    },
    outlineColor: {
      value: new THREE.Color(0x00ffff)
    },
   
  },
  vertexShader: [
    'void main () {',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'

  ].join('\n'),
  fragmentShader: [
    'uniform float fogDensity;',
    'uniform vec3 fogColor;',
    'uniform vec3 outlineColor;',

    'void main() {',
    'gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);',
    'float depth = gl_FragCoord.z / gl_FragCoord.w;',
    'const float LOG2 = 0.442695;',
    'float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );',
    'fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );',

    
    'gl_FragColor = mix( vec4( outlineColor, gl_FragColor.w ), vec4( fogColor, gl_FragColor.w ), fogFactor );',
    '}',
  ].join('\n')
});

module.exports = outlineShader;