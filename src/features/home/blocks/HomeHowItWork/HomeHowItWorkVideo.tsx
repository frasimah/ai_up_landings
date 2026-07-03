"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/video/MainScreen.mp4";
const POSTER_SRC = "/img/home/how-it-work-poster.jpg";

function HomeHowItWorkVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        setIsActive(isIntersecting);

        if (isIntersecting) {
          setShouldLoad(true);
        }
      },
      {
        rootMargin: "160px 0px",
        threshold: 0.15,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (!isActive || prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => { });
  }, [isActive, prefersReducedMotion, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? VIDEO_SRC : undefined}
      loop
      muted
      playsInline
      poster={POSTER_SRC}
      preload={shouldLoad ? "metadata" : "none"}
      aria-hidden="true"
    />
  );
}

export default HomeHowItWorkVideo;
