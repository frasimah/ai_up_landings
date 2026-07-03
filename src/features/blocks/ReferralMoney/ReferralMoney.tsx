import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ReferralMoney.module.scss";
import BigBorderItem from "@/components/BigBorderItem/BigBorderItem";
import Button from "@/components/Buttons/Button";

function ReferralMoney() {
   const items = ["ИП", "ООО", "самозанятых"];

   return (
      <section className={styles.referral_money}>
         <div className="container">
            <div className={styles.referral_money_wrap}>
               <SectionHeader
                  className={styles.referral_money_wrap_header}
                  title="Как вывести деньги"
                  titleSize="h2"
                  as="h2"
                  description="Минимальный вывод — 10 000 ₽"
                  size="small"
                  alignLeftMobile={true}
               />
               <div className={styles.referral_money_wrap_main}>
                  <h3 className={styles.referral_money_wrap_main_title}>Доступно для:</h3>
                  {items?.length > 0 && (
                     <div className={`row ${styles.referral_money_wrap_main_row}`}>
                        {items?.map((text, index) => (
                           <div className="col-xl-4" key={text + index}>
                              <BigBorderItem text={text} />
                           </div>
                        ))}
                     </div>
                  )}
               </div>
               <div className={styles.referral_money_wrap_bottom}>
                  <p className={styles.referral_money_wrap_bottom_text}>
                     Запрос на вывод — через менеджера:
                  </p>
                  <Button variant="blue" className={styles.referral_money_wrap_bottom_btn}>Стать партнером</Button>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReferralMoney;
