"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import Button from '@/components/Buttons/Button';
import styles from './CostWork.module.scss'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CostWork() {
   const infoRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const infoNode = infoRef.current;
      if (!infoNode) return;

      const ctx = gsap.context(() => {
         const chip = infoNode.querySelector<HTMLElement>(`.${styles.cost_work_wrap_info_chip}`);
         const includeTitle = infoNode.querySelector<HTMLElement>(`.${styles.cost_work_wrap_info_include} p`);
         const includeItems = Array.from(
            infoNode.querySelectorAll<HTMLElement>(`.${styles.cost_work_wrap_info_include} li`)
         );
         const actionButton = infoNode.querySelector<HTMLElement>(`.${styles.cost_work_wrap_info_btn}`);

         if (!chip || !includeTitle || !includeItems.length || !actionButton) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            gsap.set([chip, includeTitle, ...includeItems, actionButton], {
               autoAlpha: 1,
               y: 0,
               clearProps: "transform",
            });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 10 : 16;

         gsap.set([chip, includeTitle, ...includeItems, actionButton], {
            autoAlpha: 0,
            y: initialY,
         });

         const timeline = gsap.timeline({ paused: true });
         timeline
            .to(chip, {
               autoAlpha: 1,
               y: 0,
               duration: 0.45,
               ease: "power2.out",
            })
            .to(
               includeTitle,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.35,
                  ease: "power2.out",
               },
               "-=0.15"
            )
            .to(includeItems, {
               autoAlpha: 1,
               y: 0,
               duration: 0.34,
               stagger: 0.14,
               ease: "power2.out",
            })
            .to(
               actionButton,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out",
               },
               "-=0.08"
            );

         ScrollTrigger.create({
            trigger: infoNode,
            start: isTabletOrSmaller ? "top 88%" : "top 82%",
            onEnter: () => timeline.timeScale(1).play(),
            onEnterBack: () => timeline.timeScale(1).play(),
            onLeaveBack: () => timeline.timeScale(1.1).reverse(),
         });
      }, infoNode);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.cost_work}>
         <div className="container">
            <div className={styles.cost_work_wrap}>
               <SectionHeader
                  title='Стоимость работы колл-центра'
                  titleSize='h2'
                  as='h2'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className={`row ${styles.cost_work_wrap_row}`}>
                  <div className="col-xl-6">
                     <div ref={infoRef} className={styles.cost_work_wrap_info}>
                        <p className={styles.cost_work_wrap_info_text}>
                           Если вы хотите, чтобы Ai-UP сам обрабатывал контакты:
                        </p>
                        <div className={styles.cost_work_wrap_info_chip}>
                           45 ₽ за обработку контакта
                        </div>
                        <div className={styles.cost_work_wrap_info_include}>
                           <p>Это включает:</p>
                           <ul>
                              <li>до 4 попыток дозвона</li>
                              <li>корректный разговор</li>
                              <li>статус</li>
                              <li>комментарий</li>
                              <li>запись</li>
                           </ul>
                        </div>
                        <p className={styles.cost_work_wrap_info_text}>
                           Мы оплачиваем связь, телефонию, номера, инфраструктуру, маркировку и обучение операторов.
                           Вы платите только за результат.
                        </p>
                        <div className={styles.cost_work_wrap_info_btn}>
                           <Button
                              icon={true}
                              href="/call-center"
                           >
                              Подробнее про колл-центр
                           </Button>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-6">
                     <div className={styles.cost_work_wrap_media}>
                        <picture>
                           <source
                              srcSet="/img/cost/work-mob.jpg"
                              media="(max-width: 767px)"
                           />
                           <img
                              src="/img/cost/work.jpg"
                              alt="Интерфейс обработки контактов Ai-UP"
                           />
                        </picture>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default CostWork;
