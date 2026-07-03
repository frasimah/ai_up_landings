"use client";

import styles from './HomeRegFrame.module.scss'
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HomeRegFrameProps = {
   isActive?: boolean;
};

function HomeRegFrame({ isActive = true }: HomeRegFrameProps) {

   const containerRef = useRef<HTMLDivElement>(null);
   const [isAnimation, setSsAnimation] = useState(false);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);
   const entranceTweenRef = useRef<gsap.core.Tween | null>(null);

   useEffect(() => {
      if (!containerRef.current) return;

      const scrollTrigger = ScrollTrigger.create({
         trigger: containerRef.current,
         start: "top 80%",
         end: "bottom top",
         onEnter: () => {
            setSsAnimation(true)
         },
      });

      return () => {
         scrollTrigger.kill();
      };
   }, []);

   useEffect(() => {
      const node = containerRef.current;
      if (!node || !isAnimation) return;

      const elements = Array.from(node.children) as HTMLElement[];

      entranceTweenRef.current = gsap.fromTo(
         elements,
         { opacity: 0, scale: 0.5, y: 20 },
         { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
      );

      floatTweensRef.current = elements.map((el, index) => {
         const tween = gsap.to(el, {
            y: "-=15",
            rotation: index % 2 === 0 ? -2 : 2,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random(),
         });

         if (!isActive) {
            tween.pause();
         }

         return tween;
      });

      return () => {
         entranceTweenRef.current?.kill();
         entranceTweenRef.current = null;
         floatTweensRef.current.forEach((tween) => tween.kill());
         floatTweensRef.current = [];
      };
   }, [isAnimation, isActive]);

   useEffect(() => {
      floatTweensRef.current.forEach((tween) => {
         if (isActive) {
            tween.resume();
            return;
         }

         tween.pause();
      });
   }, [isActive]);

   return (
      <div className="empty" ref={containerRef}>
         <div className={styles.home_reg_wrap_frame} >
            <div className={styles.home_reg_wrap_frame_icon}>
               <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                  <rect width={40} height={40} rx={20} fill="white" />
                  <path d="M20.6442 18.8279H25.5V21.1442H20.6442V26H18.3279V21.1442H13.5V18.8279H18.3279V14H20.6442V18.8279Z" fill="#34C759" />
               </svg>
            </div>
            <div className={styles.home_reg_wrap_frame_content}>
               <div className={styles.home_reg_wrap_frame_content_title}>
                  +50 идентификаций в подарок
               </div>
               <div className={styles.home_reg_wrap_frame_content_text}>
                  при первом пополнении баланса
               </div>
            </div>
         </div>
      </div>
   );
}

export default HomeRegFrame;
