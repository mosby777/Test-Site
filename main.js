import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 6, 14);
camera.lookAt(0, 3, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x555555 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Museum building
const building = new THREE.Mesh(
  new THREE.BoxGeometry(10, 6, 6),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
building.position.y = 3;
scene.add(building);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(7, 3, 4),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
);
roof.position.y = 7.5;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

// Entrance door
const door = new THREE.Mesh(
  new THREE.BoxGeometry(2, 3, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x884400 })
);
door.position.set(0, 1.5, 3.1);
scene.add(door);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Resize support
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Button action
document.getElementById('enterBtn').addEventListener('click', () => {
  alert('Entering the Museum of Memes…');
});
