import { business } from "./business";

export interface NavLink {
  name: string;
  href: string;
}

export interface ImageRef {
  src: string;
  alt: string;
  aspect?: "portrait" | "landscape" | "square";
}

export interface PortfolioImage extends ImageRef {
  caption?: string;
}

export interface StoryItem {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  credits: { role: string; name: string }[];
  cover: ImageRef;
  images: ImageRef[];
  blurb: string;
}

export interface PressItem {
  publication: string;
  story: string;
  date: string;
  link: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  ogImage: string;
}

export interface SiteContent {
  nav: {
    links: NavLink[];
    cta: NavLink;
  };
  hero: {
    kicker: string;
    image: ImageRef;
    sideImage: ImageRef;
  };
  intro: {
    kicker: string;
    body: string[];
  };
  portfolio: {
    kicker: string;
    heading: string;
    intro: string;
    images: PortfolioImage[];
  };
  stories: {
    kicker: string;
    heading: string;
    items: StoryItem[];
  };
  press: {
    kicker: string;
    heading: string;
    items: PressItem[];
  };
  contact: {
    kicker: string;
    heading: string;
    body: string;
    smallprint: string;
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  footer: {
    copyright: string;
    links: NavLink[];
  };
  metadata: SeoMetadata;
}

export const content: SiteContent = {
  nav: {
    links: [
      { name: "Portfolio", href: "#portfolio" },
      { name: "Stories", href: "#stories" },
      { name: "Press", href: "#press" },
      { name: "Stats", href: "#stats" },
    ],
    cta: { name: "Bookings", href: "#contact" },
  },

  hero: {
    kicker: business.basedIn,
    image: {
      src: "/images/ray-19.jpg",
      alt: "Gabriela Ray on a marble staircase in a black couture blazer with embroidered shoulders.",
      aspect: "landscape",
    },
    sideImage: {
      src: "/images/ray-1.jpg",
      alt: "Beauty headshot of Gabriela Ray in soft natural light.",
      aspect: "portrait",
    },
  },

  intro: {
    kicker: "01 — About",
    body: [
      "Gabriela Ray is an editorial, beauty, and runway model based in New York. The work moves from quiet beauty editorials to high-concept fashion stories, with stops in campaign, lookbook, and runway between.",
      "Trained at the Stella Adler Studio of Acting and signed to two agencies before turning twenty, the practice is built on movement, stillness, and the long look. The kind of book a casting director reads twice.",
      "Currently booking direct for editorial, beauty, runway, and campaign. Travels often. Always answers email.",
    ],
  },

  portfolio: {
    kicker: "02 — Portfolio",
    heading: "The book.",
    intro:
      "A working selection from the last twelve months. Editorial, beauty, lookbook, runway. Click any frame to open it on its own.",
    images: [
      { src: "/images/ray-1.jpg", alt: "Beauty close-up portrait, natural makeup.", aspect: "portrait", caption: "Beauty · Test, NY" },
      { src: "/images/ray-19.jpg", alt: "Black couture blazer on a marble staircase.", aspect: "landscape", caption: "Editorial · Vault Mag" },
      { src: "/images/ray-13.jpg", alt: "Soft beauty portrait with light hair styling.", aspect: "portrait", caption: "Beauty · Test, NY" },
      { src: "/images/ray-14.jpg", alt: "Beauty portrait in natural light.", aspect: "portrait", caption: "Beauty · Test, NY" },
      { src: "/images/ray-16.jpg", alt: "Editorial beauty close-up.", aspect: "portrait", caption: "Beauty · Test, NY" },
      { src: "/images/ray-17.jpg", alt: "Beauty portrait, side profile.", aspect: "portrait", caption: "Beauty · Test, NY" },
      { src: "/images/ray-18.jpg", alt: "Headshot with relaxed expression.", aspect: "portrait", caption: "Headshot · Polaroid" },
      { src: "/images/ray-2.jpg", alt: "Black-and-white editorial portrait.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-3.jpg", alt: "Editorial portrait with hair scarf.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-4.jpg", alt: "Editorial close-up, low-light contrast.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-5.jpg", alt: "Black-and-white editorial with sunglasses and scarf.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-6.jpg", alt: "Editorial portrait, dramatic shadow.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-7.jpg", alt: "Editorial close-up of expression and earrings.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-8.jpg", alt: "Editorial portrait in motion.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-9.jpg", alt: "Editorial portrait with downward gaze.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-10.jpg", alt: "Editorial portrait with sunglasses, contrast lighting.", aspect: "portrait", caption: "Editorial · After Hours" },
      { src: "/images/ray-11.jpg", alt: "Polka dot editorial portrait with sunglasses.", aspect: "portrait", caption: "Editorial · After Hours" },
    ],
  },

  stories: {
    kicker: "03 — Stories",
    heading: "Three editorials worth opening.",
    items: [
      {
        slug: "after-hours",
        title: "After Hours",
        subtitle: "A B&W editorial in eight frames.",
        year: "Vault Magazine · Spring 2026",
        blurb:
          "A short black-and-white story shot over a single afternoon in a Brooklyn apartment. Eight frames, one window, a borrowed pair of sunglasses, and a polka-dot bra from a vintage shop on Bedford.",
        credits: [
          { role: "Photographer", name: "Naoko Iwasaki" },
          { role: "Stylist", name: "Remi Volkov" },
          { role: "Hair & Makeup", name: "Audre Bellinger" },
          { role: "Casting", name: "Toussaint Idris" },
        ],
        cover: { src: "/images/ray-5.jpg", alt: "Black-and-white editorial cover with sunglasses." },
        images: [
          { src: "/images/ray-5.jpg", alt: "Editorial frame 01 — sunglasses, scarf.", aspect: "portrait" },
          { src: "/images/ray-11.jpg", alt: "Editorial frame 02 — polka-dot top.", aspect: "portrait" },
          { src: "/images/ray-7.jpg", alt: "Editorial frame 03 — close on earrings.", aspect: "portrait" },
          { src: "/images/ray-9.jpg", alt: "Editorial frame 04 — downward gaze.", aspect: "portrait" },
          { src: "/images/ray-10.jpg", alt: "Editorial frame 05 — direct gaze.", aspect: "portrait" },
        ],
      },
      {
        slug: "marble",
        title: "Marble",
        subtitle: "A single-look couture story.",
        year: "Direct commission · Spring 2026",
        blurb:
          "One look, one staircase, one afternoon. A black embroidered blazer borrowed from a Copenhagen archive and a single white shirt-front, photographed in a turn-of-the-century stairwell in Manhattan.",
        credits: [
          { role: "Photographer", name: "Tobias Heyer" },
          { role: "Stylist", name: "Mira Adachi" },
          { role: "Hair & Makeup", name: "Naomi Shirasaki" },
          { role: "Production", name: "Studio Voltaire" },
        ],
        cover: { src: "/images/ray-19.jpg", alt: "Cover — black couture on a marble staircase." },
        images: [
          { src: "/images/ray-19.jpg", alt: "Marble — landscape frame.", aspect: "landscape" },
        ],
      },
      {
        slug: "still-life",
        title: "Still Life",
        subtitle: "A four-frame beauty test.",
        year: "Test · Spring 2026",
        blurb:
          "A short beauty test shot in natural window light at the studio's Brooklyn space. No retouching beyond colour balance.",
        credits: [
          { role: "Photographer", name: "Lior Aaronson" },
          { role: "Hair & Makeup", name: "Hannelore Faust" },
          { role: "Direction", name: "Ada Okonjo" },
        ],
        cover: { src: "/images/ray-1.jpg", alt: "Beauty cover frame." },
        images: [
          { src: "/images/ray-1.jpg", alt: "Beauty 01.", aspect: "portrait" },
          { src: "/images/ray-13.jpg", alt: "Beauty 02.", aspect: "portrait" },
          { src: "/images/ray-14.jpg", alt: "Beauty 03.", aspect: "portrait" },
          { src: "/images/ray-16.jpg", alt: "Beauty 04.", aspect: "portrait" },
        ],
      },
    ],
  },

  press: {
    kicker: "04 — Press & Editorial",
    heading: "Recent placements.",
    items: [
      { publication: "Vault Magazine", story: "After Hours — Spring Editorial", date: "March 2026", link: "#after-hours" },
      { publication: "Object Quarterly", story: "Cover — Issue Twelve, 'Marble'", date: "February 2026", link: "#marble" },
      { publication: "Atelier Journal", story: "Beauty Story — Eight Skins", date: "January 2026", link: "#stories" },
      { publication: "Casting · Reformation", story: "Spring 26 Campaign", date: "January 2026", link: "#contact" },
      { publication: "Runway · LaQuan Smith", story: "NYFW SS26 — Look 14", date: "September 2025", link: "#contact" },
      { publication: "Editorial · The Cut", story: "Beauty Notes, vol. 04", date: "August 2025", link: "#contact" },
    ],
  },

  contact: {
    kicker: "05 — Bookings",
    heading: "Direct booking, fast reply.",
    body: "Currently booking editorial, beauty, runway, and campaign. Send the brief — dates, location, look — and a reply lands the same day, evenings excepted.",
    smallprint:
      "Day rates on request. Travel quoted separately. Usage agreed in advance and confirmed in writing.",
  },

  faq: {
    heading: "Asked & answered.",
    items: [
      {
        question: "Are you signed?",
        answer:
          "Currently booking direct. Mother agency partnerships in New York and Paris under discussion — write to the email for the current status.",
      },
      {
        question: "Do you travel?",
        answer:
          "Yes. New York is home base, but I'm comfortable on a plane and have current visas for the UK, the EU, and Japan. Travel and per-diem are quoted on the brief.",
      },
      {
        question: "Do you do nude or lingerie work?",
        answer:
          "Lingerie and tasteful implied — yes, with the right team. Full nude — not at this time. The casting deck and the team list always come ahead of the day.",
      },
      {
        question: "Polaroids or digitals?",
        answer:
          "Available on request. Send a brief description of what you'd like to see and the freshest set lands in your inbox within twenty-four hours.",
      },
      {
        question: "How fast do you confirm?",
        answer:
          "Same day for anything inside two weeks. Within forty-eight hours for anything further out. If a date is urgent, mark the subject line and the reply comes faster.",
      },
    ],
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} ${business.firstName} ${business.lastName}. All rights reserved.`,
    links: [
      { name: "Bookings", href: "#contact" },
      { name: "Instagram", href: "https://instagram.com/gabriela.ray" },
      { name: "Models.com", href: "https://models.com/gabriela-ray" },
    ],
  },

  metadata: {
    title: `${business.firstName} ${business.lastName} — ${business.tagline}`,
    description: `${business.firstName} ${business.lastName} is a New York-based editorial, beauty, and runway model. Direct booking for campaign, editorial, lookbook, and runway.`,
    ogImage: "/opengraph-image",
  },
};
