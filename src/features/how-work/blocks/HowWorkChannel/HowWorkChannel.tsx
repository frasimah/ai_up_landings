"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HowWorkChannel.module.scss'
import CheckBox from '@/components/CheckBox/CheckBox';
import SliderCheck from '@/components/SliderCheck/SliderCheck';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HowWorkChannel() {
   const mainRef = useRef<HTMLDivElement | null>(null);
   const messageRef = useRef<HTMLDivElement | null>(null);
   const [activeIndex, setActiveIndex] = useState(-1);
   const [isSliderActive, setIsSliderActive] = useState(false);

   const dataList = [
      'один канал может давать больше контактов',
      'другой — стабильнее по качеству',
      'можно включать несколько или отключать лишние',
      'можно тестировать каналы внутри одного источника',
   ];

   useLayoutEffect(() => {
      const mainNode = mainRef.current;
      const messageNode = messageRef.current;
      if (!mainNode || !messageNode) {
         return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTabletOrSmaller = window.matchMedia('(max-width: 1199px)').matches;
      const timeoutIds: number[] = [];
      const messageDelay = 140;

      if (prefersReducedMotion) {
         setActiveIndex(dataList.length - 1);
         setIsSliderActive(true);
         return;
      }

      const activateFlow = () => {
         setActiveIndex(-1);

         dataList.forEach((_, index) => {
            const timeoutId = window.setTimeout(() => {
               setActiveIndex(index);
            }, 220 + index * 520);
            timeoutIds.push(timeoutId);
         });
      };

      const listTrigger = ScrollTrigger.create({
         trigger: mainNode,
         start: isTabletOrSmaller ? 'top 92%' : 'top 86%',
         once: true,
         onEnter: activateFlow,
      });

      const messageTrigger = ScrollTrigger.create({
         trigger: messageNode,
         start: isTabletOrSmaller ? 'top 98%' : 'top 95%',
         once: true,
         onEnter: () => {
            const messageTimeoutId = window.setTimeout(() => {
               setIsSliderActive(true);
            }, messageDelay);
            timeoutIds.push(messageTimeoutId);
         },
      });

      return () => {
         listTrigger.kill();
         messageTrigger.kill();
         timeoutIds.forEach((id) => window.clearTimeout(id));
      };
   }, [dataList.length]);

   return (
      <section className={styles.how_work_channel}>
         <div className="container">
            <div className={styles.how_work_channel_wrap}>
               <SectionHeader
                  title='Каналы сбора: Vault&nbsp;Core, Terra&nbsp;Link, Nova&nbsp;Net, Data&nbsp;Ray'
                  titleSize='h2'
                  as='h2'
                  description='Каждый источник можно собирать разными каналами. Каналы — это разные механики сбора данных'
                  size='small'
                  alignLeftMobile={true}
               />
               {dataList?.length > 0 && (
                  <div ref={mainRef} className={styles.how_work_channel_wrap_main}>
                     <div className={styles.how_work_channel_wrap_main_title}>
                        Зачем они нужны:
                     </div>
                     <div className={`row ${styles.how_work_channel_wrap_main_list}`}>
                        {dataList?.map((text, index) => (
                           <div
                              className={`col-xl-3 col-md-6 ${styles.how_work_channel_wrap_main_list_col} ${index <= activeIndex ? styles.how_work_channel_wrap_main_list_col_active : ''
                                 }`}
                              key={text + index}
                           >
                              <div className={styles.how_work_channel_wrap_main_list_it}>
                                 <CheckBox isAnimation={false} active={index <= activeIndex} />
                                 {text}
                              </div>
                           </div>
                        ))}

                     </div>
                  </div>
               )}
               <div ref={messageRef} className={styles.how_work_channel_wrap_message}>
                  <SliderCheck isAnimation={false} isActive={isSliderActive} />
                  <p>
                     Вы полностью контролируете, как именно собираются контакты. <br />
                     А если хотите освободить себя от анализа — включаете Ai Flow
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HowWorkChannel;
