import type { ReactNode, MouseEventHandler } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ButtonProps {
  /** Button visual variant */
  variant?: 'primary' | 'secondary';
  /** Button content */
  children: ReactNode;
  /** Optional icon component to render (typically on the right) */
  icon?: LucideIcon;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Optional href for link buttons */
  href?: string;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers (if different from visible text) */
  ariaLabel?: string;
}

/** Base styles shared across all button variants - Meets 44x44px minimum touch target */
const baseStyles =
  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-blue';

/** Variant-specific styles with sufficient color contrast */
const variantStyles = {
  primary:
    'bg-white text-background hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/50',
  secondary:
    'bg-transparent border border-border text-text-primary hover:border-border-hover hover:bg-white/5 focus-visible:border-accent-blue',
};

function Button({
  variant = 'primary',
  children,
  icon: Icon,
  onClick,
  href,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  const content = (
    <>
      {children}
      {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={combinedStyles} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedStyles} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

export default Button;
