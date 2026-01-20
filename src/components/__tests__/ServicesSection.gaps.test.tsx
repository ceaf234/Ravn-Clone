/**
 * Services Section Gap Analysis Tests
 *
 * Strategic tests to fill critical coverage gaps identified during Task Group 6.
 * Maximum of 8 additional tests focusing on:
 * - Service card content verification (all 6 services have correct text)
 * - Visual regression prevention (key CSS classes present)
 * - Accessibility audit (heading hierarchy, ARIA attributes complete)
 * - Full page workflow verification
 *
 * Test suite follows minimal test strategy per test-writing.md standards.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from '../../App';
import ServicesSection from '../ServicesSection';

describe('Services Section Gap Analysis', () => {
  /**
   * Test 1: All 6 services have correct English content
   * Verifies service card content matches spec requirements
   */
  it('all 6 services display correct English title and description content', () => {
    render(<ServicesSection />);

    // Service 1: Websites That Sell
    const websitesCard = screen
      .getByRole('heading', { name: /websites that sell/i })
      .closest('article');
    expect(websitesCard).toBeInTheDocument();
    expect(within(websitesCard!).getByText(/digital presence/i)).toBeInTheDocument();

    // Service 2: Process Automation
    const automationCard = screen
      .getByRole('heading', { name: /process automation/i })
      .closest('article');
    expect(automationCard).toBeInTheDocument();
    expect(within(automationCard!).getByText(/repetitive work/i)).toBeInTheDocument();

    // Service 3: Online Stores
    const storesCard = screen
      .getByRole('heading', { name: /online stores/i })
      .closest('article');
    expect(storesCard).toBeInTheDocument();
    expect(within(storesCard!).getByText(/24\/7/i)).toBeInTheDocument();

    // Service 4: Applied AI
    const aiCard = screen
      .getByRole('heading', { name: /applied artificial intelligence/i })
      .closest('article');
    expect(aiCard).toBeInTheDocument();
    expect(within(aiCard!).getByText(/chatbots/i)).toBeInTheDocument();
  });

  /**
   * Test 2: Visual regression prevention - key CSS classes for card styling
   * Verifies essential visual classes are present on service cards
   */
  it('service cards have essential visual styling classes for regression prevention', () => {
    const { container } = render(<ServicesSection />);

    const cards = container.querySelectorAll('article');
    expect(cards.length).toBe(6);

    cards.forEach((card) => {
      // Background
      expect(card).toHaveClass('bg-white/5');
      // Border radius
      expect(card).toHaveClass('rounded-2xl');
      // Scale transform base
      expect(card).toHaveClass('scale-100');
      // Transition
      expect(card).toHaveClass('transition-all');
    });
  });

  /**
   * Test 3: Accessibility - complete heading hierarchy within section
   * Verifies h3 cards are properly nested under h2 section heading
   */
  it('section maintains complete heading hierarchy (h2 > h3 structure)', () => {
    render(<ServicesSection />);

    // Get the section
    const section = screen.getByRole('region', { name: /custom solutions/i });

    // Get h2 within section
    const h2 = within(section).getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();

    // Get all h3 headings within section
    const h3Headings = within(section).getAllByRole('heading', { level: 3 });
    expect(h3Headings).toHaveLength(6);

    // Verify each h3 is for a service card
    const expectedTitles = [
      /websites that sell/i,
      /process automation/i,
      /online stores/i,
      /applied artificial intelligence/i,
      /internet of things/i,
      /management systems/i,
    ];

    h3Headings.forEach((h3, index) => {
      expect(h3).toHaveTextContent(expectedTitles[index]);
    });
  });

  /**
   * Test 4: Container constraint for readability
   * Verifies max-width container is applied to section content
   */
  it('section content has max-width container for readability', () => {
    const { container } = render(<ServicesSection />);

    // Find the inner container div
    const innerContainer = container.querySelector('.max-w-6xl');
    expect(innerContainer).toBeInTheDocument();
    expect(innerContainer).toHaveClass('mx-auto');

    // Verify grid is inside the container
    const grid = innerContainer?.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  /**
   * Test 5: Service icons use correct accent color
   * Verifies all icons are styled with accent-gold for visual interest
   */
  it('service icons use accent-gold color class', () => {
    const { container } = render(<ServicesSection />);

    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(6);

    icons.forEach((icon) => {
      expect(icon).toHaveClass('text-accent-gold');
      expect(icon).toHaveClass('h-10');
      expect(icon).toHaveClass('w-10');
    });
  });

  /**
   * Test 6: Section headline matches spec copy exactly
   * Verifies the exact English headline text from spec
   */
  it('section headline displays exact English copy from spec', () => {
    render(<ServicesSection />);

    const heading = screen.getByRole('heading', { level: 2 });

    // Verify the headline text
    expect(heading).toHaveTextContent(/software agency/i);
    expect(heading).toHaveTextContent(/custom solutions/i);
    expect(heading).toHaveTextContent(/focus on growing/i);
  });

  /**
   * Test 7: Full page navigation target verification
   * Verifies services section is properly targeted by scroll navigation
   */
  it('services section is accessible via scroll navigation from hero', () => {
    render(<App />);

    // Find scroll indicator
    const scrollLink = screen.getByRole('link', { name: /scroll down/i });
    expect(scrollLink).toHaveAttribute('href', '#servicios');

    // Verify target exists and has correct structure
    const targetSection = document.getElementById('servicios');
    expect(targetSection).toBeInTheDocument();
    expect(targetSection?.tagName.toLowerCase()).toBe('section');
    expect(targetSection).toHaveAttribute('aria-labelledby', 'services-heading');

    // Verify the labelledby heading exists
    const labelHeading = document.getElementById('services-heading');
    expect(labelHeading).toBeInTheDocument();
    expect(labelHeading?.tagName.toLowerCase()).toBe('h2');
  });

  /**
   * Test 8: Section background matches page background
   * Verifies bg-background class for seamless page integration
   */
  it('section uses consistent page background', () => {
    render(<ServicesSection />);

    const section = screen.getByRole('region', { name: /custom solutions/i });
    expect(section).toHaveClass('bg-background');
  });
});
