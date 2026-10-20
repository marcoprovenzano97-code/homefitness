// HomeFitness — sezione Schede: glossario esercizi (con foto) e composizione delle schede.
// Usa le funzioni comuni di index.html: S, api, run, apri, chiudi, esc, toast, busy, cli, fmtD, preparaFile, sb.

const BLOCCHI = [
  { id: 'riscaldamento', nome: 'Riscaldamento', def: { serie: '1', rip: '10', rec: '' } },
  { id: 'centrale', nome: 'Parte centrale', def: { serie: '3', rip: '10', rec: '90"' } },
  { id: 'defaticamento', nome: 'Defaticamento', def: { serie: '1', rip: '30"', rec: '' } }
];
const ICONE_SEZ = {  // disegno al posto della foto quando manca
  forza: '<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="currentColor"><rect x="14" y="29" width="36" height="6" rx="2"/><rect x="8" y="20" width="7" height="24" rx="2"/><rect x="2" y="25" width="6" height="14" rx="2"/><rect x="49" y="20" width="7" height="24" rx="2"/><rect x="56" y="25" width="6" height="14" rx="2"/></g></svg>',
  core: '<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><circle cx="13" cy="30" r="5" fill="currentColor" stroke="none"/><path d="M19 32 L52 36"/><path d="M22 33 L22 46 M22 46 L30 46"/><path d="M52 36 L56 46"/><path d="M4 50 H60" stroke-width="2"/></g></svg>',
  mob: '<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><circle cx="32" cy="10" r="5" fill="currentColor" stroke="none"/><path d="M32 16 L32 36 M32 22 L18 12 M32 22 L46 12 M32 36 L20 54 M32 36 L48 50"/></g></svg>'
};
const REC_SUGG = ['', '15"', '30"', '45"', '60"', '90"', '2\'', '3\''];

let scTab = 'mie', gloSez = 'forza', gloCat = '', gloQ = '';
const urlFirmati = {};  // percorso → {url, scade}

// ---------- esercizi: glossario + i miei ----------
function tuttiEs() {
  const miei = S.esercizi || [];
  const perBase = {}; miei.forEach(m => { if (m.base) perBase[m.base] = m; });
  const g = ESERCIZI.map(e => { const m = perBase[e.id];
    return Object.assign({}, e, { mio: false, fotoMia: m && m.foto || null, descMia: m && m.descr || '', rid: m && m.id || null }); });
  const p = miei.filter(m => !m.base).map(m => ({ id: 'my:' + m.id, rid: m.id, sez: m.sez, cat: m.cat, nome: m.nome, foto: null, fotoMia: m.foto, desc: m.descr, descMia: '', mio: true }));
  return g.concat(p);
}
function trovaEs(id) { return tuttiEs().find(e => e.id === id) || null; }
/** <img> dell'esercizio: foto mia (privata, firmata) > foto del glossario > disegno */
function imgEs(e, n) {
  if (e && e.fotoMia) return '<img alt="" data-spath="' + esc(e.fotoMia) + '" loading="lazy">';
  if (e && e.foto) return '<img alt="" src="esercizi/' + esc(e.foto) + '-' + (n || 0) + '.jpg" loading="lazy">';
  return '<span class="es-ico">' + ICONE_SEZ[(e && e.sez) || 'forza'] + '</span>';
}
async function firmaImg(box) {
  const els = Array.from(box.querySelectorAll('img[data-spath]'));
  if (!els.length) return;
  if (!sb) { els.forEach(i => i.removeAttribute('data-spath')); return; }
  const ora = Date.now(), servono = [...new Set(els.map(i => i.dataset.spath))].filter(p => !(urlFirmati[p] && urlFirmati[p].scade > ora));
  if (servono.length) {
    const r = await sb.storage.from('schede').createSignedUrls(servono, 3600);
    (r.data || []).forEach((x, i) => { if (x.signedUrl) urlFirmati[servono[i]] = { url: x.signedUrl, scade: ora + 3500e3 }; });
  }
  els.forEach(i => { const u = urlFirmati[i.dataset.spath]; if (u) i.src = u.url; });
}

// ---------- vista principale ----------
function renderSchede() {
  const v = $('v-schede'); if (!v) return;
  $('scSeg').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.t === scTab));
  $('scMie').classList.toggle('hidden', scTab !== 'mie');
  $('scGlo').classList.toggle('hidden', scTab !== 'glo');
  if (scTab === 'mie') renderMie(); else renderGlossario();
}

function contaEs(s) { return BLOCCHI.reduce((n, b) => n + ((s.blocchi || {})[b.id] || []).length, 0); }
function renderMie() {
  const list = (S.schede || []).slice().sort((a, b) => (b.modificata || '').localeCompare(a.modificata || ''));
  $('scList').innerHTML = list.length ? list.map(s => {
    const c = s.cliente ? cli(s.cliente) : null;
    const prime = BLOCCHI.flatMap(b => (s.blocchi[b.id] || [])).slice(0, 4).map(it => { const e = trovaEs(it.es); return '<span class="mini">' + imgEs(e) + '</span>'; }).join('');
    return '<div class="card sc-card" data-id="' + s.id + '"><div class="bar" style="background:' + (c ? esc(c.colore) : 'var(--grid)') + '"></div><div class="main">' +
      '<div class="t"><span>' + esc(s.nome) + '</span><span class="hint">' + contaEs(s) + ' esercizi</span></div>' +
      '<div class="s">' + (c ? esc(c.nome) + ' · ' : '') + 'modificata il ' + fmtD((s.modificata || '').slice(0, 10) || '2000-01-01') + '</div>' +
      '<div class="minis">' + prime + '<button class="btn small ghost sc-pdf" data-pdf="' + s.id + '" aria-label="Scarica il PDF di ' + esc(s.nome) + '">📄 PDF</button></div></div></div>';
  }).join('') : '<div class="empty">Nessuna scheda. Creane una con “+ Nuova scheda”: scegli gli esercizi dal glossario e imposta serie, ripetizioni e recupero.</div>';
  $('scList').querySelectorAll('.card').forEach(el => el.onclick = () => vediScheda(el.dataset.id));
  $('scList').querySelectorAll('[data-pdf]').forEach(b => b.onclick = ev => { ev.stopPropagation(); pdfScheda(S.schede.find(x => x.id === b.dataset.pdf)); });
  firmaImg($('scList'));
}

function filtraEs(sez, cat, q) {
  q = (q || '').trim().toLowerCase();
  return tuttiEs().filter(e => (q ? true : e.sez === sez) && (!cat || q || e.cat === cat) &&
    (!q || (e.nome + ' ' + e.cat + ' ' + (e.desc || '')).toLowerCase().includes(q)));
}
function htmlFiltri(pref) {
  const sz = SEZIONI_ES.find(s => s.id === gloSez);
  return '<div class="seg seg-full" id="' + pref + 'Sez">' + SEZIONI_ES.map(s => '<button data-s="' + s.id + '" class="' + (s.id === gloSez ? 'on' : '') + '">' + s.nome + '</button>').join('') + '</div>' +
    '<input class="cerca" id="' + pref + 'Q" type="search" placeholder="Cerca un esercizio…" value="' + esc(gloQ) + '" aria-label="Cerca un esercizio">' +
    '<div class="pick chips-cat" id="' + pref + 'Cat"><button data-c="" class="' + (!gloCat ? 'on' : '') + '">Tutti</button>' +
    sz.cat.map(c => '<button data-c="' + esc(c) + '" class="' + (c === gloCat ? 'on' : '') + '">' + esc(c) + '</button>').join('') + '</div>';
}
function bindFiltri(pref, ridisegna) {
  $(pref + 'Sez').querySelectorAll('button').forEach(b => b.onclick = () => { gloSez = b.dataset.s; gloCat = ''; ridisegna(true); });
  $(pref + 'Cat').querySelectorAll('button').forEach(b => b.onclick = () => { gloCat = b.dataset.c; ridisegna(true); });
  $(pref + 'Q').oninput = () => { gloQ = $(pref + 'Q').value; ridisegna(false); };
}
function gridEs(list, scelti) {
  if (!list.length) return '<div class="empty">Nessun esercizio trovato.</div>';
  // raggruppa per categoria quando si guardano "Tutti"
  const gruppi = {}; list.forEach(e => (gruppi[e.cat] = gruppi[e.cat] || []).push(e));
  return Object.keys(gruppi).map(c => '<h4 class="es-gruppo">' + esc(c) + '</h4><div class="es-grid">' + gruppi[c].map(e =>
    '<button class="es-card' + (scelti && scelti.has(e.id) ? ' on' : '') + '" data-es="' + esc(e.id) + '"><span class="es-img">' + imgEs(e) + '</span>' +
    '<span class="es-nome">' + esc(e.nome) + (e.mio ? ' <em>mio</em>' : '') + '</span>' + (scelti ? '<span class="es-check" aria-hidden="true">✓</span>' : '') + '</button>').join('') + '</div>').join('');
}

function renderGlossario(rifaiFiltri) {
  if (rifaiFiltri !== false) { $('gloFiltri').innerHTML = htmlFiltri('glo'); bindFiltri('glo', renderGlossario); }
  const sz = SEZIONI_ES.find(s => s.id === gloSez);
  $('gloSub').textContent = gloQ ? 'Risultati della ricerca' : sz.nome + ' — ' + sz.sub;
  $('gloGrid').innerHTML = gridEs(filtraEs(gloSez, gloCat, gloQ));
  $('gloGrid').querySelectorAll('.es-card').forEach(b => b.onclick = () => vediEsercizio(b.dataset.es));
  firmaImg($('gloGrid'));
}

// ---------- scheda di un esercizio ----------
function vediEsercizio(id, dopo) {
  const e = trovaEs(id); if (!e) return;
  const sz = SEZIONI_ES.find(s => s.id === e.sez);
  const foto = e.fotoMia ? '<div class="es-foto">' + imgEs(e) + '</div>'
    : e.foto ? '<div class="es-foto due">' + imgEs(e, 0) + imgEs(e, 1) + '</div>' : '<div class="es-foto vuota">' + imgEs(e) + '<span>Nessuna foto: puoi aggiungerne una tua.</span></div>';
  apri2('<h3>' + esc(e.nome) + '</h3><p class="hint" style="margin:-8px 0 12px">' + esc(sz ? sz.nome : '') + ' · ' + esc(e.cat) + '</p>' + foto +
    '<div class="f"><label>Esecuzione</label><div>' + esc(e.mio ? e.desc : e.desc) + '</div></div>' +
    (!e.mio && e.descMia ? '<div class="f"><label>Le mie note</label><div style="white-space:pre-wrap">' + esc(e.descMia) + '</div></div>' : '') +
    '<div class="actions"><button class="btn ghost" id="eMod">' + (e.mio ? 'Modifica' : '📷 Foto e note mie') + '</button>' + (dopo ? '<button class="btn" id="eOk">Chiudi</button>' : '') + '</div>' +
    (e.foto && !e.fotoMia ? '<p class="hint" style="margin-top:10px">Foto: free-exercise-db (pubblico dominio).</p>' : ''));
  $('eMod').onclick = () => formEsercizio(e);
  if ($('eOk')) $('eOk').onclick = chiudi2;
}

/** Esercizio mio (nuovo o modifica) oppure foto/note mie per un esercizio del glossario. */
function formEsercizio(e) {
  const glossario = e && !e.mio, nuovo = !e;
  e = e || { sez: gloSez, cat: gloCat || SEZIONI_ES.find(s => s.id === gloSez).cat[0], nome: '', desc: '', fotoMia: null };
  const st = { file: null, togli: false, sez: e.sez };
  const catOpt = sez => SEZIONI_ES.find(s => s.id === sez).cat.map(c => '<option' + (c === e.cat ? ' selected' : '') + '>' + esc(c) + '</option>').join('');
  apri2('<h3>' + (glossario ? esc(e.nome) : nuovo ? 'Nuovo esercizio' : 'Modifica esercizio') + '</h3>' +
    (glossario ? '' : '<div class="f"><label for="xN">Nome</label><input id="xN" value="' + esc(e.nome) + '"></div>' +
      '<div class="row2"><div class="f"><label for="xS">Sezione</label><select id="xS">' + SEZIONI_ES.map(s => '<option value="' + s.id + '"' + (s.id === e.sez ? ' selected' : '') + '>' + s.nome + '</option>').join('') + '</select></div>' +
      '<div class="f"><label for="xC">Categoria</label><select id="xC">' + catOpt(e.sez) + '</select></div></div>') +
    '<div class="f"><label for="xD">' + (glossario ? 'Le mie note' : 'Esecuzione') + '</label><textarea id="xD" style="min-height:80px">' + esc(glossario ? e.descMia : e.desc) + '</textarea></div>' +
    '<div class="f"><label>' + (glossario ? 'La mia foto (sostituisce quella del glossario)' : 'Foto') + '</label><div class="files" id="xF"></div>' +
    '<input type="file" id="xFile" accept="image/*" class="hidden"></div>' +
    '<div class="actions">' + (!nuovo && !glossario ? '<button class="btn danger" id="xDel">Elimina</button>' : '') + '<button class="btn ghost" id="xNo">Annulla</button><button class="btn" id="xOk">Salva</button></div>');
  const aggF = () => {
    const c = st.file ? '<div class="file"><img src="' + st.file.prev + '" alt=""><button type="button" class="rm" id="xRm">✕</button></div>'
      : (e.fotoMia && !st.togli) ? '<div class="file">' + imgEs({ fotoMia: e.fotoMia }) + '<button type="button" class="rm" id="xRm">✕</button></div>' : '';
    $('xF').innerHTML = c + '<div class="file add" id="xAdd"><span class="ic">📷</span>' + (c ? 'Cambia' : 'Aggiungi') + '</div>';
    $('xAdd').onclick = () => $('xFile').click();
    if ($('xRm')) $('xRm').onclick = () => { if (st.file) st.file = null; else st.togli = true; aggF(); };
    firmaImg($('xF'));
  };
  aggF();
  if ($('xS')) $('xS').onchange = () => { st.sez = $('xS').value; e.cat = ''; $('xC').innerHTML = catOpt(st.sez); };
  $('xFile').onchange = async ev => { const f = ev.target.files[0]; ev.target.value = ''; if (!f) return;
    try { st.file = await preparaFile(f); st.togli = false; aggF(); } catch (err) { toast(err.message, true); } };
  $('xNo').onclick = () => (nuovo ? chiudi2() : vediEsercizio(e.id));
  if ($('xDel')) $('xDel').onclick = async () => {
    const usi = (S.schede || []).filter(s => BLOCCHI.some(b => (s.blocchi[b.id] || []).some(it => it.es === e.id))).length;
    if (!confirm('Eliminare “' + e.nome + '”?' + (usi ? ' È usato in ' + usi + ' schede: lì resterà solo il nome.' : ''))) return;
    if (await run('eliminaEsercizio', [e.rid], 'Esercizio eliminato')) { chiudi2(); renderSchede(); }
  };
  $('xOk').onclick = async () => {
    const dati = glossario ? { id: e.rid, base: e.id, nome: e.nome, sez: e.sez, cat: e.cat, descr: $('xD').value.trim() }
      : { id: e.rid, base: null, nome: $('xN').value.trim(), sez: $('xS').value, cat: $('xC').value, descr: $('xD').value.trim() };
    if (!dati.nome) return toast('Scrivi il nome', true);
    const vecchiaFoto = e.fotoMia || null;
    const ok = await run('salvaEsercizio', [dati, st.file, st.togli || (st.file && vecchiaFoto) ? vecchiaFoto : null], 'Salvato ✓');
    if (ok) { renderSchede(); const id = glossario ? e.id : (dati.id ? 'my:' + dati.id : null); if (id && trovaEs(id)) vediEsercizio(id); else chiudi2(); }
  };
}

// ---------- vedere / stampare una scheda ----------
function righeItem(it) {
  const p = [];
  if (it.serie) p.push(it.serie + (it.rip ? ' × ' + it.rip : ' serie'));
  else if (it.rip) p.push(it.rip);
  if (it.carico) p.push(it.carico);
  if (it.rec) p.push('rec. ' + it.rec);
  return p.join(' · ');
}
function nomeItem(it) { const e = trovaEs(it.es); return e ? e.nome : (it.nome || 'Esercizio'); }
function testoScheda(s) {
  const c = s.cliente ? cli(s.cliente) : null;
  let t = s.nome + (c ? ' – ' + c.nome : '');
  BLOCCHI.forEach(b => {
    const its = s.blocchi[b.id] || [];
    if (!its.length) return;
    t += '\n\n' + b.nome.toUpperCase() + '\n' + its.map(it => '• ' + nomeItem(it) + (righeItem(it) ? ': ' + righeItem(it) : '') + (it.note ? ' (' + it.note + ')' : '')).join('\n');
  });
  if (s.note) t += '\n\nNote: ' + s.note;
  return t;
}
function htmlBlocchi(s) {
  return BLOCCHI.map(b => {
    const its = s.blocchi[b.id] || [];
    if (!its.length) return '';
    return '<div class="sv-blocco"><h4>' + b.nome + '</h4>' + its.map((it, i) => { const e = trovaEs(it.es);
      return '<div class="sv-it"><span class="sv-img">' + imgEs(e || { sez: 'forza' }) + '</span><div><b>' + (i + 1) + '. ' + esc(nomeItem(it)) + '</b>' +
        '<div class="sv-dati">' + esc(righeItem(it)) + '</div>' + (it.note ? '<div class="hint">' + esc(it.note) + '</div>' : '') + '</div></div>'; }).join('') + '</div>';
  }).join('') || '<div class="empty">Scheda vuota.</div>';
}
function vediScheda(id, daLezione) {
  const s = (S.schede || []).find(x => x.id === id); if (!s) return toast('Scheda non trovata', true);
  const c = s.cliente ? cli(s.cliente) : null;
  const html = '<h3>' + esc(s.nome) + '</h3><p class="hint" style="margin:-8px 0 12px">' + (c ? esc(c.nome) + ' · ' : '') + contaEs(s) + ' esercizi</p>' +
    htmlBlocchi(s) + (s.note ? '<div class="f" style="margin-top:10px"><label>Note</label><div style="white-space:pre-wrap">' + esc(s.note) + '</div></div>' : '') +
    '<button class="btn" id="sPdf" style="width:100%;padding:12px;margin-top:6px">📄 Scarica PDF</button>' +
    '<div class="actions wrapbtn"><button class="btn ghost" id="sPrint">🖨️ Stampa</button><button class="btn ghost" id="sShare">📤 Condividi testo</button>' +
    (daLezione ? '' : '<button class="btn ghost" id="sDup">Duplica</button>') + '<button class="btn ghost" id="sMod">Modifica</button></div>';
  (daLezione ? apri2 : apri)(html);
  firmaImg($(daLezione ? 'sheet2' : 'sheet'));
  $('sMod').onclick = () => { if (daLezione) chiudi2(); editorScheda(s); };
  $('sPrint').onclick = () => stampaScheda(s);
  $('sPdf').onclick = () => pdfScheda(s);
  $('sShare').onclick = () => condividi(testoScheda(s), s.nome);
  if ($('sDup')) $('sDup').onclick = () => editorScheda(Object.assign(JSON.parse(JSON.stringify(s)), { id: null, nome: s.nome + ' (copia)' }));
}
async function condividi(testo, titolo) {
  try { if (navigator.share) { await navigator.share({ title: titolo, text: testo }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(testo); toast('Testo copiato: incollalo dove vuoi (es. WhatsApp)'); } catch (e) { toast('Impossibile copiare', true); }
}
async function stampaScheda(s) {
  const c = s.cliente ? cli(s.cliente) : null, oggi = new Date();
  const box = $('stampa');
  box.innerHTML = '<div class="st-head"><img src="icons/icon-192.png" alt=""><div><h1>' + esc(s.nome) + '</h1><p>' + (c ? esc(c.nome) + ' · ' : '') +
    oggi.getDate() + '/' + (oggi.getMonth() + 1) + '/' + oggi.getFullYear() + '</p></div></div>' + htmlBlocchi(s) +
    (s.note ? '<p class="st-note"><b>Note:</b> ' + esc(s.note) + '</p>' : '');
  // la pagina di stampa è nascosta: le foto vanno caricate subito (niente lazy) e senza aspettare all'infinito
  box.querySelectorAll('img').forEach(i => { i.loading = 'eager'; });
  busy(true);
  try {
    await firmaImg(box);
    const caricate = Promise.all(Array.from(box.querySelectorAll('img')).map(i => i.complete && i.src ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    await Promise.race([caricate, new Promise(r => setTimeout(r, 5000))]);
  } finally { busy(false); }
  window.print();
}

// ---------- PDF vero (file da salvare o mandare), anche dal telefono ----------
let jspdfPronto = null;
function caricaJsPDF() {
  if (window.jspdf) return Promise.resolve();
  return jspdfPronto || (jspdfPronto = new Promise((ok, ko) => {
    const sc = document.createElement('script'); sc.src = 'vendor/jspdf.umd.min.js';
    sc.onload = ok; sc.onerror = () => { jspdfPronto = null; ko(new Error('Impossibile preparare il PDF: controlla la connessione')); };
    document.head.appendChild(sc);
  }));
}
/** Foto dell'esercizio ritagliata 3:2 come JPEG (dataURL); il disegno se la foto manca. */
async function fotoPerPdf(e) {
  let src;
  if (e && e.fotoMia && sb) {
    const u = urlFirmati[e.fotoMia];
    if (u && u.scade > Date.now()) src = u.url;
    else { const r = await sb.storage.from('schede').createSignedUrl(e.fotoMia, 600); src = r.data && r.data.signedUrl; }
  } else if (e && e.foto) src = 'esercizi/' + e.foto + '-0.jpg';
  if (!src) {
    const svg = ICONE_SEZ[(e && e.sez) || 'forza'].replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" ').replace(/currentColor/g, '#2a78d6');
    src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  return new Promise(ok => {
    const img = new Image(); img.crossOrigin = 'anonymous';
    img.onload = () => {
      const cv = document.createElement('canvas'); cv.width = 360; cv.height = 240;
      const g = cv.getContext('2d'); g.fillStyle = src.startsWith('data:image/svg') ? '#eef4fc' : '#ffffff'; g.fillRect(0, 0, 360, 240);
      if (src.startsWith('data:image/svg')) g.drawImage(img, 120, 60, 120, 120);
      else { const k = Math.max(360 / img.width, 240 / img.height), w = img.width * k, h = img.height * k; g.drawImage(img, (360 - w) / 2, (240 - h) / 2, w, h); }
      try { ok(cv.toDataURL('image/jpeg', 0.82)); } catch (err) { ok(null); }
    };
    img.onerror = () => ok(null);
    img.src = src;
  });
}
const pdfTxt = t => String(t == null ? '' : t).replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/•/g, '-').replace(/…/g, '...');

async function pdfScheda(s) {
  busy(true);
  try {
    await caricaJsPDF();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210, H = 297, M = 14, BLU = [42, 120, 214], GRIGIO = [95, 94, 90];
    const c = s.cliente ? cli(s.cliente) : null, oggi = new Date();
    const data = pad(oggi.getDate()) + '/' + pad(oggi.getMonth() + 1) + '/' + oggi.getFullYear();
    // intestazione
    const logo = await new Promise(ok => { const i = new Image(); i.onload = () => { const cv = document.createElement('canvas'); cv.width = cv.height = 192; cv.getContext('2d').drawImage(i, 0, 0); ok(cv.toDataURL('image/png')); }; i.onerror = () => ok(null); i.src = 'icons/icon-192.png'; });
    if (logo) doc.addImage(logo, 'PNG', M, M - 2, 13, 13);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.setTextColor(20, 20, 20);
    doc.text(pdfTxt(s.nome), M + 17, M + 4.5);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...GRIGIO);
    doc.text(pdfTxt((c ? c.nome + '  ·  ' : '') + data + '  ·  ' + contaEs(s) + ' esercizi'), M + 17, M + 10);
    doc.setDrawColor(...BLU); doc.setLineWidth(0.8); doc.line(M, M + 14, W - M, M + 14);
    let y = M + 22;
    const fineRiga = H - 16;
    const titoloBlocco = (nome, cont) => {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...BLU);
      doc.text(pdfTxt(nome.toUpperCase() + (cont ? '  (continua)' : '')), M, y);
      doc.setDrawColor(220, 224, 230); doc.setLineWidth(0.3); doc.line(M, y + 1.8, W - M, y + 1.8);
      y += 6;
    };
    for (const b of BLOCCHI) {
      const its = s.blocchi[b.id] || [];
      if (!its.length) continue;
      if (y + 30 > fineRiga) { doc.addPage(); y = M + 6; }
      titoloBlocco(b.nome);
      for (let i = 0; i < its.length; i++) {
        const it = its[i], e = trovaEs(it.es);
        const dati = [it.serie ? 'Serie ' + it.serie : '', it.rip ? 'Ripetizioni ' + it.rip : '', it.rec ? 'Recupero ' + it.rec : '', it.carico ? 'Carico ' + it.carico : ''].filter(Boolean).join('   ·   ');
        const tx = M + 38, tw = W - M - tx;
        doc.setFontSize(9.5); doc.setFont('helvetica', 'italic');
        const note = it.note ? doc.splitTextToSize(pdfTxt(it.note), tw) : [];
        doc.setFont('helvetica', 'normal');
        const esec = e && e.desc ? doc.splitTextToSize(pdfTxt(e.desc), tw).slice(0, 2) : [];
        const hRiga = Math.max(24, 7 + 5 + esec.length * 4 + note.length * 4 + 3);
        if (y + hRiga > fineRiga) { doc.addPage(); y = M + 6; titoloBlocco(b.nome, true); }
        const foto = await fotoPerPdf(e || { sez: 'forza' });
        if (foto) { doc.addImage(foto, 'JPEG', M, y, 33, 22); doc.setDrawColor(230, 230, 230); doc.setLineWidth(0.2); doc.rect(M, y, 33, 22); }
        let ty = y + 4.5;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11.5); doc.setTextColor(20, 20, 20);
        doc.text(pdfTxt((i + 1) + '. ' + nomeItem(it)), tx, ty); ty += 5.5;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...BLU);
        if (dati) { doc.text(pdfTxt(dati), tx, ty); ty += 5; }
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GRIGIO);
        esec.forEach(r => { doc.text(r, tx, ty); ty += 4; });
        doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(60, 60, 60);
        note.forEach(r => { doc.text(r, tx, ty); ty += 4; });
        y += hRiga;
        doc.setDrawColor(235, 235, 235); doc.setLineWidth(0.2); doc.line(M, y - 1.5, W - M, y - 1.5);
      }
      y += 4;
    }
    if (s.note) {
      doc.setFontSize(10); doc.setFont('helvetica', 'normal');
      const r = doc.splitTextToSize(pdfTxt(s.note), W - 2 * M);
      if (y + 8 + r.length * 4.5 > fineRiga) { doc.addPage(); y = M + 6; }
      doc.setFont('helvetica', 'bold'); doc.setTextColor(20, 20, 20); doc.text('Note', M, y); y += 5;
      doc.setFont('helvetica', 'normal'); doc.setTextColor(60, 60, 60); doc.text(r, M, y);
    }
    // piè di pagina
    const n = doc.getNumberOfPages();
    for (let p = 1; p <= n; p++) {
      doc.setPage(p); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(150, 150, 150);
      doc.text('HomeFitness', M, H - 8);
      doc.text('Pagina ' + p + ' di ' + n, W - M, H - 8, { align: 'right' });
    }
    const nomeFile = ('Scheda - ' + s.nome + (c ? ' - ' + c.nome : '')).replace(/[\\/:*?"<>|]+/g, '').trim() + '.pdf';
    const file = new File([doc.output('blob')], nomeFile, { type: 'application/pdf' });
    busy(false);
    // sul telefono: menu "Condividi" (salva in File, WhatsApp, email…); sul PC: scarica
    if (matchMedia('(pointer: coarse)').matches && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: s.nome }); return; }
      catch (err) { if (err && err.name === 'AbortError') return; }
    }
    doc.save(nomeFile);
    toast('PDF scaricato ✓');
  } catch (err) {
    toast((err && err.message) || 'Errore nel creare il PDF', true);
  } finally { busy(false); }
}

// ---------- composizione ----------
function editorScheda(s0, preset) {
  const s = s0 ? JSON.parse(JSON.stringify(s0)) : { id: null, nome: '', cliente: (preset && preset.cliente) || null, note: '', blocchi: {} };
  BLOCCHI.forEach(b => { s.blocchi[b.id] = s.blocchi[b.id] || []; });
  const nuovo = !s.id;
  let cambiato = false;
  const clienti = S.clienti.filter(c => c.attivo || c.id === s.cliente).sort((a, b) => a.nome.localeCompare(b.nome));
  apri('<h3>' + (nuovo ? 'Nuova scheda' : 'Modifica scheda') + '</h3>' +
    '<div class="row2"><div class="f" style="flex:2"><label for="kN">Nome della scheda</label><input id="kN" value="' + esc(s.nome) + '" placeholder="Es. Forza A – total body"></div>' +
    '<div class="f"><label for="kC">Cliente <span class="hint">facoltativo</span></label><select id="kC"><option value="">Nessuno</option>' +
    clienti.map(c => '<option value="' + c.id + '"' + (c.id === s.cliente ? ' selected' : '') + '>' + esc(c.nome) + '</option>').join('') + '</select></div></div>' +
    '<div id="kBlocchi"></div>' +
    '<div class="f"><label for="kNo">Note</label><textarea id="kNo" style="min-height:60px" placeholder="Obiettivo, progressione, indicazioni…">' + esc(s.note) + '</textarea></div>' +
    '<datalist id="recList">' + REC_SUGG.filter(Boolean).map(r => '<option value="' + esc(r) + '">').join('') + '</datalist>' +
    '<div class="actions">' + (nuovo ? '' : '<button class="btn danger" id="kDel">Elimina</button>') + '<button class="btn" id="kSave">Salva scheda</button></div>', 'wide');
  $('sheet').dataset.editor = '1';
  const disegna = () => {
    $('kBlocchi').innerHTML = BLOCCHI.map(b => {
      const its = s.blocchi[b.id];
      return '<div class="kb"><div class="kb-h"><h4>' + b.nome + ' <span class="hint">' + (its.length ? its.length + ' esercizi' : '') + '</span></h4>' +
        '<button class="btn small" data-add="' + b.id + '">+ Aggiungi esercizi</button></div>' +
        (its.length ? its.map((it, i) => { const e = trovaEs(it.es);
          return '<div class="kit" data-b="' + b.id + '" data-i="' + i + '"><span class="kit-img">' + imgEs(e || { sez: 'forza' }) + '</span>' +
            '<div class="kit-main"><div class="kit-nome"><b>' + esc(nomeItem(it)) + '</b><span class="kit-az">' +
            '<button data-mv="-1" aria-label="Sposta su"' + (i ? '' : ' disabled') + '>↑</button><button data-mv="1" aria-label="Sposta giù"' + (i < its.length - 1 ? '' : ' disabled') + '>↓</button>' +
            '<button data-rm aria-label="Togli">✕</button></span></div>' +
            '<div class="kit-campi">' +
            '<label>Serie<input data-k="serie" inputmode="numeric" value="' + esc(it.serie) + '"></label>' +
            '<label>Ripetizioni / tempo<input data-k="rip" value="' + esc(it.rip) + '" placeholder="10 / 30&quot;"></label>' +
            '<label>Recupero<input data-k="rec" list="recList" value="' + esc(it.rec) + '" placeholder="—"></label>' +
            '<label>Carico<input data-k="carico" value="' + esc(it.carico || '') + '" placeholder="kg / elastico"></label>' +
            '</div><input class="kit-note" data-k="note" value="' + esc(it.note || '') + '" placeholder="Note (facoltative)"></div></div>'; }).join('')
          : '<div class="kb-vuoto">Nessun esercizio: tocca “+ Aggiungi esercizi”.</div>') + '</div>';
    }).join('');
    $('kBlocchi').querySelectorAll('[data-add]').forEach(btn => btn.onclick = () => scegliEsercizi(btn.dataset.add, ids => {
      const b = BLOCCHI.find(x => x.id === btn.dataset.add);
      ids.forEach(id => { const e = trovaEs(id), def = Object.assign({}, b.def);
        if (e && e.sez === 'mob' && b.id !== 'centrale') def.rip = '30"';
        s.blocchi[b.id].push(Object.assign({ es: id, nome: e ? e.nome : '', carico: '', note: '' }, def)); });
      cambiato = true; disegna();
    }));
    $('kBlocchi').querySelectorAll('.kit').forEach(row => {
      const arr = s.blocchi[row.dataset.b], i = Number(row.dataset.i);
      row.querySelectorAll('input[data-k]').forEach(inp => inp.oninput = () => { arr[i][inp.dataset.k] = inp.value; cambiato = true; });
      row.querySelectorAll('[data-mv]').forEach(btn => btn.onclick = () => { const j = i + Number(btn.dataset.mv); [arr[i], arr[j]] = [arr[j], arr[i]]; cambiato = true; disegna(); });
      row.querySelector('[data-rm]').onclick = () => { arr.splice(i, 1); cambiato = true; disegna(); };
      row.querySelector('.kit-img').onclick = () => vediEsercizio(arr[i].es, true);
    });
    firmaImg($('kBlocchi'));
  };
  disegna();
  ['kN', 'kNo'].forEach(id => $(id).addEventListener('input', () => { cambiato = true; }));
  $('sheet')._prima = () => !cambiato || confirm('Uscire senza salvare la scheda?');
  if (!nuovo) $('kDel').onclick = async () => {
    if (!confirm('Eliminare la scheda “' + s.nome + '”? Le lezioni già segnate conservano il testo della scheda.')) return;
    if (await run('eliminaScheda', [s.id], 'Scheda eliminata')) { cambiato = false; chiudi(); }
  };
  $('kSave').onclick = async () => {
    s.nome = $('kN').value.trim(); s.cliente = $('kC').value || null; s.note = $('kNo').value.trim();
    if (!s.nome) { $('kN').focus(); return toast('Dai un nome alla scheda', true); }
    if (!contaEs(s)) return toast('Aggiungi almeno un esercizio', true);
    if (!s.id) s.id = nuovoId();
    if (await run('salvaScheda', [s], 'Scheda salvata ✓')) { cambiato = false; vediScheda(s.id); }
  };
}

/** Selettore dal glossario (secondo livello sopra l'editor): onOk(ids) */
function scegliEsercizi(blocco, onOk) {
  const scelti = new Set();
  if (!gloQ && blocco === 'riscaldamento' && gloSez === 'forza' && !gloCat) gloSez = 'mob';
  const b = BLOCCHI.find(x => x.id === blocco);
  apri2('<h3>Aggiungi a: ' + b.nome + '</h3><div id="pkFiltri"></div><div id="pkGrid" class="pk-grid"></div>' +
    '<div class="actions pk-azioni"><button class="btn ghost" id="pkNuovo">+ Esercizio mio</button><button class="btn" id="pkOk" disabled>Aggiungi</button></div>', 'wide');
  const ridisegna = rifai => {
    if (rifai !== false) { $('pkFiltri').innerHTML = htmlFiltri('pk'); bindFiltri('pk', ridisegna); }
    $('pkGrid').innerHTML = gridEs(filtraEs(gloSez, gloCat, gloQ), scelti);
    $('pkGrid').querySelectorAll('.es-card').forEach(c => c.onclick = () => {
      const id = c.dataset.es; if (scelti.has(id)) scelti.delete(id); else scelti.add(id);
      c.classList.toggle('on', scelti.has(id));
      $('pkOk').disabled = !scelti.size; $('pkOk').textContent = scelti.size ? 'Aggiungi ' + scelti.size : 'Aggiungi';
    });
    firmaImg($('pkGrid'));
  };
  ridisegna(true);
  $('pkOk').onclick = () => { const ids = Array.from(scelti); chiudi2(); onOk(ids); };
  $('pkNuovo').onclick = () => formEsercizio(null);
}

// ---------- secondo livello di fogli ----------
function apri2(html, cls) {
  $('sheet2').className = 'sheet' + (cls ? ' ' + cls : '');
  $('sheet2').innerHTML = '<button class="x" onclick="chiudi2()" aria-label="Chiudi">×</button>' + html;
  $('ov2').classList.add('open'); $('sheet2').scrollTop = 0;
  firmaImg($('sheet2'));
}
function chiudi2() { $('ov2').classList.remove('open'); }
$('ov2').addEventListener('click', e => { if (e.target === $('ov2')) chiudi2(); });

// ---------- eventi della sezione ----------
$('scSeg').querySelectorAll('button').forEach(b => b.onclick = () => { scTab = b.dataset.t; renderSchede(); });
$('scNuova').onclick = () => editorScheda(null);
$('gloNuovo').onclick = () => formEsercizio(null);
