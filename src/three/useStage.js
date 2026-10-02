/* Mounts a three.js scene into a fixed-size box and draws only when
   something changes: `invalidate()` asks for frames, and the loop stops by
   itself once `update()` reports the scene has settled. Idle, it costs
   nothing. `failed` = no WebGL, so callers show a fallback. */
import { useEffect, useRef, useState } from "react";
import { WebGLRenderer } from "three";

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
  const invalidateRef = useRef(() => {});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!webglAvailable()) { setFailed(true); return undefined; }
    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const stage = make();
    api.current = stage;
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    el.appendChild(canvas); // positioned absolutely by CSS, so it never sizes the box

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0, time = 0;
    const loop = (now) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      time += dt;
      const busy = stage.update(time, reduce ? 1 : dt);
      renderer.render(stage.scene, stage.camera);
      raf = busy ? requestAnimationFrame(loop) : 0;
      if (!raf) last = 0;
    };
    const invalidate = () => { if (!raf) raf = requestAnimationFrame(loop); };
    invalidateRef.current = invalidate;

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      stage.resize(w, h);
      invalidate();
    };
    resize();
    const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    ro?.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      stage.dispose();
      renderer.dispose();
      canvas.remove();
      api.current = null;
      invalidateRef.current = () => {};
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, api, failed, invalidate: () => invalidateRef.current() };
}
