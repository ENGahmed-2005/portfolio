/* Scan.app: a real QR code made of cubes. Move over it to push the cubes up;
   "Flatten to scan" settles them and faces the camera so a phone can read
   it. Without WebGL it shows the same code as a flat, scannable SVG. */
import { useEffect, useMemo, useState } from "react";
import { createQrScene } from "../three/qrScene.js";
import { qrMatrix } from "../three/qr.js";
import { useStage } from "../three/useStage.js";

function FlatQr({ url }) {
  const { n, cells } = useMemo(() => qrMatrix(url), [url]);
  const q = 3;
  return (
    <svg className="qr-flat" viewBox={`0 0 ${n + q * 2} ${n + q * 2}`} role="img" aria-label="QR code that opens menuPilot" shapeRendering="crispEdges">
      <rect width="100%" height="100%" fill="#fff6cf" />
      {cells.map(([r, c]) => <rect key={`${r}-${c}`} x={c + q} y={r + q} width="1" height="1" fill="#172430" />)}
    </svg>
  );
}

export default function QrCode3D({ url }) {
  const [flat, setFlat] = useState(false);
  const { ref, api, failed, invalidate } = useStage(() => createQrScene(url));
  useEffect(() => { api.current?.setFlat(flat); invalidate(); }, [flat]); // eslint-disable-line react-hooks/exhaustive-deps

  const move = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    api.current?.setPointer(((e.clientX - box.left) / box.width) * 2 - 1, -(((e.clientY - box.top) / box.height) * 2 - 1));
    invalidate();
  };
  const leave = () => { api.current?.clearPointer(); invalidate(); };

  return (
    <div className="stage-wrap">
      {failed
        ? <div className="stage stage--flat"><FlatQr url={url} /></div>
        : <div ref={ref} className="stage stage--qr" role="img" aria-label="A 3D QR code made of cubes that opens menuPilot" onPointerMove={move} onPointerLeave={leave} />}
      <div className="stage-bar">
        {!failed && (
          <button type="button" className="btn btn--small" aria-pressed={flat} onClick={() => setFlat((f) => !f)}>
            {flat ? "Back to 3D" : "Flatten to scan"}
          </button>
        )}
        <p>{failed || flat ? "Point your phone camera at the code to open menuPilot." : "Move over the code, then flatten it to scan."}</p>
      </div>
    </div>
  );
}
