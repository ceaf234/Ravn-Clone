/**
 * ServiceCard Component Tests
 *
 * Tests verify critical functionality for the ServiceCard component:
 * - Renders with required props (title, description, icon)
 * - Proper accessibility with aria-hidden on icons
 * - Semantic heading hierarchy (h3)
 * - Non-clickable card styling (cursor-default)
 * - Correct background and padding classes
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Code2 } from 'lucide-react';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
  const defaultProps = {
    title: 'Software Development',
    description: 'We build scalable, high-performance software.',
    icon: Code2,
  };

  /**
   * Test 1: Component renders with required props
   */
  it('renders with required props (title, description, icon)', () => {
    render(<ServiceCard {...defaultProps} />);

    expect(screen.getByRole('heading', { name: defaultProps.title })).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    // Icon should be rendered (as SVG element)
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  /**
   * Test 2: Icon has aria-hidden for accessibility (decorative)
   */
  it('renders icon with aria-hidden="true" for accessibility', () => {
    render(<ServiceCard {...defaultProps} />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  /**
   * Test 3: Title uses h3 heading tag for proper document outline
   */
  it('uses h3 heading tag for card title', () => {
    render(<ServiceCard {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(defaultProps.title);
  });

  /**
   * Test 4: Card has cursor-default class (non-clickable)
   */
  it('applies cursor-default class for non-clickable card', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('cursor-default');
  });

  /**
   * Test 5: Card has correct background and padding classes
   */
  it('applies correct background and padding classes', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('bg-background-elevated');
    expect(card).toHaveClass('p-6');
    expect(card).toHaveClass('rounded-2xl');
  });
});
