"use client";

export { default } from "./HeaderOtherStable";

/*

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./HeaderOther.module.scss";
import Button from "../Buttons/Button";
import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HeaderOther() {
   const headerRef = useRef<HTMLElement | null>(null);
   const [isActiveBurger, setActiveBurger] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      const headerEl = headerRef.current;
      if (!headerEl) return;

      // На случай, если страница уже открылась со скроллом (back/forward, якоря)
      const setActive = (v: boolean) => headerEl.classList.toggle(styles.active, v);
      setActive(window.scrollY > 100);

      const st = ScrollTrigger.create({
         start: 100, // как только ушли от верха на 1px
         end: 999999, // по сути "всегда дальше"
         onEnter: () => setActive(true),
         onLeaveBack: () => setActive(false),
      });

      return () => {
         st.kill();
      };
   }, []);

   const hundleBurger = () => {
      setActiveBurger(!isActiveBurger);
   };

   const closeBurger = () => {
      setActiveBurger(false);
   };

   useEffect(() => {
      closeBurger();
   }, [pathname]);

   return (
      <header className={styles.header} ref={headerRef}>
         <div className="container">
            <div className={styles.header_wrap}>
               <Link href={'/'} className={`${styles.header_wrap_logo} ${isActiveBurger ? styles.active : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={66} height={30} viewBox="0 0 66 30" fill="none">
                     <path d="M31.7782 6.9509C30.7701 6.9509 29.8917 6.618 29.1428 5.95221C28.394 5.25978 28.0195 4.43419 28.0195 3.47545C28.0195 2.5167 28.394 1.70444 29.1428 1.03864C29.8917 0.346214 30.7701 0 31.7782 0C32.8438 0 33.7367 0.346214 34.4567 1.03864C35.2056 1.70444 35.58 2.5167 35.58 3.47545C35.58 4.43419 35.2056 5.25978 34.4567 5.95221C33.7367 6.618 32.8438 6.9509 31.7782 6.9509ZM28.8404 18.4809V10.2266H34.7592V18.4809H28.8404Z" fill="#080808" />
                     <path d="M0 29.6664L12.4256 1.80469L17.6638 1.80469L30.13 29.6664H23.9578L21.156 23.3092H8.8522L6.09097 29.6664H0ZM15.0244 9.29988L11.045 18.3255H18.9632L15.0244 9.29988Z" fill="#080808" />
                     <path d="M63.1194 2.36903C65.0379 3.86904 65.9971 5.74405 65.9971 7.99405C65.9971 10.2441 65.0379 12.1301 63.1194 13.6522C61.201 15.1522 58.7962 15.9022 55.905 15.9022H52.2168H46.3398V0.0859375L55.905 0.0859375C58.7962 0.0859375 61.201 0.84697 63.1194 2.36903ZM59.0664 10.4426C59.877 9.80289 60.2823 8.9867 60.2823 7.99405C60.2823 7.0014 59.877 6.18522 59.0664 5.54552C58.2558 4.90581 57.175 4.58596 55.824 4.58596H52.2168V11.4022H55.824C57.175 11.4022 58.2558 11.0823 59.0664 10.4426Z" fill="#080808" />
                     <path d="M52.2168 15.9022H46.3398V18.4809H52.2168V15.9022Z" fill="#080808" />
                     <path d="M40.5149 29.9985C37.0342 29.9985 34.2147 29.0722 32.0561 27.2196C29.8976 25.367 28.8184 22.9123 28.8184 19.8555H34.6869L34.6869 19.9249C34.6869 21.546 35.213 22.8196 36.2653 23.7459C37.3176 24.6722 38.7341 25.1354 40.5149 25.1354C42.2957 25.1354 43.7122 24.6722 44.7645 23.7459C45.8167 22.8196 46.3429 21.546 46.3429 19.9249L46.3429 19.8555H52.2114C52.2114 22.8891 51.1186 25.3438 48.9331 27.2196C46.7476 29.0722 43.9415 29.9985 40.5149 29.9985Z" fill="#080808" />
                  </svg>
               </Link>
               <nav
                  className={`${styles.header_wrap_nav} ${isActiveBurger ? styles.active : ''}`}
                  onClickCapture={closeBurger}
               >
                  <ul>
                     <li>
                        <Link href={'/how-work'}>
                           Как это работает
                        </Link>
                     </li>
                     <li>
                        <Link href={'/call-center'}>
                           Колл-центр
                        </Link>
                     </li>
                     <li>
                        <Link href={'/cost'}>
                           Стоимость услуг
                        </Link>
                     </li>
                     <li>
                        <Link href={'/knowledge-base'}>
                           База знаний
                        </Link>
                     </li>
                     <li>
                        <Link href={'/blog'}>
                           Блог
                        </Link>
                     </li>
                     <li>
                        <Link href={'/about'}>
                           О нас
                        </Link>
                     </li>
                  </ul>
               </nav>
               <div className={styles.header_wrap_right}>
                  <Button variant={"black"} noBorder>Войти</Button>
                  <Button variant={"blue"} noBorder>Создать аккаунт</Button>
                  <button
                     type="button"
                     aria-label="Меню"
                     className={`${styles.header_wrap_right_burger} ${isActiveBurger ? styles.active : ''}`}
                     onClick={hundleBurger}
                  >
                     <span></span>
                  </button>
               </div>
            </div>
         </div>
      </header>
   );
}

export default HeaderOther;
*/
