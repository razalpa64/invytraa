import { useEffect, useRef } from 'react';

/**
 * Watches a container element and adds `.in-view` to all `.reveal` children
 * the moment the container enters the viewport. Uses native IntersectionObserver
 * — safe with Lenis, no GSAP ScrollTrigger conflicts.
 */
export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger each .reveal child by its data-delay attribute
          el.querySelectorAll<HTMLElement>('.reveal').forEach((child) => {
            child.classList.add('in-view');
          });
          observer.disconnect(); // fire once only
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
