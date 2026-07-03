"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import styles from "../CallCenterSound.module.scss";

function formatTime(sec: number) {
   if (!Number.isFinite(sec) || sec < 0) sec = 0;
   const m = Math.floor(sec / 60);
   const s = Math.floor(sec % 60);
   return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

declare global {
   interface Window {
      __callCenterAudioPlayers?: Set<HTMLAudioElement>;
   }
}

function getRegistry() {
   if (typeof window === "undefined") return null;
   window.__callCenterAudioPlayers ??= new Set<HTMLAudioElement>();
   return window.__callCenterAudioPlayers;
}

type Props = {
   url: string;
   duration: number;
   peaks: readonly number[];
};

function CallCenterSoundElAsync({
   url,
   duration: initialDuration,
   peaks,
}: Props) {
   const audioRef = useRef<HTMLAudioElement | null>(null);
   const pendingSeekRatioRef = useRef<number | null>(null);
   const [audioRequested, setAudioRequested] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [duration, setDuration] = useState(initialDuration);
   const [currentTime, setCurrentTime] = useState(0);
   const [hasError, setHasError] = useState(false);
   const [hasStartedPlayback, setHasStartedPlayback] = useState(false);

   const normalizedPeaks = useMemo(
      () => peaks.map((peak) => Math.max(0.12, Math.min(peak, 0.95))),
      [peaks]
   );

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleLoadedMetadata = () => {
         setDuration(audio.duration || initialDuration);

         if (pendingSeekRatioRef.current !== null) {
            audio.currentTime = (audio.duration || initialDuration) * pendingSeekRatioRef.current;
         }

         setIsLoading(false);
      };

      const handleTimeUpdate = () => {
         setCurrentTime(audio.currentTime || 0);
      };

      const handleCanPlay = async () => {
         setIsLoading(false);

         if (!hasStartedPlayback) return;

         try {
            const reg = getRegistry();
            reg?.forEach((player) => {
               if (player !== audio) {
                  player.pause();
               }
            });
            await audio.play();
         } catch {
            setHasError(true);
            setIsPlaying(false);
         }
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
         setIsPlaying(false);
         setCurrentTime(0);
         pendingSeekRatioRef.current = null;
      };
      const handleError = () => {
         setHasError(true);
         setIsLoading(false);
         setIsPlaying(false);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);

      return () => {
         audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
         audio.removeEventListener("timeupdate", handleTimeUpdate);
         audio.removeEventListener("canplay", handleCanPlay);
         audio.removeEventListener("play", handlePlay);
         audio.removeEventListener("pause", handlePause);
         audio.removeEventListener("ended", handleEnded);
         audio.removeEventListener("error", handleError);
      };
   }, [hasStartedPlayback, initialDuration]);

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const reg = getRegistry();
      reg?.add(audio);

      return () => {
         reg?.delete(audio);
         audio.pause();
         audio.removeAttribute("src");
         audio.load();
      };
   }, []);

   const togglePlay = async () => {
      const audio = audioRef.current;
      if (!audio || hasError) return;

      if (audioRequested) {
         if (audio.paused) {
            try {
               const reg = getRegistry();
               reg?.forEach((player) => {
                  if (player !== audio) {
                     player.pause();
                  }
               });
               await audio.play();
            } catch {
               setHasError(true);
               setIsPlaying(false);
            }
         } else {
            audio.pause();
         }
         return;
      }

      setHasStartedPlayback(true);
      setAudioRequested(true);
      setIsLoading(true);
      setHasError(false);
      setCurrentTime(0);
      audio.src = url;
      audio.load();
   };

   const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
   const activeBarCount = Math.max(0, Math.min(normalizedPeaks.length, Math.round(progress * normalizedPeaks.length)));

   const handleWaveClick = async (event: MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || hasError) return;

      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width) return;

      const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);

      if (!audioRequested) {
         pendingSeekRatioRef.current = ratio;
         setHasStartedPlayback(true);
         setAudioRequested(true);
         setIsLoading(true);
         setHasError(false);
         setCurrentTime(0);
         audio.src = url;
         audio.load();
         return;
      }

      audio.currentTime = duration * ratio;
      setCurrentTime(audio.currentTime);

      if (audio.paused) {
         try {
            const reg = getRegistry();
            reg?.forEach((player) => {
               if (player !== audio) {
                  player.pause();
               }
            });
            await audio.play();
         } catch {
            setHasError(true);
            setIsPlaying(false);
         }
      }
   };

    const handleWaveKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.currentTarget.click();
   };

   return (
      <div className={styles.call_center_sound_wrap_list_item_sound}>
         <audio
            ref={audioRef}
            preload={audioRequested ? "metadata" : "none"}
            className={styles.sr_only}
         />
         <button
            type="button"
            aria-label={isPlaying ? "Пауза" : "Прослушать запись"}
            className={styles.call_center_sound_wrap_list_item_sound_btn}
            onClick={togglePlay}
            disabled={hasError}
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
         {hasError ? (
            <audio
               className={styles.call_center_sound_wrap_list_item_sound_fallback}
               controls
               preload="auto"
               src={url}
            />
         ) : (
            <div
               role="button"
               tabIndex={0}
               aria-label="Перемотать запись"
               className={`${styles.call_center_sound_wrap_list_item_sound_wave} ${isLoading ? styles.call_center_sound_wrap_list_item_sound_wave__loading : ""}`}
               onClick={handleWaveClick}
               onKeyDown={handleWaveKeyDown}
            >
               <div aria-hidden="true" className={styles.call_center_sound_wrap_list_item_sound_wave_bars}>
                  {normalizedPeaks.map((peak, index) => (
                     <span
                        key={`${url}-${index}`}
                        className={`${styles.call_center_sound_wrap_list_item_sound_wave_bar} ${index < activeBarCount ? styles.call_center_sound_wrap_list_item_sound_wave_bar__active : ""}`}
                        style={{ height: `${Math.round(peak * 100)}%` }}
                     />
                  ))}
               </div>
            </div>
         )}
         <div className={styles.call_center_sound_wrap_list_item_sound_time}>
            {hasError ? "Ошибка" : formatTime(duration)}
         </div>
      </div>
   );
}

export default CallCenterSoundElAsync;
