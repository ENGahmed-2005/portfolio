/* A phone with menuPilot screens as textures. Drag turns it; when left
   alone it sways gently; changing the screen spins it once. No renderer. */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export function roundedRect(w, h, r) {
  const x = -w / 2, y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 10);
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
  uv.needsUpdate = true;
  return g;
}

const W = 1, H = 2.12, D = 0.1;

export function createPhoneScene(textures = []) {
  const scene = new THREE.Scene();
  const group = new THREE.Group();
  scene.add(group);

  const bodyGeo = new RoundedBoxGeometry(W, H, D, 6, 0.13);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1d2a38, metalness: 0.75, roughness: 0.3 });
  group.add(new THREE.Mesh(bodyGeo, bodyMat));

  const screenGeo = roundedRect(W * 0.9, H * 0.955, 0.1);
  const screenMat = new THREE.MeshBasicMaterial({ map: textures[0] || null, color: textures[0] ? 0xffffff : 0x0b1622, toneMapped: false });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.z = D / 2 + 0.002;
  group.add(screen);

  const islandGeo = roundedRect(0.27, 0.07, 0.035);
  const islandMat = new THREE.MeshBasicMaterial({ color: 0x05080c });
  const island = new THREE.Mesh(islandGeo, islandMat);
  island.position.set(0, (H * 0.955) / 2 - 0.08, D / 2 + 0.004);
  group.add(island);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.8);
  key.position.set(2.5, 3, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf2a93b, 1.4);
  rim.position.set(-3, -1.5, -2.5);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 5);

  let rotY = -0.35, rotX = 0.06; // where the user left it
  let spin = 0;
  let dragging = false, idleSince = 0, clock = 0;

  function update(time, dt) {
    clock = time;
    const sway = dragging || time - idleSince < 2.5 ? 0 : Math.sin(time * 0.6) * 0.32;
    const ty = rotY + sway + spin;
    group.rotation.y += (ty - group.rotation.y) * Math.min(1, dt * 5);
    group.rotation.x += (rotX - group.rotation.x) * Math.min(1, dt * 5);
    group.position.y = Math.sin(time * 1.2) * 0.03;
  }

  return {
    scene,
    camera,
    update,
    group,
    screenMaterial: screenMat,
    startDrag() { dragging = true; },
    dragBy(dx, dy) { rotY += dx * 0.012; rotX = THREE.MathUtils.clamp(rotX + dy * 0.008, -0.6, 0.6); },
    endDrag() { dragging = false; idleSince = clock; },
    setScreen(i) {
      const map = textures[i];
      if (!map || screenMat.map === map) return;
      screenMat.map = map;
      screenMat.color.set(0xffffff);
      screenMat.needsUpdate = true;
      spin += Math.PI * 2; // one full turn to show the change
    },
    resize(w, h) {
      camera.aspect = w / h;
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.position.z = Math.max(1.35 / t, 0.8 / (t * camera.aspect));
      camera.updateProjectionMatrix();
    },
    dispose() {
      [bodyGeo, screenGeo, islandGeo].forEach((g) => g.dispose());
      [bodyMat, screenMat, islandMat].forEach((m) => m.dispose());
    },
  };
}
