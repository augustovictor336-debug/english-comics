"use strict";
/* English Comics — ilustrações SVG originais, ícones e gráficos. */
const INK = "#171717";
function logoSVG() {
  return `<svg class="logo-mark" viewBox="0 0 60 60" aria-hidden="true"><path d="M8 10h44a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H26l-12 10 3-10H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" fill="#FFD43B" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><text x="30" y="35" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="22" fill="${INK}" letter-spacing="1">EC!</text></svg>`;
}
/* Professor Ace: personagem original do English Comics */
function teacherSVG(mood = "happy", cls = "teacher") {
  const mouth = mood === "think" ? `<path d="M52 79 q8 -3 16 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : mood === "wow" ? `<ellipse cx="60" cy="80" rx="6" ry="7" fill="${INK}"/>`
    : `<path d="M48 76 q12 12 24 0" stroke="${INK}" stroke-width="3" fill="#fff" stroke-linejoin="round"/>`;
  return `<svg class="${cls}" viewBox="0 0 120 136" role="img" aria-label="Professor Ace, o professor do English Comics">
  <path d="M18 136 q2 -34 42 -38 q40 4 42 38z" fill="#14213D" stroke="${INK}" stroke-width="3"/>
  <path d="M50 98 l10 14 l10 -14z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
  <path d="M57 104 l3 -4 l3 4 l-3 22z" fill="#EF476F" stroke="${INK}" stroke-width="2"/>
  <rect x="50" y="84" width="20" height="16" fill="#E9B38B" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="60" cy="58" rx="30" ry="33" fill="#F4C49E" stroke="${INK}" stroke-width="3"/>
  <path d="M29 52 q-2 -32 31 -32 q30 0 32 26 q-6 -10 -18 -12 q-10 10 -32 8 q-8 2 -13 10z" fill="#3B2A20" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="47" cy="60" r="10" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="73" cy="60" r="10" fill="#fff" stroke="${INK}" stroke-width="3"/>
  <path d="M57 60 h6" stroke="${INK}" stroke-width="3"/>
  <circle cx="48" cy="61" r="3.4" fill="${INK}"/><circle cx="74" cy="61" r="3.4" fill="${INK}"/>
  <path d="M39 45 q8 -5 15 -1 M66 44 q8 -4 15 1" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${mouth}
  <circle cx="36" cy="74" r="4" fill="#EF476F" opacity=".35"/><circle cx="84" cy="74" r="4" fill="#EF476F" opacity=".35"/>
  </svg>`;
}
/* Personagem do aluno, evolui com o nível de jogador */
function heroSVG(stage = 0, cls = "") {
  const cape = stage >= 2 ? `<path d="M30 70 q-14 40 -6 62 h72 q8 -22 -6 -62z" fill="#EF476F" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` : "";
  const suit = stage >= 3 ? "#2196F3" : stage >= 1 ? "#14213D" : "#6B7A99";
  const emblem = stage >= 3 ? `<path d="M60 86 l5 10 l11 1 l-8 7 l3 11 l-11 -6 l-11 6 l3 -11 l-8 -7 l11 -1z" fill="#FFD43B" stroke="${INK}" stroke-width="2"/>` : stage >= 1 ? `<circle cx="60" cy="98" r="8" fill="#FFD43B" stroke="${INK}" stroke-width="2"/>` : "";
  const mask = stage >= 1 ? `<path d="M34 54 q26 -10 52 0 q-2 12 -12 12 q-8 0 -14 -6 q-6 6 -14 6 q-10 0 -12 -12z" fill="${stage >= 3 ? "#EF476F" : "#14213D"}" stroke="${INK}" stroke-width="2.5"/>` : "";
  const cap = stage === 0 ? `<path d="M30 40 q30 -26 60 0 z" fill="#2196F3" stroke="${INK}" stroke-width="3"/><path d="M84 38 h18 q2 4 -2 6 h-18z" fill="#2196F3" stroke="${INK}" stroke-width="3"/>` : "";
  const crown = stage >= 4 ? `<path d="M38 26 l6 -14 l8 10 l8 -14 l8 14 l8 -10 l6 14z" fill="#FFD43B" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` : "";
  const bolt = stage >= 4 ? `<path d="M100 8 l-8 16 h7 l-6 14 l14 -18 h-7 l6 -12z" fill="#FFD43B" stroke="${INK}" stroke-width="2"/>` : "";
  return `<svg class="${cls}" viewBox="0 0 120 136" role="img" aria-label="Seu personagem: ${STAGES[stage].name}">
  ${cape}
  <path d="M30 136 q0 -40 30 -44 q30 4 30 44z" fill="${suit}" stroke="${INK}" stroke-width="3"/>
  ${emblem}
  <ellipse cx="60" cy="52" rx="27" ry="29" fill="#C68B5E" stroke="${INK}" stroke-width="3"/>
  <path d="M33 46 q0 -26 27 -26 q27 0 27 24 q-10 -10 -27 -10 q-16 0 -27 12z" fill="#1E1A17" stroke="${INK}" stroke-width="3"/>
  ${cap}${mask}
  <circle cx="49" cy="57" r="3.2" fill="${stage >= 1 ? "#fff" : INK}"/><circle cx="71" cy="57" r="3.2" fill="${stage >= 1 ? "#fff" : INK}"/>
  <path d="M50 70 q10 8 20 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${crown}${bolt}
  </svg>`;
}
function burstSVG(text, color) {
  const pts = []; const n = 18;
  for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 70 : 118; const a = Math.PI * 2 * i / (n * 2); pts.push(`${(130 + Math.cos(a) * r * 1.15).toFixed(1)},${(110 + Math.sin(a) * r * .82).toFixed(1)}`); }
  const fill = color === "#2196F3" || color === "#EF476F" ? "#fff" : INK;
  return `<svg width="300" height="230" viewBox="0 0 260 220"><polygon points="${pts.join(" ")}" fill="${color}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <text x="130" y="126" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="${text.length > 8 ? 34 : 48}" fill="${fill}" stroke="${INK}" stroke-width="${fill === "#fff" ? 2 : 0}" letter-spacing="2">${esc(text)}</text></svg>`;
}
function medalSVG(on, i) {
  const c = ["#FFD43B", "#2196F3", "#EF476F"][i % 3];
  return `<svg class="medal" viewBox="0 0 64 64" aria-hidden="true"><path d="M20 2 l8 20 h8 l8 -20z" fill="${on ? "#14213D" : "#9AA3B5"}" stroke="${INK}" stroke-width="2.5"/><circle cx="32" cy="40" r="20" fill="${on ? c : "#D7DBE4"}" stroke="${INK}" stroke-width="3"/><path d="M32 28 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1z" fill="${on ? "#fff" : "#EEF0F5"}" stroke="${INK}" stroke-width="2"/></svg>`;
}
const ICONS = {
  home: `<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>`,
  book: `<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>`,
  bolt: `<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>`,
  blocks: `<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="8" y="13" width="8" height="8" rx="1"/>`,
  target: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>`,
  chat: `<path d="M4 5h16v11H9l-5 4z"/>`,
  repeat: `<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5"/>`,
  chart: `<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`,
  trophy: `<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 3M16 6h4v2a3 3 0 0 1-4 3M12 13v4M8 21h8M9 17h6"/>`,
  user: `<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,
  more: `<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>`,
  speaker: `<path d="M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>`,
  mic: `<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>`,
  send: `<path d="M3 11l18-8-8 18-2-8z"/>`,
  star: `<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>`,
  x: `<path d="M5 5l14 14M19 5L5 19"/>`,
  turtle: `<path d="M4 15c0-4 3.5-7 8-7s8 3 8 7zM20 13h2M6 15l-1 3M18 15l1 3M8 11l2 4M14 9l-1 6"/>`
};
const icon = (n, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;

/* ───────── Gráficos (SVG próprio, série única, tooltip ao passar o mouse) ───────── */
function niceMax(v) { if (v <= 4) return 4; const p = Math.pow(10, Math.floor(Math.log10(v))); const m = v / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p; }
function barChart(data, { h = 200, color = "#2196F3", unit = "", fmt = v => v } = {}) {
  const W = 600, pad = { l: 36, r: 8, t: 14, b: 26 };
  const max = niceMax(Math.max(...data.map(d => d.v), 0));
  const iw = W - pad.l - pad.r, ih = h - pad.t - pad.b, bw = iw / data.length;
  let g = "";
  for (let i = 0; i <= 4; i++) { const y = pad.t + ih - ih * i / 4; g += `<line class="grid-l" x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}"/><text x="${pad.l - 6}" y="${y + 4}" text-anchor="end">${fmt(Math.round(max * i / 4))}</text>`; }
  const bars = data.map((d, i) => {
    const bh = Math.max(d.v ? 3 : 0, ih * d.v / max), x = pad.l + i * bw + bw * .18, w = bw * .64, y = pad.t + ih - bh;
    const r = Math.min(4, w / 2, bh);
    const path = bh ? `M${x},${pad.t + ih} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${pad.t + ih}Z` : "";
    const showLbl = data.length <= 16 || i % Math.ceil(data.length / 10) === 0 || i === data.length - 1;
    return `<g><rect x="${pad.l + i * bw}" y="${pad.t}" width="${bw}" height="${ih}" fill="transparent" data-tip="${esc(d.tip || `${d.l}: ${fmt(d.v)}${unit}`)}"/>${path ? `<path class="mk" d="${path}" fill="${d.c || color}" stroke="${INK}" stroke-width="1.5" pointer-events="none"/>` : ""}${showLbl ? `<text x="${pad.l + i * bw + bw / 2}" y="${h - 8}" text-anchor="middle">${esc(d.l)}</text>` : ""}</g>`;
  }).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${h}" role="img" aria-label="Gráfico de barras">${g}<line x1="${pad.l}" x2="${W - pad.r}" y1="${pad.t + ih}" y2="${pad.t + ih}" stroke="${INK}" stroke-width="1.5"/>${bars}</svg>`;
}
function lineChart(data, { h = 200, color = "#EF476F", max = null, unit = "" } = {}) {
  const W = 600, pad = { l: 36, r: 14, t: 14, b: 26 };
  const mx = max || niceMax(Math.max(...data.map(d => d.v), 0));
  const iw = W - pad.l - pad.r, ih = h - pad.t - pad.b;
  const X = i => pad.l + (data.length === 1 ? iw / 2 : iw * i / (data.length - 1)), Y = v => pad.t + ih - ih * v / mx;
  let g = "";
  for (let i = 0; i <= 4; i++) { const y = pad.t + ih - ih * i / 4; g += `<line class="grid-l" x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}"/><text x="${pad.l - 6}" y="${y + 4}" text-anchor="end">${Math.round(mx * i / 4)}</text>`; }
  const pts = data.map((d, i) => `${X(i)},${Y(d.v)}`).join(" ");
  const area = data.length > 1 ? `<polygon points="${X(0)},${pad.t + ih} ${pts} ${X(data.length - 1)},${pad.t + ih}" fill="${color}" opacity=".14"/>` : "";
  const dots = data.map((d, i) => `<circle cx="${X(i)}" cy="${Y(d.v)}" r="${i === data.length - 1 ? 6 : 4.5}" fill="${i === data.length - 1 ? color : "#fff"}" stroke="${INK}" stroke-width="2"/><circle cx="${X(i)}" cy="${Y(d.v)}" r="16" fill="transparent" data-tip="${esc(d.tip || `${d.l}: ${d.v}${unit}`)}"/><text x="${X(i)}" y="${h - 8}" text-anchor="middle">${esc(d.l)}</text>`).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${h}" role="img" aria-label="Gráfico de linha">${g}${area}<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}</svg>`;
}
function hbar(rows, color = "#2196F3") {
  return `<div class="stack">${rows.map(r => `<div class="stack" style="gap:4px"><div class="row between small"><b>${esc(r.l)}</b><span class="num muted" style="font-weight:800">${r.txt}</span></div><div class="bar" data-tip="${esc(r.l + ": " + r.txt)}"><i style="width:${clamp(r.v, 0, 100)}%;background:${r.c || color}"></i></div></div>`).join("")}</div>`;
}
function ring(v, n, color = "#EF476F", label = "") {
  const p = n ? clamp(v / n, 0, 1) : 0, R = 38, C = 2 * Math.PI * R;
  return `<svg class="ring" viewBox="0 0 96 96" role="img" aria-label="${esc(label)}"><circle cx="48" cy="48" r="${R}" fill="#fff" stroke="#E3E6EE" stroke-width="12"/><circle cx="48" cy="48" r="${R}" fill="none" stroke="${color}" stroke-width="12" stroke-dasharray="${C * p} ${C}" transform="rotate(-90 48 48)" stroke-linecap="round"/><circle cx="48" cy="48" r="${R + 7}" fill="none" stroke="${INK}" stroke-width="2"/><circle cx="48" cy="48" r="${R - 7}" fill="none" stroke="${INK}" stroke-width="2"/><text x="48" y="54" text-anchor="middle" font-family="Bangers, Impact" font-size="20" fill="${INK}">${Math.round(p * 100)}%</text></svg>`;
}
