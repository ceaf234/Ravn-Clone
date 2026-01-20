/**
 * ServicesSection Responsive Layout Tests
 *
 * Tests verify responsive behavior for the Services Section:
 * - Grid classes include mobile (1 col), tablet (2 col), desktop (3 col)
 * - Section padding scales appropriately across breakpoints
 * - Typography uses responsive sizing (clamp-based design tokens)
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesSection from './ServicesSection';

describe('ServicesSection Responsive Layout', () => {
  // Store original window dimensions
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    // Restore original dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
    vi.restoreAllMocks();
  });

  /**
   * Test 1: Grid classes include mobile (1 col), tablet (2 col), desktop (3 col)
   */
  it('applies responsive grid classes for mobile, tablet, and desktop layouts', () => {
    const { container } = render(<ServicesSection />);

    // Find the grid container (the div containing the service cards)
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();

    // Verify mobile-first single column
    expect(gridContainer).toHaveClass('grid-cols-1');

    // Verify tablet 2-column breakpoint
    expect(gridContainer).toHaveClass('md:grid-cols-2');

    // Verify desktop 3-column breakpoint
    expect(gridContainer).toHaveClass('lg:grid-cols-3');

    // Verify gap spacing is applied
    expect(gridContainer).toHaveClass('gap-6');
  });

  /**
   * Test 2: Section padding scales appropriately across breakpoints
   */
  it('applies responsive padding classes to the section', () => {
    render(<ServicesSection />);

    // Get the section element by role region with English aria-labelledby text
    const section = screen.getByRole('region', { name: /custom solutions/i });

    // Verify mobile padding (base)
    expect(section).toHaveClass('px-4');

    // Verify tablet padding
    expect(section).toHaveClass('md:px-6');

    // Verify desktop padding
    expect(section).toHaveClass('lg:px-8');

    // Verify vertical section padding using design token
    expect(section).toHaveClass('py-section');
  });

  /**
   * Test 3: Typography uses responsive sizing via design tokens
   */
  it('uses responsive typography design tokens for heading', () => {
    render(<ServicesSection />);

    // Get the section heading
    const heading = screen.getByRole('heading', { level: 2 });

    // Heading should use the responsive display-md token (uses clamp)
    expect(heading).toHaveClass('text-display-md');

    // Verify leading (line-height) is applied
    expect(heading).toHaveClass('leading-[1.1]');

    // Heading should have max-width for readability
    expect(heading).toHaveClass('max-w-3xl');
  });

  /**
   * Test 4: Service cards have responsive padding
   */
  it('applies responsive padding to service cards', () => {
    const { container } = render(<ServicesSection />);

    // Get all service cards (article elements)
    const cards = container.querySelectorAll('article');
    expect(cards.length).toBe(6);

    // Each card should have responsive padding classes
    cards.forEach((card) => {
      // Base mobile padding
      expect(card).toHaveClass('p-6');

      // Tablet/desktop padding
      expect(card).toHaveClass('md:p-8');
    });
  });
});
