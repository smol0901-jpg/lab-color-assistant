// Default colorant strengths (delta L,a,b per 1% dose) — orientational
const DEFAULT_COLORANTS = [
  { id: "black", name: "Чёрный", dL: -4.5, dA: 0.1, dB: 0.1, enabled: true },
  { id: "white", name: "Белый (TiO₂)", dL: 3.8, dA: -0.05, dB: -0.1, enabled: true },
  { id: "red", name: "Красный", dL: -0.3, dA: 4.2, dB: 1.5, enabled: true },
  { id: "yellow", name: "Жёлтый", dL: 0.8, dA: -0.4, dB: 5.5, enabled: true },
  { id: "blue", name: "Синий", dL: -1.2, dA: 0.3, dB: -4.8, enabled: true },
  { id: "green", name: "Зелёный", dL: -0.9, dA: -3.8, dB: 1.2, enabled: true }
];
function loadColorants() {
  try {
    const s = localStorage.getItem("colorants");
    if (s) return JSON.parse(s);
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_COLORANTS));
}
function saveColorants(list) {
  localStorage.setItem("colorants", JSON.stringify(list));
}
