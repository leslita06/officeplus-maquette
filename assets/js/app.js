/* Office Plus · boutique de démonstration (maquette proposée par Yelema, non publiée).
   Tout est simulé dans le navigateur : aucun paiement, aucune donnée envoyée. */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const app = $('#app');
  const P = OP.P, BYID = Object.fromEntries(P.map(p => [p.id, p]));
  const img = n => 'assets/img/' + n + '.jpg';
  const fcfa = n => n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, '\u202f') + '\u00a0F\u00a0CFA';
  const fcfaPdf = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem('op2_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('op2_' + k, JSON.stringify(v)); } catch (e) { } }
  };
  let panier = store.get('panier', {});
  let commandes = store.get('commandes', []);
  let imprimante = store.get('imprimante', '');
  const ICO = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
    camion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    boite: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/></svg>',
    recu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h7M9 17h5"/></svg>',
    maison: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    outil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>',
    bouclier: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6zM14 2v6h6"/></svg>',
    repet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
    encre: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.7s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/></svg>',
    graph: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 15l4-4 3 3 5-6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
    horloge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    filtre: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>',
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>'
  };
  const PAY = {
    wave: { nom: 'Wave', court: 'W', bg: '#1DC8FF', mm: 1 },
    om: { nom: 'Orange Money', court: 'OM', bg: '#FF7900', mm: 1 },
    momo: { nom: 'MTN MoMo', court: 'MoMo', bg: '#FFCB05', fg: '#1F2523', mm: 1 },
    moov: { nom: 'Moov Money', court: 'Moov', bg: '#0066B3', mm: 1 },
    carte: { nom: 'Carte bancaire', court: 'VISA', bg: '#1A1F71' },
    livraison: { nom: 'Paiement à la livraison', court: 'F', bg: '#5E6662' },
    bc30: { nom: 'Bon de commande, virement à 30 jours', court: 'BC', bg: '#007E59', b2b: 1 }
  };
  const STATUTS = { recue: 'Reçue', preparee: 'Préparée', livraison: 'En livraison', livree: 'Livrée' };
  const ORDRE = ['recue', 'preparee', 'livraison', 'livree'];

  /* ---------- utilitaires ---------- */
  function toast(t) { const el = $('#toast'); $('span', el).textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2600); }
  function srcLabel(p) {
    if (p.src === 'facture') return '<span class="src ok" title="' + OP.SRC.facture + '"><i></i>Prix facturé le 17/09/2026</span>';
    if (p.src === 'facebook') return '<span class="src ok" title="' + OP.SRC.facebook + '"><i></i>Prix publié sur Facebook, à confirmer</span>';
    return '<span class="src ind"><i></i>Prix indicatif, à confirmer</span>';
  }
  function stockLabel(p) {
    if (p.stock <= 0) return '<span class="stock non"><i></i>Sur commande</span>';
    if (p.stock <= 5) return '<span class="stock bas"><i></i>Plus que ' + p.stock + ' en stock</span>';
    return '<span class="stock ok"><i></i>En stock</span>';
  }
  function carte(p) {
    return '<article class="carte">' +
      (p.top ? '<span class="tag top">Meilleure vente</span>' : '') + (p.stock <= 0 ? '<span class="tag rupt">Sur commande</span>' : '') +
      '<a class="im" href="#/produit/' + p.id + '"><img loading="lazy" src="' + img(p.img) + '" alt="' + esc(p.nom) + '">' + (p.teinte ? '<span class="teinte" style="background:' + p.teinte + '"></span>' : '') + '</a>' +
      '<div class="bd"><span class="mq">' + esc(p.marque) + ' · ' + OP.CATS[p.cat].court + '</span><h3><a href="#/produit/' + p.id + '">' + esc(p.nom) + '</a></h3>' + stockLabel(p) +
      '<div class="pied"><div><div class="prix">' + fcfa(p.prix) + '</div>' + srcLabel(p) + '</div>' +
      '<button class="add" data-add="' + p.id + '" aria-label="Ajouter ' + esc(p.nom) + ' au panier">' + ICO.plus + '</button></div></div></article>';
  }
  function nbPanier() { return Object.values(panier).reduce((a, b) => a + b, 0); }
  function totalPanier() { return Object.entries(panier).reduce((a, [id, q]) => a + (BYID[id] ? BYID[id].prix * q : 0), 0); }
  function majPanier() { store.set('panier', panier); const n = nbPanier(); $('#nb').textContent = n; $('#nb2').textContent = n; }
  function ajouter(id, q) {
    q = q || 1; const p = BYID[id]; if (!p) return;
    panier[id] = (panier[id] || 0) + q; majPanier(); toast(q + ' × ' + p.nom + ' ajouté au panier');
  }
  function heureAbidjan() { const d = new Date(); return d.getUTCHours() + d.getUTCMinutes() / 60; }
  function avantDix() { return heureAbidjan() < 10; }
  function tempsAvantDix() {
    const d = new Date(); const m = 600 - (d.getUTCHours() * 60 + d.getUTCMinutes());
    return m > 0 ? Math.floor(m / 60) + ' h ' + String(m % 60).padStart(2, '0') : null;
  }
  function ref(prefix) { const d = new Date(); return prefix + '-' + String(d.getUTCFullYear()).slice(2) + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0') + '-' + Math.floor(100 + Math.random() * 900); }
  function dateFr(d) { return d.toLocaleDateString('fr-FR', { timeZone: 'UTC' }); }
  function waLien(t) { return 'https://wa.me/' + OP.WA + '?text=' + encodeURIComponent(t); }
  function modale(html) { $('#modale-in').innerHTML = '<button class="x" data-fermer aria-label="Fermer">×</button>' + html; $('#modale').classList.add('on'); }
  function fermer() { $('#modale').classList.remove('on'); }
  $('#modale').addEventListener('click', e => { if (e.target.id === 'modale' || e.target.closest('[data-fermer]')) fermer(); });

  /* ---------- navigation catégories ---------- */
  $('#navcats').innerHTML = '<a href="#/catalogue" data-c="">Tous les produits</a>' + Object.entries(OP.CATS).map(([k, c]) => '<a href="#/catalogue/' + k + '" data-c="' + k + '">' + c.nom + '</a>').join('') + '<a href="#/entreprise" data-c="b2b">Espace entreprise</a><a href="#/suivi" data-c="suivi">Suivre ma commande</a>';
  $('#waflot').href = waLien('Bonjour Office Plus, j\'ai une question sur une commande.');

  /* ---------- recherche ---------- */
  const q = $('#q'), sugg = $('#sugg');
  function cherche(t) {
    t = t.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!t) return [];
    const mots = t.split(/\s+/);
    return P.filter(p => { const h = (p.nom + ' ' + p.marque + ' ' + (p.ref || '') + ' ' + OP.CATS[p.cat].nom + ' ' + (p.compat || []).join(' ')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); return mots.every(m => h.includes(m)); });
  }
  q.addEventListener('input', () => {
    const r = cherche(q.value).slice(0, 6);
    sugg.innerHTML = r.length ? r.map(p => '<a href="#/produit/' + p.id + '"><img src="' + img(p.img) + '" alt=""><span>' + esc(p.nom) + '<small>' + fcfa(p.prix) + ' · ' + OP.CATS[p.cat].court + '</small></span></a>').join('') + '<a href="#/catalogue?q=' + encodeURIComponent(q.value) + '"><span><b>Voir tous les résultats pour « ' + esc(q.value) + ' »</b></span></a>' : (q.value.trim() ? '<a href="#/catalogue"><span>Aucun produit. Voir tout le catalogue</span></a>' : '');
    sugg.classList.toggle('on', !!q.value.trim());
  });
  q.addEventListener('keydown', e => { if (e.key === 'Enter') { location.hash = '#/catalogue?q=' + encodeURIComponent(q.value); sugg.classList.remove('on'); q.blur(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) sugg.classList.remove('on'); });
  sugg.addEventListener('click', () => { sugg.classList.remove('on'); q.value = ''; });

  /* ---------- clics globaux ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]');
    if (a && !a.disabled) { e.preventDefault(); ajouter(a.dataset.add, 1); a.innerHTML = ICO.check; setTimeout(() => { a.innerHTML = ICO.plus; }, 1200); }
  });

  /* ---------- pages ---------- */
  function pAccueil() {
    const tops = P.filter(p => p.top);
    const reste = tempsAvantDix();
    app.innerHTML =
      '<section class="hero"><span class="ring" style="width:420px;height:420px;right:-120px;top:-160px"></span><span class="ring" style="width:220px;height:220px;left:44%;bottom:-120px"></span><div class="wrap">' +
      '<div><span class="pill">' + ICO.camion.replace('<svg', '<svg width="16" height="16"') + 'Livraison le jour même à Abidjan</span>' +
      '<h1>Tout pour votre bureau<em>commandé en 2 minutes, livré aujourd\'hui.</em></h1>' +
      '<p>Fournitures, cartouches et toners, matériel et mobilier. Payez par Wave, Orange Money, MTN MoMo, Moov Money, carte, à la livraison, ou sur bon de commande pour les entreprises.</p>' +
      '<div class="ctas"><a class="btn btn-e" href="#/catalogue">Voir le catalogue</a><a class="btn btn-l" href="#/entreprise">Espace entreprise</a></div></div>' +
      '<div class="ph"><img src="' + img('p-ensemble') + '" alt="Bureaux équipés"><div class="chrono">' +
      (reste ? '<small>Commandez dans les</small><b>' + reste + '</b><small>pour être livré aujourd\'hui</small>' : '<small>Commandé avant 10 h,</small><b>livré le jour même</b><small>Après 10 h : livraison le jour ouvré suivant</small>') +
      '<div class="src">Engagement publié par Office Plus sur sa page Facebook</div></div></div></div></section>' +
      '<section class="atouts"><div class="wrap">' +
      '<div class="atout"><i>' + ICO.camion + '</i><div><b>Livré le jour même</b><span>si commandé avant 10 h</span></div></div>' +
      '<div class="atout"><i>' + ICO.outil + '</i><div><b>Mobilier livré et monté</b><span>gratuitement, partout à Abidjan</span></div></div>' +
      '<div class="atout"><i>' + ICO.tel + '</i><div><b>Mobile Money</b><span>Wave, Orange, MTN, Moov</span></div></div>' +
      '<div class="atout"><i>' + ICO.recu + '</i><div><b>Comptes entreprises</b><span>bon de commande, facture normalisée</span></div></div>' +
      '</div></section>' +
      '<section class="sec"><div class="wrap"><div class="sec-t"><div><span class="kicker">Nos rayons</span><h2 class="titre">Quatre rayons, une seule commande</h2></div></div><div class="gcats">' +
      Object.entries(OP.CATS).map(([k, c]) => '<a class="gcat" href="#/catalogue/' + k + '"><img src="' + img(c.img) + '" alt=""><div><b>' + c.nom + '</b><span>' + P.filter(p => p.cat === k).length + ' articles</span></div></a>').join('') +
      '</div></div></section>' +
      '<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-t"><div><span class="kicker">Ce que les bureaux commandent le plus</span><h2 class="titre">Meilleures ventes</h2></div><a class="btn btn-l btn-s" href="#/catalogue">Tout le catalogue</a></div><div class="grille">' +
      tops.slice(0, 8).map(carte).join('') + '</div></div></section>' +
      '<section class="sec" style="padding-top:0"><div class="wrap"><div class="bande"><div class="tx"><span class="kicker" style="color:#FFB27A">Cartouches et toners</span><h2>La bonne cartouche, <span>du premier coup</span></h2><p style="opacity:.85">Indiquez votre imprimante : le site vous dit si la cartouche est compatible avant que vous ne la commandiez.</p><div><a class="btn btn-o" href="#/catalogue/cartouches">Trouver ma cartouche</a></div></div><img src="' + img('p-imprimante') + '" alt="Copieur de bureau"></div></div></section>' +
      '<section class="sec" style="padding-top:0"><div class="wrap duo">' +
      '<div class="box"><span class="kicker">Pour les entreprises</span><h3>Un compte pour toute votre structure</h3><ul class="liste-check"><li>Commande sur bon de commande, virement à 30 jours</li><li>Liste d\'achats du mois, recommandée en un clic</li><li>Devis PDF et factures téléchargeables</li><li>Alerte quand vos cartouches arrivent en fin de vie</li></ul><a class="btn btn-v" href="#/entreprise">Découvrir l\'espace entreprise</a></div>' +
      '<div class="box" style="background:var(--orange-c);border-color:#F8C9A0"><span class="kicker">Mobilier</span><h3>Livré et monté, sans frais</h3><p style="color:#4A524E;margin:8px 0 16px">Fauteuils, chaises visiteurs, armoires, tables de réunion : l\'équipe Office Plus livre et monte vos meubles partout à Abidjan.</p><a class="btn btn-o" href="#/catalogue/mobilier">Voir le mobilier</a></div>' +
      '</div></section>';
  }

  const F = { cats: [], marques: [], max: 0, stock: false, tri: 'pert', q: '' };
  function pCatalogue(cat, query) {
    F.cats = cat ? [cat] : (F._from === 'nav' ? [] : F.cats); F._from = '';
    if (cat === undefined && !query) F.cats = [];
    F.q = query || '';
    const prixMax = Math.max(...P.map(p => p.prix));
    if (!F.max) F.max = prixMax;
    const marques = [...new Set(P.map(p => p.marque))].sort();
    app.innerHTML = '<div class="wrap"><div class="fil"><a href="#/">Accueil</a> › Catalogue' + (cat ? ' › ' + OP.CATS[cat].nom : '') + '</div><div class="catal">' +
      '<aside class="filtres" id="filtres"><div style="display:flex;justify-content:space-between;align-items:center"><h4>Catégorie</h4><button class="lien btn-filtres" data-ferme-f style="text-decoration:none">Fermer ×</button></div>' +
      Object.entries(OP.CATS).map(([k, c]) => '<label><input type="checkbox" name="cat" value="' + k + '"' + (F.cats.includes(k) ? ' checked' : '') + '>' + c.court + '<small>' + P.filter(p => p.cat === k).length + '</small></label>').join('') +
      '<h4>Marque</h4>' + marques.map(m => '<label><input type="checkbox" name="marque" value="' + esc(m) + '"' + (F.marques.includes(m) ? ' checked' : '') + '>' + esc(m) + '<small>' + P.filter(p => p.marque === m).length + '</small></label>').join('') +
      '<h4>Prix maximum</h4><input type="range" id="fmax" min="2000" max="' + prixMax + '" step="1000" value="' + F.max + '"><div class="px"><span>2 000 F</span><b id="fmaxv">' + fcfa(+F.max) + '</b></div>' +
      '<h4>Disponibilité</h4><label><input type="checkbox" id="fstock"' + (F.stock ? ' checked' : '') + '>En stock uniquement</label>' +
      '<button class="btn btn-l btn-s" id="freset" style="margin-top:16px;width:100%">Effacer les filtres</button></aside>' +
      '<div><div class="barre-cat"><div><h1>' + (F.q ? 'Résultats pour « ' + esc(F.q) + ' »' : (F.cats.length === 1 ? OP.CATS[F.cats[0]].nom : 'Tous les produits')) + '</h1><span id="cpt" style="color:var(--gris);font-size:13.5px"></span></div>' +
      '<div style="display:flex;gap:8px"><button class="btn btn-l btn-s btn-filtres" id="ouvre-f">' + ICO.filtre + 'Filtres</button><label class="sr" for="tri">Trier</label><select id="tri"><option value="pert">Pertinence</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option><option value="nom">Nom A → Z</option></select></div></div>' +
      '<div class="grille" id="res" style="grid-template-columns:repeat(3,1fr)"></div></div></div></div>';
    $('#tri').value = F.tri;
    const rend = () => {
      F.cats = $$('input[name=cat]:checked').map(i => i.value);
      F.marques = $$('input[name=marque]:checked').map(i => i.value);
      F.max = +$('#fmax').value; F.stock = $('#fstock').checked; F.tri = $('#tri').value;
      $('#fmaxv').textContent = fcfa(F.max);
      let r = F.q ? cherche(F.q) : P.slice();
      r = r.filter(p => (!F.cats.length || F.cats.includes(p.cat)) && (!F.marques.length || F.marques.includes(p.marque)) && p.prix <= F.max && (!F.stock || p.stock > 0));
      if (F.tri === 'asc') r.sort((a, b) => a.prix - b.prix); else if (F.tri === 'desc') r.sort((a, b) => b.prix - a.prix); else if (F.tri === 'nom') r.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
      $('#cpt').textContent = r.length + ' article' + (r.length > 1 ? 's' : '');
      $('#res').innerHTML = r.length ? r.map(carte).join('') : '<div class="vide" style="grid-column:1/-1">Aucun article ne correspond. <button class="lien" id="freset2">Effacer les filtres</button></div>';
      const r2 = $('#freset2'); if (r2) r2.onclick = reset;
    };
    const reset = () => { $$('#filtres input[type=checkbox]').forEach(i => i.checked = false); $('#fmax').value = prixMax; F.q = ''; rend(); };
    $('#filtres').addEventListener('input', rend); $('#tri').onchange = rend; $('#freset').onclick = reset;
    $('#ouvre-f').onclick = () => $('#filtres').classList.add('on');
    $('[data-ferme-f]').onclick = () => $('#filtres').classList.remove('on');
    rend();
    const g = $('#res'); const mq = matchMedia('(max-width:1080px)');
    const cols = () => { g.style.gridTemplateColumns = matchMedia('(max-width:820px)').matches ? '' : (mq.matches ? 'repeat(2,1fr)' : 'repeat(3,1fr)'); };
    cols(); window.onresize = cols;
  }

  function toutesImprimantes() { return [...new Set(P.flatMap(p => p.compat || []))].concat(['Canon i-SENSYS MF643Cdw', 'Epson EcoTank L3250', 'HP LaserJet Pro M404dn']).sort(); }
  function pProduit(id) {
    const p = BYID[id]; if (!p) return pCatalogue();
    const imgs = [p.img].concat(p.imgs || []);
    const lies = P.filter(x => x.cat === p.cat && x.id !== p.id).sort((a, b) => (b.top || 0) - (a.top || 0)).slice(0, 4);
    app.innerHTML = '<div class="wrap"><div class="fil"><a href="#/">Accueil</a> › <a href="#/catalogue/' + p.cat + '">' + OP.CATS[p.cat].nom + '</a> › ' + esc(p.nom) + '</div><div class="fiche">' +
      '<div class="galerie"><div class="min">' + imgs.map((m, i) => '<button data-im="' + m + '" class="' + (i ? '' : 'on') + '"><img src="' + img(m) + '" alt=""></button>').join('') + '</div>' +
      '<div class="grand">' + (p.top ? '<span class="tag top">Meilleure vente</span>' : '') + (p.teinte ? '<span class="teinte" style="background:' + p.teinte + ';width:34px;height:34px"></span>' : '') + '<img id="gimg" src="' + img(p.img) + '" alt="' + esc(p.nom) + '"></div></div>' +
      '<div><span class="kicker">' + esc(p.marque) + ' · ' + OP.CATS[p.cat].nom + '</span><h1>' + esc(p.nom) + '</h1><div class="ref">' + (p.ref ? 'Réf. Office Plus ' + p.ref + ' · ' : '') + 'Vendu à l\'unité : ' + p.unite + '</div>' +
      '<div class="prixg">' + fcfa(p.prix) + ' <small>/ ' + p.unite + '</small></div>' + srcLabel(p) +
      '<p class="desc">' + esc(p.desc) + '</p>' + stockLabel(p) + ' <small style="color:var(--gris);font-size:11.5px">(stock de démonstration)</small>' +
      (p.compat ? '<div class="compat"><b>' + ICO.check.replace('<svg', '<svg width="20" height="20"') + 'Compatible avec votre imprimante ?</b><label class="sr" for="impr">Votre imprimante</label><select id="impr"><option value="">Choisissez votre modèle d\'imprimante…</option>' + toutesImprimantes().map(m => '<option' + (m === imprimante ? ' selected' : '') + '>' + m + '</option>').join('') + '</select><div class="res" id="cres"></div></div>' : '') +
      '<div class="achat"><div class="qte"><button data-q="-1" aria-label="Moins">−</button><input id="qt" type="number" min="1" value="1" aria-label="Quantité"><button data-q="1" aria-label="Plus">+</button></div>' +
      '<button class="btn btn-v" id="ajout">' + ICO.plus + 'Ajouter au panier</button><button class="btn btn-o" id="direct">Commander maintenant</button></div>' +
      '<table class="carac">' + p.carac.map(c => '<tr><td>' + esc(c[0]) + '</td><td>' + esc(c[1]) + '</td></tr>').join('') + (p.compat ? '<tr><td>Imprimantes compatibles</td><td>' + p.compat.join('<br>') + '</td></tr>' : '') + '</table>' +
      '<div class="garanties"><div>' + ICO.camion + '<span>' + (avantDix() ? '<b>Livré aujourd\'hui</b> si vous commandez avant 10 h' : 'Commandé maintenant : <b>livré demain</b>') + '</span></div><div>' + (p.cat === 'mobilier' ? ICO.outil + '<span><b>Livré et monté</b> gratuitement</span>' : ICO.bouclier + '<span>Paiement Mobile Money ou à la livraison</span>') + '</div></div>' +
      '</div></div>' +
      '<section style="padding:10px 0 60px"><div class="sec-t"><h2 class="titre" style="font-size:28px">Dans le même rayon</h2></div><div class="grille">' + lies.map(carte).join('') + '</div></section></div>';
    $$('.galerie .min button').forEach(b => b.onclick = () => { $('#gimg').src = img(b.dataset.im); $$('.galerie .min button').forEach(x => x.classList.toggle('on', x === b)); });
    const qt = $('#qt');
    $$('[data-q]').forEach(b => b.onclick = () => { qt.value = Math.max(1, (+qt.value || 1) + +b.dataset.q); });
    $('#ajout').onclick = () => ajouter(p.id, Math.max(1, +qt.value || 1));
    $('#direct').onclick = () => { ajouter(p.id, Math.max(1, +qt.value || 1)); location.hash = '#/panier'; };
    if (p.compat) {
      const s = $('#impr'), r = $('#cres');
      const v = () => {
        imprimante = s.value; store.set('imprimante', imprimante);
        if (!s.value) { r.className = 'res'; r.innerHTML = ''; return; }
        const ok = p.compat.includes(s.value);
        const alt = ok ? null : P.find(x => x.compat && x.compat.includes(s.value));
        r.className = 'res ' + (ok ? 'oui' : 'non');
        r.innerHTML = ok ? ICO.check.replace('<svg', '<svg width="18" height="18"') + 'Oui, compatible avec votre ' + esc(s.value) : 'Non compatible avec votre ' + esc(s.value) + (alt ? '. <a href="#/produit/' + alt.id + '" style="color:inherit">Voir la cartouche qui convient</a>' : '. Écrivez-nous sur WhatsApp, on vous la trouve.');
      };
      s.onchange = v; v();
    }
  }

  function lignesPanier() { return Object.entries(panier).filter(([id, q]) => BYID[id] && q > 0); }
  function resumeHtml(btn) {
    const L = lignesPanier(); const t = totalPanier(); const mob = L.some(([id]) => BYID[id].cat === 'mobilier');
    const ind = L.some(([id]) => !BYID[id].src);
    return '<aside class="resume"><h3>Récapitulatif</h3>' +
      '<div class="l"><span>Articles (' + nbPanier() + ')</span><b>' + fcfa(t) + '</b></div>' +
      '<div class="l"><span>Livraison</span><span style="text-align:right">' + (mob ? 'Mobilier livré et monté offert<br>' : '') + '<small style="color:var(--gris)">Frais à confirmer par Office Plus</small></span></div>' +
      '<div class="l t"><span>Total</span><span>' + fcfa(t) + '</span></div>' +
      (ind ? '<p class="note">Certains prix sont indicatifs : Office Plus confirme le montant avant la livraison.</p>' : '') +
      (btn || '') + '<p class="note">' + ICO.bouclier.replace('<svg', '<svg width="14" height="14" style="vertical-align:-2px"') + ' Démonstration : aucun paiement réel n\'est effectué.</p></aside>';
  }
  function pPanier() {
    const L = lignesPanier();
    if (!L.length) { app.innerHTML = '<div class="wrap" style="padding:50px 0 70px"><h1 class="page-t">Votre panier</h1><div class="vide"><p style="margin-bottom:16px">Votre panier est vide.</p><a class="btn btn-o" href="#/catalogue">Voir le catalogue</a> <a class="btn btn-l" href="#/entreprise/liste">Charger ma liste du mois</a></div></div>'; return; }
    app.innerHTML = '<div class="wrap"><div class="fil"><a href="#/">Accueil</a> › Panier</div><h1 class="page-t">Votre panier</h1><div class="cmd"><div class="bloc">' +
      L.map(([id, qn]) => { const p = BYID[id]; return '<div class="ligne"><img src="' + img(p.img) + '" alt=""><div><b>' + esc(p.nom) + '</b><span style="font-size:13px;color:var(--gris)">' + fcfa(p.prix) + ' / ' + p.unite + '</span><br>' + srcLabel(p) + '<button class="suppr" data-del="' + id + '">Retirer</button></div><div class="qte"><button data-pq="' + id + '" data-d="-1" aria-label="Moins">−</button><input value="' + qn + '" data-pi="' + id + '" type="number" min="1" aria-label="Quantité"><button data-pq="' + id + '" data-d="1" aria-label="Plus">+</button></div><div class="tot">' + fcfa(p.prix * qn) + '</div></div>'; }).join('') +
      '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:14px"><a class="btn btn-l btn-s" href="#/catalogue">Continuer mes achats</a><button class="btn btn-l btn-s" id="devispdf">' + ICO.doc + 'Transformer en devis PDF</button></div></div>' +
      resumeHtml('<a class="btn btn-o" href="#/commande" style="width:100%;margin-top:14px">Passer la commande</a>') + '</div></div>';
    $$('[data-pq]').forEach(b => b.onclick = () => { const id = b.dataset.pq; panier[id] = Math.max(1, panier[id] + +b.dataset.d); majPanier(); pPanier(); });
    $$('[data-pi]').forEach(i => i.onchange = () => { panier[i.dataset.pi] = Math.max(1, +i.value || 1); majPanier(); pPanier(); });
    $$('[data-del]').forEach(b => b.onclick = () => { delete panier[b.dataset.del]; majPanier(); pPanier(); });
    $('#devispdf').onclick = () => devisPdf(lignesPanier());
  }

  let CMD = { pay: 'wave', creneau: '' };
  function creneaux() {
    const a = avantDix();
    return [
      { v: 'auj', t: 'Aujourd\'hui, 14 h – 18 h', s: a ? 'Commandé avant 10 h' : 'Disponible pour toute commande passée avant 10 h', dis: !a },
      { v: 'dem-m', t: 'Prochain jour ouvré, 8 h – 12 h', s: 'Matin' },
      { v: 'dem-a', t: 'Prochain jour ouvré, 14 h – 18 h', s: 'Après-midi' }
    ];
  }
  function pCommande() {
    const L = lignesPanier(); if (!L.length) { location.hash = '#/panier'; return; }
    const cr = creneaux(); if (!CMD.creneau || cr.find(c => c.v === CMD.creneau && c.dis)) CMD.creneau = cr.find(c => !c.dis).v;
    const S = OP.SOCIETE;
    app.innerHTML = '<div class="wrap"><div class="fil"><a href="#/">Accueil</a> › <a href="#/panier">Panier</a> › Commande</div><h1 class="page-t">Finaliser la commande</h1>' +
      '<div class="etapes"><span class="ok"><i>✓</i>Panier</span><span class="on"><i>2</i>Livraison et paiement</span><span><i>3</i>Confirmation</span></div>' +
      '<div class="cmd"><form id="fcmd" novalidate>' +
      '<div class="bloc"><h3><i>1</i>Vos coordonnées</h3><div style="margin:-6px 0 12px"><button type="button" class="lien" id="prefill">Je suis client entreprise : remplir avec mon compte (exemple)</button></div><div class="champs">' +
      '<div class="champ"><label for="c-nom">Nom et prénom *</label><input id="c-nom" autocomplete="name"><span class="err">Indiquez votre nom.</span></div>' +
      '<div class="champ"><label for="c-tel">Téléphone (WhatsApp) *</label><input id="c-tel" inputmode="tel" placeholder="07 00 00 00 00"><span class="err">Numéro à 10 chiffres, ex. 07 00 00 00 00.</span></div>' +
      '<div class="champ l2"><label for="c-org">Entreprise ou structure (facultatif)</label><input id="c-org" placeholder="Pour une facture au nom de votre structure"></div></div></div>' +
      '<div class="bloc"><h3><i>2</i>Livraison à Abidjan</h3><div class="champs">' +
      '<div class="champ"><label for="c-commune">Commune *</label><select id="c-commune"><option value="">Choisir…</option>' + OP.COMMUNES.map(c => '<option>' + c + '</option>').join('') + '</select><span class="err">Choisissez la commune.</span></div>' +
      '<div class="champ"><label for="c-adr">Quartier, rue, repère *</label><input id="c-adr" placeholder="Ex. : Zone 4, rue du Dr Blanchard, immeuble bleu"><span class="err">Un repère aide le livreur.</span></div></div>' +
      '<p style="font-size:13px;font-weight:600;margin:16px 0 8px">Créneau de livraison</p><div class="choix" id="cren">' +
      cr.map(c => '<label class="opt' + (c.dis ? ' dis' : '') + (CMD.creneau === c.v ? ' on' : '') + '"><input type="radio" name="cren" value="' + c.v + '"' + (c.dis ? ' disabled' : '') + (CMD.creneau === c.v ? ' checked' : '') + '><span>' + ICO.horloge.replace('<svg', '<svg width="20" height="20" style="flex:0 0 20px;color:var(--vert-f)"') + '</span><span><b>' + c.t + '</b><small>' + c.s + '</small></span></label>').join('') + '</div></div>' +
      '<div class="bloc"><h3><i>3</i>Paiement</h3><div class="choix pay2" id="pay">' +
      Object.entries(PAY).map(([k, m]) => '<label class="opt' + (CMD.pay === k ? ' on' : '') + '"' + (m.b2b ? ' style="grid-column:span 2"' : '') + '><input type="radio" name="pay" value="' + k + '"' + (CMD.pay === k ? ' checked' : '') + '><span class="lg" style="background:' + m.bg + ';color:' + (m.fg || '#fff') + '">' + m.court + '</span><span><b>' + m.nom + '</b>' + (m.b2b ? '<small>Entreprises avec compte validé</small>' : (m.mm ? '<small>Confirmation sur votre téléphone</small>' : '')) + '</span></label>').join('') +
      '</div><div class="b2b-note" id="b2bnote">Votre bon de commande est rattaché au compte <b>' + esc(S.nom) + '</b> (exemple). Office Plus émet la facture normalisée à la livraison ; règlement par virement à 30 jours.</div></div>' +
      '</form>' + resumeHtml('<button class="btn btn-o" id="payer" style="width:100%;margin-top:14px">Payer ' + fcfa(totalPanier()) + '</button>') + '</div></div>';
    const maj = () => {
      $$('#cren .opt').forEach(o => o.classList.toggle('on', $('input', o).checked));
      $$('#pay .opt').forEach(o => o.classList.toggle('on', $('input', o).checked));
      CMD.pay = ($('input[name=pay]:checked') || {}).value || 'wave'; CMD.creneau = ($('input[name=cren]:checked') || {}).value;
      $('#b2bnote').classList.toggle('on', CMD.pay === 'bc30');
      $('#payer').textContent = CMD.pay === 'livraison' ? 'Confirmer la commande' : CMD.pay === 'bc30' ? 'Envoyer le bon de commande' : 'Payer ' + fcfa(totalPanier());
    };
    $('#fcmd').addEventListener('change', maj); maj();
    $('#fcmd').addEventListener('input', e => { const c = e.target.closest('.champ'); if (c) c.classList.remove('bad'); });
    $('#fcmd').addEventListener('change', e => { const c = e.target.closest('.champ'); if (c && e.target.value) c.classList.remove('bad'); });
    $('#prefill').onclick = () => { $('#c-nom').value = S.contact; $('#c-tel').value = S.tel; $('#c-org').value = S.nom; $('#c-commune').value = S.commune; $('#c-adr').value = S.adresse; $('input[name=pay][value=bc30]').checked = true; maj(); $$('.champ.bad').forEach(c => c.classList.remove('bad')); };
    $('#payer').onclick = () => {
      const v = {
        nom: $('#c-nom').value.trim(), tel: $('#c-tel').value.replace(/\D/g, ''), org: $('#c-org').value.trim(), commune: $('#c-commune').value, adr: $('#c-adr').value.trim()
      };
      const bad = { 'c-nom': v.nom.length < 2, 'c-tel': !/^(0[157]\d{8}|225\d{10})$/.test(v.tel), 'c-commune': !v.commune, 'c-adr': v.adr.length < 3 };
      Object.entries(bad).forEach(([k, b]) => $('#' + k).closest('.champ').classList.toggle('bad', b));
      const first = Object.keys(bad).find(k => bad[k]);
      if (first) { $('#' + first).focus(); $('#' + first).scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      v.telAff = v.tel.length === 10 ? v.tel.replace(/(\d{2})(?=\d)/g, '$1 ') : v.tel;
      paiement(v);
    };
  }
  function paiement(v) {
    const m = PAY[CMD.pay]; const t = totalPanier();
    const fin = () => {
      modale('<div style="text-align:center"><div class="okrond">' + ICO.check + '</div><h3 class="os" style="font-size:24px">' + (m.mm || CMD.pay === 'carte' ? 'Paiement accepté' : 'Commande enregistrée') + '</h3><p style="color:var(--gris);margin-top:6px">Simulation, aucun montant débité.</p></div>');
      setTimeout(() => { fermer(); valider(v); }, 1300);
    };
    if (m.mm) {
      modale('<div class="phone"><div class="lg" style="background:' + m.bg + ';color:' + (m.fg || '#fff') + '">' + m.court + '</div><b>' + m.nom + '</b><p style="font-size:13.5px;color:var(--gris);margin-top:4px">Montant : <b style="color:var(--encre)">' + fcfa(t) + '</b></p></div>' +
        '<div class="champ"><label for="mmtel">Numéro ' + m.nom + '</label><input id="mmtel" inputmode="tel" value="' + esc(v.telAff) + '"></div><button class="btn btn-o" id="mmgo" style="width:100%;margin-top:14px">Recevoir la demande de paiement</button><p style="font-size:11.5px;color:var(--gris);margin-top:10px;text-align:center">Démonstration : aucune demande n\'est réellement envoyée.</p>');
      $('#mmgo').onclick = () => {
        $('#modale-in').innerHTML = '<div style="text-align:center"><div class="lg" style="width:56px;height:56px;border-radius:16px;margin:0 auto;display:grid;place-items:center;background:' + m.bg + ';color:' + (m.fg || '#fff') + ';font:800 15px Poppins">' + m.court + '</div><h3 class="os" style="font-size:22px;margin-top:12px">Confirmez sur votre téléphone</h3><p style="color:var(--gris);font-size:14px;margin-top:6px">Une demande de ' + fcfa(t) + ' a été envoyée au ' + esc($('#mmtel') ? $('#mmtel').value : v.telAff) + '. Saisissez votre code secret pour valider.</p><div class="spin"></div><p style="font-size:12px;color:var(--gris)">En attente de confirmation…</p></div>';
        setTimeout(fin, 2600);
      };
    } else if (CMD.pay === 'carte') {
      modale('<h3 class="os" style="font-size:22px;margin-bottom:12px">Paiement par carte</h3><div class="champs"><div class="champ l2"><label>Numéro de carte</label><input value="4970 •••• •••• 1234" readonly></div><div class="champ"><label>Expiration</label><input value="12/28" readonly></div><div class="champ"><label>Code</label><input value="•••" readonly></div></div><button class="btn btn-o" id="cbgo" style="width:100%;margin-top:14px">Payer ' + fcfa(t) + '</button><p style="font-size:11.5px;color:var(--gris);margin-top:10px;text-align:center">Carte fictive, démonstration uniquement.</p>');
      $('#cbgo').onclick = () => { $('#modale-in').innerHTML = '<div style="text-align:center"><h3 class="os" style="font-size:22px">Vérification 3-D Secure</h3><div class="spin"></div></div>'; setTimeout(fin, 1800); };
    } else fin();
  }
  function valider(v) {
    const L = lignesPanier(); const c = {
      ref: ref('OP'), date: new Date().toISOString(), client: v, pay: CMD.pay, creneau: creneaux().find(x => x.v === CMD.creneau).t,
      lignes: L, total: totalPanier(), statut: 'recue', nouveau: true
    };
    commandes.unshift(c); store.set('commandes', commandes); panier = {}; majPanier();
    location.hash = '#/confirmation/' + c.ref;
  }
  function texteWa(c) {
    return 'Bonjour Office Plus,\nVoici ma commande ' + c.ref + ' :\n' + c.lignes.map(([id, qn]) => '• ' + qn + ' × ' + BYID[id].nom + ' (' + fcfa(BYID[id].prix * qn) + ')').join('\n') +
      '\nTotal : ' + fcfa(c.total) + '\nPaiement : ' + PAY[c.pay].nom + '\nLivraison : ' + c.client.commune + ', ' + c.client.adr + '\nCréneau : ' + c.creneau + '\nContact : ' + c.client.nom + (c.client.org ? ' (' + c.client.org + ')' : '') + ', ' + c.client.telAff;
  }
  function suiviHtml(st) {
    const i = ORDRE.indexOf(st); const ic = [ICO.recu, ICO.boite, ICO.camion, ICO.maison]; const sous = ['Office Plus a reçu la commande', 'Articles réunis et emballés', 'Le livreur est en route', 'Remise contre signature'];
    return '<div class="suivi">' + ORDRE.map((s, k) => '<div class="s ' + (k < i ? 'ok' : k === i ? 'cur ok' : '') + '"><i>' + (k < i ? ICO.check : ic[k]) + '</i>' + STATUTS[s] + '<small>' + sous[k] + '</small></div>').join('') + '</div>';
  }
  function pConfirmation(r) {
    const c = commandes.find(x => x.ref === r); if (!c) { location.hash = '#/'; return; }
    const t = texteWa(c);
    app.innerHTML = '<div class="wrap confirm"><div class="etapes" style="justify-content:center"><span class="ok"><i>✓</i>Panier</span><span class="ok"><i>✓</i>Livraison et paiement</span><span class="on"><i>3</i>Confirmation</span></div>' +
      '<div class="tete"><div class="okrond">' + ICO.check + '</div><span class="kicker">Merci ' + esc(c.client.nom.split(' ')[0]) + ' !</span><h1>Commande confirmée</h1><p style="color:var(--gris)">Livraison : <b style="color:var(--encre)">' + c.creneau + '</b> à ' + esc(c.client.commune) + '. Paiement : ' + PAY[c.pay].nom + '.</p><div class="refc">' + c.ref + '</div>' +
      suiviHtml(c.statut) + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px"><a class="btn btn-e" href="#/suivi/' + c.ref + '">Suivre ma commande</a><a class="btn btn-l" href="#/admin">Voir côté Office Plus (back-office)</a></div></div>' +
      '<div class="duo"><div class="bloc" style="margin:0"><h3>' + ICO.wa.replace('<svg', '<svg width="22" height="22" style="color:#25D366"') + 'Récapitulatif WhatsApp prêt</h3><div class="chat"><div class="bulle">' + esc(t) + '</div><div class="h">à envoyer au 05 66 66 65 75</div></div><a class="btn btn-w" style="margin-top:14px;width:100%" target="_blank" rel="noopener" href="' + waLien(t) + '">' + ICO.wa + 'Ouvrir dans WhatsApp</a><p style="font-size:11.5px;color:var(--gris);margin-top:8px">Rien ne part sans votre clic.</p></div>' +
      '<div class="bloc" style="margin:0"><h3>Votre commande</h3>' + c.lignes.map(([id, qn]) => '<div class="rec"><span class="g"><img src="' + img(BYID[id].img) + '" alt="">' + qn + ' × ' + esc(BYID[id].nom) + '</span><b>' + fcfa(BYID[id].prix * qn) + '</b></div>').join('') + '<div class="rec"><b>Total</b><b>' + fcfa(c.total) + '</b></div></div></div></div>';
  }
  function pSuivi(r) {
    const c = r ? commandes.find(x => x.ref === r) : commandes[0];
    app.innerHTML = '<div class="wrap confirm"><h1 class="page-t">Suivre ma commande</h1><div class="bloc"><div class="champs"><div class="champ"><label for="sref">Numéro de commande</label><input id="sref" value="' + (c ? c.ref : '') + '" placeholder="OP-…"></div><div class="champ" style="justify-content:flex-end"><button class="btn btn-e" id="sgo">Suivre</button></div></div></div><div id="sres"></div></div>';
    const rend = (c) => {
      if (!c) { $('#sres').innerHTML = '<div class="vide">Aucune commande trouvée avec ce numéro sur cet appareil. Passez une commande pour voir le suivi.</div>'; return; }
      $('#sres').innerHTML = '<div class="tete" style="background:#fff;border:1px solid var(--ligne);border-radius:22px;padding:26px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><span class="kicker">Commande ' + c.ref + '</span><h2 class="os" style="font-size:28px;margin-top:4px">' + STATUTS[c.statut] + '</h2></div><span class="statut st-' + c.statut + '">' + STATUTS[c.statut] + '</span></div>' + suiviHtml(c.statut) +
        '<p style="font-size:13.5px;color:var(--gris);margin-top:14px;text-align:center">Livraison ' + c.creneau.toLowerCase() + ' · ' + esc(c.client.commune) + '. Chaque étape vous est envoyée sur WhatsApp.</p>' +
        (c.statut !== 'livree' ? '<div style="text-align:center;margin-top:14px"><button class="btn btn-l btn-s" id="avance">Simuler l\'étape suivante</button></div>' : '<div style="text-align:center;margin-top:14px"><button class="btn btn-o btn-s" data-recmd="' + c.ref + '">Recommander la même chose</button></div>') + '</div>';
      const b = $('#avance'); if (b) b.onclick = () => { c.statut = ORDRE[Math.min(3, ORDRE.indexOf(c.statut) + 1)]; store.set('commandes', commandes); rend(c); toast('Étape « ' + STATUTS[c.statut] + ' » envoyée au client sur WhatsApp (simulé)'); };
      const rc = $('[data-recmd]'); if (rc) rc.onclick = () => { c.lignes.forEach(([id, qn]) => panier[id] = (panier[id] || 0) + qn); majPanier(); location.hash = '#/panier'; };
    };
    $('#sgo').onclick = () => rend(commandes.find(x => x.ref === $('#sref').value.trim()));
    rend(c);
  }

  /* ---------- PDF ---------- */
  function pdfBase(titre, num) {
    const { jsPDF } = window.jspdf; const d = new jsPDF({ unit: 'mm', format: 'a4' });
    d.setFillColor(0, 168, 119); d.rect(0, 0, 210, 30, 'F'); d.setFillColor(240, 124, 30); d.triangle(150, 0, 210, 0, 210, 30, 'F'); d.rect(170, 0, 40, 30, 'F');
    d.setTextColor(255, 255, 255); d.setFont('helvetica', 'bold'); d.setFontSize(22); d.text('OFFICE PLUS', 15, 15); d.setFontSize(9); d.setFont('helvetica', 'normal');
    d.text('Fournitures, consommables et mobilier de bureau - Abidjan', 15, 22);
    d.setFont('helvetica', 'bold'); d.setFontSize(16); d.text(titre, 195, 14, { align: 'right' }); d.setFontSize(10); d.text('N\u00b0 ' + num, 195, 21, { align: 'right' });
    d.setTextColor(31, 37, 35); d.setFontSize(9); d.setFont('helvetica', 'normal');
    d.text(['OFFICE PLUS - Point de vente Bietry, Abidjan', 'Tel. 05 66 66 65 75 - NCC 2104959E', 'Regime : microentreprise (TVA 0 %)'], 15, 40);
    const S = OP.SOCIETE; d.setFont('helvetica', 'bold'); d.text('Client (exemple fictif)', 120, 40); d.setFont('helvetica', 'normal');
    d.text([S.nom, S.contact + ', ' + S.fonction, S.adresse + ', ' + S.commune], 120, 45);
    d.text('Date : ' + dateFr(new Date()), 15, 58);
    return d;
  }
  function pdfLignes(d, L, y) {
    d.setFillColor(31, 37, 35); d.rect(15, y, 180, 8, 'F'); d.setTextColor(255); d.setFont('helvetica', 'bold'); d.setFontSize(9);
    d.text('Designation', 18, y + 5.5); d.text('Qte', 125, y + 5.5, { align: 'right' }); d.text('Prix unitaire', 158, y + 5.5, { align: 'right' }); d.text('Total', 192, y + 5.5, { align: 'right' });
    d.setTextColor(31, 37, 35); d.setFont('helvetica', 'normal'); y += 8; let t = 0;
    L.forEach(([id, q], i) => {
      const p = BYID[id]; if (i % 2) { d.setFillColor(246, 247, 244); d.rect(15, y, 180, 8, 'F'); }
      const nom = p.nom.replace(/[\u2019]/g, "'").replace(/\u00ab |\u00bb| \u00bb/g, '"') + (p.src ? '' : ' *');
      d.text(nom.length > 62 ? nom.slice(0, 60) + '...' : nom, 18, y + 5.5); d.text(String(q), 125, y + 5.5, { align: 'right' });
      d.text(fcfaPdf(p.prix), 158, y + 5.5, { align: 'right' }); d.text(fcfaPdf(p.prix * q), 192, y + 5.5, { align: 'right' }); t += p.prix * q; y += 8;
    });
    d.setDrawColor(227, 231, 225); d.line(15, y + 2, 195, y + 2);
    d.setFont('helvetica', 'bold'); d.setFontSize(11); d.text('Total TTC (TVA 0 %)', 150, y + 10, { align: 'right' }); d.text(fcfaPdf(t), 192, y + 10, { align: 'right' });
    return y + 18;
  }
  function pdfPied(d, y, lignes) {
    d.setFont('helvetica', 'normal'); d.setFontSize(8.5); d.setTextColor(94, 102, 98); d.text(lignes, 15, y);
    d.setFillColor(254, 240, 227); d.rect(15, 270, 180, 14, 'F'); d.setTextColor(201, 90, 6); d.setFont('helvetica', 'bold'); d.setFontSize(8.5);
    d.text(['DOCUMENT DE DEMONSTRATION - maquette proposee par Yelema, non publiee. Client et montants fictifs ou indicatifs.', 'Les articles marques * ont un prix indicatif, a confirmer par Office Plus.'], 18, 276);
  }
  function devisPdf(L) {
    if (!L.length) { toast('Ajoutez des articles pour créer un devis'); return; }
    try {
      const n = ref('DV'); const d = pdfBase('DEVIS', n); const y = pdfLignes(d, L, 66);
      pdfPied(d, y, ['Validite du devis : 30 jours.', 'Prix marques sans * : repris de la facture Office Plus du 17/09/2026 ou de sa page Facebook.', 'Marchandises non echangeables, non remboursables, passe un delai de 7 jours.']);
      d.save('Devis_OfficePlus_' + n + '.pdf'); toast('Devis ' + n + ' téléchargé (PDF)');
    } catch (e) { toast('Le devis PDF n\'a pas pu être créé sur cet appareil'); }
  }
  function facturePdf(h) {
    try {
      const d = pdfBase('FACTURE', h.ref.replace('OP', 'FNE')); const y = pdfLignes(d, h.lignes, 66);
      pdfPied(d, y, ['Facture normalisee (FNE) : dans la version reelle, numero et QR code de la DGI figurent ici.', 'Commande ' + h.ref + ' du ' + h.date + ' - reglement : virement a 30 jours.']);
      d.save('Facture_OfficePlus_' + h.ref + '.pdf'); toast('Facture ' + h.ref + ' téléchargée (PDF)');
    } catch (e) { toast('La facture PDF n\'a pas pu être créée sur cet appareil'); }
  }

  /* ---------- espace entreprise ---------- */
  function pEntreprise(sec) {
    sec = sec || 'tableau';
    const S = OP.SOCIETE;
    const histo = commandes.filter(c => c.client.org).map(c => ({ ref: c.ref, date: dateFr(new Date(c.date)), statut: STATUTS[c.statut], lignes: c.lignes })).concat(OP.HISTO);
    const tot = l => l.reduce((a, [id, qn]) => a + BYID[id].prix * qn, 0);
    const menu = [['tableau', 'Tableau de bord', ICO.graph], ['commandes', 'Commandes', ICO.boite], ['liste', 'Liste du mois', ICO.repet], ['devis', 'Devis', ICO.doc], ['factures', 'Factures', ICO.recu]];
    const recmd = (l) => { l.forEach(([id, qn]) => panier[id] = (panier[id] || 0) + qn); majPanier(); location.hash = '#/panier'; toast('Commande rechargée dans le panier'); };
    let corps = '';
    const tabCmd = (lim) => '<div class="tbl-wrap"><table class="t resp"><thead><tr><th>Commande</th><th>Date</th><th>Articles</th><th>Montant</th><th>Statut</th><th></th></tr></thead><tbody>' +
      histo.slice(0, lim || 99).map((h, i) => '<tr><td><b>' + h.ref + '</b></td><td>' + h.date + '</td><td class="hide-m">' + h.lignes.reduce((a, l) => a + l[1], 0) + ' articles</td><td><b>' + fcfa(tot(h.lignes)) + '</b></td><td><span class="statut st-' + (h.statut === 'Livrée' ? 'livree' : 'recue') + '">' + h.statut + '</span></td><td class="full"><button class="btn btn-o btn-s" data-rc="' + i + '">' + ICO.repet + 'Recommander en 1 clic</button></td></tr>').join('') + '</tbody></table></div>';
    if (sec === 'tableau') {
      corps = '<div class="alerte"><div class="ic">' + ICO.encre + '</div><div><b>Vos cartouches Canon C-EXV65 noir seront bientôt vides</b><p>Dernier achat le 18/10/2026 (2 cartouches). À votre rythme habituel, il vous en reste pour environ 5 jours. Recommander maintenant ?</p></div><button class="btn btn-o" id="alerte-go">Recommander 2 cartouches</button></div>' +
        '<div class="kpis"><div class="kpi"><small>Achats ce mois-ci</small><b>' + fcfa(tot(OP.HISTO[0].lignes)) + '</b><span>1 commande</span></div><div class="kpi"><small>Encours à 30 jours</small><b>' + fcfa(tot(OP.HISTO[0].lignes)) + '</b><span>échéance 30/11/2026</span></div><div class="kpi"><small>Plafond du compte</small><b>' + fcfa(S.plafond) + '</b><span>' + S.conditions + '</span></div><div class="kpi"><small>Délai moyen de livraison</small><b>Jour même</b><span>3 commandes sur 3</span></div></div>' +
        '<div class="bloc"><h3 style="justify-content:space-between">Dernières commandes <span class="fict">Données fictives</span></h3>' + tabCmd(3) + '</div>';
    } else if (sec === 'commandes') {
      corps = '<div class="bloc"><h3 style="justify-content:space-between">Toutes vos commandes <span class="fict">Données fictives</span></h3>' + tabCmd() + '</div>';
    } else if (sec === 'liste') {
      corps = '<div class="bloc"><h3 style="justify-content:space-between">Liste d\'achats du mois <span class="fict">Exemple</span></h3><p style="color:var(--gris);font-size:14px;margin:-6px 0 12px">Les fournitures que vous commandez chaque mois. Ajustez les quantités, puis commandez tout en un clic, ou programmez la commande le 1er de chaque mois.</p>' +
        OP.RECURRENT.map(([id, qn]) => '<div class="rec"><span class="g"><img src="' + img(BYID[id].img) + '" alt=""><span><b style="font-weight:600">' + esc(BYID[id].nom) + '</b><br><small style="color:var(--gris)">' + fcfa(BYID[id].prix) + ' / ' + BYID[id].unite + '</small></span></span><span class="qte"><button data-lq="' + id + '" data-d="-1">−</button><input data-li="' + id + '" value="' + qn + '" type="number" min="0" aria-label="Quantité"><button data-lq="' + id + '" data-d="1">+</button></span></div>').join('') +
        '<div class="rec"><b>Total de la liste</b><b id="ltot"></b></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><button class="btn btn-o" id="lgo">Tout commander</button><button class="btn btn-l" id="lprog">' + ICO.horloge + 'Programmer chaque mois</button><button class="btn btn-l" id="ldevis">' + ICO.doc + 'Devis PDF de la liste</button></div></div>';
    } else if (sec === 'devis') {
      corps = '<div class="bloc"><h3>Créer un devis PDF</h3><p style="color:var(--gris);font-size:14px;margin:-6px 0 14px">Pour votre circuit de validation interne ou un appel d\'offres : le devis reprend le contenu de votre panier ou de votre liste du mois, au nom de votre structure.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-o" id="dv-panier">' + ICO.doc + 'Devis du panier (' + nbPanier() + ' articles)</button><button class="btn btn-l" id="dv-liste">' + ICO.doc + 'Devis de la liste du mois</button></div></div>' +
        '<div class="bloc"><h3 style="justify-content:space-between">Devis récents <span class="fict">Données fictives</span></h3><div class="tbl-wrap"><table class="t resp"><thead><tr><th>Devis</th><th>Date</th><th>Objet</th><th>Statut</th></tr></thead><tbody><tr><td><b>DV-261015-214</b></td><td>15/10/2026</td><td class="full">Mobilier salle de réunion</td><td><span class="statut st-livree">Accepté</span></td></tr><tr><td><b>DV-260928-187</b></td><td>28/09/2026</td><td class="full">Fournitures du trimestre</td><td><span class="statut st-recue">Envoyé</span></td></tr></tbody></table></div></div>';
    } else if (sec === 'factures') {
      corps = '<div class="bloc"><h3 style="justify-content:space-between">Factures normalisées (FNE) <span class="fict">Données fictives</span></h3><p style="color:var(--gris);font-size:14px;margin:-6px 0 12px">Chaque livraison donne lieu à une facture normalisée, téléchargeable ici pour votre comptabilité.</p><div class="tbl-wrap"><table class="t resp"><thead><tr><th>Facture</th><th>Date</th><th>Montant</th><th>Règlement</th><th></th></tr></thead><tbody>' +
        OP.HISTO.map((h, i) => '<tr><td><b>' + h.ref.replace('OP', 'FNE') + '</b></td><td>' + h.date + '</td><td><b>' + fcfa(tot(h.lignes)) + '</b></td><td><span class="statut ' + (i ? 'st-livree">Réglée' : 'st-preparee">À régler avant le 30/11') + '</span></td><td class="full"><button class="btn btn-l btn-s" data-fa="' + i + '">' + ICO.doc + 'Télécharger le PDF</button></td></tr>').join('') + '</tbody></table></div></div>';
    }
    app.innerHTML = '<div class="wrap"><div class="fil"><a href="#/">Accueil</a> › Espace entreprise</div><div class="esp"><aside class="menu-e"><div class="soc"><div class="av">ES</div><div><b>' + esc(S.nom) + '</b><small>' + esc(S.contact) + ' · compte exemple</small></div></div>' +
      menu.map(([k, t, ic]) => '<a href="#/entreprise/' + k + '" class="' + (k === sec ? 'on' : '') + '">' + ic + t + '</a>').join('') + '</aside><div>' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:10px;flex-wrap:wrap;margin-bottom:16px"><div><span class="kicker">Compte entreprise</span><h1 class="titre" style="font-size:32px">Bonjour ' + esc(S.contact.split(' ')[0]) + '</h1></div><span class="fict">Compte de démonstration, données fictives</span></div>' + corps + '</div></div></div>';
    $$('[data-rc]').forEach(b => b.onclick = () => recmd(histo[+b.dataset.rc].lignes));
    const ag = $('#alerte-go'); if (ag) ag.onclick = () => { ajouter('cexv65-noir', 2); location.hash = '#/panier'; };
    if (sec === 'liste') {
      const L = OP.RECURRENT.map(x => x.slice());
      const tl = () => { $('#ltot').textContent = fcfa(L.reduce((a, [id, qn]) => a + BYID[id].prix * qn, 0)); };
      $$('[data-lq]').forEach(b => b.onclick = () => { const l = L.find(x => x[0] === b.dataset.lq); l[1] = Math.max(0, l[1] + +b.dataset.d); $('[data-li="' + l[0] + '"]').value = l[1]; tl(); });
      $$('[data-li]').forEach(i => i.onchange = () => { L.find(x => x[0] === i.dataset.li)[1] = Math.max(0, +i.value || 0); tl(); });
      tl();
      $('#lgo').onclick = () => recmd(L.filter(l => l[1] > 0));
      $('#lprog').onclick = () => toast('Commande programmée le 1er de chaque mois (simulation)');
      $('#ldevis').onclick = () => devisPdf(L.filter(l => l[1] > 0));
    }
    if (sec === 'devis') { $('#dv-panier').onclick = () => devisPdf(lignesPanier()); $('#dv-liste').onclick = () => devisPdf(OP.RECURRENT); }
    $$('[data-fa]').forEach(b => b.onclick = () => facturePdf(OP.HISTO[+b.dataset.fa]));
  }

  /* ---------- back-office ---------- */
  let ADMIN = null;
  function pAdmin() {
    if (!ADMIN) ADMIN = OP.ADMIN_CMD.map(c => Object.assign({}, c));
    commandes.filter(c => c.nouveau && !ADMIN.find(a => a.ref === c.ref)).forEach(c => {
      const d = new Date(c.date);
      ADMIN.unshift({ ref: c.ref, heure: String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0'), client: (c.client.org || c.client.nom) + ' (' + c.client.commune + ')', commune: c.client.commune, tel: c.client.telAff, paiement: PAY[c.pay].nom, lignes: c.lignes, statut: c.statut, site: true, src: c });
    });
    const tot = l => l.reduce((a, [id, qn]) => a + BYID[id].prix * qn, 0);
    const ca = ADMIN.reduce((a, c) => a + tot(c.lignes), 0);
    const aTraiter = ADMIN.filter(c => c.statut === 'recue').length;
    const bas = P.filter(p => p.stock <= 3).sort((a, b) => a.stock - b.stock).slice(0, 6);
    const max = Math.max(ca, ...OP.CA7.map(x => x[1]));
    document.body.classList.add('bo');
    app.innerHTML = '<div class="bo-top"><div class="wrap"><img src="assets/img/logo-blanc.svg" alt="Office Plus"><div class="t">Back-office<small>' + new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }) + ' · tableau du jour</small></div><div class="r"><a class="btn btn-l btn-s" href="#/">' + ICO.maison + '<span>Voir la boutique</span></a></div></div></div>' +
      '<div class="bo-fict">Données fictives de démonstration : commandes, clients, chiffre d\'affaires et stocks sont inventés pour montrer l\'outil.</div>' +
      '<div class="wrap" style="padding-top:20px"><div class="kpis bo4"><div class="kpi vert"><small>Chiffre d\'affaires du jour</small><b id="kca">' + fcfa(ca) + '</b><span>' + ADMIN.length + ' commandes</span></div><div class="kpi"><small>À valider</small><b>' + aTraiter + '</b><span class="neg">à préparer avant 10 h</span></div><div class="kpi"><small>Demandes de devis</small><b>' + OP.ADMIN_DEVIS.length + '</b><span class="neg">en attente de chiffrage</span></div><div class="kpi"><small>Articles en stock bas</small><b>' + bas.length + '</b><span class="neg">à réapprovisionner</span></div></div>' +
      '<div class="bo-g"><div><div class="carte-bo"><h3>Commandes du jour <small>Valider = prévenir le client sur WhatsApp</small></h3><div class="tbl-wrap"><table class="t resp" id="tcmd"><thead><tr><th>Heure</th><th>Client</th><th>Articles</th><th>Montant</th><th>Paiement</th><th>Statut et action</th></tr></thead><tbody>' +
      ADMIN.map((c, i) => '<tr class="' + (c.site && c.src && c.src.nouveau ? 'flash' : '') + '"><td>' + c.heure + '</td><td class="full"><span class="cli">' + esc(c.client) + (c.site ? ' <span class="statut st-new">Nouvelle · site</span>' : '') + '<small>' + esc(c.tel) + ' · ' + c.ref + '</small></span></td><td class="hide-m art">' + c.lignes.map(([id, qn]) => '<span>' + qn + ' × ' + esc(BYID[id].nom) + '</span>').join('') + '</td><td><b>' + fcfa(tot(c.lignes)) + '</b></td><td class="hide-m">' + esc(c.paiement) + '</td><td class="full"><div class="act"><span class="statut st-' + c.statut + '">' + STATUTS[c.statut] + '</span>' + (c.statut === 'livree' ? '' : '<button class="btn btn-v btn-s" data-val="' + i + '">' + ICO.wa + (c.statut === 'recue' ? 'Valider' : 'Suivante') + '</button>') + '</div></td></tr>').join('') +
      '</tbody></table></div></div>' +
      '<div class="carte-bo"><h3>Chiffre d\'affaires, 7 derniers jours <small>F CFA</small></h3><div class="barres">' + OP.CA7.map(([j, v]) => '<div><i style="height:' + Math.round(v / max * 100) + '%"></i>' + j + '</div>').join('') + '<div class="auj"><i style="height:' + Math.round(ca / max * 100) + '%"></i>Auj.</div></div></div></div>' +
      '<div><div class="carte-bo"><h3>Stocks bas <small>seuil : 3</small></h3>' + bas.map(p => '<div class="sb"><img src="' + img(p.img) + '" alt=""><span>' + esc(p.nom) + '</span><span class="q' + (p.stock <= 0 ? ' z' : '') + '">' + (p.stock <= 0 ? 'Rupture' : p.stock + ' restant' + (p.stock > 1 ? 's' : '')) + '</span></div>').join('') + '<button class="btn btn-l btn-s" style="margin-top:12px;width:100%" id="reappro">Préparer le bon de réapprovisionnement</button></div>' +
      '<div class="carte-bo"><h3>Demandes de devis</h3>' + OP.ADMIN_DEVIS.map((d, i) => '<div class="dv"><div class="h"><b>' + d.ref + ' · ' + esc(d.client) + '</b><small>' + d.depuis + '</small></div><div>' + esc(d.objet) + '</div><button class="lien" data-dv="' + i + '" style="margin-top:4px;font-size:13px">Chiffrer et envoyer le devis</button></div>').join('') + '</div></div></div></div>';
    commandes.forEach(c => { c.nouveau = false; }); store.set('commandes', commandes);
    $$('[data-val]').forEach(b => b.onclick = () => {
      const c = ADMIN[+b.dataset.val]; const suiv = ORDRE[Math.min(3, ORDRE.indexOf(c.statut) + 1)];
      const msg = { preparee: 'Bonjour, ici Office Plus. Votre commande ' + c.ref + ' (' + fcfa(tot(c.lignes)) + ') est validée et en préparation. Livraison prévue à ' + c.commune + ' aujourd\'hui. Merci de votre confiance !', livraison: 'Bonjour, ici Office Plus. Votre commande ' + c.ref + ' est en route, notre livreur arrive à ' + c.commune + ' dans l\'heure.', livree: 'Bonjour, ici Office Plus. Votre commande ' + c.ref + ' a bien été livrée. Votre facture normalisée suit. Bonne journée !' }[suiv];
      modale('<h3 class="os" style="font-size:22px;margin-bottom:4px">Prévenir le client</h3><p style="color:var(--gris);font-size:13.5px;margin-bottom:12px">' + esc(c.client) + ' · ' + esc(c.tel) + '</p><div class="chat"><div class="bulle">' + esc(msg) + '</div><div class="h">WhatsApp Business · message prêt</div></div><button class="btn btn-w" id="envoi" style="width:100%;margin-top:14px">' + ICO.wa + 'Valider et envoyer</button><p style="font-size:11.5px;color:var(--gris);margin-top:8px;text-align:center">Démonstration : aucun message n\'est réellement envoyé.</p>');
      $('#envoi').onclick = () => { c.statut = suiv; if (c.src) { c.src.statut = suiv; store.set('commandes', commandes); } fermer(); pAdmin(); toast('Commande ' + c.ref + ' : « ' + STATUTS[suiv] + ' », client prévenu sur WhatsApp (simulé)'); };
    });
    $('#reappro').onclick = () => toast('Bon de réapprovisionnement préparé pour ' + bas.length + ' articles (simulation)');
    $$('[data-dv]').forEach(b => b.onclick = () => toast('Devis ' + OP.ADMIN_DEVIS[+b.dataset.dv].ref + ' ouvert pour chiffrage (simulation)'));
  }

  /* ---------- routeur ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, ''); const [path, qs] = h.split('?'); const parts = path.split('/').filter(Boolean);
    const r = parts[0] || 'accueil';
    document.body.classList.remove('bo'); window.onresize = null; fermer();
    const boutique = r !== 'admin';
    $('#shop').style.display = boutique ? '' : 'none'; $('#pied').style.display = boutique ? '' : 'none'; $('#mbar').style.display = boutique ? '' : 'none'; $('#waflot').style.display = boutique ? '' : 'none';
    $$('#navcats a').forEach(a => a.classList.toggle('on', (r === 'catalogue' && (a.dataset.c || '') === (parts[1] || '')) || (r === 'entreprise' && a.dataset.c === 'b2b') || (r === 'suivi' && a.dataset.c === 'suivi')));
    $$('#mbar a').forEach(a => a.classList.toggle('on', a.dataset.r === r));
    const query = qs ? decodeURIComponent((qs.match(/q=([^&]*)/) || [])[1] || '') : '';
    if (r === 'catalogue') pCatalogue(parts[1], query);
    else if (r === 'produit') pProduit(parts[1]);
    else if (r === 'panier') pPanier();
    else if (r === 'commande') pCommande();
    else if (r === 'confirmation') pConfirmation(parts[1]);
    else if (r === 'suivi') pSuivi(parts[1]);
    else if (r === 'entreprise') pEntreprise(parts[1]);
    else if (r === 'admin') pAdmin();
    else pAccueil();
    window.scrollTo(0, 0);
    document.title = (r === 'admin' ? 'Back-office · ' : '') + 'Office Plus · Boutique en ligne (maquette)';
  }
  window.addEventListener('hashchange', route);
  majPanier(); route();
})();
