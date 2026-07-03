import Link from "next/link";
import { APP_ROUTES } from "@/lib/routes";
import "./FooterNext.scss";

const serviceNotice =
   "ПО AI-UP представляет собой интернет-сервис (SaaS), дополнительных требований по установке программы со стороны пользователя не требуется.";

const platformLinks = [
   { label: "Как это работает", href: "/how-work" },
   { label: "Стоимость", href: "/cost" },
   { label: "Колл-центр", href: "/call-center" },
   { label: "Ai Flow", href: "/ai-flow" },
   { label: "Реферальная программа", href: "/referral-programm" },
];

const companyLinks = [
   { label: "О нас", href: "/about" },
   { label: "Блог", href: "/blog" },
   { label: "База знаний", href: "/knowledge-base" },
];

const badges = [
   {
      label: "Реестр операторов ПД",
      href: "https://pd.rkn.gov.ru/operators-registry/operators-list/?act=search&name_full=%D0%9D%D0%B5%D0%B9%D1%80%D0%BE%D0%BB%D0%B8%D0%B4&inn=7805819300&regn=78-24-067206",
      value: "№ 78-24-067206",
   },
   {
      label: "Товарный знак",
      href: "https://new.fips.ru/registers-doc-view/fips_servlet?DB=EVM&DocNumber=2026660166&TypeFile=html",
      value: "№ 1189879",
   },
   {
      label: "Серверы на территории РФ",
   },
];

const legalItems = [
   { label: "Пользовательское соглашение", href: "/privacy" },
   { label: "Согласие на обработку ПД", href: "/terms-conditions" },
   { label: "Оферта", href: "/top-up-terms-conditions" }
];

function FooterLogo() {
   return (
      <svg width={273} height={124} viewBox="0 0 273 124" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M131.45 28.7326C127.28 28.7326 123.646 27.3565 120.549 24.6043C117.451 21.7421 115.902 18.3294 115.902 14.3663C115.902 10.4032 117.451 7.04554 120.549 4.29338C123.646 1.43113 127.28 0 131.45 0C135.858 0 139.552 1.43113 142.53 4.29338C145.628 7.04554 147.177 10.4032 147.177 14.3663C147.177 18.3294 145.628 21.7421 142.53 24.6043C139.552 27.3565 135.858 28.7326 131.45 28.7326ZM119.298 76.3937V42.2733H143.781V76.3937H119.298Z" fill="white" />
         <path d="M0 122.632L51.3989 7.46094L73.067 7.46094L124.634 122.632H99.1024L87.5125 96.3532H36.6175L25.1955 122.632H0ZM62.149 38.4435L45.6879 75.7523H78.4421L62.149 38.4435Z" fill="white" />
         <path d="M261.097 9.7969C269.033 15.9974 273.001 23.748 273.001 33.0488C273.001 42.3495 269.033 50.1458 261.097 56.4374C253.161 62.6379 243.214 65.7382 231.254 65.7382H215.998H191.688V0.359375L231.254 0.359375C243.214 0.359375 253.161 3.50522 261.097 9.7969ZM244.331 43.1702C247.685 40.5259 249.361 37.1521 249.361 33.0488C249.361 28.9455 247.685 25.5717 244.331 22.9274C240.978 20.283 236.507 18.9609 230.919 18.9609H215.998V47.1367H230.919C236.507 47.1367 240.978 45.8145 244.331 43.1702Z" fill="white" />
         <path d="M215.998 65.7382H191.688V76.3978H215.998V65.7382Z" fill="white" />
         <path d="M167.588 124.002C153.19 124.002 141.527 120.173 132.598 112.515C123.669 104.857 119.205 94.71 119.205 82.0742H143.48L143.48 82.3614C143.48 89.0622 145.657 94.3271 150.01 98.1561C154.362 101.985 160.222 103.9 167.588 103.9C174.954 103.9 180.814 101.985 185.167 98.1561C189.52 94.3271 191.696 89.0622 191.696 82.3614L191.696 82.0742H215.971C215.971 94.6142 211.451 104.761 202.411 112.515C193.37 120.173 181.763 124.002 167.588 124.002Z" fill="white" />
      </svg>
   );
}

export default function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="footer">
         <div className="container">
            <div className="footer_wrap">
               <div className="footer_cta">
                  <div className="footer_cta_content">
                     <div className="footer_cta_title">Начните сегодня — первые контакты придут завтра утром</div>
                     <p className="footer_cta_note">+50 идентификаций бесплатно при первом пополнении</p>
                  </div>
                  <Link href={APP_ROUTES.signUp} className="footer_cta_button" target="_blank" rel="noopener noreferrer">
                     Создать аккаунт
                  </Link>
               </div>

               <div className="footer_main">
                  <div className="footer_brand">
                     <Link href="/" className="footer_brand_logo" aria-label="Ai-UP" prefetch={false}>
                        <FooterLogo />
                     </Link>
                     <p className="footer_brand_text">
                        Платформа для получения контактов людей, которые вчера проявили интерес к вашей
                        нише
                     </p>
                     <img className="sk" src="/icons/sk-footer.svg" alt="" />
                  </div>

                  <nav className="footer_nav_group" aria-label="Платформа">
                     <h3 className="footer_nav_title">Платформа</h3>
                     <ul className="footer_nav_list">
                        {platformLinks.map((link) => (
                           <li key={link.href}>
                              <Link href={link.href} className="footer_nav_link" prefetch={false}>
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </nav>

                  <nav className="footer_nav_group" aria-label="Компания">
                     <h3 className="footer_nav_title">Компания</h3>
                     <ul className="footer_nav_list">
                        {companyLinks.map((link) => (
                           <li key={link.href}>
                              <Link href={link.href} className="footer_nav_link" prefetch={false}>
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </nav>

                  <div className="footer_nav_group">
                     <h3 className="footer_nav_title">Помощь</h3>
                     <address className="footer_contact">
                        <a href="mailto:info@ai-up.ru" className="footer_email">
                           info@ai-up.ru
                        </a>
                        {/* <span className="footer_contact_text">Чат на сайте</span> */}
                        <span className="footer_support_note">Пн-Пт, 10:00-20:00 МСК</span>
                        <span className="footer_support_note">Сб-Вс, 11:00-20:00 МСК</span>
                     </address>
                  </div>
               </div>

               <div className="footer_badges" aria-label="Юридическая и техническая информация">
                  {badges.map((badge) => (
                     <div className="footer_badge" key={badge.label}>
                        <span className="footer_badge_dot" aria-hidden="true"></span>
                        <span className="footer_badge_label">
                           {badge.label}
                           {badge.value && ":"}
                        </span>
                        {badge.href && badge.value ? (
                           <a
                              href={badge.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="footer_badge_link"
                           >
                              {badge.value}
                           </a>
                        ) : badge.value ? (
                           <span className="footer_badge_text">{badge.value}</span>
                        ) : null}
                     </div>
                  ))}
               </div>

               <div className="footer_notice" aria-label="Информация о формате сервиса">
                  {/* <span className="footer_notice_label">Формат сервиса</span> */}
                  <p className="footer_notice_text">{serviceNotice} <Link href={'/knowledge-base/bystryj-start'}>Функциональные характеристики и руководство пользователя.</Link></p>
               </div>

               <div className="footer_bottom">
                  <p className="footer_copy">
                     © 2024–{currentYear} ООО «НЕЙРОЛИД» · ИНН 7805819300 · ОГРН 1247800110348 ·
                     Санкт-Петербург
                  </p>
                  <div className="footer_legal" aria-label="Правовые документы">
                     {legalItems.map((item) =>
                        item.href ? (
                           <Link key={item.label} href={item.href} className="footer_legal_link" prefetch={false}>
                              {item.label}
                           </Link>
                        ) : (
                           <span key={item.label} className="footer_legal_text">
                              {item.label}
                           </span>
                        )
                     )}
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
