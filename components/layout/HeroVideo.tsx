"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://videos.pexels.com/video-files/5926842/5926842-hd_1920_1080_24fps.mp4";

/**
 * 포스터 = 위 영상의 첫 프레임(0초)을 그대로 캡처한 사진.
 * 페이지가 뜨자마자 이 사진이 보이고, 영상이 0초부터 재생되면서 같은 장면 위로 서서히 겹쳐지므로
 * 사진 → 영상 전환이 끊김 없이 이어진다.
 */
const POSTER = "/hero-poster.jpg";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const show = () => setPlaying(true);

    // 새로고침 시 React가 붙기 전에 이미 자동재생이 시작된 경우 — 이벤트를 놓쳤으므로 상태로 직접 판단
    if (!v.paused && v.currentTime > 0) show();

    // 이후 재생 시작 / 프레임 진행 이벤트 모두 수신 (playing 하나만 믿지 않음)
    v.addEventListener("playing", show);
    v.addEventListener("timeupdate", show, { once: true });

    // 자동재생이 막혀 있으면 한 번 더 시도 (muted라 대부분 허용됨)
    v.play().catch(() => {});

    return () => {
      v.removeEventListener("playing", show);
      v.removeEventListener("timeupdate", show);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-slate-950">
      {/* 첫 프레임 사진 — 항상 깔려 있음 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${POSTER})`,
          filter: "saturate(0.75) brightness(0.9)",
        }}
      />

      {/* 영상 — 재생이 시작되면 사진 위로 서서히 나타남 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        style={{ filter: "saturate(0.75) brightness(0.9)" }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* 차분한 단일 톤 오버레이 (slate 살짝 띤 깊은 바다 느낌) */}
      <div className="absolute inset-0 bg-slate-950/55" />
    </div>
  );
}
