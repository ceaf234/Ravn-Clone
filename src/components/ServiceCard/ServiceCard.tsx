import type { LucideIcon } from 'lucide-react';

/**
 * Props for the ServiceCard component
 */
export interface ServiceCardProps {
  /** Service title displayed as h3 heading */
  title: string;
  /** Service description text */
  description: string;
  /** Lucide icon component to display at top of card */
  icon: LucideIcon;
  /** Additional CSS classes for customization */
  className?: string;
}

/**
 * Base styles for the ServiceCard component
 * - Glass/transparent background matching Contact section cards
 * - Subtle border and shadow for depth
 * - Rounded corners and padding that scales on large screens
 * - Non-clickable cursor
 */
const baseStyles = 'bg-white/5 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] rounded-2xl p-6 md:p-8 2xl:p-10 3xl:p-12 4xl:p-14 cursor-default 2xl:rounded-3xl';

/**
 * Hover interaction styles
 * - Scale transform on hover for subtle growth effect
 * - Border highlight transitioning to accent color
 * - Smooth transition with ease-out timing
 * - GPU acceleration for smooth animations
 */
const hoverStyles =
  'scale-100 hover:scale-[1.02] transform-gpu hover:border-accent-gold transition-all duration-300 ease-out';

/**
 * Accessibility styles for reduced motion preference
 * - Disables transform animations
 * - Disables transitions
 * - Respects user preference for reduced motion (prefers-reduced-motion)
 */
const motionReduceStyles = 'motion-reduce:transform-none motion-reduce:transition-none';

/**
 * ServiceCard displays a service offering with icon, title, and description.
 * Used in the Services Section to showcase company capabilities.
 *
 * Cards are informational and non-interactive (no click behavior).
 * Includes subtle hover effects that respect prefers-reduced-motion.
 *
 * @example
 * ```tsx
 * import { Code2 } from 'lucide-react';
 *
 * <ServiceCard
 *   title="Software Development"
 *   description="We build scalable software solutions."
 *   icon={Code2}
 * />
 * ```
 */
function ServiceCard({ title, description, icon: Icon, className = '' }: ServiceCardProps) {
  return (
    <article className={`${baseStyles} ${hoverStyles} ${motionReduceStyles} ${className}`.trim()}>
      {/* Icon - Decorative, hidden from assistive technologies, scales on large screens */}
      <Icon className="h-10 w-10 text-accent-gold mb-6 2xl:h-12 2xl:w-12 2xl:mb-8 3xl:h-14 3xl:w-14 3xl:mb-10 4xl:h-16 4xl:w-16" aria-hidden="true" />

      {/* Title - h3 for proper document outline hierarchy, scales on large screens */}
      <h3 className="font-bold text-text-primary text-card-title mb-4 2xl:mb-5 3xl:mb-6">{title}</h3>

      {/* Description - scales on large screens */}
      <p className="text-text-muted text-card-body leading-relaxed">{description}</p>
    </article>
  );
}

export default ServiceCard;
