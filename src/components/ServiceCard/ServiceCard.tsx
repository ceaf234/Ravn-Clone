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
 * - Card background and border styling
 * - Rounded corners and padding
 * - Non-clickable cursor
 */
const baseStyles = 'bg-background-elevated rounded-2xl p-6 md:p-8 cursor-default';

/**
 * Hover interaction styles
 * - Scale transform on hover for subtle growth effect
 * - Border highlight transitioning from transparent to accent color
 * - Smooth transition with ease-out timing
 * - GPU acceleration for smooth animations
 */
const hoverStyles =
  'scale-100 hover:scale-[1.02] transform-gpu border border-transparent hover:border-accent-blue transition-all duration-300 ease-out';

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
      {/* Icon - Decorative, hidden from assistive technologies */}
      <Icon className="h-10 w-10 text-accent-blue mb-6" aria-hidden="true" />

      {/* Title - h3 for proper document outline hierarchy */}
      <h3 className="font-bold text-text-primary text-xl mb-4">{title}</h3>

      {/* Description */}
      <p className="text-text-muted text-base leading-relaxed">{description}</p>
    </article>
  );
}

export default ServiceCard;
