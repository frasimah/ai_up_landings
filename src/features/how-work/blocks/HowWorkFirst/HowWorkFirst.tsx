"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HowWorkFirst.module.scss'
import Button from '@/components/Buttons/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HowWorkFirst() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const videoRef = useRef<HTMLDivElement | null>(null);
   const messageRef = useRef<HTMLDivElement | null>(null);
   const buttonRef = useRef<HTMLDivElement | null>(null);
   const mediaRef = useRef<HTMLVideoElement | null>(null);
   const [shouldLoadVideo, setShouldLoadVideo] = useState(true);

   useEffect(() => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            const videoNode = mediaRef.current;
            if (!videoNode) return;

            if (entry.isIntersecting) {
               setShouldLoadVideo(true);
               void videoNode.play().catch(() => {});
               return;
            }

            videoNode.pause();
         },
         {
            rootMargin: '160px 0px',
            threshold: 0.1,
         }
      );

      observer.observe(sectionNode);

      return () => observer.disconnect();
   }, []);

   useLayoutEffect(() => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const ctx = gsap.context(() => {
         const videoNode = videoRef.current;
         const messageNode = messageRef.current;
         const buttonNode = buttonRef.current;
         const headerNode = sectionNode.querySelector<HTMLElement>(
            `.${styles.how_work_first_wrap_header}`
         );

         if (!videoNode || !headerNode || !buttonNode) return;

         const titleNode = headerNode.querySelector<HTMLElement>('h1, h2, h3');
         const descriptionNode = headerNode.querySelector<HTMLElement>('p');
         if (!titleNode) return;

         const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
         ).matches;

         const animatedNodes = [videoNode, messageNode, titleNode, descriptionNode, buttonNode].filter(
            Boolean
         ) as HTMLElement[];

         if (prefersReducedMotion) {
            gsap.set(animatedNodes, {
               autoAlpha: 1,
               y: 0,
               scale: 1,
               clearProps: 'transform',
            });
            return;
         }

         const isTabletOrSmaller = window.matchMedia('(max-width: 1199px)').matches;
         const initialY = isTabletOrSmaller ? 10 : 14;

         gsap.set(videoNode, { autoAlpha: 0, y: initialY, scale: 0.985 });
         if (messageNode) {
            gsap.set(messageNode, { autoAlpha: 0, y: initialY + 2, scale: 0.985 });
         }
         gsap.set(titleNode, { autoAlpha: 0, y: initialY + 2 });
         if (descriptionNode) {
            gsap.set(descriptionNode, { autoAlpha: 0, y: initialY + 2 });
         }
         gsap.set(buttonNode, { autoAlpha: 0, y: initialY, scale: 0.97 });

         const timeline = gsap.timeline({ paused: true });

         timeline.to(videoNode, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power2.out',
            delay: 0.2,
         });

         if (messageNode) {
            timeline.to(
               messageNode,
               {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.75,
                  ease: 'power2.out',
               },
               '-=0.55'
            );
         }

         timeline.to(
            titleNode,
            {
               autoAlpha: 1,
               y: 0,
               duration: 0.75,
               ease: 'power2.out',
            },
            '-=0.55'
         );

         if (descriptionNode) {
            timeline.to(
               descriptionNode,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.75,
                  ease: 'power2.out',
               },
               '-=0.6'
            );
         }

         timeline.to(
            buttonNode,
            {
               autoAlpha: 1,
               y: 0,
               scale: 1,
               duration: 0.75,
               ease: 'power2.out',
            },
            '-=0.6'
         );

         ScrollTrigger.create({
            trigger: sectionNode,
            start: isTabletOrSmaller ? 'top 92%' : 'top 86%',
            once: true,
            onEnter: () => timeline.play(0),
         });
      }, sectionNode);

      return () => ctx.revert();
   }, []);

   return (
      <section ref={sectionRef} className={styles.how_work_first}>
         <div className="container">
            <div className={styles.how_work_first_wrap}>
               <div ref={videoRef} className={styles.how_work_first_wrap_video}>
                  <video
                     ref={mediaRef}
                     src={shouldLoadVideo ? "/video/HowWork.mp4" : undefined}
                     autoPlay={true}
                     loop={true}
                     muted={true}
                     playsInline={true}
                     poster="/img/call-center/first-video-poster.png"
                     preload="metadata"
                  />
               </div>
               <div ref={messageRef} className={styles.how_work_first_wrap_message}>
                  <div className={styles.how_work_first_wrap_message_icon}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 28 28"
                        fill="none"
                     >
                        <rect width={28} height={28} rx={14} fill="#34C759" />
                        <path
                           d="M14.9535 13.0233H19V14.9535H14.9535V19H13.0233V14.9535H9V13.0233H13.0233V9H14.9535V13.0233Z"
                           fill="white"
                        />
                     </svg>
                  </div>
                  +50 идентификаций при первом пополнении
               </div>
               <SectionHeader
                  className={styles.how_work_first_wrap_header}
                  title='Контакты людей, которые вчера искали вашу услугу&nbsp;&mdash; каждое утро в&nbsp;кабинете'
                  as='h1'
                  titleSize='h1'
                  description='Ai-UP собирает только реальные действия аудитории: кто заходил на сайты, звонил компаниям, изучал услуги. Вы просто включаете нужные источники — и каждый день получаете свежие контакты по вашей нише'
                  descriptionSize='large'
                  size='small'
                  alignLeftMobile={true}
               />
               <div ref={buttonRef} className={styles.how_work_first_wrap_btn}>
                  <Button
                     variant='blue'
                  >
                     Создать источник
                  </Button>
               </div>
            </div>
         </div>
         <div className={styles.how_work_first_bg}>
            <img src="/img/first-bg.svg" alt="Декоративный фон первого экрана" />
         </div>
      </section>
   );
}

export default HowWorkFirst;
