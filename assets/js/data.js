/* Office Plus · données du site de démonstration (maquette proposée par Yelema, non publiée).
   Sources des prix :
   - 'facture'  : facture FNE d'Office Plus du 17/09/2026.
   - 'facebook' : prix affiché sur une publication de la page Facebook officeplus225 (date de publication non relevée).
   - null       : prix indicatif, à confirmer par Office Plus.
   Toutes les photos sont des illustrations libres de droits (Pexels), à remplacer par les photos d'Office Plus.
   Stocks, commandes, clients et chiffres du compte entreprise et du back-office : fictifs. */
window.OP = {};
OP.WA = '2250566666575';            // numéro de la facture du 17/09/2026, à confirmer comme numéro WhatsApp
OP.TEL = '+225 27 24 31 43 52';     // page Facebook
OP.TEL2 = '+225 05 66 66 65 75';    // facture du 17/09/2026
OP.MAIL = 'officeplus.direction@gmail.com';
OP.FAM = {
  papier:       { nom: 'Papier et impression',       court: 'Papier',        img: 'p/ramette-o',      teinte: '#EEF3EE', txt: 'Rames, bobines, manifolds, blocs.' },
  ecriture:     { nom: 'Écriture',                   court: 'Écriture',      img: 'p/stylos-c',       teinte: '#F3F0EA', txt: 'Stylos, surligneurs, crayons.' },
  classement:   { nom: 'Classement et archivage',    court: 'Classement',    img: 'p/classeurs-blancs', teinte: '#EDF0F3', txt: 'Classeurs, pochettes, archives.' },
  bureau:       { nom: 'Petites fournitures',        court: 'Fournitures',   img: 'p/agrafeuse-c',    teinte: '#F1F1EE', txt: 'Agrafeuses, ciseaux, notes.' },
  cartouches:   { nom: 'Cartouches et toners',       court: 'Cartouches',    img: 'p/toner-c',        teinte: '#EEF1F4', txt: 'Canon, HP, jet d\'encre et laser.' },
  machines:     { nom: 'Machines de bureau',         court: 'Machines',      img: 'p/imprimante-c',   teinte: '#F2F2F0', txt: 'Imprimantes, compteuses, relieuses.' },
  informatique: { nom: 'Informatique et accessoires', court: 'Informatique', img: 'p/clavier',        teinte: '#EFF1F0', txt: 'Claviers, souris, casques.' },
  mobilier:     { nom: 'Mobilier de bureau',         court: 'Mobilier',      img: 'p/fauteuil-ergo',  teinte: '#F3EFEA', txt: 'Livré et monté gratuitement.' }
};
OP.SRC = {
  facture: 'Prix facturé par Office Plus le 17/09/2026',
  facebook: 'Prix publié sur la page Facebook d\'Office Plus',
  null: 'Prix indicatif, à confirmer'
};
const C65 = ['Canon imageRUNNER C3326i', 'Canon imageRUNNER C3326'];
const T205 = ['HP Color LaserJet Pro MFP M180n', 'HP Color LaserJet Pro MFP M181fw'];
const H301 = ['HP DeskJet 1050', 'HP DeskJet 2540', 'HP ENVY 4500'];
function mk(fam, id, nom, prix, o) { return Object.assign({ id, nom, fam, prix, src: null, marque: 'Sans marque', unite: 'pièce', stock: 20, carac: [] }, o); }
OP.P = [
  // Papier et impression
  mk('papier', 'paperline-a4', 'Carton de rames A4 Paperline 80 g', 15000, { ref: '11000125', src: 'facture', marque: 'Paperline', unite: 'carton', img: 'p/ramette-o', stock: 48, top: 1, desc: 'Papier blanc A4 80 g/m² pour imprimantes et copieurs. Le carton, livré au bureau.', carac: [['Format', 'A4 (21 × 29,7 cm)'], ['Grammage', '80 g/m²'], ['Conditionnement', 'Carton']] }),
  mk('papier', 'rame-a4', 'Rame A4 80 g, 500 feuilles', 3200, { img: 'p/papier-o', stock: 120, desc: 'La rame à l\'unité, pour les petits besoins.', carac: [['Format', 'A4'], ['Feuilles', '500'], ['Grammage', '80 g/m²']] }),
  mk('papier', 'rame-a3', 'Rame A3 80 g, 500 feuilles', 6500, { img: 'p/papier-o', stock: 12, desc: 'Pour plans, tableaux et affichages.', carac: [['Format', 'A3'], ['Grammage', '80 g/m²']] }),
  mk('papier', 'bobinettes', 'Bobines de caisse 57 mm, lot de 10', 5000, { img: 'p/cartons-o', stock: 30, desc: 'Rouleaux thermiques pour terminaux de paiement et caisses. Article présenté sur la page Facebook d\'Office Plus.', carac: [['Largeur', '57 mm'], ['Type', 'Thermique'], ['Quantité', '10 rouleaux']] }),
  mk('papier', 'manifold', 'Manifold, carnet de factures dupli', 2500, { img: 'p/cahier-o', stock: 40, desc: 'Carnet autocopiant pour factures, bons et reçus. Article présenté sur la page Facebook d\'Office Plus.', carac: [['Format', 'A5'], ['Exemplaires', '2']] }),
  mk('papier', 'blocs-a5', 'Blocs-notes A5 70 feuilles (paquet)', 5000, { ref: '11000014', src: 'facture', unite: 'paquet', img: 'p/carnet', stock: 35, desc: 'Blocs-notes A5 de 70 feuilles pour réunions et prises de notes.', carac: [['Format', 'A5'], ['Feuilles', '70'], ['Conditionnement', 'Paquet']] }),
  mk('papier', 'carnet-a5', 'Carnet à élastique A5', 3500, { img: 'p/carnet', stock: 25, desc: 'Couverture rigide, fermeture élastique.', carac: [['Format', 'A5'], ['Pages', '192']] }),
  mk('papier', 'cahier-spirale', 'Cahier spirale A4, 100 pages', 2000, { img: 'p/cahier-o', stock: 60, desc: 'Cahier à spirale pour la prise de notes.', carac: [['Format', 'A4'], ['Pages', '100']] }),
  mk('papier', 'notes-76', 'Notes repositionnables 76 × 76, lot de 12', 6000, { img: 'p/notes-c', unite: 'lot', stock: 18, desc: 'Blocs de notes adhésives, couleurs assorties.', carac: [['Format', '76 × 76 mm'], ['Blocs', '12']] }),
  // Écriture
  mk('ecriture', 'cristal-bleu', 'Stylos bleus Cristal (paquet)', 5500, { ref: '11000523', src: 'facture', marque: 'Cristal', unite: 'paquet', img: 'p/stylos-c', stock: 60, top: 1, desc: 'Le stylo à bille de tous les bureaux, encre bleue.', carac: [['Encre', 'Bleue'], ['Conditionnement', 'Paquet']] }),
  mk('ecriture', 'cristal-noir', 'Stylos noirs Cristal (paquet)', 5500, { marque: 'Cristal', unite: 'paquet', img: 'p/stylos-c', stock: 34, desc: 'Encre noire, pointe moyenne.', carac: [['Encre', 'Noire'], ['Conditionnement', 'Paquet']] }),
  mk('ecriture', 'surligneurs', 'Surligneurs fluo, pochette de 4', 3000, { unite: 'pochette', img: 'p/surligneurs-o', stock: 30, desc: 'Quatre couleurs fluo, pointe biseautée.', carac: [['Couleurs', '4'], ['Pointe', 'Biseautée']] }),
  mk('ecriture', 'crayons-couleur', 'Crayons de couleur, boîte de 12', 4000, { unite: 'boîte', img: 'p/crayons-c', stock: 22, desc: 'Pour les écoles, les ateliers et les tableaux de planning.', carac: [['Couleurs', '12']] }),
  mk('ecriture', 'crayons-hb', 'Crayons à papier HB, boîte de 12', 1500, { unite: 'boîte', img: 'p/crayons-c', stock: 50, desc: 'Crayons graphite HB avec gomme.', carac: [['Dureté', 'HB'], ['Quantité', '12']] }),
  mk('ecriture', 'marqueurs-tableau', 'Marqueurs pour tableau blanc, lot de 4', 4000, { unite: 'lot', img: 'p/surligneurs-o', stock: 26, desc: 'Encre effaçable à sec, quatre couleurs.', carac: [['Couleurs', '4'], ['Effaçable', 'À sec']] }),
  // Classement et archivage
  mk('classement', 'pochettes', 'Pochettes perforées (paquet)', 2000, { ref: '11000533', src: 'facture', unite: 'paquet', img: 'p/papier-o', stock: 40, desc: 'Pochettes transparentes perforées pour classeurs.', carac: [['Format', 'A4'], ['Conditionnement', 'Paquet']] }),
  mk('classement', 'porte-docs-80', 'Porte-documents 80 vues', 3500, { ref: '11000569', src: 'facture', img: 'p/carnet', stock: 22, desc: 'Porte-vues de 80 pochettes pour présenter et ranger les dossiers.', carac: [['Vues', '80'], ['Format', 'A4']] }),
  mk('classement', 'classeur-levier', 'Classeur à levier A4, dos 8 cm', 2500, { img: 'p/classeurs-blancs', stock: 0, desc: 'Classeur à levier pour l\'archivage courant.', carac: [['Format', 'A4'], ['Dos', '8 cm']] }),
  mk('classement', 'classeur-couleur', 'Classeurs à levier couleur, lot de 5', 12000, { unite: 'lot', img: 'p/classeurs', stock: 9, desc: 'Une couleur par service ou par année.', carac: [['Quantité', '5'], ['Dos', '8 cm']] }),
  mk('classement', 'cartons-archives', 'Boîtes d\'archives, lot de 10', 15000, { unite: 'lot', img: 'p/cartons-o', stock: 11, desc: 'Boîtes d\'archives en carton renforcé.', carac: [['Quantité', '10'], ['Matière', 'Carton renforcé']] }),
  mk('classement', 'enveloppes-kraft', 'Enveloppes A4 kraft, paquet de 50', 6000, { unite: 'paquet', img: 'p/enveloppes-o', stock: 25, desc: 'Enveloppes kraft pour courrier administratif.', carac: [['Format', 'A4'], ['Quantité', '50']] }),
  mk('classement', 'enveloppes-dl', 'Enveloppes blanches DL, paquet de 50', 3500, { unite: 'paquet', img: 'p/enveloppes2', stock: 30, desc: 'Pour lettres et factures pliées en trois.', carac: [['Format', 'DL 110 × 220 mm'], ['Quantité', '50']] }),
  // Petites fournitures
  mk('bureau', 'agrafeuse', 'Agrafeuse de bureau', 4500, { img: 'p/agrafeuse-c', stock: 20, top: 1, desc: 'Agrafeuse, capacité 25 feuilles.', carac: [['Capacité', '25 feuilles'], ['Agrafes', '24/6']] }),
  mk('bureau', 'agrafes', 'Agrafes 24/6, boîte de 1 000', 500, { unite: 'boîte', img: 'p/agrafeuse-c', stock: 90, desc: 'Agrafes standard pour agrafeuses de bureau.', carac: [['Taille', '24/6'], ['Quantité', '1 000']] }),
  mk('bureau', 'ciseaux', 'Ciseaux de bureau 21 cm', 1500, { img: 'p/ciseaux-c', stock: 33, desc: 'Lames inox, poignée confortable.', carac: [['Longueur', '21 cm']] }),
  mk('bureau', 'devidoir', 'Dévidoir de ruban adhésif', 3500, { img: 'p/devidoir', stock: 14, desc: 'Dévidoir lesté, ruban fourni.', carac: [['Ruban', '19 mm']] }),
  mk('bureau', 'trombones', 'Trombones, boîte de 100', 1000, { unite: 'boîte', img: 'p/trombone', stock: 70, desc: 'Trombones 28 mm.', carac: [['Taille', '28 mm'], ['Quantité', '100']] }),
  mk('bureau', 'organiseur', 'Organiseur de bureau', 7500, { img: 'p/organiseur-o', stock: 9, desc: 'Pot et compartiments pour stylos, trombones et notes. Article présenté sur la page Facebook d\'Office Plus.', carac: [['Compartiments', 'Multiples']] }),
  mk('bureau', 'notes-cube', 'Bloc cube de notes adhésives', 2500, { img: 'p/postit-o', stock: 40, desc: 'Bloc de 400 feuilles, couleurs assorties.', carac: [['Feuilles', '400']] }),
  mk('bureau', 'calculatrice', 'Calculatrice de bureau 12 chiffres', 9000, { img: 'p/calculatrice-c', stock: 14, desc: 'Grand écran, alimentation solaire et pile.', carac: [['Affichage', '12 chiffres'], ['Alimentation', 'Solaire + pile']] }),
  mk('bureau', 'kit-arrivant', 'Kit bureau « nouvel arrivant »', 25000, { marque: 'Office Plus', unite: 'kit', img: 'p/kit-o', stock: 15, desc: 'Tout pour un nouveau collaborateur : stylos, bloc-notes, surligneurs, agrafeuse, ciseaux, notes adhésives.', carac: [['Contenu', '6 articles'], ['Idéal pour', 'Nouvelles recrues']] }),
  // Cartouches et toners
  mk('cartouches', 'cexv65-noir', 'Toner Canon C-EXV65 noir', 50000, { ref: '21000160', src: 'facture', marque: 'Canon', img: 'p/toner-c', teinte: '#1F2523', stock: 14, top: 1, desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Noir'], ['Gamme', 'C-EXV65']], compat: C65 }),
  mk('cartouches', 'cexv65-cyan', 'Toner Canon C-EXV65 cyan', 50000, { ref: '21000161', src: 'facture', marque: 'Canon', img: 'p/toner-c', teinte: '#00AEEF', stock: 6, desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Cyan'], ['Gamme', 'C-EXV65']], compat: C65 }),
  mk('cartouches', 'cexv65-magenta', 'Toner Canon C-EXV65 magenta', 50000, { ref: '21000162', src: 'facture', marque: 'Canon', img: 'p/toner-c', teinte: '#E5007E', stock: 3, desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Magenta'], ['Gamme', 'C-EXV65']], compat: C65 }),
  mk('cartouches', 'cexv65-jaune', 'Toner Canon C-EXV65 jaune', 50000, { ref: '21000163', src: 'facture', marque: 'Canon', img: 'p/toner-c', teinte: '#FFD400', stock: 5, desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Jaune'], ['Gamme', 'C-EXV65']], compat: C65 }),
  mk('cartouches', 't205a-noir', 'Toner 205A noir', 25000, { ref: '21000028', src: 'facture', marque: 'HP', img: 'p/toner-c', teinte: '#1F2523', stock: 9, top: 1, desc: 'Toner laser 205A pour HP Color LaserJet Pro. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner laser'], ['Couleur', 'Noir'], ['Référence', '205A']], compat: T205 }),
  mk('cartouches', 't205a-jaune', 'Toner 205A jaune', 25000, { ref: '21000027', src: 'facture', marque: 'HP', img: 'p/toner-c', teinte: '#FFD400', stock: 2, desc: 'Toner laser 205A pour HP Color LaserJet Pro.', carac: [['Type', 'Toner laser'], ['Couleur', 'Jaune'], ['Référence', '205A']], compat: T205 }),
  mk('cartouches', 't205a-cyan', 'Toner 205A cyan', 25000, { marque: 'HP', img: 'p/toner-c', teinte: '#00AEEF', stock: 4, desc: 'Toner laser 205A pour HP Color LaserJet Pro.', carac: [['Type', 'Toner laser'], ['Couleur', 'Cyan'], ['Référence', '205A']], compat: T205 }),
  mk('cartouches', 't205a-magenta', 'Toner 205A magenta', 25000, { marque: 'HP', img: 'p/toner-c', teinte: '#E5007E', stock: 4, desc: 'Toner laser 205A pour HP Color LaserJet Pro.', carac: [['Type', 'Toner laser'], ['Couleur', 'Magenta'], ['Référence', '205A']], compat: T205 }),
  mk('cartouches', 'hp301-couleur', 'Cartouche jet d\'encre HP 301 couleur', 15000, { marque: 'HP', img: 'p/cartouche-jet', teinte: '#E5007E', stock: 8, desc: 'Cartouche trois couleurs pour imprimantes HP DeskJet et ENVY.', carac: [['Type', 'Jet d\'encre'], ['Couleur', 'Trois couleurs'], ['Référence', '301']], compat: H301 }),
  mk('cartouches', 'hp301-noir', 'Cartouche jet d\'encre HP 301 noir', 13000, { marque: 'HP', img: 'p/cartouche-jet', teinte: '#1F2523', stock: 11, desc: 'Cartouche noire pour imprimantes HP DeskJet et ENVY.', carac: [['Type', 'Jet d\'encre'], ['Couleur', 'Noir'], ['Référence', '301']], compat: H301 }),
  // Machines de bureau
  mk('machines', 'compteuse', 'Compteuse de billets', 95000, { img: 'p/compteuse-o', stock: 4, top: 1, desc: 'Compte et contrôle les billets. Présentée comme « produit du mois » sur la page Facebook d\'Office Plus.', carac: [['Fonctions', 'Comptage, détection'], ['Usage', 'Caisse, agence, comptabilité']] }),
  mk('machines', 'imprimante-mf', 'Imprimante multifonction laser couleur A4', 285000, { img: 'p/imprimante-c', stock: 2, desc: 'Impression, copie, numérisation. Installation sur demande.', carac: [['Fonctions', 'Impression, copie, numérisation'], ['Format', 'A4'], ['Technologie', 'Laser couleur']] }),
  mk('machines', 'relieuse', 'Relieuse à anneaux', 85000, { img: 'p/relieuse', stock: 3, desc: 'Reliure de rapports et de dossiers d\'appel d\'offres.', carac: [['Reliure', 'Anneaux plastique'], ['Format', 'A4']] }),
  mk('machines', 'tableau-blanc', 'Tableau blanc magnétique 120 × 90 cm', 45000, { img: 'p/tableau-o', stock: 6, desc: 'Pour salles de réunion et bureaux de projet. Fixation murale fournie.', carac: [['Dimensions', '120 × 90 cm'], ['Surface', 'Magnétique']] }),
  mk('machines', 'lampe', 'Lampe de bureau articulée', 18000, { img: 'p/lampe', stock: 10, desc: 'Bras articulé, ampoule LED fournie.', carac: [['Éclairage', 'LED'], ['Bras', 'Articulé']] }),
  // Informatique
  mk('informatique', 'clavier', 'Clavier filaire AZERTY', 8000, { img: 'p/clavier', stock: 18, desc: 'Clavier USB silencieux, disposition française.', carac: [['Connexion', 'USB'], ['Disposition', 'AZERTY']] }),
  mk('informatique', 'souris', 'Souris filaire optique', 5000, { img: 'p/souris', stock: 30, desc: 'Souris USB pour ordinateur fixe ou portable.', carac: [['Connexion', 'USB'], ['Capteur', 'Optique']] }),
  mk('informatique', 'casque', 'Casque audio de bureau', 15000, { img: 'p/casque', stock: 12, desc: 'Pour les appels et réunions en ligne.', carac: [['Usage', 'Visioconférence']] }),
  mk('informatique', 'multiprise', 'Multiprise avec ports USB', 7500, { img: 'p/multiprise', stock: 24, desc: 'Prises secteur et ports USB pour charger téléphones et ordinateurs.', carac: [['Ports USB', 'Oui']] }),
  // Mobilier (prix Facebook quand ils existent)
  mk('mobilier', 'fauteuil-directeur', 'Fauteuil directeur', 139000, { src: 'facebook', marque: 'Office Plus', img: 'p/fauteuil-ergo', stock: 5, top: 1, desc: 'Fauteuil de direction dossier haut, accoudoirs, roulettes. Livré et monté.', carac: [['Dossier', 'Haut, appui-tête'], ['Réglage', 'Hauteur, inclinaison'], ['Livraison', 'Livré et monté']] }),
  mk('mobilier', 'chaise-bureau', 'Chaise de bureau en filet', 52000, { src: 'facebook', marque: 'Office Plus', img: 'p/chaise-filet-o', stock: 12, top: 1, desc: 'Dossier en filet respirant, idéal sous la chaleur d\'Abidjan. Livrée et montée.', carac: [['Dossier', 'Filet'], ['Réglage', 'Hauteur'], ['Livraison', 'Livrée et montée']] }),
  mk('mobilier', 'chaise-visiteur', 'Chaise visiteur luge', 29000, { src: 'facebook', marque: 'Office Plus', img: 'p/chaise-visiteur-n', stock: 20, desc: 'Chaise visiteur, piètement luge chromé.', carac: [['Piètement', 'Luge chromé'], ['Assise', 'Rembourrée']] }),
  mk('mobilier', 'chaise-visiteur-filet', 'Chaise visiteur en filet', 30000, { src: 'facebook', marque: 'Office Plus', img: 'p/chaise-conf', stock: 16, desc: 'Chaise visiteur avec accoudoirs.', carac: [['Accoudoirs', 'Oui']] }),
  mk('mobilier', 'chaise-coque', 'Chaise visiteur coque', 25000, { marque: 'Office Plus', img: 'p/chaise-grise', stock: 18, desc: 'Coque translucide, piètement luge.', carac: [['Coque', 'Translucide']] }),
  mk('mobilier', 'fauteuil-accueil', 'Fauteuil d\'accueil', 75000, { marque: 'Office Plus', img: 'p/fauteuil-vert', stock: 4, desc: 'Pour l\'accueil et les salons d\'attente.', carac: [['Pied', 'Étoile chromée']] }),
  mk('mobilier', 'bureau-droit', 'Bureau de travail', 67000, { src: 'facebook', marque: 'Office Plus', img: 'p/bureau-bois', stock: 8, prixDe: 1, desc: 'Office Plus annonce ses bureaux « à partir de 67 000 F TTC » sur sa page Facebook. Modèle, dimensions et finition à confirmer. Livré et monté.', carac: [['Gamme', 'Du bureau de secrétaire au bureau de direction'], ['Livraison', 'Livré et monté']] }),
  mk('mobilier', 'table-bois', 'Table de travail en bois', 120000, { marque: 'Office Plus', img: 'p/table-bois', stock: 3, desc: 'Plateau bois, pour open space ou salle de projet.', carac: [['Plateau', 'Bois']] }),
  mk('mobilier', 'bureau-direction', 'Bureau de direction', 350000, { marque: 'Office Plus', img: 'p/bureau-dir', stock: 2, desc: 'Bureau de direction avec retour. Livré et monté.', carac: [['Livraison', 'Livré et monté']] }),
  mk('mobilier', 'caisson', 'Caisson 3 tiroirs à roulettes', 65000, { marque: 'Office Plus', img: 'p/caisson-o', stock: 7, desc: 'Se glisse sous le bureau, tiroir supérieur à clé.', carac: [['Tiroirs', '3'], ['Roulettes', 'Oui']] }),
  mk('mobilier', 'armoire-bureau', 'Armoire de bureau', 219000, { src: 'facebook', marque: 'Office Plus', img: 'p/armoire', stock: 3, desc: 'Armoire de rangement haute, portes battantes. Livrée et montée.', carac: [['Portes', 'Battantes'], ['Livraison', 'Livrée et montée']] }),
  mk('mobilier', 'table-reunion', 'Table de réunion', 459000, { src: 'facebook', marque: 'Office Plus', img: 'p/table-reunion-o', stock: 1, desc: 'Grande table pour salle de conseil. Livrée et montée.', carac: [['Usage', 'Salle de réunion'], ['Livraison', 'Livrée et montée']] }),
  mk('mobilier', 'open-space-4', 'Open space 4 postes', 890000, { marque: 'Office Plus', unite: 'ensemble', img: 'p/openspace', stock: 2, top: 1, desc: 'Quatre postes de travail avec cloisons. Présenté sur la page Facebook d\'Office Plus (« Open space 4 pers. »).', carac: [['Postes', '4'], ['Livraison', 'Livré et monté']] }),
  mk('mobilier', 'salle-reunion-8', 'Ensemble salle de réunion 8 places', 1250000, { marque: 'Office Plus', unite: 'ensemble', img: 'p/salle-reunion', stock: 1, desc: 'Table et huit fauteuils, livrés et montés.', carac: [['Places', '8'], ['Livraison', 'Livré et monté']] })
];
OP.COMMUNES = ['Abobo', 'Adjamé', 'Anyama', 'Attécoubé', 'Bingerville', 'Cocody', 'Koumassi', 'Marcory', 'Plateau', 'Port-Bouët', 'Songon', 'Treichville', 'Yopougon'];
OP.SERVICES = [
  { id: 'livraison', titre: 'Livraison le jour même', img: 'a/livraison', court: 'Commandé avant 10 h, livré le jour même à Abidjan.', src: 'Engagement publié sur la page Facebook d\'Office Plus.',
    points: ['Commande en ligne, au téléphone ou sur WhatsApp', 'Créneau choisi à la commande', 'Suivi en temps réel : reçue, préparée, en livraison, livrée'] },
  { id: 'montage', titre: 'Mobilier livré et monté', img: 'a/montage', court: 'Livraison et montage du mobilier sans frais.', src: 'Engagement publié sur la page Facebook d\'Office Plus.',
    points: ['Montage sur place par l\'équipe Office Plus', 'Reprise des emballages', 'Mise en place selon votre plan'] },
  { id: 'maintenance', titre: 'Maintenance des imprimantes', img: 'a/maintenance', court: 'Diagnostic, entretien et remplacement des pièces d\'usure.', src: null,
    points: ['Intervention sur site', 'Entretien préventif programmé', 'Toners et pièces fournis'] },
  { id: 'contrat', titre: 'Contrat d\'approvisionnement', img: 'a/entrepot', court: 'Vos fournitures livrées chaque mois, sans y penser.', src: null,
    points: ['Liste d\'achats récurrente', 'Prix fixés pour l\'année', 'Une facture mensuelle'] },
  { id: 'amenagement', titre: 'Aménagement de bureaux', img: 'a/amenagement', court: 'Du plan à l\'installation, un interlocuteur unique.', src: null,
    points: ['Visite et relevé des espaces', 'Proposition de mobilier et de plan', 'Livraison et montage coordonnés'] }
];
OP.FAQ = [
  ['Commande et livraison', [
    ['Quand ma commande sera-t-elle livrée ?', 'À Abidjan, une commande passée avant 10 h est livrée le jour même. Au-delà, elle part le jour ouvré suivant, sur le créneau choisi.'],
    ['Dans quelles communes livrez-vous ?', 'Les treize communes du district d\'Abidjan. Pour l\'intérieur du pays, demandez un devis : le délai et le coût dépendent de la ville.'],
    ['Le mobilier est-il monté ?', 'Oui. Le mobilier est livré et monté par l\'équipe Office Plus, sans frais supplémentaires.'],
    ['Puis-je suivre ma commande ?', 'Oui. Chaque commande a une référence ; la page de suivi indique si elle est reçue, préparée, en livraison ou livrée.']]],
  ['Paiement', [
    ['Quels moyens de paiement acceptez-vous ?', 'Wave, Orange Money, MTN MoMo, Moov Money, carte bancaire, paiement à la livraison et, pour les entreprises, bon de commande avec virement à 30 jours.'],
    ['Recevrai-je une facture normalisée ?', 'Oui. Chaque commande donne lieu à une facture normalisée (FNE), téléchargeable depuis votre espace entreprise.'],
    ['Le paiement à 30 jours est-il possible ?', 'Oui, pour les entreprises et administrations disposant d\'un compte professionnel validé.']]],
  ['Cartouches et toners', [
    ['Comment trouver la bonne cartouche ?', 'Sur chaque fiche, indiquez le modèle de votre imprimante : le site vous dit si la cartouche est compatible et, sinon, vous propose la bonne.'],
    ['Vos cartouches sont-elles d\'origine ?', 'La fiche de chaque article précise s\'il s\'agit d\'une cartouche d\'origine ou compatible. En cas de doute, appelez-nous avant de commander.']]],
  ['Entreprises et administrations', [
    ['Répondez-vous aux appels d\'offres ?', 'Oui. Envoyez votre dossier ou votre bordereau de prix : nous le chiffrons ligne par ligne.'],
    ['Plusieurs personnes peuvent-elles commander pour la même société ?', 'Oui. Le compte entreprise accepte plusieurs utilisateurs, avec un valideur et un plafond de commande.']]]
];
/* Données fictives du compte entreprise et du back-office */
OP.SOCIETE = { nom: 'Exemple SARL', contact: 'Awa Koné', fonction: 'Assistante de direction', tel: '07 00 00 00 00', commune: 'Plateau', adresse: 'Immeuble exemple, 3e étage', plafond: 1500000, conditions: 'Virement à 30 jours fin de mois', utilisateurs: ['Awa Koné (acheteuse)', 'Directeur administratif (valideur)'] };
OP.HISTO = [
  { ref: 'OP-26-1018', date: '18/10/2026', statut: 'Livrée', lignes: [['cexv65-noir', 2], ['paperline-a4', 5], ['cristal-bleu', 4]] },
  { ref: 'OP-26-0932', date: '02/10/2026', statut: 'Livrée', lignes: [['paperline-a4', 4], ['blocs-a5', 3], ['pochettes', 5]] },
  { ref: 'OP-26-0874', date: '17/09/2026', statut: 'Livrée', lignes: [['cexv65-noir', 1], ['cexv65-cyan', 1], ['porte-docs-80', 6]] }
];
OP.RECURRENT = [['paperline-a4', 5], ['cristal-bleu', 4], ['blocs-a5', 3], ['cexv65-noir', 1], ['pochettes', 4]];
OP.ADMIN_CMD = [
  { ref: 'OP-26-1106-07', heure: '08:12', client: 'Cabinet comptable (Plateau)', tel: '07 00 00 00 01', paiement: 'Wave', lignes: [['paperline-a4', 6], ['cristal-bleu', 5]], statut: 'recue' },
  { ref: 'OP-26-1106-06', heure: '08:31', client: 'École privée (Cocody)', tel: '07 00 00 00 02', paiement: 'Bon de commande 30 j', lignes: [['cexv65-noir', 2], ['cexv65-cyan', 1], ['cexv65-magenta', 1]], statut: 'recue' },
  { ref: 'OP-26-1106-05', heure: '09:05', client: 'Agence de transit (Treichville)', tel: '07 00 00 00 03', paiement: 'Orange Money', lignes: [['chaise-bureau', 4]], statut: 'preparee' },
  { ref: 'OP-26-1106-04', heure: '09:22', client: 'Pharmacie (Marcory)', tel: '07 00 00 00 04', paiement: 'MTN MoMo', lignes: [['t205a-noir', 2], ['blocs-a5', 2]], statut: 'preparee' },
  { ref: 'OP-26-1106-03', heure: '09:48', client: 'ONG (Cocody)', tel: '07 00 00 00 05', paiement: 'Paiement à la livraison', lignes: [['fauteuil-directeur', 1], ['caisson', 1]], statut: 'livraison' },
  { ref: 'OP-26-1106-02', heure: '07:55', client: 'PME BTP (Yopougon)', tel: '07 00 00 00 06', paiement: 'Wave', lignes: [['paperline-a4', 10]], statut: 'livree' }
];
OP.ADMIN_DEVIS = [
  { ref: 'DV-0451', client: 'Mairie (fictive)', objet: 'Fournitures du trimestre, 42 lignes', depuis: 'il y a 25 min' },
  { ref: 'DV-0450', client: 'Clinique (fictive)', objet: '12 chaises visiteur + 2 armoires', depuis: 'il y a 1 h' },
  { ref: 'DV-0449', client: 'Banque (fictive)', objet: 'Toners C-EXV65, contrat annuel', depuis: 'hier' }
];
OP.CA7 = [['Ven', 612000], ['Sam', 248000], ['Lun', 734000], ['Mar', 581000], ['Mer', 902000], ['Jeu', 655000]];
