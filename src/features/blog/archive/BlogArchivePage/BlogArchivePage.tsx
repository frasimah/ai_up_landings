'use client';

import { useEffect, useMemo, useRef, useState } from "react";

import {
  getBlogArchiveSeoCopy,
  type BlogArchiveCategory,
  type BlogArchivePost,
} from "@/lib/blogArchive";

import BlogArchiveCard from "../BlogArchiveCard/BlogArchiveCard";
import styles from "./BlogArchivePage.module.scss";

const POSTS_PER_PAGE = 9;
const LOAD_MORE_DELAY_MS = 260;
const SEARCH_STEM_ENDINGS = [
  "иями",
  "ями",
  "ами",
  "ией",
  "иях",
  "иях",
  "ого",
  "ему",
  "ому",
  "ее",
  "ие",
  "ые",
  "ое",
  "ей",
  "ий",
  "ый",
  "ой",
  "ем",
  "им",
  "ым",
  "ом",
  "их",
  "ых",
  "ую",
  "юю",
  "ая",
  "яя",
  "ам",
  "ям",
  "ах",
  "ях",
  "ов",
  "ев",
  "ом",
  "ем",
  "ы",
  "и",
  "а",
  "я",
  "е",
  "у",
  "ю",
  "о",
] as const;

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-z0-9а-я\s-]/gi, " ")
    .replace(/[\s_-]+/g, " ")
    .trim();
}

function tokenizeSearchText(value: string) {
  const normalizedValue = normalizeSearchText(value);

  if (!normalizedValue) {
    return [];
  }

  return normalizedValue.split(" ").filter(Boolean);
}

function getSearchStem(token: string) {
  if (token.length <= 3) {
    return token;
  }

  const matchedEnding = SEARCH_STEM_ENDINGS.find(
    (ending) => token.length - ending.length >= 3 && token.endsWith(ending),
  );

  if (!matchedEnding) {
    return token;
  }

  return token.slice(0, -matchedEnding.length);
}

function matchesSearchQuery(post: BlogArchivePost, query: string) {
  const queryTokens = tokenizeSearchText(query);

  if (!queryTokens.length) {
    return true;
  }

  const searchableText = [
    post.title,
    post.excerpt,
    post.category?.name ?? "",
    post.tags.join(" "),
  ].join(" ");
  const normalizedSearchableText = normalizeSearchText(searchableText);
  const searchableTokenStems = tokenizeSearchText(searchableText).map(getSearchStem);

  return queryTokens.every((queryToken) => {
    if (normalizedSearchableText.includes(queryToken)) {
      return true;
    }

    const queryStem = getSearchStem(queryToken);

    return searchableTokenStems.some((searchableTokenStem) => {
      if (searchableTokenStem === queryStem) {
        return true;
      }

      if (queryStem.length < 3 || searchableTokenStem.length < 3) {
        return false;
      }

      return (
        searchableTokenStem.startsWith(queryStem) ||
        queryStem.startsWith(searchableTokenStem)
      );
    });
  });
}

type BlogArchivePageProps = {
  allDescription: string;
  allTitle: string;
  categories: BlogArchiveCategory[];
  initialDescription: string;
  initialCategorySlug?: string;
  initialTitle: string;
  posts: BlogArchivePost[];
};

function getArchiveCategoryHref(slug: string) {
  return slug === "all" ? "/blog" : `/blog/tag/${slug}`;
}

function getCategorySlugFromPathname(
  pathname: string,
  categories: BlogArchiveCategory[],
) {
  if (pathname === "/blog") {
    return "all";
  }

  const matched = pathname.match(/^\/blog\/tag\/([^/]+)$/);

  if (!matched) {
    return null;
  }

  const [, slug] = matched;
  return categories.some((category) => category.slug === slug) ? slug : null;
}

function resolveActiveCategorySlug(
  categories: BlogArchiveCategory[],
  fallbackSlug: string,
) {
  if (typeof window === "undefined") {
    return fallbackSlug;
  }

  const slugFromPathname = getCategorySlugFromPathname(window.location.pathname, categories);

  if (slugFromPathname) {
    return slugFromPathname;
  }

  return window.location.pathname === "/blog" ? "all" : fallbackSlug;
}

export default function BlogArchivePage({
  allDescription,
  allTitle,
  categories,
  initialDescription,
  initialCategorySlug = "all",
  initialTitle,
  posts,
}: BlogArchivePageProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState(() =>
    resolveActiveCategorySlug(categories, initialCategorySlug),
  );
  const [searchValue, setSearchValue] = useState("");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTimerRef = useRef<number | null>(null);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    const nextSlug = getCategorySlugFromPathname(window.location.pathname, categories);

    if (nextSlug) {
      setActiveCategorySlug(nextSlug);
      setVisibleCount(POSTS_PER_PAGE);
      return;
    }

    if (window.location.pathname === "/blog") {
      setActiveCategorySlug("all");
      setVisibleCount(POSTS_PER_PAGE);
      return;
    }

    setActiveCategorySlug(initialCategorySlug);
    setVisibleCount(POSTS_PER_PAGE);
  }, [categories, initialCategorySlug]);

  useEffect(() => {
    const handlePopState = () => {
      const nextSlug = getCategorySlugFromPathname(window.location.pathname, categories);

      if (!nextSlug) {
        window.location.assign(window.location.href);
        return;
      }

      setActiveCategorySlug(nextSlug);
      setVisibleCount(POSTS_PER_PAGE);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [categories]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const metaDescriptionTag = document.querySelector('meta[name="description"]');

    if (activeCategorySlug === "all") {
      document.title = allTitle;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute("content", allDescription);
      }
      return;
    }

    if (activeCategorySlug === initialCategorySlug) {
      document.title = initialTitle;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute("content", initialDescription);
      }
      return;
    }

    const activeCategoryCopy = getBlogArchiveSeoCopy(activeCategorySlug);

    if (activeCategoryCopy) {
      document.title = activeCategoryCopy.title;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute("content", activeCategoryCopy.description);
      }
    }
  }, [activeCategorySlug, allDescription, allTitle, initialCategorySlug, initialDescription, initialTitle]);

  useEffect(() => {
    return () => {
      if (loadMoreTimerRef.current) {
        window.clearTimeout(loadMoreTimerRef.current);
      }
    };
  }, []);

  const activeArchiveCopy = useMemo(() => {
    if (activeCategorySlug === "all") {
      return {
        h1: "Блог",
        description: allDescription,
      };
    }

    if (activeCategorySlug === initialCategorySlug) {
      return {
        h1: getBlogArchiveSeoCopy(activeCategorySlug).h1,
        description: initialDescription,
      };
    }

    return getBlogArchiveSeoCopy(activeCategorySlug);
  }, [activeCategorySlug, allDescription, initialCategorySlug, initialDescription]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategorySlug === "all" || post.category?.slug === activeCategorySlug;
      const matchesSearch = matchesSearchQuery(post, searchValue);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategorySlug, posts, searchValue]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;

  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  useEffect(() => {
    setVisibleCount((current) => Math.min(Math.max(POSTS_PER_PAGE, current), filteredPosts.length || POSTS_PER_PAGE));
  }, [filteredPosts.length]);

  useEffect(() => {
    const sentinelNode = loadMoreSentinelRef.current;

    if (!sentinelNode || !hasMorePosts) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || isLoadingMoreRef.current) {
          return;
        }

        setIsLoadingMore(true);

        loadMoreTimerRef.current = window.setTimeout(() => {
          setVisibleCount((current) => Math.min(current + POSTS_PER_PAGE, filteredPosts.length));
          setIsLoadingMore(false);
          loadMoreTimerRef.current = null;
        }, LOAD_MORE_DELAY_MS);
      },
      {
        rootMargin: "0px 0px 220px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(sentinelNode);

    return () => {
      observer.disconnect();

      if (loadMoreTimerRef.current) {
        window.clearTimeout(loadMoreTimerRef.current);
        loadMoreTimerRef.current = null;
      }
    };
  }, [filteredPosts.length, hasMorePosts]);

  const handleCategoryChange = (slug: string) => {
    if (slug === activeCategorySlug) {
      return;
    }

    setActiveCategorySlug(slug);
    setVisibleCount(POSTS_PER_PAGE);

    if (typeof window !== "undefined") {
      window.history.pushState(window.history.state, "", getArchiveCategoryHref(slug));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setVisibleCount(POSTS_PER_PAGE);
  };

  return (
    <section className={styles.archive} aria-labelledby="blog-archive-title">
      <div className={styles.header}>
        <h1 id="blog-archive-title" className={styles.title}>
          {activeArchiveCopy.h1}
        </h1>
        <p className={styles.description}>
          {activeArchiveCopy.description}
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.tags}>
          <button
            type="button"
            className={activeCategorySlug === "all" ? `${styles.filterTag} ${styles.filterTagActive}` : styles.filterTag}
            onClick={() => handleCategoryChange("all")}
            aria-pressed={activeCategorySlug === "all"}
          >
            Все
          </button>

          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={
                activeCategorySlug === category.slug
                  ? `${styles.filterTag} ${styles.filterTagActive}`
                  : styles.filterTag
              }
              onClick={() => handleCategoryChange(category.slug)}
              aria-pressed={activeCategorySlug === category.slug}
            >
              {category.name}
            </button>
          ))}
        </div>

        <label className={styles.searchLabel}>
          <span className={styles.visuallyHidden}>Поиск по заголовкам блога</span>
          <input
            type="search"
            className={styles.search}
            placeholder="Поиск..."
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </label>
      </div>

      {visiblePosts.length ? (
        <div className={styles.grid}>
          {visiblePosts.map((post) => (
            <BlogArchiveCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>По вашему запросу статьи не найдены.</div>
      )}

      {filteredPosts.length > POSTS_PER_PAGE ? (
        <div className={styles.loadMoreWrap}>
          {hasMorePosts ? (
            <p className={styles.loadMoreText}>
              {isLoadingMore ? "Загружаем ещё статьи..." : "Прокрутите вниз, чтобы загрузить ещё"}
            </p>
          ) : (
            <p className={styles.loadMoreText}>Все статьи загружены</p>
          )}
          <div ref={loadMoreSentinelRef} className={styles.loadMoreSentinel} aria-hidden="true" />
        </div>
      ) : null}
    </section>
  );
}
