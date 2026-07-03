"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CallCenterSound.module.scss";

// Section 08d — Звучание. Ported from "Лендинг AI-UP.dc.html" §8d.
// Cosmetic players: no real audio — a setInterval drives a progress bar, the
// waveform fills blue with progress and the timer counts mm:ss.
type Track = { title: string; duration: number; peaks: number[] };

const TRACKS: Track[] = [
   { title: "Организация мероприятий", duration: 45.77, peaks: [1, 0.2, 0.158, 0.155, 0.144, 0.142, 0.373, 0.436, 0.198, 0.215, 0.592, 0.782, 0.289, 0.203, 0.525, 0.522, 0.514, 0.17, 0.729, 0.448, 0.144, 0.073, 0.795, 0.682, 0.633, 0.877, 0.554, 0.518, 0.116, 0.761, 0.791, 0.059] },
   { title: "Строительство загородных домов", duration: 81.97, peaks: [1, 0.81, 0.139, 0.146, 0.969, 0.386, 0.354, 0.917, 0.805, 0.148, 0.164, 0.98, 0.981, 0.145, 0.911, 0.16, 0.878, 0.674, 0.979, 0.908, 0.169, 0.894, 0.19, 0.153, 0.991, 0.376, 0.112, 0.802, 0.548, 0.175, 0.917, 0.507] },
   { title: "Покупка автомобиля", duration: 67.74, peaks: [0.935, 0.344, 0.232, 0.192, 0.669, 0.143, 0.57, 0.303, 0.755, 0.51, 0.175, 0.684, 0.202, 0.298, 0.299, 0.725, 0.661, 0.249, 0.707, 0.402, 0.345, 0.271, 0.734, 0.273, 1, 0.965, 0.586, 0.341, 0.224, 0.214, 0.508, 0.553] },
   { title: "Строительство ангаров", duration: 94.64, peaks: [0.161, 0.195, 0.318, 0.211, 0.183, 0.275, 0.779, 0.145, 0.601, 0.686, 0.575, 0.886, 0.443, 0.541, 0.34, 0.852, 0.794, 0.187, 0.318, 0.558, 0.117, 0.229, 0.557, 0.566, 1, 0.607, 0.19, 0.57, 0.181, 0.131, 0.561, 0.369] },
];

const fmtTime = (sec: number) => {
   const m = Math.floor(sec / 60);
   const s = Math.floor(sec % 60);
   return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const PlayIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 3l9 5-9 5z" fill="#fff" /></svg>;
const PauseIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="#fff" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="#fff" /></svg>;

function CallCenterSound() {
   const [playing, setPlaying] = useState<number | null>(null);
   const [prog, setProg] = useState(0);
   const timer = useRef<number | null>(null);

   useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

   const toggle = (idx: number) => {
      if (timer.current) clearInterval(timer.current);
      if (playing === idx) { setPlaying(null); return; }
      setPlaying(idx);
      setProg(0);
      const step = 0.1 / TRACKS[idx].duration;
      timer.current = window.setInterval(() => {
         setProg((p) => {
            const next = p + step;
            if (next >= 1) {
               if (timer.current) clearInterval(timer.current);
               setPlaying(null);
               return 0;
            }
            return next;
         });
      }, 100);
   };

   return (
      <section className={styles.section} data-screen-label="08d Звучание">
         <div className={styles.inner}>
            <div className={styles.head}>
               <div className={styles.eyebrow}><span />записи</div>
               <h2 className={styles.title}>Как звучат наши звонки</h2>
            </div>
            <div className={styles.grid}>
               {TRACKS.map((track, idx) => {
                  const isPlaying = playing === idx;
                  const p = isPlaying ? prog : 0;
                  return (
                     <div key={track.title} className={styles.card}>
                        <div className={styles.tag}>Пример {idx + 1}</div>
                        <h3 className={styles.cardTitle}>{track.title}</h3>
                        <div className={styles.player}>
                           <button type="button" className={styles.playBtn} onClick={() => toggle(idx)} aria-label={isPlaying ? "Пауза" : "Играть"}>
                              {isPlaying ? <PauseIcon /> : <PlayIcon />}
                           </button>
                           <div className={styles.wave}>
                              {track.peaks.map((peak, i) => (
                                 <span
                                    key={i}
                                    className={`${styles.bar} ${i / track.peaks.length <= p ? styles.on : ""}`}
                                    style={{ height: Math.max(3, peak * 42) }}
                                 />
                              ))}
                           </div>
                           <span className={styles.time}>{fmtTime(isPlaying ? p * track.duration : track.duration)}</span>
                        </div>
                     </div>
                  );
               })}
            </div>
            <p className={styles.note}>Демо-визуализация записей. Реальные звонки хранятся в личном кабинете 90 дней и доступны в карточке лида.</p>
         </div>
      </section>
   );
}

export default CallCenterSound;
