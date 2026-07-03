"use client";

import styles from "./HomePercent.module.scss";
import OdometerPercent from "./OdometerPercent/OdometerPercent";
import HomePercentAnimation from "./HomePercentAnimation/HomePercentAnimation";

function HomePercent() {
   return (
      <section className={styles.home_percent}>
         <div className="container">
            <div className={`row ${styles.home_percent_wrap}`}>
               <div className="col-xl-3 col-md-4">
                  <div className={styles.home_percent_left}>
                     <div className={styles.home_percent_left_main}>
                        <OdometerPercent value={87} digitsCount={2} />
                     </div>
                     <div className={styles.home_percent_left_text}>
                        клиентов изучают рынок <br />
                        <span className={styles.home_percent_left_text_icon}>
                           <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                              <path d="M13.002 0C20.1825 8.24647e-05 26.0029 5.82142 26.0029 13.002C26.0028 20.1825 20.1825 26.0028 13.002 26.0029C5.82142 26.0029 8.24622e-05 20.1825 0 13.002C0 5.82137 5.82137 0 13.002 0ZM13.002 2.40039C7.14685 2.40039 2.40039 7.14685 2.40039 13.002C2.40047 18.857 7.1469 23.6035 13.002 23.6035C18.857 23.6034 23.6034 18.857 23.6035 13.002C23.6035 7.1469 18.857 2.40047 13.002 2.40039ZM13.002 5.24512C13.6646 5.2452 14.2021 5.78264 14.2021 6.44531V10.8818L15.6631 10.0059C16.2312 9.66527 16.9675 9.84923 17.3086 10.417C17.6495 10.9852 17.4656 11.7224 16.8975 12.0635L13.6191 14.0312C13.2485 14.2535 12.7863 14.2589 12.4102 14.0459C12.0342 13.8329 11.8018 13.4341 11.8018 13.002V6.44531C11.8018 5.78259 12.3392 5.24512 13.002 5.24512Z" fill="#0169F9" />
                           </svg>
                        </span>
                        за 24 часа до заявки
                     </div>
                  </div>
               </div>
               <div className="offset-xl-1 col-xl-6 offset-md-0 col-md-8">
                  <HomePercentAnimation />
               </div>
            </div>
         </div>

         <div className={styles.home_percent_bg}>
            <svg xmlns="http://www.w3.org/2000/svg" width={1920} height={1077} viewBox="0 0 1920 1077" fill="none">
               <g opacity="0.7" style={{ mixBlendMode: "soft-light" }}>
                  <rect
                     x={-223.857}
                     y={0.332031}
                     width={2367.717}
                     height={1075.728}
                     fill="url(#homePercentGridPattern)"
                     mask="url(#homePercentGridMask)"
                  />
               </g>
               <defs>
                  <pattern
                     id="homePercentGridPattern"
                     x={-223.857}
                     y={0.332031}
                     width={53.8117}
                     height={53.7864}
                     patternUnits="userSpaceOnUse"
                  >
                     <path
                        d="M53.8117 53.7864V0H0"
                        stroke="#DADADA"
                        strokeOpacity="0.6"
                        strokeWidth="0.664512"
                        fill="none"
                     />
                  </pattern>
                  <mask
                     id="homePercentGridMask"
                     maskUnits="userSpaceOnUse"
                     x={-223.857}
                     y={0.332031}
                     width={2367.717}
                     height={1075.728}
                  >
                     <rect
                        x={-223.857}
                        y={0.332031}
                        width={2367.717}
                        height={1075.728}
                        fill="url(#homePercentGridFade)"
                     />
                  </mask>
                  <radialGradient id="homePercentGridFade" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(959.999 538.196) rotate(90) scale(537.864 1183.86)">
                     <stop stopColor="white" />
                     <stop offset={1} stopColor="white" stopOpacity={0} />
                  </radialGradient>
               </defs>
            </svg>
         </div>
      </section>
   );
}

export default HomePercent;
