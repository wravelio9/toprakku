export type Category = "Ketoprak" | "Paket" | "Minuman" | "Tambahan";

export type ArtVariant =
  | "original"
  | "spesial"
  | "pedas"
  | "mini"
  | "paket"
  | "teh"
  | "kerupuk";

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  art: ArtVariant;
  badge?: string;
  badgeTone?: "chili" | "leaf" | "butter";
  rating: number;
  sold: number;
  customizable: boolean;
};

export const categories = ["Semua", "Ketoprak", "Paket", "Minuman", "Tambahan"] as const;
export type CategoryFilter = (typeof categories)[number];

export const menuItems: MenuItem[] = [
  {
    id: "ketoprak-original",
    name: "Ketoprak Original",
    category: "Ketoprak",
    price: 22000,
    description:
      "Bihun, lontong, tahu, tauge, dan saus kacang khas Toprakku yang dimasak tiap pagi.",
    art: "original",
    badge: "Paling laris",
    badgeTone: "chili",
    rating: 4.9,
    sold: 1280,
    customizable: true,
  },
  {
    id: "ketoprak-spesial",
    name: "Ketoprak Spesial",
    category: "Ketoprak",
    price: 29000,
    description:
      "Semua kelezatan original, ditambah telur, ekstra tahu, dan lontong lebih banyak.",
    art: "spesial",
    badge: "Favorit pembeli",
    badgeTone: "butter",
    rating: 4.9,
    sold: 864,
    customizable: true,
  },
  {
    id: "ketoprak-pedas",
    name: "Ketoprak Pedas Daun Jeruk",
    category: "Ketoprak",
    price: 26000,
    description:
      "Saus kacang dengan sambal daun jeruk yang bikin nagih. Pedasnya bisa kamu atur.",
    art: "pedas",
    badge: "Pedas",
    badgeTone: "chili",
    rating: 4.8,
    sold: 542,
    customizable: true,
  },
  {
    id: "ketoprak-mini",
    name: "Ketoprak Mini",
    category: "Ketoprak",
    price: 16000,
    description:
      "Porsi mungil untuk ngemil siang. Tetap dengan saus kacang dan taburan lengkap.",
    art: "mini",
    rating: 4.8,
    sold: 398,
    customizable: true,
  },
  {
    id: "paket-berdua",
    name: "Paket Makin Berdua",
    category: "Paket",
    price: 52000,
    description: "Dua ketoprak original dan dua es teh manis. Hemat untuk berbagi.",
    art: "paket",
    badge: "Hemat 10rb",
    badgeTone: "leaf",
    rating: 4.9,
    sold: 476,
    customizable: false,
  },
  {
    id: "es-teh-manis",
    name: "Es Teh Manis",
    category: "Minuman",
    price: 6000,
    description: "Teh manis dingin dengan es batu. Pairing paling pas untuk ketoprak.",
    art: "teh",
    rating: 4.7,
    sold: 921,
    customizable: false,
  },
  {
    id: "kerupuk-udang",
    name: "Kerupuk Udang",
    category: "Tambahan",
    price: 5000,
    description: "Kerupuk udang renyah, enak dicelup ke sisa saus kacangmu.",
    art: "kerupuk",
    rating: 4.8,
    sold: 612,
    customizable: false,
  },
];

export const sizeOptions = [
  { id: "reguler", label: "Reguler", note: "Porsi standar", price: 0 },
  { id: "besar", label: "Besar", note: "Nambah saus & bihun", price: 5000 },
] as const;

export const spiceLevels = [
  { id: "ringan", label: "Ringan", emoji: "🌱" },
  { id: "sedang", label: "Sedang", emoji: "🌶️" },
  { id: "pedas", label: "Pedas", emoji: "🔥" },
] as const;

export const toppingOptions = [
  { id: "tahu", label: "Ekstra tahu", price: 4000 },
  { id: "telur", label: "Telur rebus", price: 4000 },
  { id: "lontong", label: "Tambah lontong", price: 3000 },
  { id: "kerupuk", label: "Kerupuk", price: 2000 },
  { id: "sambal", label: "Sambal ekstra", price: 2000 },
] as const;

export const deliveryFee = 8000;
export const freeDeliveryThreshold = 100000;
export const estimatedMinutes = "25–35 menit";
