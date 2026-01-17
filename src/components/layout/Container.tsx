import type { ReactNode, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Content to be wrapped in the container */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** HTML element to render as (default: div) */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Shared layout container for consistent horizontal alignment across sections.
 * Used by Header, HeroSection, and other page sections to ensure
 * the left edge of content aligns perfectly at all breakpoints.
 *
 * Padding: px-6 sm:px-8 lg:px-10 2xl:px-12
 * Max-widths: max-w-7xl -> 1440px -> 1728px -> 1920px -> 2200px
 */
function Container({ children, className = '', as: Component = 'div', ...props }: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 2xl:max-w-[1440px] 2xl:px-12 3xl:max-w-[1728px] 4xl:max-w-[1920px] 5xl:max-w-[2200px] ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
