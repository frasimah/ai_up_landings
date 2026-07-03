"use client";

import "./CheckBox.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
   className?: string;
   variant?: "default" | "white";
   isAnimation?: boolean;
   active?: boolean;
};

function CheckBox({
   className,
   variant = "default",
   isAnimation = true,
   active = false,
}: Props) {
   const rootRef = useRef<HTMLSpanElement>(null);
   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      if (!isAnimation) {
         setIsActive(active);
         return;
      }

      if (!rootRef.current) return;

      const root = rootRef.current;

      const st = ScrollTrigger.create({
         trigger: root,
         start: "top 80%",
         onEnter: () => {
            setIsActive(true);
         },
         onLeaveBack: () => {
            setIsActive(false);
         },
      });

      return () => {
         st.kill();
      };
   }, [isAnimation, active]);

   return (
      <span
         ref={rootRef}
         className={`custom-check ${className ?? ""} ${isActive ? "active" : ""} custom-check-${variant}`}
      >
         <svg
            width={35}
            height={34}
            viewBox="0 0 35 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M10 17.5555L14.6154 22L25 12"
               stroke="white"
               strokeWidth={2}
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      </span>
   );
}

export default CheckBox;