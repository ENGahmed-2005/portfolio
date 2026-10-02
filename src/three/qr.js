/* QR matrix for a URL (no three.js, so the flat fallback stays light). */
import qrcode from "qrcode-generator";

export function qrMatrix(text) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const cells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) cells.push([r, c]);
  return { n, cells };
}
