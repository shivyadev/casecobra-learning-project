// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from "@/config/products";

export const COLORS = [
  { label: "Black", value: "black", tw: "zinc-900" },
  { label: "Blue", value: "blue", tw: "blue-950" },
  { label: "Rose", value: "rose", tw: "rose-950" },
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone X",
      value: "iphonex",
    },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
    {
      label: "iPhone 16",
      value: "iphone16",
    },
  ],
} as const;

export const MATERIALS = {
  name: "materials",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.texture,
    },
  ],
} as const;

export const COUNTRIES = [
  {
    country: "United States",
    states: ["California", "Texas", "New York", "Florida", "Illinois"],
  },
  {
    country: "China",
    states: ["Guangdong", "Shandong", "Henan", "Sichuan", "Jiangsu"],
  },
  {
    country: "Germany",
    states: [
      "Bavaria",
      "North Rhine-Westphalia",
      "Baden-Württemberg",
      "Lower Saxony",
      "Hesse",
    ],
  },
  {
    country: "India",
    states: [
      "Maharashtra",
      "Uttar Pradesh",
      "West Bengal",
      "Karnataka",
      "Tamil Nadu",
    ],
  },
  {
    country: "Japan",
    states: ["Tokyo", "Osaka", "Kanagawa", "Hokkaido", "Fukuoka"],
  },
  {
    country: "United Kingdom",
    states: ["England", "Scotland", "Wales", "Northern Ireland"],
  },
  {
    country: "France",
    states: [
      "Île-de-France",
      "Provence-Alpes-Côte d'Azur",
      "Auvergne-Rhône-Alpes",
      "Nouvelle-Aquitaine",
      "Occitanie",
    ],
  },
  {
    country: "Russia",
    states: [
      "Moscow Oblast",
      "Saint Petersburg",
      "Sverdlovsk Oblast",
      "Krasnodar Krai",
      "Tatarstan",
    ],
  },
  {
    country: "Brazil",
    states: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná"],
  },
  {
    country: "Canada",
    states: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
  },
  {
    country: "South Korea",
    states: ["Seoul", "Gyeonggi-do", "Busan", "Incheon", "Daegu"],
  },
  {
    country: "Australia",
    states: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
    ],
  },
  {
    country: "Italy",
    states: ["Lombardy", "Lazio", "Campania", "Sicily", "Veneto"],
  },
  {
    country: "Saudi Arabia",
    states: ["Riyadh", "Makkah", "Medina", "Eastern Province", "Asir"],
  },
  {
    country: "Spain",
    states: [
      "Andalusia",
      "Catalonia",
      "Madrid",
      "Valencian Community",
      "Galicia",
    ],
  },
  {
    country: "Netherlands",
    states: [
      "North Holland",
      "South Holland",
      "Utrecht",
      "Gelderland",
      "North Brabant",
    ],
  },
  {
    country: "Mexico",
    states: ["Mexico City", "Jalisco", "Nuevo León", "Puebla", "Yucatán"],
  },
  {
    country: "Turkey",
    states: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  },
  {
    country: "Switzerland",
    states: ["Zurich", "Geneva", "Bern", "Vaud", "Aargau"],
  },
  {
    country: "Indonesia",
    states: ["Jakarta", "West Java", "East Java", "Central Java", "Bali"],
  },
] as const;
