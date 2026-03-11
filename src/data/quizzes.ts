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
  questionCount: number;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    id: "istorie",
    title: "Istorie Universală",
    description: "Testează-ți cunoștințele despre evenimentele care au modelat lumea.",
    icon: "🏛️",
    questionCount: 10,
    questions: [
      { id: 1, text: "În ce an a căzut Zidul Berlinului?", options: ["1987", "1989", "1991", "1985"], correctIndex: 1 },
      { id: 2, text: "Cine a fost primul președinte al Statelor Unite?", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"], correctIndex: 2 },
      { id: 3, text: "În ce an a început Primul Război Mondial?", options: ["1912", "1914", "1916", "1918"], correctIndex: 1 },
      { id: 4, text: "Care civilizație a construit Machu Picchu?", options: ["Aztecii", "Mayașii", "Incașii", "Olmecii"], correctIndex: 2 },
      { id: 5, text: "Cine a descoperit America în 1492?", options: ["Vasco da Gama", "Fernando Magellan", "Cristofor Columb", "Amerigo Vespucci"], correctIndex: 2 },
      { id: 6, text: "În ce an a avut loc Revoluția Franceză?", options: ["1776", "1789", "1799", "1804"], correctIndex: 1 },
      { id: 7, text: "Care a fost cel mai mare imperiu din istorie ca suprafață?", options: ["Imperiul Roman", "Imperiul Mongol", "Imperiul Britanic", "Imperiul Otoman"], correctIndex: 2 },
      { id: 8, text: "Cine a fost primul om care a pășit pe Lună?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], correctIndex: 1 },
      { id: 9, text: "În ce an s-a terminat Al Doilea Război Mondial?", options: ["1943", "1944", "1945", "1946"], correctIndex: 2 },
      { id: 10, text: "Care faraon este asociat cu cea mai mare piramidă din Giza?", options: ["Tutankhamon", "Ramses II", "Khufu (Cheops)", "Cleopatra"], correctIndex: 2 },
    ],
  },
  {
    id: "geografie",
    title: "Geografie",
    description: "Cât de bine cunoști continentele, țările și capitalele lumii?",
    icon: "🌍",
    questionCount: 10,
    questions: [
      { id: 1, text: "Care este cel mai lung fluviu din lume?", options: ["Amazon", "Nil", "Mississippi", "Yangtze"], correctIndex: 1 },
      { id: 2, text: "Care este capitala Australiei?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctIndex: 2 },
      { id: 3, text: "Pe ce continent se află Deșertul Sahara?", options: ["Asia", "Africa", "America de Sud", "Australia"], correctIndex: 1 },
      { id: 4, text: "Care este cel mai înalt munte din lume?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correctIndex: 2 },
      { id: 5, text: "Care este cea mai mică țară din lume?", options: ["Monaco", "Vatican", "San Marino", "Liechtenstein"], correctIndex: 1 },
      { id: 6, text: "În ce ocean se află Insulele Maldive?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], correctIndex: 2 },
      { id: 7, text: "Care este capitala Canadei?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correctIndex: 2 },
      { id: 8, text: "Care este cel mai mare lac din lume?", options: ["Lacul Superior", "Marea Caspică", "Lacul Victoria", "Lacul Baikal"], correctIndex: 1 },
      { id: 9, text: "Câte continente există?", options: ["5", "6", "7", "8"], correctIndex: 2 },
      { id: 10, text: "Care țară are cea mai mare populație?", options: ["India", "China", "SUA", "Indonezia"], correctIndex: 0 },
    ],
  },
  {
    id: "stiinta",
    title: "Știință",
    description: "Întrebări din fizică, chimie, biologie și alte științe.",
    icon: "🔬",
    questionCount: 10,
    questions: [
      { id: 1, text: "Care este simbolul chimic al aurului?", options: ["Ag", "Au", "Fe", "Cu"], correctIndex: 1 },
      { id: 2, text: "Câte oase are corpul uman adult?", options: ["186", "206", "226", "256"], correctIndex: 1 },
      { id: 3, text: "Care este cea mai abundentă substanță din atmosfera Pământului?", options: ["Oxigen", "Azot", "Dioxid de carbon", "Argon"], correctIndex: 1 },
      { id: 4, text: "Ce planetă este cunoscută drept 'Planeta Roșie'?", options: ["Venus", "Jupiter", "Marte", "Saturn"], correctIndex: 2 },
      { id: 5, text: "Cine a formulat teoria relativității?", options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Max Planck"], correctIndex: 1 },
      { id: 6, text: "Care este cel mai dur mineral natural?", options: ["Cuarț", "Topaz", "Diamant", "Corindon"], correctIndex: 2 },
      { id: 7, text: "Ce organ produce insulină?", options: ["Ficatul", "Pancreasul", "Rinichii", "Splina"], correctIndex: 1 },
      { id: 8, text: "Care este viteza luminii (aproximativ)?", options: ["150.000 km/s", "300.000 km/s", "450.000 km/s", "600.000 km/s"], correctIndex: 1 },
      { id: 9, text: "Ce element chimic are numărul atomic 1?", options: ["Heliu", "Hidrogen", "Litiu", "Carbon"], correctIndex: 1 },
      { id: 10, text: "Care este cea mai mare planetă din sistemul solar?", options: ["Saturn", "Neptun", "Jupiter", "Uranus"], correctIndex: 2 },
    ],
  },
  {
    id: "arta-cultura",
    title: "Artă și Cultură",
    description: "Pictură, muzică, literatură și alte forme de artă.",
    icon: "🎨",
    questionCount: 10,
    questions: [
      { id: 1, text: "Cine a pictat 'Mona Lisa'?", options: ["Michelangelo", "Leonardo da Vinci", "Rafael", "Botticelli"], correctIndex: 1 },
      { id: 2, text: "Care este cel mai lung roman scris vreodată?", options: ["Război și Pace", "În căutarea timpului pierdut", "Don Quijote", "Ulise"], correctIndex: 1 },
      { id: 3, text: "Cine a compus 'Simfonia a 9-a'?", options: ["Mozart", "Bach", "Beethoven", "Chopin"], correctIndex: 2 },
      { id: 4, text: "În ce oraș se află Muzeul Luvru?", options: ["Londra", "Roma", "Paris", "Madrid"], correctIndex: 2 },
      { id: 5, text: "Cine a scris 'Romeo și Julieta'?", options: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "Jane Austen"], correctIndex: 1 },
      { id: 6, text: "Ce curent artistic a fondat Pablo Picasso?", options: ["Impresionismul", "Surrealismul", "Cubismul", "Expresionismul"], correctIndex: 2 },
      { id: 7, text: "Care este instrumentul principal al lui Yo-Yo Ma?", options: ["Vioara", "Violoncelul", "Pianul", "Flautul"], correctIndex: 1 },
      { id: 8, text: "Cine a sculptat 'David'?", options: ["Donatello", "Bernini", "Michelangelo", "Rodin"], correctIndex: 2 },
      { id: 9, text: "Care operă a fost compusă de Giuseppe Verdi?", options: ["Carmen", "Aida", "Tosca", "Nunta lui Figaro"], correctIndex: 1 },
      { id: 10, text: "Ce scriitor a creat personajul Sherlock Holmes?", options: ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe", "Jules Verne"], correctIndex: 1 },
    ],
  },
];
