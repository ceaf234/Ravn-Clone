import { useState, useEffect, useCallback, useRef } from 'react';
import useReducedMotion from './useReducedMotion';

interface ParallaxConfig {
  /** Speed multiplier for the parallax effect (0.1 = subtle, 0.5 = dramatic) */
  speed?: number;
}

/**
 * Custom hook for parallax scroll effect.
 * Uses requestAnimationFrame for smooth performance.
 * Respects prefers-reduced-motion preference.
 */
function useParallax({ speed = 0.15 }: ParallaxConfig = {}): number {
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const rafIdRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Cancel any pending animation frame to avoid stacking
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      setOffset(scrollY * speed);
    });
  }, [prefersReducedMotion, speed]);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Return early without setting state - the initial state of 0 is already correct
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll, prefersReducedMotion]);

  // Return 0 when reduced motion is preferred, otherwise return the calculated offset
  return prefersReducedMotion ? 0 : offset;
}

export default useParallax;
