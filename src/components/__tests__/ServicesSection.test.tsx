/**
 * ServicesSection Component Tests
 *
 * Tests verify critical functionality for the Services Section:
 * - Semantic HTML structure with section element
 * - Proper heading hierarchy (h2)
 * - All 4 service cards render correctly
 * - Accessibility via aria-labelledby
 * - Correct Lucide icons for each service
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesSection from '../ServicesSection';

describe('ServicesSection', () => {
  /**
   * Test 1: Section renders with correct semantic HTML (section element)
   */
  it('renders with correct semantic HTML section element', () => {
    render(<ServicesSection />);

    // Section is labelled by its h2 heading content
    const section = screen.getByRole('region', { name: /productos digitales/i });
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe('section');
    expect(section).toHaveAttribute('id', 'servicios');
  });

  /**
   * Test 2: h2 heading is used for section title
   */
  it('uses h2 heading for section title', () => {
    render(<ServicesSection />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/productos digitales/i);
  });

  /**
   * Test 3: All 4 service cards are rendered
   */
  it('renders all 4 service cards', () => {
    render(<ServicesSection />);

    // Find all article elements (ServiceCard uses article)
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(4);

    // Verify each service title is present
    expect(screen.getByRole('heading', { name: /desarrollo de software/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /dise[n|ñ]o de experiencia/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /integraci[o|ó]n de ia/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /automatizaci[o|ó]n de procesos/i })
    ).toBeInTheDocument();
  });

  /**
   * Test 4: Section has aria-labelledby pointing to heading
   */
  it('has aria-labelledby pointing to the section heading', () => {
    render(<ServicesSection />);

    const section = screen.getByRole('region');
    const heading = screen.getByRole('heading', { level: 2 });

    // Section should have aria-labelledby referencing the heading's id
    expect(section).toHaveAttribute('aria-labelledby');
    const labelledById = section.getAttribute('aria-labelledby');
    expect(heading).toHaveAttribute('id', labelledById);
  });

  /**
   * Test 5: Correct Lucide icons are used for each service (decorative with aria-hidden)
   */
  it('renders icons as decorative elements with aria-hidden', () => {
    const { container } = render(<ServicesSection />);

    // Find all SVG elements within the container (Lucide icons render as SVG)
    const icons = container.querySelectorAll('svg[aria-hidden="true"]');

    // Each of the 4 cards should have an icon with aria-hidden
    expect(icons.length).toBe(4);

    // Verify each icon has the correct classes (Lucide icon class pattern)
    icons.forEach((icon) => {
      expect(icon).toHaveClass('lucide');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  /**
   * Test 6: Eyebrow text displays correct content
   */
  it('displays eyebrow text with correct content', () => {
    render(<ServicesSection />);

    const eyebrow = screen.getByText('En Antigravity');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveClass('uppercase');
    expect(eyebrow).toHaveClass('tracking-[0.2em]');
  });
});
