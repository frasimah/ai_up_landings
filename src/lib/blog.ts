import { mapAuthorSummary, pickMediaUrl, strapiFetch, unwrapStrapiItem, type AuthorSummary } from "@/lib/strapi";
import { mapSeo, type SeoData } from "@/lib/seo";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string | null;
  views: number;
  author: AuthorSummary | null;
  seo?: SeoData | null;
};

const cyrillicToLatinMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

type StrapiListResponse = {
  data?: unknown;
};
type StrapiOneResponse = {
  data?: unknown;
};

type StrapiPostModel = {
  slug?: string;
  title?: string;
  excerpt?: string;
  description?: string;
  contentHtml?: string;
  content?: string;
  publishedAt?: string;
  updatedAt?: string;
  views?: number;
  coverImage?: unknown;
  author?: unknown;
  tags?: unknown;
  seo?: unknown;
};

const fallbackPosts: BlogPost[] = [
  {
    slug: "ai-up-v-elama",
    title: "Важная новость: Ai-UP теперь в eLama",
    excerpt: "Партнерство с eLama и новые возможности для рекламодателей.",
    contentHtml:
      "<p>Ai-UP стал официальным партнером eLama. Для клиентов это означает более короткий путь от запуска рекламной активности до первого контакта с потенциальным покупателем.</p>" +
      "<p>Мы объединили инфраструктуру eLama с подходом Ai-UP к контролю качества лидов и прозрачной аналитике по источникам.</p>" +
      "<h3>Что это дает рекламодателям</h3>" +
      "<ul><li>Быстрый старт кампаний без сложной ручной сборки процессов.</li><li>Единый контур учета лидов, звонков и статусов обработки.</li><li>Понятная картина по CPL, CR и фактической окупаемости.</li></ul>" +
      "<h3>Что изменится в ближайших релизах</h3>" +
      "<ol><li>Расширенные шаблоны запуска под разные ниши.</li><li>Глубже связка с CRM для сквозной воронки.</li><li>Автоматические рекомендации по перераспределению бюджета.</li></ol>" +
      "<blockquote>Наша цель проста: меньше шумного трафика, больше подтвержденных контактов, которые доходят до продажи.</blockquote>" +
      "<p>Если вы уже работаете с eLama, подключение проходит в стандартном рабочем контуре без изменения текущей логики закупки.</p>",
    coverImage: "https://strapi.ai-up.ru/uploads/Blog_5_svyazok_f850a580e8.jpg",
    tags: ["Новости и обновления Ai-UP"],
    publishedAt: "2025-10-13",
    updatedAt: "2025-10-13",
    views: 123,
    author: null,
  },
  {
    slug: "marketing-budgets-burn",
    title: "Почему 90 % маркетинговых бюджетов сгорают к концу года",
    excerpt: "Разбираем типовые причины потери эффективности и что с этим делать.",
    contentHtml:
      "<p>Потери бюджета чаще всего связаны с отсутствием прозрачной аналитики и слабой приоритизацией каналов.</p>",
    coverImage: "https://strapi.ai-up.ru/uploads/Blog_5_svyazok_f850a580e8.jpg",
    tags: ["Лидогенерация и реклама"],
    publishedAt: "2025-11-12",
    updatedAt: "2025-11-12",
    views: 87,
    author: null,
  },
  {
    slug: "crm-automation-for-leads",
    title: "Как автоматизация CRM ускоряет обработку лидов",
    excerpt: "Практический подход к маршрутизации и качеству обработки входящих.",
    contentHtml:
      "<p>Автоматизация CRM сокращает время реакции и снижает потери на ручных этапах.</p>",
    coverImage: "https://strapi.ai-up.ru/uploads/4_Kak_privlech_klientov_B2_B_51526d7f7f.png",
    tags: ["Автоматизация маркетинга"],
    publishedAt: "2025-12-01",
    updatedAt: "2025-12-01",
    views: 59,
    author: null,
  },
  {
    slug: "kak-snizit-poteryu-lidov-na-pervom-zvonke",
    title: "Как снизить потерю лидов на первом звонке",
    excerpt: "Разбираем, что мешает менеджерам дозваниваться и как сократить потери на первом касании.",
    contentHtml:
      "<p>Первый звонок часто определяет, попадет ли лид в воронку продаж. Если контакт не дозвонился, не получил понятного ответа или менеджер не зафиксировал следующий шаг, часть бюджета сгорает безвозвратно.</p>" +
      "<p>Чтобы этого избежать, важно настроить быстрый SLA, автоматические напоминания и контроль статусов в CRM.</p>",
    coverImage: "/img/blog/article-1.png",
    tags: ["Лидогенерация и реклама"],
    publishedAt: "2025-12-08",
    updatedAt: "2025-12-08",
    views: 74,
    author: null,
  },
  {
    slug: "sravnenie-kachestva-lidov-iz-raznyh-kanalov",
    title: "Сравнение качества лидов из разных каналов",
    excerpt: "Как оценивать не только цену заявки, но и вероятность реальной продажи по каждому источнику.",
    contentHtml:
      "<p>Сравнивать каналы только по CPL недостаточно. Один источник может давать дешевые заявки, но слабую конверсию в квалификацию и продажу.</p>" +
      "<p>Поэтому полезно считать глубину прохождения лида по этапам и смотреть стоимость подтвержденного контакта.</p>",
    coverImage: "/img/blog/article-2.png",
    tags: ["Сравнения"],
    publishedAt: "2025-12-15",
    updatedAt: "2025-12-15",
    views: 93,
    author: null,
  },
  {
    slug: "gaid-po-otchetu-dlya-rukovoditelya-otdela-prodazh",
    title: "Гайд по отчёту для руководителя отдела продаж",
    excerpt: "Какие метрики действительно нужны руководителю, чтобы быстро видеть узкие места в обработке лидов.",
    contentHtml:
      "<p>В отчете руководителя важны скорость реакции, процент дозвона, квалификация, встречи и продажи. Избыточные таблицы мешают фокусироваться на реальных проблемах.</p>" +
      "<p>Лучше собрать короткий набор метрик и смотреть динамику по неделям и источникам.</p>",
    coverImage: "/img/blog/article-3.png",
    tags: ["Гайды"],
    publishedAt: "2025-12-22",
    updatedAt: "2025-12-22",
    views: 66,
    author: null,
  },
  {
    slug: "slovar-cpl-cac-ltv-prostymi-slovami",
    title: "Словарь: CPL, CAC и LTV простыми словами",
    excerpt: "Коротко и без перегруза объясняем базовые термины маркетинга и продаж.",
    contentHtml:
      "<p>CPL показывает цену лида, CAC — цену привлечения клиента, а LTV — общую ценность клиента за все время работы с компанией.</p>" +
      "<p>Если команда одинаково понимает эти термины, ей проще принимать решения по бюджету и воронке.</p>",
    coverImage: "/img/blog/article-1.png",
    tags: ["Словарь"],
    publishedAt: "2026-01-05",
    updatedAt: "2026-01-05",
    views: 48,
    author: null,
  },
  {
    slug: "obnovlenie-dashborda-istochnikov-v-ai-up",
    title: "Обновление дашборда источников в Ai-UP",
    excerpt: "Добавили более прозрачную детализацию по каналам, статусам и качеству обращений.",
    contentHtml:
      "<p>В новой версии дашборда стало проще видеть, какие каналы приводят заявки, которые реально доходят до продажи.</p>" +
      "<p>Теперь менеджеры и маркетологи работают с одной картиной данных и быстрее замечают просадки.</p>",
    coverImage: "/img/blog/article-2.png",
    tags: ["Новости и обновления Ai-UP"],
    publishedAt: "2026-01-12",
    updatedAt: "2026-01-12",
    views: 131,
    author: null,
  },
  {
    slug: "kak-podgotovit-crm-k-potokovomu-trafiku",
    title: "Как подготовить CRM к потоковому трафику",
    excerpt: "Чеклист для команд, которые планируют резко увеличить объём входящих обращений.",
    contentHtml:
      "<p>Перед запуском масштабной рекламы нужно проверить распределение заявок, маршрутизацию, уведомления и правила дублей.</p>" +
      "<p>Иначе рост трафика приведет не к росту продаж, а к хаосу в отделе обработки.</p>",
    coverImage: "/img/blog/article-3.png",
    tags: ["Автоматизация маркетинга"],
    publishedAt: "2026-01-19",
    updatedAt: "2026-01-19",
    views: 71,
    author: null,
  },
  {
    slug: "kejs-kak-umenshit-stoimost-lida-v-b2b",
    title: "Кейс: как уменьшить стоимость лида в B2B",
    excerpt: "Показываем на примере, как перераспределение бюджета и фильтрация нецелевых обращений влияет на CPL.",
    contentHtml:
      "<p>В B2B сегменте снижение CPL редко достигается только за счет креативов. Гораздо сильнее работает чистка семантики, маршрутизация и контроль качества заявок.</p>" +
      "<p>На кейсе видно, как меняется экономика после пересборки воронки.</p>",
    coverImage: "/img/blog/article-1.png",
    tags: ["Кейсы"],
    publishedAt: "2026-01-26",
    updatedAt: "2026-01-26",
    views: 109,
    author: null,
  },
  {
    slug: "sravnenie-vhodyashih-zvonkov-i-form-zayavok",
    title: "Сравнение входящих звонков и форм заявок",
    excerpt: "Когда бизнесу выгоднее звонки, а когда формы дают более качественный поток лидов.",
    contentHtml:
      "<p>Звонки ускоряют контакт, но требуют свободной линии и сильной первой обработки. Формы проще масштабировать, но они часто увеличивают долю некачественных обращений.</p>" +
      "<p>Выбор зависит от скорости реакции команды и сложности продукта.</p>",
    coverImage: "/img/blog/article-2.png",
    tags: ["Сравнения"],
    publishedAt: "2026-02-02",
    updatedAt: "2026-02-02",
    views: 84,
    author: null,
  },
  {
    slug: "gaid-po-segmentacii-lidov-dlya-prodazh",
    title: "Гайд по сегментации лидов для продаж",
    excerpt: "Как отделить приоритетные обращения от второстепенных и быстрее доводить ценные лиды до сделки.",
    contentHtml:
      "<p>Сегментация нужна, чтобы команда не тратила одинаковое количество времени на все входящие заявки подряд.</p>" +
      "<p>Простые правила приоритета по источнику, интересу и региону помогают ускорить конверсию в продажу.</p>",
    coverImage: "/img/blog/article-3.png",
    tags: ["Гайды"],
    publishedAt: "2026-02-09",
    updatedAt: "2026-02-09",
    views: 57,
    author: null,
  },
  {
    slug: "slovar-chto-takoe-sql-i-mql",
    title: "Словарь: что такое SQL и MQL",
    excerpt: "Объясняем разницу между маркетинговым и квалифицированным лидом без сложных терминов.",
    contentHtml:
      "<p>MQL — это лид, который проявил интерес и соответствует базовым признакам. SQL — лид, которого отдел продаж уже считает подходящим для активной работы.</p>" +
      "<p>Понимание этой разницы важно для общей логики воронки и отчетности.</p>",
    coverImage: "/img/blog/article-1.png",
    tags: ["Словарь"],
    publishedAt: "2026-02-16",
    updatedAt: "2026-02-16",
    views: 46,
    author: null,
  },
  {
    slug: "obnovlenie-otchetov-po-statusam-zayavok",
    title: "Обновление отчётов по статусам заявок",
    excerpt: "Расширили детализацию статусов, чтобы было проще находить потери между маркетингом и отделом продаж.",
    contentHtml:
      "<p>Теперь отчеты показывают, где именно зависает лид: на попытке звонка, на квалификации, на повторном касании или уже после передачи менеджеру.</p>" +
      "<p>Это помогает быстрее устранять реальные узкие места, а не гадать по общим цифрам.</p>",
    coverImage: "/img/blog/article-2.png",
    tags: ["Новости и обновления Ai-UP"],
    publishedAt: "2026-02-23",
    updatedAt: "2026-02-23",
    views: 118,
    author: null,
  },
  {
    slug: "kak-proverit-gotovnost-otdela-k-masshtabirovaniyu",
    title: "Как проверить готовность отдела к масштабированию",
    excerpt: "Набор практических вопросов перед увеличением бюджета на лидогенерацию.",
    contentHtml:
      "<p>Перед масштабированием важно проверить, кто принимает заявки, как быстро идёт обратная связь и нет ли ручных узких мест в CRM.</p>" +
      "<p>Если этого не сделать, рост бюджета лишь усилит уже существующие проблемы.</p>",
    coverImage: "/img/blog/article-3.png",
    tags: ["Продажи"],
    publishedAt: "2026-03-02",
    updatedAt: "2026-03-02",
    views: 89,
    author: null,
  },
];

function appendDevFallbackPosts(posts: BlogPost[]) {
  if (process.env.NODE_ENV === "production" || posts.length >= 12) {
    return posts;
  }

  const existingSlugs = new Set(posts.map((post) => post.slug));
  const extraPosts = fallbackPosts.filter((post) => !existingSlugs.has(post.slug));

  return [...posts, ...extraPosts];
}

function toIsoDate(value: string | undefined) {
  if (!value) return "2025-01-01";
  return value;
}

function readList(data: unknown): unknown[] {
  if (!Array.isArray(data)) return [];
  return data;
}

function readTagNames(tags: unknown): string[] {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags
      .map((tag) => {
        if (typeof tag === "string") return tag;
        const unwrapped = unwrapStrapiItem<Record<string, unknown>>(tag);
        if (!unwrapped) return null;
        if (typeof unwrapped.name === "string") return unwrapped.name;
        if (typeof unwrapped.title === "string") return unwrapped.title;
        if (typeof unwrapped.slug === "string") return unwrapped.slug;
        return null;
      })
      .filter((tag): tag is string => Boolean(tag));
  }

  if (typeof tags === "string") return [tags];

  const tagsRecord = tags as Record<string, unknown>;
  if (!Array.isArray(tagsRecord.data)) return [];
  return readTagNames(tagsRecord.data);
}

function mapPost(item: unknown): BlogPost | null {
  const source = unwrapStrapiItem<StrapiPostModel>(item);
  if (!source?.slug || !source?.title) return null;

  return {
    slug: source.slug,
    title: source.title,
    excerpt: source.excerpt ?? source.description ?? "",
    contentHtml: source.contentHtml ?? source.content ?? "",
    coverImage:
      pickMediaUrl(source.coverImage, [
        "large_webp",
        "large",
        "medium_webp",
        "medium",
        "small_webp",
        "small",
        "thumbnail_webp",
        "thumbnail",
        "webp",
      ]) ?? "/img/blog/article-1.png",
    tags: readTagNames(source.tags),
    publishedAt: toIsoDate(source.publishedAt),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : null,
    views: Number.isFinite(source.views) ? Number(source.views) : 0,
    author: mapAuthorSummary(source.author),
    seo: mapSeo(source.seo),
  };
}

async function fetchBlogPostsFromStrapi(): Promise<BlogPost[] | null> {
  try {
    const response = await strapiFetch<StrapiListResponse>(
      "/api/public/blog-posts",
      undefined,
      { noStore: true, tags: ["blog:list", "blog:tags"] },
    );

    if (!response?.data) return null;

    const posts = readList(response.data).map(mapPost).filter((item): item is BlogPost => item !== null);
    return posts.length ? posts : null;
  } catch {
    return null;
  }
}

export function tagToSlug(tag: string) {
  if (tag === "all") return "all";

  const transliterated = tag
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatinMap[char] ?? char)
    .join("");

  const normalized = transliterated
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, " ")
    .replace(/[-\s]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  return normalized || "tag";
}

export function resolveTagFromSlug(slug: string, tags: string[]) {
  if (!slug || slug === "all") return "all";

  const bySlug = tags.find((tag) => tag !== "all" && tagToSlug(tag) === slug);
  if (bySlug) return bySlug;

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }
  const byRawValue = tags.find((tag) => tag.toLowerCase() === decoded.toLowerCase());
  return byRawValue ?? null;
}

export async function getBlogPosts(tag?: string) {
  const posts = appendDevFallbackPosts((await fetchBlogPostsFromStrapi()) ?? fallbackPosts);
  if (!tag || tag === "all") return posts;

  const normalizedTag = tag.toLowerCase();
  const normalizedTagSlug = tagToSlug(tag);
  return posts.filter((post) => {
    return post.tags.some((item) => {
      const normalizedItem = item.toLowerCase();
      if (normalizedItem === normalizedTag) return true;
      return tagToSlug(item) === normalizedTag || tagToSlug(item) === normalizedTagSlug;
    });
  });
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const response = await strapiFetch<StrapiOneResponse>(
      `/api/public/blog-posts/${encodeURIComponent(slug)}`,
      undefined,
      { noStore: true, tags: [`blog:slug:${slug}`] },
    );

    if (!response?.data) return fallbackPosts.find((post) => post.slug === slug) ?? null;
    return mapPost(response.data);
  } catch {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getBlogTags() {
  const posts = await getBlogPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) tags.add(tag);
  }
  return ["all", ...Array.from(tags)];
}
