export interface Language {
  code: string;
  label: string;
}

export const LANGUAGES: Language[] = [
  { code: "am", label: "አማርኛ (Amharic)" },
  { code: "ar", label: "العربية (Arabic)" },
  { code: "my", label: "မြန်မာဘာသာ (Burmese)" },
  { code: "en", label: "English" },
  { code: "fa", label: "فارسی (Farsi)" },
  { code: "fr", label: "Français (French)" },
  { code: "fr-creole", label: "Kreyòl Ayisyen (French Creole)" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "hmn", label: "Hmoob (Hmong)" },
  { code: "lo", label: "ພາສາລາວ (Lao)" },
  { code: "zh-hans", label: "普通话 (Mandarin Simplified)" },
  { code: "mien", label: "Iu Mien (Mien)" },
  { code: "pt", label: "Português (Portuguese)" },
  { code: "ru", label: "Русский (Russian)" },
  { code: "so", label: "Soomaali (Somali)" },
  { code: "es", label: "Español (Spanish)" },
  { code: "ti", label: "ትግርኛ (Tigrinya)" },
  { code: "tr", label: "Türkçe (Turkish)" },
  { code: "uk", label: "Українська (Ukrainian)" },
  { code: "vi", label: "Tiếng Việt (Vietnamese)" },
];
