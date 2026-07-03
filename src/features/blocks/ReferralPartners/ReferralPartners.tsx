"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralPartners.module.scss';
import SmallListItem from '@/components/SmallListItem/SmallListItem';
import HomeReferralAnimation from '@/features/home/blocks/HomeReferral/HomeReferralAnimation/HomeReferralAnimation';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ReferralPartners() {
   const dataList = [
      "идентификации",
      "колл-центр",
      "новые функции, которые будут добавляться дальше",
   ];

   const leftRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const root = leftRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
         const listItems = Array.from(
            root.querySelectorAll<HTMLElement>(
               `.${styles.referral_partners_anim_item}`
            )
         );
         const textBlocks = Array.from(
            root.querySelectorAll<HTMLElement>(
               `.${styles.referral_partners_wrap_left_head_text} p`
            )
         );
         const message = root.querySelector<HTMLElement>(
            `.${styles.referral_partners_wrap_left_message} p`
         );

         const allTargets = [...listItems, ...textBlocks, ...(message ? [message] : [])];
         if (!allTargets.length) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            gsap.set(allTargets, { autoAlpha: 1, y: 0, clearProps: "transform" });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 12 : 18;

         const hideAllInstant = () => {
            gsap.killTweensOf(allTargets);
            gsap.set(allTargets, { autoAlpha: 0, y: initialY, overwrite: true });
         };

         const showTimeline = () => {
            gsap.killTweensOf(allTargets);

            const tl = gsap.timeline({ defaults: { ease: "power2.out", overwrite: true } });
            tl.to(listItems, {
               autoAlpha: 1,
               y: 0,
               duration: 0.75,
               stagger: 0.2,
            });

            if (textBlocks.length) {
               tl.to(
                  textBlocks,
                  {
                     autoAlpha: 1,
                     y: 0,
                     duration: 0.65,
                     stagger: 0.16,
                  },
                  "-=0.25"
               );
            }

            if (message) {
               tl.to(
                  message,
                  {
                     autoAlpha: 1,
                     y: 0,
                     duration: 0.7,
                  },
                  "-=0.1"
               );
            }
         };

         hideAllInstant();

         ScrollTrigger.create({
            trigger: root,
            start: isTabletOrSmaller ? "top 92%" : "top 86%",
            onEnter: showTimeline,
            onEnterBack: showTimeline,
         });

         ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            onLeaveBack: hideAllInstant,
         });
      }, root);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.referral_partners}>
         <div className="container">
            <div className={styles.referral_partners_wrap}>
               <SectionHeader
                  className={styles.referral_partners_wrap_head}
                  title='Почему партнёрка Ai-UP выгоднее большинства программ на рынке'
                  as='h2'
                  titleSize='h2'
                  description='Ai-UP — это экосистема, в которой пользователи постоянно тратят деньги на реальные бизнес-задачи:'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className="row">
                  <div className="col-xl-6">
                     <div className={styles.referral_partners_wrap_left} ref={leftRef}>
                        <div className={styles.referral_partners_wrap_left_head}>
                           {dataList?.length > 0 && (
                              <div className={styles.referral_partners_wrap_left_head_list}>
                                 {dataList?.map((text, index) => (
                                    <SmallListItem
                                       text={text}
                                       key={text + index}
                                       className={styles.referral_partners_anim_item}
                                    />
                                 ))}
                              </div>
                           )}
                           <div className={styles.referral_partners_wrap_left_head_text}>
                              <p>
                                 Это значит, что ваши рефералы пополняют баланс регулярно, а вы получаете процент с каждой операции — без каких-либо действий с вашей стороны.
                              </p>
                              <p>
                                 И чем больше сервис развивается, чем больше функций появляется, чем больше направлений мы запускаем — тем чаще ваши рефералы тратят деньги и тем больше вы зарабатываете.
                              </p>
                           </div>
                        </div>
                        <div className={styles.referral_partners_wrap_left_message}>
                           <p>
                              Доход растёт вместе с ростом Ai-UP. И вам ничего не нужно делать
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-6">
                     <HomeReferralAnimation />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReferralPartners;
