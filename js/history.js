function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("labHistory") || "[]");
  } catch (e) { return []; }
}
function saveHistory(arr) {
  localStorage.setItem("labHistory", JSON.stringify(arr.slice(0, 50)));
}
function addHistoryEntry(entry) {
  const h = loadHistory();
  h.unshift({ ...entry, ts: Date.now() });
  saveHistory(h);
  return h;
}
function clearHistory() {
  localStorage.removeItem("labHistory");
}
