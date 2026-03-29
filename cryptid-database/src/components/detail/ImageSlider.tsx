"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

function isVideo(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function MediaItem({ src, alt, fill, sizes, className }: { src: string; alt: string; fill?: boolean; sizes?: string; className?: string }) {
  if (isVideo(src)) {
    return (
      <video src={src} controls playsInline muted loop className={className || "w-full h-full object-contain"} />
    );
  }
  return <Image src={src} alt={alt} fill={fill} className={className} sizes={sizes} />;
}

export default function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const hasMultiple = images.length > 1;

  const goTo = useCallback((next: number) => setIdx(next), []);
  const next = useCallback(() => goTo((idx + 1) % images.length), [idx, images.length, goTo]);

  useEffect(() => {
    if (!hasMultiple || lightbox || isVideo(images[idx])) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [hasMultiple, next, lightbox, idx]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") goTo((idx + 1) % images.length);
      if (e.key === "ArrowLeft") goTo((idx - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox, idx, images.length, goTo]);

  return (
    <>
      <div className="relative aspect-[4/3] group overflow-hidden cursor-pointer" onClick={() => setLightbox(true)}>
        <div className="flex items-center transition-transform duration-500 ease-in-out h-full" style={{ width: `${images.length * 100}%`, transform: `translateX(-${idx * (100 / images.length)}%)` }}>
          {images.map((src, i) => (
            <div key={i} className="relative h-full flex items-center justify-center bg-black" style={{ width: `${100 / images.length}%` }}>
              {isVideo(src) ? (
                <video src={src} controls={i === idx} playsInline muted loop className="w-full h-full object-contain" onClick={(e) => e.stopPropagation()} />
              ) : (
                <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-contain" sizes="480px" />
              )}
            </div>
          ))}
        </div>
        {hasMultiple && (
          <>
            <button onClick={(e) => { e.stopPropagation(); goTo((idx - 1 + images.length) % images.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white text-sm flex items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-10">←</button>
            <button onClick={(e) => { e.stopPropagation(); goTo((idx + 1) % images.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white text-sm flex items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-10">→</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((src, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); goTo(i); }} className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-mono px-2 py-0.5 rounded z-10">{idx + 1} / {images.length}</span>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <div className="relative w-[90vw] h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {isVideo(images[idx]) ? (
              <video src={images[idx]} controls autoPlay playsInline className="max-w-full max-h-full object-contain" />
            ) : (
              <Image src={images[idx]} alt={`${alt} ${idx + 1}`} fill className="object-contain" sizes="90vw" />
            )}
            {hasMultiple && (
              <>
                <button onClick={() => goTo((idx - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white text-lg flex items-center justify-center hover:bg-white/30 transition-colors">←</button>
                <button onClick={() => goTo((idx + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white text-lg flex items-center justify-center hover:bg-white/30 transition-colors">→</button>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-mono px-3 py-1 rounded">{idx + 1} / {images.length}</span>
              </>
            )}
          </div>
          <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white text-lg flex items-center justify-center hover:bg-white/30 transition-colors">✕</button>
        </div>
      )}
    </>
  );
}
