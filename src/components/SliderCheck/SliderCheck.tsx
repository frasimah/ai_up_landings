"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import "./SliderCheck.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SliderCheckProps {
   children?: ReactNode;
   isActive?: boolean;
   isAnimation?: boolean;
}

function SliderCheck({ children, isActive = false, isAnimation = true }: SliderCheckProps) {
   const elRef = useRef<HTMLDivElement | null>(null);
   const [isSlideCheckActive, setIsSlideCheckActive] = useState(isActive);

   useEffect(() => {
      setIsSlideCheckActive(isActive);
   }, [isActive]);

   useEffect(() => {
      if (!isAnimation) return;

      const el = elRef.current;
      if (!el) return;

      const ctx = gsap.context(() => {
         ScrollTrigger.create({
            trigger: el,
            start: "top 70%",
            onEnter: () => setIsSlideCheckActive(!isSlideCheckActive),
            onLeaveBack: () => setIsSlideCheckActive(isActive),
         });
      }, el);

      return () => {
         ctx.revert();
      };
   }, [isAnimation]);

   return (
      <div
         ref={elRef}
         className={`slider_check ${isSlideCheckActive ? "active" : ""}`}
      >
         <span>{children}</span>
      </div>
   );
}

export default SliderCheck;
