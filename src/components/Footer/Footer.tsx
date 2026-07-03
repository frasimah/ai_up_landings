import Link from "next/link";
import "./Footer.scss";

function Footer() {
   return (
      <footer className="footer">
         <div className="container">
            <div className="footer_wrap">
               <div className="row">
                  <div className="col-xl-3 order-xl-1 col-md-6 order-md-1 order-1">
                     <Link
                        href={'/'}
                        className="footer_wrap_logo"
                     >
                        <svg width={273} height={124} viewBox="0 0 273 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M131.45 28.7326C127.28 28.7326 123.646 27.3565 120.549 24.6043C117.451 21.7421 115.902 18.3294 115.902 14.3663C115.902 10.4032 117.451 7.04554 120.549 4.29338C123.646 1.43113 127.28 0 131.45 0C135.858 0 139.552 1.43113 142.53 4.29338C145.628 7.04554 147.177 10.4032 147.177 14.3663C147.177 18.3294 145.628 21.7421 142.53 24.6043C139.552 27.3565 135.858 28.7326 131.45 28.7326ZM119.298 76.3937V42.2733H143.781V76.3937H119.298Z" fill="white" />
                           <path d="M0 122.632L51.3989 7.46094L73.067 7.46094L124.634 122.632H99.1024L87.5125 96.3532H36.6175L25.1955 122.632H0ZM62.149 38.4435L45.6879 75.7523H78.4421L62.149 38.4435Z" fill="white" />
                           <path d="M261.097 9.7969C269.033 15.9974 273.001 23.748 273.001 33.0488C273.001 42.3495 269.033 50.1458 261.097 56.4374C253.161 62.6379 243.214 65.7382 231.254 65.7382H215.998H191.688V0.359375L231.254 0.359375C243.214 0.359375 253.161 3.50522 261.097 9.7969ZM244.331 43.1702C247.685 40.5259 249.361 37.1521 249.361 33.0488C249.361 28.9455 247.685 25.5717 244.331 22.9274C240.978 20.283 236.507 18.9609 230.919 18.9609H215.998V47.1367H230.919C236.507 47.1367 240.978 45.8145 244.331 43.1702Z" fill="white" />
                           <path d="M215.998 65.7382H191.688V76.3978H215.998V65.7382Z" fill="white" />
                           <path d="M167.588 124.002C153.19 124.002 141.527 120.173 132.598 112.515C123.669 104.857 119.205 94.71 119.205 82.0742H143.48L143.48 82.3614C143.48 89.0622 145.657 94.3271 150.01 98.1561C154.362 101.985 160.222 103.9 167.588 103.9C174.954 103.9 180.814 101.985 185.167 98.1561C189.52 94.3271 191.696 89.0622 191.696 82.3614L191.696 82.0742H215.971C215.971 94.6142 211.451 104.761 202.411 112.515C193.37 120.173 181.763 124.002 167.588 124.002Z" fill="white" />
                        </svg>
                     </Link>
                  </div>
                  <div className="col-xl-4 order-xl-2 order-md-3 order-2">
                     <nav className="footer_wrap_nav">
                        <ul>
                           <li>
                              <Link href={'/how-work'}>
                                 Как это работает
                              </Link>
                           </li>
                           <li>
                              <Link href={'/knowledge-base'}>
                                 База знаний
                              </Link>
                           </li>
                           <li>
                              <Link href={'/call-center'}>
                                 Колл-центр
                              </Link>
                           </li>
                           <li>
                              <Link href={'/blog'}>
                                 Блог
                              </Link>
                           </li>
                           <li>
                              <Link href={'/cost'}>
                                 Стоимость услуг
                              </Link>
                           </li>
                           <li>
                              <Link href={'/about'}>
                                 Контакты
                              </Link>
                           </li>
                        </ul>
                     </nav>
                  </div>
                  <div className="offset-xl-2 col-xl-3 order-xl-3 col-md-6 order-md-2 order-3">
                     <div className="footer_wrap_text">
                        <p>
                           Начните сегодня — и завтра утром в кабинете появятся первые контакты ваших клиентов!
                        </p>
                     </div>
                  </div>
                  <div className="offset-xl-3 col-xl-6 order-xl-4 col-md-6 order-md-4 order-5">
                     <div className="footer_wrap_links">
                        <Link href={'/privacy'} className="footer_wrap_links_it">
                           Политика конфиденциальности
                        </Link>
                        <Link href={'/'} className="footer_wrap_links_it">
                           Согласие на обработку персональных данных
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="footer-bg">
            <picture>
               <source srcSet="/icons/footer-mobile.svg" media="(max-width: 1199px)" />
               <img src="/icons/footer.svg" alt="Декоративный фон футера" />
            </picture>
         </div>
      </footer>
   );
}

export default Footer;
