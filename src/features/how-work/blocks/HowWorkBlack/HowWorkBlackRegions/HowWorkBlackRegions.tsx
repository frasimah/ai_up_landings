"use client";

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HowWorkBlackRegions.module.scss'
import HowWorkBlackRegionsSvgOne from './HowWorkBlackRegionsSvgOne';
import HowWorkBlackRegionsSvgTwo from './HowWorkBlackRegionsSvgTwo';
import HowWorkBlackRegionsSvgThree from './HowWorkBlackRegionsSvgThree';

gsap.registerPlugin(ScrollTrigger);

function HowWorkBlackRegions() {
   const sectionRef = useRef<HTMLElement | null>(null);

   useLayoutEffect(() => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const pathGroups = [
         { selector: styles.how_work_regions_wrap_main_list_it_img_1, drawDuration: 2.5, keepInitialFill: false },
         { selector: styles.how_work_regions_wrap_main_list_it_img_2, drawDuration: 2.5, keepInitialFill: false },
         { selector: styles.how_work_regions_wrap_main_list_it_img_3, drawDuration: 2.5, keepInitialFill: true },
      ] as const;

      const animatedGroups = pathGroups
         .map((group) => ({
            ...group,
            nodes: Array.from(sectionNode.querySelectorAll<SVGPathElement>(`.${group.selector}`)),
         }))
         .filter((group) => group.nodes.length > 0);
      if (!animatedGroups.length) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const strokeColor = '#777';

      animatedGroups.forEach(({ nodes, keepInitialFill }) => {
         nodes.forEach((node) => {
            const initialFill = keepInitialFill ? (node.getAttribute('fill') ?? 'transparent') : 'transparent';
            gsap.set(node, { fill: initialFill, stroke: strokeColor, opacity: 1 });
            const totalLength = node.getTotalLength();
            gsap.set(node, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
         });
      });

      if (prefersReducedMotion) {
         gsap.set(animatedGroups.flatMap(({ nodes }) => nodes), { strokeDashoffset: 0, fill: strokeColor });
         return;
      }

      const timeline = gsap.timeline({
         scrollTrigger: {
            trigger: sectionNode,
            start: 'top 80%',
            once: true,
         },
      });

      animatedGroups.forEach(({ nodes, drawDuration }) => {
         timeline.to(
            nodes,
            {
               strokeDashoffset: 0,
               duration: drawDuration,
               ease: 'power2.out',
               stagger: 0,
            },
            0
         );

         timeline.to(
            nodes,
            {
               fill: strokeColor,
               duration: 0.08,
               ease: 'none',
            },
            drawDuration
         );
      });

      return () => {
         timeline.scrollTrigger?.kill();
         timeline.kill();
      };
   }, []);

   return (
      <section ref={sectionRef} className={styles.how_work_regions}>
         <div className={styles.how_work_regions_wrap}>
            <SectionHeader
               title='Регионы'
               titleSize='h2'
               as='h2'
               headingVariant='white'
               size='small'
               alignLeftMobile={true}
            />
            <div className={styles.how_work_regions_wrap_main}>
               <div className={styles.how_work_regions_wrap_main_title}>
                  Вы можете выбрать:
               </div>
               <div className={`row ${styles.how_work_regions_wrap_main_list}`}>
                  <div className="col-xl-4 col-md-6">
                     <div className={styles.how_work_regions_wrap_main_list_it}>
                        <div className={styles.how_work_regions_wrap_main_list_it_name}>
                           один регион
                        </div>
                        <div className={styles.how_work_regions_wrap_main_list_it_img}>
                           <HowWorkBlackRegionsSvgOne />
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                     <div className={styles.how_work_regions_wrap_main_list_it}>
                        <div className={styles.how_work_regions_wrap_main_list_it_name}>
                           несколько регионов
                        </div>
                        <div className={styles.how_work_regions_wrap_main_list_it_img}>
                           <HowWorkBlackRegionsSvgTwo />
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-4">
                     <div className={styles.how_work_regions_wrap_main_list_it}>
                        <div className={styles.how_work_regions_wrap_main_list_it_name}>
                           сразу всю РФ
                        </div>
                        <div className={styles.how_work_regions_wrap_main_list_it_img}>
                           <HowWorkBlackRegionsSvgThree />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HowWorkBlackRegions;

