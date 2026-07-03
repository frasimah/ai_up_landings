import { aboutFaqItems, siteFaqItems, type SiteFaqItem } from "@/lib/siteFaq";

type StructuredDataGraph = {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
};

type BreadcrumbItem = {
  name: string;
  item: string;
};

type PageStructuredDataInput = {
  title?: string;
  description?: string;
};

const SCHEMA_SITE_URL = "https://ai-up.ru";
const HOME_URL = `${SCHEMA_SITE_URL}/`;
const LOGO_URL = `${SCHEMA_SITE_URL}/logo.png`;
const ORGANIZATION_ID = `${SCHEMA_SITE_URL}/#organization`;
const WEBSITE_ID = `${SCHEMA_SITE_URL}/#website`;
const SERVICE_ID = `${SCHEMA_SITE_URL}/#service`;
const SOFTWARE_ID = `${SCHEMA_SITE_URL}/#software`;
const CALL_CENTER_SERVICE_ID = `${SCHEMA_SITE_URL}/#callcenter-service`;
const PRICING_SERVICE_ID = `${SCHEMA_SITE_URL}/#pricing-service`;
const KNOWLEDGE_BASE_URL = `${SCHEMA_SITE_URL}/knowledge-base`;
const KNOWLEDGE_BASE_BREADCRUMB_ID = `${KNOWLEDGE_BASE_URL}#breadcrumb`;
const KNOWLEDGE_BASE_COLLECTION_ID = `${KNOWLEDGE_BASE_URL}#collection`;
const KNOWLEDGE_BASE_SECTIONS_ID = `${KNOWLEDGE_BASE_URL}#sections`;

const knowledgeBaseSections = [
  { slug: "bystryj-start", title: "Быстрый старт" },
  { slug: "balans-i-ref-programma", title: "Баланс и реф. программа" },
  { slug: "istochniki-i-optimizaciya", title: "Источники и оптимизация" },
  { slug: "prozvon-kontaktov", title: "Прозвон контактов" },
  { slug: "integracii", title: "Интеграции" },
  { slug: "problemy-i-resheniya", title: "Проблемы и решения" },
] as const;

type CostCatalogOffer = {
  name: string;
  price: string;
  minValue: number;
  maxValue?: number;
};

const costCatalogOffers: CostCatalogOffer[] = [
  { name: "100-299 идентификаций", price: "47", minValue: 100, maxValue: 299 },
  { name: "300-999 идентификаций", price: "42", minValue: 300, maxValue: 999 },
  { name: "1000-1999 идентификаций", price: "37", minValue: 1000, maxValue: 1999 },
  { name: "2000-3999 идентификаций", price: "32", minValue: 2000, maxValue: 3999 },
  { name: "4000-9999 идентификаций", price: "27", minValue: 4000, maxValue: 9999 },
  { name: "10000-29999 идентификаций", price: "22", minValue: 10000, maxValue: 29999 },
  { name: "30000-49999 идентификаций", price: "19", minValue: 30000, maxValue: 49999 },
  { name: "50000-99999 идентификаций", price: "18", minValue: 50000, maxValue: 99999 },
  { name: "100000+ идентификаций", price: "17", minValue: 100000 },
] as const;

function buildGraph(nodes: Record<string, unknown>[]): StructuredDataGraph {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

function buildFaqPage(id: string, items: SiteFaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildBreadcrumbList(id: string, items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function buildDefaultOrganization() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "AI-UP",
    alternateName: "Ai-UP",
    url: HOME_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
  };
}

function buildDefaultWebsite(extra?: Record<string, unknown>) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: HOME_URL,
    name: "AI-UP",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: "ru",
    ...(extra ?? {}),
  };
}

export function buildHomePageStructuredData(input?: PageStructuredDataInput) {
  const pageTitle = input?.title?.trim() || "AI-UP";
  const pageDescription =
    input?.description?.trim() ||
    "AI-UP - платформа для получения контактов аудитории, которая вчера искала ваши услуги.";

  return buildGraph([
    buildDefaultOrganization(),
    buildDefaultWebsite(),
    {
      "@type": "WebPage",
      "@id": `${SCHEMA_SITE_URL}/#webpage`,
      url: HOME_URL,
      name: pageTitle,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": ORGANIZATION_ID,
      },
      description: pageDescription,
      inLanguage: "ru",
    },
    {
      "@type": "SoftwareApplication",
      "@id": SOFTWARE_ID,
      name: "AI-UP",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: HOME_URL,
      description:
        "AI-UP - платформа для получения контактов аудитории, которая вчера искала ваши услуги.",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
    buildFaqPage(`${SCHEMA_SITE_URL}/#faq`, siteFaqItems),
  ]);
}

export function buildHowWorkPageStructuredData(input?: PageStructuredDataInput) {
  const pageUrl = `${SCHEMA_SITE_URL}/how-work`;
  const pageTitle = input?.title?.trim() || "Как это работает | AI-UP";
  const pageDescription =
    input?.description?.trim() ||
    "Как работает AI-UP: 5 типов источников, 4 канала сбора, AI Flow, лимиты, регионы и получение контактов каждое утро.";

  return buildGraph([
    buildDefaultOrganization(),
    buildDefaultWebsite(),
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": SERVICE_ID,
      },
      description: pageDescription,
      inLanguage: "ru",
    },
    {
      "@type": "Service",
      "@id": SERVICE_ID,
      name: "AI-UP",
      serviceType: "Сервис получения контактов заинтересованной аудитории",
      provider: {
        "@id": ORGANIZATION_ID,
      },
      areaServed: {
        "@type": "Country",
        name: "Россия",
      },
      availableChannel: [
        { "@type": "ServiceChannel", name: "Vault Core" },
        { "@type": "ServiceChannel", name: "Terra Link" },
        { "@type": "ServiceChannel", name: "Nova Net" },
        { "@type": "ServiceChannel", name: "Data Ray" },
      ],
      description:
        "AI-UP собирает контакты людей и компаний, которые вчера проявили интерес к вашей нише: посещали сайты, звонили, изучали услуги. В сервисе доступны 5 типов источников, 4 канала сбора, управление лимитами, регионы и автоматическая оптимизация AI Flow.",
      url: pageUrl,
    },
    buildFaqPage(`${pageUrl}#faq`, siteFaqItems),
  ]);
}

export function buildCallCenterPageStructuredData(input?: PageStructuredDataInput) {
  const pageUrl = `${SCHEMA_SITE_URL}/call-center`;
  const pageTitle = input?.title?.trim() || "Колл-центр AI-UP | AI-UP";
  const pageDescription =
    input?.description?.trim() ||
    "Встроенный колл-центр AI-UP: прозвон, квалификация контактов, модерация скрипта, статусы и передача заинтересованных лидов в работу.";

  return buildGraph([
    buildDefaultOrganization(),
    buildDefaultWebsite(),
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": CALL_CENTER_SERVICE_ID,
      },
      description: pageDescription,
      inLanguage: "ru",
    },
    {
      "@type": "Service",
      "@id": CALL_CENTER_SERVICE_ID,
      name: "Колл-центр AI-UP",
      serviceType: "Услуги колл-центра и квалификации лидов",
      provider: {
        "@id": ORGANIZATION_ID,
      },
      areaServed: {
        "@type": "Country",
        name: "Россия",
      },
      description:
        "Колл-центр AI-UP прозванивает контакты, квалифицирует лиды, работает по скрипту клиента, ставит статусы и передаёт в работу только заинтересованные контакты.",
      url: pageUrl,
      offers: {
        "@type": "Offer",
        price: "45",
        priceCurrency: "RUB",
        description: "Стоимость обработки одного контакта колл-центром AI-UP.",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    buildFaqPage(`${pageUrl}#faq`, siteFaqItems),
  ]);
}

export function buildCostPageStructuredData(input?: PageStructuredDataInput) {
  const pageUrl = `${SCHEMA_SITE_URL}/cost`;
  const pageTitle = input?.title?.trim() || "Стоимость AI-UP | AI-UP";
  const pageDescription =
    input?.description?.trim() ||
    "Стоимость AI-UP: от 17 до 47 ₽ за идентификацию в зависимости от объёма. Без подписки и абонентской платы.";

  return buildGraph([
    buildDefaultOrganization(),
    buildDefaultWebsite(),
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": PRICING_SERVICE_ID,
      },
      description: pageDescription,
      inLanguage: "ru",
    },
    {
      "@type": "Service",
      "@id": PRICING_SERVICE_ID,
      name: "Стоимость идентификаций AI-UP",
      serviceType: "Идентификация контактов и лидогенерация",
      provider: {
        "@id": ORGANIZATION_ID,
      },
      areaServed: {
        "@type": "Country",
        name: "Россия",
      },
      url: pageUrl,
      description:
        "AI-UP позволяет получать контакты людей, которые вчера проявили интерес к вашей нише. Стоимость зависит от объёма разовой покупки и составляет от 17 до 47 ₽ за контакт.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "RUB",
        lowPrice: "17",
        highPrice: "47",
        offerCount: "9",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${pageUrl}#catalog`,
      name: "Тарифы AI-UP по объёму идентификаций",
      url: pageUrl,
      itemListElement: costCatalogOffers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        price: offer.price,
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: offer.minValue,
          ...(offer.maxValue ? { maxValue: offer.maxValue } : {}),
          unitText: "идентификаций",
        },
      })),
    },
    buildFaqPage(`${pageUrl}#faq`, siteFaqItems),
  ]);
}

export function buildKnowledgeBaseStructuredData(input?: PageStructuredDataInput) {
  const pageTitle = input?.title?.trim() || "База знаний AI-UP";
  const pageDescription =
    input?.description?.trim() ||
    "База знаний AI-UP с инструкциями, статьями и ответами по работе с продуктом: от регистрации до интеграций.";

  return buildGraph([
    buildDefaultOrganization(),
    buildDefaultWebsite({
      potentialAction: {
        "@type": "SearchAction",
        target: `${KNOWLEDGE_BASE_URL}?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    }),
    {
      "@type": "WebPage",
      "@id": `${KNOWLEDGE_BASE_URL}#webpage`,
      url: KNOWLEDGE_BASE_URL,
      name: pageTitle,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": ORGANIZATION_ID,
      },
      description: pageDescription,
      inLanguage: "ru",
      breadcrumb: {
        "@id": KNOWLEDGE_BASE_BREADCRUMB_ID,
      },
    },
    buildBreadcrumbList(KNOWLEDGE_BASE_BREADCRUMB_ID, [
      { name: "Главная", item: HOME_URL },
      { name: "База знаний", item: KNOWLEDGE_BASE_URL },
    ]),
    {
      "@type": "CollectionPage",
      "@id": KNOWLEDGE_BASE_COLLECTION_ID,
      url: KNOWLEDGE_BASE_URL,
      name: "База знаний AI-UP",
      description:
        "Раздел базы знаний AI-UP с инструкциями по запуску, балансу, источникам, прозвону, интеграциям и решению проблем.",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": ORGANIZATION_ID,
      },
      inLanguage: "ru",
      mainEntity: {
        "@id": KNOWLEDGE_BASE_SECTIONS_ID,
      },
    },
    {
      "@type": "ItemList",
      "@id": KNOWLEDGE_BASE_SECTIONS_ID,
      name: "Разделы базы знаний AI-UP",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: knowledgeBaseSections.length,
      itemListElement: knowledgeBaseSections.map((section, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${KNOWLEDGE_BASE_URL}/${section.slug}`,
        name: section.title,
      })),
    },
  ]);
}

export function buildAboutPageStructuredData(input?: PageStructuredDataInput) {
  const pageUrl = `${SCHEMA_SITE_URL}/about`;
  const pageTitle = input?.title?.trim() || "О компании AI-UP";
  const pageDescription =
    input?.description?.trim() ||
    "AI-UP — команда инженеров и разработчиков, создавшая технологию получения клиентов из реального спроса без рекламы.";

  return buildGraph([
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "AI-UP",
      alternateName: "Ai-UP",
      url: HOME_URL,
      description:
        "AI-UP — платформа для получения контактов клиентов с уже проявленным спросом без использования рекламных кабинетов и ставок.",
      foundingLocation: {
        "@type": "Country",
        name: "Россия",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "ru",
      about: {
        "@id": ORGANIZATION_ID,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
    },
    buildBreadcrumbList(`${pageUrl}#breadcrumb`, [
      { name: "Главная", item: HOME_URL },
      { name: "О компании", item: pageUrl },
    ]),
    {
      "@type": "Service",
      "@id": SERVICE_ID,
      name: "Получение контактов клиентов с реальным спросом",
      provider: {
        "@id": ORGANIZATION_ID,
      },
      description:
        "Сервис AI-UP помогает бизнесу получать контакты людей, которые уже проявили интерес, используя технологии анализа действий пользователей.",
      areaServed: {
        "@type": "Country",
        name: "Россия",
      },
      serviceType: "Лидогенерация без рекламы",
    },
    buildFaqPage(`${pageUrl}#faq`, aboutFaqItems),
  ]);
}
