import { useEffect, useRef } from 'react';

/**
 * Custom magnetic gold cursor — desktop only.
 * Hidden automatically on touch devices via CSS (hover: none media query).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices that support hover (desktop)
    if (!window.matchMedia('(hover: hover)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    // Smoothly follow with ring (lag effect)
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      requestAnimationFrame(animateRing);
    };

    const onMouseEnterInteractive = () => {
      dotRef.current?.classList.add('cursor-hover');
      ringRef.current?.classList.add('cursor-hover');
    };

    const onMouseLeaveInteractive = () => {
      dotRef.current?.classList.remove('cursor-hover');
      ringRef.current?.classList.remove('cursor-hover');
    };

    const bindInteractive = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    requestAnimationFrame(animateRing);
    bindInteractive();

    // Re-bind on DOM mutations (e.g., modals)
    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
