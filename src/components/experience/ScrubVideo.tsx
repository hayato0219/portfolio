'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrubVideoProps {
  /** Scrub-friendly preview (dense keyframes, no audio). */
  src: string;
  hintHover: string;
  hintTouch: string;
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * A silent preview whose playhead follows the pointer's horizontal position
 * (mouse) or the element's progress through the viewport (touch).
 */
const ScrubVideo: React.FC<ScrubVideoProps> = ({ src, hintHover, hintTouch }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const target = useRef<number | null>(null);
  const frame = useRef(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  // Coalesce seeks to one per frame; a seek requested mid-seek is applied on `seeked`.
  const applySeek = () => {
    frame.current = 0;
    const v = videoRef.current;
    if (!v || target.current === null || v.seeking) return;
    if (Math.abs(v.currentTime - target.current) > 0.03) v.currentTime = target.current;
  };

  const seekTo = (ratio: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    const r = clamp(ratio);
    setProgress(r);
    target.current = r * v.duration;
    if (!frame.current) frame.current = requestAnimationFrame(applySeek);
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Touch devices have no hover: drive the playhead from scroll position instead.
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = wrapRef.current;
    if (!el) return;

    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setActive(visible);
    });
    io.observe(el);

    const onScroll = () => {
      if (!visible) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top enters at the bottom, 1 when the bottom leaves at the top;
      // compressed to the middle 70% so the full clip plays while it's readable.
      const raw = (vh - rect.top) / (vh + rect.height);
      seekTo((raw - 0.15) / 0.7);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={wrapRef}
      className={`scrub${active ? ' scrub--active' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(false)}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = e.currentTarget.getBoundingClientRect();
        seekTo((e.clientX - rect.left) / rect.width);
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        onSeeked={applySeek}
      />
      <span className="scrub__hint" aria-hidden="true">
        <span className="scrub__hint--hover">{hintHover}</span>
        <span className="scrub__hint--touch">{hintTouch}</span>
      </span>
      <span className="scrub__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </span>
    </span>
  );
};

export default ScrubVideo;
