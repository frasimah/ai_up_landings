"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./FloatingBubbles.module.scss";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createBubbleFloatTweens,
  playBubblesFromCenter,
  setBubblesReducedMotion,
} from "@/lib/bubbleAnimation";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: 1,
    label: "Домен",
    badge: "-5%",

    positive: false,
  },
  {
    id: 2,
    label: "Сайт",
    badge: "+25%",

    positive: true,
  },
  {
    id: 3,
    label: "ОКВЭД",
    badge: "-10%",

    positive: false,
  },
  {
    id: 4,
    label: "Телефон",
    badge: "+30%",

    positive: true,
  }
];

type FloatingBubblesProps = {
  isActive?: boolean;
};

export function FloatingBubbles({ isActive = true }: FloatingBubblesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimation, setIsAnimation] = useState(false);
  const isActiveRef = useRef(isActive);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);
  const entranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom top",
      once: true,
      onEnter: () => {
        setIsAnimation(true);
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
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    entranceTweenRef.current?.kill();
    floatTweensRef.current.forEach((tween) => tween.kill());
    floatTweensRef.current = [];

    if (reducedMotionQuery.matches) {
      setBubblesReducedMotion(elements);

      return;
    }

    const startFloating = () => {
      floatTweensRef.current = createBubbleFloatTweens(elements);

      if (!isActiveRef.current) {
        floatTweensRef.current.forEach((tween) => {
          tween.pause();
        });
      }
    };

    entranceTweenRef.current = playBubblesFromCenter({
      container: node,
      elements,
      onComplete: startFloating,
    });

    return () => {
      entranceTweenRef.current?.kill();
      entranceTweenRef.current = null;
      floatTweensRef.current.forEach((tween) => tween.kill());
      floatTweensRef.current = [];
    };
  }, [isAnimation]);

  useEffect(() => {
    isActiveRef.current = isActive;

    floatTweensRef.current.forEach((tween) => {
      if (isActive) {
        tween.resume();
        return;
      }

      tween.pause();
    });
  }, [isActive]);


  return (
    <div ref={containerRef} className={styles.bubble}>
      {items.map((item) => (
        <div className={styles.bubble_item}
          key={item.id}
          style={{
            ...(item.positive ? {
              backgroundColor: "#34C759"
            } : {
              backgroundColor: "#D72D1E"
            })
          }}
        >
          <div className={styles.bubble_item_icon}>
            {item?.positive ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <rect width="30" height="30" rx="15" fill="white" />
                <path d="M14.5508 8.16309C14.8103 7.94685 15.1877 7.94706 15.4473 8.16309L21.7471 13.4131C22.044 13.6606 22.0844 14.1024 21.8369 14.3994C21.5894 14.6962 21.1475 14.7357 20.8506 14.4883L15.6992 10.1963V21.3008C15.6992 21.6874 15.3856 22.001 14.999 22.001C14.6127 22.0007 14.2988 21.6872 14.2988 21.3008V10.1963L9.14746 14.4883C8.85059 14.7355 8.40962 14.696 8.16211 14.3994C7.91494 14.1026 7.95445 13.6606 8.25098 13.4131L14.5508 8.16309Z" fill="#34C759" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <rect width="30" height="30" rx="15" fill="white" />
                <path d="M15.4492 21.8369C15.1897 22.0532 14.8123 22.0529 14.5527 21.8369L8.25293 16.5869C7.95598 16.3394 7.91559 15.8976 8.16309 15.6006C8.41062 15.3038 8.85249 15.2643 9.14941 15.5117L14.3008 19.8037L14.3008 8.69922C14.3008 8.31262 14.6144 7.99902 15.001 7.99902C15.3873 7.99932 15.7012 8.3128 15.7012 8.69922L15.7012 19.8037L20.8525 15.5117C21.1494 15.2645 21.5904 15.304 21.8379 15.6006C22.0851 15.8974 22.0455 16.3394 21.749 16.5869L15.4492 21.8369Z" fill="#D72D1E" />
              </svg>
            )}
          </div>
          <span className={styles.bubble_item_title}>
            {item.label}
          </span>
          <div className={styles.bubble_item_percent}
            style={{
              ...(item.positive ? {
                color: "#34C759"
              } : {
                color: "#D72D1E"
              }),
            }}
          >
            {item.badge}
          </div>
        </div>
      ))}

    </div >
  );
}
