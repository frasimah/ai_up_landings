"use client";

import styles from './HomeCallCenterAnimation.module.scss'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HomeCallCenterAnimation() {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const [buttonActive, setButtonActive] = useState(false);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);
   const entranceTweenRef = useRef<gsap.core.Tween | null>(null);
   const startTimeoutRef = useRef<number | null>(null);

   const dataAnimation = [
      { icon: false, title: '8(926)-930-09-88' },
      { icon: true, title: '8(917)-413-22-43' },
      { icon: true, title: '8(915)-194-32-04' },
      { icon: false, title: '8(926)-528-09-03' },
      { icon: true, title: '8(922)-234-34-23' },
   ];

   useEffect(() => {
      if (!containerRef.current) return;

      const scrollT = ScrollTrigger.create({
         trigger: containerRef.current,
         start: "bottom center",
         end: 'top top',
         onEnter: () => {
            setButtonActive(true)
         },
      });

      return () => {
         scrollT.kill();
      };
   }, []);

   useEffect(() => {
      const node = containerRef.current;
      if (!node || !buttonActive) return;

      const elements = Array.from(node.children) as HTMLElement[];

      startTimeoutRef.current = window.setTimeout(() => {
         entranceTweenRef.current = gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.5, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
         );

         floatTweensRef.current = elements.map((el, index) => {
            const tween = gsap.to(el, {
               y: "-=10",
               rotation: index % 2 === 0 ? 2 : -2,
               duration: 2 + Math.random(),
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut",
               delay: Math.random(),
            });

            return tween;
         });
      }, 400);

      return () => {
         if (startTimeoutRef.current !== null) {
            window.clearTimeout(startTimeoutRef.current);
            startTimeoutRef.current = null;
         }

         entranceTweenRef.current?.kill();
         entranceTweenRef.current = null;
         floatTweensRef.current.forEach((tween) => tween.kill());
         floatTweensRef.current = [];
      };
   }, [buttonActive]);

   return (
      <div className={styles.home_call_wrap_right}>
         <div className={styles.home_call_wrap_right_bg}>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_circle}></span>
            <span className={styles.home_call_wrap_right_bg_phone}>
               <img src="/img/home/home-call-phone.svg" alt="Иконка звонка колл-центра" />
            </span>
         </div>
         <div className={styles.home_call_wrap_right_block}>
            <div className={styles.home_call_wrap_right_block_head}>
               <div className={styles.home_call_wrap_right_block_head_title}>
                  Колл-центр
               </div>
               <div className={styles.home_call_wrap_right_block_head_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} viewBox="0 0 44 44" fill="none">
                     <path d="M22 0C17.6488 0 13.3953 1.29028 9.77746 3.70767C6.15958 6.12506 3.33979 9.56099 1.67466 13.581C0.00953229 17.6009 -0.426141 22.0244 0.422734 26.292C1.27161 30.5596 3.36691 34.4796 6.44366 37.5564C9.52042 40.6331 13.4404 42.7284 17.708 43.5773C21.9756 44.4262 26.3991 43.9905 30.419 42.3253C34.439 40.6602 37.8749 37.8404 40.2923 34.2225C42.7097 30.6047 44 26.3512 44 22C43.9937 16.1672 41.6738 10.5751 37.5494 6.45062C33.425 2.32618 27.8328 0.00630865 22 0ZM22 40.3333C18.374 40.3333 14.8295 39.2581 11.8146 37.2436C8.79965 35.2291 6.44983 32.3658 5.06222 29.0159C3.67461 25.6659 3.31155 21.9797 4.01895 18.4233C4.72634 14.867 6.47242 11.6003 9.03638 9.03638C11.6003 6.47241 14.867 4.72633 18.4234 4.01894C21.9797 3.31154 25.6659 3.6746 29.0159 5.06221C32.3659 6.44982 35.2291 8.79965 37.2436 11.8145C39.2581 14.8294 40.3333 18.374 40.3333 22C40.328 26.8607 38.3947 31.5207 34.9577 34.9577C31.5207 38.3947 26.8607 40.328 22 40.3333Z" fill="white" />
                     <path d="M21.9987 18.333H20.1654C19.6791 18.333 19.2128 18.5262 18.869 18.87C18.5252 19.2138 18.332 19.6801 18.332 20.1663C18.332 20.6526 18.5252 21.1189 18.869 21.4627C19.2128 21.8065 19.6791 21.9997 20.1654 21.9997H21.9987V32.9997C21.9987 33.4859 22.1919 33.9522 22.5357 34.296C22.8795 34.6399 23.3458 34.833 23.832 34.833C24.3183 34.833 24.7846 34.6399 25.1284 34.296C25.4722 33.9522 25.6654 33.4859 25.6654 32.9997V21.9997C25.6654 21.0272 25.2791 20.0946 24.5914 19.407C23.9038 18.7193 22.9712 18.333 21.9987 18.333Z" fill="white" />
                     <path d="M22 14.6689C23.5188 14.6689 24.75 13.4377 24.75 11.9189C24.75 10.4002 23.5188 9.16895 22 9.16895C20.4812 9.16895 19.25 10.4002 19.25 11.9189C19.25 13.4377 20.4812 14.6689 22 14.6689Z" fill="white" />
                  </svg>
               </div>
            </div>
            <div className={`${styles.home_call_wrap_right_block_bottom} ${buttonActive ? styles.active : ''}`}>
               <div className={styles.home_call_wrap_right_block_bottom_check}>
                  <span className={styles.home_call_wrap_right_block_bottom_check_circle}></span>
               </div>
               <div className={styles.home_call_wrap_right_block_bottom_text}>
                  {buttonActive ? 'Включен' : 'Выключен'}
               </div>
            </div>
         </div>
         <div className={styles.home_call_wrap_right_animation} ref={containerRef}>
            {dataAnimation?.map((item, index) => (
               <div className={styles.home_call_wrap_right_animation_item} key={item.title + index}>
                  <span className={styles.home_call_wrap_right_animation_item_icon}>
                     {item?.icon ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                           <rect x="0.00259901" width={30} height={30} rx={15} fill="#399B52" />
                           <path d="M12.7771 8.4919C12.7771 8.4919 12.5658 7.99999 12.2431 7.99999C11.9255 7.99999 11.7603 8.14572 11.6501 8.24627C11.54 8.34681 9.69708 9.85182 9.69708 9.85182C9.69708 9.85182 9.16111 10.317 9.20209 11.192C9.23667 12.067 9.40892 13.3124 10.3028 15.0471C11.1903 16.778 13.4117 19.4227 14.8153 20.3524C14.8153 20.3524 16.1159 21.3439 17.3261 21.7467C17.6777 21.8568 18.3808 22 18.5447 22C18.7112 22 19.0051 22 19.3426 21.755C19.6858 21.5074 21.6113 19.9687 21.6113 19.9687C21.6113 19.9687 22.0826 19.5455 21.5351 19.0536C20.9851 18.5617 19.315 17.4678 18.9577 17.1802C18.5998 16.8881 18.0901 17.0166 17.8698 17.2145C17.6501 17.4137 17.2576 17.7414 17.2096 17.7828C17.1379 17.8375 16.9413 18.0151 16.721 17.9266C16.4405 17.8165 15.2905 17.1961 14.2243 15.7464C13.1645 14.2981 13.048 13.8246 12.8898 13.313C12.863 13.2374 12.8626 13.1549 12.8888 13.0791C12.9149 13.0032 12.9661 12.9383 13.0339 12.8949C13.1927 12.7854 13.7774 12.3012 13.7774 12.3012C13.7774 12.3012 14.1558 11.9302 13.9976 11.493C13.8395 11.0558 12.7771 8.4919 12.7771 8.4919Z" fill="white" />
                        </svg>
                     ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                           <rect x="0.00259901" width={30} height={30} rx={15} fill="#CE2727" />
                           <path d="M12.7771 8.4919C12.7771 8.4919 12.5658 7.99999 12.2431 7.99999C11.9255 7.99999 11.7603 8.14572 11.6501 8.24627C11.54 8.34681 9.69708 9.85182 9.69708 9.85182C9.69708 9.85182 9.16111 10.317 9.20209 11.192C9.23667 12.067 9.40892 13.3124 10.3028 15.0471C11.1903 16.778 13.4117 19.4227 14.8153 20.3524C14.8153 20.3524 16.1159 21.3439 17.3261 21.7467C17.6777 21.8568 18.3808 22 18.5447 22C18.7112 22 19.0051 22 19.3426 21.755C19.6858 21.5074 21.6113 19.9687 21.6113 19.9687C21.6113 19.9687 22.0826 19.5455 21.5351 19.0536C20.9851 18.5617 19.315 17.4678 18.9577 17.1802C18.5998 16.8881 18.0901 17.0166 17.8698 17.2145C17.6501 17.4137 17.2576 17.7414 17.2096 17.7828C17.1379 17.8375 16.9413 18.0151 16.721 17.9266C16.4405 17.8165 15.2905 17.1961 14.2243 15.7464C13.1645 14.2981 13.048 13.8246 12.8898 13.313C12.863 13.2374 12.8626 13.1549 12.8888 13.0791C12.9149 13.0032 12.9661 12.9383 13.0339 12.8949C13.1927 12.7854 13.7774 12.3012 13.7774 12.3012C13.7774 12.3012 14.1558 11.9302 13.9976 11.493C13.8395 11.0558 12.7771 8.4919 12.7771 8.4919Z" fill="white" />
                        </svg>
                     )}
                  </span>
                  <span className={styles.home_call_wrap_right_animation_item_title}>
                     {item.title}
                  </span>
               </div>
            ))}

         </div>
      </div>
   );
}

export default HomeCallCenterAnimation;
