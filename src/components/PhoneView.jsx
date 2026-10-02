/* Phone.app: menuPilot screens in a CSS 3D phone. It leans toward the
   pointer, a tap (or a button below) changes the screen. No WebGL needed. */
import { useState } from "react";

const REST = { x: 4, y: -14 };

export default function PhoneView({ screens }) {
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState(REST);
  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    setTilt({ x: -((e.clientY - b.top) / b.height - 0.5) * 14, y: ((e.clientX - b.left) / b.width - 0.5) * 30 });
  };
  const next = () => setIndex((i) => (i + 1) % screens.length);

  return (
    <div className="stage-wrap">
      <div className="stage stage--phone" onPointerMove={move} onPointerLeave={() => setTilt(REST)}>
        <button type="button" className="phone" style={{ "--rx": `${tilt.x}deg`, "--ry": `${tilt.y}deg` }} onClick={next}
          aria-label={`Showing ${screens[index].caption}. Show the next screen`}>
          {screens.map((s, i) => (
            <img key={s.src} src={s.src} alt={i === index ? s.alt : ""} aria-hidden={i !== index} className={i === index ? "is-on" : undefined}
              width="560" height="1212" loading="lazy" decoding="async" />
          ))}
          <span className="phone-island" aria-hidden="true" />
        </button>
      </div>
      <div className="stage-bar">
        <div className="segmented" role="group" aria-label="Phone screen">
          {screens.map((s, i) => <button key={s.src} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}>{s.short}</button>)}
        </div>
        <p>Tap the phone to change the screen.</p>
      </div>
    </div>
  );
}
