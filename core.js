"use strict";
/* English Comics — núcleo: estado, armazenamento, IA, voz, gamificação e utilidades. */
const D = window.EC_DATA;
const BANK = Object.fromEntries(D.WORDS.map(w => [w.id, w]));
const LEVEL_IDS = D.LEVELS.map(l => l.id);
const DAY = 864e5;
const IV = [0, 1, 3, 7, 14, 30, 60];
const LSK = "english-comics-v1";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const todayKey = (d = new Date()) => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); };
const keyToDate = k => new Date(k + "T12:00:00");
const addDays = (k, n) => todayKey(new Date(keyToDate(k).getTime() + n * DAY));
const mondayOf = k => addDays(k, -((keyToDate(k).getDay() + 6) % 7));
const weekdayIdx = (k = todayKey()) => (keyToDate(k).getDay() + 6) % 7;
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const fmtMin = s => { const m = Math.round(s / 60); return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`; };
const levelName = id => (D.LEVELS.find(l => l.id === id) || D.LEVELS[0]).name;
const TOPIC_COLOR = { daily: "#E3F1FD", work: "#FFF1B8", food: "#FFE3EA", travel: "#DDF4FF", shopping: "#F3E5FF", family: "#E2F7EC", feelings: "#FFE9D6", info: "#EAEFFA" };
const DAYS = [
  { d: "SEG", t: "5 palavras novas" }, { d: "TER", t: "5 palavras novas" }, { d: "QUA", t: "5 palavras novas" },
  { d: "QUI", t: "Construção de frases" }, { d: "SEX", t: "Exercícios e traduções" }, { d: "SÁB", t: "Conversação prática" }, { d: "DOM", t: "Revisão e teste semanal" }
];
const CHEERS = ["POW!", "WOW!", "BOOM!", "GREAT!", "AWESOME!", "NICE!", "BAM!", "YES!"];

/* ───────── Estado ───────── */
function freshState() {
  return { v: 1, updated: 0, profile: { name: "", level: "A1", onboarded: false, created: Date.now(), goal: 50, slow: false }, xp: 0,
    streak: { count: 0, best: 0, last: null }, words: {}, fav: [], weeks: [], cur: -1, log: {}, typeStats: {}, mistakes: [],
    convs: [], ach: {}, custom: {}, sentOk: 0, sentBad: 0, sessions: 0 };
}
let S = freshState();
function getWord(id) { return BANK[id] || S.custom[id] || null; }
function allWords() { return [...D.WORDS, ...Object.values(S.custom)]; }
function week() { return S.weeks[S.cur] || null; }
function L(k = todayKey()) { return S.log[k] || (S.log[k] = { xp: 0, sec: 0, ok: 0, bad: 0, words: 0, sent: 0, conv: 0, rev: 0, chal: [] }); }
function ws(id) { return S.words[id] || (S.words[id] = { st: "new", box: 0, due: 0, ok: 0, bad: 0, seen: 0 }); }
function learnedIds() { return Object.keys(S.words).filter(id => S.words[id].st === "learned" && getWord(id)); }
function needsReview(id) { const w = S.words[id]; return !!w && w.st !== "new" && (w.due <= Date.now() || w.bad > w.ok); }
function reviewIds() { return Object.keys(S.words).filter(id => getWord(id) && needsReview(id)).sort((a, b) => S.words[a].due - S.words[b].due); }

/* ───────── Armazenamento (conta claude.ai via db; navegador como reserva) ───────── */
const Store = {
  mode: "local", ref: null, convRef: null, timer: null, saving: false,
  loadLocal() {
    try { const raw = localStorage.getItem(LSK); if (raw) return JSON.parse(raw); } catch (e) { }
    return null;
  },
  async init() {
    const local = this.loadLocal();
    if (local && local.v === 1) S = Object.assign(freshState(), local);
    const db = await cap("db");
    const user = await cap("user");
    if (db && user && user.id) {
      try {
        const uid = await user.id();
        const col = db.collection("data/users/" + uid);
        this.ref = col.doc("state");
        this.convRef = col.doc("convs");
        const remote = unwrap(await withTimeout(this.ref.get(), 10000));
        const convs = unwrap(await withTimeout(this.convRef.get(), 10000).catch(() => null));
        this.mode = "cloud";
        let pushLocal = !remote;
        if (remote && remote.json) {
          const r = JSON.parse(remote.json);
          if (!local || (r.updated || 0) >= (local.updated || 0)) S = Object.assign(freshState(), r);
          else pushLocal = true;
        }
        if (convs && convs.json) { try { const c = JSON.parse(convs.json); if (Array.isArray(c) && c.length >= (S.convs || []).length) S.convs = c; } catch (e) { } }
        if (!S.profile.name && user.me) {
          try { const me = await user.me(); if (me && me.name) S.profile.name = me.name.split(" ")[0]; } catch (e) { }
        }
        if (pushLocal) this.save(true);
      } catch (e) { this.mode = "local"; this.ref = null; }
    }
    setSync();
  },
  save(now) {
    S.updated = Date.now();
    clearTimeout(this.timer);
    const run = () => {
      const st = Object.assign({}, S, { convs: [] });
      try { localStorage.setItem(LSK, JSON.stringify(S)); } catch (e) { }
      if (this.mode === "cloud" && this.ref) {
        this.saving = true; setSync();
        Promise.all([
          this.ref.set({ json: JSON.stringify(st), updated: S.updated }),
          this.convRef.set({ json: JSON.stringify(S.convs.slice(-20)), updated: S.updated })
        ]).then(() => { this.saving = false; setSync(); })
          .catch(() => { this.saving = false; setSync("err"); });
      }
    };
    if (now) run(); else this.timer = setTimeout(run, 900);
  }
};
function unwrap(r) {
  if (!r) return null;
  if (r.exists === false) return null;
  if (typeof r.data === "function") return r.data();
  if (r.data && typeof r.data === "object" && !("json" in r)) return r.data;
  return r;
}
function withTimeout(p, ms) { return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]); }
async function cap(name) {
  for (let i = 0; i < 15 && !(window.claude && window.claude.use); i++) await new Promise(r => setTimeout(r, 100));
  if (!(window.claude && window.claude.use)) return null;
  try { return await withTimeout(window.claude.use(name), 11000); } catch (e) { return null; }
}
function setSync(err) {
  const el = $("#sync"); if (!el) return;
  el.classList.toggle("cloud", Store.mode === "cloud");
  el.lastElementChild.textContent = err ? "Erro ao salvar; tentaremos de novo" : Store.mode === "cloud" ? (Store.saving ? "Salvando…" : "Progresso salvo na sua conta") : "Progresso salvo neste navegador";
}

/* ───────── IA (Claude via claude.ai) ───────── */
const AI = {
  s: null, checked: false,
  async init() { this.s = await cap("sample"); this.checked = true; },
  ok() { return !!this.s; },
  async json(prompt, tier = "default") {
    if (!this.s) throw { code: "unavailable", message: "IA não configurada" };
    let v = null;
    if (typeof this.s.json === "function") {
      try { v = await this.s.json(prompt, { cache: false, modelTier: tier }); }
      catch (e) { if (e && (e.code === "not_granted" || e.code === "rate_limited")) throw e; v = null; }
    }
    if (v == null || typeof v !== "object") {
      const r = await this.s(prompt, { cache: false, modelTier: tier });
      v = parseJSONLoose(r && r.text);
    }
    if (v == null) throw { code: "bad_output", message: "Resposta inválida da IA" };
    return v;
  }
};
function parseJSONLoose(t) {
  if (!t) return null;
  try { return JSON.parse(t); } catch (e) { }
  const m = t.match(/[\[{][\s\S]*[\]}]/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) { } }
  return null;
}
function aiErrorText(e) {
  const c = e && e.code;
  if (c === "not_granted") return "Você não autorizou o uso do Claude nesta página. Recarregue e permita quando for perguntado.";
  if (c === "rate_limited") return "Muitas solicitações seguidas. Espere um minuto e tente de novo.";
  if (c === "unavailable") return "O professor de IA ainda não está configurado neste acesso.";
  return "Não consegui falar com o professor agora. Tente de novo em instantes.";
}
function pendingAI(extra = "") {
  const msg = window.claude
    ? "Esta função usa o Claude através da sua conta do claude.ai. Autorize o uso quando a página pedir e recarregue. Nenhuma chave de API fica exposta na página."
    : "Nesta versão hospedada fora do claude.ai, o professor de IA precisa de um backend (por exemplo, uma Edge Function do Supabase) que guarde a chave da API no servidor. Essa integração ainda não foi configurada, então nada aqui será simulado.";
  return `<div class="pending" role="status"><b>Professor de IA: configuração pendente</b><p class="small">${msg}</p>${extra}</div>`;
}

/* ───────── Voz: pronúncia (TTS) e microfone (ditado) ───────── */
const Voice = {
  t: null, d: null, synth: ("speechSynthesis" in window) ? window.speechSynthesis : null, voice: null, speaking: false,
  async init() {
    [this.t, this.d] = await Promise.all([cap("tts"), cap("dictation")]);
    if (!this.d && !window.claude) this.d = webDictation();
    if (this.synth) {
      const choose = () => { const vs = this.synth.getVoices(); this.voice = vs.find(v => /en-US/i.test(v.lang) && /Google|Samantha|Jenny|Aria/i.test(v.name)) || vs.find(v => /^en/i.test(v.lang)) || null; };
      choose(); try { this.synth.onvoiceschanged = choose; } catch (e) { }
    }
  },
  can() { return !!(this.t || (this.synth && this.voice)); },
  speak(text, slow) {
    slow = slow ?? S.profile.slow;
    if (this.t) {
      return this.t.speak(text, { language: "en", rate: slow ? 0.75 : 1 }).catch(e => {
        if (e && e.code === "busy") toast("Pare o microfone para ouvir o áudio.");
        else if (this.synth && this.voice) this.synthSpeak(text, slow);
      });
    }
    if (this.synth && this.voice) return this.synthSpeak(text, slow);
    toast("Áudio indisponível neste navegador.");
    return Promise.resolve();
  },
  synthSpeak(text, slow) {
    return new Promise(res => {
      try {
        this.synth.cancel();
        const u = new SpeechSynthesisUtterance(text); u.voice = this.voice; u.lang = this.voice.lang; u.rate = slow ? 0.7 : 0.95;
        u.onend = res; u.onerror = res; this.synth.speak(u);
      } catch (e) { res(); }
    });
  }
};

/* Microfone fora do claude.ai: reconhecimento de voz do navegador (Chrome/Edge) */
function webDictation() {
  const R = window.SpeechRecognition || window.webkitSpeechRecognition; if (!R) return null;
  let rec = null; const cb = { p: [], f: [], s: [] };
  const emit = (k, v) => cb[k].forEach(fn => { try { fn(v); } catch (e) { } });
  return {
    start() {
      rec = new R(); rec.lang = "en-US"; rec.interimResults = true; rec.continuous = true;
      rec.onresult = e => { let interim = ""; for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) emit("f", { text: r[0].transcript.trim() }); else interim += r[0].transcript; } emit("p", { text: interim }); };
      rec.onstart = () => emit("s", { state: "listening" });
      rec.onend = () => emit("s", { state: "idle", reason: "stopped" });
      return new Promise((res, rej) => {
        rec.onerror = e => { emit("s", { state: "idle", reason: e.error }); if (e.error === "not-allowed") rej({ code: "not_granted" }); };
        try { rec.start(); res(); } catch (e) { rej(e); }
      });
    },
    stop() { try { rec && rec.stop(); } catch (e) { } return Promise.resolve(); },
    onPartial(f) { cb.p.push(f); }, onFinal(f) { cb.f.push(f); }, onState(f) { cb.s.push(f); }
  };
}

/* ───────── Gamificação ───────── */
const playerLevel = (xp = S.xp) => Math.floor(Math.sqrt(xp / 40)) + 1;
const levelXP = n => 40 * (n - 1) * (n - 1);
const STAGES = [
  { min: 1, name: "Rookie", pt: "Novato" }, { min: 3, name: "Sidekick", pt: "Parceiro" }, { min: 5, name: "Hero", pt: "Herói" },
  { min: 8, name: "Super Hero", pt: "Super-herói" }, { min: 12, name: "Legend", pt: "Lenda" }
];
const stageIdx = (lv = playerLevel()) => STAGES.reduce((a, s, i) => lv >= s.min ? i : a, 0);

const ACH = [
  { id: "first-word", t: "FIRST WORD", d: "Aprenda sua primeira palavra.", test: () => learnedIds().length >= 1 },
  { id: "first-15", t: "FIRST 15 WORDS", d: "Aprenda 15 palavras.", test: () => learnedIds().length >= 15 },
  { id: "words-50", t: "50 WORDS LEARNED", d: "Aprenda 50 palavras.", test: () => learnedIds().length >= 50 },
  { id: "words-100", t: "100 WORDS LEARNED", d: "Aprenda 100 palavras.", test: () => learnedIds().length >= 100 },
  { id: "streak-3", t: "3 DAYS STREAK", d: "Estude 3 dias seguidos.", test: () => S.streak.best >= 3 },
  { id: "streak-7", t: "7 DAYS STREAK", d: "Estude 7 dias seguidos.", test: () => S.streak.best >= 7 },
  { id: "streak-30", t: "30 DAYS STREAK", d: "Estude 30 dias seguidos.", test: () => S.streak.best >= 30 },
  { id: "first-conv", t: "FIRST CONVERSATION", d: "Converse com o professor de IA.", test: () => S.convs.some(c => c.msgs.filter(m => m.r === "me").length >= 1) },
  { id: "conv-10", t: "TALKATIVE", d: "Complete 10 conversas com 5 mensagens ou mais.", test: () => S.convs.filter(c => c.msgs.filter(m => m.r === "me").length >= 5).length >= 10 },
  { id: "builder-25", t: "SENTENCE BUILDER", d: "Monte 25 frases corretas.", test: () => S.sentOk >= 25 },
  { id: "perfect", t: "PERFECT SESSION", d: "Acerte 100% de uma sessão com 8 ou mais questões.", test: () => !!S.ach._perfect },
  { id: "week-1", t: "WEEK ONE COMPLETE", d: "Faça seu primeiro teste semanal.", test: () => S.weeks.some(w => w.test) },
  { id: "test-90", t: "TOP SCORE", d: "Tire 90% ou mais em um teste semanal.", test: () => S.weeks.some(w => w.test && w.test.score / w.test.total >= .9) },
  { id: "xp-1000", t: "1,000 XP", d: "Acumule 1.000 XP.", test: () => S.xp >= 1000 },
  { id: "champion", t: "ENGLISH CHAMPION", d: "Conclua 4 testes semanais com 70% ou mais.", test: () => S.weeks.filter(w => w.test && w.test.score / w.test.total >= .7).length >= 4 }
];
function checkAch() {
  const fresh = [];
  for (const a of ACH) if (!S.ach[a.id] && a.test()) { S.ach[a.id] = Date.now(); fresh.push(a); }
  fresh.forEach((a, i) => setTimeout(() => { burst("UNLOCKED!", "#EF476F"); toast(`🏅 Conquista: ${a.t}`); }, 900 + i * 1300));
}
function touchStreak() {
  const k = todayKey(), st = S.streak;
  if (st.last === k) return;
  st.count = st.last === addDays(k, -1) ? st.count + 1 : 1;
  st.last = k; st.best = Math.max(st.best, st.count);
}
function streakNow() { const st = S.streak; return st.last === todayKey() || st.last === addDays(todayKey(), -1) ? st.count : 0; }
function gain(xp, silent) {
  const before = playerLevel();
  S.xp += xp; L().xp += xp;
  const w = week(); if (w) w.stats.xp += xp;
  touchStreak();
  if (!silent && xp > 0) toast(`+${xp} XP`);
  const after = playerLevel();
  if (after > before) setTimeout(() => { burst(`LEVEL ${after}!`, "#FFD43B"); if (stageIdx(after) > stageIdx(before)) toast(`Seu personagem evoluiu: ${STAGES[stageIdx(after)].name}!`); }, 700);
  checkChallenges(); checkAch(); refreshChrome(); Store.save();
}
/* registra uma resposta: estatísticas, repetição espaçada e erros */
function record(ok, type, wid, detail) {
  const l = L(); ok ? l.ok++ : l.bad++;
  const ts = S.typeStats[type] || (S.typeStats[type] = { ok: 0, bad: 0 }); ok ? ts.ok++ : ts.bad++;
  const w = week(); if (w) ok ? w.stats.ok++ : w.stats.bad++;
  if (wid && getWord(wid)) srs(wid, ok);
  if (!ok && detail) { S.mistakes.push(Object.assign({ type, wid: wid || null, at: Date.now() }, detail)); if (S.mistakes.length > 80) S.mistakes.splice(0, S.mistakes.length - 80); }
  gain(ok ? 10 : 2, true);
}
function srs(id, ok) {
  const w = ws(id); w.seen++;
  if (ok) {
    w.ok++; w.box = Math.min(w.box + 1, 6); w.due = Date.now() + IV[w.box] * DAY;
    if (w.st === "new") w.st = "learning";
    if (w.st === "learning" && w.box >= 2) markLearned(id, true);
  } else { w.bad++; w.box = 1; w.due = Date.now(); if (w.st === "new") w.st = "learning"; }
}
function markLearned(id, silent) {
  const w = ws(id); if (w.st === "learned") return;
  w.st = "learned"; w.learnedAt = Date.now(); w.box = Math.max(w.box, 1); w.due = Date.now() + IV[w.box] * DAY;
  L().words++;
  gain(5, silent);
}

/* ───────── Desafios diários e metas semanais ───────── */
const CHAL_POOL = [
  { id: "ok10", t: "Acerte 10 exercícios", n: 10, f: l => l.ok },
  { id: "words3", t: "Aprenda 3 palavras novas", n: 3, f: l => l.words },
  { id: "sent5", t: "Monte 5 frases corretas", n: 5, f: l => l.sent },
  { id: "min10", t: "Estude por 10 minutos", n: 600, f: l => l.sec, fmt: v => `${Math.floor(v / 60)}/10 min` },
  { id: "rev5", t: "Revise 5 palavras", n: 5, f: l => l.rev },
  { id: "xp100", t: "Ganhe 100 XP", n: 100, f: l => l.xp },
  { id: "conv5", t: "Envie 5 mensagens ao professor", n: 5, f: l => l.conv }
];
function todaysChallenges() {
  const k = todayKey(); let h = 0; for (const c of k) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const pool = CHAL_POOL.filter(c => c.id !== "conv5");
  const out = []; while (out.length < 3) { const c = pool[h % pool.length]; if (!out.includes(c)) out.push(c); h = (h * 1103515245 + 12345) >>> 0; }
  if (weekdayIdx() === 5) out[2] = CHAL_POOL.find(c => c.id === "conv5");
  return out;
}
function checkChallenges() {
  const l = L();
  for (const c of todaysChallenges()) {
    if (!l.chal.includes(c.id) && c.f(l) >= c.n) { l.chal.push(c.id); S.xp += 20; l.xp += 20; setTimeout(() => toast(`Desafio do dia concluído: ${c.t} (+20 XP)`), 400); }
  }
}
function weekGoals(w = week()) {
  if (!w) return [];
  const learnedIn = w.words.filter(id => S.words[id] && S.words[id].st === "learned").length;
  return [
    { t: "Aprender as 15 palavras", v: learnedIn, n: w.words.length },
    { t: "Responder 50 exercícios", v: w.stats.ok + w.stats.bad, n: 50 },
    { t: "Conversar (5 mensagens ou 5 diálogos)", v: Math.max(w.stats.conv, w.stats.dlg), n: 5 },
    { t: "Fazer o teste semanal", v: w.test ? 1 : 0, n: 1 }
  ];
}

/* ───────── Semanas ───────── */
function unusedPool(level) {
  const used = new Set(S.weeks.flatMap(w => w.words));
  const order = LEVEL_IDS.slice(LEVEL_IDS.indexOf(level));
  const all = allWords().filter(w => !used.has(w.id));
  return order.flatMap(lv => all.filter(w => w.level === lv));
}
function createWeek(level = S.profile.level) {
  const pool = unusedPool(level);
  if (pool.length < 15) return null;
  const words = pool.slice(0, 15).map(w => w.id);
  const w = { n: S.weeks.length + 1, level, start: mondayOf(todayKey()), words, stats: { sent: 0, ex: 0, conv: 0, dlg: 0, ok: 0, bad: 0, xp: 0 }, test: null };
  S.weeks.push(w); S.cur = S.weeks.length - 1; Store.save();
  return w;
}
function dayDone(w, i) {
  if (!w) return false;
  if (i < 3) return w.words.slice(i * 5, i * 5 + 5).every(id => S.words[id] && S.words[id].st === "learned");
  if (i === 3) return w.stats.sent >= 5;
  if (i === 4) return w.stats.ex >= 1;
  if (i === 5) return w.stats.conv >= 5 || w.stats.dlg >= 5;
  return !!w.test;
}
function weekProgress(w = week()) { if (!w) return 0; let d = 0; for (let i = 0; i < 7; i++) if (dayDone(w, i)) d++; return d; }
async function generateWeekAI(level) {
  const exclude = allWords().map(w => w.en).join(", ");
  const prompt = `Create 15 NEW English vocabulary items for a Brazilian learner at CEFR level ${level}. Prioritize high-frequency everyday and professional English: verbs, collocations, phrasal verbs and useful expressions. Do NOT use any of these: ${exclude}.
Return ONLY a JSON array of 15 objects with these keys:
"en" (the word or expression), "pt" (tradução em português), "pron" (pronúncia aproximada para brasileiros, sílaba tônica em MAIÚSCULAS, ex: "NÍID"), "cls" (classe gramatical em português), "meaning" (explicação simples em português, 1 a 2 frases), "icon" (um emoji), "topic" (one of: daily, work, food, travel, shopping, family, feelings, info), "ex" (array with 3 pairs: ["English sentence", "tradução"]), "when" (situações de uso, em português), "rel" (array of 3 related words or expressions, each with a short Portuguese gloss in parentheses).`;
  const arr = await AI.json(prompt, "complex");
  const list = Array.isArray(arr) ? arr : (arr && Array.isArray(arr.words) ? arr.words : []);
  const out = [];
  for (const o of list) {
    if (!o || typeof o.en !== "string" || typeof o.pt !== "string" || !Array.isArray(o.ex)) continue;
    const ex = o.ex.filter(p => Array.isArray(p) && p.length >= 2 && typeof p[0] === "string").slice(0, 4).map(p => [String(p[0]), String(p[1])]);
    if (ex.length < 2) continue;
    let id = "ai-" + o.en.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
    if (BANK[id.slice(3)] || S.custom[id] || out.some(w => w.id === id)) continue;
    out.push({ id, en: o.en.trim(), pt: o.pt.trim(), pron: String(o.pron || "").slice(0, 40), cls: String(o.cls || ""), meaning: String(o.meaning || ""), icon: String(o.icon || "💬").slice(0, 4),
      topic: D.TOPICS[o.topic] ? o.topic : "daily", ex, when: String(o.when || ""), rel: Array.isArray(o.rel) ? o.rel.slice(0, 4).map(String) : [], level, ai: true });
  }
  if (out.length < 10) throw { code: "bad_output" };
  out.forEach(w => { S.custom[w.id] = w; });
  return out.length;
}

/* ───────── Comparação de respostas ───────── */
const CONTR = { "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is", "we're": "we are", "they're": "they are", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not", "i'll": "i will", "i've": "i have", "i'd": "i would", "isn't": "is not", "aren't": "are not", "let's": "let us", "that's": "that is", "what's": "what is", "there's": "there is", "couldn't": "could not", "shouldn't": "should not", "you'll": "you will", "we'll": "we will", "she'll": "she will", "he'll": "he will", "we've": "we have", "you've": "you have", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not", "where's": "where is" };
function norm(s) {
  s = String(s || "").toLowerCase().replace(/[’`´]/g, "'");
  s = s.replace(/[a-z]+'[a-z]+/g, m => CONTR[m] || m).replace(/can not/g, "cannot");
  return s.replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
}
function similarity(a, b) {
  const x = norm(a).split(" "), y = norm(b).split(" ");
  const dp = Array.from({ length: x.length + 1 }, (_, i) => [i, ...Array(y.length).fill(0)]);
  for (let j = 1; j <= y.length; j++) dp[0][j] = j;
  for (let i = 1; i <= x.length; i++) for (let j = 1; j <= y.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
  return 1 - dp[x.length][y.length] / Math.max(x.length, y.length, 1);
}

/* ───────── Feedback visual ───────── */
function toast(msg) {
  const box = $("#toast"); const d = document.createElement("div"); d.textContent = msg; box.appendChild(d);
  setTimeout(() => d.remove(), 2600);
}
function burst(text, color) {
  const b = $("#burst");
  text = text || CHEERS[Math.random() * CHEERS.length | 0];
  b.innerHTML = burstSVG(text, color || ["#FFD43B", "#EF476F", "#2196F3"][Math.random() * 3 | 0]);
  b.classList.remove("go"); void b.offsetWidth; b.classList.add("go");
}
const tipEl = () => $("#tip");
document.addEventListener("mousemove", e => {
  const t = e.target.closest && e.target.closest("[data-tip]"); const tip = tipEl(); if (!tip) return;
  if (t) { tip.textContent = t.getAttribute("data-tip"); tip.style.display = "block"; tip.style.left = Math.min(e.clientX + 12, innerWidth - tip.offsetWidth - 8) + "px"; tip.style.top = (e.clientY - 34) + "px"; }
  else tip.style.display = "none";
});

/* ───────── Tempo de estudo ───────── */
let lastAct = Date.now();
["click", "keydown", "pointerdown", "scroll"].forEach(ev => document.addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true, capture: true }));
setInterval(() => {
  if (!S.profile.onboarded || document.hidden || Date.now() - lastAct > 90000) return;
  L().sec += 15;
  if (L().sec % 60 === 0) { checkChallenges(); Store.save(); }
}, 15000);
