"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../CallCenterProblems.module.scss'
import CallCenterProblemsBg from '../CallCenterProblemsBg/CallCenterProblemsBg';

const data = [
   {
      title: "“А давайте возьмём оператора”",
      text: "Звучит просто только первые 5 минут. Потом внезапно выясняется, что оператору нужна телефония, номера, маркировка, софт, инструкции, контроль… В какой-то момент проще всё бросить и сказать “ладно, как-нибудь своими силами”",
      id: 'aProblems0'
   },
   {
      title: "Оператор звонит два раза — и сдаётся",
      text: "Хотя нормальный дозвон — это 3–4 попытки. Но “тут не ответили, там занято, давайте в следующий раз”",
      id: 'aProblems1'
   },
   {
      title: "Статусы превращаются в хаос",
      text: "“Не взяли”, “позже”, “какой-то мужик сказал перезвонить”… Через пару дней непонятно, что происходит вообще",
      id: 'aProblems2'
   },
   {
      title: "Контакты просто лежат. И остывают.",
      text: "Бизнес платит за трафик, а половина контактов — даже не обработана. Потому что у менеджера есть ещё 100 задач, кроме прозвона",
      id: 'aProblems3'
   },
   {
      title: "Телефония всегда ломается в самый неподходящий момент",
      text: "У менеджера не слышно клиента → у клиента не слышно менеджера → пропущенный звонок → клиент ушёл. А вы сидите и гуглите “почему не работает SIP”",
      id: 'aProblems4'
   },
   {
      title: "А главное — никто этим не хочет заниматься",
      text: "Прозвон — это рутинная, скучная, неблагодарная работа. Именно поэтому он постоянно откладывается “на завтра”",
      id: 'aProblems5'
   },
]

function CallCenterProblemsSwiper() {
   return (
      <Swiper
         className={styles.call_center_problem_main}
         enabled={false}
         slidesPerView={'auto'}
         spaceBetween={0}
         speed={800}
         breakpoints={{
            0: {
               spaceBetween: 7,
               enabled: true,
               slidesPerView: 'auto'
            },
            1200: {
               spaceBetween: 0,
               enabled: false,
               slidesPerView: 'auto'
            }
         }}
      >
         {data?.map((item, i) => (
            <SwiperSlide
               className={`${styles.call_center_problem_main_item}`} key={item.id + i}
            >
               <div className={styles.call_center_problem_main_item_title}>
                  {item.title}
               </div>
               <div className={styles.call_center_problem_main_item_text}>
                  {item.text}
               </div>
            </SwiperSlide>
         ))}
         <CallCenterProblemsBg />
      </Swiper>
   );
}

export default CallCenterProblemsSwiper;