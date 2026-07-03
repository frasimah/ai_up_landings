import Button from "@/components/Buttons/Button";
import CarrotQuestScript from "@/components/CarrotQuestScript/CarrotQuestScript";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import Footer from "@/components/Footer/FooterNext";
import HeaderOther from "@/components/HeaderOther/HeaderOther";
import SmoothProvider from "@/features/other/SmoothProvider/SmoothProvider";
import { SITE_ROUTES } from "@/lib/routes";
import "@/scss/app.scss";
import styles from "./global-not-found.module.scss";

export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body className={styles.body}>
        <SmoothProvider header={<HeaderOther />}>
          <main className={styles.page}>
            <section className={styles.hero} aria-labelledby="global-not-found-title">
              <div className={`container ${styles.heroContainer}`}>
                <div className={styles.heroContent}>
                  <p className={styles.code}>404</p>
                  <h1 id="global-not-found-title" className={styles.title}>
                    Такой страницы не существует
                  </h1>
                  <p className={styles.text}>
                    Возможно, ссылка устарела, страница была перемещена или в адресе
                    закралась ошибка.
                  </p>
                  <div className={styles.actions}>
                    <Button href={SITE_ROUTES.home} noBorder={false}>
                      Вернуться на главную
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </SmoothProvider>
        <CookieBanner />
        <CarrotQuestScript />
      </body>
    </html>
  );
}
