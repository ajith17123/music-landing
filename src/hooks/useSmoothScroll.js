import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize Lenis smooth scrolling integrated with GSAP ticker & ScrollTrigger.
 * Features:
 * - Synchronizes Lenis RAF with GSAP ticker for 60/120fps buttery smooth scrolling
 * - Synchronizes scroll events with GSAP ScrollTrigger
 * - Smooth in-page anchor navigation with sticky navbar offset (-70px)
 * - Complete teardown and memory cleanup on unmount
 */
export const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Optional global reference for debugging or external triggers
    if (typeof window !== 'undefined') {
      window.lenis = lenis;
    }

    // 2. Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect Lenis RAF to GSAP ticker for frame-perfect animation synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Turn off GSAP lag smoothing to prevent scroll stuttering
    gsap.ticker.lagSmoothing(0);

    // 4. Handle smooth anchor scrolling for #hash links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          // Offset by 70px for sticky navbar height
          lenis.scrollTo(targetElement, {
            offset: -70,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 5. Cleanup on unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;

