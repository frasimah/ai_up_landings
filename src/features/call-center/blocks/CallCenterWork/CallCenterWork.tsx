"use client";

import { useEffect, useRef } from "react";
import styles from "./CallCenterWork.module.scss";

// Section 04 — Работа КЦ / Orbit. 3D carousel ported from "4 оператора - orbit.dc.html".
// R=360, depth=220, lerp 0.10, autorotate 4.2s, drag-to-spin with snap, pause on hover.
function CallCenterWork() {
   const stageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-orbit-card]"));
      cards.sort((a, b) => Number(a.dataset.idx) - Number(b.dataset.idx));
      const n = cards.length || 4;
      const R = 360;
      const depth = 220;
      const step = 360 / n;

      let curRot = 0;
      let targetRot = 0;
      let paused = false;
      let dragging = false;
      let sx = 0;
      let rot0 = 0;
      let raf = 0;
      let timer = 0;

      const layout = () => {
         for (let i = 0; i < cards.length; i++) {
            const a = ((i * step) + curRot) * Math.PI / 180;
            const sin = Math.sin(a);
            const cos = Math.cos(a);
            const x = sin * R;
            const z = cos * depth;
            const t = (cos + 1) / 2;
            const scale = 0.7 + t * 0.3;
            const op = 0.06 + t * 0.94;
            const ry = -sin * 30;
            const c = cards[i];
            c.style.transform = `translate(-50%,0) translateX(${x.toFixed(1)}px) translateZ(${z.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
            c.style.opacity = op.toFixed(3);
            c.style.zIndex = String(Math.round(t * 100));
            c.style.pointerEvents = t > 0.85 ? "auto" : "none";
         }
      };

      layout();

      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tick = () => {
         curRot += (targetRot - curRot) * 0.10;
         layout();
         raf = requestAnimationFrame(tick);
      };
      const go = (d: number) => { targetRot -= d * step; };

      raf = requestAnimationFrame(tick);
      timer = window.setInterval(() => { if (!paused && !dragging) go(1); }, 4200);

      const onEnter = () => { paused = true; };
      const onLeave = () => { paused = false; };
      const onDown = (e: PointerEvent) => {
         dragging = true;
         sx = e.clientX;
         rot0 = curRot;
         stage.style.cursor = "grabbing";
         try { stage.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      };
      const onMove = (e: PointerEvent) => {
         if (!dragging) return;
         curRot = rot0 + (e.clientX - sx) * 0.25;
         targetRot = curRot;
      };
      const onUp = () => {
         if (!dragging) return;
         dragging = false;
         stage.style.cursor = "grab";
         targetRot = Math.round(curRot / step) * step;
      };

      // expose prev/next to button handlers via dataset closures
      stage.dataset.ready = "1";
      (stage as unknown as { _go?: (d: number) => void; _pause?: () => void })._go = go;
      (stage as unknown as { _pause?: () => void })._pause = () => { paused = true; };

      stage.addEventListener("pointerenter", onEnter);
      stage.addEventListener("pointerleave", onLeave);
      stage.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);

      return () => {
         cancelAnimationFrame(raf);
         clearInterval(timer);
         stage.removeEventListener("pointerenter", onEnter);
         stage.removeEventListener("pointerleave", onLeave);
         stage.removeEventListener("pointerdown", onDown);
         window.removeEventListener("pointermove", onMove);
         window.removeEventListener("pointerup", onUp);
      };
   }, []);

   const spin = (d: number) => {
      const stage = stageRef.current as unknown as { _go?: (d: number) => void; _pause?: () => void } | null;
      stage?._pause?.();
      stage?._go?.(d);
   };

   return (
      <section className={styles.section} data-screen-label="04 Работа КЦ">
         <div className={styles.glow} />
         <div className={styles.head}>
            <div className={styles.eyebrow}><span />технология дозвона</div>
            <h2 className={styles.title}>4 мобильных оператора, по одному на каждую попытку дозвона</h2>
            <p className={styles.lead}>
               Смартфоны и операторы блокируют незнакомые номера как спам уже после первого недозвона. Мы решаем это технологически на стороне колл-центра
            </p>
         </div>

         <div ref={stageRef} className={styles.stage} data-orbit-stage>
            {/* card 0 — dedicated numbers */}
            <div className={styles.card} data-orbit-card data-idx="0">
               <h3 className={styles.cardTitle}>Выделенные номера для прозвона</h3>
               <p className={styles.cardText}>На каждый проект — отдельный пул номеров КЦ. Они используются только в вашем проекте, не «жгут» репутацию из-за чужих рекламных кампаний</p>
               <div className={styles.chips} style={{ height: 138 }}>
                  <div className={`${styles.chip} ${styles.primary}`} style={{ left: 0, top: 0 }}><span />8(916)-102-87-00</div>
                  <div className={styles.chip} style={{ right: 4, top: 44 }}><span />8(915)-093-28-01</div>
                  <div className={styles.chip} style={{ left: 18, top: 98 }}><span />8(922)-234-34-23</div>
               </div>
            </div>

            {/* card 1 — number carousels */}
            <div className={styles.card} data-orbit-card data-idx="1">
               <h3 className={styles.cardTitle}>Карусели номеров</h3>
               <p className={styles.cardText}>Внутри пула — система ротации: один номер не звонит дважды на одного абонента. Каждая попытка — с нового номера</p>
               <div className={styles.chips} style={{ height: 148 }}>
                  <div className={`${styles.chip} ${styles.primary}`} style={{ left: "50%", top: 0, transform: "translateX(-50%)" }}><span />8(995)-872-12-35</div>
                  <div className={styles.chip} style={{ left: 0, top: 64 }}><span />8(915)-916-92-34</div>
                  <div className={styles.chip} style={{ right: 0, top: 64 }}><span />8(902)-973-47-00</div>
                  <div className={styles.chip} style={{ left: "50%", top: 118, transform: "translateX(-50%)" }}><span />8(915)-004-28-12</div>
               </div>
            </div>

            {/* card 2 — operators */}
            <div className={styles.card} data-orbit-card data-idx="2">
               <h3 className={styles.cardTitle}>4 разных мобильных оператора</h3>
               <p className={styles.cardText}>МТС, Билайн, МегаФон, Tele2 — на каждую попытку дозвона КЦ использует номер другого оператора. Если МТС в чёрном списке, дозвонимся с МегаФон</p>
               <div className={styles.operators}>
                  <div className={styles.opLogo}><img src="/img/call-center/operators/mts.png" alt="МТС" style={{ height: 30 }} /></div>
                  <div className={styles.opLogo}><img src="/img/call-center/operators/beeline.png" alt="билайн" style={{ height: 18 }} /></div>
                  <div className={styles.opText}><span className={styles.opMark}>М</span><span className={styles.opName}>МегаФон</span></div>
                  <div className={styles.opLogo}><img src="/img/call-center/operators/tele2.png" alt="Tele2" style={{ height: 26 }} /></div>
               </div>
            </div>

            {/* card 3 — timing gauge */}
            <div className={styles.card} data-orbit-card data-idx="3">
               <h3 className={styles.cardTitle}>Алгоритм времени звонка</h3>
               <p className={styles.cardText}>Первая попытка — в день захвата. Если недозвон, следующая — через 4 часа с другого оператора. Всего 4 попытки за 2 дня. Это даёт 78% дозваниваемости</p>
               <div className={styles.gauge}>
                  <div className={styles.gaugeRing}>
                     <svg width="150" height="150" viewBox="0 0 160 160" fill="none">
                        <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="6" strokeDasharray="1.6 5.4" />
                        <circle cx="80" cy="80" r="64" fill="none" stroke="#34C759" strokeWidth="6" strokeLinecap="round" strokeDasharray="313.6 402.1" transform="rotate(-90 80 80)" />
                     </svg>
                     <div className={styles.gaugeLabel}><span>78%</span><span>дозвон</span></div>
                  </div>
                  <div className={styles.gaugeLegend}>
                     <div><span style={{ background: "#0169F9" }} />4 попытки</div>
                     <div><span style={{ background: "#34C759" }} />за 2 дня</div>
                     <div><span style={{ background: "rgba(255,255,255,.4)" }} />+4 часа шаг</div>
                  </div>
               </div>
            </div>
         </div>

         <div className={styles.controls}>
            <button type="button" className={styles.navBtn} aria-label="Назад" onClick={() => spin(-1)}>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className={styles.navBtn} aria-label="Вперёд" onClick={() => spin(1)}>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
         </div>
      </section>
   );
}

export default CallCenterWork;
