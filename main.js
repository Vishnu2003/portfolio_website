import './style.css'
import * as THREE from 'three'
import {BufferAttribute, Particle} from 'three';


let scene, camera, renderer, stars, starGeo;

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = Math.PI/2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  starGeo = new THREE.BufferGeometry();
  const PointsArray = new Float32Array(Particles *3);
  for(let i=0;i<6000;i++) {
	PointsArray[i] = Math.random();
  }

starGeo.setAttribute('position', new BufferAttribute(PointsArray, 3))

  let sprite = new THREE.TextureLoader().load( '/assets/star.png' );
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
  });
  
  const stars = new THREE.Points(starGeo,starMaterial);
  scene.add(stars);

  window.addEventListener("resize", onWindowResize, false);

  animate(); 
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
function animate() {
  starGeo.vertices.forEach(p => {
    p.velocity += p.acceleration
    p.y -= p.velocity;
    
    if (p.y < -200) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  stars.rotation.y +=0.002;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();
