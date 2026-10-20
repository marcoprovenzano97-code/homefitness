// HomeFitness — Home: resoconto di tutto quello che ha fatto l'atleta selezionato.
// Usa le funzioni comuni di index.html (S, cli, saldo, numeri, ordLez, …) e di schede.js (trovaEs, imgEs, firmaImg, vediScheda).

let dhCliente = null;
try { dhCliente = localStorage.getItem('hf-home-atleta'); } catch (e) {}

const giorniFa = d => Math.round((parse(OGGI) - parse(d)) / 864e5);
const quando = n => n === 0 ? 'oggi' : n === 1 ? 'ieri' : n < 0 ? 'tra ' + (-n) + ' giorni' : n + ' giorni fa';

function renderHome() {
  const sel = $('dhSel'); if (!sel) return;
  const attivi = S.clienti.filter(c => c.attivo).sort((a, b) => a.nome.localeCompare(b.nome));
  const archiviati = S.clienti.filter(c => !c.attivo).sort((a, b) => a.nome.localeCompare(b.nome));
  if (!S.clienti.length) {
    sel.innerHTML = ''; sel.disabled = true;
    $('dhBody').innerHTML = '<div class="empty" style="margin-top:12px">Qui vedrai il resoconto di ogni atleta. Aggiungi il primo cliente nella sezione <b>Clienti</b>.</div>';
    return;
  }
  sel.disabled = false;
  // atleta predefinito: l'ultimo scelto, altrimenti quello dell'ultima lezione
  if (!S.clienti.some(c => c.id === dhCliente)) {
    const ult = S.lezioni.slice().sort(ordLez).pop();
    dhCliente = ult ? ult.cliente : (attivi[0] || S.clienti[0]).id;
  }
  sel.innerHTML = attivi.map(c => '<option value="' + c.id + '">' + esc(c.nome) + '</option>').join('') +
    (archiviati.length ? '<optgroup label="Archiviati">' + archiviati.map(c => '<option value="' + c.id + '">' + esc(c.nome) + '</option>').join('') + '</optgroup>' : '');
  sel.value = dhCliente;
  sel.onchange = () => { dhCliente = sel.value; try { localStorage.setItem('hf-home-atleta', dhCliente); } catch (e) {} renderHome(); };
  disegnaHome(cli(dhCliente));
}

function disegnaHome(c) {
  const nn = numeri(), s = saldo(c.id);
  const ls = S.lezioni.filter(l => l.cliente === c.id).sort(ordLez);
  const ps = S.pagamenti.filter(p => p.cliente === c.id).sort((a, b) => b.d.localeCompare(a.d));
  const fatte = ls.filter(l => l.d <= OGGI), prossime = ls.filter(l => l.d > OGGI);
  const ult = fatte[fatte.length - 1];
  // frequenza: lezioni nelle ultime 8 settimane / 8
  const da8 = new Date(parse(OGGI)); da8.setDate(da8.getDate() - 55);
  const in8 = fatte.filter(l => l.d >= iso(da8)).length;
  const freq = Math.round(in8 / 8 * 10) / 10;
  const schede = (S.schede || []).filter(x => x.cliente === c.id).sort((a, b) => (b.modificata || '').localeCompare(a.modificata || ''));

  const saldoTxt = s.saldo < -0.005 ? '<b class="neg">' + eur(-s.saldo) + '</b><span>ti deve</span>'
    : s.saldo > 0.005 ? '<b class="pos">' + eur(s.saldo) + '</b><span>credito (pagato in anticipo)</span>' : '<b>0 €</b><span>in pari</span>';

  $('dhBody').innerHTML =
    '<div class="dh-head"><span class="dh-dot" style="background:' + esc(c.colore) + '"></span><div><h2>' + esc(c.nome) + '</h2>' +
    '<div class="hint">' + (fatte.length ? 'Prima lezione nell’app il ' + fmtD(fatte[0].d) : 'Nessuna lezione segnata nell’app') +
    (c.prec ? ' · ' + c.prec + ' lezioni fatte prima' : '') + (c.tel ? ' · <a href="tel:' + esc(c.tel) + '">' + esc(c.tel) + '</a>' : '') + '</div></div></div>' +

    '<div class="dh-kpi">' +
      '<div class="kpi"><span>Lezioni fatte</span><b>' + (c.prec + fatte.length) + '</b>' + (prossime.length ? '<em>+' + prossime.length + ' in programma</em>' : '') + '</div>' +
      '<div class="kpi"><span>Ultima lezione</span><b>' + (ult ? quando(giorniFa(ult.d)) : '—') + '</b>' + (ult ? '<em>' + fmtD(ult.d) + ' · n° ' + nn[ult.id] + '</em>' : '') + '</div>' +
      '<div class="kpi"><span>Frequenza</span><b>' + freq.toLocaleString('it-IT') + '</b><em>lezioni a settimana (ultime 8)</em></div>' +
      '<div class="kpi"><span>Conto</span>' + saldoTxt + '</div>' +
    '</div>' +

    '<div class="dh-azioni"><button class="btn" id="dhLez">+ Segna lezione</button><button class="btn ghost" id="dhSch">+ Nuova scheda</button>' +
    (s.saldo < -0.005 ? '<button class="btn ghost" id="dhPag">Registra pagamento</button>' : '') + '<button class="btn ghost" id="dhCli">Dati cliente</button></div>' +

    '<div class="dh-grid">' +
      '<div class="dh-box dh-largo"><h3>Lezioni al mese <span class="hint">ultimi 12 mesi</span></h3><div id="dhChart" class="dh-chart"></div></div>' +
      '<div class="dh-box"><h3>Ultime lezioni</h3><div id="dhLezioni"></div></div>' +
      '<div class="dh-box"><h3>Esercizi più fatti</h3><div id="dhEs"></div></div>' +
      '<div class="dh-box"><h3>Schede</h3><div id="dhSchede"></div></div>' +
      '<div class="dh-box"><h3>Pagamenti</h3><div id="dhPagamenti"></div></div>' +
      (c.note ? '<div class="dh-box"><h3>Note</h3><div style="white-space:pre-wrap;font-size:14px">' + esc(c.note) + '</div></div>' : '') +
    '</div>';

  graficoMesi(fatte);

  // ultime lezioni (più recenti prima), con le prossime in cima
  const elenco = prossime.slice(0, 3).concat(fatte.slice(-8).reverse());
  $('dhLezioni').innerHTML = elenco.length ? elenco.map(l => {
    const sc = l.scheda_id && (S.schede || []).find(x => x.id === l.scheda_id);
    return '<button class="dh-riga" data-l="' + l.id + '"><span><b>n° ' + nn[l.id] + '</b> · ' + fmtD(l.d) + (l.d > OGGI ? ' <em class="dh-pross">in programma</em>' : '') +
      '<small>' + esc(sc ? '📋 ' + sc.nome : (l.scheda || '').split('\n')[0] || 'nessuna scheda') + '</small></span><span>' + eur(l.importo) + '</span></button>';
  }).join('') : '<div class="hint">Nessuna lezione.</div>';
  $('dhLezioni').querySelectorAll('[data-l]').forEach(b => b.onclick = () => vediLezione(b.dataset.l));

  // esercizi più fatti: dalle schede collegate alle lezioni svolte
  const conta = {}, perSez = { forza: 0, core: 0, mob: 0 };
  let conScheda = 0;
  fatte.forEach(l => {
    const sc = l.scheda_id && (S.schede || []).find(x => x.id === l.scheda_id);
    if (!sc) return;
    conScheda++;
    BLOCCHI.forEach(b => (sc.blocchi[b.id] || []).forEach(it => {
      conta[it.es] = (conta[it.es] || 0) + 1;
      const e = trovaEs(it.es); if (e && perSez[e.sez] !== undefined) perSez[e.sez]++;
    }));
  });
  const top = Object.keys(conta).sort((a, b) => conta[b] - conta[a]).slice(0, 8);
  const totSez = perSez.forza + perSez.core + perSez.mob;
  $('dhEs').innerHTML = top.length
    ? '<div class="dh-sez">' + SEZIONI_ES.map(z => { const p = totSez ? Math.round(perSez[z.id] / totSez * 100) : 0;
        return '<div><span>' + z.nome + '</span><b>' + p + '%</b><i style="--p:' + p + '%"></i></div>'; }).join('') + '</div>' +
      top.map(id => { const e = trovaEs(id);
        return '<div class="dh-es"><span class="sv-img">' + imgEs(e || { sez: 'forza' }) + '</span><span>' + esc(e ? e.nome : 'Esercizio') + '</span><b>' + conta[id] + '×</b></div>'; }).join('') +
      '<p class="hint" style="margin:8px 0 0">Da ' + conScheda + ' lezioni con una scheda della sezione Schede.</p>'
    : '<div class="hint">Comparirà quando segnerai le lezioni scegliendo una scheda dalla sezione Schede.</div>';

  $('dhSchede').innerHTML = schede.length ? schede.map(x => {
    const volte = fatte.filter(l => l.scheda_id === x.id).length;
    return '<button class="dh-riga" data-s="' + x.id + '"><span><b>' + esc(x.nome) + '</b><small>' + contaEs(x) + ' esercizi · usata ' + volte + (volte === 1 ? ' volta' : ' volte') + '</small></span><span>›</span></button>';
  }).join('') : '<div class="hint">Nessuna scheda intestata a ' + esc(c.nome.split(' ')[0]) + '.</div>';
  $('dhSchede').querySelectorAll('[data-s]').forEach(b => b.onclick = () => vediScheda(b.dataset.s));

  $('dhPagamenti').innerHTML = '<div class="dh-conto"><div><span>Dovuto</span><b>' + eur(s.dov) + '</b></div><div><span>Pagato</span><b>' + eur(s.pag) + '</b></div></div>' +
    (ps.length ? ps.slice(0, 5).map(p => '<div class="dh-riga statica"><span>' + fmtD(p.d) + (p.metodo ? ' · ' + esc(p.metodo) : '') + '</span><span class="pos">+' + eur(p.importo) + '</span></div>').join('')
      : '<div class="hint">Nessun pagamento registrato.</div>');

  $('dhLez').onclick = () => formLezione(null, { cliente: c.id, d: OGGI });
  $('dhSch').onclick = () => editorScheda(null, { cliente: c.id });
  if ($('dhPag')) $('dhPag').onclick = () => formPagamento(null, c.id);
  $('dhCli').onclick = () => vediCliente(c.id);
  firmaImg($('dhBody'));
}

/** Barre: lezioni svolte per mese, ultimi 12 mesi. Una sola serie → nessuna legenda; tooltip al passaggio/tocco. */
function graficoMesi(fatte) {
  const box = $('dhChart'), oggi = parse(OGGI), mesi = [];
  for (let i = 11; i >= 0; i--) { const d = new Date(oggi.getFullYear(), oggi.getMonth() - i, 1); mesi.push({ k: d.getFullYear() + '-' + pad(d.getMonth() + 1), d, n: 0 }); }
  fatte.forEach(l => { const m = mesi.find(x => x.k === l.d.slice(0, 7)); if (m) m.n++; });
  const max = Math.max(4, ...mesi.map(m => m.n));
  const passo = max <= 8 ? 2 : max <= 20 ? 5 : 10, top = Math.ceil(max / passo) * passo;
  const W = Math.max(280, Math.round(box.clientWidth || 600)), H = 190, L = 28, R = 6, T = 10, B = 26, cw = (W - L - R) / 12, bw = Math.min(30, cw * 0.62);
  const y = v => T + (H - T - B) * (1 - v / top);
  let g = '';
  for (let v = 0; v <= top; v += passo) g += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '" class="gl' + (v ? '' : ' base') + '"/><text x="' + (L - 6) + '" y="' + (y(v) + 4) + '" class="ax" text-anchor="end">' + v + '</text>';
  mesi.forEach((m, i) => {
    const x = L + cw * i + (cw - bw) / 2, h = (H - T - B) - (y(m.n) - T), y0 = H - B;
    if (m.n) { const r = Math.min(4, h, bw / 2);
      g += '<path class="bar" d="M' + x + ',' + y0 + ' V' + (y0 - h + r) + ' Q' + x + ',' + (y0 - h) + ' ' + (x + r) + ',' + (y0 - h) + ' H' + (x + bw - r) + ' Q' + (x + bw) + ',' + (y0 - h) + ' ' + (x + bw) + ',' + (y0 - h + r) + ' V' + y0 + ' Z"/>'; }
    g += '<text x="' + (L + cw * i + cw / 2) + '" y="' + (H - 8) + '" class="ax" text-anchor="middle">' + MESI[m.d.getMonth()].slice(0, 3) + '</text>' +
      '<rect class="hit" x="' + (L + cw * i) + '" y="' + T + '" width="' + cw + '" height="' + (H - T - B) + '" data-i="' + i + '"><title>' + MESI[m.d.getMonth()] + ' ' + m.d.getFullYear() + ': ' + m.n + ' lezioni</title></rect>';
  });
  box.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Lezioni al mese negli ultimi 12 mesi: ' +
    mesi.map(m => MESI[m.d.getMonth()] + ' ' + m.n).join(', ') + '">' + g + '</svg><div class="dh-tip" role="status"></div>';
  const tip = box.querySelector('.dh-tip');
  box.querySelectorAll('.hit').forEach(r => {
    const mostra = () => { const m = mesi[r.dataset.i];
      tip.innerHTML = '<b>' + m.n + '</b> ' + (m.n === 1 ? 'lezione' : 'lezioni') + '<br><span>' + MESI[m.d.getMonth()] + ' ' + m.d.getFullYear() + '</span>';
      const bb = r.getBoundingClientRect(), bx = box.getBoundingClientRect();
      tip.style.left = Math.min(bx.width - 110, Math.max(0, bb.left - bx.left + bb.width / 2 - 55)) + 'px'; tip.classList.add('on');
      box.querySelectorAll('.hit').forEach(x => x.classList.toggle('sel', x === r)); };
    r.addEventListener('mouseenter', mostra); r.addEventListener('click', mostra);
  });
  box.addEventListener('mouseleave', () => { tip.classList.remove('on'); box.querySelectorAll('.hit').forEach(x => x.classList.remove('sel')); });
}

// ridisegna il grafico se cambia la larghezza (rotazione del telefono, finestra del PC)
let dhResize = null;
window.addEventListener('resize', () => { clearTimeout(dhResize); dhResize = setTimeout(() => { if ($('v-home').classList.contains('on') && $('dhChart')) renderHome(); }, 200); });
