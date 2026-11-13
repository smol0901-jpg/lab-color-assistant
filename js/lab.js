// Lab color utilities: Lab <-> RGB, Delta E
function labToRgb(L, a, b) {
  let y = (L + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;
  const eps = 216 / 24389, k = 24389 / 27;
  x = 0.95047 * (x * x * x > eps ? x * x * x : (x - 16 / 116) / 7.787);
  y = 1.0 * (y * y * y > eps ? y * y * y : (y - 16 / 116) / 7.787);
  z = 1.08883 * (z * z * z > eps ? z * z * z : (z - 16 / 116) / 7.787);
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let bl = x * 0.0557 + y * -0.2040 + z * 1.0570;
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  bl = bl > 0.0031308 ? 1.055 * Math.pow(bl, 1 / 2.4) - 0.055 : 12.92 * bl;
  return [
    Math.max(0, Math.min(255, Math.round(r * 255))),
    Math.max(0, Math.min(255, Math.round(g * 255))),
    Math.max(0, Math.min(255, Math.round(bl * 255)))
  ];
}
function deltaE(L1, a1, b1, L2, a2, b2) {
  return Math.sqrt((L1 - L2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}
