/* Office Plus · site de démonstration v3 (non publié, données fictives).
   Tout est simulé dans le navigateur : aucun paiement, aucune donnée envoyée. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = OP.P, BYID = Object.fromEntries(P.map(p => [p.id, p]));
  const app = $('#app');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fcfa = n => Math.round(n).toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, '\u202f') + '\u00a0F\u00a0CFA';
  const PHOTOS = new Set(['p/armoire', 'p/relieuse', 'p/openspace', 'p/enveloppes2', 'p/multiprise', 'p/classeurs', 'p/bureau-dir', 'p/salle-reunion']);
  const img = k => /^(assets\/|data:)/.test(k) ? k : 'assets/img/' + k + '.webp';
  const imgTag = (k, alt, cls) => `<img src="${img(k)}" alt="${esc(alt || '')}" loading="lazy" decoding="async"${PHOTOS.has(k) ? ' class="ph' + (cls ? ' ' + cls : '') + '"' : (cls ? ` class="${cls}"` : '')}>`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem('op3_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('op3_' + k, JSON.stringify(v)); } catch (e) { } }
  };
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  /* ---------- icônes ---------- */
  const sv = (d, w) => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 2}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    plus: sv('<path d="M12 5v14M5 12h14"/>', 2.2), ok: sv('<path d="m5 12 5 5 9-10"/>', 2.4), fl: sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    flg: sv('<path d="M19 12H5M11 6l-6 6 6 6"/>'), camion: sv('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
    outil: sv('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5z"/>'),
    tel: sv('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    mail: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'), pin: sv('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    doc: sv('<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>'), carte: sv('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
    mobile: sv('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'), horloge: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    bouclier: sv('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>'), immeuble: sv('<path d="M4 21V5l8-2v18M12 8h8v13M8 8v.01M8 12v.01M8 16v.01M16 12v.01M16 16v.01"/>'),
    goutte: sv('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'), cloche: sv('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21h4"/>'),
    liste: sv('<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>'), maison: sv('<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    grille: sv('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    sac: sv('<path d="M6 7h12l-1 13H7z"/><path d="M9 7a3 3 0 0 1 6 0"/>'), user: sv('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    loupe: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'), x: sv('<path d="M6 6l12 12M18 6 6 18"/>'), filtre: sv('<path d="M4 6h16M7 12h10M10 18h4"/>'),
    dl: sv('<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>'), recharger: sv('<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>'),
    camera: sv('<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>'),
    etoile: sv('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'), bulle: sv('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/>'),
    fb: '<svg class="i fb-off" viewBox="100 100 500 500" aria-hidden="true"><g transform="matrix(1,0,0,-1,0,700)"><path transform="translate(600,350)" fill="#0866FF" d="m 0,0 c 0,138.071 -111.929,250 -250,250 -138.071,0 -250,-111.929 -250,-250 0,-117.245 80.715,-215.622 189.606,-242.638 v 166.242 h -51.552 V 0 h 51.552 v 32.919 c 0,85.092 38.508,124.532 122.048,124.532 15.838,0 43.167,-3.105 54.347,-6.211 V 81.986 c -5.901,0.621 -16.149,0.932 -28.882,0.932 -40.993,0 -56.832,-15.528 -56.832,-55.9 V 0 h 81.659 l -14.028,-76.396 h -67.631 V -248.169 C -95.927,-233.218 0,-127.818 0,0"/><path transform="translate(447.9175,273.6036)" fill="#fff" d="M 0,0 14.029,76.396 H -67.63 v 27.019 c 0,40.372 15.838,55.899 56.831,55.899 12.733,0 22.981,-0.31 28.882,-0.931 v 69.253 c -11.18,3.106 -38.509,6.212 -54.347,6.212 -83.539,0 -122.048,-39.441 -122.048,-124.533 V 76.396 h -51.552 V 0 h 51.552 v -166.242 c 19.343,-4.798 39.568,-7.362 60.394,-7.362 10.254,0 20.358,0.632 30.288,1.831 L -67.63,0 Z"/></g></svg>', fbm: '<img class="social-mark fb-mark" src="assets/img/soc/facebook.svg" alt="" width="26" height="26">',
    wa: '<img class="social-mark wa-mark" src="assets/img/soc/whatsapp.svg" alt="" width="26" height="26">'
  };

  /* ---------- outils ---------- */
  let panier = store.get('panier', {});
  Object.keys(panier).forEach(k => { if (!BYID[k]) delete panier[k]; });
  const waLien = t => 'https://wa.me/' + OP.WA + '?text=' + encodeURIComponent(t);
  const heureAbj = () => { const d = new Date(); return d.getUTCHours() + d.getUTCMinutes() / 60; };
  const avantDix = () => heureAbj() < 10;
  const resteAvantDix = () => { const m = Math.max(0, Math.round((10 - heureAbj()) * 60)); return (m >= 60 ? Math.floor(m / 60) + ' h ' : '') + String(m % 60).padStart(m >= 60 ? 2 : 1, '0') + ' min'; };
  const dateFr = d => d.toLocaleDateString('fr-FR', { timeZone: 'UTC' });
  const nouvelleRef = pre => { const d = new Date(); return pre + '-' + String(d.getUTCFullYear()).slice(2) + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0') + '-' + Math.floor(100 + Math.random() * 900); };
  const nbPanier = () => Object.values(panier).reduce((a, b) => a + b, 0);
  const lignesPanier = () => Object.entries(panier).filter(([id, q]) => BYID[id] && q > 0);
  const total = L => L.reduce((a, [id, q]) => a + BYID[id].prix * q, 0);
  function majPanier(bump) {
    store.set('panier', panier); const n = nbPanier();
    $$('#nb, .mbar .n').forEach(el => { el.textContent = n; el.classList.toggle('on', n > 0); if (el.classList.contains('n') && el.closest('.mbar')) el.style.display = n ? '' : 'none'; });
    if (bump) { const b = $('#nb'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  }
  function toast(html, pimg) {
    const t = $('#toast'); t.innerHTML = (pimg ? `<img src="${img(pimg)}" alt="">` : '') + `<span>${html}</span>`;
    t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 3200);
  }
  function ajouter(id, q) {
    const p = BYID[id]; if (!p || p.stock <= 0) return;
    panier[id] = Math.min((panier[id] || 0) + (q || 1), 99); majPanier(true);
    toast(`<b>${esc(p.nom)}</b> ajouté au panier <a href="#/panier">Voir le panier</a>`, p.img);
  }
  const srcHtml = p => p.src === 'facture' ? `<div class="prix-src ok"><i></i>Prix facturé le 17/09/2026</div>` : p.src === 'facebook' ? `<div class="prix-src fb"><i></i>Prix publié sur Facebook</div>` : `<div class="prix-src"><i></i>Prix indicatif, à confirmer</div>`;
  const dispoHtml = p => p.stock <= 0 ? `<span class="dispo rupt"><i></i>Rupture, réassort sous 48 h</span>` : p.stock <= 3 ? `<span class="dispo bas"><i></i>Plus que ${p.stock} en stock</span>` : `<span class="dispo"><i></i>En stock, livrable aujourd'hui</span>`;
  const prixHtml = p => `<div class="prix">${p.prixDe ? '<small>à partir de </small>' : ''}${fcfa(p.prix)}${p.unite !== 'pièce' ? ` <small>/ ${esc(p.unite)}</small>` : ''}</div>`;
  const teinte = p => OP.FAM[p.fam].teinte;

  function carte(p) {
    const tags = [];
    if (p.top) tags.push('<span class="tag n">Le plus demandé</span>');
    if (p.stock <= 0) tags.push('<span class="tag">Rupture</span>');
    else if (p.fam === 'mobilier') tags.push('<span class="tag v">Livré et monté</span>');
    return `<article class="carte">
      <a href="#/produit/${p.id}" class="vis" style="--t:${teinte(p)}" aria-label="${esc(p.nom)}">${imgTag(p.img, p.nom)}${p.teinte ? `<span class="teinte" style="background:${p.teinte}"></span>` : ''}</a>
      <div class="bdg">${tags.slice(0, 1).join('')}</div>
      <div class="info"><span class="mq">${esc(p.marque === 'Sans marque' ? OP.FAM[p.fam].court : p.marque)}</span><h3><a href="#/produit/${p.id}">${esc(p.nom)}</a></h3>
      <div class="bas"><div>${prixHtml(p)}${srcHtml(p)}</div><button class="add" type="button" data-add="${p.id}" aria-label="Ajouter ${esc(p.nom)} au panier"${p.stock <= 0 ? ' disabled' : ''}>${ICO.plus}</button></div></div>
    </article>`;
  }
  function rail(id, titre, sous, items, lien) {
    return `<section class="sec-s"><div class="wrap"><div class="tete rv"><div><h2 class="h-m">${titre}</h2>${sous ? `<p class="lead">${sous}</p>` : ''}</div>
      <div class="rail-nav">${lien ? `<a class="btn btn-g btn-s" href="${lien}">Tout voir</a>` : ''}<button class="ib" type="button" data-rail="${id}" data-d="-1" aria-label="Précédent">${ICO.flg}</button><button class="ib" type="button" data-rail="${id}" data-d="1" aria-label="Suivant">${ICO.fl}</button></div></div>
      <div class="rail rv d1" id="${id}">${items.map(carte).join('')}</div></div></section>`;
  }
  const famCount = f => P.filter(p => p.fam === f).length;

  /* ---------- en-tête, pied, menus ---------- */
  function construireCadre() {
    const fams = Object.entries(OP.FAM);
    $('#mega-in').innerHTML = [0, 1, 2, 3].map(c => `<div class="col">${fams.slice(c * 2, c * 2 + 2).map(([k, f]) => `<a class="f" href="#/boutique/${k}"><img src="${img(f.img)}" alt="" style="background:${f.teinte}"><span><b>${esc(f.nom)}</b><small>${famCount(k)} articles</small></span></a>`).join('')}</div>`).join('') +
      `<a class="promo" href="#/boutique"><div><span class="eyebrow" style="color:#7EE2C0">Boutique</span><h4 style="margin-top:8px">Tout le catalogue, ${P.length} articles</h4></div><span class="lien" style="color:#fff">Parcourir ${ICO.fl}</span><img src="${img('p/fauteuil-ergo')}" alt=""></a>`;
    $('#pied').innerHTML = `<div class="wrap"><div class="g">
      <div><img src="assets/img/logo-blanc.svg" alt="Office Plus"><p style="max-width:330px">Fournitures, cartouches, machines et mobilier de bureau à Abidjan. Commandé avant 10 h, livré le jour même.</p>
        <form class="nl" id="nl"><label class="sr" for="nl-m">Votre e-mail</label><input id="nl-m" type="email" placeholder="Votre e-mail pour les offres"><button class="btn btn-v btn-s" type="submit">S'inscrire</button></form>
        <div class="soc"><a class="rond fb" href="https://www.facebook.com/officeplus225" target="_blank" rel="noopener" aria-label="Facebook">${ICO.fbm}</a><a class="rond wa" href="${waLien('Bonjour Office Plus')}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICO.wa}</a></div>
        <div class="pied-pay"><small>Paiements acceptés</small>${mmRang('mm-pied')}</div></div>
      <div><h4>Boutique</h4><ul>${fams.map(([k, f]) => `<li><a href="#/boutique/${k}">${esc(f.court)}</a></li>`).join('')}</ul></div>
      <div><h4>Services</h4><ul>${OP.SERVICES.map(s => `<li><a href="#/services#${s.id}">${esc(s.titre)}</a></li>`).join('')}<li><a href="#/devis">Demande de devis</a></li></ul></div>
      <div><h4>Entreprises</h4><ul><li><a href="#/entreprises">Compte professionnel</a></li><li><a href="#/entreprises#paiement">Paiement à 30 jours</a></li><li><a href="#/entreprises#ao">Appels d'offres</a></li><li><a href="#/compte">Espace entreprise</a></li><li><a href="#/suivi">Suivre une commande</a></li></ul></div>
      <div><h4>Office Plus</h4><ul><li><a href="#/a-propos">Qui sommes-nous</a></li><li><a href="#/contact">Contact et accès</a></li><li><a href="#/faq">Questions fréquentes</a></li><li><a href="#/mentions">Mentions légales</a></li><li><a href="tel:+2252724314352">${esc(OP.TEL)}</a></li><li><a href="mailto:${OP.MAIL}">${esc(OP.MAIL)}</a></li></ul></div>
    </div><div class="bas"><span>© 2026 Office Plus · Abidjan, Côte d'Ivoire</span><div><a href="#/mentions">Mentions légales</a><a href="#/mentions#donnees">Données personnelles</a><a href="#/faq">Aide</a><a href="#/admin">Back-office (démo)</a><a href="#/photos">Appli photos (démo)</a><a href="https://leslita06.github.io/officeplus-pilotage/">Tableaux de bord (démo)</a><a href="https://leslita06.github.io/officeplus-catalogue/">Catalogue feuilletable</a></div><span class="demo-m">Démonstration, données fictives</span></div></div>`;
    $$('#pied a[href^="tel:"]').forEach(a => a.href = 'tel:+2252724314352');
    $('#mbar').innerHTML = `<a href="#/" data-m="accueil">${ICO.maison}Accueil</a><a href="#/boutique" data-m="boutique">${ICO.grille}Boutique</a><button type="button" data-rch>${ICO.loupe}Chercher</button><a href="#/devis" data-m="devis">${ICO.doc}Devis</a><a href="#/panier" data-m="panier">${ICO.sac}Panier<span class="n" style="display:none">0</span></a>`;
    $('#tiroir').innerHTML = `<div class="tt"><img src="assets/img/logo.svg" alt="Office Plus"><button class="ib" type="button" data-tiroir-x aria-label="Fermer">${ICO.x}</button></div>
      <nav><a href="#/boutique">Boutique</a><a href="#/services">Services</a><a href="#/entreprises">Entreprises</a><a href="#/a-propos">Qui sommes-nous</a><a href="#/devis">Demander un devis</a><a href="#/compte">Espace entreprise</a><a href="#/suivi">Suivre une commande</a><a href="#/contact">Contact</a><a href="#/faq">Questions fréquentes</a></nav>
      <div class="fams">${fams.map(([k, f]) => `<a href="#/boutique/${k}"><img src="${img(f.img)}" alt="">${esc(f.court)}</a>`).join('')}</div>
      <a class="btn btn-w btn-b" href="${waLien('Bonjour Office Plus')}" target="_blank" rel="noopener">${ICO.wa}Écrire sur WhatsApp</a>`;
    $('#wa-f').href = waLien('Bonjour Office Plus, ');
    majPanier();
  }

  /* ---------- recherche ---------- */
  function cherche(t) {
    const mots = norm(t).split(/\s+/).filter(Boolean); if (!mots.length) return [];
    return P.filter(p => { const h = norm([p.nom, p.marque, p.ref || '', OP.FAM[p.fam].nom, (p.compat || []).join(' '), p.desc].join(' ')); return mots.every(m => h.includes(m)); });
  }
  function ouvrirRecherche(q) {
    const o = $('#rch-o');
    $('#rch-in').innerHTML = `<div class="champ-r">${ICO.loupe}<label class="sr" for="rq">Rechercher</label><input id="rq" type="search" autocomplete="off" placeholder="Rechercher un article, une référence…" value="${esc(q || '')}"><button class="ib" type="button" data-rch-x aria-label="Fermer">${ICO.x}</button></div><div id="rres"></div>`;
    o.classList.add('on'); document.body.style.overflow = 'hidden';
    const inp = $('#rq'); let sel = -1;
    const rend = () => {
      const r = cherche(inp.value).slice(0, 8);
      $('#rres').innerHTML = inp.value.trim() ? (r.length ? `<h5>${r.length} résultat${r.length > 1 ? 's' : ''}</h5><div class="res">${r.map(p => `<a href="#/produit/${p.id}">${imgTag(p.img, '')}<span>${esc(p.nom)}<small>${esc(OP.FAM[p.fam].court)}</small></span><b>${fcfa(p.prix)}</b></a>`).join('')}</div><a class="lien" style="margin-top:18px" href="#/boutique?q=${encodeURIComponent(inp.value)}">Voir tous les résultats ${ICO.fl}</a>` : `<h5>Aucun résultat</h5><p class="lead">Essayez « toner », « rame » ou « fauteuil », ou <a class="lien" href="#/devis">demandez un devis</a> : Office Plus trouve l'article pour vous.</p>`)
        : `<h5>Recherches fréquentes</h5><div class="mots">${['Toner C-EXV65', 'Rames A4', 'Fauteuil', 'Compteuse de billets', 'Classeur', 'HP 205A'].map(m => `<button type="button" data-mot="${m}">${m}</button>`).join('')}</div><h5>Familles</h5><div class="res">${Object.entries(OP.FAM).map(([k, f]) => `<a href="#/boutique/${k}"><img src="${img(f.img)}" alt=""><span>${esc(f.nom)}<small>${famCount(k)} articles</small></span></a>`).join('')}</div>`;
      sel = -1;
    };
    inp.addEventListener('input', rend);
    inp.addEventListener('keydown', e => {
      const L = $$('#rres .res a');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, Math.min(L.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1))); L.forEach((a, i) => a.classList.toggle('sel', i === sel)); }
      if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && L[sel]) location.hash = L[sel].getAttribute('href'); else if (inp.value.trim()) location.hash = '#/boutique?q=' + encodeURIComponent(inp.value.trim()); }
      if (e.key === 'Escape') fermerRecherche();
    });
    rend(); setTimeout(() => inp.focus(), 60);
  }
  function fermerRecherche() { $('#rch-o').classList.remove('on'); document.body.style.overflow = ''; }

  /* ---------- modale ---------- */
  function modale(html) { $('#modale-in').innerHTML = `<button class="x" type="button" data-fermer aria-label="Fermer">×</button>` + html; $('#modale').classList.add('on'); }
  function fermerModale() { $('#modale').classList.remove('on'); }

  /* ---------- page : accueil ---------- */
  function pAccueil() {
    const tops = P.filter(p => p.top);
    const mob = P.filter(p => p.fam === 'mobilier');
    const f = OP.FAM;
    const tuile = (k, cls) => `<a class="fam rv ${cls || ''}" href="#/boutique/${k}" style="background:${f[k].teinte}"><div><h3>${esc(f[k].nom)}</h3><small>${esc(f[k].txt)}</small></div><span class="nb">${famCount(k)} articles ${ICO.fl}</span><img src="${img(f[k].img)}" alt="" loading="lazy"></a>`;
    app.innerHTML = `
    <section class="hero"><div class="wrap">
      <div>
        <span class="chip rv"><span class="pt"><i></i></span>${avantDix() ? `Commandez dans les ${resteAvantDix()}, livré aujourd'hui` : 'Commandé avant 10 h, livré le jour même'}</span>
        <h1 class="h-xl rv d1"><span class="l">Tout pour le bureau.</span><span class="l grad">Livré aujourd'hui.</span></h1>
        <p class="lead rv d2">Fournitures, cartouches, machines et mobilier pour les entreprises et administrations d'Abidjan. Le mobilier est livré et monté, sans frais.</p>
        <form class="recherche rv d3" id="f-rch" role="search">${ICO.loupe}<label class="sr" for="hq">Rechercher un article</label><input id="hq" type="search" autocomplete="off" placeholder="Toner C-EXV65, rames A4, fauteuil…"><button class="btn btn-n" type="submit"><span>Rechercher</span>${ICO.fl}</button><div class="sugg" id="sugg"></div></form>
        <div class="mots rv d3">Souvent cherché : ${['Toner C-EXV65', 'Rames A4', 'Fauteuil', 'Compteuse'].map(m => `<button type="button" data-q="${m}">${m}</button>`).join('')}</div>
      </div>
      <div class="scene" aria-hidden="true"><div class="disque"></div><div class="anneau"></div>
        <div class="o o1"><img src="${img('p/fauteuil-ergo')}" alt=""></div><div class="o o2"><img src="${img('p/ramette-o')}" alt=""></div><div class="o o3"><img src="${img('p/toner-c')}" alt=""></div>
        <div class="o o4"><img src="${img('p/calculatrice-c')}" alt=""></div><div class="o o5"><img src="${img('p/agrafeuse-c')}" alt=""></div>
        <div class="bulle b1"><span class="ic">${ICO.camion}</span><span><b>Livré aujourd'hui</b><small>pour toute commande avant 10 h</small></span></div>
        <div class="bulle b2"><span class="ic">${ICO.outil}</span><span><b>Mobilier monté</b><small>livraison et montage offerts</small></span></div>
      </div>
    </div></section>
    <section class="confiance"><div class="wrap">
      <div><span class="ic">${ICO.camion}</span><span><b>Livraison le jour même</b>commande avant 10 h, à Abidjan</span></div>
      <div><span class="ic">${ICO.outil}</span><span><b>Mobilier livré et monté</b>sans frais supplémentaires</span></div>
      <div><span class="ic">${ICO.mobile}</span><span><b>Paiement Mobile Money</b>${mmRang('mm-xs')}</span></div>
      <div><span class="ic">${ICO.doc}</span><span><b>Facture normalisée</b>FNE, prête pour la comptabilité</span></div>
    </div></section>
    <section class="sec"><div class="wrap">
      <div class="tete rv"><div><span class="eyebrow">La boutique</span><h2 class="h-l" style="margin-top:10px">Huit familles. Un seul fournisseur.</h2></div><a class="btn btn-l" href="#/boutique">Voir les ${P.length} articles ${ICO.fl}</a></div>
      <div class="bento">${tuile('mobilier', 'grand')}${tuile('cartouches', 'large')}${tuile('papier')}${tuile('ecriture')}${tuile('classement')}${tuile('bureau')}${tuile('machines')}${tuile('informatique')}</div>
    </div></section>
    ${rail('r-top', 'Les plus demandés', 'Ce que les bureaux d\'Abidjan recommandent chaque semaine.', tops, '#/boutique')}
    <section class="sec"><div class="wrap"><div class="b2b rv">
      <div class="txt"><span class="eyebrow">Entreprises et administrations</span><h2 class="h-l">Votre fournisseur de bureau, en compte.</h2>
        <p>Un compte professionnel pour toute l'équipe : commandes validées, paiement à 30 jours, factures FNE et réassort automatique des cartouches.</p>
        <ul><li><i>${ICO.ok}</i>Paiement à 30 jours sur bon de commande</li><li><i>${ICO.ok}</i>Liste d'achats récurrente, recommandée en un clic</li><li><i>${ICO.ok}</i>Réponse à vos appels d'offres, ligne par ligne</li></ul>
        <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-v" href="#/entreprises">Découvrir l'offre pro</a><a class="btn" style="color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)" href="#/compte">Voir l'espace entreprise</a></div></div>
      <div class="vis"><img src="${img('a/equipe')}" alt="Équipe au bureau (photo d'illustration)" loading="lazy">
        <div class="carte-pro"><span>Encours du mois · exemple</span><b>570 000 F CFA</b><span>sur un plafond de 1 500 000 F CFA</span><div class="barre"><i></i></div></div></div>
    </div></div></section>
    <section class="sec-s"><div class="wrap">
      <div class="tete rv"><div><span class="eyebrow o">Services</span><h2 class="h-l" style="margin-top:10px">Plus qu'une boutique.</h2></div><a class="btn btn-l" href="#/services">Tous les services ${ICO.fl}</a></div>
      <div class="svc-g">${OP.SERVICES.map((s, i) => `<a class="svc rv ${i === 0 ? 'grand' : ''}" href="#/services#${s.id}"><div class="ph"><img src="${img(s.img)}" alt="" loading="lazy"></div><div class="tx"><h3>${esc(s.titre)}</h3><p>${esc(s.court)}</p>${i === 0 ? `<span class="lien" style="margin-top:18px">En savoir plus ${ICO.fl}</span>` : ''}</div></a>`).join('')}</div>
    </div></section>
    ${rail('r-mob', 'Le mobilier, livré et monté', 'Prix publiés par Office Plus sur sa page Facebook quand ils existent.', mob, '#/boutique/mobilier')}
    <section class="sec-s"><div class="wrap">
      <div class="tete rv"><div><span class="eyebrow">Comment ça marche</span><h2 class="h-l" style="margin-top:10px">Commander prend une minute.</h2></div></div>
      <div class="etapes"><div class="etape rv"><h3>Choisissez</h3><p>Cherchez par nom, référence ou modèle d'imprimante. Le site vérifie la compatibilité de vos cartouches.</p></div>
      <div class="etape rv d1"><h3>Payez comme vous voulez</h3><p>Wave, Orange Money, MTN MoMo, Moov Money, carte, à la livraison ou à 30 jours pour les entreprises.</p></div>
      <div class="etape rv d2"><h3>Recevez aujourd'hui</h3><p>Commande avant 10 h : livraison le jour même, suivi en direct et récapitulatif sur WhatsApp.</p></div></div>
      <div class="pay rv" style="margin-top:28px">${payChips()}</div>
    </div></section>
    <section class="sec-s"><div class="wrap"><div class="cta rv"><div><h2 class="h-l">Une liste longue ? Un appel d'offres ?</h2><p class="lead" style="margin-top:14px">Envoyez votre liste ou votre bordereau : Office Plus vous répond avec un devis chiffré ligne par ligne.</p></div>
      <div class="act"><a class="btn btn-n" href="#/devis">Demander un devis</a><a class="btn btn-w" href="${waLien('Bonjour Office Plus, voici ma liste pour un devis : ')}" target="_blank" rel="noopener">${ICO.wa}Envoyer sur WhatsApp</a></div></div></div></section>`;
    // suggestions
    const inp = $('#hq'), sg = $('#sugg'); let sel = -1;
    const rend = () => { const r = cherche(inp.value).slice(0, 6); sel = -1; sg.innerHTML = r.map(p => `<a href="#/produit/${p.id}">${imgTag(p.img, '')}<span>${esc(p.nom)}</span><b>${fcfa(p.prix)}</b></a>`).join(''); sg.classList.toggle('on', r.length > 0 && document.activeElement === inp); };
    inp.addEventListener('input', rend); inp.addEventListener('focus', rend);
    inp.addEventListener('blur', () => setTimeout(() => sg.classList.remove('on'), 180));
    inp.addEventListener('keydown', e => { const L = $$('a', sg); if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, Math.min(L.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1))); L.forEach((a, i) => a.classList.toggle('sel', i === sel)); } if (e.key === 'Enter' && sel >= 0 && L[sel]) { e.preventDefault(); location.hash = L[sel].getAttribute('href'); } });
    $('#f-rch').addEventListener('submit', e => { e.preventDefault(); const q = inp.value.trim(); location.hash = '#/boutique' + (q ? '?q=' + encodeURIComponent(q) : ''); });
  }
  /* logos officiels des moyens de paiement (fonds transparents, assets/img/pay) */
  const MM = [['wave', 'Wave', 'wave.png'], ['om', 'Orange Money', 'orange-money.svg'], ['mtn', 'MTN MoMo', 'momo-mark.png'], ['moov', 'Moov Money', 'moov-mark.png']];
  const mmLogo = (k, cls) => { const m = MM.find(x => x[0] === k); return m ? `<span class="pl ${cls || ''}"><img src="assets/img/pay/${m[2]}" alt="${m[1]}" width="32" height="32" loading="eager"></span>` : ''; };
  function mmRang(cls) { return `<div class="mm-rang ${cls || ''}">${MM.map(([k, n]) => `<span title="${n}">${mmLogo(k)}<em>${n}</em></span>`).join('')}</div>`; }
  function payChips() {
    return MM.map(([k, n]) => `<span>${mmLogo(k, 'pl-s')}${n}</span>`).join('') + [['Carte bancaire', ICO.carte], ['Paiement à la livraison', ICO.camion], ['Virement à 30 jours', ICO.immeuble]].map(([n, ic]) => `<span><span class="pl pl-s pl-i">${ic}</span>${n}</span>`).join('');
  }

  /* ---------- page : boutique ---------- */
  const F = { fams: new Set(), marques: new Set(), max: 0, stock: false, confirme: false, q: '', tri: 'pert' };
  function pBoutique(fam, q) {
    const prixMax = Math.max(...P.map(p => p.prix));
    F.fams = new Set(fam && OP.FAM[fam] ? [fam] : []); F.marques = new Set(); F.max = prixMax; F.stock = false; F.confirme = false; F.q = q || ''; F.tri = 'pert';
    const marques = [...new Set(P.map(p => p.marque))].sort((a, b) => a === 'Sans marque' ? 1 : b === 'Sans marque' ? -1 : a.localeCompare(b));
    const titre = fam && OP.FAM[fam] ? OP.FAM[fam].nom : (q ? 'Résultats pour « ' + esc(q) + ' »' : 'La boutique');
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span><a href="#/boutique">Boutique</a>${fam && OP.FAM[fam] ? `<span>/</span>${esc(OP.FAM[fam].court)}` : ''}</div>
      <div class="ph-tete"><h1 class="h-l">${titre}</h1><p class="lead">${fam && OP.FAM[fam] ? esc(OP.FAM[fam].txt) + ' ' : ''}Commandé avant 10 h, livré le jour même à Abidjan. Les prix marqués « indicatif » restent à confirmer par Office Plus.</p></div>
      <div class="pills" id="pills"><button class="pill" data-pf="">Tout</button>${Object.entries(OP.FAM).map(([k, f]) => `<button class="pill" data-pf="${k}">${esc(f.court)}</button>`).join('')}</div>
      <div class="catal">
        <aside class="filtres" id="filtres" aria-label="Filtres">
          <div class="fermer"><h3 class="h-m">Filtres</h3><button class="ib" type="button" data-ff aria-label="Fermer">${ICO.x}</button></div>
          <div><h4>Famille</h4>${Object.entries(OP.FAM).map(([k, f]) => `<label><input type="checkbox" name="fam" value="${k}">${esc(f.court)}<small>${famCount(k)}</small></label>`).join('')}</div>
          <div><h4>Marque</h4>${marques.map(m => `<label><input type="checkbox" name="mq" value="${esc(m)}">${esc(m)}<small>${P.filter(p => p.marque === m).length}</small></label>`).join('')}</div>
          <div><h4>Prix maximum</h4><input type="range" id="fmax" min="500" max="${prixMax}" step="500" value="${prixMax}" aria-label="Prix maximum"><div class="compte" id="fmax-v">${fcfa(prixMax)}</div></div>
          <div><h4>Disponibilité</h4><label><input type="checkbox" id="fstock">En stock seulement</label><label><input type="checkbox" id="fconf">Prix confirmé par Office Plus</label></div>
          <button class="btn btn-g btn-s" type="button" id="freset">Réinitialiser</button>
          <button class="btn btn-n btn-b appl" type="button" data-ff style="display:none" id="fappl">Voir les résultats</button>
        </aside>
        <div>
          <div class="barre-cat"><div class="rch">${ICO.loupe}<label class="sr" for="fq">Rechercher dans la boutique</label><input id="fq" type="search" placeholder="Rechercher dans la boutique" value="${esc(F.q)}"></div>
            <span class="compte" id="nbres"></span>
            <div style="display:flex;gap:8px"><button class="btn btn-l btn-s btn-filtres" type="button" id="btn-f">${ICO.filtre}Filtres</button>
            <label class="sr" for="ftri">Trier</label><select id="ftri"><option value="pert">Pertinence</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option><option value="nom">Nom A → Z</option></select></div></div>
          <div class="grille" id="grille"></div>
        </div>
      </div></div>`;
    $$('#filtres input[name=fam]').forEach(i => i.checked = F.fams.has(i.value));
    const rend = () => {
      let L = F.q ? cherche(F.q) : P.slice();
      L = L.filter(p => (!F.fams.size || F.fams.has(p.fam)) && (!F.marques.size || F.marques.has(p.marque)) && p.prix <= F.max && (!F.stock || p.stock > 0) && (!F.confirme || p.src));
      if (F.tri === 'asc') L.sort((a, b) => a.prix - b.prix); else if (F.tri === 'desc') L.sort((a, b) => b.prix - a.prix); else if (F.tri === 'nom') L.sort((a, b) => a.nom.localeCompare(b.nom)); else L.sort((a, b) => (b.top || 0) - (a.top || 0));
      $('#grille').innerHTML = L.length ? L.map(carte).join('') : `<div class="vide"><h3>Aucun article ne correspond</h3><p class="lead" style="margin:0 auto 20px">Élargissez les filtres, ou demandez-le à Office Plus : l'article peut être commandé pour vous.</p><a class="btn btn-n" href="#/devis">Demander un devis</a></div>`;
      $('#nbres').textContent = L.length + ' article' + (L.length > 1 ? 's' : '');
      $('#fappl').textContent = 'Voir les ' + L.length + ' résultats';
      $$('#pills .pill').forEach(b => b.classList.toggle('on', b.dataset.pf === '' ? F.fams.size === 0 : (F.fams.size === 1 && F.fams.has(b.dataset.pf))));
      $('#btn-f').innerHTML = ICO.filtre + 'Filtres' + (F.fams.size + F.marques.size + (F.stock ? 1 : 0) + (F.confirme ? 1 : 0) + (F.max < prixMax ? 1 : 0) ? ' (' + (F.fams.size + F.marques.size + (F.stock ? 1 : 0) + (F.confirme ? 1 : 0) + (F.max < prixMax ? 1 : 0)) + ')' : '');
    };
    $('#filtres').addEventListener('change', e => {
      const t = e.target;
      if (t.name === 'fam') t.checked ? F.fams.add(t.value) : F.fams.delete(t.value);
      if (t.name === 'mq') t.checked ? F.marques.add(t.value) : F.marques.delete(t.value);
      if (t.id === 'fstock') F.stock = t.checked; if (t.id === 'fconf') F.confirme = t.checked; rend();
    });
    $('#fmax').addEventListener('input', e => { F.max = +e.target.value; $('#fmax-v').textContent = fcfa(F.max); rend(); });
    $('#fq').addEventListener('input', e => { F.q = e.target.value; rend(); });
    $('#ftri').addEventListener('change', e => { F.tri = e.target.value; rend(); });
    $('#freset').onclick = () => { F.fams.clear(); F.marques.clear(); F.max = prixMax; F.stock = F.confirme = false; F.q = ''; $('#fq').value = ''; $$('#filtres input[type=checkbox]').forEach(i => i.checked = false); $('#fmax').value = prixMax; $('#fmax-v').textContent = fcfa(prixMax); rend(); };
    $('#pills').addEventListener('click', e => { const b = e.target.closest('.pill'); if (!b) return; F.fams = new Set(b.dataset.pf ? [b.dataset.pf] : []); $$('#filtres input[name=fam]').forEach(i => i.checked = F.fams.has(i.value)); rend(); });
    $('#btn-f').onclick = () => { $('#filtres').classList.add('on'); $('#fappl').style.display = ''; document.body.style.overflow = 'hidden'; };
    $$('[data-ff]').forEach(b => b.onclick = () => { $('#filtres').classList.remove('on'); document.body.style.overflow = ''; });
    rend();
  }

  /* ---------- page : produit ---------- */
  function imprimantes() { return [...new Set(P.flatMap(p => p.compat || []))].concat(['Canon i-SENSYS MF643Cdw', 'Epson EcoTank L3250', 'HP LaserJet Pro M404dn']).sort(); }
  function pProduit(id) {
    const p = BYID[id]; if (!p) return p404();
    const f = OP.FAM[p.fam];
    const lies = P.filter(x => x.fam === p.fam && x.id !== p.id).slice(0, 8);
    const imp = store.get('imprimante', '');
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span><a href="#/boutique">Boutique</a><span>/</span><a href="#/boutique/${p.fam}">${esc(f.court)}</a><span>/</span>${esc(p.nom)}</div>
      <div class="fiche">
        <div class="galerie"><div class="grande" style="--t:${f.teinte}">${imgTag(p.img, p.nom)}<span class="legende">${p._ph ? `Photo envoyée par ${esc(p._ph.emp)}, validée par le gérant (démonstration)` : "Photo d'illustration"}</span></div></div>
        <div>
          <span class="mq">${esc(p.marque === 'Sans marque' ? f.nom : p.marque)}${p.ref ? ' · Réf. ' + esc(p.ref) : ''}</span>
          <h1>${esc(p.nom)}</h1>
          ${prixHtml(p)}${srcHtml(p)}
          <div style="margin-top:12px">${dispoHtml(p)}</div>
          <p class="desc">${esc(p.desc)}</p>
          ${p.compat ? `<div class="compat"><h4>Compatible avec votre imprimante ?</h4><p>Choisissez votre modèle, le site vérifie pour vous.</p><label class="sr" for="cimp">Votre imprimante</label><select id="cimp"><option value="">Choisir mon imprimante</option>${imprimantes().map(m => `<option${m === imp ? ' selected' : ''}>${esc(m)}</option>`).join('')}</select><div class="rep" id="crep"></div></div>` : ''}
          <div class="achat"><div class="qte"><button type="button" data-q="-1" aria-label="Moins">−</button><input id="qte" type="number" min="1" max="99" value="1" aria-label="Quantité"><button type="button" data-q="1" aria-label="Plus">+</button></div>
            <button class="btn btn-n" type="button" id="b-add"${p.stock <= 0 ? ' disabled style="opacity:.4"' : ''}>${ICO.sac}Ajouter au panier</button></div>
          <button class="btn btn-l btn-b" type="button" id="b-now"${p.stock <= 0 ? ' disabled style="opacity:.4"' : ''}>Commander</button>
          <div class="atouts-f"><div>${ICO.camion}<span>${avantDix() ? `Commandez dans les ${resteAvantDix()} : livré aujourd'hui` : 'Livré demain si commandé maintenant'}</span></div>
            <div>${p.fam === 'mobilier' ? ICO.outil + '<span>Livré et monté sans frais</span>' : ICO.doc + '<span>Facture normalisée FNE</span>'}</div>
            <div>${ICO.mobile}${mmRang('mm-xs')}</div><div>${ICO.immeuble}<span>Paiement à 30 jours pour les pros</span></div></div>
          <div class="acc">
            <details open><summary>Caractéristiques</summary><div class="in"><table>${p.carac.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}<tr><td>Famille</td><td>${esc(f.nom)}</td></tr><tr><td>Vendu par</td><td>${esc(p.unite)}</td></tr></table></div></details>
            <details><summary>Livraison${p.fam === 'mobilier' ? ' et montage' : ''}</summary><div class="in">Livraison le jour même à Abidjan pour toute commande passée avant 10 h, sur le créneau de votre choix.${p.fam === 'mobilier' ? ' Le mobilier est livré et monté par l\'équipe Office Plus, sans frais.' : ''} Hors Abidjan : sur devis.</div></details>
            <details><summary>Paiement et facture</summary><div class="in">Wave, Orange Money, MTN MoMo, Moov Money, carte bancaire, paiement à la livraison, ou bon de commande avec virement à 30 jours pour les comptes professionnels. Facture normalisée (FNE) remise avec chaque commande.</div></details>
            <details><summary>D'où vient ce prix ?</summary><div class="in">${esc(OP.SRC[p.src])}.${p.src ? '' : ' Office Plus le confirmera avant la mise en ligne.'}</div></details>
          </div>
        </div>
      </div></div>
      ${lies.length ? rail('r-lies', 'Dans la même famille', '', lies, '#/boutique/' + p.fam) : ''}`;
    const q = $('#qte');
    $$('[data-q]', $('.achat')).forEach(b => b.onclick = () => { q.value = Math.max(1, Math.min(99, (+q.value || 1) + +b.dataset.q)); });
    $('#b-add').onclick = () => ajouter(p.id, +q.value || 1);
    $('#b-now').onclick = () => { ajouter(p.id, +q.value || 1); location.hash = '#/commande'; };
    if (p.compat) {
      const chk = () => {
        const m = $('#cimp').value, r = $('#crep'); store.set('imprimante', m);
        if (!m) { r.className = 'rep'; return; }
        if (p.compat.includes(m)) { r.className = 'rep on oui'; r.innerHTML = ICO.ok + `<span>Oui, compatible avec votre ${esc(m)}.</span>`; }
        else { const bon = P.find(x => x.fam === 'cartouches' && (x.compat || []).includes(m)); r.className = 'rep on non'; r.innerHTML = ICO.x + `<span>Non compatible avec votre ${esc(m)}.${bon ? ` <a href="#/produit/${bon.id}">Voir la cartouche qui convient</a>` : ` <a href="#/devis">Demandez-la à Office Plus</a>`}</span>`; }
      };
      $('#cimp').addEventListener('change', chk); chk();
    }
  }

  /* ---------- page : panier ---------- */
  function resume(btn) {
    const L = lignesPanier(), t = total(L);
    return `<div class="boite recap"><h3>Récapitulatif</h3>
      <div class="l"><span>Articles (${nbPanier()})</span><span>${fcfa(t)}</span></div>
      <div class="l"><span>Livraison à Abidjan</span><span>Offerte*</span></div>
      <div class="l t"><span>Total</span><span>${fcfa(t)}</span></div>
      <div class="liv ${avantDix() ? '' : 'tard'}">${ICO.camion}<span>${avantDix() ? `Commandez dans les <b>${resteAvantDix()}</b> : livré aujourd'hui.` : 'Il est plus de 10 h : livraison demain, sur le créneau de votre choix.'}</span></div>
      ${btn}
      <p class="note">${ICO.bouclier}<span>Paiement simulé : aucune somme n'est prélevée sur cette maquette. *Conditions de livraison à confirmer par Office Plus.</span></p></div>`;
  }
  function pPanier() {
    const L = lignesPanier();
    if (!L.length) { app.innerHTML = `<div class="wrap"><div class="conf"><div class="coche" style="background:var(--bg)"><span style="color:var(--ink)">${ICO.sac}</span></div><h1>Votre panier est vide</h1><p class="lead" style="margin:0 auto 26px">Commencez par les articles les plus demandés.</p><a class="btn btn-n" href="#/boutique">Aller à la boutique</a></div></div>${rail('r-v', 'Les plus demandés', '', P.filter(p => p.top), '#/boutique')}`; return; }
    app.innerHTML = `<div class="wrap"><div class="ph-tete"><h1 class="h-l">Votre panier</h1></div><div class="duo">
      <div class="boite" id="lignes">${L.map(([id, q]) => { const p = BYID[id]; return `<div class="ligne" data-id="${id}"><a class="vi" href="#/produit/${id}" style="--t:${teinte(p)}">${imgTag(p.img, '')}</a><div><h4>${esc(p.nom)}</h4><span class="compte">${fcfa(p.prix)} / ${esc(p.unite)}</span><br><div class="qte"><button type="button" data-lq="-1" aria-label="Moins">−</button><input type="number" min="1" max="99" value="${q}" aria-label="Quantité"><button type="button" data-lq="1" aria-label="Plus">+</button></div></div><div class="d"><b class="prix" style="font-size:17px">${fcfa(p.prix * q)}</b><button class="sup" type="button" data-sup>Retirer</button></div></div>`; }).join('')}
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="btn btn-g btn-s" href="#/boutique">Continuer mes achats</a><button class="btn btn-g btn-s" type="button" id="b-devis-p">${ICO.dl}Devis PDF de ce panier</button></div></div>
      <div>${resume(`<a class="btn btn-n btn-b" href="#/commande" id="b-cmd" style="height:56px">Commander ${ICO.fl}</a>`)}<div class="boite pay-boite"><small>Payez en toute simplicité</small>${mmRang('mm-boite')}<p class="compte">Aussi : carte bancaire, à la livraison, ou virement à 30 jours pour les comptes pro.</p></div></div>
    </div></div>`;
    $('#lignes').addEventListener('click', e => {
      const li = e.target.closest('.ligne'); if (!li) return; const id = li.dataset.id;
      if (e.target.closest('[data-sup]')) { delete panier[id]; majPanier(); pPanier(); return; }
      const b = e.target.closest('[data-lq]'); if (b) { panier[id] = Math.max(1, Math.min(99, panier[id] + +b.dataset.lq)); majPanier(); pPanier(); }
    });
    $('#lignes').addEventListener('change', e => { const li = e.target.closest('.ligne'); if (li && e.target.type === 'number') { panier[li.dataset.id] = Math.max(1, Math.min(99, +e.target.value || 1)); majPanier(); pPanier(); } });
    $('#b-devis-p').onclick = () => devisPdf(lignesPanier(), 'Client');
  }

  /* ---------- page : commande ---------- */
  const PAYS = {
    wave: { n: 'Wave', c: '#1DC4FF', mm: 1, s: 'Validation dans l\'application' }, om: { n: 'Orange Money', c: '#FF7900', mm: 1, s: 'Code de confirmation' },
    mtn: { n: 'MTN MoMo', c: '#FFCB05', mm: 1, s: 'Validation sur le téléphone', tc: '#111418' }, moov: { n: 'Moov Money', c: '#0066B3', mm: 1, s: 'Validation sur le téléphone' },
    carte: { n: 'Carte bancaire', c: '#111418', s: 'Visa, Mastercard' }, livraison: { n: 'À la livraison', c: '#00A877', s: 'Espèces ou Mobile Money' },
    bc30: { n: 'Bon de commande', c: '#5E646B', s: 'Virement à 30 jours, comptes pro' }
  };
  function creneaux() {
    const a = avantDix();
    return a ? [['auj-12', 'Aujourd\'hui', '12 h – 14 h'], ['auj-15', 'Aujourd\'hui', '15 h – 17 h'], ['dem-9', 'Demain', '9 h – 12 h'], ['dem-14', 'Demain', '14 h – 17 h']]
      : [['dem-9', 'Demain', '9 h – 12 h'], ['dem-12', 'Demain', '12 h – 14 h'], ['dem-15', 'Demain', '15 h – 17 h'], ['ap-9', 'Après-demain', '9 h – 12 h']];
  }
  function pCommande() {
    const L = lignesPanier(); if (!L.length) { location.hash = '#/panier'; return; }
    const cr = creneaux();
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/panier">Panier</a><span>/</span>Commande</div><div class="ph-tete"><h1 class="h-l">Commande</h1></div><div class="duo">
      <form id="fcmd" novalidate>
        <div class="boite"><h3><span class="num">1</span>Vos coordonnées <button class="btn btn-g btn-s" type="button" id="prefill" style="margin-left:auto">Je suis client pro</button></h3><div class="champs">
          <div class="champ"><label for="c-nom">Nom et prénom</label><input id="c-nom" autocomplete="name"><span class="err">Indiquez votre nom.</span></div>
          <div class="champ"><label for="c-tel">Téléphone</label><input id="c-tel" type="tel" inputmode="tel" placeholder="07 00 00 00 00" autocomplete="tel"><span class="err">Numéro ivoirien à 10 chiffres.</span></div>
          <div class="champ"><label for="c-org">Société ou administration (facultatif)</label><input id="c-org" autocomplete="organization"></div>
          <div class="champ"><label for="c-mail">E-mail pour la facture (facultatif)</label><input id="c-mail" type="email" autocomplete="email"><span class="err">Adresse e-mail incomplète.</span></div></div></div>
        <div class="boite"><h3><span class="num">2</span>Livraison</h3><div class="champs">
          <div class="champ"><label for="c-commune">Commune</label><select id="c-commune"><option value="">Choisir</option>${OP.COMMUNES.map(c => `<option>${c}</option>`).join('')}</select><span class="err">Choisissez une commune.</span></div>
          <div class="champ"><label for="c-adr">Adresse et repère</label><input id="c-adr" placeholder="Rue, immeuble, étage, repère"><span class="err">Indiquez l'adresse.</span></div>
          <div class="champ full"><label>Créneau</label><div class="choix cren">${cr.map(([v, j, h], i) => `<label><input type="radio" name="cren" value="${v}"${i === 0 ? ' checked' : ''}><span class="c"><b>${j}</b><small>${h}</small></span></label>`).join('')}</div></div></div></div>
        <div class="boite"><h3><span class="fp-num">3</span>Paiement</h3><div class="choix" id="pays">${Object.entries(PAYS).map(([k, v], i) => `<label><input type="radio" name="pay" value="${k}"${i === 0 ? ' checked' : ''}><span class="c"><b>${v.mm ? mmLogo(k) : `<span class="pl pl-i">${{ carte: ICO.carte, livraison: ICO.camion, bc30: ICO.immeuble }[k]}</span>`}${v.n}</b><small>${v.s}</small></span></label>`).join('')}</div>
          <div class="champs" style="margin-top:14px"><div class="champ" id="ch-mm"><label for="c-mm">Numéro Mobile Money</label><input id="c-mm" type="tel" inputmode="tel" placeholder="07 00 00 00 00"><span class="err">Numéro à 10 chiffres.</span></div></div></div>
      </form>
      <div>${resume(`<button class="btn btn-v btn-b" type="button" id="payer" style="height:56px">Payer ${fcfa(total(L))}</button>`)}<div class="boite" style="margin-top:16px">${L.map(([id, q]) => `<div class="sb"><img src="${img(BYID[id].img)}" alt=""><span>${q} × ${esc(BYID[id].nom)}</span><b>${fcfa(BYID[id].prix * q)}</b></div>`).join('')}</div></div>
    </div></div>`;
    const maj = () => {
      const v = $('input[name=pay]:checked').value; $('#ch-mm').style.display = PAYS[v].mm ? '' : 'none';
      $('#payer').textContent = v === 'livraison' ? 'Confirmer la commande' : v === 'bc30' ? 'Envoyer le bon de commande' : 'Payer ' + fcfa(total(lignesPanier()));
    };
    $('#fcmd').addEventListener('change', maj);
    $('#fcmd').addEventListener('input', e => { const c = e.target.closest('.champ'); if (c) c.classList.remove('bad'); });
    $('#c-tel').addEventListener('input', e => { if (!$('#c-mm').dataset.touche) $('#c-mm').value = e.target.value; });
    $('#c-mm').addEventListener('input', e => e.target.dataset.touche = 1);
    $('#prefill').onclick = () => { const S = OP.SOCIETE; $('#c-nom').value = S.contact; $('#c-tel').value = S.tel; $('#c-mm').value = S.tel; $('#c-org').value = S.nom; $('#c-commune').value = S.commune; $('#c-adr').value = S.adresse; $('input[name=pay][value=bc30]').checked = true; $$('.champ.bad').forEach(c => c.classList.remove('bad')); maj(); toast('Coordonnées du compte « ' + esc(S.nom) + ' » reprises (exemple)'); };
    maj();
    $('#payer').onclick = () => {
      const tel = s => /^0\d{9}$/.test(s.replace(/\D/g, ''));
      const pay = $('input[name=pay]:checked').value;
      const v = { nom: $('#c-nom').value.trim(), tel: $('#c-tel').value.trim(), org: $('#c-org').value.trim(), mail: $('#c-mail').value.trim(), commune: $('#c-commune').value, adr: $('#c-adr').value.trim(), cren: $('input[name=cren]:checked').value, pay, mm: $('#c-mm').value.trim() };
      const err = [['c-nom', !v.nom], ['c-tel', !tel(v.tel)], ['c-mail', v.mail && !/^\S+@\S+\.\S+$/.test(v.mail)], ['c-commune', !v.commune], ['c-adr', !v.adr], ['c-mm', PAYS[pay].mm && !tel(v.mm)]];
      err.forEach(([id, bad]) => $('#' + id).closest('.champ').classList.toggle('bad', !!bad));
      const first = err.find(x => x[1]); if (first) { $('#' + first[0]).focus(); $('#' + first[0]).closest('.boite').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      if (PAYS[pay].mm || pay === 'carte') paiement(v); else valider(v);
    };
  }
  function paiement(v) {
    const p = PAYS[v.pay], mt = total(lignesPanier());
    const etape1 = v.pay === 'carte'
      ? `<div class="champs"><div class="champ full"><label for="cb1">Numéro de carte (fictif)</label><input id="cb1" value="4242 4242 4242 4242" inputmode="numeric"></div><div class="champ"><label for="cb2">Expiration</label><input id="cb2" value="12/28"></div><div class="champ"><label for="cb3">Cryptogramme</label><input id="cb3" value="123"></div></div>`
      : `<p style="font-size:14.5px;color:var(--mute);margin-bottom:6px">Une demande de paiement va être envoyée au <b style="color:var(--ink)">${esc(v.mm)}</b>.</p>`;
    modale(`<div class="mm-tete">${p.mm ? mmLogo(v.pay, 'pl-l') : `<span class="pl pl-l pl-i">${ICO.carte}</span>`}<span><b>${p.n}</b><small>Paiement sécurisé · simulation</small></span></div>
      <div class="mm-mt"><span>Montant</span><b>${fcfa(mt)}</b></div><div id="mm-corps">${etape1}<button class="btn btn-v btn-b" type="button" id="mm-go" style="margin-top:16px;height:52px">${v.pay === 'carte' ? 'Payer ' + fcfa(mt) : 'Envoyer la demande de paiement'}</button></div>
      <p class="fictif">Démonstration : aucun paiement réel n'est effectué.</p>`);
    $('#mm-go').onclick = () => {
      $('#mm-corps').innerHTML = `<div class="attente"><div class="fp-spin"></div><b style="font:700 18px var(--fh)">${v.pay === 'carte' ? 'Vérification 3-D Secure…' : 'Validez sur votre téléphone'}</b><p style="color:var(--mute);font-size:14px;margin-top:6px">${v.pay === 'carte' ? 'Votre banque confirme le paiement.' : 'Ouvrez ' + p.n + ' et confirmez le paiement de ' + fcfa(mt) + '.'}</p></div>`;
      setTimeout(() => {
        $('#mm-corps').innerHTML = `<div class="attente"><div class="coche"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></div><b style="font:700 20px var(--fh)">Paiement accepté</b><p style="color:var(--mute);font-size:14px;margin-top:6px">Redirection vers votre confirmation…</p></div>`;
        setTimeout(() => { fermerModale(); valider(v); }, 1100);
      }, 2200);
    };
  }
  function valider(v) {
    const L = lignesPanier(), ref = nouvelleRef('OP');
    const cr = creneaux().find(c => c[0] === v.cren) || creneaux()[0];
    const cmds = store.get('cmds', {});
    cmds[ref] = { ref, lignes: L, total: total(L), client: v.org || v.nom, nom: v.nom, tel: v.tel, commune: v.commune, adr: v.adr, creneau: cr[1] + ' ' + cr[2], pay: PAYS[v.pay].n, statut: 0, date: dateFr(new Date()), heure: new Date().toISOString().slice(11, 16), nouveau: 1 };
    store.set('cmds', cmds); panier = {}; majPanier();
    location.hash = '#/confirmation/' + ref;
  }
  const ETAPES = ['Reçue', 'Préparée', 'En livraison', 'Livrée'];
  const suiviHtml = st => `<div class="suivi">${ETAPES.map((e, i) => `<div class="s ${i < st ? 'ok' : ''} ${i === st ? 'ok cur' : ''}"><span class="pt">${i <= st ? ICO.ok : ''}</span><b>${e}</b>${['Office Plus a votre commande', 'Articles réunis et contrôlés', 'Le livreur est en route', 'Remise contre signature'][i]}</div>`).join('')}</div>`;
  function texteWa(c) { return `Bonjour Office Plus, voici ma commande ${c.ref} :\n` + c.lignes.map(([id, q]) => `- ${q} × ${BYID[id].nom}`).join('\n') + `\nTotal : ${fcfa(c.total)}\nLivraison : ${c.commune}, ${c.creneau}\nPaiement : ${c.pay}`; }
  function pConfirmation(ref) {
    const c = store.get('cmds', {})[ref]; if (!c) return p404();
    app.innerHTML = `<div class="wrap"><div class="conf">
      <div class="coche"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></div>
      <h1>Merci${c.nom ? ', ' + esc(c.nom.split(' ')[0]) : ''}. C'est commandé.</h1>
      <span class="refc">Commande ${esc(c.ref)}</span>
      <p class="lead" style="margin:0 auto">Livraison à ${esc(c.commune)}, ${esc(c.creneau)}. Paiement : ${esc(c.pay)}.</p>
      ${suiviHtml(c.statut)}
      <div class="boite" style="text-align:left">${c.lignes.map(([id, q]) => `<div class="sb"><img src="${img(BYID[id].img)}" alt=""><span>${q} × ${esc(BYID[id].nom)}</span><b>${fcfa(BYID[id].prix * q)}</b></div>`).join('')}<div class="l t" style="display:flex;justify-content:space-between;font:700 19px var(--fh);padding-top:14px;margin-top:6px;border-top:1px solid var(--line)"><span>Total</span><span>${fcfa(c.total)}</span></div></div>
      <div class="wa-carte"><b>Récapitulatif prêt pour WhatsApp</b>${esc(texteWa(c))}</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a class="btn btn-w" href="${waLien(texteWa(c))}" target="_blank" rel="noopener">${ICO.wa}Envoyer sur WhatsApp</a><a class="btn btn-n" href="#/suivi/${c.ref}">Suivre ma commande</a><button class="btn btn-l" type="button" id="b-fac">${ICO.dl}Facture PDF</button></div>
      <p class="fictif" style="margin-top:22px">Démonstration : aucun paiement réel, aucune donnée transmise.</p></div></div>`;
    $('#b-fac').onclick = () => facturePdf({ ref: c.ref, date: c.date, lignes: c.lignes }, c.client);
  }
  function pSuivi(ref) {
    const cmds = store.get('cmds', {}); const c = ref && cmds[ref];
    app.innerHTML = `<div class="wrap"><div class="conf" style="text-align:left;max-width:820px"><span class="eyebrow">Suivi de commande</span><h1 style="margin-top:10px">${c ? 'Commande ' + esc(c.ref) : 'Où en est ma commande ?'}</h1>
      <form id="f-suivi" style="display:flex;gap:10px;margin:18px 0;max-width:520px"><label class="sr" for="sref">Référence</label><input id="sref" style="flex:1;height:50px;border-radius:999px;border:0;background:#fff;padding:0 18px;box-shadow:inset 0 0 0 1px var(--line2)" placeholder="Référence, ex. OP-261106-123" value="${esc(ref || '')}"><button class="btn btn-n" type="submit">Suivre</button></form>
      <div id="suivi-z">${c ? '' : (ref ? '<p class="lead">Référence introuvable sur cet appareil.</p>' : '<p class="lead">La référence figure sur votre confirmation et sur WhatsApp.</p>')}</div></div></div>`;
    $('#f-suivi').onsubmit = e => { e.preventDefault(); location.hash = '#/suivi/' + encodeURIComponent($('#sref').value.trim()); };
    if (c) {
      const rend = () => { $('#suivi-z').innerHTML = suiviHtml(c.statut) + `<p class="lead">Livraison à ${esc(c.commune)}, ${esc(c.creneau)}.</p>` + (c.statut < 3 ? `<button class="btn btn-g btn-s" type="button" id="b-next" style="margin-top:16px">Démo : passer à l'étape suivante</button>` : `<p style="margin-top:16px;font-weight:600;color:var(--vert-d)">Commande livrée. Merci !</p>`); const b = $('#b-next'); if (b) b.onclick = () => { c.statut++; cmds[c.ref] = c; store.set('cmds', cmds); rend(); }; };
      rend();
    }
  }

  /* ---------- PDF ---------- */
  function pdfBase(titre, num, client) {
    const { jsPDF } = window.jspdf; const d = new jsPDF({ unit: 'mm', format: 'a4' });
    d.setFillColor(17, 20, 24); d.rect(0, 0, 210, 30, 'F');
    d.setTextColor(255, 255, 255); d.setFont('helvetica', 'bold'); d.setFontSize(18); d.text('OFFICE PLUS', 16, 18);
    d.setFont('helvetica', 'normal'); d.setFontSize(8.5); d.text('Fournitures et mobilier de bureau · Abidjan · NCC 2104959E', 16, 24);
    d.setFontSize(16); d.setFont('helvetica', 'bold'); d.text(titre, 194, 18, { align: 'right' }); d.setFontSize(9); d.setFont('helvetica', 'normal'); d.text(num + ' · ' + dateFr(new Date()), 194, 24, { align: 'right' });
    d.setTextColor(17, 20, 24); d.setFontSize(10); d.text('Client : ' + client, 16, 42);
    d.setFillColor(253, 241, 230); d.rect(16, 46, 178, 8, 'F'); d.setTextColor(122, 58, 5); d.setFontSize(8.5); d.text('DOCUMENT DE DÉMONSTRATION · données fictives, sans valeur commerciale ni fiscale', 105, 51.3, { align: 'center' });
    return d;
  }
  function pdfLignes(d, L, y) {
    d.setTextColor(94, 100, 107); d.setFontSize(8.5); d.text('DÉSIGNATION', 16, y); d.text('QTÉ', 128, y, { align: 'right' }); d.text('PRIX UNITAIRE', 160, y, { align: 'right' }); d.text('MONTANT', 194, y, { align: 'right' });
    d.setDrawColor(220, 222, 218); d.line(16, y + 2.5, 194, y + 2.5); y += 9; d.setTextColor(17, 20, 24); d.setFontSize(9.5);
    L.forEach(([id, q]) => { const p = BYID[id]; d.text(d.splitTextToSize(p.nom + (p.src ? '' : ' *'), 100)[0], 16, y); d.text(String(q), 128, y, { align: 'right' }); d.text(fcfa(p.prix).replace(/\u202f|\u00a0/g, ' '), 160, y, { align: 'right' }); d.text(fcfa(p.prix * q).replace(/\u202f|\u00a0/g, ' '), 194, y, { align: 'right' }); y += 7; });
    d.line(110, y, 194, y); y += 7; d.setFont('helvetica', 'bold'); d.setFontSize(11.5); d.text('TOTAL', 128, y, { align: 'right' }); d.text(fcfa(total(L)).replace(/\u202f|\u00a0/g, ' '), 194, y, { align: 'right' }); d.setFont('helvetica', 'normal');
    return y + 12;
  }
  function pdfPied(d, y, lignes) { d.setFontSize(8.5); d.setTextColor(94, 100, 107); lignes.forEach(l => { d.text(d.splitTextToSize(l, 178), 16, y); y += 5.5; }); d.text('Office Plus · ' + OP.TEL + ' · ' + OP.MAIL, 105, 285, { align: 'center' }); }
  function devisPdf(L, client) {
    if (!L.length) { toast('Ajoutez des articles pour générer un devis'); return; }
    const d = pdfBase('DEVIS', nouvelleRef('DV'), client); const y = pdfLignes(d, L, 64);
    pdfPied(d, y, ['Validité : 30 jours. Livraison à Abidjan le jour même pour toute commande avant 10 h ; mobilier livré et monté.', '* Prix indicatif, à confirmer par Office Plus. Les autres prix reprennent la facture du 17/09/2026 ou la page Facebook d\'Office Plus.']);
    d.save('OfficePlus_devis_demo.pdf'); toast('Devis PDF téléchargé');
  }
  function facturePdf(h, client) {
    const d = pdfBase('FACTURE', h.ref, client); const y = pdfLignes(d, h.lignes, 64);
    pdfPied(d, y, ['Facture normalisée électronique (FNE) : le QR code et le numéro de certification de la DGI figureront sur la facture réelle.', 'Marchandises non échangeables, non remboursables, passé un délai de 7 jours.']);
    d.save('OfficePlus_facture_' + h.ref + '_demo.pdf'); toast('Facture PDF téléchargée');
  }

  /* ---------- page : services ---------- */
  function pServices() {
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Services</div>
      <div class="ph-hero rv"><img src="${img('a/equipe2')}" alt="Équipe au travail (photo d'illustration)"><div class="tx"><span class="eyebrow">Services</span><h1 class="h-xl" style="font-size:clamp(38px,5.4vw,72px);margin-top:10px">On s'occupe du bureau. Vous, du reste.</h1><p>Livraison le jour même, mobilier monté, imprimantes entretenues, réassort automatique et aménagement complet.</p></div></div>
      <div class="pills" style="margin-top:28px">${OP.SERVICES.map(s => `<a class="pill" href="#/services#${s.id}">${esc(s.titre)}</a>`).join('')}</div>
      <div class="svc-l" style="margin-top:10px">${OP.SERVICES.map(s => `<section class="svc-row rv" id="${s.id}"><div class="ph"><img src="${img(s.img)}" alt="" loading="lazy"></div><div class="tx"><span class="eyebrow">${s.src ? 'Engagement Office Plus' : 'Proposition de service'}</span><h2>${esc(s.titre)}</h2><p>${esc(s.court)}</p><ul>${s.points.map(x => `<li>${ICO.ok}${esc(x)}</li>`).join('')}</ul><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-n" href="#/devis?service=${s.id}">Demander ce service</a><a class="btn btn-w" href="${waLien('Bonjour Office Plus, je souhaite des informations sur : ' + s.titre)}" target="_blank" rel="noopener">${ICO.wa}WhatsApp</a></div><p class="src">${s.src ? esc(s.src) : 'Service proposé dans cette maquette : contenu et conditions à confirmer par Office Plus.'}</p></div></section>`).join('')}</div>
      </div>${ctaBloc()}`;
  }
  const ctaBloc = () => `<section class="sec-s"><div class="wrap"><div class="cta rv"><div><h2 class="h-l">Parlons de votre bureau.</h2><p class="lead" style="margin-top:14px">Un devis, une question, un appel d'offres : réponse rapide, par téléphone ou WhatsApp.</p></div><div class="act"><a class="btn btn-n" href="#/devis">Demander un devis</a><a class="btn btn-l" href="#/contact">Nous contacter</a></div></div></div></section>`;

  /* ---------- page : entreprises ---------- */
  function pEntreprises() {
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Entreprises et administrations</div>
      <div class="ph-hero rv"><img src="${img('a/bureau-femme2')}" alt="Assistante de direction à son bureau (photo d'illustration)"><div class="tx"><span class="eyebrow">Entreprises et administrations</span><h1 class="h-xl" style="font-size:clamp(38px,5.4vw,72px);margin-top:10px">Le compte pro qui simplifie les achats.</h1><p>Commandes validées en interne, paiement à 30 jours, factures FNE, réponse aux appels d'offres.</p></div></div></div>
      <section class="sec"><div class="wrap"><div class="tete rv"><div><span class="eyebrow">Trois façons de travailler ensemble</span><h2 class="h-l" style="margin-top:10px">Choisissez la formule.</h2></div></div>
        <div class="offres">
          <div class="offre rv"><span class="tag v" style="align-self:flex-start">Gratuit</span><h3>Compte professionnel</h3><p>Pour les PME, cabinets, écoles et ONG qui commandent régulièrement.</p><ul><li>${ICO.ok}Plusieurs acheteurs, un valideur</li><li>${ICO.ok}Historique et recommande en un clic</li><li>${ICO.ok}Factures FNE téléchargeables</li><li>${ICO.ok}Alerte avant la fin des cartouches</li></ul><a class="btn btn-l btn-b" href="#/compte">Voir l'espace entreprise</a></div>
          <div class="offre n rv d1" id="paiement"><span class="tag o" style="align-self:flex-start">Le plus choisi</span><h3>Paiement à 30 jours</h3><p>Commandez sur bon de commande, réglez par virement à 30 jours fin de mois.</p><ul><li>${ICO.ok}Plafond défini avec votre direction</li><li>${ICO.ok}Relevé mensuel unique</li><li>${ICO.ok}Encours suivi en temps réel</li><li>${ICO.ok}Adapté aux circuits de validation publics</li></ul><a class="btn btn-v btn-b" href="#/devis?type=compte">Ouvrir un compte à 30 jours</a></div>
          <div class="offre rv d2"><span class="tag" style="align-self:flex-start">Sur mesure</span><h3>Contrat d'approvisionnement</h3><p>Vos fournitures livrées chaque mois, à prix fixés pour l'année.</p><ul><li>${ICO.ok}Liste récurrente définie ensemble</li><li>${ICO.ok}Livraison programmée</li><li>${ICO.ok}Une facture par mois</li><li>${ICO.ok}Revue trimestrielle des besoins</li></ul><a class="btn btn-l btn-b" href="#/devis?type=contrat">Demander un contrat</a></div>
        </div><p class="note-src rv">Formules proposées dans cette maquette ; conditions (plafonds, délais, tarifs) à fixer par Office Plus.</p></div></section>
      <section class="sec-s"><div class="wrap"><div class="tete rv"><div><span class="eyebrow">L'espace entreprise</span><h2 class="h-l" style="margin-top:10px">Tout votre compte, en un écran.</h2></div><a class="btn btn-n" href="#/compte">Ouvrir l'espace entreprise ${ICO.fl}</a></div>
        <div class="valeurs"><div class="valeur rv"><span class="ic">${ICO.user}</span><h3>Plusieurs utilisateurs</h3><p>L'assistante commande, le directeur administratif valide au-delà du plafond.</p></div>
        <div class="valeur rv d1"><span class="ic">${ICO.cloche}</span><h3>Alertes cartouches</h3><p>Le site estime quand vos toners seront vides et propose de recommander à temps.</p></div>
        <div class="valeur rv d2"><span class="ic">${ICO.doc}</span><h3>Factures FNE</h3><p>Chaque facture normalisée est téléchargeable, prête pour la comptabilité.</p></div></div></div></section>
      <section class="sec" id="ao"><div class="wrap"><div class="tete rv"><div><span class="eyebrow o">Appels d'offres et marchés</span><h2 class="h-l" style="margin-top:10px">Votre bordereau, chiffré ligne par ligne.</h2><p class="lead">Administrations, projets, grandes entreprises : envoyez votre dossier, Office Plus répond dans les délais.</p></div></div>
        <div class="ao"><div class="rv"><b>Envoyez le dossier</b>Bordereau de prix, cahier des charges ou simple liste, par le formulaire ou WhatsApp.</div><div class="rv d1"><b>Chiffrage détaillé</b>Chaque ligne est chiffrée, avec les équivalences si une référence manque.</div><div class="rv d2"><b>Pièces administratives</b>Facture proforma, attestation et pièces demandées jointes à l'offre.</div><div class="rv d3"><b>Livraison suivie</b>Livraison planifiée, bons de livraison signés, facture FNE.</div></div>
        <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap" class="rv"><a class="btn btn-n" href="#/devis?type=ao">Envoyer un appel d'offres</a><a class="btn btn-w" href="${waLien('Bonjour Office Plus, nous avons un appel d\'offres à vous soumettre.')}" target="_blank" rel="noopener">${ICO.wa}Par WhatsApp</a></div></div></section>`;
  }

  /* ---------- page : qui sommes-nous ---------- */
  function pAPropos() {
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Qui sommes-nous</div>
      <section class="sec-s"><div class="deux"><div class="rv"><span class="eyebrow">Qui sommes-nous</span><h1 class="h-l" style="margin:12px 0 18px">Le fournisseur de bureau qui livre le jour même.</h1>
        <p class="lead">Office Plus équipe les bureaux d'Abidjan : fournitures, cartouches et toners, machines et mobilier. Une commande passée avant 10 h est livrée le jour même ; le mobilier est livré et monté.</p>
        <p class="lead" style="margin-top:14px">Entreprise ivoirienne immatriculée à Abidjan en 2021, Office Plus sert les PME, les cabinets, les écoles, les ONG et les administrations, depuis son point de vente de Biétry.</p>
        <div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap"><a class="btn btn-n" href="#/boutique">Voir la boutique</a><a class="btn btn-l" href="#/contact">Nous rendre visite</a></div></div>
        <div class="photo-r rv d1"><img src="${img('a/bureau-femme')}" alt="Professionnelle au bureau (photo d'illustration)"></div></div></section>
      <section class="sec-s"><div class="chiffres">
        <div class="chiffre rv"><b class="grad">10 h</b><span>Heure limite pour être livré le jour même</span></div>
        <div class="chiffre rv d1"><b>8</b><span>Familles de produits, du stylo à la salle de réunion</span></div>
        <div class="chiffre rv d2"><b>${P.length}</b><span>Articles commandables en ligne sur ce site</span></div>
        <div class="chiffre rv d3"><b>0 F</b><span>Frais de montage du mobilier</span></div></div></section>
      <section class="sec-s"><div class="tete rv"><div><span class="eyebrow">Notre façon de travailler</span><h2 class="h-l" style="margin-top:10px">Rapide, juste, fiable.</h2></div></div>
        <div class="valeurs"><div class="valeur rv"><span class="ic">${ICO.horloge}</span><h3>Rapidité</h3><p>Le bureau ne doit jamais manquer de papier ni d'encre : la commande du matin arrive l'après-midi.</p></div>
        <div class="valeur rv d1"><span class="ic">${ICO.bulle}</span><h3>Conseil</h3><p>La bonne cartouche pour la bonne imprimante, le bon fauteuil pour la bonne journée de travail.</p></div>
        <div class="valeur rv d2"><span class="ic">${ICO.bouclier}</span><h3>Fiabilité</h3><p>Factures normalisées, prix clairs, engagement tenu sur les délais de livraison.</p></div></div>
        <p class="note-src rv">Sources : page Facebook d'Office Plus et facture du 17/09/2026 (raison sociale, NCC, point de vente de Biétry, année d'immatriculation au RCCM). L'histoire, l'équipe et les chiffres d'activité restent à compléter par Office Plus. Photos d'illustration.</p></section></div>${ctaBloc()}`;
  }

  /* ---------- page : devis ---------- */
  function pDevis(params) {
    const L = lignesPanier(); const svc = OP.SERVICES.find(s => s.id === params.get('service'));
    const type = params.get('type');
    const objet = svc ? svc.titre : type === 'ao' ? 'Appel d\'offres' : type === 'compte' ? 'Ouverture d\'un compte à 30 jours' : type === 'contrat' ? 'Contrat d\'approvisionnement' : '';
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Demande de devis</div><div class="ph-tete"><span class="eyebrow">Demande de devis</span><h1 class="h-l" style="margin-top:10px">Votre devis, ligne par ligne.</h1><p class="lead">Décrivez votre besoin ou joignez votre liste : Office Plus vous répond avec un devis chiffré.</p></div>
      <div class="duo" id="devis-z"><form class="boite" id="fdev" novalidate><div class="champs">
        <div class="champ"><label for="d-org">Société ou administration</label><input id="d-org" autocomplete="organization"><span class="err">Indiquez la structure.</span></div>
        <div class="champ"><label for="d-type">Type de structure</label><select id="d-type"><option>Entreprise</option><option>Administration</option><option>ONG ou projet</option><option>École</option><option>Particulier</option></select></div>
        <div class="champ"><label for="d-nom">Nom et fonction</label><input id="d-nom" autocomplete="name"><span class="err">Indiquez votre nom.</span></div>
        <div class="champ"><label for="d-tel">Téléphone</label><input id="d-tel" type="tel" inputmode="tel" placeholder="07 00 00 00 00"><span class="err">Numéro à 10 chiffres.</span></div>
        <div class="champ full"><label for="d-mail">E-mail</label><input id="d-mail" type="email" autocomplete="email"><span class="err">Adresse e-mail incomplète.</span></div>
        <div class="champ full"><label for="d-obj">Objet</label><input id="d-obj" value="${esc(objet)}" placeholder="Fournitures du trimestre, mobilier, toners…"><span class="err">Précisez l'objet.</span></div>
        <div class="champ full"><label for="d-msg">Votre besoin</label><textarea id="d-msg" placeholder="Articles, quantités, délai souhaité, lieu de livraison…"></textarea><span class="err">Décrivez votre besoin en quelques mots.</span></div>
        <div class="champ"><label for="d-delai">Délai souhaité</label><select id="d-delai"><option>Dès que possible</option><option>Sous une semaine</option><option>Sous un mois</option><option>Date précise (à indiquer)</option></select></div>
        <div class="champ"><label for="d-fic">Liste ou bordereau (facultatif)</label><input id="d-fic" type="file" style="padding-top:13px"></div>
        ${L.length ? `<label class="champ full" style="display:flex;gap:10px;align-items:center;font-size:14.5px"><input type="checkbox" id="d-pan" checked style="width:18px;height:18px">Joindre mon panier (${nbPanier()} articles, ${fcfa(total(L))})</label>` : ''}
      </div><button class="btn btn-n btn-b" type="submit" style="margin-top:20px;height:54px">Envoyer la demande</button><p class="fictif">Démonstration : la demande n'est transmise à personne.</p></form>
      <div><div class="boite"><h3>Réponse rapide</h3><div class="coord"><a href="tel:+2252724314352"><span class="ic">${ICO.tel}</span><span><b>${esc(OP.TEL)}</b><small>Téléphone</small></span></a><a href="${waLien('Bonjour Office Plus, je souhaite un devis pour : ')}" target="_blank" rel="noopener"><span class="ic" style="background:#E7FFDB;color:#128C4B">${ICO.wa}</span><span><b>WhatsApp</b><small>Envoyez une photo de votre liste</small></span></a><a href="mailto:${OP.MAIL}"><span class="ic">${ICO.mail}</span><span><b>E-mail</b><small>${esc(OP.MAIL)}</small></span></a></div></div></div></div></div>`;
    $('#fdev').addEventListener('input', e => { const c = e.target.closest('.champ'); if (c) c.classList.remove('bad'); });
    $('#fdev').onsubmit = e => {
      e.preventDefault();
      const g = id => $('#' + id).value.trim();
      const err = [['d-org', !g('d-org')], ['d-nom', !g('d-nom')], ['d-tel', !/^0\d{9}$/.test(g('d-tel').replace(/\D/g, ''))], ['d-mail', g('d-mail') && !/^\S+@\S+\.\S+$/.test(g('d-mail'))], ['d-obj', !g('d-obj')], ['d-msg', !g('d-msg') && !(L.length && $('#d-pan') && $('#d-pan').checked)]];
      err.forEach(([id, b]) => $('#' + id).closest('.champ').classList.toggle('bad', !!b));
      const f = err.find(x => x[1]); if (f) { $('#' + f[0]).focus(); return; }
      const ref = nouvelleRef('DV'), avec = L.length && $('#d-pan') && $('#d-pan').checked;
      const dv = store.get('devis', []); dv.unshift({ ref, client: g('d-org'), objet: g('d-obj'), date: dateFr(new Date()) }); store.set('devis', dv);
      $('#devis-z').innerHTML = `<div class="boite" style="grid-column:1/-1;text-align:center;padding:56px 24px"><div class="coche"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></div><h2 class="h-m">Demande enregistrée</h2><p class="lead" style="margin:10px auto 6px">Référence <b style="color:var(--ink)">${ref}</b>. Office Plus vous rappelle au ${esc(g('d-tel'))}.</p><p class="fictif">Démonstration : rien n'a été envoyé.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:22px">${avec ? `<button class="btn btn-n" type="button" id="b-dpdf">${ICO.dl}Devis PDF de mon panier</button>` : ''}<a class="btn btn-w" href="${waLien('Bonjour Office Plus, demande de devis ' + ref + ' : ' + g('d-obj'))}" target="_blank" rel="noopener">${ICO.wa}Prévenir sur WhatsApp</a><a class="btn btn-l" href="#/boutique">Retour à la boutique</a></div></div>`;
      const b = $('#b-dpdf'); if (b) b.onclick = () => devisPdf(L, g('d-org'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  /* ---------- page : contact ---------- */
  function pContact() {
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Contact</div><div class="ph-tete"><span class="eyebrow">Contact et accès</span><h1 class="h-l" style="margin-top:10px">Passez nous voir, ou écrivez-nous.</h1><p class="lead">Une question sur un article, une commande ou un devis : la réponse la plus rapide passe par WhatsApp.</p></div>
      <div class="contact-g"><div class="coord">
        <a class="rv" href="${waLien('Bonjour Office Plus, ')}" target="_blank" rel="noopener" style="background:#E7FFDB"><span class="ic" style="background:#25D366;color:#fff">${ICO.wa}</span><span><b>WhatsApp · ${esc(OP.TEL2)}</b><small>Réponse rapide, photos de listes acceptées</small></span></a>
        <a class="rv d1" href="tel:+2252724314352"><span class="ic">${ICO.tel}</span><span><b>${esc(OP.TEL)}</b><small>Téléphone fixe</small></span></a>
        <a class="rv d1" href="mailto:${OP.MAIL}"><span class="ic">${ICO.mail}</span><span><b>${esc(OP.MAIL)}</b><small>E-mail</small></span></a>
        <div class="c rv d2"><span class="ic">${ICO.pin}</span><span><b>Boulevard de Marseille, Abidjan</b><small>Point de vente de Biétry (Marcory) · repère exact à confirmer</small></span></div>
        <div class="c rv d2"><span class="ic">${ICO.horloge}</span><span><b>Horaires</b><small>À confirmer par Office Plus · commande avant 10 h pour une livraison le jour même</small></span></div>
        <a class="rv d3" href="https://www.facebook.com/officeplus225" target="_blank" rel="noopener"><span class="ic" style="color:#1877F2">${ICO.fb}</span><span><b>facebook.com/officeplus225</b><small>Nouveautés et produit du mois</small></span></a>
      </div>
      <div class="carte-map rv d1"><iframe title="Carte : Biétry, Marcory, Abidjan" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-3.9900%2C5.2700%2C-3.9600%2C5.2860&amp;layer=mapnik&amp;marker=5.2777%2C-3.9750"></iframe></div></div>
      <section class="sec-s"><div class="duo"><form class="boite" id="fcon" novalidate><h3>Écrire à Office Plus</h3><div class="champs">
        <div class="champ"><label for="k-nom">Nom</label><input id="k-nom"><span class="err">Indiquez votre nom.</span></div><div class="champ"><label for="k-tel">Téléphone</label><input id="k-tel" type="tel" inputmode="tel"><span class="err">Numéro à 10 chiffres.</span></div>
        <div class="champ full"><label for="k-msg">Message</label><textarea id="k-msg"></textarea><span class="err">Écrivez votre message.</span></div></div><button class="btn btn-n" type="submit" style="margin-top:18px">Envoyer</button><p class="fictif" style="text-align:left">Démonstration : le message n'est transmis à personne.</p></form>
        <div class="boite"><h3>Questions fréquentes</h3>${OP.FAQ[0][1].slice(0, 3).map(([q, r]) => `<div class="acc" style="margin:0;border:0"><details><summary>${esc(q)}</summary><div class="in">${esc(r)}</div></details></div>`).join('')}<a class="lien" href="#/faq" style="margin-top:14px">Toutes les questions ${ICO.fl}</a></div></div>
        <p class="note-src">Carte centrée sur Biétry (point de vente indiqué sur la facture du 17/09/2026) ; adresse exacte et horaires à confirmer par Office Plus.</p></section></div>`;
    $('#fcon').onsubmit = e => {
      e.preventDefault();
      const err = [['k-nom', !$('#k-nom').value.trim()], ['k-tel', !/^0\d{9}$/.test($('#k-tel').value.replace(/\D/g, ''))], ['k-msg', !$('#k-msg').value.trim()]];
      err.forEach(([id, b]) => $('#' + id).closest('.champ').classList.toggle('bad', !!b));
      if (err.some(x => x[1])) return; $('#fcon').reset(); toast('Message prêt. En vrai, Office Plus vous rappellerait.');
    };
    $('#fcon').addEventListener('input', e => { const c = e.target.closest('.champ'); if (c) c.classList.remove('bad'); });
  }

  /* ---------- page : FAQ, mentions ---------- */
  function pFaq() {
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Questions fréquentes</div><div class="ph-tete"><span class="eyebrow">Aide</span><h1 class="h-l" style="margin-top:10px">Questions fréquentes</h1><p class="lead">Livraison, paiement, cartouches, comptes professionnels : l'essentiel en un coup d'œil.</p></div>
      <div class="faq-g"><nav class="faq-nav" aria-label="Rubriques">${OP.FAQ.map(([t], i) => `<a href="#/faq" data-faq="f${i}">${esc(t)}</a>`).join('')}</nav>
      <div>${OP.FAQ.map(([t, qs], i) => `<h2 id="f${i}">${esc(t)}</h2><div class="acc">${qs.map(([q, r]) => `<details><summary>${esc(q)}</summary><div class="in">${esc(r)}</div></details>`).join('')}</div>`).join('')}
      <div class="boite" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div><h3 style="margin:0">Pas trouvé la réponse ?</h3><p class="compte">L'équipe répond sur WhatsApp.</p></div><a class="btn btn-w" href="${waLien('Bonjour Office Plus, j\'ai une question : ')}" target="_blank" rel="noopener">${ICO.wa}Poser ma question</a></div></div></div></div>`;
    $$('[data-faq]').forEach(a => a.onclick = e => { e.preventDefault(); $('#' + a.dataset.faq).scrollIntoView({ behavior: 'smooth' }); });
  }
  function pMentions() {
    const ac = t => `<span class="ac">${t}</span>`;
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Mentions légales</div><div class="ph-tete"><h1 class="h-l">Mentions légales</h1><p class="lead">Les champs surlignés restent à compléter par Office Plus avant toute mise en ligne.</p></div>
      <div class="legal boite" style="padding:40px">
        <h2 style="margin-top:0">Éditeur du site</h2><p>OFFICE PLUS, Abidjan, Côte d'Ivoire. Forme juridique : ${ac('à compléter')}. RCCM : CI-ABJ-2021-A-${ac('numéro à compléter')}. Numéro de compte contribuable (NCC) : 2104959E. Point de vente : Biétry, Abidjan ; Boulevard de Marseille ${ac('adresse exacte à confirmer')}. Téléphone : ${esc(OP.TEL)} · ${esc(OP.TEL2)}. E-mail : ${esc(OP.MAIL)}.</p>
        <h2>Directeur de la publication</h2><p>${ac('Nom et fonction à compléter')}.</p>
        <h2>Hébergement</h2><p>${ac('Hébergeur à désigner lors de la mise en ligne')}.</p>
        <h2>Prix et commandes</h2><p>Les prix sont exprimés en francs CFA. Sur cette maquette, chaque prix indique sa source : facture d'Office Plus du 17/09/2026, page Facebook d'Office Plus, ou « prix indicatif, à confirmer ». Les marchandises ne sont ni échangées ni remboursées passé un délai de 7 jours. Chaque vente donne lieu à une facture normalisée électronique (FNE).</p>
        <h2 id="donnees">Données personnelles</h2><p>Les données saisies (nom, téléphone, adresse de livraison) servent uniquement au traitement des commandes et des devis. Conformément à la loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition, à exercer auprès d'Office Plus. L'autorité de contrôle est l'ARTCI. Déclaration du traitement : ${ac('à effectuer')}.</p>
        <h2>Propriété intellectuelle</h2><p>Marque et logo Office Plus : propriété d'Office Plus. Photos : illustrations libres de droits (Pexels), à remplacer par les photos d'Office Plus.</p>
        <h2>Statut de ce site</h2><p>Site de démonstration, non publié et non validé par Office Plus. Données fictives : aucun paiement réel, aucune donnée transmise.</p>
      </div></div>`;
  }

  /* ---------- page : espace entreprise ---------- */
  function pCompte(sec) {
    const S = OP.SOCIETE, H = OP.HISTO;
    const cmds = Object.values(store.get('cmds', {})).map(c => ({ ref: c.ref, date: c.date, statut: ETAPES[c.statut], lignes: c.lignes, site: 1 }));
    const toutes = cmds.concat(H); const tot = l => total(l);
    const menu = [['', 'Tableau de bord', ICO.grille], ['commandes', 'Commandes', ICO.sac], ['liste', 'Liste récurrente', ICO.liste], ['factures', 'Factures FNE', ICO.doc], ['devis', 'Devis', ICO.dl], ['utilisateurs', 'Utilisateurs', ICO.user]];
    const tab = lim => `<div class="tbl-wrap"><table class="t resp"><thead><tr><th>Commande</th><th>Date</th><th>Articles</th><th>Montant</th><th>Statut</th><th></th></tr></thead><tbody>${toutes.slice(0, lim).map((c, i) => `<tr><td><b>${esc(c.ref)}</b></td><td class="hide-m">${esc(c.date)}</td><td class="hide-m art">${c.lignes.map(([id, q]) => `<span>${q} × ${esc(BYID[id].nom)}</span>`).join('')}</td><td><b>${fcfa(tot(c.lignes))}</b></td><td><span class="statut ${c.statut === 'Livrée' ? 'st-livree' : 'st-preparee'}">${esc(c.statut)}</span></td><td class="full"><button class="btn btn-l btn-s" type="button" data-rec="${i}">${ICO.recharger}Recommander</button></td></tr>`).join('')}</tbody></table></div>`;
    let corps = '';
    if (!sec) corps = `<div class="alerte rv"><span class="ic">${ICO.goutte}</span><p><b>Vos toners Canon C-EXV65 noir seront bientôt vides.</b> D'après vos commandes, la dernière cartouche arrive en fin de vie d'ici une dizaine de jours.</p><button class="btn btn-o btn-s" type="button" id="b-alerte">Recommander maintenant</button></div>
      <div class="kpis"><div class="kpi n rv"><small>Achats ce mois-ci</small><b>${fcfa(tot(H[0].lignes))}</b><span>${H[0].lignes.length} lignes · 1 commande</span></div><div class="kpi rv d1"><small>Encours à 30 jours</small><b>${fcfa(tot(H[0].lignes))}</b><span>plafond ${fcfa(S.plafond)}</span></div><div class="kpi rv d2"><small>Délai moyen</small><b>Jour même</b><span>sur les 3 dernières commandes</span></div></div>
      <div class="carte-bo rv"><h3>Dernières commandes <a class="lien" href="#/compte/commandes" style="font-size:14px">Tout voir</a></h3>${tab(3)}</div>
      <div class="carte-bo rv pay-bo"><h3>Moyens de paiement du compte <small>${esc(S.conditions)}</small></h3><div class="pay-bo-g"><div><b>Virement à 30 jours</b><span class="compte">sur bon de commande, plafond ${fcfa(S.plafond)}</span></div>${mmRang('mm-boite')}</div></div>`;
    if (sec === 'commandes') corps = `<div class="carte-bo"><h3>Toutes les commandes <small>${toutes.length}</small></h3>${tab(99)}</div>`;
    if (sec === 'liste') corps = `<div class="carte-bo"><h3>Liste d'achats récurrente <small>chaque mois</small></h3>${OP.RECURRENT.map(([id, q], i) => `<div class="sb"><img src="${img(BYID[id].img)}" alt=""><span>${esc(BYID[id].nom)}</span><div class="qte" style="height:38px"><button type="button" data-rl="${i}" data-d="-1" aria-label="Moins" style="width:34px;height:38px">−</button><input value="${q}" readonly style="width:30px" aria-label="Quantité"><button type="button" data-rl="${i}" data-d="1" aria-label="Plus" style="width:34px;height:38px">+</button></div></div>`).join('')}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:18px;flex-wrap:wrap;gap:12px"><b style="font:700 20px var(--fh)" id="ltot"></b><button class="btn btn-n" type="button" id="b-liste">${ICO.sac}Tout mettre au panier</button></div></div>`;
    if (sec === 'factures') corps = `<div class="carte-bo"><h3>Factures normalisées (FNE) <small>téléchargeables</small></h3><div class="tbl-wrap"><table class="t resp"><thead><tr><th>Facture</th><th>Date</th><th>Montant</th><th>Statut</th><th></th></tr></thead><tbody>${H.map((h, i) => `<tr><td><b>FNE-${esc(h.ref.slice(3))}</b></td><td class="hide-m">${esc(h.date)}</td><td><b>${fcfa(tot(h.lignes))}</b></td><td><span class="statut ${i === 0 ? 'st-preparee' : 'st-livree'}">${i === 0 ? 'À régler sous 30 j' : 'Réglée'}</span></td><td class="full"><button class="btn btn-l btn-s" type="button" data-fac="${i}">${ICO.dl}PDF</button></td></tr>`).join('')}</tbody></table></div></div>`;
    if (sec === 'devis') { const dv = store.get('devis', []); corps = `<div class="carte-bo"><h3>Devis</h3><p class="compte" style="margin-bottom:16px">Générez un devis PDF à partir de votre panier ou de votre liste récurrente.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-n" type="button" id="b-dv-l">${ICO.dl}Devis de la liste récurrente</button><button class="btn btn-l" type="button" id="b-dv-p">${ICO.dl}Devis du panier (${nbPanier()})</button><a class="btn btn-g" href="#/devis">Nouvelle demande</a></div>${dv.length ? `<div style="margin-top:22px">${dv.map(d => `<div class="sb"><span style="flex:none">${ICO.doc}</span><span>${esc(d.ref)} · ${esc(d.objet)}</span><span class="statut st-recue">Envoyée</span></div>`).join('')}</div>` : ''}</div>`; }
    if (sec === 'utilisateurs') corps = `<div class="carte-bo"><h3>Utilisateurs du compte</h3>${S.utilisateurs.map(u => `<div class="sb"><span class="ic" style="width:40px;height:40px;border-radius:12px;background:var(--bg);display:grid;place-items:center">${ICO.user}</span><span>${esc(u)}</span></div>`).join('')}<p class="compte" style="margin-top:14px">Règle : au-delà de ${fcfa(300000)}, la commande attend la validation du directeur administratif (exemple).</p><button class="btn btn-l btn-s" type="button" style="margin-top:14px" id="b-inv">Inviter un collègue</button></div>`;
    app.innerHTML = `<div class="wrap"><div class="ariane"><a href="#/">Accueil</a><span>/</span>Espace entreprise</div><div class="ph-tete" style="padding-bottom:24px"><span class="eyebrow">Espace entreprise · démonstration</span><h1 class="h-l" style="margin-top:10px">Bonjour ${esc(S.contact.split(' ')[0])}.</h1><p class="lead">${esc(S.nom)} · ${esc(S.conditions)}. Compte et données fictifs.</p></div>
      <div class="esp"><nav class="menu-esp" aria-label="Espace entreprise"><div class="soc"><b>${esc(S.nom)}</b><small>${esc(S.contact)}, ${esc(S.fonction)}</small></div>${menu.map(([k, n, ic]) => `<a href="#/compte${k ? '/' + k : ''}" class="${(sec || '') === k ? 'on' : ''}">${ic}${n}</a>`).join('')}</nav><div>${corps}</div></div></div>`;
    const recharger = l => { l.forEach(([id, q]) => panier[id] = Math.min(99, (panier[id] || 0) + q)); majPanier(true); location.hash = '#/panier'; toast('Commande rechargée dans le panier'); };
    $$('[data-rec]').forEach(b => b.onclick = () => recharger(toutes[+b.dataset.rec].lignes));
    const ba = $('#b-alerte'); if (ba) ba.onclick = () => recharger([['cexv65-noir', 2]]);
    $$('[data-fac]').forEach(b => b.onclick = () => facturePdf(H[+b.dataset.fac], S.nom));
    if (sec === 'liste') { const L = OP.RECURRENT.map(x => x.slice()); const t = () => $('#ltot').textContent = 'Total : ' + fcfa(total(L)); $$('[data-rl]').forEach(b => b.onclick = () => { const i = +b.dataset.rl; L[i][1] = Math.max(0, L[i][1] + +b.dataset.d); b.parentNode.querySelector('input').value = L[i][1]; t(); }); t(); $('#b-liste').onclick = () => recharger(L.filter(x => x[1] > 0)); }
    const dl = $('#b-dv-l'); if (dl) dl.onclick = () => devisPdf(OP.RECURRENT, S.nom); const dp = $('#b-dv-p'); if (dp) dp.onclick = () => devisPdf(lignesPanier(), S.nom);
    const bi = $('#b-inv'); if (bi) bi.onclick = () => toast('Invitation prête (démonstration)');
  }


  /* ---------- photos produits envoyées par les employés (démo) ---------- */
  const ENVOIS_DEF = [
    { id: 'PH-03', prod: 'imprimante-mf', emp: 'Mariam T.', poste: 'Vendeuse, boutique de Biétry', quand: "Aujourd'hui, 09:12", avant: 'assets/img/ph/imprimante-c-avant.webp', apres: 'assets/img/ph/imprimante-c-apres.webp', statut: 'attente' },
    { id: 'PH-02', prod: 'calculatrice', emp: 'Ismaël D.', poste: 'Magasinier', quand: "Aujourd'hui, 08:47", avant: 'assets/img/ph/calculatrice-c-avant.webp', apres: 'assets/img/ph/calculatrice-c-apres.webp', statut: 'attente' },
    { id: 'PH-01', prod: 'lampe', emp: 'Prisca A.', poste: 'Vendeuse, boutique de Biétry', quand: 'Hier, 17:30', avant: 'assets/img/ph/lampe-avant.webp', apres: 'assets/img/ph/lampe-apres.webp', statut: 'validee', par: 'Le gérant', le: 'Hier, 18:05' }
  ];
  const EXEMPLES = [
    { k: 'imprimante-c', prod: 'imprimante-mf', t: 'Imprimante en rayon' },
    { k: 'calculatrice-c', prod: 'calculatrice', t: 'Calculatrice au comptoir' },
    { k: 'lampe', prod: 'lampe', t: 'Lampe en vitrine' }
  ];
  const ST_PH = { attente: ['En attente du gérant', 'st-att'], validee: ['Validée, en ligne', 'st-ok'], refusee: ['Refusée', 'st-ref'] };
  const envois = () => store.get('envois', null) || ENVOIS_DEF.map(e => Object.assign({}, e));
  function appliquerPhotos() {
    const ok = {}; envois().slice().reverse().forEach(e => { if (e.statut === 'validee' && BYID[e.prod]) ok[e.prod] = e; });
    P.forEach(p => { if (p._img0 === undefined) p._img0 = p.img; p.img = ok[p.id] ? ok[p.id].apres : p._img0; p._ph = ok[p.id] || null; });
  }
  appliquerPhotos();
  const pill = s => `<span class="statut ${ST_PH[s][1]}">${ST_PH[s][0]}</span>`;
  function retoucher(src) {
    return new Promise(res => {
      const im = new Image(); im.onload = () => {
        const S = 800, c = document.createElement('canvas'); c.width = c.height = S; const x = c.getContext('2d');
        x.fillStyle = '#fff'; x.fillRect(0, 0, S, S);
        const cote = Math.min(im.width, im.height) * 0.9, sx = (im.width - cote) / 2, sy = (im.height - cote) / 2;
        x.filter = 'brightness(1.14) contrast(1.08) saturate(1.06)';
        x.drawImage(im, sx, sy, cote, cote, 40, 40, S - 80, S - 80); x.filter = 'none';
        res(c.toDataURL('image/jpeg', 0.82));
      }; im.src = src;
    });
  }
  function reduire(file) {
    return new Promise(res => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const m = 900, k = Math.min(1, m / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = im.width * k; c.height = im.height * k; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.8)); }; im.src = r.result; }; r.readAsDataURL(file); });
  }

  function pPhotos(onglet) {
    document.body.classList.add('bo', 'bo-ph');
    const V = { photo: null, exemple: null, prod: null, q: '', etape: 'photo', dernier: null, onglet: onglet === 'historique' ? 'historique' : 'nouvelle' };
    const ligne = e => { const p = BYID[e.prod]; return `<div class="hist"><div class="hist-im"><img src="${e.avant}" alt="Photo envoyée"><img src="${e.apres}" alt="Photo retouchée"></div><div class="hist-tx"><b>${esc(p ? p.nom : e.prod)}</b><small>Envoyée par ${esc(e.emp)} · ${esc(e.quand)}</small>${pill(e.statut)}${e.par ? `<small>${e.statut === 'validee' ? 'Validée' : 'Refusée'} par ${esc(e.par)} · ${esc(e.le)}${e.motif ? ' · ' + esc(e.motif) : ''}</small>` : ''}</div></div>`; };
    const rend = () => {
      const E = envois(), att = E.filter(e => e.statut === 'attente').length;
      const res = V.q ? cherche(V.q).slice(0, 6) : (V.prod ? [BYID[V.prod]] : P.filter(p => ['imprimante-mf', 'calculatrice', 'lampe', 'agrafeuse', 'fauteuil-directeur', 'cexv65-noir'].includes(p.id)));
      let corps;
      if (V.onglet === 'historique') corps = `<div class="ph-bloc"><h2>Qui a envoyé quoi</h2><p class="ph-aide">Toutes les photos envoyées par l'équipe, avec la décision du gérant.</p>${E.map(ligne).join('')}</div>`;
      else if (V.etape === 'envoi') corps = `<div class="ph-bloc ph-trait"><div class="fp-spin"></div><h2>Retouche en cours</h2><p class="ph-aide">Fond propre, cadrage, lumière…</p></div>`;
      else if (V.etape === 'fini') { const e = V.dernier; corps = `<div class="ph-bloc"><span class="statut st-att" style="margin-bottom:10px">Envoyée au gérant</span><h2>Photo retouchée, en attente de validation</h2><p class="ph-aide">${esc(BYID[e.prod].nom)}. Elle remplacera la photo de la fiche dès que le gérant l'aura validée.</p>
          <div class="ba"><figure><img src="${e.avant}" alt="Avant"><figcaption>Avant</figcaption></figure><figure><img src="${e.apres}" alt="Après retouche"><figcaption>Après retouche</figcaption></figure></div>
          ${e.ex ? '' : `<p class="ph-note">Démonstration : sur votre propre photo, seuls le cadrage et la lumière sont simulés. Le détourage sur fond blanc se fait dans la version réelle.</p>`}
          <div class="ph-acts"><button class="btn btn-n btn-b btn-xl" type="button" id="ph-autre">Envoyer une autre photo</button><button class="btn btn-l btn-b btn-xl" type="button" data-onglet="historique">Voir l'historique</button></div></div>`; }
      else corps = `
        <div class="ph-bloc"><div class="fp-etape"><span class="fp-num${V.photo ? ' ok' : ''}">${V.photo ? ICO.ok : '1'}</span><h2>Prendre la photo</h2></div>
          ${V.photo ? `<div class="apercu"><img src="${V.photo}" alt="Photo prise"><button class="btn btn-l btn-s" type="button" id="ph-refaire">${ICO.recharger}Reprendre</button></div>` :
          `<label class="btn btn-n btn-b btn-xl" for="ph-file">${ICO.camera}Prendre une photo</label><input id="ph-file" type="file" accept="image/*" capture="environment" class="sr">
           <p class="ph-aide" style="margin-top:14px">Pas de produit sous la main ? Essayez avec un exemple :</p>
           <div class="ex">${EXEMPLES.map((x, i) => `<button type="button" data-ex="${i}"><img src="assets/img/ph/${x.k}-avant.webp" alt=""><span>${esc(x.t)}</span></button>`).join('')}</div>
           <p class="ph-note">Exemples d'illustration (photos libres de droits), pas des photos d'Office Plus.</p>`}</div>
        <div class="ph-bloc${V.photo ? '' : ' off'}"><div class="fp-etape"><span class="fp-num${V.prod ? ' ok' : ''}">${V.prod ? ICO.ok : '2'}</span><h2>Choisir l'article</h2></div>
          <div class="rch-ph">${ICO.loupe}<label class="sr" for="ph-q">Chercher l'article</label><input id="ph-q" type="search" placeholder="Nom ou référence de l'article" value="${esc(V.q)}" autocomplete="off"></div>
          <div class="fp-choix">${res.map(p => `<button type="button" class="${V.prod === p.id ? 'on' : ''}" data-prod="${p.id}"><img src="${img(p.img)}" alt=""><span><b>${esc(p.nom)}</b><small>Photo actuelle de la fiche</small></span>${V.prod === p.id ? `<i>${ICO.ok}</i>` : ''}</button>`).join('') || '<p class="ph-aide">Aucun article trouvé.</p>'}</div></div>
        <div class="ph-bloc${V.photo && V.prod ? '' : ' off'}"><div class="fp-etape"><span class="fp-num">3</span><h2>Envoyer</h2></div>
          <p class="ph-aide">La photo est retouchée automatiquement, puis le gérant la valide avant qu'elle n'apparaisse sur le site.</p>
          <button class="btn btn-v btn-b btn-xl" type="button" id="ph-go"${V.photo && V.prod ? '' : ' disabled'}>Envoyer la photo</button></div>`;
      app.innerHTML = `<div class="bo-top"><div class="wrap"><img src="assets/img/logo-blanc.svg" alt="Office Plus"><div class="t">Photos produits<small>appli des employés</small></div><div class="r"><a class="btn btn-l btn-s" href="#/admin">${ICO.grille}<span>Back-office</span></a><a class="btn btn-l btn-s" href="#/">${ICO.maison}<span>Voir le site</span></a></div></div></div>
      <div class="bo-fict">Démonstration : employés et envois fictifs, photos d'illustration libres de droits. Rien n'est envoyé.</div>
      <div class="ph-page"><div class="ph-intro"><span class="eyebrow">Back-office · appli employé</span><h1 class="h-l">Les photos produits, prises en boutique par l'équipe.</h1>
        <ol class="ph-pas"><li><span><b>L'employé photographie</b> l'article avec son téléphone et choisit la fiche.</span></li><li><span><b>La photo est retouchée</b> : fond blanc, cadrage, lumière.</span></li><li><span><b>Le gérant valide</b> dans le back-office : la photo remplace celle de la fiche.</span></li></ol>
        <div class="ph-liens"><a class="btn btn-n" href="#/admin#photos">Voir la validation du gérant</a><a class="lien" href="#/photos/historique">Historique des envois ${ICO.fl}</a></div></div>
      <div class="tel"><div class="tel-in"><div class="tel-tete"><b>Ajouter des photos produits</b><small>Mariam T. · vendeuse</small></div>
        <div class="onglets" role="tablist"><button type="button" role="tab" data-onglet="nouvelle" class="${V.onglet === 'nouvelle' ? 'on' : ''}">Nouvelle photo</button><button type="button" role="tab" data-onglet="historique" class="${V.onglet === 'historique' ? 'on' : ''}">Historique${att ? ` <em>${att}</em>` : ''}</button></div>
        <div class="tel-corps">${corps}</div></div></div></div>`;
      const f = $('#ph-file'); if (f) f.onchange = async () => { if (!f.files[0]) return; V.photo = await reduire(f.files[0]); V.exemple = null; rend(); };
      $$('[data-ex]').forEach(b => b.onclick = () => { const x = EXEMPLES[+b.dataset.ex]; V.exemple = x; V.photo = `assets/img/ph/${x.k}-avant.webp`; V.prod = x.prod; V.q = ''; rend(); });
      const rf = $('#ph-refaire'); if (rf) rf.onclick = () => { V.photo = null; V.exemple = null; V.prod = null; rend(); };
      const q = $('#ph-q'); if (q) q.oninput = () => { V.q = q.value; const pos = q.selectionStart; rend(); const q2 = $('#ph-q'); q2.focus(); q2.setSelectionRange(pos, pos); };
      $$('[data-prod]').forEach(b => b.onclick = () => { V.prod = b.dataset.prod; V.q = ''; rend(); });
      $$('[data-onglet]').forEach(b => b.onclick = () => { V.onglet = b.dataset.onglet; if (V.etape === 'fini' && V.onglet === 'nouvelle') V.etape = 'photo'; rend(); });
      const go = $('#ph-go'); if (go) go.onclick = async () => {
        V.etape = 'envoi'; rend();
        const apres = V.exemple ? `assets/img/ph/${V.exemple.k}-apres.webp` : await retoucher(V.photo);
        await new Promise(r => setTimeout(r, 1500));
        const d = new Date(), E = envois();
        const e = { id: 'PH-' + String(E.length + 1).padStart(2, '0'), prod: V.prod, emp: 'Mariam T.', poste: 'Vendeuse, boutique de Biétry', quand: "Aujourd'hui, " + String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0'), avant: V.photo, apres, statut: 'attente', ex: !!V.exemple, nouveau: 1 };
        E.unshift(e); store.set('envois', E); V.dernier = e; V.etape = 'fini'; rend();
      };
      const au = $('#ph-autre'); if (au) au.onclick = () => { Object.assign(V, { photo: null, exemple: null, prod: null, q: '', etape: 'photo' }); rend(); };
    };
    rend();
  }

  function blocPhotosAdmin(rendAdmin) {
    const E = envois(), att = E.filter(e => e.statut === 'attente');
    return `<div class="carte-bo" id="photos"><h3>Photos produits à valider <small>envoyées par l'équipe depuis la boutique</small></h3>
      ${att.length ? att.map(e => { const p = BYID[e.prod]; return `<div class="val-ph${e.nouveau ? ' flash' : ''}"><div class="ba ba-s"><figure><img src="${e.avant}" alt="Photo envoyée"><figcaption>Envoyée</figcaption></figure><figure><img src="${e.apres}" alt="Photo retouchée"><figcaption>Retouchée</figcaption></figure></div>
        <div class="val-tx"><b>${esc(p.nom)}</b><small>${esc(e.emp)} · ${esc(e.poste)} · ${esc(e.quand)}</small><div class="val-acts"><button class="btn btn-v" type="button" data-phok="${e.id}">${ICO.ok}Valider et remplacer la photo</button><button class="btn btn-l" type="button" data-phko="${e.id}">Refuser</button></div></div></div>`; }).join('') : `<p class="compte">Aucune photo en attente. Les prochaines arriveront ici.</p>`}
      <div class="ph-bas"><a class="btn btn-n btn-s" href="#/photos">${ICO.camera}Ouvrir l'appli employé</a><a class="lien" href="#/photos/historique">Historique complet ${ICO.fl}</a></div>
      <h4 class="h4-hist">Historique des envois</h4><div class="tbl-wrap"><table class="t t-ph"><thead><tr><th>Envoi</th><th>Article</th><th>Employé</th><th>Décision</th></tr></thead><tbody>${E.map(e => `<tr><td><img src="${e.apres}" alt=""><small class="compte">${esc(e.quand)}</small></td><td><b>${esc((BYID[e.prod] || {}).nom || e.prod)}</b></td><td>${esc(e.emp)}</td><td>${pill(e.statut)}${e.par ? `<br><small class="compte">${esc(e.par)} · ${esc(e.le)}</small>` : ''}</td></tr>`).join('')}</tbody></table></div></div>`;
  }
  function brancherPhotosAdmin(rendAdmin) {
    const maj = (id, statut) => {
      const E = envois(), e = E.find(x => x.id === id); if (!e) return;
      const d = new Date(); e.statut = statut; e.nouveau = 0; e.par = 'Le gérant'; e.le = "Aujourd'hui, " + String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0');
      if (statut === 'refusee') e.motif = 'photo à reprendre';
      store.set('envois', E); appliquerPhotos();
      const p = BYID[e.prod];
      toast(statut === 'validee' ? `Photo de <b>${esc(p.nom)}</b> remplacée sur le site <a href="#/produit/${p.id}">Voir la fiche</a>` : `Photo refusée, ${esc(e.emp)} est prévenu(e)`, statut === 'validee' ? null : null);
      rendAdmin();
    };
    $$('[data-phok]').forEach(b => b.onclick = () => maj(b.dataset.phok, 'validee'));
    $$('[data-phko]').forEach(b => b.onclick = () => maj(b.dataset.phko, 'refusee'));
  }

  /* ---------- page : back-office ---------- */
  const STATUTS = { recue: 'Reçue', preparee: 'Préparée', livraison: 'En livraison', livree: 'Livrée' };
  const SUIV = { recue: 'preparee', preparee: 'livraison', livraison: 'livree' };
  function pAdmin() {
    let ADMIN = store.get('admin', null) || OP.ADMIN_CMD.map(c => Object.assign({}, c));
    const site = Object.values(store.get('cmds', {})).filter(c => !ADMIN.some(a => a.ref === c.ref)).map(c => ({ ref: c.ref, heure: c.heure, client: c.client, tel: c.tel, paiement: c.pay, lignes: c.lignes, statut: 'recue', site: 1, nouveau: 1 }));
    ADMIN = site.concat(ADMIN); store.set('admin', ADMIN.map(c => Object.assign({}, c, { nouveau: 0 })));
    const ca = ADMIN.reduce((a, c) => a + total(c.lignes), 0), max = Math.max(ca, ...OP.CA7.map(x => x[1]));
    const bas = P.filter(p => p.stock <= 3).sort((a, b) => a.stock - b.stock).slice(0, 6);
    document.body.classList.add('bo');
    const rend = () => {
      const aT = ADMIN.filter(c => c.statut === 'recue').length;
      app.innerHTML = `<div class="bo-top"><div class="wrap"><img src="assets/img/logo-blanc.svg" alt="Office Plus"><div class="t">Back-office<small>${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' })} · tableau du jour</small></div><div class="r"><a class="btn btn-l btn-s" href="#/photos">${ICO.camera}<span>Photos produits</span></a><a class="btn btn-l btn-s" href="https://leslita06.github.io/officeplus-pilotage/">${ICO.liste}<span>Tableaux de bord</span></a><a class="btn btn-l btn-s" href="#/">${ICO.maison}<span>Voir le site</span></a></div></div></div>
      <div class="bo-fict">Données fictives de démonstration : commandes, clients, chiffre d'affaires et stocks sont inventés pour montrer l'outil.</div>
      <div class="wrap" style="padding-top:22px"><div class="kpis bo4"><div class="kpi n"><small>Chiffre d'affaires du jour</small><b>${fcfa(ca)}</b><span>${ADMIN.length} commandes</span></div><div class="kpi"><small>À valider</small><b>${aT}</b><span>à préparer avant 10 h</span></div><div class="kpi"><small>Demandes de devis</small><b>${OP.ADMIN_DEVIS.length + store.get('devis', []).length}</b><span>à chiffrer</span></div><div class="kpi"><small>Stocks bas</small><b>${bas.length}</b><span>à réapprovisionner</span></div><a class="kpi kpi-l" href="#/admin#photos"><small>Photos produits</small><b>${envois().filter(e => e.statut === 'attente').length}</b><span>à valider ${ICO.fl}</span></a></div>
      <div class="bo-g"><div><div class="carte-bo"><h3>Commandes du jour <small>Valider = prévenir le client sur WhatsApp</small></h3><div class="tbl-wrap"><table class="t resp" id="tcmd"><thead><tr><th>Heure</th><th>Client</th><th>Articles</th><th>Montant</th><th>Paiement</th><th>Statut et action</th></tr></thead><tbody>
        ${ADMIN.map((c, i) => `<tr class="${c.nouveau ? 'flash' : ''}"><td>${esc(c.heure)}</td><td class="full"><b>${esc(c.client)}</b>${c.site ? ' <span class="statut st-new">Nouvelle · site</span>' : ''}<br><small class="compte">${esc(c.tel)} · ${esc(c.ref)}</small></td><td class="hide-m art">${c.lignes.map(([id, q]) => `<span>${q} × ${esc(BYID[id].nom)}</span>`).join('')}</td><td><b>${fcfa(total(c.lignes))}</b></td><td class="hide-m">${esc(c.paiement)}</td><td class="full"><div class="act-c"><span class="statut st-${c.statut}">${STATUTS[c.statut]}</span>${c.statut === 'livree' ? '' : `<button class="btn btn-v btn-s" type="button" data-val="${i}">${ICO.wa}${c.statut === 'recue' ? 'Valider et prévenir' : 'Étape suivante'}</button>`}</div></td></tr>`).join('')}
      </tbody></table></div></div>
      <div class="carte-bo"><h3>Chiffre d'affaires, 7 derniers jours <small>F CFA</small></h3><div class="barres">${OP.CA7.map(([j, v]) => `<div><i style="height:${Math.round(v / max * 100)}%"></i>${j}</div>`).join('')}<div class="auj"><i style="height:${Math.round(ca / max * 100)}%"></i>Auj.</div></div></div></div>
      <div>${blocPhotosAdmin()}<div class="carte-bo"><h3>Stocks bas <small>seuil : 3</small></h3>${bas.map(p => `<div class="sb"><img src="${img(p.img)}" alt=""><span>${esc(p.nom)}</span><span class="q${p.stock <= 0 ? ' z' : ''}">${p.stock <= 0 ? 'Rupture' : p.stock + ' restant' + (p.stock > 1 ? 's' : '')}</span></div>`).join('')}<button class="btn btn-l btn-s btn-b" type="button" id="reappro" style="margin-top:12px">Préparer le bon de réapprovisionnement</button></div>
        <div class="carte-bo"><h3>Demandes de devis</h3>${store.get('devis', []).map(d => ({ ref: d.ref, client: d.client, objet: d.objet, depuis: 'site' })).concat(OP.ADMIN_DEVIS).map(d => `<div class="sb"><span style="flex:none">${ICO.doc}</span><span><b style="font-weight:600">${esc(d.client)}</b><br><small class="compte">${esc(d.objet)} · ${esc(d.depuis)}</small></span><button class="btn btn-g btn-s" type="button" data-chif>Chiffrer</button></div>`).join('')}</div></div></div></div>`;
      $$('[data-val]').forEach(b => b.onclick = () => {
        const c = ADMIN[+b.dataset.val], prec = c.statut; c.statut = SUIV[c.statut]; c.nouveau = 0;
        const msg = { preparee: 'est validée et en préparation', livraison: 'est en route', livree: 'a été livrée. Merci !' }[c.statut];
        store.set('admin', ADMIN);
        const cm = store.get('cmds', {}); if (cm[c.ref]) { cm[c.ref].statut = ['recue', 'preparee', 'livraison', 'livree'].indexOf(c.statut); store.set('cmds', cm); }
        modale(`<div class="mm-tete"><span class="logo-p" style="background:#25D366">${ICO.wa}</span><span><b>Message WhatsApp prêt</b><small>à ${esc(c.client)} · ${esc(c.tel)}</small></span></div><div class="wa-carte">Bonjour, ici Office Plus. Votre commande ${esc(c.ref)} ${msg}</div><p class="compte">Statut : ${STATUTS[prec]} → <b>${STATUTS[c.statut]}</b></p><button class="btn btn-n btn-b" type="button" data-fermer style="margin-top:16px">OK</button><p class="fictif">Démonstration : aucun message n'est envoyé.</p>`);
        rend();
      });
      brancherPhotosAdmin(rend);
      $('#reappro').onclick = () => toast('Bon de réapprovisionnement préparé (' + bas.length + ' articles)');
      $$('[data-chif]').forEach(b => b.onclick = () => { b.outerHTML = '<span class="statut st-ok">Chiffré</span>'; });
    };
    rend();
  }

  function p404() { app.innerHTML = `<div class="wrap"><div class="conf"><h1>Page introuvable</h1><p class="lead" style="margin:0 auto 24px">Le lien est peut-être incomplet.</p><a class="btn btn-n" href="#/">Retour à l'accueil</a></div></div>`; }

  /* ---------- routeur ---------- */
  const TITRES = { '': 'Fournitures, cartouches et mobilier de bureau à Abidjan', boutique: 'Boutique', produit: '', panier: 'Panier', commande: 'Commande', confirmation: 'Commande confirmée', suivi: 'Suivi de commande', services: 'Services', entreprises: 'Entreprises et administrations', 'a-propos': 'Qui sommes-nous', devis: 'Demande de devis', contact: 'Contact', faq: 'Questions fréquentes', mentions: 'Mentions légales', compte: 'Espace entreprise', admin: 'Back-office', photos: 'Photos produits (appli employé)' };
  let ancre = null;
  function route() {
    let h = location.hash.replace(/^#\/?/, '');
    const [chemin, qs] = h.split('?'); const params = new URLSearchParams(qs || '');
    let [base, a, b] = chemin.split('/');
    if (base && base.includes('#')) { ancre = base.split('#')[1]; base = base.split('#')[0]; }
    else if (a && a.includes('#')) { ancre = a.split('#')[1]; a = a.split('#')[0]; }
    else ancre = null;
    base = base || '';
    document.body.classList.remove('bo', 'bo-ph'); fermerRecherche(); fermerModale(); $('#tiroir').classList.remove('on'); $('#mega').classList.remove('on'); document.body.style.overflow = '';
    const R = { '': pAccueil, boutique: () => pBoutique(a, params.get('q')), produit: () => pProduit(a), panier: pPanier, commande: pCommande, confirmation: () => pConfirmation(a), suivi: () => pSuivi(a ? decodeURIComponent(a) : ''), services: pServices, entreprises: pEntreprises, 'a-propos': pAPropos, devis: () => pDevis(params), contact: pContact, faq: pFaq, mentions: pMentions, compte: () => pCompte(a), admin: pAdmin, photos: () => pPhotos(a) };
    (R[base] || p404)();
    const p = base === 'produit' && BYID[a];
    document.title = 'Office Plus · ' + (p ? p.nom : (base === 'boutique' && OP.FAM[a] ? OP.FAM[a].nom : (TITRES[base] != null ? TITRES[base] : 'Page introuvable')));
    $$('.nav [data-nav]').forEach(n => n.classList.toggle('on', n.dataset.nav === base || (n.dataset.nav === 'boutique' && base === 'produit')));
    $$('#mbar [data-m]').forEach(n => n.classList.toggle('on', n.dataset.m === (base || 'accueil') || (n.dataset.m === 'boutique' && base === 'produit')));
    majPanier();
    if (ancre && document.getElementById(ancre)) setTimeout(() => document.getElementById(ancre).scrollIntoView({ behavior: 'smooth' }), 80); else window.scrollTo(0, 0);
    revele();
  }
  let io;
  function revele() {
    if (!('IntersectionObserver' in window)) { $$('.rv').forEach(e => e.classList.add('in')); return; }
    if (io) io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    $$('.rv:not(.in)').forEach(e => io.observe(e));
  }

  /* ---------- événements globaux ---------- */
  document.addEventListener('click', e => {
    const t = e.target;
    const add = t.closest('[data-add]'); if (add) { e.preventDefault(); ajouter(add.dataset.add, 1); add.classList.add('ok'); add.innerHTML = ICO.ok; setTimeout(() => { add.classList.remove('ok'); add.innerHTML = ICO.plus; }, 1400); return; }
    const r = t.closest('[data-rail]'); if (r) { const el = document.getElementById(r.dataset.rail); el.scrollBy({ left: +r.dataset.d * el.clientWidth * 0.8, behavior: 'smooth' }); return; }
    if (t.closest('[data-rch]')) { ouvrirRecherche(''); return; }
    if (t.closest('[data-rch-x]')) { fermerRecherche(); return; }
    const mot = t.closest('[data-mot]'); if (mot) { $('#rq').value = mot.dataset.mot; $('#rq').dispatchEvent(new Event('input')); return; }
    const q = t.closest('[data-q]'); if (q && q.closest('.mots')) { location.hash = '#/boutique?q=' + encodeURIComponent(q.dataset.q); return; }
    if (t.closest('[data-fermer]') || t.id === 'modale') { fermerModale(); return; }
    if (t.closest('#burger')) { $('#tiroir').classList.add('on'); document.body.style.overflow = 'hidden'; return; }
    if (t.closest('[data-tiroir-x]')) { $('#tiroir').classList.remove('on'); document.body.style.overflow = ''; return; }
    if (t.closest('#btn-mega')) { const m = $('#mega'); m.classList.toggle('on'); $('#btn-mega').setAttribute('aria-expanded', m.classList.contains('on')); return; }
    if (!t.closest('#mega')) $('#mega').classList.remove('on');
    const lk = t.closest('a[href^="#/"]'); if (lk && lk.getAttribute('href') === location.hash) { route(); }
  });
  const bm = $('#btn-mega'); let tm;
  bm.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) { clearTimeout(tm); $('#mega').classList.add('on'); } });
  $('#top').addEventListener('mouseleave', () => { tm = setTimeout(() => $('#mega').classList.remove('on'), 180); });
  $('#mega').addEventListener('mouseenter', () => clearTimeout(tm));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { fermerModale(); fermerRecherche(); $('#mega').classList.remove('on'); } if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); ouvrirRecherche(''); } });
  document.addEventListener('submit', e => { if (e.target.id === 'nl') { e.preventDefault(); toast('Inscription enregistrée (démonstration)'); e.target.reset(); } });
  window.addEventListener('scroll', () => $('#top').classList.toggle('sc', scrollY > 8), { passive: true });
  /* liens du catalogue feuilletable (anciens formats ?produit=…#catalogue, #catalogue, #devis) */
  (function () {
    const A = {"ramette-a4-paperline-80g": "paperline-a4", "stylos-cristal-bleus": "cristal-bleu", "blocs-notes-a5": "blocs-a5", "porte-documents-80-vues": "porte-docs-80", "pochettes-perforees": "pochettes", "surligneurs": "surligneurs", "classeurs-chemises": "classeur-levier", "boites-archives": "cartons-archives", "manifolds-carnets-recus": "manifold", "rouleaux-thermiques": "bobinettes", "toner-canon-c-exv65-noir": "cexv65-noir", "toner-canon-c-exv65-bleu": "cexv65-cyan", "toner-canon-c-exv65-rose": "cexv65-magenta", "toner-canon-c-exv65-jaune": "cexv65-jaune", "toner-205a-noir": "t205a-noir", "toner-205a-jaune": "t205a-jaune", "toner-205a-cyan": "t205a-cyan", "toner-205a-magenta": "t205a-magenta", "cartouches-jet-encre": "hp301-noir", "compteuse-billets": "compteuse", "organiseur-bureau": "organiseur", "agrafeuse": "agrafeuse", "calculatrice": "calculatrice", "imprimante": "imprimante-mf", "open-space-4-personnes": "open-space-4", "bureau-direction": "bureau-direction", "fauteuil-direction": "fauteuil-directeur", "chaise-visiteur": "chaise-visiteur", "armoire-rangement": "armoire-bureau"}, C = {"fournitures": "papier", "cartouches": "cartouches", "materiel": "bureau", "mobilier": "mobilier"};
    const q = new URLSearchParams(location.search), h = location.hash;
    let cible = null;
    if (q.get('produit')) cible = BYID[A[q.get('produit')]] ? '#/produit/' + A[q.get('produit')] : (C[q.get('cat')] ? '#/boutique/' + C[q.get('cat')] : '#/boutique');
    else if (h === '#catalogue') cible = '#/boutique';
    else if (h === '#devis') cible = '#/devis';
    if (cible) history.replaceState(null, '', location.pathname + cible);
  })();
  window.addEventListener('hashchange', route);
  construireCadre(); route();
})();
