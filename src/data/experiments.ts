import pieprz from "@/assets/exp-pieprz.jpg";
import popcorn from "@/assets/exp-popcorn.jpg";
import cola from "@/assets/exp-cola.jpg";
import wulkan from "@/assets/exp-wulkan.jpg";

export type Experiment = {
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  tagline: string;
  image: string;
  accent: "sun" | "sky" | "leaf" | "fire" | "grape";
  ingredients: { name: string; emoji: string }[];
  steps: string[];
  why: string;
  category: "Woda" | "Powietrze" | "Kosmos" | "Chemia";
  difficulty: 1 | 2 | 3;
};

export const experiments: Experiment[] = [
  {
    slug: "pieprz-w-ucieczce",
    number: 1,
    title: "Pieprz w ucieczce",
    shortTitle: "Pieprz w ucieczce!",
    tagline: "Magiczna napięcie powierzchniowe wody w akcji!",
    image: pieprz,
    accent: "sun",
    category: "Woda",
    difficulty: 1,
    ingredients: [
      { name: "Talerz z wodą", emoji: "💧" },
      { name: "Pieprz mielony", emoji: "🧂" },
      { name: "Płyn do naczyń", emoji: "🧴" },
      { name: "Patyczek", emoji: "🪄" },
    ],
    steps: [
      "Nalej wody na płaski talerz.",
      "Posyp powierzchnię pieprzem.",
      "Zanurz patyczek w płynie do naczyń.",
      "Dotknij delikatnie środka wody.",
      "Obserwuj, jak pieprz ucieka na brzegi!",
    ],
    why: "Płyn do naczyń obniża napięcie powierzchniowe wody. W miejscu dotknięcia woda \"rozjeżdża się\" na boki i zabiera ze sobą cząstki pieprzu.",
  },
  {
    slug: "tanczacy-popcorn",
    number: 2,
    title: "Tańczący Popcorn",
    shortTitle: "Popcornowa dyskoteka!",
    tagline: "Sprawdź, jak sprawić, by popcorn zatańczył!",
    image: popcorn,
    accent: "sky",
    category: "Chemia",
    difficulty: 1,
    ingredients: [
      { name: "Kukurydza (popcorn)", emoji: "🍿" },
      { name: "Woda", emoji: "💧" },
      { name: "Soda oczyszczona", emoji: "🧂" },
      { name: "Ocet", emoji: "🍶" },
      { name: "Wysokie naczynie", emoji: "🥤" },
    ],
    steps: [
      "Wlej wodę do naczynia, do połowy.",
      "Dodaj 2-3 łyżki sody oczyszczonej i wymieszaj.",
      "Wrzuć kilka ziaren popcornu.",
      "Powoli wlewaj ocet.",
      "Obserwuj, jak popcorn zaczyna tańczyć!",
    ],
    why: "Soda i ocet reagują, tworząc dwutlenek węgla (CO₂) w postaci bąbelków. Bąbelki przyczepiają się do ziaren popcornu i unoszą je w górę. Gdy bąbelki pękają, popcorn opada — i taniec trwa!",
  },
  {
    slug: "cola-mentos",
    number: 3,
    title: "Coca-Cola i Mentos",
    shortTitle: "Wielki wybuch!",
    tagline: "Najsłynniejszy wulkan kuchenny świata.",
    image: cola,
    accent: "leaf",
    category: "Chemia",
    difficulty: 2,
    ingredients: [
      { name: "Butelka coli", emoji: "🥤" },
      { name: "Cukierki Mentos", emoji: "🍬" },
      { name: "Otwarta przestrzeń", emoji: "🌳" },
    ],
    steps: [
      "Postaw butelkę coli na zewnątrz.",
      "Przygotuj 5-6 cukierków Mentos.",
      "Szybko wrzuć wszystkie do butelki.",
      "Odsuń się i obserwuj fontannę!",
    ],
    why: "Powierzchnia Mentos jest pełna mikro-zagłębień, które uwalniają ogromne ilości dwutlenku węgla z napoju w jednej chwili.",
  },
  {
    slug: "domowy-wulkan",
    number: 4,
    title: "Domowy Wulkan",
    shortTitle: "Erupcja w kuchni!",
    tagline: "Zbuduj własną erupcję wulkanu z kuchennych składników.",
    image: wulkan,
    accent: "fire",
    category: "Chemia",
    difficulty: 2,
    ingredients: [
      { name: "Soda oczyszczona", emoji: "🧂" },
      { name: "Ocet", emoji: "🍶" },
      { name: "Barwnik czerwony", emoji: "🎨" },
      { name: "Płyn do naczyń", emoji: "🧴" },
      { name: "Butelka", emoji: "🍾" },
    ],
    steps: [
      "Ulep wulkan z plasteliny wokół butelki.",
      "Wsyp 2 łyżki sody do butelki.",
      "Dodaj barwnik i kroplę płynu do naczyń.",
      "Wlej ocet i odsuń się.",
      "Obserwuj erupcję lawy!",
    ],
    why: "Reakcja sody i octu wytwarza dwutlenek węgla, a płyn do naczyń tworzy pieniącą się \"lawę\".",
  },
];

export const knowledgeCards = [
  { title: "Tęcza w szklance", category: "Woda", difficulty: 3, color: "sun" },
  { title: "Balonowa Rakieta", category: "Powietrze", difficulty: 1, color: "sky" },
  { title: "Wybuch Wulkanu", category: "Chemia", difficulty: 2, color: "fire" },
  { title: "Magnetyczny Labirynt", category: "Powietrze", difficulty: 2, color: "sky" },
  { title: "Niewidzialny Atrament", category: "Chemia", difficulty: 1, color: "grape" },
  { title: "Lampa Lava", category: "Chemia", difficulty: 2, color: "grape" },
  { title: "Ogród w Słoiku", category: "Woda", difficulty: 1, color: "leaf" },
  { title: "Super Piana", category: "Chemia", difficulty: 2, color: "fire" },
  { title: "Mapa Gwiazd", category: "Kosmos", difficulty: 3, color: "grape" },
] as const;