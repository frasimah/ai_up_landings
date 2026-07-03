"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HomeEffectiveAnimationFirst.module.scss";

export type RunningItem = {
   type: 'phone' | 'site';
   value: string;
};

export type RunningLine = {
   items: RunningItem[];
};

export const runningLinesData: RunningLine[] = [
   {
      items: [
         { type: 'phone', value: '+7 (912) 123-45-67' },
         { type: 'site', value: 'rus-portal.ru' },
         { type: 'phone', value: '+7 (925) 987-65-43' },
         { type: 'site', value: 'mos-info.ru' },
      ],
   },
   {
      items: [
         { type: 'site', value: 'biz-market.ru' },
         { type: 'phone', value: '+7 (903) 222-11-00' },
         { type: 'site', value: 'ural-service.ru' },
         { type: 'phone', value: '+7 (964) 555-77-88' },
      ],
   },
   {
      items: [
         { type: 'phone', value: '+7 (978) 444-33-22' },
         { type: 'site', value: 'south-region.ru' },
         { type: 'phone', value: '+7 (916) 66-55-44' },
         { type: 'site', value: 'baltic-group.ru' },
      ],
   },
   {
      items: [
         { type: 'site', value: 'tech-russia.ru' },
         { type: 'phone', value: '+7 (921) 888-99-00' },
         { type: 'site', value: 'digital-hub.ru' },
         { type: 'phone', value: '+7 (982) 777-66-55' },
      ],
   },
   {
      items: [
         { type: 'phone', value: '+7 (905) 333-22-11' },
         { type: 'site', value: 'central-market.ru' },
         { type: 'phone', value: '+7 (968) 999-88-77' },
         { type: 'site', value: 'volga-online.ru' },
      ],
   },
   {
      items: [
         { type: 'site', value: 'rus-business.ru' },
         { type: 'phone', value: '+7 (951) 111-22-33' },
         { type: 'site', value: 'info-platform.ru' },
         { type: 'phone', value: '+7 (929) 444-55-66' },
      ],
   },
];

type HomeEffectiveAnimationFirstProps = {
   isActive?: boolean;
};

function HomeEffectiveAnimationFirst({ isActive = true }: HomeEffectiveAnimationFirstProps) {
   const rowsRef = useRef<HTMLDivElement[]>([]);
   const tweensRef = useRef<gsap.core.Tween[]>([]);

   useEffect(() => {
      tweensRef.current.forEach((tween) => tween.kill());
      tweensRef.current = [];

      rowsRef.current.forEach((row, index) => {
         const direction = index % 2 === 0 ? 1 : -1;

         if (direction === 1) {
            gsap.set(row, { xPercent: -50 });
         }

         const tween = gsap.to(row, {
            xPercent: direction === 1 ? 0 : -50,
            duration: 20,
            ease: "none",
            repeat: -1,
         });

         if (!isActive) {
            tween.pause();
         }

         tweensRef.current.push(tween);
      });

      return () => {
         tweensRef.current.forEach((tween) => tween.kill());
         tweensRef.current = [];
      };
   }, [isActive]);

   useEffect(() => {
      tweensRef.current.forEach((tween) => {
         if (isActive) {
            tween.resume();
            return;
         }

         tween.pause();
      });
   }, [isActive]);



   return (
      <div className={`${styles.home_effective_content_item} ${!isActive ? styles.home_effective_content_item_paused : ''}`}>
         <div className={styles.home_effective_content_item_title}>
            Работает с реальными контактами клиентов вместо случайных кликов
         </div>
         <div className={styles.home_effective_content_item_list}>
            {runningLinesData.map((line, i) => (
               <div
                  key={i}
                  className={styles.home_effective_content_item_list_row}

               >
                  <div className={styles.home_effective_content_item_list_row_track}
                     ref={(el) => {
                        if (el) rowsRef.current[i] = el;
                     }}
                  >
                     {/* Дублируем элементы 2 раза для бесконечного эффекта */}
                     {line.items.map((text, j) => (
                        <span
                           key={`a-${j}`}
                           className={styles.home_effective_content_item_list_row_item}
                        >
                           {text.value}
                        </span>
                     ))}

                     {line.items.map((text, j) => (
                        <span
                           key={`b-${j}`}
                           className={styles.home_effective_content_item_list_row_item}
                        >
                           {text.value}
                        </span>
                     ))}
                  </div>
               </div>
            ))}
            <div className={styles.home_effective_content_item_list_icon}>
               <svg width={140} height={140} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <foreignObject x={-12} y={-12} width={164} height={164}></foreignObject><g data-figma-bg-blur-radius={12}>
                     <rect x="0.5" y="0.5" width={139} height={139} rx="29.5" fill="url(#paint0_linear_1589_4114)" fillOpacity="0.8" />
                     <rect x="0.5" y="0.5" width={139} height={139} rx="29.5" stroke="url(#paint1_linear_1589_4114)" />
                     <path className={styles.home_effective_content_item_list_icon_out} d="M80.8076 98.8027L62.4746 116.9L61.4209 115.832L60.3672 114.765L78.7002 96.668L80.8076 98.8027ZM90.748 92.6611L81.1445 116.395L78.3633 115.27L87.9668 91.5361L90.748 92.6611ZM68.1143 98.9219L68.7012 100.302L45.7119 110.093L45.124 108.712L44.5371 107.332L67.5264 97.542L68.1143 98.9219ZM97.8418 109.899H94.8418V82.9014H97.8418V109.899ZM57.6377 97.752H32.0293V94.752H57.6377V97.752ZM110.234 95.0693L108.854 95.6592L107.476 96.248L97.5811 73.1084L98.9609 72.5186L100.34 71.9287L110.234 95.0693ZM49.207 88.0498L48.6162 89.4287L48.0264 90.8076L24.4551 80.7207L25.6348 77.9629L49.207 88.0498ZM44.4229 78.2656L42.333 80.418L24 62.6172L26.0898 60.4648L44.4229 78.2656ZM116.893 78.2744L114.785 80.4092L96.7432 62.6094L97.7969 61.541L98.8496 60.4736L116.893 78.2744ZM43.2998 67.1758L41.9229 67.7715L40.5469 68.3682L30.6523 45.5244L32.0293 44.9277L33.4053 44.332L43.2998 67.1758ZM115.545 59.5645L114.387 62.332L91.6885 52.8389L92.2676 51.4541L92.8457 50.0703L115.545 59.5645ZM46.333 57.6846H43.333V31.874H46.333V57.6846ZM63.0879 25.6484L52.9023 49.0859L51.5264 48.4883L50.1504 47.8896L60.3359 24.4531L63.0879 25.6484ZM108.854 46.4277H83.2461V43.4277H108.854V46.4277ZM79.4629 25.0508L80.5342 26.1016L62.7822 44.1982L61.7119 43.1475L60.6406 42.0977L78.3926 24L79.4629 25.0508ZM96.6328 31.874L97.2246 33.252L73.0713 43.6357L72.4785 42.2578L71.8867 40.8799L96.04 30.4961L96.6328 31.874Z" fill="white" />
                     <circle className={styles.home_effective_content_item_list_icon_inner} cx="70.4457" cy="70.4477" r="16.1" stroke="white" strokeWidth={3} strokeDasharray="8 8" />
                  </g>
                  <defs>
                     <clipPath id="bgblur_0_1589_4114_clip_path" transform="translate(12 12)"><rect x="0.5" y="0.5" width={139} height={139} rx="29.5" />
                     </clipPath><linearGradient id="paint0_linear_1589_4114" x1={70} y1={0} x2={70} y2={140} gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0169F9" />
                        <stop offset={1} stopColor="#0169F9" stopOpacity={0} />
                     </linearGradient>
                     <linearGradient id="paint1_linear_1589_4114" x1={0} y1={0} x2={140} y2="136.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity="0.8" />
                        <stop offset="0.528846" stopColor="white" stopOpacity={0} />
                        <stop offset={1} stopColor="white" stopOpacity="0.8" />
                     </linearGradient>
                  </defs>
               </svg>
            </div>
         </div>
      </div>
   );
}

export default HomeEffectiveAnimationFirst;
