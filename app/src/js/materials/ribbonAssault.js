// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// https://www.shadertoy.com/view/MdBGDK
// By David Hoskins.

var THREE = require('three');

var ribbonAssault = new THREE.ShaderMaterial({
  uniforms: {
    "iTime": {
      type: "f",
      value: 0.1
    },
    "opacity": {
      type: "f",
      value: 0.0
    },
    "iResolution": {
      type: "v2",
      value: new THREE.Vector2(1, 1)
    },
    "iMouse": {
      type: "v4",
      value: new THREE.Vector4(0.0, 0.0, 0.0, 0.0)
    }
  },
  vertexShader: [
    'void main() {',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}',
  ].join('\n'),
  fragmentShader: [
    'uniform vec2 iResolution;',
    'uniform float iTime;',
    'uniform vec4 iMouse;',
    'uniform float opacity;',

    'void main(){',
      'float gTime = iTime+11.0;',
      'float f = 3., g = 3.;',
      'vec2 res = iResolution.xy;',
      'vec2 mou = iMouse.xy;',
      'if (iMouse.z < 0.5)	{',
        'mou = vec2(sin(gTime * .3)*sin(gTime * .17) * 1. + sin(gTime * .3),(1.0-cos(gTime * .632))*sin(gTime * .131)*1.0+cos(gTime * .3));',
        'mou = (mou+1.0) * res;',
      '}',
      'vec2 z = ((-res+2.0 * gl_FragCoord.xy) / res.y);',
      'vec2 p = ((-res+2.0+mou) / res.y);',
      'for( int i = 0; i < 20; i++) {',
        'float d = dot(z,z);',
        'z = (vec2( z.x, -z.y ) / d) + p;',
        'z.x =  abs(z.x);',
        'f = max( f, (dot(z-p,z-p) ));',
        'g = min( g, sin(dot(z+p,z+p))+1.0);',
      '}',
      'f = abs(-log(f) / 3.5);',
      'g = abs(-log(g) / 8.0);',
      'gl_FragColor = vec4(min(vec3(g, g*f, f), 1.0),opacity);',
    '}',
  ].join('\n')
});

module.exports = ribbonAssault;