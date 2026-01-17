import { useState, useEffect, useCallback } from 'react';

export interface TypewriterTextProps {
  /** The text to type out */
  text: string;
  /** Typing speed in milliseconds per character (default: 50) */
  speed?: number;
  /** Pause duration after punctuation like "." in milliseconds (default: 400) */
  pauseAfterPunctuation?: number;
  /** Whether to show a blinking caret (default: true) */
  showCaret?: boolean;
  /** Whether to keep caret blinking after typing completes (default: true) */
  keepCaretAfterComplete?: boolean;
  /** Delay before starting to type in milliseconds (default: 500) */
  startDelay?: number;
  /** Additional CSS classes for the text */
  className?: string;
  /** Callback when typing is complete */
  onComplete?: () => void;
}

/**
 * Hook to detect if user prefers reduced motion
 */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * TypewriterText component displays text with a typing animation effect.
 *
 * Features:
 * - Character-by-character typing animation
 * - Configurable typing speed
 * - Pause after punctuation (periods, exclamation marks, question marks)
 * - Blinking caret cursor
 * - Respects prefers-reduced-motion for accessibility
 *
 * @example
 * ```tsx
 * <TypewriterText
 *   text="Design. Build. Scale."
 *   speed={50}
 *   pauseAfterPunctuation={400}
 * />
 * ```
 */
function TypewriterText({
  text,
  speed = 50,
  pauseAfterPunctuation = 400,
  showCaret = true,
  keepCaretAfterComplete = true,
  startDelay = 500,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Check if character is punctuation that should trigger a pause
  const isPauseChar = useCallback((char: string): boolean => {
    return char === '.' || char === '!' || char === '?';
  }, []);

  useEffect(() => {
    // If user prefers reduced motion, show full text immediately
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsTypingComplete(true);
      setHasStarted(true);
      onComplete?.();
      return;
    }

    // Start delay before typing begins
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [prefersReducedMotion, text, startDelay, onComplete]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        const currentChar = text[currentIndex];
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;

        // Calculate delay for next character
        const isLastChar = currentIndex >= text.length;
        const delay = isPauseChar(currentChar) && !isLastChar
          ? speed + pauseAfterPunctuation
          : speed;

        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
        onComplete?.();
      }
    };

    typeNextChar();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasStarted, text, speed, pauseAfterPunctuation, isPauseChar, prefersReducedMotion, onComplete]);

  // Determine if caret should be visible
  const shouldShowCaret = showCaret && hasStarted && (!isTypingComplete || keepCaretAfterComplete);

  return (
    <span className={className}>
      {displayedText}
      {shouldShowCaret && (
        <span
          className="animate-blink ml-[0.05em] inline-block text-accent-gold"
          aria-hidden="true"
        >
          |
        </span>
      )}
      {/* Screen reader accessible full text */}
      <span className="sr-only">{text}</span>
    </span>
  );
}

export default TypewriterText;
