"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "../CallCenterSound.module.scss";

function formatTime(sec: number) {
   if (!Number.isFinite(sec) || sec < 0) sec = 0;
   const m = Math.floor(sec / 60);
   const s = Math.floor(sec % 60);
   return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Глобальный реестр (на уровне вкладки)
declare global {
   interface Window {
      __wsPlayers?: Set<WaveSurfer>;
   }
}

function getRegistry() {
   if (typeof window === "undefined") return null;
   window.__wsPlayers ??= new Set<WaveSurfer>();
   return window.__wsPlayers;
}

type Props = {
   url: string; // <-- у компонента разные треки
};

function CallCenterSoundEl({ url }: Props) {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const waveSurferRef = useRef<WaveSurfer | null>(null);
   const hasStartedRef = useRef(false);

   const [isVisible, setIsVisible] = useState(false);
   const [isReady, setIsReady] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [duration, setDuration] = useState(0);

   useEffect(() => {
      const node = containerRef.current;
      if (!node || hasStartedRef.current) return;

      const observer = new IntersectionObserver(
         (entries) => {
            const [entry] = entries;

            if (!entry?.isIntersecting) return;

            hasStartedRef.current = true;
            setIsVisible(true);
            observer.disconnect();
         },
         {
            rootMargin: "200px 0px",
            threshold: 0.15,
         }
      );

      observer.observe(node);

      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      if (!containerRef.current || !isVisible) return;

      const ws = WaveSurfer.create({
         container: containerRef.current,
         waveColor: "#9C9C9C",
         progressColor: "#080808",
         url,
         height: 'auto',
         normalize: true,
         barWidth: 2,
         cursorWidth: 2,
      });

      waveSurferRef.current = ws;

      // регистрируем
      const reg = getRegistry();
      reg?.add(ws);

      const onReady = () => {
         setIsReady(true);
         setDuration(ws.getDuration());
      };

      const onPlay = () => {
         // стопаем всех остальных
         reg?.forEach((player) => {
            if (player !== ws && player.isPlaying()) player.pause();
         });
         setIsPlaying(true);
      };

      const onPause = () => setIsPlaying(false);
      const onFinish = () => setIsPlaying(false);

      ws.on("ready", onReady);
      ws.on("play", onPlay);
      ws.on("pause", onPause);
      ws.on("finish", onFinish);

      return () => {
         ws.un("ready", onReady);
         ws.un("play", onPlay);
         ws.un("pause", onPause);
         ws.un("finish", onFinish);

         reg?.delete(ws);
         ws.destroy();
         waveSurferRef.current = null;
      };
   }, [isVisible, url]);

   const togglePlay = () => {
      const ws = waveSurferRef.current;
      if (!ws || !isReady) return;
      ws.playPause();
   };

   return (
      <div className={styles.call_center_sound_wrap_list_item_sound}>
         <button
            type="button"
            aria-label={isPlaying ? "Пауза" : "Прослушать запись"}
            className={styles.call_center_sound_wrap_list_item_sound_btn}
            onClick={togglePlay}
            disabled={!isReady}
         >
            {isPlaying ? (
               <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <rect width={30} height={30} rx={15} fill="#080808" />
                  <rect x="10" y="9" width="3.5" height="12" rx="1" fill="white" />
                  <rect x="16.5" y="9" width="3.5" height="12" rx="1" fill="white" />
               </svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <rect width={30} height={30} rx={15} fill="#080808" />
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M20.1579 13.4114L13.5013 9.24375C12.3868 8.54643 11 9.42866 11 10.8325V19.1673C11 20.5729 12.3868 21.4533 13.5013 20.756L20.1579 16.5905C21.2807 15.8877 21.2807 14.1142 20.1579 13.4114Z"
                     fill="white"
                  />
               </svg>
            )}
         </button>
         <div ref={containerRef} className={styles.call_center_sound_wrap_list_item_sound_wave} />
         <div className={styles.call_center_sound_wrap_list_item_sound_time}>
            {formatTime(duration)}
         </div>
      </div>
   );
}

export default CallCenterSoundEl;
