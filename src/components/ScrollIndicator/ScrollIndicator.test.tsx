import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScrollIndicator from './ScrollIndicator';

describe('ScrollIndicator', () => {
  it('renders at the bottom of its container', () => {
    render(<ScrollIndicator />);
    // The scroll indicator is now an accessible link
    const indicator = screen.getByRole('link', {
      name: /scroll down/i,
    });
    expect(indicator).toBeInTheDocument();
    // Check that the parent container has absolute positioning at the bottom
    const container = indicator.closest('div');
    expect(container).toHaveClass('absolute');
    // Mobile-first: bottom-6 on mobile, md:bottom-8 on tablet and up
    expect(container).toHaveClass('bottom-6');
    expect(container).toHaveClass('md:bottom-8');
  });

  it('respects prefers-reduced-motion by having motion-safe animation classes', () => {
    render(<ScrollIndicator />);
    const indicator = screen.getByRole('link', {
      name: /scroll down/i,
    });
    // The animation class is on the SVG icon inside the link
    const icon = indicator.querySelector('svg');
    expect(icon).toHaveClass('motion-safe:animate-bounce');
  });

  it('has proper accessibility attributes', () => {
    render(<ScrollIndicator />);
    const indicator = screen.getByRole('link', {
      name: /scroll down/i,
    });
    // Scroll indicator is an accessible link with English ARIA label
    expect(indicator).toHaveAttribute(
      'aria-label',
      'Scroll down to see more content'
    );
    // SVG icon is hidden from assistive technology
    const icon = indicator.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
