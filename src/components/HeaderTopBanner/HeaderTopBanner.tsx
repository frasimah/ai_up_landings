"use client";

import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import styles from "./HeaderTopBanner.module.scss";

const BANNER_ENTER_DELAY_MS = 180;
const BANNER_EXIT_DURATION_MS = 280;

type HeaderTopBannerProps = {
   onHeightChange?: (height: number) => void;
   onVisibilityChange?: (isVisible: boolean) => void;
};

type BannerPhase = "hidden" | "entering" | "visible" | "exiting";

function SkolkovoIcon() {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path
            d="M23.96 0C24.0218 0.397195 23.9913 2.00013 23.9912 2.47266L23.9893 7.79395V15.1807C23.9894 16.3704 24.0348 17.7953 23.9336 18.9658C23.87 19.7008 23.3177 20.8995 22.875 21.5059C22.1185 22.5591 21.0465 23.3446 19.8145 23.749C19.4827 23.8547 19.0431 23.8591 18.7559 24H5.19922C5.14964 23.9719 5.0592 23.9262 5.00293 23.916C4.43677 23.8133 3.92003 23.6658 3.40332 23.4121C1.88264 22.6693 0.74105 21.3252 0.254883 19.7041C0.129259 19.2771 0.147637 18.796 0 18.3633V5.79297C0.0681506 5.44482 0.0994599 5.09667 0.165039 4.75C0.481652 3.07701 1.61939 1.66937 3.06348 0.829102C4.52228 -0.0197287 5.92584 0.0684189 7.53613 0.0703125L10.6963 0.0732422L21.4639 0.0712891C21.7829 0.071918 23.7753 0.129889 23.9287 0H23.96ZM7.39453 0.882812C7.06902 0.882413 5.98512 0.858941 5.73633 0.892578C3.33784 1.19283 1.50904 2.56165 0.99707 5.03223C0.764892 6.15296 0.834223 7.31101 0.834961 8.45215L0.837891 12.5371L0.835938 16.0039C0.835814 16.9106 0.82818 17.6436 0.913086 18.5488C1.1244 20.8018 2.82649 22.6179 5.02344 23.0811C5.7078 23.2249 6.43088 23.1899 7.13574 23.1895L9.31934 23.1885C12.2707 23.1865 15.3591 23.138 18.2988 23.1885C19.9193 22.977 21.0474 22.4257 22.0811 21.126C23.4391 19.4182 23.1523 17.2466 23.1523 15.2031L23.1514 8.90039L23.1523 3.77539C23.1528 3.07321 23.1937 1.64401 23.1084 0.99707C23.1035 0.959618 23.0976 0.922107 23.0918 0.884766L10.9678 0.885742L7.39453 0.882812ZM7.62109 5.96191C7.836 5.92789 8.62189 5.92365 8.84277 5.94434C10.1456 6.06632 11.098 6.40831 11.959 7.39941C11.9552 6.95363 11.9636 6.5078 11.9844 6.0625L14.2344 6.06348C14.1936 6.63081 14.2237 7.39975 14.2188 7.98438C14.2074 9.3278 14.2417 10.6841 14.2178 12.0273C14.8158 11.1095 16.0345 10.088 16.7412 9.20605C16.7875 9.14827 16.9474 9.06043 17.0195 9.02441C17.9476 9.0292 18.8757 9.02903 19.8037 9.02344C19.5771 9.38575 19.2334 9.7089 18.959 10.0342C18.2395 10.8873 17.2785 11.7564 16.5996 12.624C16.7857 12.9832 17.1941 13.6137 17.4209 13.9873L18.9189 16.4648C19.1551 16.8522 19.6507 17.6177 19.8008 18.0039C18.9584 18.0129 18.1158 18.0136 17.2734 18.0059C16.831 17.6369 15.4464 15.0657 14.9717 14.3682L14.6475 14.7461C14.5031 14.8984 14.36 15.0733 14.2236 15.2344C14.2097 16.1518 14.221 17.1007 14.2207 18.0205C13.5655 17.9818 12.6497 18.0101 11.9824 18.0205C11.9572 17.6931 11.9318 17.4183 11.9473 17.0898C11.9391 17.0979 11.9302 17.1054 11.9219 17.1133C10.1812 18.7729 5.96758 18.4439 4.73535 16.2764C4.37771 15.6473 4.14247 15.0147 4.1582 14.2861C4.85839 14.2819 5.81125 14.3113 6.48145 14.2568C6.74234 14.7669 6.82237 15.2188 7.34668 15.5371C8.30555 16.119 10.1497 16.0747 10.8037 15.0449C10.9443 14.8234 11.0105 14.4046 10.9307 14.1768C10.5024 12.9553 8.56976 13.1576 7.55371 12.8662C6.85445 12.7308 6.33649 12.5532 5.72852 12.1797C4.18973 11.2343 3.88774 9.09663 4.84375 7.63184C5.54077 6.56397 6.39968 6.21502 7.62109 5.96191ZM8.07324 8.04688C7.17296 8.2817 6.7375 8.48883 6.57422 9.47656C6.63919 9.65314 6.71968 9.89056 6.80078 10.0547C8.06199 11.0319 9.67153 10.6718 11.0791 11.2207C11.4778 11.3588 11.6201 11.4169 11.9678 11.6797C11.9369 10.989 11.9934 10.3438 11.9238 9.64844C11.5295 9.63849 11.1346 9.63844 10.7402 9.64746C10.6388 9.46135 10.5684 9.28854 10.4736 9.10352C9.98453 8.14931 9.04142 7.97839 8.07324 8.04688Z"
            fill="white"
         />
      </svg>
   );
}

function HeaderTopBanner({
   onHeightChange,
   onVisibilityChange,
}: HeaderTopBannerProps) {
   const [bannerHeight, setBannerHeight] = useState(0);
   const [phase, setPhase] = useState<BannerPhase>("hidden");
   const bannerContentId = useId();
   const bannerRef = useRef<HTMLDivElement | null>(null);
   const bannerCardRef = useRef<HTMLElement | null>(null);
   const enterTimerRef = useRef<number | null>(null);
   const exitTimerRef = useRef<number | null>(null);
   const hasStartedRef = useRef(false);

   const shouldReserveSpace = phase === "entering" || phase === "visible";
   const isBannerInteractive = phase === "visible";

   useEffect(() => {
      if (!bannerCardRef.current) {
         return;
      }

      const measureBanner = () => {
         const nextHeight = Math.ceil(
            bannerCardRef.current?.getBoundingClientRect().height ?? 0,
         );

         setBannerHeight((currentHeight) =>
            currentHeight === nextHeight ? currentHeight : nextHeight,
         );
      };

      measureBanner();

      if (typeof ResizeObserver === "undefined") {
         return;
      }

      const resizeObserver = new ResizeObserver(measureBanner);
      resizeObserver.observe(bannerCardRef.current);

      return () => {
         resizeObserver.disconnect();
      };
   }, []);

   useEffect(() => {
      if (!bannerHeight || hasStartedRef.current) {
         return;
      }

      hasStartedRef.current = true;
      const frameId = window.requestAnimationFrame(() => {
         setPhase("entering");
      });

      enterTimerRef.current = window.setTimeout(() => {
         setPhase("visible");
      }, BANNER_ENTER_DELAY_MS);

      return () => {
         window.cancelAnimationFrame(frameId);

         if (enterTimerRef.current !== null) {
            window.clearTimeout(enterTimerRef.current);
            enterTimerRef.current = null;
         }
      };
   }, [bannerHeight]);

   useEffect(() => {
      onVisibilityChange?.(shouldReserveSpace);
   }, [onVisibilityChange, shouldReserveSpace]);

   useEffect(() => {
      onHeightChange?.(shouldReserveSpace ? bannerHeight : 0);
   }, [bannerHeight, onHeightChange, shouldReserveSpace]);

   useEffect(() => {
      return () => {
         if (enterTimerRef.current !== null) {
            window.clearTimeout(enterTimerRef.current);
         }

         if (exitTimerRef.current !== null) {
            window.clearTimeout(exitTimerRef.current);
         }
      };
   }, []);

   const handleClose = () => {
      if (enterTimerRef.current !== null) {
         window.clearTimeout(enterTimerRef.current);
         enterTimerRef.current = null;
      }

      setPhase("exiting");

      exitTimerRef.current = window.setTimeout(() => {
         setPhase("hidden");
      }, BANNER_EXIT_DURATION_MS);
   };

   return (
      <div
         ref={bannerRef}
         style={{ "--banner-height": `${bannerHeight}px` } as CSSProperties}
         className={[
            styles.banner,
            phase === "entering" ? styles.bannerEntering : "",
            phase === "visible" ? styles.bannerVisible : "",
            phase === "exiting" ? styles.bannerExiting : "",
         ].join(" ")}
         aria-hidden={!isBannerInteractive}
      >
         <div className="container">
            <section
               ref={bannerCardRef}
               className={styles.bannerCard}
               aria-label="Уведомление о статусе участника проекта Сколково"
               aria-live="polite"
            >
               <div className={styles.bannerLogo}>
                  <SkolkovoIcon />
               </div>
               <div className={styles.bannerBody} id={bannerContentId}>
                  <span
                     className={styles.bannerText}
                  // href="/"
                  // target="_blank"
                  // rel="noreferrer"
                  >
                     AI-UP получил статус участника проекта «Сколково»
                  </span>
                  {/* <span className={styles.bannerSeparator} aria-hidden="true">
                     •
                  </span>
                  <a
                     className={styles.bannerLink}
                     href="/"
                     target="_blank"
                     rel="noreferrer"
                  >
                     подробнее
                  </a> */}
               </div>
               <button
                  type="button"
                  className={styles.bannerClose}
                  aria-controls={bannerContentId}
                  aria-label="Скрыть уведомление"
                  onClick={handleClose}
               >
                  <svg
                     className={styles.desktop}
                     xmlns="http://www.w3.org/2000/svg"
                     width="20"
                     height="20"
                     viewBox="0 0 20 20"
                     fill="none"
                  >
                     <path
                        d="M9.99978 10.5893L5.62812 14.961C5.55034 15.0387 5.45478 15.0804 5.34145 15.086C5.22812 15.0915 5.12701 15.0499 5.03812 14.961C4.94923 14.8721 4.90479 14.7737 4.90479 14.666C4.90479 14.5582 4.94923 14.4599 5.03812 14.371L9.40978 9.9993L5.03812 5.62763C4.96034 5.54985 4.91867 5.4543 4.91312 5.34096C4.90756 5.22763 4.94923 5.12652 5.03812 5.03763C5.12701 4.94874 5.22534 4.9043 5.33312 4.9043C5.4409 4.9043 5.53923 4.94874 5.62812 5.03763L9.99978 9.4093L14.3715 5.03763C14.4492 4.95985 14.5451 4.91819 14.659 4.91263C14.7717 4.90707 14.8726 4.94874 14.9615 5.03763C15.0503 5.12652 15.0948 5.22485 15.0948 5.33263C15.0948 5.44041 15.0503 5.53874 14.9615 5.62763L10.5898 9.9993L14.9615 14.371C15.0392 14.4487 15.0809 14.5446 15.0865 14.6585C15.092 14.7712 15.0503 14.8721 14.9615 14.961C14.8726 15.0499 14.7742 15.0943 14.6665 15.0943C14.5587 15.0943 14.4603 15.0499 14.3715 14.961L9.99978 10.5893Z"
                        fill="white"
                     />
                  </svg>
                  <svg
                     className={styles.mobile}
                     xmlns="http://www.w3.org/2000/svg"
                     width="10"
                     height="10"
                     viewBox="0 0 10 10"
                     fill="none"
                  >
                     <path
                        d="M5 5.579L0.709846 9.86915C0.633519 9.94548 0.539745 9.98637 0.428524 9.99182C0.317304 9.99727 0.218079 9.95638 0.130847 9.86915C0.0436156 9.78192 0 9.68542 0 9.57965C0 9.47388 0.0436156 9.37738 0.130847 9.29015L4.421 5L0.130847 0.709846C0.0545196 0.633519 0.0136297 0.539745 0.00817775 0.428524C0.00272578 0.317304 0.0436156 0.218079 0.130847 0.130847C0.218079 0.0436156 0.314578 0 0.420347 0C0.526115 0 0.622615 0.0436156 0.709846 0.130847L5 4.421L9.29015 0.130847C9.36648 0.0545196 9.46053 0.0136297 9.57229 0.00817775C9.68297 0.00272578 9.78192 0.0436156 9.86915 0.130847C9.95638 0.218079 10 0.314578 10 0.420347C10 0.526115 9.95638 0.622615 9.86915 0.709846L5.579 5L9.86915 9.29015C9.94548 9.36648 9.98637 9.46053 9.99182 9.57229C9.99727 9.68297 9.95638 9.78192 9.86915 9.86915C9.78192 9.95638 9.68542 10 9.57965 10C9.47388 10 9.37738 9.95638 9.29015 9.86915L5 5.579Z"
                        fill="white"
                     />
                  </svg>
               </button>
            </section>
         </div>
      </div>
   );
}

export default HeaderTopBanner;
