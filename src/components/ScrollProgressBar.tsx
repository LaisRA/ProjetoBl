import { useEffect, useRef } from 'react';

interface ScrollProgressBarProps {
  routeKey: string;
}

/**
 * 3px fixed top reading progress bar powered by requestAnimationFrame + transform: scaleX().
 * Updates the DOM directly for 60fps compositor-only performance with zero React re-renders.
 */
export function ScrollProgressBar({ routeKey }: ScrollProgressBarProps) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const bar = barRef.current;
      if (!bar) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        docHeight <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / docHeight));

      bar.style.transform = `scaleX(${ratio})`;
      bar.style.opacity = ratio > 0.004 ? '1' : '0';
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [routeKey]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[3px] bg-transparent"
    >
      <div
        ref={barRef}
        className="reading-progress-bar h-full w-full origin-left will-change-transform"
        style={{ transform: 'scaleX(0)', opacity: 0 }}
      />
    </div>
  );
}
