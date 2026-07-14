import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Thin gold progress bar pinned to the top of the viewport.
 * Updates on scroll via a passive listener — zero layout thrashing.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      id="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
