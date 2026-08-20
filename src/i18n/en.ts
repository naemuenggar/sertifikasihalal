/**
 * English translations. Structure is type-checked against `Translations`
 * (typeof id), so any missing/mismatched key fails at compile time.
 * Official body names (BPJPH, BPOM, MUI, LPH, SIHALAL) stay untranslated.
 */
import type { Translations } from "./id";

export const en: Translations = {
  meta: {
    homeTitle: "Urushalal — Halal Certification Made Easy",
    description:
      "Urushalal — trusted partner for BPJPH halal certification for SMEs and corporations in Indonesia.",
    ogTitle: "Urushalal — Halal Certification Made Easy",
    ogDescription:
      "Trusted assistance for BPJPH halal certification and BPOM distribution licenses for SMEs and corporations in Indonesia.",
    ogLocale: "en_US",
  },

  common: {
    freeConsult: "Free consultation",
    startFreeConsult: "Start a free consultation",
    backHome: "Back to homepage",
    skipToContent: "Skip to main content",
  },

  header: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      flow: "Process",
      news: "News",
    },
    aria: {
      brandHome: "Urushalal homepage",
      mainNav: "Main",
      mobileNav: "Mobile",
      chooseService: "Choose a service",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Select language",
    },
    serviceTaglines: {
      "sertifikasi-halal-reguler":
        "Full halal certification in Indonesia — SIHALAL, LPH audit, through to the BPJPH certificate.",
      "registrasi-sertifikat-halal-luar-negeri":
        "Register your foreign halal certificate (MRA) for recognition in Indonesia — faster.",
      "registrasi-makanan-minuman-bpom":
        "BPOM distribution licenses for processed food & packaged beverages (MD/ML), ready to sell.",
      "registrasi-kosmetik-bpom":
        "Cosmetic notification (NA) for skincare, makeup, and perfumes per BPOM standards.",
      "registrasi-suplemen-kesehatan-bpom":
        "Distribution licenses for supplements — vitamins, minerals, herbal — per BPOM safety rules.",
    },
  },

  hero: {
    ariaLabel: "Urushalal core services",
    controlsLabel: "Slide navigation",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    showSlide: (name: string) => `Show slide ${name}`,
    slideStatus: (index: number, total: number, name: string) =>
      `Slide ${index} of ${total}: ${name}`,
    slideAria: (position: number, total: number, name: string) =>
      `${position} of ${total} — ${name}`,
    slides: {
      halal: {
        name: "Halal Certification",
        badge: "Halal Certification for Every Type of Business",
        titleHead: "Halal Certification,",
        titleAccent: ["Added Value", "for Your Business"],
        lead: "We help you obtain halal certification quickly, easily, and in full compliance with sharia requirements.",
        features: [
          { title: "Sharia-Compliant", desc: "Guided by competent, certified auditors" },
          { title: "Fast & Transparent Process", desc: "Clear workflow, fixed pricing, no hidden costs" },
          { title: "Recognized Nationally & Globally", desc: "Halal certificate recognized by BPJPH & MUI" },
          { title: "Professional Assistance", desc: "Expert team supporting you until the certificate is issued" },
        ],
        waMessage: "Hello, I'd like to consult about halal certification for my product.",
        ctaSecondary: "See the process",
        stats: [
          { num: "200+", label: "Certified Products" },
          { num: "30 Days", label: "Average audit turnaround" },
          { num: "98%", label: "Applications Passing First Verification" },
        ],
      },
      bpom: {
        name: "BPOM Licensing",
        badge: "BPOM Licensing, Guaranteed Legality",
        titleHead: "BPOM Licensing,",
        titleAccent: ["Simple, Safe", "& Well-Guided"],
        lead: "We help you secure BPOM licenses for food, beverage, pharmaceutical, cosmetic, and supplement products through a safe and efficient process.",
        features: [
          { title: "Experienced Team", desc: "Expert regulatory consultants ready to assist you" },
          { title: "Fast & Efficient Process", desc: "Complete documentation for a smoother process" },
          { title: "Legal & Trusted", desc: "Compliant with the latest BPOM regulations" },
          { title: "End-to-End Service", desc: "From preparation to license issuance" },
        ],
        waMessage: "Hello, I'd like to consult about obtaining a BPOM license for my product.",
        ctaSecondary: "See the process",
        stats: [
          { num: "4–5 Months", label: "Estimated Timeline" },
          { num: "100%", label: "Assistance Until Issuance" },
          { num: "Free Consultation", label: "Our team is ready to help anytime" },
        ],
      },
    },
  },

  news: {
    eyebrow: "News",
    homeTitle: "Latest news & guides on halal and BPOM.",
    allNews: "All news",
    loadError: "News cannot be loaded at the moment.",
    retry: "Try again",
    minRead: (minutes: number) => `${minutes} min read`,
    categoryFallback: "News",
    /** English labels for news categories (DB values stay Indonesian — the
     *  list is fixed, see CATEGORIES in AdminNewsFormPage). Unknown = shown as-is. */
    categoryNames: {
      Halal: "Halal",
      BPOM: "BPOM",
      Regulasi: "Regulation",
      Informasi: "Announcement",
      "Tips & Panduan": "Tips & Guides",
    } as Record<string, string>,
    prevLabel: "Previous news",
    nextLabel: "Next news",
    metaTitle: "News — Urushalal",
    page: {
      eyebrow: "News",
      titleHead: "News &",
      titleAccent: "latest guides.",
      lead: "Regulations, guides, and the latest developments on halal certification and BPOM distribution licenses.",
      loading: "Loading news…",
      empty: "No news has been published yet.",
      prev: "Previous",
      next: "Next",
      paginationLabel: "News pagination",
    },
    detail: {
      loading: "Loading news…",
      allNews: "← All news",
      /** Default WhatsApp button label at the end of an article (overridable per article). */
      ctaLabel: "Free consultation via WhatsApp",
      waMessage: (title: string) =>
        `Hello, I read the article "${title}" and would like to consult.`,
      waMessageGeneric: "Hello, I'd like to consult about halal certification.",
    },
  },

  products: {
    prevLabel: (theme: string) => `Previous ${theme} category`,
    nextLabel: (theme: string) => `Next ${theme} category`,
    themeLabel: { halal: "halal", bpom: "BPOM" },
    halal: {
      eyebrow: "Certification coverage",
      title: "Halal Products We Certify",
      lead: "Halal certification for a wide range of product categories in accordance with BPJPH regulations.",
      items: [
        {
          title: "Food and Beverages",
          description: "Processed products, beverages, and food ingredients distributed in the Indonesian market.",
        },
        {
          title: "Dietary Supplements",
          description: "Vitamins, minerals, and nutritional products that must be Halal-certified and registered with BPOM.",
        },
        {
          title: "Cosmetics and Personal Care",
          description: "Skincare, make-up, and body care products applied directly to the skin.",
        },
        {
          title: "Distribution & Storage Services",
          description: "Halal certification assistance for product distribution and storage chains, keeping your logistics processes halal-compliant.",
        },
        {
          title: "Consumer Goods",
          description: "Everyday halal-certified products, from plastic wrap and tissues to soap and other household essentials.",
        },
        {
          title: "Household Products",
          description: "Cleaning agents and chemical-based household consumer products.",
        },
        {
          title: "Other Categories",
          description: "Pharmaceutical products, food packaging, and other categories evaluated on a case-by-case basis.",
        },
      ],
    },
    bpom: {
      eyebrow: "Distribution license coverage",
      title: "BPOM Products We Register",
      lead: "BPOM distribution license assistance for products in accordance with applicable regulations.",
      items: [
        {
          title: "Food and Beverages",
          description: "Processed food and beverage products requiring a BPOM distribution license.",
        },
        {
          title: "Health Supplements",
          description: "Vitamins, minerals, and nutritional products in accordance with BPOM safety requirements.",
        },
        {
          title: "Cosmetic Products",
          description: "Skincare, make-up, and body care products that must be registered with BPOM.",
        },
      ],
    },
  },

  serviceCards: {
    eyebrow: "What we handle",
    title: "From intention to issued certificate, all under one roof.",
    prevLabel: "Previous card",
    nextLabel: "Next card",
    items: [
      {
        title: "Free Initial Consultation",
        desc: "We map your product types, ingredients, and processes to determine the most suitable certification scheme.",
        tag: "Preparation phase",
      },
      {
        title: "Document Preparation",
        desc: "Halal Registration Forms, ingredient lists, production flowcharts — we compile everything until it's verification-ready.",
        tag: "BPJPH",
      },
      {
        title: "Audit Assistance",
        desc: "LPH auditors visit your site. We provide technical support so the audit is done right the first time.",
        tag: "On-site",
      },
      {
        title: "Certificate Issuance",
        desc: "We monitor the audit results until the MUI Fatwa is out and the official halal certificate appears on the SIHALAL portal.",
        tag: "Completion",
      },
      {
        title: "Ingredient & Supplier Review",
        desc: "Verify the halal status of every ingredient and supplier so your supply chain is documented and audit-proof.",
        tag: "Due diligence",
      },
    ],
  },

  flow: {
    eyebrow: "Process",
    title: "The process differs depending on where your product comes from.",
    lead: "We don't promise “instant results”. What we guarantee: every stage is completed without document back-and-forth, and you always know where your application stands.",
    tablistLabel: "Choose a certification track",
    stageCount: (count: number) => `${count} stages`,
    overseasNote: " — more streamlined because the on-site audit is skipped",
    snakeHint: "Hover over each stage to preview its details, click to pin it.",
    detailLabel: "Stage details",
    stepLabel: (step: number) => `Stage ${step}`,
    paths: {
      reguler: {
        label: "Produced in Indonesia",
        hint: "No halal certificate yet, or manufacturing is domestic. Includes an on-site audit.",
        stages: [
          {
            title: "Free Consultation",
            actor: "Urushalal",
            duration: "Max. 24 hours",
            desc: "We review your product and country of manufacture, then confirm the most suitable certification track along with an estimated timeline and cost.",
          },
          {
            title: "Documentation Preparation",
            actor: "You + Urushalal",
            desc: "GMP certificates, raw material declarations, packaging design, and other supporting documents — we prepare them together with you until complete.",
          },
          {
            title: "SIHALAL Registration & Audit",
            actor: "LPH",
            desc: "The application is submitted through BPJPH's SIHALAL system. Auditors from an accredited Halal Inspection Agency inspect your production facility on-site.",
          },
          {
            title: "MUI Fatwa",
            actor: "MUI",
            desc: "The audit results are reviewed by the Fatwa Commission of the Indonesian Ulema Council. This halal fatwa is the religious requirement mandated by law.",
          },
          {
            title: "Certificate Issuance",
            actor: "BPJPH",
            duration: "Valid permanently",
            desc: "BPJPH issues the official Indonesian Halal Certificate. Compliance is still periodically evaluated every 4 years — we help monitor and handle its renewal.",
          },
        ],
      },
      "produksi-luar": {
        label: "Produced abroad",
        hint: "No halal certificate yet, and manufacturing is overseas. Includes an on-site audit.",
        stages: [
          {
            title: "Free Consultation",
            actor: "Urushalal",
            duration: "Max. 24 hours",
            desc: "We review your product and country of manufacture, then confirm the most suitable certification track along with an estimated timeline and cost.",
          },
          {
            title: "Documentation Preparation",
            actor: "You + Urushalal",
            desc: "GMP certificates, raw material declarations, packaging design, and other supporting documents — we prepare them together with you until complete.",
          },
          {
            title: "SIHALAL Registration & Audit",
            actor: "LPH",
            desc: "The application is submitted through BPJPH's SIHALAL system. Auditors from an accredited Halal Inspection Agency inspect your production facility on-site.",
          },
          {
            title: "MUI Fatwa",
            actor: "MUI",
            desc: "The audit results are reviewed by the Fatwa Commission of the Indonesian Ulema Council. This halal fatwa is the religious requirement mandated by law.",
          },
          {
            title: "Certificate Issuance",
            actor: "BPJPH",
            duration: "Valid permanently",
            desc: "BPJPH issues the official Indonesian Halal Certificate. Compliance is still periodically evaluated every 4 years — we help monitor and handle its renewal.",
          },
        ],
      },
      mra: {
        label: "Already have a foreign certificate",
        hint: "The issuing body holds an MRA with BPJPH. No re-audit required.",
        stages: [
          {
            title: "Consultation & MRA Eligibility Check",
            actor: "Urushalal",
            duration: "Max. 24 hours",
            desc: "We verify whether the body that issued your certificate holds a Mutual Recognition Agreement (MRA) with BPJPH.",
          },
          {
            title: "Certificate Document Preparation",
            actor: "You + Urushalal",
            desc: "We organize your existing halal certificate and its supporting documents according to BPJPH requirements. The certificate must be issued by a body in the country where the product is manufactured.",
          },
          {
            title: "Registration with BPJPH",
            actor: "BPJPH",
            desc: "Your certificate is registered in the BPJPH system to obtain official recognition in Indonesia. With no re-audit of the production facility, the process is much faster and more cost-effective.",
          },
        ],
      },
    },
  },

  packages: {
    eyebrow: "Choose what fits",
    title: "Honest pricing, no hidden fees.",
    choose: (name: string) => `Choose ${name}`,
    waMessage: (category: string, name: string) =>
      `Hello, I'm interested in the ${category} ${name} package. Could you explain it?`,
    features: {
      micro: [
        "Free consultation for scheme & product mapping",
        "Complete ingredient & supplier review",
        "Production flowchart preparation",
        "1x audit + 1x audit assistance",
        "Status tracking via dashboard",
        "SIHALAL account creation",
        "Free Consultation",
      ],
      medium: [
        "1 Location + 1 Outlet",
        "Dedicated halal officer",
        "Internal team training",
        "Pre-audit readiness assessment",
      ],
      large: [
        "Everything in the Medium package",
        "Everything in the Micro package",
        "Pre-audit across all locations/outlets",
      ],
    },
    categories: [
      {
        key: "produk",
        name: "Products",
        description:
          "Food, beverages, cosmetics, chemical products, biological products, consumer goods, genetically engineered products",
        packages: [
          { tier: "micro", lbl: "Micro/Small", name: "Micro/Small", price: "IDR 5,000,000", unit: "/ one-time payment", feat: false },
          { tier: "medium", lbl: "Medium", name: "Medium", price: "From IDR 20,000,000", unit: "/ one-time payment", feat: true },
          { tier: "large", lbl: "Large", name: "Large", price: "From IDR 30,000,000", unit: "/ one-time payment", feat: false },
        ],
      },
      {
        key: "jasa",
        name: "Services",
        description:
          "Slaughtering, distribution, storage, processing, packaging, serving, and sales",
        packages: [
          { tier: "micro", lbl: "Micro/Small", name: "Micro/Small", price: "From IDR 8,000,000", unit: "/ one-time payment", feat: false },
          { tier: "medium", lbl: "Medium", name: "Medium", price: "From IDR 25,000,000", unit: "/ one-time payment", feat: true },
          { tier: "large", lbl: "Large", name: "Large", price: "From IDR 33,000,000", unit: "/ one-time payment", feat: false },
        ],
      },
    ],
  },

  clients: {
    eyebrow: "Trusted by businesses",
    title: "Our Clients",
    lead: "Halal and BPOM certification assistance for various industries in Indonesia and abroad.",
    prevLabel: "Previous clients",
    nextLabel: "Next clients",
    listLabel: "Urushalal client list",
    origin: (country: string) => `Company origin: ${country}`,
    flagAlt: (country: string) => `Flag of ${country}`,
  },

  faq: {
    eyebrow: "Frequently asked questions",
    title: "Questions we hear most often.",
    lead: "Haven't found the answer? Ask directly in a free consultation session — 20 minutes is usually enough.",
    ask: "Ask a question",
    tablistLabel: "FAQ categories",
    tabs: { halal: "Halal Certification", bpom: "BPOM Licensing" },
    halalItems: [
      {
        q: "Is halal certification mandatory for selling in Indonesia?",
        a: "Yes. Law No. 33/2014 on Halal Product Assurance, implemented through Government Regulation No. 42/2024, requires products distributed in Indonesia to hold a valid BPJPH halal certificate. The obligation for food & beverages has been in effect since October 17, 2024. For cosmetics, pharmaceuticals, household products, and other consumer goods, it becomes mandatory no later than October 17, 2026. Non-compliant products risk import bans, market withdrawal, and fines.",
      },
      {
        q: "What's the difference between Regular Halal Certification and Foreign Halal Certificate Registration?",
        a: "Regular Halal Certification applies if your company does not yet hold a halal certificate from a recognized halal body in its country of manufacture — the full process takes place in Indonesia (SIHALAL → LPH audit → MUI fatwa → BPJPH certificate) and takes around 3–6 months. Foreign Halal Certificate Registration applies if your company already holds a certificate from a body with an MRA with BPJPH — it simply needs to be registered, making the process much faster at around 20–43 working days, and more cost-effective.",
      },
      {
        q: "Can I use a halal certificate from another country to sell in Indonesia?",
        a: "Yes, but only if the issuing body holds a valid Mutual Recognition Agreement (MRA) with BPJPH, and the certificate was issued by a body in the country where the product is manufactured (not another country). Contact us to verify your certificate's eligibility.",
      },
      {
        q: "How long is a BPJPH halal certificate valid?",
        a: "Under Government Regulation No. 42/2024, a BPJPH halal certificate is valid **permanently** — there is no expiration date as long as ingredient composition and production processes remain unchanged. However, two obligations still apply: (1) any change in ingredients, suppliers, or production processes must be reported and may require certificate renewal; (2) your company's Halal Product Assurance System (SJPH) is evaluated every 4 years.",
      },
      {
        q: "Which products are exempt from mandatory halal certification?",
        a: "Products that are inherently haram — such as pork-based products, alcohol, and pork fat — are exempt from certification but must display a clear \"Non-Halal\" label on their packaging. Unprocessed fresh products (e.g., fresh vegetables/fruits, live animals, fresh seafood) may also fall under exemptions per the halal positive list.",
      },
      {
        q: "What are the risks of selling products without a halal certificate in Indonesia?",
        a: "Risks include administrative sanctions from BPJPH, import suspension or bans, mandatory product withdrawal from the market, and in severe cases, criminal liability under the Halal Product Assurance Law. Major marketplaces such as Tokopedia, Shopee, and Lazada are also increasingly requiring halal certificate numbers for certain product categories.",
      },
      {
        q: "Is the old MUI halal logo still valid?",
        a: "The old MUI halal logo has been replaced by the official purple **Halal Indonesia** logo issued by BPJPH (per BPJPH Decree No. 145/2022). The old logo may still be used until **October 17, 2026**; after that, all certified products must display the new logo.",
      },
      {
        q: "Do I need re-certification if I change ingredients, suppliers, or production processes?",
        a: "Yes. Every change in raw materials, suppliers, or production processes must be reported to BPJPH and may require a re-audit/review. If changes go unreported while the certificate continues to be used, the certificate risks revocation and sanctions.",
      },
      {
        q: "Which countries have Mutual Recognition Agreements (MRA) with BPJPH?",
        a: "As of 2024, BPJPH has signed dozens of MRAs with halal certification bodies in more than 20 countries, including the United States, Australia, Canada, Malaysia, Japan, South Korea, and several others across Europe and the Middle East. The list keeps growing — contact us to check whether your country of manufacture is included.",
      },
      {
        q: "How much does halal certification cost in Indonesia?",
        a: "Costs vary depending on the chosen track, product category, number of SKUs, and country of manufacture. The Foreign Certificate Registration track is generally far more affordable because it requires no on-site audit fees. We provide a written cost breakdown free of charge during the initial consultation session, with no further obligation.",
      },
    ],
    bpomItems: [
      {
        q: "What is BPOM?",
        a: "BPOM is the government agency that oversees the safety of drugs and food distributed in Indonesia.",
      },
      {
        q: "Why does my product need a BPOM license?",
        a: "Products such as drugs, supplements, cosmetics, and processed foods must hold a distribution license before being sold in Indonesia. Without it, products can be pulled from the market and sanctioned — even if they are already licensed in their country of origin.",
      },
      {
        q: "How long does the process take, and how long is the license valid?",
        a: "The process runs through online submission, audit, assessment, evaluation, and ratification; its duration depends on the product type and risk level. The license is valid for 5 years and can be renewed starting 6 months before expiry.",
      },
      {
        q: "What documents are required?",
        a: "Documents generally include the identities of the director and person in charge, company legality documents, factory and raw material data, product details, lab test results, and GMP/HACCP/ISO certificates. Requirements may differ for local and imported products.",
      },
      {
        q: "Why use a BPOM registration service?",
        a: "So that all requirements are met from the start, the process runs faster, and the risk of rejection is minimized. Our team assists you through to license issuance.",
      },
    ],
  },

  services: {
    items: {
      "sertifikasi-halal-reguler": {
        name: "Regular Halal Certification",
        shortDesc:
          "The full halal certification process in Indonesia for businesses (SMEs and corporations alike) whose products are manufactured domestically or do not yet hold a halal certificate from a BPJPH-recognized body. Covers SIHALAL registration, auditing by a Halal Inspection Agency (LPH), fatwa issuance by MUI, through to the official BPJPH certificate.",
        article:
          "Regular Halal Certification is the full certification track carried out directly in Indonesia, ideal for businesses that manufacture domestically or do not yet hold a halal certificate from any institution. The process begins with submitting an application through BPJPH's SIHALAL system, followed by an on-site audit of your production facility by auditors from an accredited Halal Inspection Agency (LPH). The audit results are then submitted to the MUI Fatwa Commission for review and ratification as a halal fatwa. Once the fatwa is issued, BPJPH issues the Indonesian Halal Certificate, which remains valid permanently as long as ingredient composition and production processes stay unchanged. We guide you through every stage — from document preparation and coordination with LPH and MUI, to the moment the certificate is in your hands.",
      },
      "registrasi-sertifikat-halal-luar-negeri": {
        name: "Foreign Halal Certificate Registration",
        shortDesc:
          "For companies that already hold a halal certificate from a foreign body with a Mutual Recognition Agreement (MRA) with BPJPH, we register that certificate so it is valid and recognized in Indonesia. The process is significantly faster because no re-audit of the production facility is required.",
        article:
          "This service is intended for companies whose products are manufactured abroad and already hold a halal certificate from a local certification body that has entered into a Mutual Recognition Agreement (MRA) with BPJPH. Instead of going through the full certification process from scratch, your existing halal certificate simply needs to be registered in the BPJPH system to obtain official recognition in Indonesia. The requirement is that the certificate must be issued by a body in the country where the product is manufactured. This track is far faster and more cost-effective than regular certification because it requires no re-audit of the production facility. We verify your certificate's eligibility and handle the entire registration process with BPJPH.",
      },
      "registrasi-makanan-minuman-bpom": {
        name: "Food and Beverage Registration (BPOM)",
        shortDesc:
          "BPOM distribution license services for processed food, packaged beverages, and food raw materials (MD category for domestically produced goods, ML for imports). We assist from preparing technical documents and registering through the e-Reg Pangan system to the point your product is ready for legal sale.",
        article:
          "Every processed food and packaged beverage product distributed in Indonesia must hold a distribution license from BPOM before it can be legally sold. We handle this registration process end to end — from preparing the product's technical documentation (composition, production process, laboratory test results), registering through BPOM's e-Reg Pangan system, to the issuance of the distribution license number (MD category for local products, ML for imports). This service is ideal for food, beverage, and food raw material producers looking to market their products officially and legally across Indonesia.",
      },
      "registrasi-kosmetik-bpom": {
        name: "Cosmetic Product Registration (BPOM)",
        shortDesc:
          "BPOM cosmetic notification services (Notifkos) for skincare, hair care, facial care, and fragrance products to obtain an official distribution license number (NA). We ensure your product's formula, claims, and packaging meet BPOM safety standards before it enters the Indonesian market.",
        article:
          "Cosmetic products — from skincare and makeup to hair care and perfumes — must hold a notification number (NA) from BPOM before being marketed in Indonesia. We handle the cosmetic notification process (Notifkos) from formula and raw material review, adjusting product claims to comply with regulations, and preparing technical documents, through to submission via BPOM's official system. We also ensure your product packaging and labels meet applicable safety standards and labeling requirements, so your product is ready for market without regulatory obstacles.",
      },
      "registrasi-suplemen-kesehatan-bpom": {
        name: "Health Supplement Registration (BPOM)",
        shortDesc:
          "Distribution license registration for health supplements such as vitamins, minerals, herbal extracts, and other nutritional products. We prepare safety documentation and efficacy claims in line with BPOM requirements so your supplements can be legally marketed.",
        article:
          "Health supplement products such as vitamins, minerals, herbal extracts, probiotics, and other nutritional products require a specific distribution license from BPOM before they can be marketed. We prepare product safety documentation, efficacy claim evidence, and other technical requirements in accordance with BPOM regulations, then submit the registration through to license issuance. This service suits both local manufacturers and foreign companies looking to legally market their health supplement products in the Indonesian market.",
      },
    },
    metaNotFound: "Not found — Urushalal",
    detail: {
      eyebrow: "Services",
      ctaTitle: "Interested in this service?",
      ctaText: "Discuss your product's needs — free of charge, no obligation.",
      others: "Other services",
    },
  },

  about: {
    metaTitle: "About Us — Urushalal",
    eyebrow: "About Us",
    titleHead: "A licensing partner that",
    titleAccent: "supports you all the way.",
    profileTitle: "Brief Profile",
    profileText:
      "Urushalal, a platform developed by PT Ruang Halal Indonesia, exists to help businesses — from SMEs to corporations, local and foreign companies alike — obtain BPJPH halal certification and BPOM distribution licenses through a process that is fast, transparent, and compliant with the latest regulations. We understand that licensing can feel complicated, which is why we act as a partner that guides you through every stage, from the initial consultation to the moment your certificate or distribution license is in your hands.",
    visionTitle: "Vision",
    visionText:
      "To become the most trusted partner for businesses in meeting halal and product safety standards in Indonesia.",
    missionTitle: "Mission",
    mission: [
      "Providing fast, transparent, and regulation-compliant halal certification and BPOM registration assistance.",
      "Helping local and foreign businesses understand and meet applicable legal requirements in Indonesia.",
      "Being a one-stop service for product legality needs, from halal and BPOM to other supporting documentation.",
    ],
    whyTitle: "Why Choose Us",
    why: [
      "An experienced team that understands the latest BPJPH & BPOM regulations.",
      "Full assistance from consultation and document preparation through to certificate/license issuance.",
      "Transparent process — cost and time estimates are communicated upfront, with no hidden fees.",
      "Free consultations to determine the most suitable certification/registration track.",
    ],
  },

  footer: {
    ctaTitle: "Time for your product to be",
    ctaTitleAccent: "officially halal.",
    ctaButton: "Start a free consultation",
    tagline:
      "Halal certification & BPOM distribution license assistance for Indonesian businesses. Registered and connected with official LPH.",
    servicesTitle: "Services",
    bpomLabel: "BPOM Distribution Licenses",
    bpomShort: {
      "registrasi-makanan-minuman-bpom": "Food",
      "registrasi-kosmetik-bpom": "Cosmetics",
      "registrasi-suplemen-kesehatan-bpom": "Supplements",
    },
    companyTitle: "Company",
    companyLinks: { about: "About Us", flow: "Process", news: "News", faq: "FAQ" },
    contactTitle: "Contact",
    city: "South Jakarta",
    hours: "Monday–Friday, 09:00–17:00 WIB",
    copyright: "© 2026 PT Ruang Halal Indonesia. Operates in compliance with BPJPH regulations.",
    privacy: "Privacy policy",
    terms: "Terms of service",
  },

  deadlineModal: {
    title: "Don't miss the October 17, 2026 deadline!",
    description:
      "You risk losing access to more than 200 million Muslim consumers in Indonesia, and may face sanctions from BPJPH/the government — ranging from import bans and product withdrawal from the market to administrative fines.",
    cta: "Free Consultation",
    close: "Close warning",
  },

  moreInfo: {
    fabLabel: "More info",
    panelLabel: "More info",
    heading: "How can we help?",
    sub: "Chat directly or send us a short message.",
    close: "Close panel",
    chatWa: "Chat via WhatsApp",
    waMessage: "Hello, I'd like to ask about halal certification/BPOM",
    divider: "or send a message",
    success: "Thank you! We've received your message. Our team will contact you shortly.",
    sendAnother: "Send another message",
    namePh: "Name",
    contactPh: "Phone / Email",
    messagePh: "Message",
    send: "Send",
    sending: "Sending…",
    /** Form error messages, mapped from ContactErrorCode in lib/contact. */
    errors: {
      required: "Name, contact, and message are required.",
      too_long: "Your input is too long. Please shorten your message.",
      unconfigured: "The database is not configured yet.",
      failed: "Failed to send your message. Please try again.",
    },
  },

  notFound: {
    metaTitle: "Page not found — Urushalal",
    title: "Page not found.",
    text: "Sorry, the page you are looking for is unavailable or has been moved.",
    cta: "Back to homepage",
  },
};
