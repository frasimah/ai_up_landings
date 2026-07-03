"use client";

import { useLayoutEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../CallCenterAcademy.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CallCenterAcademySwiper() {
   const dataList = [
      "дикцию",
      "грамотность",
      "стрессоустойчивость",
      "поведение в симуляциях",
      "работу по скрипту",
   ];

   const rootRef = useRef<HTMLDivElement | null>(null);
   const resultBadgeRef = useRef<HTMLDivElement | null>(null);
   const minValueRef = useRef<HTMLSpanElement | null>(null);
   const maxValueRef = useRef<HTMLSpanElement | null>(null);
   const counterStartedRef = useRef(false);

   useLayoutEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const ctx = gsap.context(() => {
         const slides = Array.from(
            root.querySelectorAll<HTMLElement>(".swiper-slide")
         );
         const resultBadge = resultBadgeRef.current;

         // старт: скрыты
         gsap.set(slides, { autoAlpha: 0, y: 24 });

         const show = (targets: gsap.TweenTarget) =>
            gsap.to(targets, {
               autoAlpha: 1,
               y: 0,
               duration: 0.8,
               ease: "power2.out",
               stagger: 0.12,
               overwrite: true,
            });

         // ✅ плавно скрываем
         const hide = (targets: gsap.TweenTarget) =>
            gsap.to(targets, {
               autoAlpha: 0,
               y: 24,
               duration: 0.45,
               ease: "power2.inOut",
               stagger: 0.08,     // можно убрать, если хочешь без стаггера на скрытии
               overwrite: true,
            });

         ScrollTrigger.batch(slides, {
            start: "top 85%",
            onEnter: (batch) => show(batch),
            onLeaveBack: (batch) => hide(batch),
         });

         if (!resultBadge) return;

         const animateCounter = () => {
            if (counterStartedRef.current) return;
            counterStartedRef.current = true;

            const minTarget = minValueRef.current;
            const maxTarget = maxValueRef.current;
            if (!minTarget || !maxTarget) return;

            const counterState = { min: 0, max: 0 };

            gsap.to(counterState, {
               min: 7,
               max: 10,
               duration: 3,
               delay: 0.25,
               ease: "power2.out",
               onUpdate: () => {
                  minTarget.textContent = String(Math.round(counterState.min));
                  maxTarget.textContent = String(Math.round(counterState.max));
               },
            });
         };

         if (prefersReducedMotion) {
            if (minValueRef.current) minValueRef.current.textContent = "7";
            if (maxValueRef.current) maxValueRef.current.textContent = "10";
            return;
         }

         ScrollTrigger.create({
            trigger: resultBadge,
            start: "top 85%",
            once: true,
            onEnter: animateCounter,
         });
      }, root);

      return () => ctx.revert();
   }, []);

   return (
      <div ref={rootRef}>
         <Swiper
            className={styles.call_center_academy_wrap_main}
            enabled={false}
            slidesPerView={"auto"}
            spaceBetween={0}
            speed={800}
            breakpoints={{
               0: {
                  spaceBetween: 7,
                  enabled: true,
                  slidesPerView: "auto",
               },
               1200: {
                  spaceBetween: 0,
                  enabled: false,
                  slidesPerView: "auto",
               },
            }}
         >
            <SwiperSlide className={styles.call_center_academy_wrap_main_it}>
               <div className={styles.call_center_academy_wrap_main_it_head}>
                  <div className={styles.call_center_academy_wrap_main_it_head_title}>
                     Отбор (ужесточённый)
                  </div>
                  <div className={styles.call_center_academy_wrap_main_it_head_text}>
                     <p>Проходит только 4–7% кандидатов. Мы проверяем:</p>
                  </div>
               </div>
               <ul className={styles.call_center_academy_wrap_main_it_list}>
                  {dataList.map((item, i) => (
                     <li
                        className={styles.call_center_academy_wrap_main_it_list_it}
                        key={item + i}
                     >
                        <div className={styles.call_center_academy_wrap_main_it_list_it_icon}>
                           <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                              <rect width={28} height={28} rx={14} fill="#0169F9" />
                              <path d="M6 14.5555L10.6154 19L21 9" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </div>
                        {item}
                     </li>
                  ))}
               </ul>
            </SwiperSlide>

            <SwiperSlide className={styles.call_center_academy_wrap_main_it}>
               <div className={styles.call_center_academy_wrap_main_it_head}>
                  <div className={styles.call_center_academy_wrap_main_it_head_title}>Обучение</div>
                  <div className={styles.call_center_academy_wrap_main_it_head_text}>
                     <ul>
                        <li>структура звонка</li>
                        <li>что говорить, а что не говорить</li>
                        <li>как объяснить “откуда звонок” без раздражения</li>
                        <li>как выявить потребность</li>
                        <li>как корректно завершить разговор</li>
                        <li>как ставить статусы так, чтобы вы поняли ситуацию за секунду</li>
                     </ul>
                  </div>
               </div>
            </SwiperSlide>

            <SwiperSlide className={styles.call_center_academy_wrap_main_it}>
               <div className={styles.call_center_academy_wrap_main_it_head}>
                  <div className={styles.call_center_academy_wrap_main_it_head_title}>Экзамен</div>
                  <div className={styles.call_center_academy_wrap_main_it_head_text}>
                     <p>Проверяем:</p>
                     <ul>
                        <li>чистоту речи</li>
                        <li>работу по структуре</li>
                        <li>умение слушать</li>
                        <li>корректную фиксацию</li>
                     </ul>
                  </div>
               </div>
            </SwiperSlide>

            <SwiperSlide className={styles.call_center_academy_wrap_main_it}>
               <div className={styles.call_center_academy_wrap_main_it_head}>
                  <div className={styles.call_center_academy_wrap_main_it_head_title}>Постоянный контроль качества</div>
                  <div className={styles.call_center_academy_wrap_main_it_head_text}>
                     <ul>
                        <li>
                           ежедневное прослушивание
                        </li>
                        <li>
                           разбор сложных звонков
                        </li>
                        <li>
                           обновление рекомендаций
                        </li>
                        <li>
                           ротация операторов при снижении качества
                        </li>
                     </ul>
                  </div>
               </div>
            </SwiperSlide>

            <SwiperSlide className={styles.call_center_academy_wrap_main_it}>
               <div className={styles.call_center_academy_wrap_main_it_head}>
                  <div className={styles.call_center_academy_wrap_main_it_head_title}>Результат</div>
                  <div className={styles.call_center_academy_wrap_main_it_head_text}>
                     <p>конверсия в квалификацию выросла на 7–10% после запуска Академии</p>
                  </div>
               </div>
               <div ref={resultBadgeRef} className={styles.call_center_academy_wrap_main_it_last}>
                  <div className={styles.call_center_academy_wrap_main_it_last_icon}>
                     <svg xmlns="http://www.w3.org/2000/svg" width={15} height={16} viewBox="0 0 15 16" fill="none">
                        <path d="M7.5 15L7.5 1M7.5 1L14 6.83333M7.5 1L1 6.83333" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>
                  +<span>7</span>-<span>10</span>%
               </div>
            </SwiperSlide>
         </Swiper>
      </div>
   );
}

export default CallCenterAcademySwiper;

