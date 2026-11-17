"use strict";
/* English Comics — geradores de questões e sessão de exercícios (overlay). */
const TYPE_LABEL = {
  meaning: "Múltipla escolha", english: "Múltipla escolha", complete: "Complete a frase", ptEn: "Tradução português → inglês",
  enPt: "Tradução inglês → português", order: "Organize as palavras", match: "Relacione as palavras", error: "Identifique o erro",
  listen: "Escute e responda", dialog: "Complete o diálogo", create: "Crie sua frase", test: "Teste semanal"
};
const MODES = [
  { id: "meaning", t: "Múltipla escolha", d: "Escolha o significado certo.", ic: "🅰️" },
  { id: "complete", t: "Complete a frase", d: "Preencha a lacuna com a palavra certa.", ic: "✏️" },
  { id: "ptEn", t: "Português → inglês", d: "Escreva a frase em inglês.", ic: "🇧🇷" },
  { id: "enPt", t: "Inglês → português", d: "Escolha a tradução correta.", ic: "🇺🇸" },
  { id: "order", t: "Organize as palavras", d: "Monte a frase na ordem certa.", ic: "🧱" },
  { id: "match", t: "Relacione palavras", d: "Ligue cada palavra ao significado.", ic: "🔗" },
  { id: "error", t: "Identifique o erro", d: "Encontre a palavra errada na frase.", ic: "🕵️" },
  { id: "listen", t: "Escute e responda", d: "Ouça e escolha o que foi dito.", ic: "🎧" },
  { id: "dialog", t: "Complete diálogos", d: "Escolha a fala mais natural.", ic: "💬" },
  { id: "create", t: "Crie frases próprias", d: "Escreva e receba correção da IA.", ic: "🖊️" }
];
const wordRe = en => new RegExp(`\\b${en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}\\b`, "i");

function qMeaning(w, pool) {
  const others = pick(pool.filter(x => x.id !== w.id && x.pt !== w.pt), 3);
  const opts = shuffle([w, ...others]);
  return { type: "meaning", wid: w.id, kind: "mc", speak: w.en, ask: `O que significa <span class="q-big">${esc(w.en)}</span>?`,
    opts: opts.map(o => o.pt), ans: opts.indexOf(w), why: `<b>${esc(w.en)}</b> = ${esc(w.pt)}. ${esc(w.meaning)}`, plain: `O que significa ${w.en}?`, right: w.pt };
}
function qEnglish(w, pool) {
  const others = pick(pool.filter(x => x.id !== w.id && x.en !== w.en), 3);
  const opts = shuffle([w, ...others]);
  return { type: "english", wid: w.id, kind: "mc", ask: `Como se diz <b>"${esc(w.pt)}"</b> em inglês?`, opts: opts.map(o => o.en), ans: opts.indexOf(w),
    why: `<b>${esc(w.pt)}</b> = ${esc(w.en)} (pronúncia: ${esc(w.pron)}). Exemplo: <i>${esc(w.ex[0][0])}</i>`, plain: `Como se diz "${w.pt}" em inglês?`, right: w.en };
}
function qComplete(w, pool) {
  const re = wordRe(w.en);
  const ex = shuffle(w.ex).find(e => re.test(e[0]));
  if (!ex) return qMeaning(w, pool);
  const m = ex[0].match(re)[0];
  const others = pick(pool.filter(x => x.id !== w.id), 3).map(x => /^[A-Z]/.test(m) ? x.en[0].toUpperCase() + x.en.slice(1) : x.en);
  const opts = shuffle([m, ...others]);
  return { type: "complete", wid: w.id, kind: "mc", ask: `Complete a frase:<br><span style="font-size:1.4rem">${esc(ex[0].replace(re, "_____"))}</span><div class="muted small" style="margin-top:6px">${esc(ex[1])}</div>`,
    opts, ans: opts.indexOf(m), speakAfter: ex[0], why: `A frase completa é <b>${esc(ex[0])}</b> (${esc(ex[1])}). <b>${esc(w.en)}</b> = ${esc(w.pt)}.`, plain: ex[0].replace(re, "___"), right: ex[0] };
}
function qPtEn(w) {
  const ex = w.ex[Math.random() * w.ex.length | 0];
  return { type: "ptEn", wid: w.id, kind: "type", ask: `Escreva em inglês:<br><span style="font-size:1.35rem">"${esc(ex[1])}"</span><div class="muted small" style="margin-top:6px">Dica: use <b>${esc(w.en)}</b> (${esc(w.pt)}).</div>`,
    ans: ex[0], why: `Resposta: <b>${esc(ex[0])}</b>. ${esc(w.meaning)}`, plain: `Traduza: ${ex[1]}`, right: ex[0] };
}
function qEnPt(w, pool) {
  const ex = w.ex[Math.random() * w.ex.length | 0];
  const wrong = pick(pool.filter(x => x.id !== w.id).flatMap(x => x.ex.map(e => e[1])), 2);
  const opts = shuffle([ex[1], ...wrong]);
  return { type: "enPt", wid: w.id, kind: "mc", speak: ex[0], ask: `Qual é a tradução de:<br><span style="font-size:1.4rem">"${esc(ex[0])}"</span>`,
    opts, ans: opts.indexOf(ex[1]), why: `<b>${esc(ex[0])}</b> = ${esc(ex[1])}. Aqui, <b>${esc(w.en)}</b> significa ${esc(w.pt)}.`, plain: ex[0], right: ex[1] };
}
function tokenize(sentence) {
  const t = sentence.replace(/[.!?]+$/, "").split(/\s+/);
  if (t[0] !== "I" && !/^I'/.test(t[0])) t[0] = t[0][0].toLowerCase() + t[0].slice(1);
  return t;
}
function qOrder(w) {
  const ex = shuffle(w.ex).sort((a, b) => a[0].split(" ").length - b[0].split(" ").length)[0];
  return { type: "order", wid: w.id, kind: "order", ask: `Organize as palavras para formar a frase:<div class="muted small" style="margin-top:6px">"${esc(ex[1])}"</div>`,
    tokens: tokenize(ex[0]), ans: ex[0], why: `A ordem correta é <b>${esc(ex[0])}</b>. Em inglês: sujeito + verbo + complemento.`, plain: ex[1], right: ex[0] };
}
function qMatch(pool) {
  const ws4 = pick(pool, Math.min(4, pool.length));
  return { type: "match", kind: "match", ask: "Relacione cada palavra ao seu significado:", pairs: ws4.map(w => ({ id: w.id, en: w.en, pt: w.pt })), right: ws4.map(w => w.en + " = " + w.pt).join("; "),
    why: ws4.map(w => `<b>${esc(w.en)}</b> = ${esc(w.pt)}`).join(" · "), plain: "Relacione palavras" };
}
function qError() {
  const e = D.ERRORS[Math.random() * D.ERRORS.length | 0];
  const toks = e.s.replace(/[.?!]$/, "").split(" ");
  const badToks = e.bad.split(" ");
  let start = -1;
  for (let i = 0; i < toks.length; i++) if (toks.slice(i, i + badToks.length).join(" ").replace(/[.,?!]/g, "").toLowerCase() === e.bad.toLowerCase()) { start = i; break; }
  const correctIdx = start < 0 ? [] : badToks.map((_, k) => start + k);
  return { type: "error", kind: "error", ask: "Toque na palavra que está errada:", toks, bad: correctIdx, sentence: e.s,
    why: `Correto: <b>${esc(e.ok)}</b>. ${esc(e.why)}`, plain: e.s, right: e.ok };
}
function qListen(w, pool) {
  const ex = w.ex[Math.random() * w.ex.length | 0];
  const wrong = pick(pool.filter(x => x.id !== w.id).flatMap(x => x.ex.map(e => e[0])), 2);
  const opts = shuffle([ex[0], ...wrong]);
  return { type: "listen", wid: w.id, kind: "mc", audio: ex[0], ask: `Ouça a frase e escolha o que foi dito.`, opts, ans: opts.indexOf(ex[0]),
    why: `Você ouviu: <b>${esc(ex[0])}</b> (${esc(ex[1])}).`, plain: "Escute e responda", right: ex[0] };
}
function qDialog() {
  const d = D.DIALOGS[Math.random() * D.DIALOGS.length | 0];
  const order = shuffle(d.opts.map((o, i) => i));
  return { type: "dialog", kind: "mc", ask: `<span class="caption b">${esc(d.t)}</span><div class="stack" style="margin-top:12px">${d.lines.map(l => `<div class="row" style="align-items:flex-start"><b style="min-width:92px">${esc(l[0])}:</b><span>${esc(l[1])}</span></div>`).join("")}</div>`,
    opts: order.map(i => d.opts[i]), ans: order.indexOf(d.a), why: esc(d.why), plain: d.t + ": " + d.lines.map(l => l[1]).join(" / "), right: d.opts[d.a] };
}
function qCreate(w) {
  return { type: "create", wid: w.id, kind: "create", target: w, ask: `Crie uma frase sua usando <span class="q-big">${esc(w.en)}</span><div class="muted small">${esc(w.pt)} · ${esc(w.when)}</div>`, plain: `Frase com ${w.en}`, right: w.ex[0][0] };
}
const BUILDERS = { meaning: qMeaning, english: qEnglish, complete: qComplete, ptEn: qPtEn, enPt: qEnPt, order: qOrder, listen: qListen, create: qCreate };
function buildQuestions(mode, words, n = 10) {
  const pool = words.length >= 4 ? words : allWords();
  const qs = [];
  const mixTypes = ["meaning", "complete", "enPt", "order", "english", "ptEn", "match", "error", "dialog", "listen"].filter(t => t !== "listen" || Voice.can());
  for (let i = 0; i < n; i++) {
    const type = mode === "mix" ? mixTypes[i % mixTypes.length] : mode;
    const w = words.length ? words[i % words.length] : pool[Math.random() * pool.length | 0];
    if (type === "match") qs.push(qMatch(pool));
    else if (type === "error") qs.push(qError());
    else if (type === "dialog") qs.push(qDialog());
    else qs.push(BUILDERS[type](w, pool));
  }
  return mode === "mix" ? shuffle(qs) : qs;
}

/* ───────── Sessão ───────── */
let SS = null;
function startSession(opts) {
  SS = Object.assign({ i: 0, ok: 0, done: 0, xp: 0, state: null, results: [] }, opts);
  if (!SS.qs.length) { toast("Não há questões disponíveis."); return; }
  $("#overlay").classList.add("open"); document.body.style.overflow = "hidden";
  renderQ();
}
function closeSession(force) {
  if (!force && SS && SS.qs && SS.i < SS.qs.length && SS.done > 0) {
    $("#sheet").insertAdjacentHTML("beforeend", `<div class="fb info" id="confirm-close"><b>Sair da sessão?</b><p class="small">Seu progresso nas questões respondidas já foi salvo.</p><div class="row"><button class="btn sm r" data-act="session-close-force">Sair</button><button class="btn sm" data-act="dismiss-confirm">Continuar</button></div></div>`);
    return;
  }
  $("#overlay").classList.remove("open"); document.body.style.overflow = ""; SS = null; render();
}
function renderQ() {
  const q = SS.qs[SS.i]; SS.state = { sel: null, checked: false, placed: [], matched: {}, msel: null, mErrors: 0, picks: [] };
  const head = `<div class="sheet-h"><button class="btn icon-btn sm" data-act="session-close" aria-label="Fechar">${icon("x")}</button>
    <div class="bar y" aria-label="Progresso"><i style="width:${pct(SS.i, SS.qs.length)}%"></i></div><span class="chip num">${SS.i + 1}/${SS.qs.length}</span><span class="chip y num">${SS.xp} XP</span></div>`;
  let body = "";
  const audioBtn = txt => Voice.can() ? `<button class="btn sm" data-act="say" data-text="${esc(txt)}">${icon("speaker")} Ouvir</button> <button class="btn sm" data-act="say-slow" data-text="${esc(txt)}" aria-label="Ouvir devagar">${icon("turtle")}</button>` : "";
  if (q.kind === "mc") {
    body = `${q.audio ? (Voice.can() ? `<div class="row"><button class="btn b big" data-act="say" data-text="${esc(q.audio)}">${icon("speaker")} Ouvir frase</button><button class="btn" data-act="say-slow" data-text="${esc(q.audio)}">${icon("turtle")} Devagar</button></div>` : `<div class="pending"><b>Áudio indisponível</b><p class="small">Este navegador não oferece voz. Leia a frase: <i>${esc(q.audio)}</i></p></div>`) : ""}
      ${q.speak ? `<div class="row">${audioBtn(q.speak)}</div>` : ""}
      <div class="opts" role="radiogroup">${q.opts.map((o, i) => `<button class="opt" role="radio" aria-checked="false" data-act="pick" data-i="${i}">${esc(o)}</button>`).join("")}</div>`;
  } else if (q.kind === "type") {
    body = `<div class="field"><label for="ans">Sua resposta em inglês</label><input class="input" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Digite aqui…"></div>`;
  } else if (q.kind === "order") {
    SS.state.bank = shuffle(q.tokens.map((t, i) => i));
    body = orderUI(q.tokens, SS.state);
  } else if (q.kind === "match") {
    SS.state.right = shuffle(q.pairs.map((p, i) => i));
    body = matchUI(q);
  } else if (q.kind === "error") {
    body = `<div class="sent-tokens">${q.toks.map((t, i) => `<button class="tok" data-act="err-pick" data-i="${i}">${esc(t)}</button>`).join("")}</div>`;
  } else if (q.kind === "create") {
    body = AI.ok() ? `<div class="field"><label for="ans">Sua frase</label><textarea class="input" id="ans" placeholder="Escreva uma frase em inglês…"></textarea></div>
      <div class="small muted">Exemplos: ${q.target.ex.slice(0, 2).map(e => `<i>${esc(e[0])}</i>`).join(" · ")}</div>`
      : pendingAI(`<p class="small">Enquanto isso, compare sua frase com os exemplos: ${q.target.ex.map(e => `<i>${esc(e[0])}</i>`).join(" · ")}</p>`);
  }
  const canCheck = q.kind !== "create" || AI.ok();
  $("#sheet").innerHTML = `${head}<div class="panel stack" style="gap:16px"><span class="q-type">${esc(TYPE_LABEL[q.type] || "")}${q.wid && getWord(q.wid) ? " · " + esc(getWord(q.wid).en) : ""}</span>
    <div class="q-text">${q.ask}</div>${body}</div><div id="fb"></div>
    <div class="row between"><span class="small muted">${SS.title ? esc(SS.title) : ""}</span>
    ${canCheck ? `<button class="btn y big" id="check" data-act="check">VERIFICAR</button>` : `<button class="btn big" data-act="next">PULAR</button>`}</div>`;
  if (q.audio && Voice.can()) setTimeout(() => Voice.speak(q.audio), 300);
  const inp = $("#ans"); if (inp) { inp.focus(); inp.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && inp.tagName === "INPUT") { e.preventDefault(); const b = $("#check"); b && b.click(); } }); }
}
function orderUI(tokens, st) {
  return `<div class="zone ans ${st.placed.length ? "" : "empty"}" id="zone-ans" data-zone="ans" data-empty="Toque ou arraste as palavras para cá">${st.placed.map(i => `<span class="tok" draggable="true" data-act="tok" data-i="${i}" data-from="ans">${esc(tokens[i])}</span>`).join("")}</div>
  <div class="zone" id="zone-bank" data-zone="bank" data-empty="">${st.bank.map(i => `<span class="tok" draggable="true" data-act="tok" data-i="${i}" data-from="bank">${esc(tokens[i])}</span>`).join("")}</div>`;
}
function matchUI(q) {
  const st = SS.state;
  return `<div class="match"><div class="stack">${q.pairs.map((p, i) => `<button class="mitem ${st.matched[i] !== undefined ? "done" : st.msel === i ? "sel" : ""}" data-act="m-left" data-i="${i}" ${st.matched[i] !== undefined ? "disabled" : ""}>${esc(p.en)}</button>`).join("")}</div>
  <div class="stack">${st.right.map(j => `<button class="mitem ${Object.values(st.matched).includes(j) ? "done" : ""}" data-act="m-right" data-j="${j}" ${Object.values(st.matched).includes(j) ? "disabled" : ""}>${esc(q.pairs[j].pt)}</button>`).join("")}</div></div>`;
}
function feedback(ok, html, extra = "") {
  $("#fb").innerHTML = `<div class="fb ${ok ? "ok" : "bad"}"><span class="h">${ok ? CHEERS[Math.random() * CHEERS.length | 0] + " Correto!" : "Quase! Veja a explicação"}</span><div>${html}</div>${extra}</div>`;
  const b = $("#check"); if (b) { b.textContent = SS.i + 1 < SS.qs.length ? "PRÓXIMA" : "VER RESULTADO"; b.dataset.act = "next"; b.classList.remove("y"); b.classList.add("b"); b.focus(); }
  if (ok) burst();
}
function finishQ(ok, q, userAns) {
  SS.state.checked = true; SS.done++;
  if (ok) { SS.ok++; SS.xp += 10; } else SS.xp += 2;
  SS.results.push({ ok, q });
  record(ok, q.type === "english" ? "meaning" : q.type, q.wid, ok ? null : { q: q.plain, user: userAns, right: q.right, why: String(q.why || "").replace(/<[^>]+>/g, "") });
}
async function checkQ() {
  const q = SS.qs[SS.i], st = SS.state; if (st.checked) return;
  if (q.kind === "mc") {
    if (st.sel == null) { toast("Escolha uma alternativa."); return; }
    const ok = st.sel === q.ans;
    $$(".opt").forEach((b, i) => { b.disabled = true; if (i === q.ans) b.classList.add("ok"); else if (i === st.sel) b.classList.add("bad"); });
    finishQ(ok, q, q.opts[st.sel]);
    feedback(ok, q.why, Voice.can() && (q.speakAfter || q.audio) ? `<div><button class="btn sm" data-act="say" data-text="${esc(q.speakAfter || q.audio)}">${icon("speaker")} Ouvir a frase</button></div>` : "");
  } else if (q.kind === "type") {
    const v = $("#ans").value.trim(); if (!v) { toast("Escreva sua resposta."); return; }
    const sim = similarity(v, q.ans), ok = sim >= 0.85;
    $("#ans").classList.add(ok ? "ok" : "bad"); $("#ans").disabled = true;
    finishQ(ok, q, v);
    feedback(ok, (ok && sim < 1 ? `Quase perfeito. Compare com a forma exata: <b>${esc(q.ans)}</b>. ` : "") + (ok ? (sim === 1 ? `Perfeito: <b>${esc(q.ans)}</b>.` : "") : `Você escreveu: <i>${esc(v)}</i><br>${q.why}<br><span class="small">Lembre: em inglês o sujeito sempre aparece e a ordem é sujeito + verbo + complemento.</span>`));
  } else if (q.kind === "order") {
    if (!st.placed.length) { toast("Monte a frase primeiro."); return; }
    const built = st.placed.map(i => q.tokens[i]).join(" ");
    const ok = norm(built) === norm(q.ans);
    $("#zone-ans").classList.add(ok ? "ok" : "bad");
    finishQ(ok, q, built);
    feedback(ok, ok ? `<b>${esc(q.ans)}</b>` : `Você montou: <i>${esc(built)}</i><br>${q.why}`);
  } else if (q.kind === "match") {
    toast("Relacione todos os pares."); return;
  } else if (q.kind === "error") {
    toast("Toque na palavra errada."); return;
  } else if (q.kind === "create") {
    const v = $("#ans").value.trim(); if (v.split(/\s+/).length < 3) { toast("Escreva uma frase com pelo menos 3 palavras."); return; }
    const b = $("#check"); b.disabled = true; b.textContent = "CORRIGINDO…";
    try {
      const r = await aiCheckSentence(q.target.en, q.target.pt, v, q.target.when);
      const ok = !!r.correct;
      $("#ans").disabled = true; b.disabled = false;
      finishQ(ok, q, v);
      feedback(ok, `${r.natural && norm(r.natural) !== norm(v) ? `Forma natural: <b>${esc(r.natural)}</b><br>` : ""}${esc(r.explanation_pt || "")}`, r.score != null ? `<span class="small muted">Nota da IA: ${esc(r.score)}/100</span>` : "");
    } catch (e) { b.disabled = false; b.textContent = "VERIFICAR"; $("#fb").innerHTML = `<div class="fb info">${esc(aiErrorText(e))}</div>`; }
  }
}
async function aiCheckSentence(en, pt, sentence, ctx) {
  const prompt = `You are an English teacher for Brazilian students. A student at CEFR level ${S.profile.level} wrote a sentence that must use the target "${en}" (${pt}). Usage context: ${ctx || "everyday English"}.
Student sentence: """${sentence.slice(0, 400)}"""
Evaluate grammar, vocabulary, naturalness and whether the target is used correctly. Ignore missing final punctuation and capitalization.
Return ONLY a JSON object: {"correct": boolean, "uses_target": boolean, "natural": "corrected or more natural version in English with the same meaning", "explanation_pt": "1 a 2 frases simples em português do Brasil: elogie o que está certo e explique o erro, se houver", "score": integer 0-100}`;
  const r = await AI.json(prompt, "quick");
  if (typeof r !== "object" || r == null) throw { code: "bad_output" };
  return r;
}
function nextQ() {
  SS.i++;
  if (SS.i < SS.qs.length) { renderQ(); return; }
  const total = SS.qs.length, okN = SS.ok, p = pct(okN, total);
  S.sessions++;
  if (p === 100 && total >= 8) S.ach._perfect = Date.now();
  const res = SS.onEnd ? SS.onEnd(okN, total) : null;
  checkAch(); Store.save();
  const wrong = SS.results.filter(r => !r.ok);
  $("#sheet").innerHTML = `<div class="sheet-h"><span class="caption">${esc(SS.title || "Sessão concluída")}</span><span style="flex:1"></span><button class="btn icon-btn sm" data-act="session-close-force" aria-label="Fechar">${icon("x")}</button></div>
  <div class="panel y hero" style="grid-template-columns:auto 1fr">${teacherSVG(p >= 70 ? "wow" : "think")}<div class="stack">
    <h2>${p >= 90 ? "AWESOME!" : p >= 70 ? "GREAT JOB!" : p >= 50 ? "GOOD EFFORT!" : "KEEP GOING!"}</h2>
    <div class="row"><span class="chip num">${okN}/${total} acertos</span><span class="chip n num">${p}%</span><span class="chip r num">+${SS.xp} XP</span></div>
    ${res ? `<p style="font-weight:700">${res}</p>` : ""}
    <p class="small">${p >= 70 ? "Excelente! As palavras que você acertou vão voltar em intervalos maiores na revisão." : "Sem problema: as palavras que você errou entram na sua revisão de hoje."}</p></div></div>
  ${wrong.length ? `<div class="panel"><div class="panel-h"><h3>Para revisar</h3></div><div class="stack">${wrong.map(r => `<div class="ex" style="grid-template-columns:1fr"><span class="e">${esc(r.q.plain)}</span><span class="t">Correto: ${esc(r.q.right)}</span></div>`).join("")}</div></div>` : ""}
  <div class="row between">${wrong.length && !SS.noRetry ? `<button class="btn r" data-act="retry-wrong">Refazer as que errei</button>` : "<span></span>"}<button class="btn y big" data-act="session-close-force">CONTINUAR</button></div>`;
}
function retryWrong() {
  const qs = SS.results.filter(r => !r.ok).map(r => { const q = r.q; if (q.wid && getWord(q.wid) && BUILDERS[q.type]) return BUILDERS[q.type](getWord(q.wid), allWords()); return q; });
  startSession({ title: "Refazendo os erros", qs, noRetry: true });
}

/* ───────── Interações da sessão ───────── */
const SESSION_ACTS = {
  "session-close": () => closeSession(false),
  "session-close-force": () => closeSession(true),
  "dismiss-confirm": () => { const c = $("#confirm-close"); c && c.remove(); },
  pick: el => { if (SS.state.checked) return; SS.state.sel = +el.dataset.i; $$(".opt").forEach(b => { b.classList.toggle("sel", b === el); b.setAttribute("aria-checked", b === el); }); },
  check: () => checkQ(),
  next: () => nextQ(),
  "retry-wrong": () => retryWrong(),
  tok: el => {
    const st = SS && SS.qs ? SS.state : SB.state; if (!st || st.checked) return;
    const i = +el.dataset.i;
    if (el.dataset.from === "bank") { st.bank = st.bank.filter(x => x !== i); st.placed.push(i); }
    else { st.placed = st.placed.filter(x => x !== i); st.bank.push(i); }
    redrawOrder();
  },
  "m-left": el => { SS.state.msel = +el.dataset.i; redrawMatch(); },
  "m-right": el => {
    const st = SS.state, q = SS.qs[SS.i]; if (st.msel == null) { toast("Escolha primeiro uma palavra em inglês."); return; }
    const j = +el.dataset.j;
    if (j === st.msel) { st.matched[st.msel] = j; if (!st.picks.includes(j)) srs(q.pairs[j].id, true); st.msel = null; }
    else { st.mErrors++; st.picks.push(st.msel); if (getWord(q.pairs[st.msel].id)) srs(q.pairs[st.msel].id, false); el.classList.add("bad"); setTimeout(() => el.classList.remove("bad"), 500); st.msel = null; }
    redrawMatch();
    if (Object.keys(st.matched).length === q.pairs.length) {
      const ok = st.mErrors === 0;
      finishQ(ok, q, `${st.mErrors} erro(s)`);
      feedback(ok, ok ? q.why : `Você errou ${st.mErrors} ligação(ões). ${q.why}`);
    }
  },
  "err-pick": el => {
    const st = SS.state, q = SS.qs[SS.i]; if (st.checked) return;
    const i = +el.dataset.i, ok = q.bad.includes(i);
    $$(".sent-tokens .tok").forEach((b, k) => { b.style.cursor = "default"; if (q.bad.includes(k)) b.style.background = "#D6F5E8"; else if (k === i) b.style.background = "#FFE3EA"; });
    finishQ(ok, q, q.toks[i]);
    feedback(ok, q.why);
  }
};
function redrawOrder() {
  if (SS && SS.qs && SS.qs[SS.i] && SS.qs[SS.i].kind === "order") { const q = SS.qs[SS.i]; const host = $("#zone-ans").parentElement; $("#zone-ans").remove(); $("#zone-bank").remove(); host.insertAdjacentHTML("beforeend", orderUI(q.tokens, SS.state)); }
  else if (typeof sbRedraw === "function") sbRedraw();
}
function redrawMatch() { const q = SS.qs[SS.i]; const m = $(".match"); m.outerHTML = matchUI(q); }

/* arrastar e soltar (desktop); toque move a palavra no celular */
let dragTok = null;
document.addEventListener("dragstart", e => { const t = e.target.closest && e.target.closest(".tok[draggable]"); if (!t) return; dragTok = t; t.classList.add("drag"); try { e.dataTransfer.setData("text/plain", t.dataset.i); e.dataTransfer.effectAllowed = "move"; } catch (x) { } });
document.addEventListener("dragend", () => { if (dragTok) dragTok.classList.remove("drag"); dragTok = null; });
document.addEventListener("dragover", e => { if (dragTok && e.target.closest && e.target.closest(".zone")) e.preventDefault(); });
document.addEventListener("drop", e => {
  const zone = e.target.closest && e.target.closest(".zone"); if (!dragTok || !zone) return; e.preventDefault();
  const st = SS && SS.qs && SS.qs[SS.i] && SS.qs[SS.i].kind === "order" ? SS.state : SB.state; if (!st || st.checked) return;
  const i = +dragTok.dataset.i;
  st.placed = st.placed.filter(x => x !== i); st.bank = st.bank.filter(x => x !== i);
  const target = e.target.closest(".tok");
  const list = zone.dataset.zone === "ans" ? st.placed : st.bank;
  if (target && target !== dragTok) { const at = list.indexOf(+target.dataset.i); list.splice(at < 0 ? list.length : at, 0, i); } else list.push(i);
  redrawOrder();
});
