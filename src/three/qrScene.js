/* A scannable QR code built from cubes. In 3D mode the cubes ripple and rise
   under the pointer; "flat" settles every cube to one height and turns the
   camera face-on so a phone can scan it. Pure scene logic, no renderer. */
import * as THREE from "three";
import { qrMatrix } from "./qr.js";

const REST = 0.35; // cube height when flat

export function createQrScene(text, { card = 0xfff6cf, module = 0x172430 } = {}) {
  const { n, cells } = qrMatrix(text);
  const size = n + 6; // quiet zone of 3 modules on each side
  const half = (n - 1) / 2;

  const scene = new THREE.Scene();
  const group = new THREE.Group();
  scene.add(group);

  const cardGeo = new THREE.BoxGeometry(size, size, 0.6);
  const cardMat = new THREE.MeshStandardMaterial({ color: card, roughness: 0.9 });
  const cardMesh = new THREE.Mesh(cardGeo, cardMat);
  cardMesh.position.z = -0.3;
  group.add(cardMesh);

  const boxGeo = new THREE.BoxGeometry(0.94, 0.94, 1);
  const boxMat = new THREE.MeshStandardMaterial({ color: module, roughness: 0.5, metalness: 0.1 });
  const mesh = new THREE.InstancedMesh(boxGeo, boxMat, cells.length);
  group.add(mesh);
  const base = cells.map(([r, c]) => ({ x: c - half, y: half - r }));
  const heights = new Float32Array(cells.length).fill(REST);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-14, 20, 32);
  scene.add(key);
  const warm = new THREE.DirectionalLight(0xf2a93b, 0.9);
  warm.position.set(22, -18, 10);
  scene.add(warm);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 1000);
  const flatDir = new THREE.Vector3(0, 0, 1);
  const tiltDir = new THREE.Vector3(0.38, -0.55, 0.74).normalize();
  let distance = size * 1.8;
  let blend = 0; // 0 = 3D, 1 = flat
  let target = 0;
  let pointer = null;
  const dummy = new THREE.Object3D();
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();

  function update(time, dt) {
    blend += (target - blend) * Math.min(1, dt * 4);
    const dir = new THREE.Vector3().lerpVectors(tiltDir, flatDir, blend).normalize();
    camera.position.copy(dir.multiplyScalar(distance));
    camera.lookAt(0, 0, 0);
    const amp = 1 - blend;
    for (let i = 0; i < base.length; i++) {
      const { x, y } = base[i];
      let h = REST;
      if (amp > 0.001) {
        h += amp * (0.9 + 0.75 * Math.sin(time * 1.6 + (x + y) * 0.32) * Math.cos(time * 0.9 - x * 0.18));
        if (pointer) {
          const d2 = (x - pointer.x) ** 2 + (y - pointer.y) ** 2;
          h += amp * 2.6 * Math.exp(-d2 / 9);
        }
        h = Math.max(REST, h);
      }
      heights[i] += (h - heights[i]) * Math.min(1, dt * 8);
      dummy.position.set(x, y, heights[i] / 2);
      dummy.scale.set(1, 1, heights[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    group.rotation.z = amp * Math.sin(time * 0.3) * 0.05;
  }

  return {
    scene,
    camera,
    update,
    moduleCount: n,
    darkCount: cells.length,
    heights,
    get flatness() { return blend; },
    setFlat(flat) { target = flat ? 1 : 0; if (flat) pointer = null; },
    // ndc: pointer position in normalised device coordinates (-1..1)
    setPointer(ndcX, ndcY) {
      if (target === 1) return;
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      if (raycaster.ray.intersectPlane(plane, hit)) pointer = group.worldToLocal(hit.clone());
    },
    clearPointer() { pointer = null; },
    resize(w, h) {
      camera.aspect = w / h;
      // Fit the whole card whatever the shape of the box.
      const fit = (size * 0.62) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      distance = Math.max(fit, fit / camera.aspect);
      camera.updateProjectionMatrix();
    },
    dispose() { cardGeo.dispose(); cardMat.dispose(); boxGeo.dispose(); boxMat.dispose(); mesh.dispose(); },
  };
}
