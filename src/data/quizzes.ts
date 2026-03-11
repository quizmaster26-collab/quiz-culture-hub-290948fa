export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionCount: number;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    id: "league-of-legends",
    title: "League of Legends",
    description: "Crezi că ești Challenger? Demonstrează-ți cunoștințele despre LoL.",
    icon: "⚔️",
    difficulty: "Medium",
    questionCount: 10,
    questions: [
      { id: 1, text: "Ce campion are ultimate-ul 'Requiem'?", options: ["Veigar", "Karthus", "Brand", "Zyra"], correctIndex: 1 },
      { id: 2, text: "În ce an a fost lansat League of Legends?", options: ["2008", "2009", "2010", "2011"], correctIndex: 1 },
      { id: 3, text: "Care este numele creatorilor jocului?", options: ["Valve", "Riot Games", "Blizzard", "Epic Games"], correctIndex: 1 },
      { id: 4, text: "Ce campion este cunoscut ca 'The Unforgiven'?", options: ["Zed", "Yasuo", "Yone", "Riven"], correctIndex: 1 },
      { id: 5, text: "Câte lane-uri are harta Summoner's Rift?", options: ["2", "3", "4", "5"], correctIndex: 1 },
      { id: 6, text: "Ce dragon oferă bonus de damage la obiective?", options: ["Infernal", "Mountain", "Ocean", "Cloud"], correctIndex: 1 },
      { id: 7, text: "Ce item dă cel mai mult Attack Damage?", options: ["Infinity Edge", "Bloodthirster", "Rabadon's Deathcap", "Trinity Force"], correctIndex: 0 },
      { id: 8, text: "Cine este ultimul campion cu 200 de ani de experiență?", options: ["Sett", "Aphelios", "Samira", "Viego"], correctIndex: 1 },
      { id: 9, text: "Ce echipă a câștigat primul Worlds?", options: ["T1", "Fnatic", "Samsung", "Royal Club"], correctIndex: 1 },
      { id: 10, text: "Ce regiune este reprezentată de echipa T1?", options: ["China", "Coreea", "Europa", "America de Nord"], correctIndex: 1 },
    ],
  },
  {
    id: "cs2",
    title: "Counter-Strike 2",
    description: "De la Silver la Global Elite — testează-ți cunoștințele CS.",
    icon: "🔫",
    difficulty: "Hard",
    questionCount: 10,
    questions: [
      { id: 1, text: "Cât costă un AWP în CS2?", options: ["$4500", "$4750", "$5000", "$4250"], correctIndex: 1 },
      { id: 2, text: "Care este cea mai iconică hartă din CS?", options: ["Nuke", "Inferno", "Dust2", "Mirage"], correctIndex: 2 },
      { id: 3, text: "Ce echipă a câștigat cele mai multe Major-uri?", options: ["Astralis", "Natus Vincere", "FaZe Clan", "Fnatic"], correctIndex: 0 },
      { id: 4, text: "Câte runde trebuie să câștigi pentru a câștiga o hartă (MR12)?", options: ["15", "16", "13", "12"], correctIndex: 2 },
      { id: 5, text: "Ce grenadă blochează vizibilitatea?", options: ["Flashbang", "Smoke Grenade", "HE Grenade", "Molotov"], correctIndex: 1 },
      { id: 6, text: "Cât durează timer-ul bombei în competitiv?", options: ["35 secunde", "40 secunde", "45 secunde", "50 secunde"], correctIndex: 1 },
      { id: 7, text: "Ce jucător este poreclit 's1mple'?", options: ["Oleksandr Kostyliev", "Nikola Kovač", "Mathieu Herbaut", "Marcelo David"], correctIndex: 0 },
      { id: 8, text: "Ce pistol este cel mai precis la prima lovitură?", options: ["Desert Eagle", "USP-S", "R8 Revolver", "Five-SeveN"], correctIndex: 1 },
      { id: 9, text: "În ce an a fost lansat CS:GO?", options: ["2011", "2012", "2013", "2014"], correctIndex: 1 },
      { id: 10, text: "Ce cuțit este cel mai rar din CS?", options: ["Karambit", "Butterfly Knife", "Skeleton Knife", "Toate au aceeași raritate"], correctIndex: 3 },
    ],
  },
  {
    id: "minecraft",
    title: "Minecraft",
    description: "Adu-ți aminte de toate craftingurile și secretele din lumea cuburilor.",
    icon: "⛏️",
    difficulty: "Easy",
    questionCount: 10,
    questions: [
      { id: 1, text: "Ce material ai nevoie pentru a crea un portal Nether?", options: ["Diamond", "Obsidian", "Netherite", "Crying Obsidian"], correctIndex: 1 },
      { id: 2, text: "Câte blocuri de obsidian ai nevoie pentru un portal?", options: ["8", "10", "12", "14"], correctIndex: 1 },
      { id: 3, text: "Ce mob dropeaza Ender Pearls?", options: ["Creeper", "Enderman", "Blaze", "Skeleton"], correctIndex: 1 },
      { id: 4, text: "Ce mâncare dă cea mai multă sațietate?", options: ["Steak", "Golden Carrot", "Golden Apple", "Cooked Porkchop"], correctIndex: 2 },
      { id: 5, text: "Câte sloturi are inventarul jucătorului?", options: ["27", "36", "45", "54"], correctIndex: 1 },
      { id: 6, text: "Ce boss se află în The End?", options: ["Wither", "Elder Guardian", "Ender Dragon", "Warden"], correctIndex: 2 },
      { id: 7, text: "Cine a creat Minecraft?", options: ["Jeb", "Notch", "Dinnerbone", "Herobrine"], correctIndex: 1 },
      { id: 8, text: "Ce biome conține Mooshrooms?", options: ["Plains", "Mushroom Island", "Swamp", "Dark Forest"], correctIndex: 1 },
      { id: 9, text: "Ce enchantment face pickaxe-ul să mineze mai repede?", options: ["Unbreaking", "Efficiency", "Fortune", "Silk Touch"], correctIndex: 1 },
      { id: 10, text: "În ce an a fost lansat Minecraft complet?", options: ["2009", "2010", "2011", "2012"], correctIndex: 2 },
    ],
  },
  {
    id: "fortnite",
    title: "Fortnite",
    description: "Victory Royale în cunoștințe — cât știi despre Fortnite?",
    icon: "🏗️",
    difficulty: "Easy",
    questionCount: 10,
    questions: [
      { id: 1, text: "În ce an a fost lansat Fortnite Battle Royale?", options: ["2016", "2017", "2018", "2019"], correctIndex: 1 },
      { id: 2, text: "Cine a dezvoltat Fortnite?", options: ["Riot Games", "EA Sports", "Epic Games", "Ubisoft"], correctIndex: 2 },
      { id: 3, text: "Ce culoare are cea mai rară raritate de arme?", options: ["Auriu", "Violet", "Albastru", "Roșu"], correctIndex: 0 },
      { id: 4, text: "Câți jucători sunt într-un meci solo standard?", options: ["50", "100", "150", "200"], correctIndex: 1 },
      { id: 5, text: "Ce eveniment live a inclus un concert Travis Scott?", options: ["The End", "Astronomical", "The Device", "Zero Crisis"], correctIndex: 1 },
      { id: 6, text: "Ce material de construcție este cel mai rezistent?", options: ["Lemn", "Cărămidă", "Metal", "Toate la fel"], correctIndex: 2 },
      { id: 7, text: "Cum se numește moneda din Fortnite?", options: ["Robux", "V-Bucks", "Coins", "Gems"], correctIndex: 1 },
      { id: 8, text: "Ce skin legendar a fost primul din Item Shop?", options: ["Renegade Raider", "Skull Trooper", "Ghoul Trooper", "Black Knight"], correctIndex: 1 },
      { id: 9, text: "Ce engine grafic folosește Fortnite?", options: ["Unity", "CryEngine", "Unreal Engine", "Frostbite"], correctIndex: 2 },
      { id: 10, text: "Ce mod de joc a fost adăugat în Chapter 2?", options: ["Creative", "Party Royale", "Zero Build", "Save the World"], correctIndex: 1 },
    ],
  },
  {
    id: "gta",
    title: "Grand Theft Auto",
    description: "De la Vice City la Los Santos — cât de bine cunoști seria GTA?",
    icon: "🚗",
    difficulty: "Medium",
    questionCount: 10,
    questions: [
      { id: 1, text: "În ce oraș se desfășoară GTA V?", options: ["Liberty City", "Vice City", "Los Santos", "San Fierro"], correctIndex: 2 },
      { id: 2, text: "Câți protagoniști are GTA V?", options: ["1", "2", "3", "4"], correctIndex: 2 },
      { id: 3, text: "Ce actor a dat vocea lui CJ în GTA San Andreas?", options: ["Ice Cube", "Young Maylay", "Dr. Dre", "50 Cent"], correctIndex: 1 },
      { id: 4, text: "În ce an a fost lansat GTA V?", options: ["2012", "2013", "2014", "2015"], correctIndex: 1 },
      { id: 5, text: "Ce radio station cântă 'I Want It That Way' în GTA V?", options: ["Los Santos Rock", "Non-Stop Pop FM", "Radio Mirror Park", "Vinewood Boulevard"], correctIndex: 1 },
      { id: 6, text: "Cum se numesc cei 3 protagoniști din GTA V?", options: ["Michael, Trevor, Franklin", "Niko, Roman, Luis", "Tommy, Lance, Ken", "CJ, Sweet, Ryder"], correctIndex: 0 },
      { id: 7, text: "Ce companie a creat seria GTA?", options: ["EA", "Ubisoft", "Rockstar Games", "Activision"], correctIndex: 2 },
      { id: 8, text: "Care GTA a fost primul 3D din serie?", options: ["GTA 2", "GTA III", "GTA Vice City", "GTA San Andreas"], correctIndex: 1 },
      { id: 9, text: "Ce vehicul este iconul GTA Online Heists?", options: ["Kuruma", "Insurgent", "Oppressor", "Zentorno"], correctIndex: 0 },
      { id: 10, text: "În ce oraș se desfășoară GTA IV?", options: ["Los Santos", "Vice City", "Liberty City", "San Fierro"], correctIndex: 2 },
    ],
  },
  {
    id: "gaming-general",
    title: "Gaming General",
    description: "Întrebări din toate colțurile universului gaming.",
    icon: "🎮",
    difficulty: "Medium",
    questionCount: 10,
    questions: [
      { id: 1, text: "Ce joc deține recordul de cel mai vândut joc din toate timpurile?", options: ["GTA V", "Minecraft", "Tetris", "Wii Sports"], correctIndex: 1 },
      { id: 2, text: "Ce companie a creat PlayStation?", options: ["Nintendo", "Microsoft", "Sony", "Sega"], correctIndex: 2 },
      { id: 3, text: "Cum se numește personajul principal din The Legend of Zelda?", options: ["Zelda", "Link", "Ganondorf", "Epona"], correctIndex: 1 },
      { id: 4, text: "Ce joc a popularizat genul Battle Royale?", options: ["Fortnite", "PUBG", "H1Z1", "Apex Legends"], correctIndex: 1 },
      { id: 5, text: "Ce consolă a fost prima din seria Xbox?", options: ["Xbox 360", "Xbox", "Xbox One", "Xbox Series X"], correctIndex: 1 },
      { id: 6, text: "Ce platformă de streaming a fost creată special pentru gaming?", options: ["YouTube", "Twitch", "Facebook Gaming", "Kick"], correctIndex: 1 },
      { id: 7, text: "Ce joc FromSoftware a câștigat Game of the Year 2022?", options: ["Dark Souls III", "Sekiro", "Elden Ring", "Bloodborne"], correctIndex: 2 },
      { id: 8, text: "Câte generații de consolă Playstation au existat?", options: ["4", "5", "6", "7"], correctIndex: 1 },
      { id: 9, text: "Ce joc are personajul 'Master Chief'?", options: ["Gears of War", "Halo", "Destiny", "Doom"], correctIndex: 1 },
      { id: 10, text: "Ce companie a creat Mario?", options: ["Sega", "Capcom", "Nintendo", "Konami"], correctIndex: 2 },
    ],
  },
];
