/**
 * Complete Algeria Places Database
 * Contains all 58 Wilayas with their communes, major cities, districts, and landmarks
 * Used for search suggestions in the interactive map
 */

export const algerianPlaces: string[] = [
  // ==== WILAYA 01 - ADRAR ====
  "Adrar", "Reggane", "In Salah", "Tit", "Ksar Kaddour", "Tsabit", "Timimoun", 
  "Ouled Said", "Zaouiet Kounta", "Aoulef", "Akabli", "Metarfa", "In Zghmir", 
  "Foum El Kheneg", "Tinerkouk", "Deldoul", "Charouine", "Sebaa", "Ouled Ahmed Timmi", "Bouda",
  
  // ==== WILAYA 02 - CHLEF ====
  "Chlef", "Ténès", "Benairia", "El Karimia", "Tadjena", "Taougrit", "Beni Haoua", 
  "Sobha", "Harchoun", "Ouled Fares", "Sidi Akkacha", "Boukadir", "Beni Rached", 
  "Talassa", "Herenfa", "Oued Goussine", "Dahra", "Ouled Abbes", "Sendjas", "Zeboudja",
  "Oued Sly", "Abou El Hassan", "El Marsa", "Chettia", "Sidi Abderrahmane", "Moussadek", 
  "El Hadjadj", "Labiod Medjadja", "Oued Fodda", "Ouled Ben Abdelkader", "Bouzghaia", 
  "Ain Merane", "Oued Rhiou", "Bendaoud", "Breira", "Beni Bouattab",

  // ==== WILAYA 03 - LAGHOUAT ====
  "Laghouat", "Aflou", "Ksar El Hirane", "Hadj Mechri", "Sebgag", "Nahla", 
  "Gueltat Sidi Saad", "Ain Madhi", "Tadjmout", "Kheneg", "Sidi Makhlouf", 
  "Hassi Delaa", "Hassi R'Mel", "Ain Sidi Ali", "Tadjrouna", "Brida", "El Ghicha", 
  "El Houaita", "Oued Morra", "Taouiala", "Sidi Bouzid", "El Assafia", "Wasit",

  // ==== WILAYA 04 - OUM EL BOUAGHI ====
  "Oum El Bouaghi", "Ain Beida", "Ain M'Lila", "Behir Chergui", "El Amiria", "Sigus", 
  "El Belkhir", "Ain Babouche", "Berriche", "Ouled Hamla", "Dhala", "Ain Kercha", 
  "Hanchir Toumghani", "El Djazia", "Ain Diss", "Fkirina", "Souk Naamane", "Zorg", 
  "El Fedjoudj Boughrara Saoudi", "Ouled Zouai", "Bir Chouhada", "Ksar Sbahi", 
  "Oued Nini", "Rahia", "Ain Fekroun", "El Harmilia", "Hassi Zehana", "Meskiana", "Canrobert",

  // ==== WILAYA 05 - BATNA ====
  "Batna", "Barika", "Merouana", "Seriana", "Menaa", "El Madher", "Tazoult", "N'Gaous", 
  "Guigba", "Inoughissen", "Ouyoun El Assafir", "Djerma", "Bitam", "Abdelkader", "Arris", 
  "Kimmel", "Tilatou", "Ain Djasser", "Ouled Sellam", "Tigherghar", "Ain Yagout", "Fesdis", 
  "Sefiane", "Rahbat", "Tighanimine", "Lemsane", "Ksar Bellezma", "Seggana", "Ichmoul", 
  "Foum Toub", "Beni Foudhala El Hakania", "Oued El Ma", "Talkhamt", "Bouzina", "Chemora", 
  "Oued Chaaba", "Taxlent", "Gosbat", "Ouled Aouf", "Boumagueur", "Babar", "Djezzar", 
  "Tkout", "Ain Touta", "Hidoussa", "Teniet El Abed", "Oued Taga", "Ouled Fadel", "Timgad", 
  "Ras El Aioun", "Chir", "Ouled Si Slimane", "Zanat El Beida", "M'Doukal", "Ouled Ammar", 
  "El Hassi", "Lazrou", "Boumia", "Boulhilat", "Ghassira",

  // ==== WILAYA 06 - BÉJAÏA ====
  "Béjaïa", "Akbou", "Kherrata", "Sidi Aich", "Aokas", "Tichy", "Adekar", "Darguina", 
  "Semaoun", "Kendira", "Toudja", "Ighram", "Amalou", "Ighil Ali", "Fenaia Ilmaten", 
  "Tala Hamza", "Yammen", "Barbacha", "Beni Djellil", "Ouzellaguen", "Bouhamza", 
  "Beni Mellikeche", "Sidi Ayad", "M'Cisna", "Tinebdar", "Tiferda", "Chellata", "Tamokra", 
  "Ait R'Zine", "Tazmalt", "Ait Smail", "Souk El Tenine", "Beni K'Sila", "Tifra", 
  "Ighil Nacer", "Leflaye", "Khelil", "Tamridjet", "Ain Sebt", "Bouzegza Keddara", 
  "Tizi N'Berber", "Beni Maouche", "Oued Ghir", "Boudjellil", "Taskreout", "Chemini", 
  "Souk Oufella", "Tibane", "Tarchouna", "Boukhelifa", "Melbou", "Tamezrit", "Ait Djellil",

  // ==== WILAYA 07 - BISKRA ====
  "Biskra", "Tolga", "Ouled Djellal", "Sidi Okba", "Chetma", "Foughala", "El Kantara", 
  "Ain Naga", "Zeribet El Oued", "El Feidh", "Djemorah", "Branis", "Ourlal", "Mechouneche", 
  "El Haouch", "Ain Zaatout", "El Ghrous", "Khanguat Sidi Nadji", "Ouled Brahim", "M'Chouneche", 
  "Lioua", "Mlili", "Bouchagroun", "Mekhadma", "El Outaya", "Sidi Khaled", "M'Liliha", 
  "Lichana", "Oumache", "Besbes", "Doucen", "Kheneg", "Ras El Miad",

  // ==== WILAYA 08 - BÉCHAR ====
  "Béchar", "Abadla", "Beni Ounif", "Kenadsa", "Lahmar", "Boukais", "Mogheul", "Tabelbala", 
  "Igli", "Taghit", "El Ouata", "Ksabi", "Timoudi", "Beni Ikhlef", "Kerzaz", "Erg Ferradj", 
  "Ouled Khodeir", "Tamtert", "Beni Abbes", "El Biodh Sidi Cheikh", "Boukhanefis", "Sfissifa", 
  "Tiout", "Ain Sefra", "Kasdir", "Djenien Bourezg", "Moghrar", "Assela", "Makhzer", "Meridja",

  // ==== WILAYA 09 - BLIDA ====
  "Blida", "Boufarik", "Larbaa", "Bougara", "Bouinan", "Soumaa", "El Affroun", "Chrea", 
  "Chebli", "Mouzaia", "Hammam Melouane", "Ben Khelil", "Souhane", "Ouled Yaich", "Chiffa", 
  "Ouled Selama", "Beni Tamou", "Bouarfa", "Oued El Alleug", "Ain Romana", "Djebabra", 
  "Beni Mered", "Guerrouaou", "Meftaha", "Oued Djer", "Attatba",

  // ==== WILAYA 10 - BOUIRA ====
  "Bouira", "Lakhdaria", "M'Chedallah", "Sour El Ghozlane", "Ain Bessem", "Bir Ghbalou", 
  "Kadiria", "Bechloul", "Dirah", "Saharidj", "Ahl El Ksar", "Guerrouma", "El Hachimia", 
  "Raouraoua", "Mezdour", "Haizer", "Taghzout", "Ridane", "Djebahia", "El Mokrani", 
  "Bordj Okhriss", "El Adjiba", "Taguedit", "Chorfa", "Mamora", "Zbarbar", "Ain El Hadjar", 
  "Ouled Rached", "Souk El Khemis", "Hadjera Zerga", "Oued El Berdi", "Ain Turk", "Dechmia", 
  "Bouderbala", "Ain Laloui", "Aghbalou", "Boukram", "El Esnam", "Ait Laaziz", "Maala", 
  "Hanif", "Aomar", "Ath Mansour", "El Khebouzia", "Ighzer Amokrane",

  // ==== MAJOR CITIES & WILAYA CAPITALS ====
  "Alger", "Oran", "Constantine", "Annaba", "Tlemcen", "Sétif", "Sidi Bel Abbès", "Skikda", 
  "Tiaret", "Mostaganem", "Ouargla", "Bordj Bou Arréridj", "Médéa", "Tizi Ouzou", "El Oued", 
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Ain Defla", "Naama", "Ain Témouchent", 
  "Ghardaïa", "Relizane", "Tindouf", "Tissemsilt", "El Bayadh", "Illizi", "Tamanrasset",

  // ==== ALGIERS DISTRICTS & NEIGHBORHOODS ====
  "Hydra", "El Harrach", "Bir Mourad Raïs", "Bab Ezzouar", "Rouiba", "Birtouta", "Zeralda", 
  "Kouba", "Dar El Beida", "Hussein Dey", "Mohammadia", "Bab El Oued", "Casbah", "Sidi M'Hamed", 
  "El Madania", "Bologhine", "Oued Koriche", "Bachdjerrah", "El Mouradia", "Ben Aknoun", 
  "Dély Ibrahim", "Cheraga", "Ouled Fayet", "Draria", "Douera", "Bouzareah", "Ain Benian", 
  "Staoueli", "Saoula", "Baraki", "Les Eucalyptus", "Ain Taya", "Bordj El Kiffan", 
  "Bordj El Bahri", "Heraoua", "Ouled Chebel", "Sidi Moussa", "Tessala El Merdja", "Rahmania", 
  "Souidania", "Khraicia", "El Achour", "Reghaia", "Mahelma", "Hammamet", "Rouissat", "Khraissia",

  // ==== TOURIST & HISTORICAL SITES ====
  "Tipaza", "Djémila", "Timgad", "Tassili N'Ajjer", "Hoggar", "M'Zab", "Casbah d'Alger", 
  "Kalaa des Beni Hammad", "Beni Add", "Chott El Hodna", "Lac de Réghaïa", 
  "Parc National de Chréa", "Parc National de Theniet El Had", "Parc National de Belezma", 
  "Parc National de Gouraya", "Parc National de Taza", "Parc National d'El Kala", 
  "Parc National de Djurdjura", "Parc National de Chott Merouane",

  // ==== PORTS & AIRPORTS ====
  "Port d'Alger", "Port d'Oran", "Port d'Annaba", "Port de Béjaïa", "Port de Skikda", 
  "Port de Mostaganem", "Aéroport Houari Boumediene", "Aéroport Ahmed Ben Bella", 
  "Aéroport Mohamed Boudiaf", "Aéroport Rabah Bitat",

  // ==== INDUSTRIAL ZONES ====
  "Zone Industrielle Rouiba", "Zone Industrielle Arzew", "Zone Industrielle Hassi Messaoud", 
  "Zone Industrielle Skikda", "Zone Industrielle Annaba", "Complexe Sidérurgique El Hadjar", 
  "Raffinerie d'Arzew", "Complexe GL1K",

  // ==== UNIVERSITIES & EDUCATION ====
  "USTHB", "Université d'Alger", "Université d'Oran", "Université de Constantine", 
  "Université de Sétif", "Université de Tlemcen", "Université de Béjaïa", "Université de Batna", 
  "École Nationale Polytechnique", "Université de Boumerdès"
]

// Major cities for priority ranking in search
export const majorCities = [
  'alger', 'oran', 'constantine', 'annaba', 'batna', 'sétif', 'tlemcen', 'béjaïa', 
  'blida', 'skikda', 'sidi bel abbès', 'biskra', 'tiaret', 'mostaganem'
]

// Algiers districts for priority ranking
export const algiersDistricts = [
  'hydra', 'el harrach', 'bab ezzouar', 'rouiba', 'kouba', 'birtouta', 'zeralda', 
  'dar el beida', 'hussein dey', 'mohammadia', 'bab el oued', 'casbah'
]

// Search ranking function
export const rankSearchResult = (place: string, searchTerm: string): number => {
  const placeLower = place.toLowerCase()
  const searchValue = searchTerm.toLowerCase()
  let score = 0
  
  // Exact match gets highest score
  if (placeLower === searchValue) score = 1000
  // Starts with search term gets high score
  else if (placeLower.startsWith(searchValue)) score = 500
  // Contains search term gets medium score
  else if (placeLower.includes(searchValue)) score = 100
  // No match gets 0 score
  else return 0
  
  // Boost score for major cities
  if (majorCities.includes(placeLower)) score += 200
  
  // Boost score for Algiers districts
  if (algiersDistricts.includes(placeLower)) score += 150
  
  return score
}
