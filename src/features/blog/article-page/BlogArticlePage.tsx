/* eslint-disable @next/next/no-img-element */

import Button from "@/components/Buttons/Button";
import PageReadingProgress from "@/components/PageReadingProgress/PageReadingProgress";
import { APP_ROUTES } from "@/lib/routes";
import Link from "next/link";

import ArticleContentHtml from "@/components/ArticleContentHtml/ArticleContentHtml";
import type { BlogArchivePost } from "@/lib/blogArchive";
import { formatDateRu } from "@/lib/date";

import BlogArchiveCard from "../archive/BlogArchiveCard/BlogArchiveCard";
import styles from "./BlogArticlePage.module.scss";
import Image from "next/image";

type BlogArticlePageProps = {
  authorArticles: BlogArchivePost[];
  popular: BlogArchivePost[];
  post: BlogArchivePost;
  related: BlogArchivePost[];
};

function formatDate(value: string | null | undefined) {
  return formatDateRu(value);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getSidebarPostMeta(post: BlogArchivePost) {
  const parts = [post.category?.name, post.readTime ? `${post.readTime} мин` : null].filter(
    (item): item is string => Boolean(item),
  );

  return parts.join(" · ");
}

const sidebarBonusProgress = 72;

export default function BlogArticlePage({
  authorArticles,
  popular,
  post,
  related,
}: BlogArticlePageProps) {
  const authorName = post.author?.name?.trim() || "Команда Ai-UP";
  const authorRole = post.author?.jobTitle?.trim() || "Эксперт Ai-UP";
  const authorAvatar = post.author?.avatar;
  const category = post.category;
  const contentId = "blog-article-content";

  return (
    <>
      <PageReadingProgress targetId={contentId} />

      <div className={styles.page}>
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/blog" className={styles.breadcrumbLink}>
            Блог
          </Link>
          {category ? (
            <>
              <span className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </span>
              <Link href={`/blog/tag/${category.slug}`} className={styles.breadcrumbLink}>
                {category.name}
              </Link>
            </>
          ) : null}
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent}>{post.title}</span>
        </nav>

        <div className={styles.layout}>
          <div className={styles.content}>
            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.author}>
              <div className={styles.authorAvatar} aria-hidden="true">
                {authorAvatar ? <Image
                  src={authorAvatar}
                  alt={authorName}
                  width={28}
                  height={28}
                  quality={70}
                  sizes="28px"
                /> : <span>{getInitials(authorName)}</span>}
              </div>

              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{authorName}</div>
                <div className={styles.authorRole}>{authorRole}</div>
              </div>

              <div className={styles.authorRight}>
                <div className={styles.authorDate}>
                  {formatDate(post.publishedAt)}
                  <span className={styles.authorTime}> · {post.readTime} мин</span>
                </div>
                <div className={styles.authorViews}>
                  <svg className={styles.authorEye} viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M8 3C4.5 3 1.7 5.3 1 8c.7 2.7 3.5 5 7 5s6.3-2.3 7-5c-.7-2.7-3.5-5-7-5z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                  <span>{post.views}</span>
                </div>
              </div>
            </div>

            <div id={contentId} className={`article-content-shell article-content-shell--blog ${styles.contentShell}`}>
              <ArticleContentHtml html={post.contentHtml} fallback={<p>{post.excerpt}</p>} />
            </div>

            {related.length ? (
              <section className={styles.related} aria-labelledby="blog-related-title">
                <h2 id="blog-related-title" className={styles.relatedTitle}>
                  Читайте также
                </h2>
                <div className={styles.relatedGrid}>
                  {related.map((item) => (
                    <BlogArchiveCard key={item.slug} post={item} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.sidebarCta}>
                <div className={styles.sidebarCtaTitle}>Бонус к первому пополнению</div>
                <div className={styles.sidebarCtaSubtitle}>+50 идентификаций бесплатно</div>
                <div
                  className={styles.sidebarCtaProgress}
                  role="progressbar"
                  aria-label="Бонус активен"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={sidebarBonusProgress}
                >
                  <span className={styles.sidebarCtaProgressValue} />
                </div>
                <div className={styles.sidebarCtaStatus}>Акция активна</div>
                <Button
                  href={APP_ROUTES.signUp}
                  variant="black"
                  className={styles.sidebarCtaButton}
                >
                  Забрать бонус →
                </Button>
              </div>

              {authorArticles.length ? (
                <div className={styles.sidebarBlock}>
                  <div className={styles.sidebarHeading}>От этого автора</div>
                  <div className={styles.sidebarAuthorRow}>
                    <div className={styles.sidebarAuthorAvatar} aria-hidden="true">
                      {authorAvatar ? <Image
                        src={authorAvatar}
                        alt={authorName}
                        width={24}
                        height={24}
                        quality={70}
                        sizes="24px"
                      /> : <span>{getInitials(authorName)}</span>}
                    </div>
                    <span>{authorName}</span>
                  </div>
                  {authorArticles.map((item) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              ) : null}

              {popular.length ? (
                <div className={`${styles.sidebarBlock} ${styles.sidebarPopularBlock}`}>
                  <div className={styles.sidebarHeading}>Популярное</div>
                  {popular.map((item) => {
                    const metaLabel = getSidebarPostMeta(item);

                    return (
                      <Link key={item.slug} href={`/blog/${item.slug}`} className={styles.sidebarPopular}>
                        <span className={styles.sidebarPopularContent}>
                          <span className={styles.sidebarPopularTitle}>
                            {item.title}
                          </span>
                          {metaLabel ? (
                            <span className={styles.sidebarPopularMeta}>{metaLabel}</span>
                          ) : null}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
