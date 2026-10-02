/* Phone.app: menuPilot screens on a 3D phone. Drag to turn it, tap it or
   pick a screen below to switch. Without WebGL it shows the screenshots. */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createPhoneScene } from "../three/phoneScene.js";
import { useStage } from "../three/useStage.js";

export default function Phone3D({ screens }) {
  const [index, setIndex] = useState(0);
  const drag = useRef(null);
  const { ref, api, failed } = useStage(() => {
    const loader = new THREE.TextureLoader();
    const textures = screens.map((s) => {
      const t = loader.load(s.src);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    });
    const stage = createPhoneScene(textures);
    return { ...stage, dispose() { stage.dispose(); textures.forEach((t) => t.dispose()); } };
  });
  useEffect(() => { api.current?.setScreen(index); }, [index, api]);
  const next = () => setIndex((i) => (i + 1) % screens.length);

  const down = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, moved: 0 };
    api.current?.startDrag();
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    d.moved += Math.abs(dx) + Math.abs(dy);
    d.x = e.clientX; d.y = e.clientY;
    api.current?.dragBy(dx, dy);
  };
  const up = () => {
    const d = drag.current;
    drag.current = null;
    api.current?.endDrag();
    if (d && d.moved < 6) next(); // a tap, not a drag
  };

  return (
    <div className="stage-wrap">
      {failed
        ? <div className="stage stage--flat"><img className="phone-flat" src={screens[index].src} alt={screens[index].alt} width="560" height="1212" /></div>
        : <div ref={ref} className="stage stage--phone" role="img" aria-label={`3D phone showing menuPilot: ${screens[index].caption}`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />}
      <div className="stage-bar">
        <div className="segmented" role="group" aria-label="Phone screen">
          {screens.map((s, i) => (
            <button key={s.src} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}>{s.short}</button>
          ))}
        </div>
        <p>{failed ? screens[index].caption : "Drag to turn it, tap it to change the screen."}</p>
      </div>
    </div>
  );
}
