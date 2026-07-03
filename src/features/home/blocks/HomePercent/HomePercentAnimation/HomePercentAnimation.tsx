import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../HomePercent.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const RING_SEGMENT_COUNT = 120;
const RING_SEGMENT_WIDTH = 1;
const RING_SEGMENT_HEIGHT = 19.565;
const RING_SEGMENT_X = 449.5;
const RING_SEGMENT_ANGLES = Array.from(
   { length: RING_SEGMENT_COUNT },
   (_, index) => (360 / RING_SEGMENT_COUNT) * index
);


function HomePercentAnimation() {
   const svgRef = useRef<SVGSVGElement | null>(null);
   const lineRef = useRef<SVGPathElement | null>(null);
   const itemsRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const svg = svgRef.current;
      const line = lineRef.current;
      const itemsWrap = itemsRef.current;

      if (!svg || !line || !itemsWrap) return;

      const infoItems = Array.from(
         itemsWrap.querySelectorAll(`.${styles.home_percent_right_items_it}`)
      ) as HTMLElement[];

      // Берём только сегменты круга, исключаем линию-маркер
      const paths = Array.from(svg.querySelectorAll("[data-ring-segment]")) as SVGRectElement[];
      if (!paths.length) return;

      // ===== настройки =====
      const EMPTY = "#9C9C9C";
      const FULL = "#0169F9";

      const ROTATION_DURATION = 5.6;
      const PATH_FILL_DURATION = 0.16;
      const ITEM_FADE_DURATION = 0.8;
      const HOLD = 0.35;
      const REPEAT_DELAY = 0.2;

      const START_SHIFT = 0;


      const ITEM_DIM = 0.3;
      const ITEM_ON = 1;
      const ITEM_FADE_DUR = 0.4; // плавность opacity
      // =====================

      const vb = svg.viewBox.baseVal;
      const cx = vb.x + vb.width / 2;
      const cy = vb.y + vb.height / 2;

      const angleFromTopCW = (x: number, y: number) => {
         const dx = x - cx;
         const dy = y - cy;
         let a = Math.atan2(dy, dx);
         a = a + Math.PI / 2;
         if (a < 0) a += Math.PI * 2;
         return a;
      };

      const sorted = paths
         .map((p) => {
            const b = p.getBBox();
            const px = b.x + b.width / 2;
            const py = b.y + b.height / 2;
            return { p, a: angleFromTopCW(px, py) };
         })
         .sort((a, b) => a.a - b.a)
         .map((x) => x.p);

      const rotated =
         START_SHIFT > 0
            ? [...sorted.slice(-START_SHIFT), ...sorted.slice(0, -START_SHIFT)]
            : sorted;

      gsap.set(rotated, { fill: EMPTY });
      gsap.set(line, { rotation: 0, svgOrigin: `${cx} ${cy}` });

      // стартовое состояние текста
      gsap.set(infoItems, { opacity: ITEM_DIM });



      const total = rotated.length;
      const pathStagger =
         total > 1 ? (ROTATION_DURATION - PATH_FILL_DURATION) / (total - 1) : 0;
      const itemStep =
         infoItems.length > 0 ? ROTATION_DURATION / infoItems.length : ROTATION_DURATION;

      // разбиение секций: первая +1, последняя -1

      const tl = gsap.timeline({
         repeat: -1,
         repeatDelay: REPEAT_DELAY,
         paused: true,
      });

      // сброс на каждом цикле
      tl.set(rotated, { fill: EMPTY });
      tl.set(line, { rotation: 0 });
      tl.set(infoItems, { opacity: ITEM_DIM });

      tl.to(
         line,
         {
            rotation: 360,
            duration: ROTATION_DURATION,
            ease: "none",
         },
         0
      );

      tl.to(
         rotated,
         {
            fill: FULL,
            duration: PATH_FILL_DURATION,
            stagger: pathStagger,
            ease: "none",
         },
         0
      );

      infoItems.forEach((item, index) => {
         tl.to(
            item,
            {
               opacity: ITEM_ON,
               duration: ITEM_FADE_DURATION,
               ease: "power1.out",
            },
            Math.min(ROTATION_DURATION - ITEM_FADE_DURATION, index * itemStep + 0.2)
         );
      });

      tl.to({}, { duration: HOLD });

      /*
      let start = 0;

      for (let i = 0; i < QUARTERS; i++) {
         const len = counts[i];
         const slice = rotated.slice(start, start + len);
         start += len;

         // заполняем секцию
         tl.to(slice, {
            fill: FULL,
            duration: FILL_DUR,
            stagger: STAGGER,
            ease: "power2.inOut",
         });

         // крутим линию синхронно
         tl.to(
            line,
            {
               rotation: ROTATIONS[i],
               duration: 1.6,
               ease: "power1.inOut",
            },
            "<"
         );

         if (i === 0 && infoItems[0]) {
            tl.to(infoItems[0], { opacity: ITEM_ON, duration: 1.6, ease: "power1.in" }, "<");
         }
         if (i === 1 && infoItems[1]) {
            tl.to(infoItems[1], { opacity: ITEM_ON, duration: 1.6, ease: "power1.in" }, "<");
         }
         if (i === 2 && infoItems[2]) {
            tl.to(infoItems[2], { opacity: ITEM_ON, duration: 1.6, ease: "power1.in" }, "<");
         }
         if (i === 3) {
            tl.to(infoItems, { opacity: ITEM_ON, duration: 1.6, ease: "power1.in" }, "<");
         }

         // пауза
         tl.to({}, { duration: HOLD });
      }

      */

      tl.to(paths, {
         fill: EMPTY,
         duration: ITEM_FADE_DUR,
         ease: "power1.inOut",
      });

      tl.to(
         infoItems,
         {
            opacity: ITEM_DIM,
            duration: ITEM_FADE_DUR,
            ease: "power1.inOut",
         },
         "<"
      );

      tl.set(line, { rotation: 0 });


      const trigger = ScrollTrigger.create({
         trigger: itemsWrap,
         start: "top 50%",
         end: "bottom top",
         onEnter: () => tl.play(),
         onEnterBack: () => tl.play(),
         onLeave: () => tl.pause(),
         onLeaveBack: () => tl.pause(),
      });

      return () => {
         trigger.kill();
         tl.kill();
      };
   }, []);



   const data = [
      { percent: "70%", text: "этих людей можно <br/> идентифицировать" },
      { percent: "5-20%", text: "превращаются <br/> в квалифицированные лиды" },
      { percent: "73%", text: "контактов — доступно <br/> к дозвону" },
   ];

   return (
      <div className={styles.home_percent_right}>
         <div className={styles.home_percent_right_items} ref={itemsRef}>
            {data?.map((item, index) => (
               <div className={styles.home_percent_right_items_it} key={index}>
                  <div className={styles.home_percent_right_items_it_num}>
                     до <span>{item.percent}</span>
                  </div>
                  <div className={styles.home_percent_right_items_it_text} dangerouslySetInnerHTML={{ __html: item.text }} />
               </div>
            ))}
         </div>
         <div className={styles.home_percent_right_circle}>
             <svg width="900" height="900" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
                {RING_SEGMENT_ANGLES.map((angle) => (
                   <rect
                      key={angle}
                      data-ring-segment
                      x={RING_SEGMENT_X}
                      y={0}
                      width={RING_SEGMENT_WIDTH}
                      height={RING_SEGMENT_HEIGHT}
                      fill="#9C9C9C"
                      transform={`rotate(${angle} 450 450)`}
                   />
                ))}
             </svg>
            <svg width={900} height={900} viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M450 0V100" stroke="#0169F9" strokeWidth={2} ref={lineRef} />
            </svg>
         </div>
      </div>
   );
}

export default HomePercentAnimation;
