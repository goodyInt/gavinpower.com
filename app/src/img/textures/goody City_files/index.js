var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 2, 14);

var controls = new THREE.OrbitControls(camera);
//controls.autoRotate = true;
//controls.autoRotateSpeed = .5;
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.enableKeys = true;
controls.maxPolarAngle = Math.PI * .5;


var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();
var sky, sunSphere;

var createCarPos = true;
var uSpeed = 0.001;

//----------------------------------------------------------------- FOG background




//var setcolor = 0xF02050;
//var setcolor = 0xF2F111;
//var setcolor = 0xFF6347;
var setcolor = 0x87ceeb;

scene.background = new THREE.Color(setcolor);
//scene.fog = new THREE.FogExp2(setcolor, 0.05);
scene.fog = new THREE.FogExp2('0x000000', 0.01);





//----------------------------------------------------------------- RANDOM Function
function mathRandom(num = 8) {
  var numValue = -Math.random() * num + Math.random() * num;
  return numValue;
};


//----------------------------------------------------------------- CREATE City

function initSky() {

  // Add Sky
  sky = new THREE.Sky();
  sky.scale.setScalar( 450000 );
  scene.add( sky );

  // Add Sun Helper
  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  );
  sunSphere.position.y = - 700000;
  sunSphere.visible = false;
  scene.add( sunSphere );

  /// GUI

  var effectController  = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun: ! true
  };

  var distance = 400000;

  function guiChanged() {



    var uniforms = sky.material.uniforms;
    uniforms[ "turbidity" ].value = effectController.turbidity;
    uniforms[ "rayleigh" ].value = effectController.rayleigh;
    uniforms[ "luminance" ].value = effectController.luminance;
    uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
    uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;

    var theta = Math.PI * ( effectController.inclination - 0.5 );
    var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

    sunSphere.position.x = distance * Math.cos( phi );
    sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

    sunSphere.visible = effectController.sun;

    uniforms[ "sunPosition" ].value.copy( sunSphere.position );

   // renderer.render( scene, camera );

   console.log('guiChanged sunSphere.visible: ' + sunSphere.visible);

  }

  var gui = new dat.GUI();

  gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
  gui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "luminance", 0.0, 2 ).onChange( guiChanged );
  gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
  gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
  gui.add( effectController, "sun" ).onChange( guiChanged );

  guiChanged();

}

function init() {



  var segments = 2;
  var material = new THREE.MeshStandardMaterial({
    color: 0x000000
  });
  var wmaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  });
  /*
      var platformMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      specular: 0x222222,
    });
  */
  var geometry = new THREE.CubeGeometry(1, 0, 0, segments, segments, segments);
  for (var i = 1; i < 20; i++) {
    //var newColor = Math.random(0xffffff);
    // wmaterial.color = new THREE.Color( newColor );
   // console.log(wmaterial.color);
    var cube = new THREE.Mesh(geometry, material);
    var floor = new THREE.Mesh(geometry, material);
    var wfloor = new THREE.Mesh(geometry, wmaterial);
    cube.add(wfloor);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

    floor.scale.x = floor.scale.z = 1 + mathRandom(0.33);
    floor.scale.y = 0.05; //+mathRandom(0.5);
    cube.scale.y = 1.1 + Math.abs(mathRandom(4));
   // console.log(cube.scale.y);

    var cubeWidth = 0.9;
    cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);

    cube.position.x = Math.round(mathRandom());
    cube.position.z = Math.round(mathRandom());
    cube.position.y = cube.scale.y *.5;//0;//Math.round(mathRandom());
    //console.log(cube.height);

    floor.position.set(cube.position.x, 0, cube.position.z)

    town.add(floor);
    town.add(cube);
  };
  //----------------------------------------------------------------- Particular

  var particleSize = .075;
  var smokeMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: particleSize
  });
  var smokeGeography = new THREE.Geometry();

  for (var i = 0; i < 300; i++) {
    var particle = new THREE.Vector3(
      mathRandom(5),
      mathRandom(5),
      mathRandom(5)
    );
    smokeGeography.vertices.push(particle);
  }
  this.thePoints = new THREE.Points(smokeGeography, smokeMaterial);
  smoke.add(this.thePoints);

  var grountMat = new THREE.MeshPhongMaterial({
    color: setcolor,
   opacity: 0.5,
    transparent: true
  });
  var groundGeo = new THREE.PlaneGeometry(60, 60);
  var ground = new THREE.Mesh(groundGeo, grountMat);
  ground.rotation.x = -90 * Math.PI / 180;
  ground.position.y = -0.001;
  ground.receiveShadow = true;
  city.add(ground);
  initSky();
};

//----------------------------------------------------------------- Lights
//var ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
var ambientLight = new THREE.AmbientLight(0xFF0000, 400);
//scene.add(ambientLight);

//var lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
//var lightFront = new THREE.SpotLight(0xFFFFFF, 200, 10);
var lightFront = new THREE.DirectionalLight('#ffa500', 1.55);
//lightFront.position.set(0.2, 1, 0.5);
scene.add(lightFront);

lightFront.rotation.x = 25 * Math.PI / 180;
lightFront.rotation.z = -45 * Math.PI / 180;
lightFront.position.set(5, 5, 5);
lightFront.castShadow = true;
//lightFront.shadow.mapSize.width = 60;
//lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
lightFront.penumbra = 0.1;
var spotLightHelper = new THREE.SpotLightHelper(lightFront);
scene.add(spotLightHelper);

//var lightBack = new THREE.PointLight(0xFFFFFF, 0.5);
//var lightBack = new THREE.PointLight(0xFFFFFF, 10.5);
//lightBack.position.set(0, 6, 0);
//scene.add(lightBack);

scene.add(lightFront);

scene.add(city);
city.add(smoke);
smoke.position.y = 2;
city.add(town);


//----------------------------------------------------------------- GRID Helper
var gridHelper = new THREE.GridHelper(60, 120, 0x000000, 0x000000);
city.add(gridHelper);

//----------------------------------------------------------------- STATS
stats = new Stats();
document.body.appendChild(stats.dom);
//----------------------------------------------------------------- LINES world

var createCars = function (cScale = 2, cPos = 20, cColor = 0xFFFF00) {
  console.log('createCars');
  var cMat = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
 
  var cGeo = new THREE.CubeGeometry(1, cScale / 40, cScale / 40);
  var cElem = new THREE.Mesh(cGeo, cMat);
  var cAmp = 3;

  if (createCarPos) {
    createCarPos = false;
    cElem.position.x = -cPos;
    cElem.position.z = (mathRandom(cAmp));

    TweenMax.to(cElem.position, 3, {
      x: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3)
    });
  } else {
    createCarPos = true;
    cElem.position.x = (mathRandom(cAmp));
    cElem.position.z = -cPos;
    cElem.rotation.y = 90 * Math.PI / 180;

    TweenMax.to(cElem.position, 5, {
      z: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3),
      ease: Power1.easeInOut
    });
  };
  // cElem.receiveShadow = true;
    cElem.castShadow = true;
  cElem.position.y = Math.abs(mathRandom(5));
  city.add(cElem);
};

var generateLines = function () {
  for (var i = 0; i < 16; i++) {
    createCars(0.1, 20);
  };
};

//----------------------------------------------------------------- ANIMATE

var animate = function () {
  requestAnimationFrame(animate);
  smoke.rotation.y += 0.01;
  smoke.rotation.x += 0.01;
  camera.lookAt(city.position);
  renderer.render(scene, camera);
  controls.update();
  stats.update();
}

//----------------------------------------------------------------- START functions
generateLines();
init();
animate();