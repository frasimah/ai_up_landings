"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef } from "react";
import styles from "./HomeGetContactSwiperFiveAnimation.module.scss";

gsap.registerPlugin(ScrambleTextPlugin);

type HomeGetContactSwiperFiveAnimationProps = {
   isActive?: boolean;
   color?: "grey" | "blue";
};

const scriptLines = ["{{script", "src='https://px.ai-", "up.ru'}}"];
const scriptLabel = "{{script src='https://px.ai-up.ru'}}";

function HomeGetContactSwiperFiveAnimation({ isActive = true, color = "grey" }: HomeGetContactSwiperFiveAnimationProps) {
   const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
   const tweenRef = useRef<gsap.core.Timeline | null>(null);
   const colorClassName = color === "blue" ? styles.scriptCodeBlue : styles.scriptCodeGrey;

   useEffect(() => {
      const lineNodes = lineRefs.current.filter((node): node is HTMLSpanElement => Boolean(node));
      if (lineNodes.length !== scriptLines.length) return;

      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reducedMotionQuery.matches) {
         lineNodes.forEach((node, index) => {
            node.textContent = scriptLines[index] ?? "";
         });

         return;
      }

      const timeline = gsap.timeline({
         repeat: -1,
         repeatDelay: 1,
      });

      lineNodes.forEach((node, index) => {
         timeline.to(
            node,
            {
               duration: 3,
               scrambleText: {
                  text: scriptLines[index] ?? "",
                  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                  revealDelay: 0.2,
                  speed: 1,
               },
            },
            0
         );
      });

      tweenRef.current = timeline;

      return () => {
         if (tweenRef.current) {
            tweenRef.current.kill();
            tweenRef.current = null;
         }
      };
   }, []);

   useEffect(() => {
      if (!tweenRef.current) return;

      if (isActive) {
         tweenRef.current.resume();
         return;
      }

      tweenRef.current.pause();
   }, [isActive]);

   return (
      <span className={`${styles.scriptCode} ${colorClassName}`} aria-label={scriptLabel}>
         {scriptLines.map((line, index) => (
            <span
               className={styles.scriptCodeLine}
               key={line}
               ref={(node) => {
                  lineRefs.current[index] = node;
               }}
            >
               {line}
            </span>
         ))}
      </span>
   );
}

export default HomeGetContactSwiperFiveAnimation;
