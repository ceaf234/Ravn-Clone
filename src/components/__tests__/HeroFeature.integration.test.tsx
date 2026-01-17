/**
 * Hero Feature Integration Tests
 *
 * These tests verify critical user workflows and integration points
 * for the complete Hero Section feature (header + hero section).
 *
 * This file fills identified gaps from the test review (Task 8.2).
 * Maximum of 8 additional tests per Task 8.3 requirements.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Hero Feature Integration', () => {
  /**
   * Test 1: Complete hero page renders with all major sections
   * Gap identified: No integration test verifying header + hero work together
   */
  it('renders complete hero page with header and hero section', () => {
    render(<App />);

    // Header section with navigation
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Hero section as main content
    const heroSection = screen.getByRole('main');
    expect(heroSection).toBeInTheDocument();

    // Logo in header
    expect(screen.getByRole('link', { name: /gravitylabs/i })).toBeInTheDocument();

    // Navigation links in header
    expect(screen.getByRole('navigation', { name: /navegacion principal/i })).toBeInTheDocument();

    // Main headline in hero
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toHaveTextContent(/construimos el futuro de la tecnologia/i);

    // CTA buttons in hero
    expect(screen.getByRole('link', { name: /iniciar proyecto/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver proyectos/i })).toBeInTheDocument();
  });

  /**
   * Test 2: Escape key closes mobile menu
   * Gap identified: Keyboard handler exists but Escape key behavior not tested
   */
  it('closes mobile menu when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    await user.click(menuButton);

    // Verify menu is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Press Escape to close
    await user.keyboard('{Escape}');

    // Menu should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  /**
   * Test 3: Skip-to-content link targets main content area
   * Gap identified: Skip link exists but target verification not tested
   */
  it('skip-to-content link points to main content section', () => {
    render(<App />);

    // Find the skip link
    const skipLink = screen.getByRole('link', { name: /saltar al contenido/i });
    expect(skipLink).toHaveAttribute('href', '#main-content');

    // Verify the target element exists with correct id
    const mainContent = document.getElementById('main-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute('role', 'main');
  });

  /**
   * Test 4: "futuro" word is highlighted in accent blue color
   * Gap identified: Core visual requirement from spec not explicitly tested
   */
  it('highlights "futuro" word in accent blue color', () => {
    render(<App />);

    const headline = screen.getByRole('heading', { level: 1 });
    // The word "futuro" should be wrapped in a span with accent color
    const highlightedWord = within(headline).getByText('futuro');
    expect(highlightedWord).toBeInTheDocument();
    expect(highlightedWord).toHaveClass('text-accent-blue');
  });

  /**
   * Test 5: Eyebrow text displays correct content
   * Gap identified: Eyebrow content is critical for branding, only partially tested
   */
  it('displays eyebrow text with correct content and styling', () => {
    render(<App />);

    const heroSection = screen.getByRole('main');
    const eyebrow = within(heroSection).getByText('Consultoria Tecnologica');

    expect(eyebrow).toBeInTheDocument();
    // Verify uppercase styling is applied
    expect(eyebrow).toHaveClass('uppercase');
    // Verify letter spacing for proper display
    expect(eyebrow).toHaveClass('tracking-[0.2em]');
  });

  /**
   * Test 6: Subheadline displays complete value proposition
   * Gap identified: Value proposition copy is critical for conversion
   */
  it('displays subheadline with value proposition text', () => {
    render(<App />);

    const heroSection = screen.getByRole('main');
    const subheadline = within(heroSection).getByText(
      /consultoria tecnologica estrategica que transforma ideas ambiciosas/i
    );

    expect(subheadline).toBeInTheDocument();
    // Verify it includes the key phrase about innovation
    expect(subheadline).toHaveTextContent(/disenamos innovacion/i);
    // Verify max-width constraint for readability
    expect(subheadline).toHaveClass('max-w-xl');
  });

  /**
   * Test 7: Mobile menu closes when navigation link is clicked
   * Gap identified: UX workflow for menu dismissal not tested
   */
  it('closes mobile menu when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    await user.click(menuButton);

    // Verify menu is open
    const mobileMenu = screen.getByRole('dialog');
    expect(mobileMenu).toBeInTheDocument();

    // Click on a navigation link in the mobile menu
    const serviciosLink = within(mobileMenu).getByRole('link', { name: /servicios/i });
    await user.click(serviciosLink);

    // Menu should be closed after clicking a link
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  /**
   * Test 8: Scroll indicator links to services section
   * Gap identified: Scroll indicator functionality for navigation not tested
   */
  it('scroll indicator links to services section for navigation', () => {
    render(<App />);

    const scrollIndicator = screen.getByRole('link', {
      name: /desplazarse hacia abajo/i,
    });

    expect(scrollIndicator).toBeInTheDocument();
    // Should link to services section as per implementation
    expect(scrollIndicator).toHaveAttribute('href', '#servicios');
  });
});
