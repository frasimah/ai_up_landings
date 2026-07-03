"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./AiFlowFirst.module.scss";
import Button from "@/components/Buttons/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AiFlowFirst() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const videoRef = useRef<HTMLDivElement | null>(null);
   const buttonRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const ctx = gsap.context(() => {
         const videoNode = videoRef.current;
         const headerNode = sectionNode.querySelector<HTMLElement>(
            `.${styles.ai_flow_first_wrap_header}`
         );
         const buttonNode = buttonRef.current;

         if (!videoNode || !headerNode || !buttonNode) return;

         const eyebrowNode = headerNode.querySelector<HTMLElement>(
            "[class*='section_header_eyebrow']"
         );
         const titleNode = headerNode.querySelector<HTMLElement>("h1, h2, h3");
         const descriptionNode = headerNode.querySelector<HTMLElement>("p");

         if (!titleNode) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         const animatedNodes = [videoNode, eyebrowNode, titleNode, descriptionNode, buttonNode].filter(
            Boolean
         ) as HTMLElement[];

         if (prefersReducedMotion) {
            gsap.set(animatedNodes, {
               autoAlpha: 1,
               y: 0,
               scale: 1,
               clearProps: "transform",
            });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 10 : 14;

         gsap.set(videoNode, { autoAlpha: 0, y: initialY, scale: 0.985 });
         if (eyebrowNode) {
            gsap.set(eyebrowNode, { autoAlpha: 0, y: initialY + 2 });
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
            ease: "power2.out",
            delay: 0.2,
         });

         if (eyebrowNode) {
            timeline.to(
               eyebrowNode,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
               },
               "-=0.55"
            );
         }

         timeline.to(
            titleNode,
            {
               autoAlpha: 1,
               y: 0,
               duration: 0.75,
               ease: "power2.out",
            },
            "-=0.55"
         );

         if (descriptionNode) {
            timeline.to(
               descriptionNode,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.75,
                  ease: "power2.out",
               },
               "-=0.6"
            );
         }

         timeline.to(
            buttonNode,
            {
               autoAlpha: 1,
               y: 0,
               scale: 1,
               duration: 0.75,
               ease: "power2.out",
            },
            "-=0.6"
         );

         ScrollTrigger.create({
            trigger: sectionNode,
            start: isTabletOrSmaller ? "top 92%" : "top 86%",
            once: true,
            onEnter: () => timeline.play(0),
         });
      }, sectionNode);

      return () => ctx.revert();
   }, []);

   return (
      <section ref={sectionRef} className={styles.ai_flow_first}>
         <div className="container">
            <div className={styles.ai_flow_first_wrap}>
               <div ref={videoRef} className={styles.ai_flow_first_wrap_video}>
                  <video src="/video/AiFlow.mp4" autoPlay={true} loop={true} muted={true} playsInline={true} poster="/img/ai-flow/first-video-poster.png" preload="auto" />
               </div>
               <SectionHeader
                  className={styles.ai_flow_first_wrap_header}
                  title='Ai Flow — это автоматический маркетолог внутри Ai-UP'
                  as='h1'
                  description='Он распределяет лимиты между каналами и источниками на основе фактических результатов прозвона — чтобы вы стабильно получали больше лидов и меньше случайного трафика'
                  descriptionSize='large'
                  descriptionVariant='default'
               />
               <div ref={buttonRef} className={styles.ai_flow_first_wrap_btn}>
                  <Button
                     variant='blue'
                  >
                     Включить Ai Flow
                  </Button>
               </div>

            </div>
         </div>
         <div className={styles.ai_flow_first_bg}>
            <img src="/img/first-bg.svg" alt="Декоративный фон первого экрана" />
         </div>
      </section>
   );
}

export default AiFlowFirst;
