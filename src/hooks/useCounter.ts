import { useEffect, useRef, useState } from 'react';

/**
 * Animates a numeric counter from 0 to `target` when the element enters view.
 * Supports integer and decimal (1 decimal place) targets.
 */
export function useCounter(target: number, duration = 1800) {
  const ref = useRef<HTMLElement | null>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const isDecimal = !Number.isInteger(target);
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));

            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}
