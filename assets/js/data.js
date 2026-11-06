/* Office Plus · données de la maquette (proposée par Yelema, non publiée).
   Sources des prix :
   - "facture" : facture FNE Office Plus du 17/09/2026 (catalogue de Kouassi).
   - "facebook" : prix affiché sur une publication de la page Facebook officeplus225 (date de publication non relevée).
   - null : prix indicatif, à confirmer par Office Plus.
   Stocks, commandes, clients et chiffres du back-office : fictifs (démonstration). */
window.OP = {};
OP.WA = '2250566666575'; // numéro de la facture du 17/09/2026, à confirmer comme numéro WhatsApp
OP.CATS = {
  fournitures: { nom: 'Fournitures et papeterie', court: 'Fournitures', img: 'p-stylos' },
  cartouches: { nom: 'Cartouches et toners', court: 'Cartouches', img: 'p-toner' },
  materiel: { nom: 'Matériel de bureau', court: 'Matériel', img: 'p-imprimante' },
  mobilier: { nom: 'Mobilier de bureau', court: 'Mobilier', img: 'p-table-reunion' }
};
OP.SRC = {
  facture: 'Prix facturé par Office Plus le 17/09/2026',
  facebook: 'Prix publié sur la page Facebook d\'Office Plus, à confirmer',
  null: 'Prix indicatif, à confirmer'
};
const C65 = ['Canon imageRUNNER C3326i', 'Canon imageRUNNER C3326'];
const T205 = ['HP Color LaserJet Pro MFP M180n', 'HP Color LaserJet Pro MFP M181fw'];
OP.P = [
  // Cartouches et toners : prix de la facture du 17/09/2026
  { id: 'cexv65-noir', ref: '21000160', nom: 'Cartouche Canon C-EXV65 noir', cat: 'cartouches', marque: 'Canon', prix: 50000, src: 'facture', unite: 'pièce', img: 'p-toner', teinte: '#1F2523', stock: 14, top: 1,
    desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Noir'], ['Gamme', 'C-EXV65']], compat: C65 },
  { id: 'cexv65-cyan', ref: '21000161', nom: 'Cartouche Canon C-EXV65 cyan', cat: 'cartouches', marque: 'Canon', prix: 50000, src: 'facture', unite: 'pièce', img: 'p-toner', teinte: '#00AEEF', stock: 6,
    desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Cyan (bleu)'], ['Gamme', 'C-EXV65']], compat: C65 },
  { id: 'cexv65-magenta', ref: '21000162', nom: 'Cartouche Canon C-EXV65 magenta', cat: 'cartouches', marque: 'Canon', prix: 50000, src: 'facture', unite: 'pièce', img: 'p-toner', teinte: '#E5007E', stock: 3,
    desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Magenta (rose)'], ['Gamme', 'C-EXV65']], compat: C65 },
  { id: 'cexv65-jaune', ref: '21000163', nom: 'Cartouche Canon C-EXV65 jaune', cat: 'cartouches', marque: 'Canon', prix: 50000, src: 'facture', unite: 'pièce', img: 'p-toner', teinte: '#FFE100', stock: 5,
    desc: 'Toner C-EXV65 pour copieurs couleur Canon imageRUNNER. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner copieur'], ['Couleur', 'Jaune'], ['Gamme', 'C-EXV65']], compat: C65 },
  { id: 't205a-noir', ref: '21000028', nom: 'Toner 205A noir', cat: 'cartouches', marque: 'HP', prix: 25000, src: 'facture', unite: 'pièce', img: 'p-toner', teinte: '#1F2523', stock: 9, top: 1,
    desc: 'Toner laser de type 205A pour imprimantes HP Color LaserJet Pro. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner laser'], ['Couleur', 'Noir'], ['Référence', '205A']], compat: T205 },
  { id: 't205a-jaune', ref: '21000027', nom: 'Toner 205A jaune', cat: 'cartouches', marque: 'HP', prix: 25000, src: 'facture', unite: 'pièce', img: 'p-toner', teinte: '#FFE100', stock: 2,
    desc: 'Toner laser de type 205A pour imprimantes HP Color LaserJet Pro. Origine ou compatible : à préciser par Office Plus.', carac: [['Type', 'Toner laser'], ['Couleur', 'Jaune'], ['Référence', '205A']], compat: T205 },
  // Fournitures : prix de la facture du 17/09/2026
  { id: 'paperline-a4', ref: '11000125', nom: 'Carton de rames A4 Paperline 80 g', cat: 'fournitures', marque: 'Paperline', prix: 15000, src: 'facture', unite: 'carton', img: 'p-ramette', imgs: ['p-papier'], stock: 48, top: 1,
    desc: 'Papier blanc A4 80 g/m² pour imprimantes, copieurs et télécopieurs. Le carton, livré au bureau.', carac: [['Format', 'A4 (21 × 29,7 cm)'], ['Grammage', '80 g/m²'], ['Conditionnement', 'Carton']] },
  { id: 'cristal-bleu', ref: '11000523', nom: 'Stylos bleus Cristal (paquet)', cat: 'fournitures', marque: 'Cristal', prix: 5500, src: 'facture', unite: 'paquet', img: 'p-stylos2', stock: 60, top: 1,
    desc: 'Le stylo à bille de tous les bureaux, encre bleue.', carac: [['Encre', 'Bleue'], ['Conditionnement', 'Paquet']] },
  { id: 'blocs-a5', ref: '11000014', nom: 'Blocs-notes A5 70 feuilles (paquet)', cat: 'fournitures', marque: 'Générique', prix: 5000, src: 'facture', unite: 'paquet', img: 'p-cahier', stock: 35,
    desc: 'Blocs-notes A5 de 70 feuilles pour réunions et prises de notes.', carac: [['Format', 'A5'], ['Feuilles', '70'], ['Conditionnement', 'Paquet']] },
  { id: 'pochettes', ref: '11000533', nom: 'Pochettes perforées (paquet)', cat: 'fournitures', marque: 'Générique', prix: 2000, src: 'facture', unite: 'paquet', img: 'p-classeurs2', stock: 40,
    desc: 'Pochettes transparentes perforées pour classeurs.', carac: [['Format', 'A4'], ['Conditionnement', 'Paquet']] },
  { id: 'porte-docs-80', ref: '11000569', nom: 'Porte-documents 80 vues', cat: 'fournitures', marque: 'Générique', prix: 3500, src: 'facture', unite: 'pièce', img: 'p-classeurs', stock: 22,
    desc: 'Porte-vues de 80 pochettes pour présenter et ranger les dossiers.', carac: [['Vues', '80'], ['Format', 'A4']] },
  // Fournitures : prix indicatifs
  { id: 'surligneurs', nom: 'Surligneurs fluo, pochette de 4', cat: 'fournitures', marque: 'Générique', prix: 3000, src: null, unite: 'pochette', img: 'p-surligneurs', imgs: ['p-surligneurs2'], stock: 30,
    desc: 'Quatre couleurs fluo, pointe biseautée.', carac: [['Couleurs', 'Jaune, rose, vert, orange'], ['Pointe', 'Biseautée']] },
  { id: 'notes-76', nom: 'Notes repositionnables 76 × 76 mm, lot de 12', cat: 'fournitures', marque: 'Générique', prix: 6000, src: null, unite: 'lot', img: 'p-postit', stock: 18,
    desc: 'Blocs de notes adhésives couleurs assorties.', carac: [['Format', '76 × 76 mm'], ['Blocs', '12']] },
  { id: 'classeur-levier', nom: 'Classeur à levier A4, dos 8 cm', cat: 'fournitures', marque: 'Générique', prix: 2500, src: null, unite: 'pièce', img: 'p-classeurs', stock: 0,
    desc: 'Classeur à levier pour l\'archivage courant.', carac: [['Format', 'A4'], ['Dos', '8 cm']] },
  { id: 'enveloppes', nom: 'Enveloppes A4 kraft, paquet de 50', cat: 'fournitures', marque: 'Générique', prix: 6000, src: null, unite: 'paquet', img: 'p-enveloppes2', imgs: ['p-enveloppes'], stock: 25,
    desc: 'Enveloppes kraft pour courrier administratif.', carac: [['Format', 'A4'], ['Quantité', '50']] },
  { id: 'papier-a3', nom: 'Ramette A3 80 g', cat: 'fournitures', marque: 'Générique', prix: 6500, src: null, unite: 'ramette', img: 'p-papier', stock: 12,
    desc: 'Papier A3 pour plans, tableaux et affichages.', carac: [['Format', 'A3'], ['Grammage', '80 g/m²']] },
  { id: 'ciseaux', nom: 'Ciseaux de bureau 21 cm', cat: 'fournitures', marque: 'Générique', prix: 1500, src: null, unite: 'pièce', img: 'p-ciseaux', stock: 33,
    desc: 'Lames inox, poignée confortable.', carac: [['Longueur', '21 cm']] },
  { id: 'organiseur', nom: 'Organiseur de bureau', cat: 'fournitures', marque: 'Générique', prix: 7500, src: null, unite: 'pièce', img: 'p-organiseur', stock: 9,
    desc: 'Pot et compartiments pour stylos, trombones et notes. Publié par Office Plus sur sa page Facebook.', carac: [['Compartiments', 'Multiples']] },
  { id: 'kit-arrivant', nom: 'Kit bureau « nouvel arrivant »', cat: 'fournitures', marque: 'Office Plus', prix: 25000, src: null, unite: 'kit', img: 'p-kit', stock: 15,
    desc: 'Tout ce qu\'il faut pour un nouveau collaborateur : stylos, bloc-notes, surligneurs, agrafeuse, ciseaux, notes repositionnables.', carac: [['Contenu', '6 articles essentiels'], ['Idéal pour', 'Rentrée, nouvelles recrues']] },
  // Matériel : prix indicatifs
  { id: 'agrafeuse', nom: 'Agrafeuse de bureau', cat: 'materiel', marque: 'Générique', prix: 4500, src: null, unite: 'pièce', img: 'p-agrafeuse', stock: 20,
    desc: 'Agrafeuse métal, capacité 25 feuilles.', carac: [['Capacité', '25 feuilles'], ['Agrafes', '24/6']] },
  { id: 'calculatrice', nom: 'Calculatrice de bureau 12 chiffres', cat: 'materiel', marque: 'Générique', prix: 9000, src: null, unite: 'pièce', img: 'p-calculatrice', stock: 14,
    desc: 'Grand écran, alimentation solaire et pile.', carac: [['Affichage', '12 chiffres'], ['Alimentation', 'Solaire + pile']] },
  { id: 'compteuse', nom: 'Compteuse de billets', cat: 'materiel', marque: 'Générique', prix: 95000, src: null, unite: 'pièce', img: 'p-compteuse', stock: 4, top: 1,
    desc: 'Compte et contrôle les billets. Présentée comme « produit du mois » sur la page Facebook d\'Office Plus.', carac: [['Fonctions', 'Comptage, détection'], ['Usage', 'Caisse, agence, comptabilité']] },
  { id: 'relieuse', nom: 'Relieuse à anneaux', cat: 'materiel', marque: 'Générique', prix: 85000, src: null, unite: 'pièce', img: 'p-relieuse', stock: 3,
    desc: 'Reliure de rapports et dossiers d\'appel d\'offres.', carac: [['Reliure', 'Anneaux plastique'], ['Format', 'A4']] },
  { id: 'imprimante-mf', nom: 'Imprimante multifonction laser couleur A4', cat: 'materiel', marque: 'Générique', prix: 285000, src: null, unite: 'pièce', img: 'p-imprimante', stock: 2,
    desc: 'Impression, copie, numérisation. Installation sur demande.', carac: [['Fonctions', 'Impression, copie, numérisation'], ['Format', 'A4'], ['Technologie', 'Laser couleur']] },
  { id: 'tableau-blanc', nom: 'Tableau blanc magnétique 120 × 90 cm', cat: 'materiel', marque: 'Générique', prix: 45000, src: null, unite: 'pièce', img: 'p-tableau', stock: 6,
    desc: 'Pour salles de réunion et bureaux de projet. Fixation murale fournie.', carac: [['Dimensions', '120 × 90 cm'], ['Surface', 'Magnétique']] },
  { id: 'cartons-archives', nom: 'Cartons d\'archives, lot de 10', cat: 'materiel', marque: 'Générique', prix: 15000, src: null, unite: 'lot', img: 'p-cartons', stock: 11,
    desc: 'Boîtes d\'archives en carton renforcé.', carac: [['Quantité', '10'], ['Matière', 'Carton renforcé']] },
  // Mobilier : prix publiés sur la page Facebook (date non relevée)
  { id: 'fauteuil-directeur', nom: 'Fauteuil directeur', cat: 'mobilier', marque: 'Office Plus', prix: 139000, src: 'facebook', unite: 'pièce', img: 'p-fauteuil-dir', stock: 5, top: 1,
    desc: 'Fauteuil de direction dossier haut, accoudoirs, roulettes. Livré et monté.', carac: [['Dossier', 'Haut'], ['Réglage', 'Hauteur, inclinaison'], ['Livraison', 'Livré et monté']] },
  { id: 'chaise-bureau', nom: 'Chaise de bureau en filet', cat: 'mobilier', marque: 'Office Plus', prix: 52000, src: 'facebook', unite: 'pièce', img: 'p-fauteuil', stock: 12, top: 1,
    desc: 'Dossier en filet respirant, idéal sous la chaleur d\'Abidjan. Livrée et montée.', carac: [['Dossier', 'Filet'], ['Réglage', 'Hauteur'], ['Livraison', 'Livrée et montée']] },
  { id: 'chaise-visiteur', nom: 'Chaise visiteur luge', cat: 'mobilier', marque: 'Office Plus', prix: 29000, src: 'facebook', unite: 'pièce', img: 'p-fauteuil2', stock: 20,
    desc: 'Chaise visiteur piètement luge chromé.', carac: [['Piètement', 'Luge chromé'], ['Assise', 'Rembourrée']] },
  { id: 'chaise-visiteur-filet', nom: 'Chaise visiteur en filet', cat: 'mobilier', marque: 'Office Plus', prix: 30000, src: 'facebook', unite: 'pièce', img: 'p-chaise-filet', stock: 16,
    desc: 'Chaise visiteur dossier filet avec accoudoirs.', carac: [['Dossier', 'Filet'], ['Accoudoirs', 'Oui']] },
  { id: 'armoire-bureau', nom: 'Armoire de bureau', cat: 'mobilier', marque: 'Office Plus', prix: 219000, src: 'facebook', unite: 'pièce', img: 'p-armoire', stock: 3,
    desc: 'Armoire de rangement haute, portes battantes. Livrée et montée.', carac: [['Portes', 'Battantes'], ['Livraison', 'Livrée et montée']] },
  { id: 'table-reunion', nom: 'Table de réunion', cat: 'mobilier', marque: 'Office Plus', prix: 459000, src: 'facebook', unite: 'pièce', img: 'p-table-reunion', imgs: ['p-ensemble'], stock: 1,
    desc: 'Grande table de réunion pour salle de conseil. Livrée et montée.', carac: [['Usage', 'Salle de réunion'], ['Livraison', 'Livrée et montée']] },
  // Mobilier : prix indicatifs
  { id: 'caisson', nom: 'Caisson 3 tiroirs à roulettes', cat: 'mobilier', marque: 'Office Plus', prix: 65000, src: null, unite: 'pièce', img: 'p-caisson', stock: 7,
    desc: 'Se glisse sous le bureau, tiroir supérieur à clé.', carac: [['Tiroirs', '3'], ['Roulettes', 'Oui']] },
  { id: 'bureau-droit', nom: 'Bureau de travail, premier prix', cat: 'mobilier', marque: 'Office Plus', prix: 67000, src: 'facebook', unite: 'pièce', img: 'p-bureau', stock: 0,
    desc: 'Office Plus annonce ses bureaux « à partir de 67 000 F TTC » sur sa page Facebook. Modèle, dimensions et finition à confirmer. Livré et monté.', carac: [['Gamme', 'Du bureau de secrétaire au bureau de direction'], ['Livraison', 'Livré et monté']] },
  { id: 'open-space-4', nom: 'Open space 4 postes', cat: 'mobilier', marque: 'Office Plus', prix: 890000, src: null, unite: 'ensemble', img: 'p-openspace', stock: 2, top: 1,
    desc: 'Quatre postes de travail avec cloisons, pour gagner de la place. Présenté sur la page Facebook d\'Office Plus (« Open space 4 pers. »).', carac: [['Postes', '4'], ['Livraison', 'Livré et monté']] }
];
OP.COMMUNES = ['Abobo', 'Adjamé', 'Anyama', 'Attécoubé', 'Bingerville', 'Cocody', 'Koumassi', 'Marcory', 'Plateau', 'Port-Bouët', 'Songon', 'Treichville', 'Yopougon'];
/* Données fictives du compte entreprise et du back-office */
OP.SOCIETE = { nom: 'Exemple SARL', contact: 'Awa Koné', fonction: 'Assistante de direction', tel: '07 00 00 00 00', commune: 'Plateau', adresse: 'Immeuble exemple, 3e étage', plafond: 1500000, conditions: 'Virement à 30 jours fin de mois', utilisateurs: ['Awa Koné (acheteuse)', 'Directeur administratif (valideur)'] };
OP.HISTO = [
  { ref: 'OP-26-1018', date: '18/10/2026', statut: 'Livrée', lignes: [['cexv65-noir', 2], ['paperline-a4', 5], ['cristal-bleu', 4]] },
  { ref: 'OP-26-0932', date: '02/10/2026', statut: 'Livrée', lignes: [['paperline-a4', 4], ['blocs-a5', 3], ['pochettes', 5]] },
  { ref: 'OP-26-0874', date: '17/09/2026', statut: 'Livrée', lignes: [['cexv65-noir', 1], ['cexv65-cyan', 1], ['porte-docs-80', 6]] }
];
OP.RECURRENT = [['paperline-a4', 5], ['cristal-bleu', 4], ['blocs-a5', 3], ['cexv65-noir', 1], ['pochettes', 4]];
OP.ADMIN_CMD = [
  { ref: 'OP-26-1106-07', heure: '08:12', client: 'Cabinet comptable (Plateau)', commune: 'Plateau', tel: '07 00 00 00 01', paiement: 'Wave', lignes: [['paperline-a4', 6], ['cristal-bleu', 5]], statut: 'recue' },
  { ref: 'OP-26-1106-06', heure: '08:31', client: 'École privée (Cocody)', commune: 'Cocody', tel: '07 00 00 00 02', paiement: 'Bon de commande 30 j', lignes: [['cexv65-noir', 2], ['cexv65-cyan', 1], ['cexv65-magenta', 1]], statut: 'recue' },
  { ref: 'OP-26-1106-05', heure: '09:05', client: 'Agence de transit (Treichville)', commune: 'Treichville', tel: '07 00 00 00 03', paiement: 'Orange Money', lignes: [['chaise-bureau', 4]], statut: 'preparee' },
  { ref: 'OP-26-1106-04', heure: '09:22', client: 'Pharmacie (Marcory)', commune: 'Marcory', tel: '07 00 00 00 04', paiement: 'MTN MoMo', lignes: [['t205a-noir', 2], ['blocs-a5', 2]], statut: 'preparee' },
  { ref: 'OP-26-1106-03', heure: '09:48', client: 'ONG (Cocody)', commune: 'Cocody', tel: '07 00 00 00 05', paiement: 'Paiement à la livraison', lignes: [['fauteuil-directeur', 1], ['caisson', 1]], statut: 'livraison' },
  { ref: 'OP-26-1106-02', heure: '07:55', client: 'PME BTP (Yopougon)', commune: 'Yopougon', tel: '07 00 00 00 06', paiement: 'Wave', lignes: [['paperline-a4', 10]], statut: 'livree' }
];
OP.ADMIN_DEVIS = [
  { ref: 'DV-0451', client: 'Mairie (fictive)', objet: 'Fournitures du trimestre, 42 lignes', montant: 'à chiffrer', depuis: 'il y a 25 min' },
  { ref: 'DV-0450', client: 'Clinique (fictive)', objet: '12 chaises visiteur + 2 armoires', montant: 'à chiffrer', depuis: 'il y a 1 h' },
  { ref: 'DV-0449', client: 'Banque (fictive)', objet: 'Toners C-EXV65, contrat annuel', montant: 'à chiffrer', depuis: 'hier' }
];
OP.CA7 = [['Ven', 612000], ['Sam', 248000], ['Lun', 734000], ['Mar', 581000], ['Mer', 902000], ['Jeu', 655000]];
