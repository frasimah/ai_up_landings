"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CallCenterPositioning.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 02 — Positioning. Built from the Figma macet (3D renders + striped surface).
// Delicate SVG motion: a soft light travels around each card's border (animated stroke),
// the 3D render gently floats, a glow behind it breathes; cards fade up on reveal.
const CARDS = [
   {
      img: "/img/call-center/positioning/flower.png",
      imgClass: "flower",
      title: "Команда основателей",
      text: "С вами работают маркетологи и аналитики, которые запускали платформу AI-UP с первого дня. Знают каждый источник, каждую настройку, каждый алгоритм",
   },
   {
      img: "/img/call-center/positioning/pills.png",
      imgClass: "pills",
      title: "300+ проектов под ключ",
      text: "За 2 года работы — более 300 запущенных проектов в десятках ниш. Каждая ниша — это знание оптимальных источников, скриптов прозвона, типичных ошибок",
   },
   {
      img: "/img/call-center/positioning/funnel.png",
      imgClass: "funnel",
      title: "Прямой доступ к платформе",
      text: "У нашей команды — внутренний доступ к настройкам AI-UP. Включаем источники, недоступные через обычный личный кабинет. Корректируем алгоритмы под нишу",
   },
] as const;

function CallCenterPositioning() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [shown, setShown] = useState(false);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
         const raf = window.requestAnimationFrame(() => setShown(true));
         return () => window.cancelAnimationFrame(raf);
      }
      const st = ScrollTrigger.create({ trigger: node, start: "top 75%", once: true, onEnter: () => setShown(true) });
      return () => { st.kill(); };
   }, []);

   const renderCard = (c: typeof CARDS[number], i: number) => (
      <div
         key={c.title}
         className={`${styles.card} ${shown ? styles.in : ""}`}
         style={{ transitionDelay: shown ? `${i * 0.12}s` : "0s" }}
      >
         <img className={styles.cardGrid} src="/img/call-center/positioning/card-grid.svg" alt="" aria-hidden />

         <div className={styles.renderGlow} style={{ animationDelay: `${i * -1.6}s` }} aria-hidden />
         <div
            className={`${styles.render} ${styles[c.imgClass]}`}
            style={{ animationDelay: `${i * -1.9}s` }}
            aria-hidden
         >
            <img className={`${styles.renderImg} ${i === 0 ? styles.flowerImg : ""}`} src={c.img} alt="" />
         </div>
         <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <p>{c.text}</p>
         </div>
      </div>
   );

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="02 Позиционирование">
         <div className={styles.stripes} />

         <div className={styles.inner}>
            <div className={styles.head}>
               <div className={styles.eyebrow}><span />оригинал, а не перекупщик</div>
               <h2 className={styles.title}>Это услуга от той же команды, которая создала AI-UP</h2>
               <p className={styles.lead}>
                  Большинство сервисов «под ключ» на рынке — это агентства-перекупщики. Они покупают доступ к платформам типа AI-UP, накручивают маржу и продают как свою услугу. Мы — оригинал
               </p>
            </div>
            <Swiper
               className={styles.grid}
               enabled={false}
               slidesPerView="auto"
               spaceBetween={16}
               speed={700}
               modules={[FreeMode]}
               freeMode={{
                  enabled: true,
                  momentum: true,
               }}
               resistanceRatio={0.72}
               watchOverflow
               breakpoints={{
                  0: {
                     enabled: true,
                     slidesPerView: "auto",
                     spaceBetween: 16,
                  },
                  769: {
                     enabled: false,
                     slidesPerView: 1,
                     spaceBetween: 0,
                  },
                  1101: {
                     enabled: false,
                     slidesPerView: 3,
                     spaceBetween: 24,
                  },
               }}
            >
               {CARDS.map((c, i) => (
                  <SwiperSlide className={styles.slide} key={c.title}>
                     {renderCard(c, i)}
                  </SwiperSlide>
               ))}
            </Swiper>
            <p className={styles.note}>
               Когда вы работаете с агентством-посредником, между вами и платформой стоит ещё одна компания — со своей наценкой, своими сроками, своей системой коммуникации. Когда вы работаете с нами — посредников нет
            </p>
         </div>
      </section>
   );
}

export default CallCenterPositioning;
