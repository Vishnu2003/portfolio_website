import '../style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const loader = new THREE.TextureLoader()
const img = loader.load('/assets/star.png')

// Objects


const particleGeo = new THREE.BufferGeometry();

const ParticleCnt = 6000;

const posArray = new Float32Array(ParticleCnt * 3);

for (let i = 0; i<ParticleCnt; i++){
    posArray[i] = (Math.random() -0.5) *5
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials


const ParticlesMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.007,
    map: img,
    transparent: true
})

// Mesh
const ParticlesMesh = new THREE.Points(particleGeo, ParticlesMaterial)
scene.add(ParticlesMesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0
let flag = 0

function animateParticles(event){
    mouseX = event.clientX/ canvas.width * 20 -10
    mouseY = event.clientY/ canvas.height * 20 -10
    flag = 1
}
/**
 * Animate
 */

let clock = new THREE.Clock()

const tick = () =>
{
    
    let deltaTime = clock.getDelta()

    // Update objects

    if (flag == 0){
        ParticlesMesh.rotation.y +=0.0005 
        ParticlesMesh.rotation.x +=0.0005 
    } 

    ParticlesMesh.rotation.y += mouseX * deltaTime * 0.02;
    ParticlesMesh.rotation.x += mouseY * deltaTime * 0.02;
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
