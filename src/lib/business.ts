// Single source of truth for core business details
export interface SocialLink {
  name: string;
  href: string;
}

export interface BrandPalette {
  accent: string;
  onAccent: string;
  bg: string;
  ink: string;
  inkMuted: string;
}

export interface ModelStats {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  hair: string;
  eyes: string;
  shoe: string;
  dress: string;
}

export interface BusinessDetails {
  name: string;
  firstName: string;
  lastName: string;
  tagline: string;
  basedIn: string;
  representation: string;
  email: string;
  phone: string;
  address: string;
  url: string;
  socials: SocialLink[];
  stats: ModelStats;
  brand: BrandPalette;
}

export const business: BusinessDetails = {
  name: "RAY",
  firstName: "Gabriela",
  lastName: "Ray",
  tagline: "Editorial, beauty, and runway model based in New York.",
  basedIn: "Based in New York · Available worldwide",
  representation: "Direct booking",
  email: "bookings@ray.palmstreetweb.design",
  phone: "(212) 555-0184",
  address: "Brooklyn, New York",
  url: "https://ray.palmstreetweb.design",
  socials: [
    { name: "Instagram", href: "https://instagram.com/gabriela.ray" },
    { name: "Models.com", href: "https://models.com/gabriela-ray" },
    { name: "Email", href: "mailto:bookings@ray.palmstreetweb.design" },
  ],
  stats: {
    height: "5'10\"  ·  178 cm",
    bust: "32\"  ·  81 cm",
    waist: "24\"  ·  61 cm",
    hips: "34\"  ·  86 cm",
    hair: "Brunette",
    eyes: "Hazel",
    shoe: "EU 39  ·  US 8.5",
    dress: "EU 34  ·  US 2",
  },
  brand: {
    accent: "#C9A36B",
    onAccent: "#0E0D0B",
    bg: "#F4F0E8",
    ink: "#0E0D0B",
    inkMuted: "#6B6358",
  },
};
