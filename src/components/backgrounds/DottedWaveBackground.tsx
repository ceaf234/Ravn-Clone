import type { ReactNode, CSSProperties } from 'react';

export interface DottedWaveBackgroundProps {
  /** Content to render above the background */
  children: ReactNode;
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** Brightness multiplier for the wave effect (default: 1.3 = 30% brighter) */
  brightnessBoost?: number;
  /** HTML tag to use for the wrapper element */
  as?: 'div' | 'section' | 'main' | 'article';
  /** ID for the section (useful for anchor navigation) */
  id?: string;
  /** ARIA labelledby reference */
  'aria-labelledby'?: string;
  /** Role attribute */
  role?: string;
}

/**
 * Reusable dotted wave background component.
 * Renders a dot grid pattern with an animated wave shimmer effect.
 *
 * Features:
 * - Base dot layer with subtle static dots
 * - Animated wave overlay that sweeps diagonally
 * - Configurable brightness via CSS custom property
 * - Respects prefers-reduced-motion (animation disabled, static dots remain)
 * - Responsive dot sizes (larger on bigger screens)
 * - pointer-events: none on background layers (content remains interactive)
 *
 * @example
 * ```tsx
 * <DottedWaveBackground as="section" brightnessBoost={1.3}>
 *   <Container>
 *     <h1>Your content here</h1>
 *   </Container>
 * </DottedWaveBackground>
 * ```
 */
function DottedWaveBackground({
  children,
  className = '',
  brightnessBoost = 1.3,
  as: Component = 'div',
  id,
  'aria-labelledby': ariaLabelledby,
  role,
}: DottedWaveBackgroundProps) {
  // Calculate brightness values based on boost
  // Base wave opacity: 0.51 (~60% brighter than original 0.30), boosted: 0.51 * brightnessBoost
  // Capped at 0.85 to keep it tasteful
  const waveOpacity = Math.min(0.51 * brightnessBoost, 0.85);
  // Filter brightness: 1.95 base (~70% brighter than original 1.15), boosted by the same factor
  // Capped at 2.5 to prevent glaring
  const filterBrightness = Math.min(1.95 * brightnessBoost, 2.5);

  const style: CSSProperties = {
    '--dot-wave-opacity': waveOpacity,
    '--dot-wave-brightness': filterBrightness,
  } as CSSProperties;

  return (
    <Component
      id={id}
      role={role}
      aria-labelledby={ariaLabelledby}
      className={`dot-wave relative ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}

export default DottedWaveBackground;
