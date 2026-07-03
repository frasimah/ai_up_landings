"use client";

import { useState } from "react";
import Slider from "rc-slider";

import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";

import styles from "./HomeCalculator.module.scss";

type props = {
   titleSection?: string;
}

// Цена за штуку
const getPricePerItem = (quantity: number) => {
   if (quantity < 300) return 47;
   if (quantity < 1000) return 42;
   if (quantity < 2000) return 37;
   if (quantity < 4000) return 32;
   if (quantity < 10000) return 27;
   return 22;
};

// Динамический шаг внутри секции
const getStep = (quantity: number) => {
   if (quantity < 300) return 10;
   if (quantity < 1000) return 50;
   if (quantity < 5000) return 100;
   if (quantity < 10000) return 200;
   return 500;
};

const basePrice = 47;

// Секции для равной ширины
const sections = [
   { min: 100, max: 300 },
   { min: 300, max: 1000 },
   { min: 1000, max: 2000 },
   { min: 2000, max: 4000 },
   { min: 4000, max: 10000 },
   { min: 10000, max: 100000 },
];

const sectionWidthPercent = 100 / sections.length;

const valueToPercent = (value: number) => {
   // Найти секцию
   let sectionIndex = sections.findIndex((s) => value >= s.min && value <= s.max);
   if (sectionIndex === -1) sectionIndex = sections.length - 1;

   const section = sections[sectionIndex];
   const relative = (value - section.min) / (section.max - section.min);
   return sectionIndex * sectionWidthPercent + relative * sectionWidthPercent;
};

const percentToValue = (percent: number) => {
   let sectionIndex = Math.floor(percent / sectionWidthPercent);
   if (sectionIndex >= sections.length) sectionIndex = sections.length - 1;

   const section = sections[sectionIndex];
   const relative = (percent - sectionIndex * sectionWidthPercent) / sectionWidthPercent;
   return Math.round(section.min + relative * (section.max - section.min));
};

function HomeCalculator({ titleSection }: props) {
   const [quantity, setQuantity] = useState<number>(300);

   const pricePerItem = getPricePerItem(quantity);
   const totalPrice = quantity * pricePerItem;

   const discountPercent =
      pricePerItem === basePrice
         ? 0
         : Math.round(((basePrice - pricePerItem) / basePrice) * 100);

   // Marks равномерные по ширине
   const marks: Record<number, React.ReactNode> = {};
   sections.forEach((section, i) => {
      const percent = i * sectionWidthPercent; // 0%, 16.6667%, ...

      const price = getPricePerItem(section.min);
      const discount = price === basePrice ? 0 : Math.round(((basePrice - price) / basePrice) * 100);

      marks[percent] = discount > 0 ? (
         <>
            {price} ₽ <span className={styles.discount}>(-{discount}%)</span>
         </>
      ) : (
         `${price} ₽`
      );
   });

   return (
      <section className={styles.home_calculator}>
         <div className="container">
            {titleSection && (
               <SectionHeader
                  title={titleSection}
                  titleSize="h2"
                  as="h2"
                  alignLeftMobile={true}
                  size="small"
                  className={styles.home_calculator_head}
               />
            )}
            <div className={styles.home_calculator_wrap}>
               {/* LEFT */}
               <div className={styles.home_calculator_wrap_col_left}>
                  <div className={styles.home_calculator_left}>
                     <SectionHeader
                        title="Калькулятор стоимости"
                        headingVariant="white"
                        as="h2"
                        description="Выберите объём, и система автоматически рассчитает итоговую стоимость. Цена зависит только от разовой покупки"
                        descriptionVariant="white"
                     />

                     {/* Слайдер */}
                     <div className={styles.home_calculator_left_slider}>
                        <Slider
                           min={0}
                           max={100}
                           step={0.1}
                           value={valueToPercent(quantity)}
                           marks={marks}
                           onChange={(val) => setQuantity(percentToValue(val as number))}
                           dotStyle={{ borderColor: "#fff" }}
                           activeDotStyle={{ borderColor: "#0169F9" }}
                        />
                     </div>

                     {/* BUTTON */}
                     <div className={styles.home_calculator_left_btn}>
                        <Button variant="blue" noBorder={false}>Создать аккаунт</Button>
                     </div>

                     {/* CLOUD */}
                     <div className={styles.home_calculator_cloud}>
                        <div className={styles.home_calculator_cloud_icon}>
                           <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                              <rect width={28} height={28} rx={14} fill="#0169F9" />
                              <path d="M14.9535 13.0233H19V14.9535H14.9535V19H13.0233V14.9535H9V13.0233H13.0233V9H14.9535V13.0233Z" fill="white" />
                           </svg>
                        </div>
                        +50 идентификаций бесплатно при первом пополнении
                     </div>
                  </div>
               </div>

               {/* RIGHT */}
               <div className={styles.home_calculator_wrap_col_right}>
                  <div className={styles.home_calculator_right}>
                     <div className={styles.home_calculator_right_top}>
                        <div className={styles.home_calculator_right_count}>
                           {quantity.toLocaleString("ru-RU")} идентификаций
                        </div>

                        <ul className={styles.home_calculator_right_list}>
                           <li className={styles.home_calculator_right_list_it}>
                              <CheckBox />
                              <span>Управление источниками</span>
                           </li>
                           <li className={styles.home_calculator_right_list_it}>
                              <CheckBox />
                              <span>Удобная выгрузка данных</span>
                           </li>
                           <li className={styles.home_calculator_right_list_it}>
                              <CheckBox />
                              <span>Аналитика и отчеты</span>
                           </li>
                        </ul>
                     </div>

                     {/* TOTAL */}
                     <div className={styles.home_calculator_right_total}>
                        <span className={styles.home_calculator_right_total_title}>
                           Всего
                        </span>

                        <div className={styles.home_calculator_right_total_cost}>
                           <span
                              className={styles.home_calculator_right_total_cost_numbers}
                           >
                              {totalPrice.toLocaleString("ru-RU")} ₽
                           </span>

                           {discountPercent > 0 && (
                              <span
                                 className={styles.home_calculator_right_total_cost_sale}
                              >
                                 -{discountPercent}%
                              </span>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               <div className={styles.home_calculator_wrap_bg}>
                  <img src="/img/home/calc-bg.svg" alt="Декоративный фон калькулятора" />
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeCalculator;
