export type Lang = "sv" | "en";

export type Copy = {
  lang: Lang;
  title: string;
  description: string;
  skip: string;
  menuOpen: string;
  menuClose: string;
  cta: string;
  nav: { href: string; label: string }[];
  hero: { l1: string; l2: string; accent: string; rest: string; kicker: string; body: string };
  process: {
    kicker: string;
    title1: string;
    title2: string;
    intro: string;
    steps: { n: string; title: string; text: string }[];
  };
  services: { id: string; kicker: string; title: string; items: { n: string; short: string; title: string; text: string }[] };
  cases: { id: string; kicker: string; title: string; intro: string; strip: string; tagline: string; label: string; items: { name: string; text: string }[] };
  about: { id: string; kicker: string; name: string; left: string; right: string };
  contact: {
    id: string;
    kicker: string;
    title: string;
    org: string;
    note: string;
    fields: { name: string; email: string; company: string; message: string };
    submit: string;
    copied: string;
    ready: string;
    prefixes: { name: string; company: string; email: string };
  };
  faq: { id: string; kicker: string; title: string; items: { q: string; a: string }[] };
  close: { accent: string; before: string; after: string; text: string };
  footer: { home: string; archive: string };
};

const sv: Copy = {
  lang: "sv",
  title: "Creacom — strategi, PIM och leverans för e-handel",
  description:
    "Creacom Consulting AB hjälper bolag som säljer online med strategi, projektledning, UX och produktinformation. Från behov till leverans. Stockholm.",
  skip: "Hoppa till innehåll",
  menuOpen: "Öppna meny",
  menuClose: "Stäng meny",
  cta: "Hör av er",
  nav: [
    { href: "#tjanster", label: "Tjänster" },
    { href: "#kundcase", label: "Kundcase" },
    { href: "#process", label: "Process" },
    { href: "#om", label: "Om" },
    { href: "#kontakt", label: "Kontakt" },
  ],
  hero: {
    l1: "Från strategi till resultat",
    l2: "för din e-handel.",
    accent: "",
    rest: "",
    kicker: "/Creacom",
    body: "Creacom Consulting AB är Fredrik Roos konsultbolag i Stockholm. Vi hjälper företag som säljer online, både mot konsument och mot andra företag.",
  },
  process: {
    kicker: "/Process",
    title1: "Så jobbar",
    title2: "Creacom",
    intro: "Fyra steg från affär till något som går att sälja, mäta och skala.",
    steps: [
      {
        n: "01.",
        title: "Förstå affären",
        text: "Innan något byggs: hur ni säljer, vem kunden är och vad som håller tillväxten tillbaka.",
      },
      {
        n: "02.",
        title: "Bygg strategin",
        text: "En tydlig plan för sortiment, flöde, kanaler och vad som ska levereras först.",
      },
      {
        n: "03.",
        title: "Leverera",
        text: "Krav som teamet kan bygga. Tid och budget hålls, utan att tappa det som ska sälja.",
      },
      {
        n: "04.",
        title: "Skala det som fungerar",
        text: "När riktningen sitter flyttas kraften dit. Tänk stort, börja litet, skala snabbt.",
      },
    ],
  },
  services: {
    id: "tjanster",
    kicker: "/Tjänster",
    title: "Det som ska bli leverans",
    items: [
      {
        n: "/01.",
        short: "Strategi",
        title: "Strategi och affärsanalys",
        text: "Behoven samlas in och blir ett underlag som både ledning och team kan arbeta efter.",
      },
      {
        n: "/02.",
        short: "Projekt",
        title: "Projektledning",
        text: "Från scope till leverans. Bron mellan beställare och de som bygger.",
      },
      {
        n: "/03.",
        short: "UX",
        title: "Design, UX och marknad",
        text: "Gränssnitt och kampanjer som utgår från hur kunden köper, inte från hur systemet råkar se ut.",
      },
      {
        n: "/04.",
        short: "PIM",
        title: "Produktinformation och teknik",
        text: "En källa för produktdata, och krav som utvecklingsteamet kan ta vidare till webb och e-handel.",
      },
    ],
  },
  cases: {
    id: "kundcase",
    kicker: "/Kundcase",
    title: "I praktiken",
    intro: "Tre sammanhang där uppdraget har varit produktinformation eller telco-handel. Inga påhittade siffror.",
    strip: "Uppdragen har rört bland annat",
    tagline: "Erfarenhet. Struktur. Driv. För en starkare e-handel.",
    label: "/Case",
    items: [
      {
        name: "Bluestone PIM",
        text: "Produktinformation och projektledning. PIM-data som ska nå ut i kanalerna för telco-handel.",
      },
      {
        name: "Telenor",
        text: "Digital handel för en operatör. Erbjudanden och produktinformation mot både företag och konsumenter.",
      },
      {
        name: "Tre",
        text: "Sortiment och köpflöden för en mobiloperatör. Det som ska gå att köpa, inom tid och budget.",
      },
    ],
  },
  about: {
    id: "om",
    kicker: "/Om",
    name: "Fredrik Roos",
    left: "E-handelsstrateg med bakgrund i B2B och B2C. Hela kedjan: UX och design, supply chain, projektledning, marknadsföring och försäljning.",
    right:
      "Uppdraget är att göra kundens behov till krav och leveranser, i tid och inom budget. Creacom Consulting AB, Stockholm, registrerat 2021.",
  },
  contact: {
    id: "kontakt",
    kicker: "/Kontakt",
    title: "Vi tar det därifrån",
    org: "Org.nr 559330-2796",
    note: "Ingen publik e-post ännu. Formuläret gör ett utkast ni kan kopiera och skicka.",
    fields: { name: "Namn", email: "E-post", company: "Bolag", message: "Meddelande" },
    submit: "Kopiera meddelande",
    copied: "Kopierat. Klistra in det i ett meddelande till Fredrik.",
    ready: "Utkastet är klart. Markera texten nedan.",
    prefixes: { name: "Namn", company: "Bolag", email: "E-post" },
  },
  faq: {
    id: "fragor",
    kicker: "/Frågor",
    title: "Värt att veta",
    items: [
      {
        q: "Hur börjar ett uppdrag?",
        a: "Med en kort genomgång av affären: vad som säljs, var det skaver och vad som ska vara klart först. Sedan en avgränsad första leverans.",
      },
      {
        q: "Jobbar ni med både B2B och B2C?",
        a: "Ja. Uppdragen rör bolag som säljer varor och tjänster online, mot konsument eller mot andra företag.",
      },
      {
        q: "Vad betyder produktinformation här?",
        a: "Att samma produktsanning når webb, marknadsplatser och interna team. PIM, krav och publicering i ett flöde.",
      },
      {
        q: "Var sitter Creacom?",
        a: "Creacom Consulting AB har säte i Stockholm. Org.nr 559330-2796.",
      },
    ],
  },
  close: {
    before: "Redo för",
    accent: "mer",
    after: "än en plan?",
    text: "Strategi, projekt och produktinformation. Levererat.",
  },
  footer: { home: "Hem", archive: "Tidigare utkast" },
};

const en: Copy = {
  lang: "en",
  title: "Creacom — strategy, PIM, and delivery for commerce",
  description:
    "Creacom Consulting AB helps companies that sell online with strategy, project management, UX, and product information. From the need to delivery. Stockholm.",
  skip: "Skip to content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  cta: "Get in touch",
  nav: [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Cases" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  hero: {
    l1: "From strategy to results",
    l2: "for your commerce.",
    accent: "",
    rest: "",
    kicker: "/Creacom",
    body: "Creacom Consulting AB is Fredrik Roos's consultancy in Stockholm. We help companies that sell online, both to consumers and to other businesses.",
  },
  process: {
    kicker: "/Process",
    title1: "How Creacom",
    title2: "works",
    intro: "Four steps from the business to something you can sell, measure, and scale.",
    steps: [
      {
        n: "01.",
        title: "Understand the business",
        text: "Before anything is built: how you sell, who the customer is, and what is holding growth back.",
      },
      {
        n: "02.",
        title: "Build the strategy",
        text: "A clear plan for the range, the flow, the channels, and what should be delivered first.",
      },
      {
        n: "03.",
        title: "Deliver",
        text: "Requirements the team can build. Time and budget hold, without losing what actually has to sell.",
      },
      {
        n: "04.",
        title: "Scale what works",
        text: "Once the direction is set, effort moves there. Think big, start small, scale fast.",
      },
    ],
  },
  services: {
    id: "services",
    kicker: "/Services",
    title: "What gets delivered",
    items: [
      {
        n: "/01.",
        short: "Strategy",
        title: "Strategy and business analysis",
        text: "Needs are gathered into a brief that both leadership and the team can work from.",
      },
      {
        n: "/02.",
        short: "Delivery",
        title: "Project management",
        text: "From scope to delivery. The bridge between the buyer and the people who build.",
      },
      {
        n: "/03.",
        short: "UX",
        title: "Design, UX and marketing",
        text: "Interfaces and campaigns based on how the customer buys, not on how the system happens to look.",
      },
      {
        n: "/04.",
        short: "PIM",
        title: "Product information and technology",
        text: "One source for product data, and requirements the development team can take into the web and commerce.",
      },
    ],
  },
  cases: {
    id: "work",
    kicker: "/Cases",
    title: "In practice",
    intro: "Three contexts where the work was product information or telco commerce. No invented figures.",
    strip: "The work has included",
    tagline: "Experience. Structure. Drive. For stronger commerce.",
    label: "/Case",
    items: [
      {
        name: "Bluestone PIM",
        text: "Product information and project management. PIM data that has to reach the channels in telco commerce.",
      },
      {
        name: "Telenor",
        text: "Digital commerce for an operator. Offers and product information for both businesses and consumers.",
      },
      {
        name: "Tre",
        text: "Range and purchase flows for a mobile operator. What has to be possible to buy, on time and on budget.",
      },
    ],
  },
  about: {
    id: "about",
    kicker: "/About",
    name: "Fredrik Roos",
    left: "An e-commerce strategist with a background in B2B and B2C. The whole chain: UX and design, supply chain, project management, marketing, and sales.",
    right:
      "The work is to turn a customer's needs into requirements and deliveries, on time and on budget. Creacom Consulting AB, Stockholm, registered in 2021.",
  },
  contact: {
    id: "contact",
    kicker: "/Contact",
    title: "We'll take it from here",
    org: "Org. no. 559330-2796",
    note: "No public email yet. The form drafts a message you can copy and send.",
    fields: { name: "Name", email: "Email", company: "Company", message: "Message" },
    submit: "Copy message",
    copied: "Copied. Paste it into a message to Fredrik.",
    ready: "The draft is ready. Select the text below.",
    prefixes: { name: "Name", company: "Company", email: "Email" },
  },
  faq: {
    id: "faq",
    kicker: "/Questions",
    title: "Worth knowing",
    items: [
      {
        q: "How does an engagement start?",
        a: "With a short review of the business: what is sold, where it hurts, and what should be finished first. Then a bounded first delivery.",
      },
      {
        q: "Do you work with both B2B and B2C?",
        a: "Yes. The work is for companies that sell goods and services online, to consumers or to other businesses.",
      },
      {
        q: "What does product information mean here?",
        a: "That the same product truth reaches the web, marketplaces, and internal teams. PIM, requirements, and publishing in one flow.",
      },
      {
        q: "Where is Creacom based?",
        a: "Creacom Consulting AB is based in Stockholm. Org. no. 559330-2796.",
      },
    ],
  },
  close: {
    before: "Ready for",
    accent: "more",
    after: "than a plan?",
    text: "Strategy, projects, and product information. Delivered.",
  },
  footer: { home: "Home", archive: "Earlier draft" },
};

export const copyByLang: Record<Lang, Copy> = { sv, en };
