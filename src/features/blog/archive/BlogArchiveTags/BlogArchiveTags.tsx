"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { tagToSlug } from "@/lib/blog";
import styles from "./BlogArchiveTags.module.scss";

function BlogArchiveTags({
   tags,
   activeTag,
}: {
   tags: string[];
   activeTag: string;
}) {
   return (
      tags.length > 0 && (
         <Swiper
            className={styles.blog_archive_wrap_tags}
            slidesPerView={"auto"}
            speed={800}
            enabled={false}
            breakpoints={{
               0: {
                  enabled: true,
                  spaceBetween: 7,
               },
               1200: {
                  enabled: false,
                  spaceBetween: 0,
               },
            }}
         >
            {tags.map((tag, index) => {
               const isActive =
                  activeTag === tag || activeTag === tagToSlug(tag);

               return (
                  <SwiperSlide
                     key={tag + index}
                     className={`${styles.blog_archive_wrap_tags_tag} ${isActive ? styles.active : ""
                        }`}
                  >
                     <Link
                        href={tag === "all" ? "/blog" : `/blog/tag/${tagToSlug(tag)}`}
                        className={isActive ? "active" : ""}
                     >
                        {tag === "all" ? "Все" : tag}
                     </Link>
                  </SwiperSlide>
               );
            })}
         </Swiper>
      )
   );
}

export default BlogArchiveTags;