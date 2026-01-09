import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

/* ---------------- SCENE ---------------- */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0e0e);
scene.fog = new THREE.Fog(0x0e0e0e, 20, 80);

/* ---------------- CAMERA ---------------- */
const camera = new THREE.PerspectiveCamera(
  45, // cinematic FOV
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 6, 22);
camera.lookAt(0, 4, 0);

/* ---------------- RENDERER ---------------- */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

/* ---------------- LIGHTING ---------------- */

// Soft ambient fill (very low)
scene.add(new THREE.AmbientLight(0xffffff, 0.15));

// Strong directional light (sun)
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(20, 30, 10);
sun.castShadow = true;

sun.shadow.mapSize.set(4096, 4096);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 120;
sun.shadow.camera.left = -40;
sun.shadow.camera.right = 40;
sun.shadow.camera.top = 40;
sun.shadow.camera.bottom = -40;

scene.add(sun);

/* ---------------- MATERIALS ---------------- */

const concrete = new THREE.MeshStandardMaterial({
  color: 0x3a3a3a,
  roughness: 0.9,
  metalness: 0.05
});

const darkMetal = new THREE.MeshStandardMaterial({
  color: 0x1e1e1e,
  roughness: 0.6,
  metalness: 0.3
});

/* ---------------- GROUND ---------------- */

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(300, 300),
  new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 1
  })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* ---------------- BUILDING ---------------- */

// Main structure
const mainBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(18, 8, 10),
  concrete
);
mainBuilding.position.y = 4;
mainBuilding.castShadow = true;
mainBuilding.receiveShadow = true;
scene.add(mainBuilding);

// Entrance block
const entrance = new THREE.Mesh(
  new THREE.BoxGeometry(8, 5, 4),
  concrete
);
entrance.position.set(0, 2.5, 7);
entrance.castShadow = true;
scene.add(entrance);

// Door
const door = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 4, 0.2),
  darkMetal
);
door.position.set(0, 2, 9.1);
door.castShadow = true;
scene.add(door);

/* ---------------- DETAILS ---------------- */

// Steps
for (let i = 0; i < 3; i++) {
  const step = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.4, 1.5),
    concrete
  );
  step.position.set(0, 0.2 + i * 0.4, 9.5 + i * 1.5);
  step.castShadow = true;
  step.receiveShadow = true;
  scene.add(step);
}

/* ---------------- ANIMATION LOOP ---------------- */

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

/* ---------------- RESIZE ---------------- */

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
