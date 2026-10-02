/* Phone.app: menuPilot screens in a CSS 3D phone. It leans toward the
   pointer, a tap (or a button below) changes the screen. No WebGL needed. */
import { useState } from "react";
import { useI18n } from "../i18n.jsx";

const REST = { x: 4, y: -14 }; // leans away from the reading direction

export default function PhoneView({ screens }) {
  const { t: { tryIt: k }, lang } = useI18n();
  const [index, setIndex] = useState(0);
  const rest = lang === "ar" ? { ...REST, y: -REST.y } : REST;
  const [tilt, setTilt] = useState(null);
  const shown = tilt || rest;
  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    setTilt({ x: -((e.clientY - b.top) / b.height - 0.5) * 14, y: ((e.clientX - b.left) / b.width - 0.5) * 30 });
  };
  const next = () => setIndex((i) => (i + 1) % screens.length);

  return (
    <div className="stage-wrap">
      <div className="stage stage--phone" onPointerMove={move} onPointerLeave={() => setTilt(null)}>
        <button type="button" className="phone" style={{ "--rx": `${shown.x}deg`, "--ry": `${shown.y}deg` }} onClick={next}
          aria-label={k.phoneAria(screens[index].caption)}>
          {screens.map((s, i) => (
            <img key={s.src} src={s.src} alt={i === index ? s.alt : ""} aria-hidden={i !== index} className={i === index ? "is-on" : undefined}
              width="560" height="1212" loading="lazy" decoding="async" />
          ))}
          <span className="phone-island" aria-hidden="true" />
        </button>
      </div>
      <div className="stage-bar">
        <div className="segmented" role="group" aria-label={k.phoneGroup}>
          {screens.map((s, i) => <button key={s.src} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}>{s.short}</button>)}
        </div>
        <p>{k.phoneHint}</p>
      </div>
    </div>
  );
}
