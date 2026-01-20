/**
 * ServiceCard Hover Interactions Tests
 *
 * Tests verify hover interaction functionality for the ServiceCard component:
 * - Scale transform classes are applied for hover state
 * - Border transition classes are present
 * - Transition duration classes are applied for smooth animations
 * - Motion-reduce classes disable transform animations for accessibility
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Code2 } from 'lucide-react';
import ServiceCard from './ServiceCard';

describe('ServiceCard Hover Interactions', () => {
  const defaultProps = {
    title: 'Software Development',
    description: 'We build scalable, high-performance software.',
    icon: Code2,
  };

  /**
   * Test 1: Scale transform classes are applied for hover effect
   */
  it('applies scale transform classes for hover state', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('scale-100');
    expect(card).toHaveClass('hover:scale-[1.02]');
    expect(card).toHaveClass('transform-gpu');
  });

  /**
   * Test 2: Border transition classes are present
   */
  it('applies border transition classes for hover highlight', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);

    const card = container.firstChild;
    // Base state: subtle white border
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-white/10');
    // Hover state: accent border color
    expect(card).toHaveClass('hover:border-accent-gold');
  });

  /**
   * Test 3: Transition duration classes are applied for smooth animations
   */
  it('applies transition classes for smooth animations', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('transition-all');
    expect(card).toHaveClass('duration-300');
    expect(card).toHaveClass('ease-out');
  });

  /**
   * Test 4: Motion-reduce classes disable transform animations for accessibility
   */
  it('applies motion-reduce classes to disable animations for accessibility', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('motion-reduce:transform-none');
    expect(card).toHaveClass('motion-reduce:transition-none');
  });
});
