"use client"
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeNumbers.module.scss'
import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomeNumbers() {

   const data = [
      {
         col: 'col-xl-3',
         number: "5–20%",
         text: "конверсия из контакта в квал. лид",
         icon: `
         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="40" viewBox="0 0 34 40" fill="none">
  <g filter="url(#filter0_i_1697_65)">
    <path d="M1.25195 24.1426C2.27608 23.729 3.44177 24.2239 3.85547 25.248C4.83662 27.6768 6.47929 29.7817 8.59668 31.3232L8.99805 31.6045C11.0275 32.9758 13.3862 33.7921 15.8359 33.9678C18.448 34.155 21.0587 33.6056 23.374 32.3818L23.8037 32.1455C24.8367 31.5524 25.7845 30.8307 26.6289 30.0029H20.835C19.7304 30.0029 18.835 29.1075 18.835 28.0029C18.835 26.8984 19.7304 26.0029 20.835 26.0029H30.834C31.9384 26.003 32.8339 26.8985 32.834 28.0029V38.0039C32.834 39.1084 31.9385 40.0038 30.834 40.0039C29.7294 40.0039 28.834 39.1085 28.834 38.0039V33.418C27.7485 34.3896 26.5439 35.2305 25.2432 35.918C22.266 37.4916 18.9086 38.1978 15.5498 37.957C12.1919 37.7163 8.96532 36.5394 6.24219 34.5566C3.5198 32.5746 1.40784 29.8686 0.146484 26.7461C-0.267219 25.7219 0.227794 24.5563 1.25195 24.1426ZM2.83691 0C3.94139 8.76939e-05 4.83689 0.895508 4.83691 2V6.58398C5.92233 5.61285 7.12668 4.77202 8.42676 4.08496C11.4042 2.5115 14.7644 1.8051 18.123 2.0459C21.482 2.28676 24.7055 3.46634 27.4277 5.44824C30.15 7.43022 32.262 10.1363 33.5234 13.2588C33.9371 14.2829 33.4421 15.4486 32.418 15.8623C31.3938 16.276 30.2282 15.781 29.8145 14.7568C28.8333 12.3281 27.1906 10.2231 25.0732 8.68164C22.9557 7.13998 20.4487 6.22342 17.8369 6.03613C15.2247 5.84885 12.6113 6.39843 10.2959 7.62207C9.09579 8.25631 8.00135 9.05982 7.04102 10.001H12.8359C13.9403 10.0011 14.8358 10.8966 14.8359 12.001C14.8359 13.1055 13.9404 14.0008 12.8359 14.001H2.83691C1.73234 14.001 0.836914 13.1055 0.836914 12.001V2C0.836941 0.895454 1.73236 0 2.83691 0Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_i_1697_65" x="0" y="0" width="33.6699" height="42.0039" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1697_65"/>
    </filter>
  </defs>
</svg>
         `
      },
      {
         col: 'col-xl-6',
         number: "7 400 000 ₽",
         text: "заработали партнёры  по реферальной программе",
         icon: `
         <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
  <g filter="url(#filter0_i_1697_72)">
    <path d="M42 40C43.1046 40 44 40.8954 44 42C44 43.1046 43.1046 44 42 44H2C0.895431 44 0 43.1046 0 42C0 40.8954 0.895431 40 2 40H42ZM22 0C23.1046 0 24 0.895431 24 2V27.1719L30.5859 20.5859C31.367 19.8049 32.633 19.8049 33.4141 20.5859C34.1951 21.367 34.1951 22.633 33.4141 23.4141L23.4141 33.4141C23.039 33.7891 22.5304 34 22 34C21.4696 34 20.961 33.7891 20.5859 33.4141L10.5859 23.4141C9.80489 22.633 9.80489 21.367 10.5859 20.5859C11.367 19.8049 12.633 19.8049 13.4141 20.5859L20 27.1719V2C20 0.895431 20.8954 0 22 0Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_i_1697_72" x="0" y="0" width="44" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1697_72"/>
    </filter>
  </defs>
</svg>
         `
      },
      {
         col: 'col-xl-3',
         number: "73%",
         text: "средний дозвон",
         icon: ``
      },
      {
         col: 'col-xl-6',
         number: "более 10 000",
         text: "зарегистрированных пользователей",
         icon: `
         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="40" viewBox="0 0 34 40" fill="none">
  <g filter="url(#filter0_i_1697_83)">
    <path d="M16.999 0C17.5294 0.000102709 18.0381 0.210888 18.4131 0.585938L33.4121 15.5869C34.1928 16.368 34.1929 17.6341 33.4121 18.415C32.6311 19.1959 31.365 19.1958 30.584 18.415L18.999 6.82812V38.0029C18.9989 39.1073 18.1034 40.0027 16.999 40.0029C15.8945 40.0029 14.9991 39.1074 14.999 38.0029V6.82812L3.41406 18.415C2.63316 19.196 1.36703 19.1957 0.585938 18.415C-0.195053 17.634 -0.195009 16.368 0.585938 15.5869L15.585 0.585938C15.96 0.210868 16.4686 0 16.999 0Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_i_1697_83" x="0" y="0" width="33.998" height="42.002" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1697_83"/>
    </filter>
  </defs>
</svg>
         `
      },
      {
         col: 'col-xl-6',
         number: "более 7 000 000",
         text: "выданных идентификаций",
         icon: `
         <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
  <path d="M2 4C0.895432 4 0 3.10457 0 2C0 0.895432 0.895432 0 2 0L42 0C43.1046 0 44 0.895432 44 2C44 3.10457 43.1046 4 42 4L2 4ZM22 44C20.8954 44 20 43.1046 20 42L20 16.8281L13.4141 23.4141C12.633 24.1951 11.367 24.1951 10.5859 23.4141C9.80489 22.633 9.80489 21.367 10.5859 20.5859L20.5859 10.5859C20.961 10.2109 21.4696 10 22 10C22.5304 10 23.039 10.2109 23.4141 10.5859L33.4141 20.5859C34.1951 21.367 34.1951 22.633 33.4141 23.4141C32.633 24.1951 31.367 24.1951 30.5859 23.4141L24 16.8281L24 42C24 43.1046 23.1046 44 22 44Z" fill="white"/>
</svg>
         `
      },
   ]
   const wrapRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!wrapRef.current) return;

      const items = Array.from(wrapRef.current.children) as HTMLElement[];
      if (!items.length) return;

      // важно: очистка на размонтировании (Next/React strict mode)
      const ctx = gsap.context(() => {
         gsap.from(items, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
               trigger: wrapRef.current,
               start: "top 90%",
               toggleActions: "play none none reverse",
            },
         });
      }, wrapRef);

      return () => ctx.revert();
   }, []);
   return (
      <section className={styles.home_numbers}>
         <div className="container">
            <div className={styles.home_numbers_wrap}>
               <SectionHeader
                  eyebrow='Цифры, которые говорят сами за себя'
                  eyebrowVariant='white'
               />
               <div className={`row ${styles.home_numbers_wrap_row}`} ref={wrapRef}>
                  {data?.map((item, index) => (
                     <div className={`${item?.col} ${styles.col}`} key={index + item.number}>
                        <div className={styles.home_numbers_wrap_item}>
                           <div className={styles.home_numbers_wrap_item_head}>
                              <div className={styles.home_numbers_wrap_item_head_num}>
                                 {item?.number}
                              </div>
                              <span className={styles.home_numbers_wrap_item_head_icon} dangerouslySetInnerHTML={{ __html: item?.icon }} />
                           </div>
                           <div className={styles.home_numbers_wrap_item_text}>
                              <p>
                                 {item?.text}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeNumbers;