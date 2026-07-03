"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './CostSavings.module.scss'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CostSavings() {
   const blockRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const blockNode = blockRef.current;
      if (!blockNode) return;

      const ctx = gsap.context(() => {
         const cards = Array.from(
            blockNode.querySelectorAll<HTMLElement>(`.${styles.cost_savings_wrap_list_it}`)
         );
         const valueSpans = Array.from(
            blockNode.querySelectorAll<HTMLElement>(`.${styles.cost_savings_wrap_list_it} p span`)
         );
         const desc = blockNode.querySelector<HTMLElement>(`.${styles.cost_savings_wrap_desc}`);

         if (!cards.length || !desc) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            gsap.set([...cards, desc], { autoAlpha: 1, y: 0, clearProps: "transform" });
            gsap.set(valueSpans, {
               clearProps:
                  "transform,backgroundImage,backgroundRepeat,backgroundPosition,backgroundSize,paddingBottom,willChange",
            });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 10 : 16;

         gsap.set(cards, { autoAlpha: 0, y: initialY });
         gsap.set(desc, { autoAlpha: 0, y: initialY });
         gsap.set(valueSpans, {
            display: "inline-block",
            backgroundImage: "linear-gradient(currentColor, currentColor)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 100%",
            backgroundSize: "0% 2px",
            paddingBottom: "1px",
            willChange: "background-size",
         });

         const cardsTimeline = gsap.timeline({ paused: true });
         cardsTimeline
            .to(cards, {
               autoAlpha: 1,
               y: 0,
               duration: 0.56,
               stagger: 0.3,
               ease: "power2.out",
            })
            .to(desc, {
               autoAlpha: 1,
               y: 0,
               duration: 0.4,
               ease: "power2.out",
            });

         const linesTimeline = gsap.timeline({ paused: true });
         let areCardsVisible = false;

         valueSpans.forEach((span, index) => {
            const pulseStart = index * 0.24;
            linesTimeline.fromTo(
               span,
               {
                  backgroundPosition: "0 100%",
                  backgroundSize: "0% 2px",
               },
               {
                  backgroundPosition: "0 100%",
                  backgroundSize: "100% 2px",
                  duration: 0.58,
                  ease: "power1.out",
               },
               pulseStart
            );
            linesTimeline.to(
               span,
               {
                  backgroundPosition: "0 100%",
                  backgroundSize: "100% 2px",
                  duration: 0.9,
                  ease: "none",
               },
               pulseStart + 0.58
            );
            linesTimeline.set(
               span,
               { backgroundPosition: "100% 100%" },
               pulseStart + 1.48
            );
            linesTimeline.to(
               span,
               {
                  backgroundPosition: "100% 100%",
                  backgroundSize: "0% 2px",
                  duration: 0.5,
                  ease: "power1.inOut",
               },
               pulseStart + 1.48
            );
         });

         ScrollTrigger.create({
            trigger: blockNode,
            start: isTabletOrSmaller ? "top 90%" : "top 84%",
            onEnter: () => {
               areCardsVisible = true;
               cardsTimeline.timeScale(1).play();
            },
         });

         ScrollTrigger.create({
            trigger: blockNode,
            start: "bottom bottom",
            onEnter: () => {
               if (!areCardsVisible) return;
               linesTimeline.timeScale(1).play(0);
            },
            onEnterBack: () => {
               if (!areCardsVisible) return;
               linesTimeline.timeScale(1).play(0);
            },
         });

         ScrollTrigger.create({
            trigger: blockNode,
            start: "top bottom",
            onLeaveBack: () => {
               areCardsVisible = false;
               cardsTimeline.pause(0);
               linesTimeline.pause(0);
               gsap.set(cards, { autoAlpha: 0, y: initialY });
               gsap.set(desc, { autoAlpha: 0, y: initialY });
               gsap.set(valueSpans, {
                  backgroundPosition: "0 100%",
                  backgroundSize: "0% 2px",
               });
            },
         });
      }, blockNode);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.cost_savings}>
         <div className="container">
            <div ref={blockRef} className={styles.cost_savings_wrap}>
               <SectionHeader
                  title='Примеры экономии'
                  titleSize='h2'
                  as='h2'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className={styles.cost_savings_wrap_list}>
                  <div className={styles.cost_savings_wrap_list_it}>
                     <span className={styles.cost_savings_wrap_list_it_icon} aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                           <rect width={60} height={60} rx={6} fill="#0169F9" />
                           <path d="M41.375 28.2857C41.375 24.7281 39.3372 18 31.625 18H28.375C20.6628 18 18.625 24.7281 18.625 28.2857C17.7268 28.2857 17 29.0524 17 30V36.8571C17 37.8047 17.7268 38.5714 18.625 38.5714H20.25V40.2857C20.25 41.2333 20.9768 42 21.875 42H23.5C24.3982 42 25.125 41.2333 25.125 40.2857V38.5714H34.875V40.2857C34.875 41.2333 35.6018 42 36.5 42H38.125C39.0232 42 39.75 41.2333 39.75 40.2857V38.5714H41.375C42.2732 38.5714 43 37.8047 43 36.8571V30C43 29.0524 42.2732 28.2857 41.375 28.2857ZM23.5 35.1429C22.6018 35.1429 21.875 34.3761 21.875 33.4286C21.875 32.481 22.6018 31.7143 23.5 31.7143C24.3982 31.7143 25.125 32.481 25.125 33.4286C25.125 34.3761 24.3982 35.1429 23.5 35.1429ZM21.875 28.2857C21.875 28.0063 21.9497 21.4286 28.375 21.4286H31.625C37.8853 21.4286 38.1185 27.591 38.125 28.2857H21.875ZM36.5 35.1429C35.6018 35.1429 34.875 34.3761 34.875 33.4286C34.875 32.481 35.6018 31.7143 36.5 31.7143C37.3982 31.7143 38.125 32.481 38.125 33.4286C38.125 34.3761 37.3982 35.1429 36.5 35.1429Z" fill="white" />
                        </svg>
                     </span>
                     <p>
                        в нише авто — заявка

                        снизилась <span>с 2800 ₽ до 540 ₽</span>
                     </p>
                  </div>
                  <div className={styles.cost_savings_wrap_list_it}>
                     <span className={styles.cost_savings_wrap_list_it_icon} aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                           <rect width={60} height={60} rx={6} fill="#0169F9" />
                           <path fillRule="evenodd" clipRule="evenodd" d="M28.9395 34.0201C30.0538 36.3524 29.6449 39.2304 27.7128 41.1622C25.2621 43.6126 21.2887 43.6126 18.838 41.1622C16.3873 38.7119 16.3873 34.7391 18.838 32.2887C20.769 30.358 23.6453 29.9486 25.9772 31.0604L31.4706 25.5678C30.4431 23.5198 30.601 21.1308 31.8812 19.3555C33.1613 17.5801 35.3549 16.708 37.5853 17.0876C37.9689 17.1522 38.2944 17.4264 38.4261 17.7957C38.5578 18.1651 38.4731 18.5663 38.2073 18.832L36.3827 20.6563C36.2157 20.8241 36.1174 21.0493 36.1056 21.2913L36.0227 22.9093C36.0075 23.2107 36.1278 23.5103 36.3509 23.7268C36.5739 23.9433 36.8767 24.0543 37.177 24.0297L38.7293 23.9063C38.9593 23.887 39.1716 23.7895 39.3313 23.6297L41.1671 21.7942C41.4329 21.5285 41.8341 21.4438 42.2035 21.5754C42.573 21.7071 42.8471 22.0325 42.9118 22.4161C43.2929 24.6466 42.4211 26.841 40.645 28.1213C38.8689 29.4016 36.4786 29.5588 34.4304 28.5299L28.9395 34.0201ZM25.4307 34.5705L22.3999 33.7585L20.1812 35.9769L20.9933 39.0072L24.0241 39.8192L26.2428 37.6008L25.4307 34.5705Z" fill="white" />
                        </svg>
                     </span>
                     <p>
                        в ремонте — <span>с 3500 ₽ до 700 ₽</span>
                     </p>
                  </div>
                  <div className={styles.cost_savings_wrap_list_it}>
                     <span className={styles.cost_savings_wrap_list_it_icon} aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                           <rect width={60} height={60} rx={6} fill="#0169F9" />
                           <path d="M19.1422 40.9832C18.6821 40.9511 18.2471 40.7799 17.8786 40.4853C17.7443 40.3783 17.5229 40.1443 17.4209 40.0031C17.2433 39.7589 17.1074 39.4382 17.0453 39.1237L17.0171 38.9761V35.4014V31.8268H21.8878H26.7586V33.0428C26.7586 34.3811 26.7594 34.3111 26.8474 34.497C26.9557 34.7266 27.1925 34.926 27.4459 35.0028C27.5217 35.0264 27.6365 35.0264 30.0157 35.0264H32.5051L32.6156 34.99C32.8888 34.898 33.1325 34.6539 33.2254 34.3774L33.2579 34.2854V33.0565V31.8273H38.129H43V35.4284V39.0295L42.9697 39.1622C42.8982 39.4694 42.792 39.7189 42.6328 39.953C42.4487 40.2219 42.2351 40.4335 41.9622 40.6148C41.6186 40.8433 41.2882 40.9528 40.8496 40.9841C40.6282 41.0055 19.3826 41.0055 19.1478 40.9832H19.1422ZM28.1467 32.7415V31.8273H30.0051H31.8637V32.7415V33.656H30.0051H28.1467V32.7415ZM17.0123 27.5569C17.0123 24.4185 17.0123 24.6344 17.0882 24.34C17.203 23.8922 17.5197 23.4326 17.9206 23.1275C18.2059 22.9107 18.4919 22.7796 18.8519 22.7002L19.0144 22.6638H21.7282H24.4418V21.3886V20.1134L24.4721 20.0065C24.6129 19.5156 25.0271 19.1286 25.5215 19.0235C25.6298 19 25.8234 19 30.0168 19H34.3984L34.5284 19.0364C35.0929 19.1904 35.4899 19.6389 35.5595 20.2001C35.5595 20.2707 35.5811 20.7585 35.5811 21.489V22.6653H38.2042C40.0158 22.6653 40.87 22.6653 40.9653 22.6867C41.4473 22.7381 41.905 22.9512 42.268 23.2944C42.6454 23.6513 42.8607 24.0267 42.9643 24.5079L42.9946 24.6534V27.5588V30.4641H29.9973H17V27.572L17.0123 27.5569ZM33.7156 21.7361V20.815H30.0051H26.2948V21.7361V22.657H30.0051H33.7156V21.7361Z" fill="white" />
                        </svg>
                     </span>
                     <p>
                        в B2B — стоимость контакта

                        упала в <span>3–5 раз</span> относительно

                        контекста
                     </p>
                  </div>
                  <div className={styles.cost_savings_wrap_list_it}>
                     <span className={styles.cost_savings_wrap_list_it_icon} aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                           <rect width={60} height={60} rx={6} fill="#0169F9" />
                           <path d="M31.9619 17.293C32.3524 16.9025 32.9854 16.9026 33.376 17.293C33.7665 17.6835 33.7665 18.3165 33.376 18.707L31.002 21.0811V25.1025C31.6314 25.231 32.2302 25.4799 32.7656 25.835L35.6699 22.9805V19.627C35.6699 19.0747 36.1177 18.627 36.6699 18.627C37.2222 18.627 37.6699 19.0747 37.6699 19.627V22.4014H40.4443C40.9964 22.4016 41.4443 22.8492 41.4443 23.4014C41.4441 23.9533 40.9963 24.4012 40.4443 24.4014H37.0791L34.1777 27.251C34.5283 27.7831 34.7739 28.3775 34.9014 29.002H38.9229L41.2969 26.6279C41.6873 26.2375 42.3204 26.2376 42.7109 26.6279C43.1015 27.0185 43.1015 27.6515 42.7109 28.042L40.751 30.002L42.7109 31.9619C43.1015 32.3524 43.1015 32.9855 42.7109 33.376C42.3204 33.7665 41.6874 33.7665 41.2969 33.376L38.9229 31.002H34.8994C34.7721 31.6256 34.5271 32.2217 34.1729 32.7578L37.084 35.6699H40.377C40.9292 35.6699 41.3769 36.1177 41.377 36.6699C41.377 37.2222 40.9292 37.6699 40.377 37.6699H37.6699V40.4443C37.6697 40.9964 37.2221 41.4443 36.6699 41.4443C36.1178 41.4443 35.6701 40.9964 35.6699 40.4443V37.084L32.7559 34.1709C32.4912 34.3457 32.2118 34.4995 31.916 34.6221C31.6198 34.7448 31.3131 34.8349 31.002 34.8984V38.9229L33.376 41.2969C33.7665 41.6874 33.7665 42.3204 33.376 42.7109C32.9855 43.1015 32.3524 43.1015 31.9619 42.7109L30.002 40.751L28.042 42.7109C27.6515 43.1015 27.0185 43.1015 26.6279 42.7109C26.2376 42.3204 26.2375 41.6873 26.6279 41.2969L29.002 38.9229V34.9004C28.388 34.775 27.8072 34.5355 27.2861 34.1982L24.4014 37.084V40.377C24.4014 40.9291 23.9535 41.3767 23.4014 41.377C22.8491 41.377 22.4014 40.9292 22.4014 40.377V37.6699H19.627C19.0747 37.6699 18.627 37.2222 18.627 36.6699C18.627 36.1177 19.0747 35.6699 19.627 35.6699H22.9863L25.8584 32.7969C25.5061 32.2745 25.2547 31.689 25.1191 31.0684H21.0146L18.707 33.376C18.3165 33.7665 17.6835 33.7665 17.293 33.376C16.9026 32.9854 16.9025 32.3524 17.293 31.9619L19.2529 30.002L17.293 28.042C16.9025 27.6515 16.9024 27.0185 17.293 26.6279C17.6835 26.2374 18.3165 26.2374 18.707 26.6279L21.1475 29.0684H25.0918C25.1553 28.7345 25.2505 28.4059 25.3818 28.0889C25.5045 27.7926 25.6569 27.5111 25.832 27.2461L22.9863 24.4014H19.627C19.0748 24.4014 18.6272 23.9535 18.627 23.4014C18.627 22.8491 19.0747 22.4014 19.627 22.4014H22.4014V19.627C22.4014 19.0747 22.8491 18.627 23.4014 18.627C23.9535 18.6272 24.4014 19.0748 24.4014 19.627V22.9863L27.2441 25.8301C27.7804 25.4756 28.378 25.2319 29.002 25.1045V21.0811L26.6279 18.707C26.2374 18.3165 26.2374 17.6835 26.6279 17.293C27.0185 16.9024 27.6515 16.9025 28.042 17.293L30.002 19.2529L31.9619 17.293ZM30.002 27.001C29.4086 27.001 28.8284 27.1772 28.335 27.5068C28.1729 27.6151 28.0236 27.7398 27.8867 27.876C27.8849 27.8778 27.8836 27.88 27.8818 27.8818C27.8794 27.8843 27.8765 27.8863 27.874 27.8887C27.6002 28.1644 27.3797 28.491 27.2295 28.8535C27.1113 29.139 27.039 29.4396 27.0127 29.7441C27.0477 29.8459 27.0683 29.9547 27.0684 30.0684C27.0684 30.172 27.0517 30.2722 27.0225 30.3662C27.0315 30.4403 27.044 30.5144 27.0586 30.5879C27.1744 31.1698 27.4604 31.7045 27.8799 32.124C28.2995 32.5437 28.8349 32.8295 29.417 32.9453C29.999 33.061 30.6022 33.0015 31.1504 32.7744C31.6987 32.5473 32.1673 32.1624 32.4971 31.6689C32.8267 31.1755 33.0029 30.5954 33.0029 30.002C33.0029 29.2149 32.6928 28.4603 32.1416 27.8994C32.1333 27.8915 32.1243 27.8842 32.1162 27.876C32.1111 27.8708 32.1066 27.8647 32.1016 27.8594C31.541 27.3101 30.7876 27.001 30.002 27.001Z" fill="white" />
                        </svg>
                     </span>
                     <p>
                        в сезонных услугах — расход

                        рекламы снизился <span>на 60–80%</span>
                     </p>
                  </div>
               </div>
               <div className={styles.cost_savings_wrap_desc}>
                  ROI стабилен, потому что Ai-UP не зависит от рекламных алгоритмов.
               </div>
            </div>
         </div>
      </section>
   );
}

export default CostSavings;
