import { useState, useEffect, useRef, RefObject } from 'react';

interface UseFadeElementReturn {
  isVisible: boolean;
  fadeIn: () => void;
  fadeOut: () => void;
  elementRef: RefObject<HTMLDivElement>;
}

export const useFadeElement = (fadeDuration: number = 1000): UseFadeElementReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const fadeIn = () => {
    if (elementRef.current) {
      elementRef.current.style.transition = `opacity ${fadeDuration}ms ease`;
      elementRef.current.style.opacity = '1';
    }
    setIsVisible(true);
    setShouldFadeOut(false);
  };

  const fadeOut = () => {
    if (elementRef.current) {
      elementRef.current.style.transition = `opacity ${fadeDuration}ms ease`;
      elementRef.current.style.opacity = '0';
    }
    setShouldFadeOut(true);
  };

  useEffect(() => {
    if (shouldFadeOut) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, fadeDuration);

      return () => clearTimeout(timeout);
    }
  }, [shouldFadeOut, fadeDuration]);

  return {
    isVisible,
    fadeIn,
    fadeOut,
    elementRef,
  };
};
