/* Mounts a three.js scene into a box: renderer, resize, a render loop that
   only runs while the box is on screen, reduced motion, and clean disposal.
   `failed` is true when WebGL isn't available, so callers show a fallback. */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useStage(make) {
  const ref = useRef(null);
  const api = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!webglAvailable()) { setFailed(true); return undefined; }
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const stage = make();
    api.current = stage;
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    el.appendChild(canvas);

    const resize = () => {
      const w = el.clientWidth || 320, h = el.clientHeight || 320;
      renderer.setSize(w, h, false);
      stage.resize(w, h);
    };
    resize();
    const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    ro?.observe(el);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let visible = true, raf = 0, last = performance.now(), time = 0;
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) time += dt;
      stage.update(time, reduce ? 1 : dt); // reduced motion: no idle animation, changes snap
      renderer.render(stage.scene, stage.camera);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
        })
      : null;
    io?.observe(el);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      stage.dispose();
      renderer.dispose();
      canvas.remove();
      api.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, api, failed };
}
