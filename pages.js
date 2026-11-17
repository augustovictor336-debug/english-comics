"use strict";
/* English Comics — páginas, navegação e inicialização. */
const ROUTES = [
  { id: "inicio", t: "Dashboard", ic: "home", r: pDash },
  { id: "vocabulario", t: "Vocabulário da semana", ic: "book", r: pVocab },
  { id: "em-acao", t: "Word in Action", ic: "bolt", r: pWia },
  { id: "frases", t: "Construção de frases", ic: "blocks", r: pFrases },
  { id: "exercicios", t: "Exercícios", ic: "target", r: pEx },
  { id: "conversacao", t: "Conversação com IA", ic: "chat", r: pConv },
  { id: "revisao", t: "Revisão inteligente", ic: "repeat", r: pRev },
  { id: "progresso", t: "Meu progresso", ic: "chart", r: pProg },
  { id: "conquistas", t: "Conquistas", ic: "trophy", r: pAch },
  { id: "perfil", t: "Meu perfil", ic: "user", r: pProfile }
];
const routeId = () => { const h = location.hash.slice(1); return ROUTES.some(r => r.id === h) ? h : "inicio"; };
function go(id) { if (location.hash.slice(1) === id) render(); else location.hash = id; }
window.addEventListener("hashchange", () => { $("#more").classList.remove("open"); render(); window.scrollTo(0, 0); });

function refreshChrome() {
  const cur = routeId();
  $("#nav").innerHTML = ROUTES.map(r => `<a href="#${r.id}" class="${r.id === cur ? "on" : ""}" ${r.id === cur ? 'aria-current="page"' : ""}>${icon(r.ic)}<span>${r.t}</span></a>`).join("");
  const main = ["inicio", "vocabulario", "exercicios", "conversacao"];
  $("#bnav").innerHTML = main.map(id => { const r = ROUTES.find(x => x.id === id); return `<a href="#${id}" class="${id === cur ? "on" : ""}">${icon(r.ic)}<span>${r.t.split(" ")[0]}</span></a>`; }).join("") +
    `<button data-act="more" class="${main.includes(cur) ? "" : "on"}" aria-label="Mais páginas">${icon("more")}<span>Mais</span></button>`;
  $("#more").innerHTML = ROUTES.filter(r => !main.includes(r.id)).map(r => `<a href="#${r.id}">${icon(r.ic)}${r.t}</a>`).join("");
  const nm = S.profile.name || "Perfil";
  $("#mob-xp").textContent = `${nm} · ${S.xp} XP`;
  $("#prof").innerHTML = `<span class="ini" aria-hidden="true">${esc(nm[0].toUpperCase())}</span><span style="flex:1;min-width:0"><b>${esc(nm)}</b><span>${Store.idx && Store.idx.list.length > 1 ? "Trocar de perfil" : "Perfis"}</span></span>`;
}
function render() {
  refreshChrome();
  if (!S.profile.onboarded) { $("#view").innerHTML = pOnboard(); return; }
  const r = ROUTES.find(x => x.id === routeId());
  $("#view").innerHTML = r.r();
  document.title = `${r.t} · English Comics`;
  if (r.id === "conversacao") scrollChat();
}

/* ───────── Onboarding + teste de nivelamento ───────── */
let OB = { step: 0, i: 0, score: {}, ans: [], name: "" };
function pOnboard() {
  if (OB.step === 0) return `<div class="panel y hero">${teacherSVG("happy")}<div class="stack" style="gap:14px">
    <span class="caption r">BEM-VINDO AO ENGLISH COMICS</span>
    <h1>Your English Adventure Starts Here!</h1>
    <p class="lead">Aprenda pelo menos 15 palavras por semana, descubra como usá-las, construa frases e converse em inglês com um professor de IA.</p>
    <div class="field" style="max-width:380px"><label for="ob-name">Como você quer ser chamado?</label><input class="input" id="ob-name" value="${esc(S.profile.name || OB.name || "")}" placeholder="Seu nome" autocomplete="given-name"></div>
    <div class="row"><button class="btn n big" data-act="ob-start">FAZER TESTE DE NIVELAMENTO</button><button class="btn" data-act="ob-skip">Sou iniciante, pular teste</button></div>
    <p class="small">O teste tem ${D.PLACEMENT.length} perguntas rápidas e define seu nível inicial. Você pode mudar o nível depois no seu perfil.</p></div></div>`;
  if (OB.step === 1) {
    const q = D.PLACEMENT[OB.i];
    return `<div class="panel stack" style="gap:16px;max-width:760px;margin:0 auto;width:100%"><div class="sheet-h"><span class="caption">TESTE DE NIVELAMENTO</span><div class="bar y"><i style="width:${pct(OB.i, D.PLACEMENT.length)}%"></i></div><span class="chip num">${OB.i + 1}/${D.PLACEMENT.length}</span></div>
      <div class="q-text">${esc(q.q)}</div><div class="opts">${q.o.map((o, i) => `<button class="opt" data-act="ob-ans" data-i="${i}">${esc(o)}</button>`).join("")}</div>
      <button class="btn ghost" data-act="ob-ans" data-i="-1">Não sei</button></div>`;
  }
  const lv = OB.level;
  return `<div class="panel b hero">${teacherSVG("wow")}<div class="stack" style="gap:14px"><span class="caption b">RESULTADO</span>
    <h1>Seu nível: ${esc(lv)} · ${esc(levelName(lv))}</h1>
    <p class="lead">Você acertou ${OB.ans.filter(Boolean).length} de ${D.PLACEMENT.length}. Vamos montar sua primeira semana com 15 palavras de uso frequente para esse nível.</p>
    <div class="field" style="max-width:380px"><label for="ob-level">Quer ajustar o nível?</label><select class="input" id="ob-level">${D.LEVELS.map(l => `<option value="${l.id}" ${l.id === lv ? "selected" : ""}>${l.id} · ${l.name}</option>`).join("")}</select></div>
    <div class="row"><button class="btn y big" data-act="ob-finish">CRIAR MINHA PRIMEIRA SEMANA</button></div></div></div>`;
}
function placementLevel(ans) {
  const by = {}; D.PLACEMENT.forEach((q, i) => { by[q.lv] = by[q.lv] || { ok: 0, n: 0 }; by[q.lv].n++; if (ans[i]) by[q.lv].ok++; });
  let lv = "A1";
  for (const id of LEVEL_IDS) { if (by[id] && by[id].ok / by[id].n >= 0.6) lv = id; else if (id !== "A1") break; }
  const next = LEVEL_IDS[Math.min(LEVEL_IDS.indexOf(lv) + 1, 4)];
  return by[lv] && by[lv].ok === by[lv].n && lv !== "C1" && by[next] && by[next].ok >= 1 ? next : lv;
}

/* ───────── Dashboard ───────── */
function nextActivity() {
  const w = week(); if (!w) return { t: "Criar semana", act: "go", arg: "vocabulario" };
  const today = weekdayIdx();
  const order = [...Array(7).keys()].filter(i => i <= today).concat([...Array(7).keys()].filter(i => i > today));
  const i = order.find(d => !dayDone(w, d));
  if (i === undefined) return reviewIds().length ? { t: "Revisar palavras", act: "go", arg: "revisao" } : { t: "Começar a próxima semana", act: "go", arg: "vocabulario" };
  return { day: i, t: `${DAYS[i].d}: ${DAYS[i].t}` };
}
function runDay(i) {
  const w = week(); if (!w) return;
  if (i < 3) { VS.tab = "week"; VS.wk = S.cur; VS.day = i; VS.open = w.words.slice(i * 5, i * 5 + 5).find(id => !S.words[id] || S.words[id].st !== "learned") || w.words[i * 5]; go("vocabulario"); }
  else if (i === 3) go("frases");
  else if (i === 4) startWeekExercises();
  else if (i === 5) { if (AI.ok()) go("conversacao"); else startSession({ title: "Diálogos da semana", qs: Array.from({ length: 6 }, qDialog), onEnd: ok => { w.stats.dlg += ok; return null; } }); }
  else startWeekTest();
}
function startWeekExercises() {
  const w = week(); const words = w.words.map(getWord).filter(Boolean);
  startSession({ title: `Exercícios da semana ${w.n}`, qs: buildQuestions("mix", words, 10), onEnd: () => { w.stats.ex++; Store.save(); return "Sexta-feira concluída: exercícios e traduções."; } });
}
function startWeekTest() {
  const w = week(); const words = w.words.map(getWord).filter(Boolean); const pool = allWords();
  const types = ["meaning", "complete", "enPt", "english", "ptEn"].concat(Voice.can() ? ["listen"] : []);
  const qs = shuffle(words).map((wd, i) => BUILDERS[types[i % types.length]](wd, pool));
  startSession({ title: `Teste semanal · Semana ${w.n}`, qs, noRetry: false, onEnd: (ok, n) => {
    const first = !w.test; w.test = { score: ok, total: n, date: Date.now() };
    if (ok / n >= .7) { if (first) gain(50); burst("CHAMPION!", "#FFD43B"); return `Aprovado com ${pct(ok, n)}%! A próxima semana já pode ser liberada.`; }
    return `Você fez ${pct(ok, n)}%. Revise as palavras marcadas e refaça o teste quando quiser (70% para aprovar).`;
  } });
}
function pDash() {
  const w = week(), today = weekdayIdx(), l = L(), nx = nextActivity();
  const learned = learnedIds().length, rev = reviewIds();
  const totalWords = allWords().length;
  const last7 = [...Array(7).keys()].map(i => { const k = addDays(todayKey(), i - 6); return { l: ["D", "S", "T", "Q", "Q", "S", "S"][keyToDate(k).getDay()], v: (S.log[k] || {}).xp || 0, tip: `${keyToDate(k).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}: ${(S.log[k] || {}).xp || 0} XP` }; });
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return `
  <div class="topbar"><div class="stack" style="gap:2px"><span class="small muted" style="font-weight:800">${new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</span><h1>${greet}, ${esc(S.profile.name || "student")}!</h1></div>
  <div class="chips"><span class="chip n">${esc(S.profile.level)} · ${esc(levelName(S.profile.level))}</span><span class="chip y num">🔥 ${streakNow()} dia${streakNow() === 1 ? "" : "s"}</span><span class="chip num">${S.xp} XP</span></div></div>

  <div class="panel y hero">${teacherSVG("happy")}<div class="stack" style="gap:12px">
    <div class="bubble left"><b>Teacher Ace:</b> ${esc(w ? (dayDone(w, today) ? "Great work today! Want to review some words?" : `Today is ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][today]}. Let's do it!`) : "Welcome!")}</div>
    <h2 style="font-size:clamp(1.8rem,3.6vw,2.5rem)">Your English Adventure Starts Here!</h2>
    <p class="lead">Aprenda uma palavra, descubra como utilizá-la, construa frases e comece a conversar em inglês.</p>
    <div class="row"><button class="btn n big" data-act="continue">CONTINUAR APRENDENDO</button><span class="small" style="font-weight:800">Próximo passo: ${esc(nx.t)}</span></div>
  </div></div>

  <div class="grid g4">
    <div class="tile"><span class="k">Nível de inglês</span><span class="v">${esc(S.profile.level)}</span><span class="s">${esc(levelName(S.profile.level))}</span></div>
    <div class="tile y"><span class="k">Palavras aprendidas</span><span class="v num">${learned}</span><span class="s">de ${totalWords} no banco</span></div>
    <div class="tile r"><span class="k">Dias seguidos</span><span class="v num">${streakNow()}</span><span class="s">Recorde: ${S.streak.best}</span></div>
    <div class="tile b"><span class="k">Pontuação</span><span class="v num">${S.xp}</span><span class="s">Nível de jogador ${playerLevel()} · ${STAGES[stageIdx()].name}</span></div>
  </div>

  <div class="grid g3">
    <div class="panel span2"><div class="panel-h"><div class="row"><span class="caption">SEMANA ${w ? w.n : "-"}</span><span class="small muted" style="font-weight:800">${w ? `${weekProgress(w)}/7 dias concluídos · ${esc(w.level)}` : ""}</span></div><button class="btn sm" data-act="go" data-arg="vocabulario">Ver palavras</button></div>
      ${w ? `<div class="plan">${DAYS.map((d, i) => `<button class="day ${i === today ? "today" : ""} ${dayDone(w, i) ? "done" : ""}" data-act="day" data-i="${i}"><span class="dn">${d.d}</span><span class="dt">${d.t}</span>${i < 3 ? `<span class="small muted">${w.words.slice(i * 5, i * 5 + 5).filter(id => S.words[id] && S.words[id].st === "learned").length}/5</span>` : ""}</button>`).join("")}</div>` : `<div class="empty">Nenhuma semana criada.</div>`}
    </div>
    <div class="panel"><div class="panel-h"><span class="caption r">META DIÁRIA</span><span class="small muted num" style="font-weight:800">${l.xp}/${S.profile.goal} XP</span></div>
      <div class="row" style="gap:16px">${ring(l.xp, S.profile.goal, "#EF476F", "Meta diária")}<div class="stack small" style="gap:4px"><b>${l.xp >= S.profile.goal ? "Meta batida! 🎉" : `Faltam ${S.profile.goal - l.xp} XP`}</b><span class="muted">Hoje: ${l.ok} acertos · ${fmtMin(l.sec)}</span><button class="btn sm ghost" data-act="go" data-arg="perfil">Ajustar meta</button></div></div>
    </div>
  </div>

  <div class="grid g3">
    <div class="panel"><div class="panel-h"><span class="caption b">PRÓXIMAS ATIVIDADES</span></div>
      ${w ? `<div class="stack">${DAYS.map((d, i) => ({ d, i })).filter(x => !dayDone(w, x.i)).slice(0, 4).map(x => `<button class="ex" style="grid-template-columns:auto 1fr auto;cursor:pointer;text-align:left" data-act="day" data-i="${x.i}"><span class="chip ${x.i === today ? "y" : ""}">${x.d.d}</span><span class="e">${x.d.t}</span><span aria-hidden="true">→</span></button>`).join("") || `<div class="empty">Semana completa! 🎉</div>`}</div>` : ""}
    </div>
    <div class="panel"><div class="panel-h"><span class="caption r">PRECISAM DE REVISÃO</span><span class="chip r num">${rev.length}</span></div>
      ${rev.length ? `<div class="chips">${rev.slice(0, 10).map(id => `<button class="chip" data-act="open-word" data-id="${esc(id)}">${esc(getWord(id).en)}</button>`).join("")}</div><div style="margin-top:12px"><button class="btn r sm" data-act="go" data-arg="revisao">Revisar agora</button></div>` : `<div class="empty">Nenhuma palavra pendente. As palavras aprendidas voltam aqui na hora certa.</div>`}
    </div>
    <div class="panel"><div class="panel-h"><span class="caption">ÚLTIMOS 7 DIAS</span><span class="small muted">XP por dia</span></div>${barChart(last7, { h: 170, color: "#FFD43B", unit: " XP" })}</div>
  </div>

  <div class="grid g2">
    <div class="panel"><div class="panel-h"><span class="caption">DESAFIOS DE HOJE</span><span class="small muted">+20 XP cada</span></div>${challengesHTML()}</div>
    <div class="panel"><div class="panel-h"><span class="caption b">METAS DA SEMANA</span></div>${goalsHTML()}</div>
  </div>`;
}
function challengesHTML() {
  const l = L();
  return `<div class="stack">${todaysChallenges().map(c => { const v = c.f(l), done = l.chal.includes(c.id); return `<div class="stack" style="gap:4px"><div class="row between small"><b>${done ? "✅ " : ""}${esc(c.t)}</b><span class="num muted" style="font-weight:800">${c.fmt ? c.fmt(Math.min(v, c.n)) : `${Math.min(v, c.n)}/${c.n}`}</span></div><div class="bar ${done ? "g" : "y"}"><i style="width:${pct(Math.min(v, c.n), c.n)}%"></i></div></div>`; }).join("")}</div>`;
}
function goalsHTML() {
  const g = weekGoals(); if (!g.length) return `<div class="empty">Sem semana ativa.</div>`;
  return hbar(g.map(x => ({ l: x.t, v: pct(Math.min(x.v, x.n), x.n), txt: `${Math.min(x.v, x.n)}/${x.n}`, c: x.v >= x.n ? "#1F9D6B" : "#2196F3" })));
}

/* ───────── Vocabulário ───────── */
let VS = { tab: "week", wk: null, day: null, open: null, q: "", lv: "all", tp: "all" };
function statusPill(id) {
  const w = S.words[id];
  if (!w || w.st === "new") return `<span class="pill nw">Nova</span>`;
  if (needsReview(id)) return `<span class="pill rv">Revisar</span>`;
  return w.st === "learned" ? `<span class="pill ok">Aprendida</span>` : `<span class="pill lr">Estudando</span>`;
}
function wordCard(w) {
  return `<button class="wcard" data-act="open-word" data-id="${esc(w.id)}" aria-label="${esc(w.en)}: ${esc(w.pt)}"><div class="wart" style="--c:${TOPIC_COLOR[w.topic] || "#E3F1FD"}"><span class="tag pill">${esc(w.level)}</span><span class="st">${statusPill(w.id)}</span><span aria-hidden="true">${esc(w.icon)}</span></div>
  <div class="wbody"><span class="en">${esc(w.en)}</span><span class="pt">${esc(w.pt)}</span><span class="small muted">${esc(w.pron)} · ${esc(w.cls)}</span></div></button>`;
}
function wordDetail(w) {
  const st = S.words[w.id], fav = S.fav.includes(w.id);
  const say = (t, lbl = "Ouvir") => Voice.can() ? `<button class="btn sm icon-btn" data-act="say" data-text="${esc(t)}" aria-label="${lbl}: ${esc(t)}">${icon("speaker")}</button>` : "";
  return `<div class="panel" id="word-detail"><div class="wd">
    <div class="stack"><div class="wart" style="--c:${TOPIC_COLOR[w.topic] || "#E3F1FD"}"><span class="tag pill">${esc(D.TOPICS[w.topic] || "")}</span><span aria-hidden="true">${esc(w.icon)}</span></div>
      <div class="row">${statusPill(w.id)}${st ? `<span class="small muted num">${st.ok} acertos · ${st.bad} erros</span>` : ""}</div></div>
    <div class="stack" style="gap:14px">
      <div class="row between" style="align-items:flex-start"><div class="stack" style="gap:4px"><span class="wd-word">${esc(w.en.toUpperCase())}</span><span style="font-size:1.3rem;font-weight:900">${esc(w.pt)}</span></div>
        <button class="btn sm ${fav ? "y" : ""}" data-act="fav" data-id="${esc(w.id)}" aria-pressed="${fav}">${icon("star", "ico")} ${fav ? "Favorita" : "Favoritar"}</button></div>
      <div class="row"><span class="chip y">Pronúncia: ${esc(w.pron)}</span><span class="chip">${esc(w.cls)}</span><span class="chip n">${esc(w.level)}</span>
        ${Voice.can() ? `<button class="btn sm b" data-act="say" data-text="${esc(w.en)}">${icon("speaker")} Ouvir</button><button class="btn sm" data-act="say-slow" data-text="${esc(w.en)}">${icon("turtle")} Devagar</button>` : `<span class="small muted">Áudio indisponível neste navegador.</span>`}</div>
      <p><b>Significado:</b> ${esc(w.meaning)}</p>
      <div class="stack"><b>Exemplos de frases</b>${w.ex.map(e => `<div class="ex">${say(e[0]) || "<span></span>"}<div><div class="e">${esc(e[0])}</div><div class="t">${esc(e[1])}</div></div></div>`).join("")}</div>
      <p><b>Quando usar:</b> ${esc(w.when)}</p>
      <div class="stack" style="gap:6px"><b>Expressões relacionadas</b><div class="chips">${w.rel.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div></div>
      <div class="row"><button class="btn r big" data-act="practice-word" data-id="${esc(w.id)}">PRATICAR ESTA PALAVRA</button>
      ${!st || st.st !== "learned" ? `<button class="btn" data-act="learn" data-id="${esc(w.id)}">✔ Marcar como aprendida</button>` : ""}
      <button class="btn ghost" data-act="close-word">Fechar</button></div>
    </div></div></div>`;
}
function pVocab() {
  if (VS.wk == null || !S.weeks[VS.wk]) VS.wk = S.cur;
  if (VS.tab === "week" && !S.weeks[VS.wk]) VS.tab = "bank";
  const tabs = `<div class="tabs" role="tablist">${S.weeks.map((w, i) => `<button class="tab ${VS.tab === "week" && VS.wk === i ? "on" : ""}" data-act="vtab" data-tab="week" data-wk="${i}">Semana ${w.n}</button>`).join("")}<button class="tab ${VS.tab === "bank" ? "on" : ""}" data-act="vtab" data-tab="bank">Banco de palavras</button><button class="tab ${VS.tab === "fav" ? "on" : ""}" data-act="vtab" data-tab="fav">★ Favoritas (${S.fav.length})</button></div>`;
  const open = VS.open && getWord(VS.open) ? wordDetail(getWord(VS.open)) : "";
  let content = "";
  if (VS.tab === "week") {
    const w = S.weeks[VS.wk];
    const isCur = VS.wk === S.cur;
    const canNext = isCur && (w.test || w.words.every(id => S.words[id] && S.words[id].st === "learned"));
    content = `<div class="panel"><div class="panel-h"><div class="stack" style="gap:2px"><h2>Semana ${w.n} · ${esc(w.level)}</h2><span class="small muted" style="font-weight:700">${w.words.filter(id => S.words[id] && S.words[id].st === "learned").length}/15 aprendidas · iniciada em ${keyToDate(w.start).toLocaleDateString("pt-BR")}</span></div>
      ${isCur ? `<div class="row"><button class="btn sm" data-act="day" data-i="6">Teste semanal</button><button class="btn sm ${canNext ? "y" : ""}" data-act="next-week">Próxima semana →</button></div>` : `<span class="chip">Semana anterior</span>`}</div>
      <div id="nextweek-box"></div>
      ${[0, 1, 2].map(d => `<div class="stack" style="margin-top:${d ? 18 : 0}px"><div class="row"><span class="caption ${d === weekdayIdx() && isCur ? "" : "b"}">${DAYS[d].d}</span><b class="small">Palavras ${d * 5 + 1} a ${d * 5 + 5}</b></div>
      <div class="grid g-auto">${w.words.slice(d * 5, d * 5 + 5).map(getWord).filter(Boolean).map(wordCard).join("")}</div></div>`).join("")}</div>`;
  } else {
    const q = VS.q.toLowerCase();
    let list = allWords();
    if (VS.tab === "fav") list = list.filter(w => S.fav.includes(w.id));
    if (VS.lv !== "all") list = list.filter(w => w.level === VS.lv);
    if (VS.tp !== "all") list = list.filter(w => w.topic === VS.tp);
    if (q) list = list.filter(w => w.en.toLowerCase().includes(q) || w.pt.toLowerCase().includes(q));
    content = `<div class="panel"><div class="row" style="margin-bottom:16px">
      <div class="field" style="flex:1;min-width:200px"><label for="v-q">Buscar</label><input class="input" id="v-q" value="${esc(VS.q)}" placeholder="Palavra em inglês ou português"></div>
      <div class="field"><label for="v-lv">Nível</label><select class="input" id="v-lv"><option value="all">Todos</option>${D.LEVELS.map(l => `<option value="${l.id}" ${VS.lv === l.id ? "selected" : ""}>${l.id} · ${l.name}</option>`).join("")}</select></div>
      <div class="field"><label for="v-tp">Assunto</label><select class="input" id="v-tp"><option value="all">Todos</option>${Object.entries(D.TOPICS).map(([k, v]) => `<option value="${k}" ${VS.tp === k ? "selected" : ""}>${v}</option>`).join("")}</select></div></div>
      <p class="small muted" style="margin-bottom:12px;font-weight:700">${list.length} palavra(s)</p>
      <div class="grid g-auto" id="v-grid">${list.map(wordCard).join("") || `<div class="empty">Nada encontrado.</div>`}</div></div>`;
  }
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">15 PALAVRAS POR SEMANA</span><h1>Vocabulário da semana</h1></div><div class="chips"><span class="chip y num">${learnedIds().length} aprendidas</span></div></div>${tabs}${open}${content}`;
}
async function nextWeek(useAI, force) {
  const box = $("#nextweek-box");
  const cw = week();
  if (!force && !useAI && cw && !cw.test && !cw.words.every(id => S.words[id] && S.words[id].st === "learned")) {
    box.innerHTML = `<div class="fb info"><b>Você ainda não terminou a semana ${cw.n}.</b><p class="small">Faltam palavras para aprender ou o teste semanal. As palavras desta semana continuam na revisão mesmo assim.</p><div class="row"><button class="btn y sm" data-act="next-week-force">Começar a próxima semana mesmo assim</button><button class="btn sm" data-act="day" data-i="6">Fazer o teste semanal</button></div></div>`;
    return;
  }
  let w = createWeek();
  if (!w && useAI) {
    if (!AI.ok()) { box.innerHTML = pendingAI(); return; }
    box.innerHTML = `<div class="fb info"><b>Teacher Ace está criando 15 palavras novas para você…</b><span class="typing"><i></i><i></i><i></i></span></div>`;
    try { await generateWeekAI(S.profile.level); w = createWeek(); }
    catch (e) { box.innerHTML = `<div class="fb bad">${esc(aiErrorText(e))}</div>`; return; }
  }
  if (!w) {
    box.innerHTML = `<div class="fb info"><b>Você usou todas as palavras do banco a partir do nível ${esc(S.profile.level)}.</b><p class="small">Gere uma nova semana com o professor de IA (palavras inéditas, nunca repetidas).</p><div><button class="btn y" data-act="next-week-ai">Gerar semana com IA</button></div></div>`;
    return;
  }
  VS.wk = S.cur; VS.open = null; burst("NEW WEEK!", "#2196F3"); toast(`Semana ${w.n} criada com 15 palavras novas!`); render();
}

/* ───────── Word in Action ───────── */
let WI = { i: 0, checked: false };
function pWia() {
  const set = D.WIA[WI.i], colors = ["#E3F1FD", "#FFF1B8", "#FFE3EA", "#E2F7EC"];
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">UMA PALAVRA, VÁRIOS SENTIDOS</span><h1>Word in Action</h1></div><span class="small muted" style="font-weight:700;max-width:46ch">A mesma palavra muda de sentido conforme a situação. Veja, ouça e depois use.</span></div>
  <div class="tabs">${D.WIA.map((s, i) => `<button class="tab ${i === WI.i ? "on" : ""}" data-act="wia" data-i="${i}">${s.w}</button>`).join("")}</div>
  <div class="panel"><div class="panel-h"><div class="row"><span class="wd-word">${set.w}</span>${Voice.can() ? `<button class="btn sm b" data-act="say" data-text="${set.w.toLowerCase()}">${icon("speaker")} Ouvir</button>` : ""}</div><span class="chip y">${set.ctx.length} situações diferentes</span></div>
    <div class="strip">${set.ctx.map((c, i) => `<div class="cpanel"><div class="scene" style="--c:${colors[i % 4]}"><span class="lbl">${esc(c.label)}</span>${c.scene.map(s => `<span aria-hidden="true">${s}</span>`).join("")}<span class="n">${i + 1}</span></div>
      <div class="txt"><div class="row between" style="flex-wrap:nowrap;align-items:flex-start"><b style="font-size:1.1rem">${esc(c.en)}</b>${Voice.can() ? `<button class="btn sm icon-btn" data-act="say" data-text="${esc(c.en)}" aria-label="Ouvir">${icon("speaker")}</button>` : ""}</div><span class="muted">${esc(c.pt)}</span><span class="small" style="font-weight:700">💡 ${esc(c.note)}</span></div></div>`).join("")}</div></div>
  <div class="grid g2">
    <div class="panel"><div class="panel-h"><span class="caption b">COMPLETE AS FRASES</span></div><div class="stack" id="wia-form">
      ${set.ctx.map((c, i) => { const parts = c.blank.split("___"); return `<div class="row" style="gap:6px"><span class="chip">${i + 1}</span><span>${esc(parts[0])}</span><input class="input" style="width:130px" id="wia-${i}" autocomplete="off" autocapitalize="off" aria-label="Lacuna ${i + 1}"><span>${esc(parts[1])}</span><span id="wia-fb-${i}" class="small" style="font-weight:800"></span></div>`; }).join("")}
      <div class="row"><button class="btn y" data-act="wia-check">Verificar</button><span class="small muted">Dica: preste atenção ao -s da 3ª pessoa e ao -ing.</span></div></div></div>
    <div class="panel"><div class="panel-h"><span class="caption r">CRIE SEU EXEMPLO</span></div>
      ${AI.ok() ? `<div class="stack"><div class="field"><label for="wia-own">Escreva uma frase sua com <b>${set.w}</b> em qualquer um dos sentidos</label><textarea class="input" id="wia-own" placeholder="Ex.: I get up at 7 every day."></textarea></div><div class="row"><button class="btn r" data-act="wia-own">Corrigir com IA</button></div><div id="wia-own-fb"></div></div>` : pendingAI()}
    </div></div>`;
}

/* ───────── Construção de frases ───────── */
let SB = { s: 0, i: 0, state: null };
function sbInit() { const it = D.STRUCTS[SB.s].items[SB.i]; SB.state = { placed: [], bank: shuffle(tokenize(it.a).map((t, i) => i)), checked: false, tokens: tokenize(it.a) }; }
function pFrases() {
  if (!SB.state) sbInit();
  const st = D.STRUCTS[SB.s], it = st.items[SB.i];
  const done = S.sentDone || {};
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">MONTE E ENTENDA</span><h1>Construção de frases</h1></div><div class="chips"><span class="chip y num">${S.sentOk} frases corretas</span>${week() ? `<span class="chip num">Semana: ${week().stats.sent}/5</span>` : ""}</div></div>
  <div class="tabs">${D.STRUCTS.map((s, i) => `<button class="tab ${i === SB.s ? "on" : ""}" data-act="sb-struct" data-i="${i}">${esc(s.title)}</button>`).join("")}</div>
  <div class="grid g2">
    <div class="panel b"><div class="panel-h"><span class="caption b">A ESTRUTURA</span></div><h2 style="margin-bottom:10px">${esc(st.title)}</h2><p style="font-weight:600">${esc(st.tip)}</p>
      <div class="stack" style="margin-top:14px">${st.ex.map(e => `<div class="ex">${Voice.can() ? `<button class="btn sm icon-btn" data-act="say" data-text="${esc(e[0])}" aria-label="Ouvir">${icon("speaker")}</button>` : "<span></span>"}<div><div class="e">${esc(e[0])}</div><div class="t">${esc(e[1])}</div></div></div>`).join("")}</div></div>
    <div class="panel"><div class="panel-h"><span class="caption">MONTE A FRASE ${SB.i + 1}/${st.items.length}</span><span class="chips">${st.items.map((x, i) => `<span class="chip ${done[st.id + i] ? "g" : ""}" style="padding:2px 8px">${i + 1}</span>`).join("")}</span></div>
      <p class="q-text" style="font-size:1.1rem">"${esc(it.pt)}"</p>
      <div class="stack" style="margin-top:12px" id="sb-area">${orderUI(SB.state.tokens, SB.state)}</div>
      <div id="sb-fb" style="margin-top:12px"></div>
      <div class="row between" style="margin-top:12px"><button class="btn sm" data-act="sb-reset">Recomeçar</button><button class="btn y" id="sb-btn" data-act="${SB.state.checked ? "sb-next" : "sb-check"}">${SB.state.checked ? "Próxima frase" : "Verificar"}</button></div>
    </div></div>
  <div class="panel"><div class="panel-h"><span class="caption r">AGORA É SUA VEZ</span><span class="small muted">Use a estrutura "${esc(st.title)}"</span></div>
    ${AI.ok() ? `<div class="grid g2"><div class="field"><label for="sb-own">Escreva uma frase sua</label><textarea class="input" id="sb-own" placeholder="${esc(st.ex[0][0])}"></textarea><div><button class="btn r" data-act="sb-own">Corrigir com IA</button></div></div><div id="sb-own-fb"></div></div>` : pendingAI()}
  </div>`;
}
function sbRedraw() { const a = $("#sb-area"); if (a) a.innerHTML = orderUI(SB.state.tokens, SB.state); }
function sbCheck() {
  const st = D.STRUCTS[SB.s], it = st.items[SB.i], s = SB.state;
  if (!s.placed.length) { toast("Toque nas palavras para montar a frase."); return; }
  const built = s.placed.map(i => s.tokens[i]).join(" ");
  const ok = norm(built) === norm(it.a) || (it.alt || []).some(a => norm(a) === norm(built));
  s.checked = true;
  $("#zone-ans").classList.add(ok ? "ok" : "bad");
  if (ok) { S.sentOk++; L().sent++; if (week()) week().stats.sent++; S.sentDone = Object.assign(S.sentDone || {}, { [st.id + SB.i]: 1 }); burst(); }
  else { S.sentBad = (S.sentBad || 0) + 1; S.mistakes.push({ type: "sentence", q: it.pt, user: built, right: it.a, why: it.why, at: Date.now() }); }
  const ts = S.typeStats.sentence || (S.typeStats.sentence = { ok: 0, bad: 0 }); ok ? ts.ok++ : ts.bad++;
  gain(ok ? 10 : 2, true);
  $("#sb-fb").innerHTML = `<div class="fb ${ok ? "ok" : "bad"}"><span class="h">${ok ? CHEERS[Math.random() * CHEERS.length | 0] + " Correto!" : "Quase!"}</span>${ok ? "" : `<div>Você montou: <i>${esc(built)}</i></div><div>Correto: <b>${esc(it.a)}</b></div>`}<div><b>Por quê?</b> ${esc(it.why)}</div>${Voice.can() ? `<div><button class="btn sm" data-act="say" data-text="${esc(it.a)}">${icon("speaker")} Ouvir</button></div>` : ""}</div>`;
  const b = $("#sb-btn"); b.textContent = "Próxima frase"; b.dataset.act = "sb-next";
}

/* ───────── Exercícios ───────── */
let EXSRC = "week";
function exWords() {
  if (EXSRC === "week" && week()) return week().words.map(getWord).filter(Boolean);
  if (EXSRC === "learned") { const l = learnedIds().map(getWord); return l.length >= 4 ? l : (week() ? week().words.map(getWord) : allWords()); }
  return allWords().filter(w => w.level === S.profile.level);
}
function pEx() {
  const ts = S.typeStats;
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">10 MODALIDADES</span><h1>Central de exercícios</h1></div>
  <div class="field"><label for="ex-src">Praticar com</label><select class="input" id="ex-src"><option value="week" ${EXSRC === "week" ? "selected" : ""}>Palavras da semana atual</option><option value="learned" ${EXSRC === "learned" ? "selected" : ""}>Todas as palavras aprendidas (${learnedIds().length})</option><option value="level" ${EXSRC === "level" ? "selected" : ""}>Banco do meu nível (${esc(S.profile.level)})</option></select></div></div>
  <div class="panel y hero" style="grid-template-columns:1fr auto"><div class="stack"><h2>Sessão mista</h2><p style="font-weight:700">10 questões de vários tipos. Cada acerto vale 10 XP e alimenta sua revisão inteligente.</p></div><button class="btn n big" data-act="ex-start" data-mode="mix">COMEÇAR</button></div>
  <div class="grid g-auto">${MODES.map(m => { const st = ts[m.id] || { ok: 0, bad: 0 }; const n = st.ok + st.bad; const needAI = m.id === "create" && !AI.ok(); const needV = m.id === "listen" && !Voice.can();
    return `<button class="cat" data-act="ex-start" data-mode="${m.id}"><span class="ic" aria-hidden="true">${m.ic}</span><span class="t">${esc(m.t)}</span><span class="small muted">${esc(m.d)}</span>
    <span class="row small" style="font-weight:800">${n ? `<span class="pill ${pct(st.ok, n) >= 70 ? "ok" : "rv"}">${pct(st.ok, n)}% de acerto</span>` : `<span class="pill nw">Novo</span>`}${needAI ? `<span class="pill lr">IA pendente</span>` : ""}${needV ? `<span class="pill lr">Sem áudio</span>` : ""}</span></button>`; }).join("")}</div>`;
}

/* ───────── Conversação ───────── */
let CV = { cat: null, conv: null, busy: false, err: "", auto: true, listening: false };
function convAvg(n = 6) { const sc = S.convs.flatMap(c => c.msgs.filter(m => m.score != null).map(m => m.score)).slice(-n); return sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : null; }
function pConv() {
  const cats = D.CONV;
  const intro = `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">TEACHER ACE</span><h1>Conversação com IA</h1></div><div class="chips"><span class="chip n">Nível ${esc(S.profile.level)}</span>${convAvg() != null ? `<span class="chip y num">Desempenho recente: ${convAvg()}/100</span>` : ""}</div></div>`;
  if (!AI.checked) return intro + `<div class="panel"><p>Conectando ao professor…</p></div>`;
  if (!AI.ok()) return intro + `<div class="panel y hero">${teacherSVG("think")}<div class="stack">${pendingAI(`<p class="small">Enquanto isso, pratique os diálogos prontos da Central de exercícios (eles também contam para o sábado da semana).</p><div><button class="btn" data-act="ex-start" data-mode="dialog">Praticar diálogos</button></div>`)}</div></div>`;
  if (!CV.conv) {
    return intro + `<div class="panel y hero">${teacherSVG("happy")}<div class="stack"><div class="bubble left">Hi! I'm <b>Teacher Ace</b>. Choose a situation and let's talk. I'll speak only English, but I'll explain your mistakes in Portuguese.</div><p class="small" style="font-weight:700">O professor ajusta a dificuldade ao seu nível (${esc(S.profile.level)}) e ao seu desempenho nas conversas.</p></div></div>
    <div class="grid g-auto">${cats.map(c => `<button class="cat" data-act="conv-start" data-id="${c.id}"><span class="ic" aria-hidden="true">${c.icon}</span><span class="t">${esc(c.t)}</span><span class="small muted">${esc(c.pt)}</span></button>`).join("")}</div>
    ${S.convs.length ? `<div class="panel"><div class="panel-h"><span class="caption b">HISTÓRICO DE CONVERSAS</span></div><div class="scroll-x"><table class="t"><thead><tr><th>Data</th><th>Situação</th><th>Mensagens</th><th>Nota média</th><th></th></tr></thead><tbody>${S.convs.slice().reverse().slice(0, 10).map(c => { const sc = c.msgs.filter(m => m.score != null).map(m => m.score); const cat = cats.find(x => x.id === c.cat) || {}; return `<tr><td class="num">${new Date(c.at).toLocaleDateString("pt-BR")}</td><td>${esc(cat.t || c.cat)}</td><td class="num">${c.msgs.filter(m => m.r === "me").length}</td><td class="num">${sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : "–"}</td><td><button class="btn sm" data-act="conv-open" data-at="${c.at}">Continuar</button></td></tr>`; }).join("")}</tbody></table></div></div>` : ""}`;
  }
  const cat = cats.find(c => c.id === CV.conv.cat);
  return intro + `<div class="panel chat"><div class="chat-h"><span style="font-size:1.6rem" aria-hidden="true">${cat.icon}</span><div class="stack" style="gap:0;flex:1;min-width:160px"><b class="display" style="font-size:1.3rem">${esc(cat.t)}</b><span class="small">${esc(cat.pt)} · nível ${esc(S.profile.level)}</span></div>
    ${Voice.can() ? `<label class="row small" style="font-weight:800;gap:6px"><input type="checkbox" id="cv-auto" ${CV.auto ? "checked" : ""}> Ler respostas em voz alta</label>` : ""}
    <button class="btn sm" data-act="conv-end">Trocar situação</button></div>
    <div class="msgs" id="msgs">${CV.conv.msgs.map(msgHTML).join("")}${CV.busy ? `<div class="msg"><span class="av">${teacherSVG("think", "av")}</span><div class="bubble left"><span class="typing"><i></i><i></i><i></i></span></div></div>` : ""}${CV.err ? `<div class="fb bad">${esc(CV.err)} <button class="btn sm" data-act="conv-retry">Tentar de novo</button></div>` : ""}</div>
    <form class="composer" id="cv-form"><textarea class="input" id="cv-in" placeholder="Write in English…" aria-label="Sua mensagem em inglês" ${CV.busy ? "disabled" : ""}></textarea>
    ${Voice.d ? `<button type="button" class="btn icon-btn mic ${CV.listening ? "on" : ""}" data-act="mic" aria-label="Falar pelo microfone">${icon("mic")}</button>` : ""}
    <button class="btn y icon-btn" type="submit" aria-label="Enviar" ${CV.busy ? "disabled" : ""}>${icon("send")}</button></form></div>
    <p class="small muted">Dica: escreva frases completas. Se não souber dizer algo, escreva em português e o professor mostra como dizer em inglês.</p>`;
}
function msgHTML(m) {
  if (m.r === "ai") return `<div class="msg"><span class="av">${teacherSVG(m.praise ? "wow" : "happy", "av")}</span><div class="bubble left">${m.praise ? `<span class="caption" style="margin-bottom:6px">${esc(m.praise)}</span><br>` : ""}${esc(m.t)}${Voice.can() ? ` <button class="btn sm icon-btn" style="width:28px;height:28px;vertical-align:middle" data-act="say" data-text="${esc(m.t)}" aria-label="Ouvir">${icon("speaker")}</button>` : ""}</div></div>`;
  return `<div class="msg me"><span class="av">${heroSVG(stageIdx(), "av")}</span><div><div class="bubble">${esc(m.t)}${m.score != null ? ` <span class="pill ${m.score >= 80 ? "ok" : m.score >= 60 ? "lr" : "rv"} num">${m.score}</span>` : ""}</div>
    ${m.fix ? `<div class="fix"><span>✏️ Forma mais natural:</span><span class="nat">${esc(m.fix.natural)}</span><span>${esc(m.fix.explanation_pt || "")}</span></div>` : ""}</div></div>`;
}
function scrollChat() { const m = $("#msgs"); if (m) m.scrollTop = m.scrollHeight; }
async function convTurn() {
  const c = CV.conv, cat = D.CONV.find(x => x.id === c.cat);
  CV.busy = true; CV.err = ""; render();
  const avg = convAvg();
  const words = week() ? week().words.map(getWord).filter(Boolean).map(w => w.en).join(", ") : "";
  const hist = c.msgs.slice(-16).map(m => `${m.r === "ai" ? "TEACHER" : "STUDENT"}: ${m.t}`).join("\n") || "(no messages yet; start the conversation)";
  const prompt = `You are "Teacher Ace", a patient, encouraging English conversation teacher for a Brazilian student on the English Comics platform. Never embarrass the student.
Scenario: ${cat.t}. ${cat.scene}
Student: ${S.profile.name || "the student"}, CEFR level ${S.profile.level}. ${avg != null ? `Average score of recent messages: ${avg}/100. ${avg >= 85 ? "The student is doing well: use slightly richer vocabulary and longer questions than the level suggests." : avg < 55 ? "The student is struggling: use shorter, simpler sentences and easier questions." : ""}` : ""}
Words the student studies this week (use one naturally when it fits): ${words}.
Rules:
- "reply": ONLY English. 1 to 3 short sentences adapted to the level (A1: very simple present tense and common words; C1: natural, idiomatic). React to what the student said and end with exactly ONE question that keeps the conversation going. Stay in the scenario.
- "correction": if the student's LAST message has a grammar, vocabulary or naturalness problem, return {"original": the student's text, "natural": a corrected, natural version in English, "explanation_pt": a short, friendly explanation in Brazilian Portuguese (max 2 simple sentences)}. If it is correct and natural, return null. Ignore capitalization and missing final punctuation. If the student wrote in Portuguese, put in "natural" how to say it in English, explain in Portuguese, and in "reply" kindly invite them to try in English.
- "score": integer 0-100 for the student's LAST message (grammar, vocabulary, naturalness). null if the student has not written yet.
- "praise": a short comic exclamation such as "GREAT!", "NICE!" or "WOW!" when score >= 85, otherwise null.
Conversation so far:
${hist}
Return ONLY a JSON object: {"reply": string, "correction": object or null, "score": number or null, "praise": string or null}`;
  try {
    const r = await AI.json(prompt, "default");
    if (!r || typeof r.reply !== "string") throw { code: "bad_output" };
    const lastMe = [...c.msgs].reverse().find(m => m.r === "me");
    if (lastMe && lastMe.score == null && typeof r.score === "number") {
      lastMe.score = clamp(Math.round(r.score), 0, 100);
      if (r.correction && r.correction.natural) lastMe.fix = { natural: String(r.correction.natural), explanation_pt: String(r.correction.explanation_pt || "") };
      const ts = S.typeStats.conversation || (S.typeStats.conversation = { ok: 0, bad: 0 }); lastMe.score >= 70 ? ts.ok++ : ts.bad++;
      if (lastMe.fix) S.mistakes.push({ type: "conversation", q: "Conversa: " + (D.CONV.find(x => x.id === c.cat) || {}).t, user: lastMe.t, right: lastMe.fix.natural, why: lastMe.fix.explanation_pt, at: Date.now() });
    }
    c.msgs.push({ r: "ai", t: r.reply, praise: r.praise || null });
    CV.busy = false; render();
    if (r.praise) burst(String(r.praise).slice(0, 10));
    if (CV.auto && Voice.can()) Voice.speak(r.reply, false);
    Store.save();
  } catch (e) { CV.busy = false; CV.err = aiErrorText(e); render(); }
}
function convSend(text) {
  text = text.trim(); if (!text || CV.busy) return;
  CV.conv.msgs.push({ r: "me", t: text.slice(0, 600), score: null });
  L().conv++; if (week()) week().stats.conv++;
  gain(8);
  convTurn();
}

/* ───────── Revisão inteligente ───────── */
function pRev() {
  const due = reviewIds();
  const hard = Object.keys(S.words).filter(id => getWord(id) && S.words[id].bad > 0).sort((a, b) => (S.words[b].bad - S.words[b].ok) - (S.words[a].bad - S.words[a].ok)).slice(0, 12);
  const learned = learnedIds();
  const upcoming = learned.filter(id => S.words[id].due > Date.now()).sort((a, b) => S.words[a].due - S.words[b].due).slice(0, 8);
  const mistakes = S.mistakes.slice().reverse().slice(0, 12);
  const forgotten = learned.filter(id => S.words[id].box <= 1);
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">REPETIÇÃO ESPAÇADA</span><h1>Revisão inteligente</h1></div><span class="small muted" style="max-width:46ch;font-weight:700">Repetição espaçada: cada acerto empurra a palavra para mais longe (1, 3, 7, 14, 30 e 60 dias). Cada erro traz a palavra de volta para hoje.</span></div>
  <div class="grid g4">
    <div class="tile r"><span class="k">Para revisar hoje</span><span class="v num">${due.length}</span><span class="s">vencidas ou com muitos erros</span></div>
    <div class="tile"><span class="k">Palavras difíceis</span><span class="v num">${hard.length}</span><span class="s">com algum erro registrado</span></div>
    <div class="tile y"><span class="k">Frágeis</span><span class="v num">${forgotten.length}</span><span class="s">aprendidas, mas ainda no início</span></div>
    <div class="tile b"><span class="k">Erros recentes</span><span class="v num">${S.mistakes.length}</span><span class="s">frases e respostas para refazer</span></div>
  </div>
  <div class="grid g2">
    <div class="panel y"><h2>Flashcards de hoje</h2><p style="font-weight:700;margin:6px 0 14px">Veja a palavra, tente lembrar, confira e diga como foi. O sistema agenda a próxima revisão.</p><button class="btn n big" data-act="flash" ${due.length ? "" : "disabled"}>REVISAR ${due.length} PALAVRA${due.length === 1 ? "" : "S"}</button></div>
    <div class="panel b"><h2>Exercícios personalizados</h2><p style="font-weight:700;margin:6px 0 14px">10 questões com as palavras em que você mais erra e as que estão para vencer.</p><button class="btn r big" data-act="rev-ex" ${(due.length + hard.length + learned.length) ? "" : "disabled"}>PRATICAR MEUS PONTOS FRACOS</button></div>
  </div>
  <div class="grid g2">
    <div class="panel"><div class="panel-h"><span class="caption r">PALAVRAS DIFÍCEIS</span></div>${hard.length ? `<div class="scroll-x"><table class="t"><thead><tr><th>Palavra</th><th>Acertos</th><th>Erros</th><th>Próxima revisão</th></tr></thead><tbody>${hard.map(id => { const w = S.words[id]; return `<tr><td><button class="btn ghost" style="padding:0" data-act="open-word" data-id="${esc(id)}">${esc(getWord(id).en)}</button></td><td class="num">${w.ok}</td><td class="num">${w.bad}</td><td class="num">${w.due <= Date.now() ? "<b>hoje</b>" : new Date(w.due).toLocaleDateString("pt-BR")}</td></tr>`; }).join("")}</tbody></table></div>` : `<div class="empty">Nenhuma palavra com erro até agora.</div>`}</div>
    <div class="panel"><div class="panel-h"><span class="caption b">PRÓXIMAS REVISÕES</span></div>${upcoming.length ? `<div class="stack">${upcoming.map(id => `<div class="row between"><b>${esc(getWord(id).en)}</b><span class="chip num">${new Date(S.words[id].due).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</span></div>`).join("")}</div>` : `<div class="empty">Aprenda palavras para ver o calendário de revisões.</div>`}</div>
  </div>
  <div class="panel"><div class="panel-h"><span class="caption">FRASES COM DIFICULDADE</span><span class="small muted">Seus erros recentes com a forma correta</span></div>
    ${mistakes.length ? `<div class="stack">${mistakes.map(m => `<div class="ex" style="grid-template-columns:1fr"><span class="small muted" style="font-weight:800">${esc(TYPE_LABEL[m.type] || (m.type === "sentence" ? "Construção de frases" : m.type === "conversation" ? "Conversação" : m.type))}</span><span class="e">${esc(m.q)}</span><span>Sua resposta: <i>${esc(m.user)}</i></span><span>Correto: <b>${esc(m.right)}</b></span>${m.why ? `<span class="t">${esc(m.why)}</span>` : ""}</div>`).join("")}</div>` : `<div class="empty">Sem erros registrados. Continue praticando!</div>`}
  </div>`;
}
function startFlash() {
  const ids = reviewIds().slice(0, 15);
  SS = { flash: true, ids, i: 0, shown: false, ok: 0, title: "Flashcards" };
  $("#overlay").classList.add("open"); document.body.style.overflow = "hidden"; renderFlash();
}
function renderFlash() {
  if (SS.i >= SS.ids.length) {
    $("#sheet").innerHTML = `<div class="panel y hero" style="grid-template-columns:auto 1fr">${teacherSVG("wow")}<div class="stack"><h2>REVIEW DONE!</h2><p style="font-weight:700">Você revisou ${SS.ids.length} palavra(s) e lembrou de ${SS.ok}. As próximas datas já foram agendadas.</p><button class="btn n big" data-act="session-close-force">CONTINUAR</button></div></div>`;
    Store.save(); return;
  }
  const w = getWord(SS.ids[SS.i]);
  $("#sheet").innerHTML = `<div class="sheet-h"><button class="btn icon-btn sm" data-act="session-close-force" aria-label="Fechar">${icon("x")}</button><div class="bar y"><i style="width:${pct(SS.i, SS.ids.length)}%"></i></div><span class="chip num">${SS.i + 1}/${SS.ids.length}</span></div>
  <div class="panel flash"><div class="wart" style="--c:${TOPIC_COLOR[w.topic]};width:120px;height:120px;border:var(--line);border-radius:14px">${esc(w.icon)}</div><span class="wd-word">${esc(w.en)}</span>
  ${Voice.can() ? `<button class="btn sm" data-act="say" data-text="${esc(w.en)}">${icon("speaker")} Ouvir</button>` : ""}
  ${SS.shown ? `<div class="stack" style="text-align:center"><b style="font-size:1.4rem">${esc(w.pt)}</b><span class="muted">${esc(w.pron)}</span><i>${esc(w.ex[0][0])}</i><span class="small muted">${esc(w.ex[0][1])}</span></div>` : `<p class="muted" style="font-weight:700">Lembra o significado? Pense antes de conferir.</p>`}</div>
  ${SS.shown ? `<div class="grid g4"><button class="btn r" data-act="rate" data-r="0">Errei</button><button class="btn" data-act="rate" data-r="1">Difícil</button><button class="btn b" data-act="rate" data-r="2">Bom</button><button class="btn y" data-act="rate" data-r="3">Fácil</button></div>` : `<button class="btn y big" data-act="flip">MOSTRAR RESPOSTA</button>`}`;
}
function rateFlash(r) {
  const id = SS.ids[SS.i], w = ws(id);
  w.seen++;
  if (r === 0) { w.bad++; w.box = 1; w.due = Date.now() + 10 * 60000; record(false, "review", null, null); }
  else {
    w.ok++; SS.ok++;
    w.box = clamp(w.box + (r === 1 ? 0 : r === 2 ? 1 : 2), 1, 6);
    w.due = Date.now() + (r === 1 ? DAY : IV[w.box] * DAY);
    record(true, "review", null, null);
  }
  L().rev++;
  SS.i++; SS.shown = false; renderFlash();
}

/* ───────── Meu progresso ───────── */
let PG = { wk: null };
function pProg() {
  const logs = Object.entries(S.log);
  const totOk = logs.reduce((a, [, l]) => a + l.ok, 0), totBad = logs.reduce((a, [, l]) => a + l.bad, 0), totSec = logs.reduce((a, [, l]) => a + l.sec, 0);
  const learned = learnedIds();
  // evolução semanal: XP por semana (últimas 8)
  const mon = mondayOf(todayKey());
  const weekly = [...Array(8).keys()].map(i => { const s = addDays(mon, (i - 7) * 7); let xp = 0; for (let d = 0; d < 7; d++) xp += (S.log[addDays(s, d)] || {}).xp || 0; return { l: keyToDate(s).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }), v: xp, tip: `Semana de ${keyToDate(s).toLocaleDateString("pt-BR")}: ${xp} XP` }; });
  // evolução mensal: palavras aprendidas por mês (últimos 6)
  const now = new Date();
  const monthly = [...Array(6).keys()].map(i => { const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1); const n = learned.filter(id => { const t = new Date(S.words[id].learnedAt || 0); return t.getFullYear() === d.getFullYear() && t.getMonth() === d.getMonth(); }).length; return { l: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""), v: n, tip: `${d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}: ${n} palavras` }; });
  const daily = [...Array(14).keys()].map(i => { const k = addDays(todayKey(), i - 13); const l = S.log[k] || {}; return { l: keyToDate(k).getDate() + "", v: Math.round((l.sec || 0) / 60), tip: `${keyToDate(k).toLocaleDateString("pt-BR")}: ${Math.round((l.sec || 0) / 60)} min · ${l.xp || 0} XP` }; });
  const convSc = S.convs.filter(c => c.msgs.some(m => m.score != null)).slice(-10).map((c, i) => { const sc = c.msgs.filter(m => m.score != null).map(m => m.score); const v = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length); return { l: `#${i + 1}`, v, tip: `${new Date(c.at).toLocaleDateString("pt-BR")} · ${(D.CONV.find(x => x.id === c.cat) || {}).t}: ${v}/100` }; });
  const typeRows = Object.entries(S.typeStats).filter(([, v]) => v.ok + v.bad > 0).map(([k, v]) => ({ l: k === "sentence" ? "Construção de frases" : k === "conversation" ? "Conversação (nota ≥ 70)" : k === "review" ? "Flashcards" : TYPE_LABEL[k] || k, v: pct(v.ok, v.ok + v.bad), txt: `${pct(v.ok, v.ok + v.bad)}% · ${v.ok + v.bad} resp.` })).sort((a, b) => a.v - b.v);
  const byLevel = D.LEVELS.map(l => { const tot = allWords().filter(w => w.level === l.id).length; const n = learned.filter(id => getWord(id).level === l.id).length; return { l: `${l.id} · ${l.name}`, v: pct(n, tot), txt: `${n}/${tot}` }; });
  if (PG.wk == null || !S.weeks[PG.wk]) PG.wk = S.cur;
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">SUAS ESTATÍSTICAS</span><h1>Meu progresso</h1></div><div class="chips"><span class="chip n">${esc(S.profile.level)} · ${esc(levelName(S.profile.level))}</span><span class="chip y">Jogador nível ${playerLevel()}</span></div></div>
  <div class="grid g4">
    <div class="tile y"><span class="k">Palavras aprendidas</span><span class="v num">${learned.length}</span><span class="s">${S.weeks.length} semana(s) iniciada(s)</span></div>
    <div class="tile"><span class="k">Frases estudadas</span><span class="v num">${S.sentOk + (S.sentBad || 0)}</span><span class="s">${S.sentOk} montadas corretamente</span></div>
    <div class="tile b"><span class="k">Percentual de acertos</span><span class="v num">${pct(totOk, totOk + totBad)}%</span><span class="s">${totOk + totBad} respostas no total</span></div>
    <div class="tile r"><span class="k">Tempo de estudo</span><span class="v num" style="font-size:1.8rem">${fmtMin(totSec)}</span><span class="s">Sequência: ${streakNow()} dia(s) · recorde ${S.streak.best}</span></div>
  </div>
  <div class="grid g2">
    <div class="panel"><div class="panel-h"><span class="caption">EVOLUÇÃO SEMANAL</span><span class="small muted">XP por semana</span></div>${barChart(weekly, { color: "#2196F3", unit: " XP" })}</div>
    <div class="panel"><div class="panel-h"><span class="caption r">EVOLUÇÃO MENSAL</span><span class="small muted">Palavras aprendidas por mês</span></div>${barChart(monthly, { color: "#EF476F", unit: " palavras" })}</div>
    <div class="panel"><div class="panel-h"><span class="caption b">ATIVIDADE DIÁRIA</span><span class="small muted">Minutos de estudo, últimos 14 dias</span></div>${barChart(daily, { color: "#FFD43B", unit: " min" })}</div>
    <div class="panel"><div class="panel-h"><span class="caption">DESEMPENHO NA CONVERSAÇÃO</span><span class="small muted">Nota média por conversa (0–100)</span></div>${convSc.length ? lineChart(convSc, { max: 100, unit: "/100" }) : `<div class="empty">${AI.ok() ? "Converse com o professor para ver sua evolução." : "Disponível quando o professor de IA estiver configurado."}</div>`}</div>
    <div class="panel"><div class="panel-h"><span class="caption b">ACERTOS POR MODALIDADE</span><span class="small muted">Do menor para o maior</span></div>${typeRows.length ? hbar(typeRows) : `<div class="empty">Faça exercícios para ver este gráfico.</div>`}</div>
    <div class="panel"><div class="panel-h"><span class="caption r">PALAVRAS POR NÍVEL</span></div>${hbar(byLevel, "#EF476F")}</div>
  </div>
  ${S.weeks.length ? weekReport() : ""}
  <div class="panel"><div class="panel-h"><span class="caption">HISTÓRICO DE ESTUDOS</span><span class="small muted">Últimos 14 dias</span></div><div class="scroll-x"><table class="t"><thead><tr><th>Dia</th><th>XP</th><th>Tempo</th><th>Acertos</th><th>Erros</th><th>Palavras novas</th><th>Frases</th><th>Mensagens</th></tr></thead><tbody>
  ${[...Array(14).keys()].map(i => addDays(todayKey(), -i)).filter(k => S.log[k]).map(k => { const l = S.log[k]; return `<tr><td class="num">${keyToDate(k).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}</td><td class="num">${l.xp}</td><td class="num">${fmtMin(l.sec)}</td><td class="num">${l.ok}</td><td class="num">${l.bad}</td><td class="num">${l.words}</td><td class="num">${l.sent}</td><td class="num">${l.conv}</td></tr>`; }).join("") || `<tr><td colspan="8" class="muted">Sem atividade registrada.</td></tr>`}</tbody></table></div></div>`;
}
function weekReport() {
  const w = S.weeks[PG.wk];
  const learnedW = w.words.filter(id => S.words[id] && S.words[id].st === "learned");
  const revW = w.words.filter(id => needsReview(id) || (S.words[id] && S.words[id].bad > S.words[id].ok));
  const tot = w.stats.ok + w.stats.bad;
  const weak = Object.entries(S.typeStats).filter(([, v]) => v.ok + v.bad >= 3).map(([k, v]) => [k, v.ok / (v.ok + v.bad)]).sort((a, b) => a[1] - b[1]).slice(0, 2);
  const worst = w.words.filter(id => S.words[id] && S.words[id].bad).sort((a, b) => S.words[b].bad - S.words[a].bad).slice(0, 3).map(id => getWord(id).en);
  const tips = [];
  if (learnedW.length < w.words.length) tips.push(`Termine as ${w.words.length - learnedW.length} palavra(s) que faltam aprender.`);
  weak.forEach(([k, r]) => { if (r < .75) tips.push(`Pratique mais "${k === "sentence" ? "Construção de frases" : TYPE_LABEL[k] || k}" (${Math.round(r * 100)}% de acerto).`); });
  if (worst.length) tips.push(`Revise com atenção: ${worst.join(", ")}.`);
  if (!w.stats.conv && !w.stats.dlg) tips.push("Faça a conversação do sábado para usar as palavras em contexto.");
  if (!w.test) tips.push("Faça o teste semanal de domingo.");
  return `<div class="panel"><div class="panel-h"><span class="caption r">RELATÓRIO SEMANAL</span><div class="tabs">${S.weeks.map((x, i) => `<button class="tab ${i === PG.wk ? "on" : ""}" data-act="pg-wk" data-i="${i}">Semana ${x.n}</button>`).join("")}</div></div>
  <div class="grid g4">
    <div class="tile y"><span class="k">Palavras aprendidas</span><span class="v num">${learnedW.length}/${w.words.length}</span></div>
    <div class="tile r"><span class="k">Precisam de revisão</span><span class="v num">${revW.length}</span></div>
    <div class="tile b"><span class="k">Acertos nos exercícios</span><span class="v num">${tot ? pct(w.stats.ok, tot) + "%" : "–"}</span><span class="s">${tot} respostas</span></div>
    <div class="tile"><span class="k">Teste semanal</span><span class="v num">${w.test ? pct(w.test.score, w.test.total) + "%" : "–"}</span><span class="s">${w.test ? `${w.test.score}/${w.test.total}` : "ainda não feito"}</span></div>
  </div>
  <div class="grid g2" style="margin-top:16px">
    <div class="stack"><b>Conversação</b><span class="small">${w.stats.conv} mensagem(ns) ao professor · ${w.stats.dlg} diálogo(s) correto(s) · ${w.stats.xp} XP na semana</span>
    ${revW.length ? `<b>Palavras para revisar</b><div class="chips">${revW.map(id => `<button class="chip r" data-act="open-word" data-id="${esc(id)}">${esc(getWord(id).en)}</button>`).join("")}</div>` : ""}</div>
    <div class="stack"><b>Pontos para melhorar</b>${tips.length ? `<ul style="margin:0;padding-left:20px">${tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : `<span>Semana excelente! Siga para a próxima.</span>`}</div>
  </div></div>`;
}

/* ───────── Conquistas ───────── */
function pAch() {
  const lv = playerLevel(), si = stageIdx(lv), next = STAGES[si + 1];
  const rankW = S.weeks.map(w => ({ n: w.n, xp: w.stats.xp, test: w.test })).sort((a, b) => b.xp - a.xp);
  const bestDays = Object.entries(S.log).sort((a, b) => b[1].xp - a[1].xp).slice(0, 5);
  const unlocked = ACH.filter(a => S.ach[a.id]).length;
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">GAMIFICAÇÃO</span><h1>Conquistas</h1></div><div class="chips"><span class="chip y num">${unlocked}/${ACH.length} medalhas</span><span class="chip num">${S.xp} XP</span></div></div>
  <div class="grid g3">
    <div class="panel y" style="display:grid;justify-items:center;text-align:center;gap:8px">${heroSVG(si, "teacher")}<span class="caption r">${STAGES[si].name.toUpperCase()}</span><h2>Nível ${lv}</h2>
      <div class="bar" style="width:100%"><i style="width:${pct(S.xp - levelXP(lv), levelXP(lv + 1) - levelXP(lv))}%"></i></div><span class="small num" style="font-weight:800">${S.xp - levelXP(lv)}/${levelXP(lv + 1) - levelXP(lv)} XP para o nível ${lv + 1}</span>
      <span class="small">${next ? `No nível ${next.min} seu personagem vira <b>${next.name}</b>.` : "Forma máxima alcançada!"}</span></div>
    <div class="panel"><div class="panel-h"><span class="caption">DESAFIOS DE HOJE</span></div>${challengesHTML()}<div style="margin-top:18px"><span class="caption b">METAS SEMANAIS</span><div style="margin-top:12px">${goalsHTML()}</div></div></div>
    <div class="panel"><div class="panel-h"><span class="caption r">RANKING PESSOAL</span></div>
      ${rankW.length ? `<table class="t"><thead><tr><th>#</th><th>Semana</th><th>XP</th><th>Teste</th></tr></thead><tbody>${rankW.slice(0, 6).map((r, i) => `<tr><td>${["🥇", "🥈", "🥉"][i] || i + 1}</td><td>Semana ${r.n}</td><td class="num">${r.xp}</td><td class="num">${r.test ? pct(r.test.score, r.test.total) + "%" : "–"}</td></tr>`).join("")}</tbody></table>` : ""}
      ${bestDays.length ? `<b class="small" style="display:block;margin-top:12px">Melhores dias</b><div class="stack small" style="gap:2px">${bestDays.map(([k, l]) => `<div class="row between"><span>${keyToDate(k).toLocaleDateString("pt-BR")}</span><b class="num">${l.xp} XP</b></div>`).join("")}</div>` : ""}
    </div>
  </div>
  <div class="panel"><div class="panel-h"><span class="caption">MEDALHAS</span></div><div class="grid g-auto">${ACH.map((a, i) => `<div class="ach ${S.ach[a.id] ? "" : "lock"}">${medalSVG(!!S.ach[a.id], i)}<div class="stack" style="gap:2px"><span class="t">${esc(a.t)}</span><span class="small">${esc(a.d)}</span>${S.ach[a.id] ? `<span class="small muted">Desbloqueada em ${new Date(S.ach[a.id]).toLocaleDateString("pt-BR")}</span>` : ""}</div></div>`).join("")}</div></div>`;
}

/* ───────── Perfil ───────── */
let RESETQ = false;
function pProfile() {
  return `<div class="topbar"><div class="stack" style="gap:2px"><span class="caption">CONTA</span><h1>Meu perfil</h1></div></div>
  <div class="grid g2">
    <div class="panel stack" style="gap:14px">
      <div class="field"><label for="pf-name">Nome</label><input class="input" id="pf-name" value="${esc(S.profile.name)}"></div>
      <div class="field"><label for="pf-level">Nível de inglês</label><select class="input" id="pf-level">${D.LEVELS.map(l => `<option value="${l.id}" ${l.id === S.profile.level ? "selected" : ""}>${l.id} · ${l.name}</option>`).join("")}</select><span class="small muted">Vale para as próximas semanas e para a conversação com IA.</span></div>
      <div class="field"><label for="pf-goal">Meta diária</label><select class="input" id="pf-goal">${[30, 50, 100, 150, 200].map(g => `<option value="${g}" ${g === S.profile.goal ? "selected" : ""}>${g} XP por dia</option>`).join("")}</select></div>
      <label class="row" style="font-weight:800"><input type="checkbox" id="pf-slow" ${S.profile.slow ? "checked" : ""}> Áudio mais lento por padrão</label>
      <div class="row"><button class="btn y" data-act="pf-save">Salvar perfil</button><button class="btn" data-act="pf-test">Refazer teste de nivelamento</button></div>
    </div>
    <div class="panel stack" style="gap:12px">
      <span class="caption b">SEUS DADOS</span>
      <p>${Store.mode === "cloud" ? "Seu progresso fica salvo na sua conta do claude.ai e continua de onde parou em qualquer dispositivo." : (window.claude ? "Seu progresso está salvo apenas neste navegador. Abra a página logado no claude.ai para salvar na sua conta." : "Seu progresso fica salvo neste navegador. Para usar em outro aparelho, continue estudando no mesmo navegador.")}</p>
      <div class="stack small"><span>Palavras estudadas: <b class="num">${Object.keys(S.words).length}</b> · Favoritas: <b class="num">${S.fav.length}</b></span><span>Semanas: <b class="num">${S.weeks.length}</b> · Conversas: <b class="num">${S.convs.length}</b> · Sessões: <b class="num">${S.sessions}</b></span>
      <span>Professor de IA: <b>${AI.ok() ? "conectado" : "configuração pendente"}</b> · Áudio: <b>${Voice.can() ? "disponível" : "indisponível"}</b> · Microfone: <b>${Voice.d ? "disponível" : "indisponível"}</b></span></div>
      ${RESETQ ? `<div class="fb bad"><b>Apagar o progresso de ${esc(S.profile.name || "este perfil")}?</b><p class="small">Palavras, XP, semanas, conquistas e conversas deste perfil serão apagados. Os outros perfis não mudam. Isso não pode ser desfeito.</p><div class="row"><button class="btn r sm" data-act="pf-reset-yes">Sim, apagar tudo</button><button class="btn sm" data-act="pf-reset-no">Cancelar</button></div></div>` : `<div><button class="btn r sm" data-act="pf-reset">Apagar progresso deste perfil</button></div>`}
      <div class="row"><span class="small" style="font-weight:700">Perfis nesta conta: ${Store.idx ? Store.idx.list.map(p => esc(p.name)).join(", ") : ""}</span><button class="btn sm" data-act="profiles">Trocar ou criar perfil</button></div>
    </div></div>`;
}

/* ───────── Perfis ───────── */
function resetUI() {
  VS = { tab: "week", wk: null, day: null, open: null, q: "", lv: "all", tp: "all" };
  CV.conv = null; CV.err = ""; CV.busy = false;
  SB = { s: 0, i: 0, state: null }; WI = { i: 0, checked: false }; PG = { wk: null };
  OB = { step: 0, i: 0, ans: [], name: "" }; RESETQ = false; EXSRC = "week";
}
function openProfiles(msg) {
  SS = { modal: true };
  const list = Store.idx ? Store.idx.list : [];
  $("#overlay").classList.add("open"); document.body.style.overflow = "hidden";
  $("#sheet").innerHTML = `<div class="sheet-h"><span class="caption">QUEM VAI ESTUDAR?</span><span style="flex:1"></span><button class="btn icon-btn sm" data-act="session-close-force" aria-label="Fechar">${icon("x")}</button></div>
  <p class="small" style="font-weight:700">Cada perfil tem o próprio nível, palavras, XP, conquistas e conversas. ${Store.mode === "cloud" ? "Todos ficam salvos na sua conta do claude.ai." : "Todos ficam salvos neste navegador."}</p>
  <div class="stack">${list.map(p => { const on = p.id === Store.active(); return `<div class="pcard ${on ? "on" : ""}"><span class="ini" aria-hidden="true">${esc((p.name || "?")[0].toUpperCase())}</span><div class="stack" style="gap:0;flex:1"><b class="display" style="font-size:1.4rem">${esc(p.name)}</b><span class="small">${on ? `Perfil em uso · ${S.xp} XP · ${esc(S.profile.level)}` : "Toque em Entrar para continuar"}</span></div>${on ? `<span class="chip n">Em uso</span>` : `<button class="btn y" data-act="prof-switch" data-id="${esc(p.id)}">Entrar</button>`}</div>`; }).join("")}</div>
  <div class="panel stack"><b>Novo perfil</b><div class="row"><input class="input" id="prof-new" placeholder="Nome" style="flex:1;min-width:160px" maxlength="30"><button class="btn b" data-act="prof-create">Criar perfil</button></div>${msg ? `<span class="small" style="color:#B3123F;font-weight:800">${esc(msg)}</span>` : ""}</div>`;
}
async function switchProfile(id) {
  $("#sheet").innerHTML = `<div class="panel"><b>Abrindo perfil…</b> <span class="typing"><i></i><i></i><i></i></span></div>`;
  await Store.switchTo(id);
  resetUI(); if (S.profile.onboarded && !week()) createWeek();
  $("#overlay").classList.remove("open"); document.body.style.overflow = ""; SS = null;
  OB.name = S.profile.name; checkChallenges();
  toast(`Olá, ${S.profile.name || "aluno"}!`); go("inicio");
}

/* ───────── Ações ───────── */
const ACTS = Object.assign({}, SESSION_ACTS, {
  go: el => go(el.dataset.arg),
  profiles: () => openProfiles(),
  "prof-switch": el => switchProfile(el.dataset.id),
  "prof-create": async () => {
    const name = ($("#prof-new").value || "").trim();
    if (!name) { openProfiles("Escreva um nome para o novo perfil."); return; }
    if (Store.idx.list.some(p => p.name.toLowerCase() === name.toLowerCase())) { openProfiles("Já existe um perfil com esse nome."); return; }
    await Store.create(name);
    resetUI(); OB.name = name;
    $("#overlay").classList.remove("open"); document.body.style.overflow = ""; SS = null;
    toast(`Perfil de ${name} criado!`); go("inicio");
  },
  more: () => $("#more").classList.toggle("open"),
  say: el => Voice.speak(el.dataset.text),
  "say-slow": el => Voice.speak(el.dataset.text, true),
  continue: () => { const n = nextActivity(); if (n.day !== undefined) runDay(n.day); else go(n.arg); },
  day: el => runDay(+el.dataset.i),
  "ob-start": () => { OB.name = ($("#ob-name").value || "").trim(); OB.step = 1; OB.i = 0; OB.ans = []; render(); },
  "ob-skip": () => { OB.name = ($("#ob-name").value || "").trim(); OB.level = "A1"; OB.ans = []; OB.step = 2; render(); },
  "ob-ans": el => { const q = D.PLACEMENT[OB.i]; OB.ans[OB.i] = +el.dataset.i === q.a; OB.i++; if (OB.i >= D.PLACEMENT.length) { OB.level = placementLevel(OB.ans); OB.step = 2; } render(); },
  "ob-finish": () => {
    S.profile.level = $("#ob-level").value; if (OB.name) S.profile.name = OB.name;
    S.profile.onboarded = true;
    if (!week()) createWeek(S.profile.level);
    OB = { step: 0, i: 0, ans: [] };
    touchStreak(); Store.save(true); burst("LET'S GO!", "#FFD43B"); go("inicio");
  },
  "open-word": el => { const id = el.dataset.id; const w = getWord(id); if (!w) return; VS.open = id; if (VS.tab === "week" && S.weeks[VS.wk] && !S.weeks[VS.wk].words.includes(id)) { const wi = S.weeks.findIndex(x => x.words.includes(id)); if (wi >= 0) VS.wk = wi; else VS.tab = "bank"; }
    if (routeId() !== "vocabulario") go("vocabulario"); else render(); setTimeout(() => { const d = $("#word-detail"); d && d.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); },
  "close-word": () => { VS.open = null; render(); },
  fav: el => { const id = el.dataset.id; S.fav = S.fav.includes(id) ? S.fav.filter(x => x !== id) : [...S.fav, id]; Store.save(); render(); },
  learn: el => { markLearned(el.dataset.id); burst("LEARNED!", "#2196F3"); render(); },
  "practice-word": el => {
    const w = getWord(el.dataset.id), pool = allWords();
    const qs = [qMeaning(w, pool), qComplete(w, pool), qPtEn(w), Voice.can() ? qListen(w, pool) : qEnPt(w, pool), qOrder(w)];
    if (AI.ok()) qs.push(qCreate(w));
    startSession({ title: `Praticando: ${w.en}`, qs, onEnd: (ok, n) => { if (ok / n >= .6) { markLearned(w.id, true); return `Você dominou "${w.en}"! Ela foi marcada como aprendida.`; } return `Continue praticando "${w.en}". Ela entrou na sua revisão.`; } });
  },
  vtab: el => { VS.tab = el.dataset.tab; if (el.dataset.wk) VS.wk = +el.dataset.wk; VS.open = null; render(); },
  "next-week": () => nextWeek(false),
  "next-week-ai": () => nextWeek(true),
  "next-week-force": () => nextWeek(false, true),
  wia: el => { WI.i = +el.dataset.i; render(); },
  "wia-check": () => {
    const set = D.WIA[WI.i]; let okN = 0;
    set.ctx.forEach((c, i) => {
      const inp = $("#wia-" + i), v = norm(inp.value), ok = c.ans.some(a => norm(a) === v);
      inp.classList.remove("ok", "bad"); inp.classList.add(ok ? "ok" : "bad");
      $("#wia-fb-" + i).textContent = ok ? "✔" : `✘ ${c.ans[0]}: ${c.note}`;
      if (ok) okN++;
      const ts = S.typeStats.complete || (S.typeStats.complete = { ok: 0, bad: 0 }); ok ? ts.ok++ : ts.bad++;
      ok ? L().ok++ : L().bad++;
      if (!ok) S.mistakes.push({ type: "complete", q: c.blank, user: inp.value, right: c.en, why: c.note, at: Date.now() });
    });
    if (okN === set.ctx.length) burst();
    gain(okN * 10 + (set.ctx.length - okN) * 2);
  },
  "wia-own": async () => {
    const set = D.WIA[WI.i], v = $("#wia-own").value.trim(), box = $("#wia-own-fb");
    if (v.split(/\s+/).length < 3) { toast("Escreva uma frase com pelo menos 3 palavras."); return; }
    box.innerHTML = `<span class="typing"><i></i><i></i><i></i></span>`;
    try { const r = await aiCheckSentence(set.w.toLowerCase(), set.ctx.map(c => c.label).join(", "), v, "multiple meanings: " + set.ctx.map(c => c.label).join(", "));
      box.innerHTML = `<div class="fb ${r.correct ? "ok" : "bad"}"><span class="h">${r.correct ? "GREAT!" : "Quase!"}</span>${r.natural && norm(r.natural) !== norm(v) ? `<div>Forma natural: <b>${esc(r.natural)}</b></div>` : ""}<div>${esc(r.explanation_pt || "")}</div></div>`;
      if (r.correct) burst(); record(!!r.correct, "create", null, r.correct ? null : { q: `Frase com ${set.w}`, user: v, right: r.natural || "", why: r.explanation_pt || "" });
    } catch (e) { box.innerHTML = `<div class="fb info">${esc(aiErrorText(e))}</div>`; }
  },
  "sb-struct": el => { SB.s = +el.dataset.i; SB.i = 0; sbInit(); render(); },
  "sb-check": () => sbCheck(),
  "sb-next": () => { SB.i = (SB.i + 1) % D.STRUCTS[SB.s].items.length; if (SB.i === 0) { SB.s = (SB.s + 1) % D.STRUCTS.length; toast(`Próxima estrutura: ${D.STRUCTS[SB.s].title}`); } sbInit(); render(); },
  "sb-reset": () => { sbInit(); render(); },
  "sb-own": async () => {
    const st = D.STRUCTS[SB.s], v = $("#sb-own").value.trim(), box = $("#sb-own-fb");
    if (v.split(/\s+/).length < 3) { toast("Escreva uma frase com pelo menos 3 palavras."); return; }
    box.innerHTML = `<span class="typing"><i></i><i></i><i></i></span>`;
    try { const r = await aiCheckSentence(st.title, "estrutura: " + st.title, v, st.tip);
      box.innerHTML = `<div class="fb ${r.correct ? "ok" : "bad"}"><span class="h">${r.correct ? "AWESOME!" : "Quase!"}</span>${r.natural && norm(r.natural) !== norm(v) ? `<div>Forma natural: <b>${esc(r.natural)}</b></div>` : ""}<div>${esc(r.explanation_pt || "")}</div></div>`;
      if (r.correct) { burst(); S.sentOk++; L().sent++; if (week()) week().stats.sent++; }
      record(!!r.correct, "create", null, r.correct ? null : { q: st.title, user: v, right: r.natural || "", why: r.explanation_pt || "" });
    } catch (e) { box.innerHTML = `<div class="fb info">${esc(aiErrorText(e))}</div>`; }
  },
  "ex-start": el => {
    const mode = el.dataset.mode;
    if (mode === "create" && !AI.ok()) { $("#view").insertAdjacentHTML("afterbegin", pendingAI()); window.scrollTo(0, 0); return; }
    if (mode === "listen" && !Voice.can()) { toast("Este navegador não oferece áudio."); return; }
    const words = shuffle(exWords());
    const n = mode === "create" ? 5 : 10;
    startSession({ title: (MODES.find(m => m.id === mode) || { t: "Sessão mista" }).t, qs: buildQuestions(mode, words, n), onEnd: () => { if (week() && EXSRC === "week") week().stats.ex++; if (mode === "dialog" && week()) week().stats.dlg += SS.ok; return null; } });
  },
  "conv-start": el => { CV.conv = { at: Date.now(), cat: el.dataset.id, msgs: [] }; S.convs.push(CV.conv); if (S.convs.length > 20) S.convs.shift(); convTurn(); },
  "conv-open": el => { CV.conv = S.convs.find(c => c.at === +el.dataset.at) || null; CV.err = ""; render(); },
  "conv-end": () => { CV.conv = null; CV.err = ""; if (Voice.d && CV.listening) Voice.d.stop().catch(() => { }); render(); },
  "conv-retry": () => convTurn(),
  mic: () => {
    const d = Voice.d; if (!d) return;
    if (CV.listening) { d.stop().catch(() => { }); return; }
    const inp = $("#cv-in"); const base = inp.value ? inp.value + " " : "";
    let finals = "";
    d.start().catch(e => { CV.listening = false; render(); toast(e && e.code === "not_granted" ? "Microfone não autorizado. Você pode digitar normalmente." : "Não consegui ativar o microfone."); });
    CV.listening = true; const b = $(".mic"); b && b.classList.add("on");
    if (!d._wired) {
      d._wired = true;
      d.onPartial(({ text }) => { const i = $("#cv-in"); if (i) i.value = (d._base || "") + (d._finals || "") + text; });
      d.onFinal(({ text }) => { d._finals = (d._finals || "") + text + " "; const i = $("#cv-in"); if (i) i.value = (d._base || "") + d._finals; });
      d.onState(({ state }) => { CV.listening = state === "listening"; const m = $(".mic"); m && m.classList.toggle("on", CV.listening); });
    }
    d._base = base; d._finals = finals;
  },
  flash: () => startFlash(),
  flip: () => { SS.shown = true; renderFlash(); if (Voice.can()) Voice.speak(getWord(SS.ids[SS.i]).ex[0][0]); },
  rate: el => rateFlash(+el.dataset.r),
  "rev-ex": () => {
    const ids = [...new Set([...reviewIds(), ...Object.keys(S.words).filter(id => getWord(id) && S.words[id].bad > 0), ...learnedIds()])].slice(0, 10);
    startSession({ title: "Pontos fracos", qs: buildQuestions("mix", ids.map(getWord), 10), onEnd: () => null });
  },
  "pg-wk": el => { PG.wk = +el.dataset.i; render(); },
  "pf-save": () => { S.profile.name = $("#pf-name").value.trim(); const lv = $("#pf-level").value; const changed = lv !== S.profile.level; S.profile.level = lv; S.profile.goal = +$("#pf-goal").value; S.profile.slow = $("#pf-slow").checked; Store.save(); toast(changed ? "Nível alterado! A próxima semana usará o novo nível." : "Perfil salvo."); render(); },
  "pf-test": () => { S.profile.onboarded = false; OB = { step: 1, i: 0, ans: [], name: S.profile.name }; render(); },
  "pf-reset": () => { RESETQ = true; render(); },
  "pf-reset-no": () => { RESETQ = false; render(); },
  "pf-reset-yes": () => { const name = S.profile.name; S = freshState(); S.profile.name = name; RESETQ = false; CV.conv = null; VS = { tab: "week", wk: null, day: null, open: null, q: "", lv: "all", tp: "all" }; Store.save(true); go("inicio"); }
});
document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]");
  if (!el) { if (!e.target.closest("#more") && !e.target.closest("[data-act=more]")) $("#more").classList.remove("open"); return; }
  const f = ACTS[el.dataset.act]; if (!f) return;
  e.preventDefault(); f(el, e);
});
document.addEventListener("submit", e => { if (e.target.id === "cv-form") { e.preventDefault(); const i = $("#cv-in"); const v = i.value; if (CV.listening && Voice.d) Voice.d.stop().catch(() => { }); convSend(v); } });
document.addEventListener("keydown", e => {
  if (e.target.id === "cv-in" && e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#cv-form").requestSubmit(); }
  if (e.key === "Escape" && $("#overlay").classList.contains("open")) { if (SS && (SS.flash || SS.modal)) closeSession(true); else closeSession(false); }
});
document.addEventListener("input", e => {
  if (e.target.id === "v-q") { VS.q = e.target.value; const pos = e.target.selectionStart; render(); const n = $("#v-q"); n.focus(); n.setSelectionRange(pos, pos); }
});
document.addEventListener("change", e => {
  const id = e.target.id;
  if (id === "v-lv") { VS.lv = e.target.value; render(); }
  if (id === "v-tp") { VS.tp = e.target.value; render(); }
  if (id === "ex-src") { EXSRC = e.target.value; }
  if (id === "cv-auto") { CV.auto = e.target.checked; }
});

/* ───────── Início ───────── */
function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { } }
(async function boot() {
  $("#logo-slot").innerHTML = logoSVG(); $("#logo-slot-m").innerHTML = logoSVG();
  Store.idx = Store.loadIdx();
  const local = Store.loadLocal(Store.active()); if (local && local.v === 1) S = Object.assign(freshState(), local);
  if (S.profile.onboarded && S.cur >= 0 && !week()) S.cur = S.weeks.length - 1;
  render(); setSync();
  await Promise.all([Store.init(), AI.init(), Voice.init()]);
  if (S.profile.onboarded && !week()) createWeek();
  if (Store.idx && Store.idx.list.length > 1 && !sessionStorageGet("ec-picked")) { sessionStorageSet("ec-picked", "1"); render(); openProfiles(); return; }
  checkChallenges();
  render();
})();
