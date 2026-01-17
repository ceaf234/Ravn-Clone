import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

type ContainerProps<T extends ElementType = 'div'> = {
  /** Content to be wrapped in the container */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** HTML element to render as (default: div) */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * Shared layout container for consistent horizontal alignment across sections.
 * Used by Header, HeroSection, and other page sections to ensure
 * the left edge of content aligns perfectly at all breakpoints.
 *
 * Padding: px-6 sm:px-8 lg:px-10 2xl:px-12
 * Max-widths: max-w-7xl -> 1440px -> 1728px -> 1920px -> 2200px
 */
function Container<T extends ElementType = 'div'>({
  children,
  className = '',
  as,
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div';
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
