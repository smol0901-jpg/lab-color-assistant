// Dose calculation: linear model, positive doses only, 1-3 colorants
function formatDose(p) {
  if (p < 0.001) return p.toFixed(4);
  if (p < 0.01) return p.toFixed(3);
  if (p < 0.1) return p.toFixed(2);
  return p.toFixed(2);
}
function calcDoses(dL, dA, dB, colorants, step = 0.5) {
  const enabled = colorants.filter(c => c.enabled);
  if (!enabled.length) return [];
  // Simple greedy: pick up to 3 that reduce residual most
  let residual = { L: dL, A: dA, B: dB };
  const result = [];
  const used = new Set();
  for (let k = 0; k < 3; k++) {
    let best = null, bestScore = Infinity, bestDose = 0;
    for (const c of enabled) {
      if (used.has(c.id)) continue;
      // Solve for dose that best matches residual along this colorant direction
      const mag = Math.sqrt(c.dL * c.dL + c.dA * c.dA + c.dB * c.dB) || 1;
      let dose = (residual.L * c.dL + residual.A * c.dA + residual.B * c.dB) / (mag * mag);
      if (dose < 0) dose = 0;
      dose = Math.min(dose, 50);
      const nL = residual.L - dose * c.dL;
      const nA = residual.A - dose * c.dA;
      const nB = residual.B - dose * c.dB;
      const score = nL * nL + nA * nA + nB * nB;
      if (score < bestScore && dose > 0.00005) {
        bestScore = score;
        best = c;
        bestDose = dose;
      }
    }
    if (!best) break;
    used.add(best.id);
    const applied = bestDose * step;
    result.push({ id: best.id, name: best.name, percent: applied, formatted: formatDose(applied) });
    residual.L -= bestDose * best.dL;
    residual.A -= bestDose * best.dA;
    residual.B -= bestDose * best.dB;
  }
  return result;
}
