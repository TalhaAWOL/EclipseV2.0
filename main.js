import './style.css';

import * as THREE from 'three';
import { GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

const scene = new THREE.Scene();
//In three JS there are three things you need Scene | Camera | Renderer


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

//Torus
// const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const material = new THREE.MeshStandardMaterial( { color: 0xafffff} );
// const torus = new THREE.Mesh( geometry, material );
// scene.add( torus );

const pointLight = new THREE.PointLight(0x71738a,2000);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(pointLight);

const lightHelper = new THREE. PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh ( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

//Texture mapping

// const diamondTexture = new THREE.TextureLoader().load('images/diamond_block.png');
// const diamond = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial( { map: diamondTexture } )
// );
// scene.add(diamond);


// Moon

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    displacementScale: 0.1
  })
);

scene.add(moon);


// Earth

const earthTexture = new THREE.TextureLoader().load('img/earth_texture2.jpeg');
const earthNormalTexture = new THREE.TextureLoader().load('images/earth_normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 64, 64),
  new THREE.MeshStandardMaterial({
    map: earthTexture
    // normalMap: earthNormalTexture
  })
);
scene.add(earth);

// Earth Atmosphere
const geometryAtmosphere = new THREE.SphereGeometry(4.05,32);
const materialAtmosphere = new THREE.MeshStandardMaterial( { color: 0xafffff, transparent:true,opacity: 0.4} );
const earthAtmosphere = new THREE.Mesh( geometryAtmosphere, materialAtmosphere );
scene.add( earthAtmosphere );



// const spaceTexture = new THREE.TextureLoader().load('images/bg_space_seamless.png');
// scene.background = spaceTexture;

var t = 0;

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  //moon.rotation.z += 0.05;

  // diamond.rotation.y += 0.01;
  // diamond.rotation.z += 0.01;

  camera.position.z = t*-0.01;
  camera.position.x = t*-0.002;
  camera.position.y = t*-0.0002;

}
document.body.onscroll = moveCamera;

moon.position.z = 0;
moon.position.setX(-10);
function animate(){
  t += 1;
  requestAnimationFrame( animate );
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  // diamond.position.x = 20*Math.cos(t*0.1)+0;
  // diamond.position.y = 20*Math.sin(t*0.01)+0;
  earth.rotation.y += 1*0.01;
  moon.position.z = 40 * Math.cos(t*0.005);
  moon.position.x = 40 * Math.sin(t*0.005)
  renderer.render( scene, camera );
  console.log(camera.position.x, camera.position.y, camera.position.z);
};

earth.position.y = 0;
earth.position.z = -8;
earthAtmosphere.position.x = earth.position.x
earthAtmosphere.position.y = earth.position.y
earthAtmosphere.position.z = earth.position.z


camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;
animate();
