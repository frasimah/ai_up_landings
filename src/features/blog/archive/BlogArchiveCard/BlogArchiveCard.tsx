/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import type { BlogArchivePost } from "@/lib/blogArchive";
import { formatDateRu } from "@/lib/date";

import styles from "./BlogArchiveCard.module.scss";
import Image from "next/image";

function formatDate(value: string) {
  return formatDateRu(value) ?? value;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function BlogArchiveCard({ post }: { post: BlogArchivePost }) {
  const authorName = post.author?.name?.trim() || "Команда Ai-UP";
  const authorAvatar = post.author?.avatar;
  const category = post.category;

  return (
    <article className={styles.card}>
      <Link
        href={`/blog/${post.slug}`}
        className={styles.cardLink}
        aria-labelledby={`blog-card-title-${post.slug}`}
      >
        <div className={styles.cover}>
          <Image src={post.coverImage} alt={post.title} width={450} height={255} sizes="450px" />
        </div>

        <div className={styles.body}>
          {category && category.name !== "Без рубрики" && (
            <span
              className={styles.tag}
              style={{
                backgroundColor: category.bgColor,
                color: category.textColor,
              }}
            >
              {category.name}
            </span>
          )}
          <h2 id={`blog-card-title-${post.slug}`} className={styles.title}>
            {post.title}
          </h2>

          <div className={styles.author}>
            <div className={styles.avatar} aria-hidden="true">
              {authorAvatar ? <Image
                src={authorAvatar}
                alt={authorName}
                width={48}
                height={48}
                quality={70}
                sizes="48px"
              /> : <span>{getInitials(authorName)}</span>}
            </div>

            <div className={styles.meta}>
              <div className={styles.name}>{authorName}</div>
              <div className={styles.info}>
                <span>{formatDate(post.publishedAt)}</span>
                <span>&middot;</span>
                <span>{post.readTime} мин</span>
                <svg className={styles.eye} viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M8 3C4.5 3 1.7 5.3 1 8c.7 2.7 3.5 5 7 5s6.3-2.3 7-5c-.7-2.7-3.5-5-7-5z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    fill="none"
                  />
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" fill="none" />
                </svg>
                <span>{post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
