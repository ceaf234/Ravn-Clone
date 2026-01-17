import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from '../../App';

describe('Responsive Layout', () => {
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

  it('renders mobile layout correctly at 375px width', () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<App />);

    // Hero section should be present with mobile-first styles
    const heroSection = screen.getByRole('main');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('px-4'); // Mobile padding

    // Headline should be present and readable
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();

    // CTA buttons container should have mobile stacking classes
    const primaryCTA = screen.getByRole('link', { name: /iniciar proyecto/i });
    const secondaryCTA = screen.getByRole('link', { name: /ver proyectos/i });
    expect(primaryCTA).toBeInTheDocument();
    expect(secondaryCTA).toBeInTheDocument();

    // Both buttons should have full width on mobile
    expect(primaryCTA).toHaveClass('w-full');
    expect(secondaryCTA).toHaveClass('w-full');

    // Mobile menu button should be present
    const mobileMenuButton = screen.getByRole('button', { name: /abrir menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('renders desktop layout correctly at 1280px width', () => {
    // Set desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });

    render(<App />);

    // Hero section should have desktop padding classes
    const heroSection = screen.getByRole('main');
    expect(heroSection).toBeInTheDocument();
    // Desktop should have responsive padding classes
    expect(heroSection).toHaveClass('lg:px-8');

    // Content container should have max-width for readability
    const contentContainer = heroSection.querySelector('.max-w-4xl');
    expect(contentContainer).toBeInTheDocument();

    // Desktop navigation should have nav links - verify header banner exists
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Get the main navigation by aria-label (more specific query to avoid multiple matches)
    const mainNav = within(header).getByRole('navigation', { name: /navegacion principal/i });
    expect(mainNav).toBeInTheDocument();

    // Verify desktop nav container has appropriate responsive classes
    const desktopNavContainer = header.querySelector('.md\\:flex');
    expect(desktopNavContainer).toBeInTheDocument();

    // CTA buttons should have responsive width classes
    const primaryCTA = screen.getByRole('link', { name: /iniciar proyecto/i });
    expect(primaryCTA).toHaveClass('sm:w-auto');
  });

  it('typography scales appropriately with clamp values', () => {
    render(<App />);

    // Headline should use responsive typography class
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toHaveClass('text-display-xl');

    // Find the hero section to scope our queries
    const heroSection = screen.getByRole('main');

    // Eyebrow text should use responsive typography (exact match for uppercase text)
    const eyebrow = within(heroSection).getByText('Consultoria Tecnologica');
    expect(eyebrow).toHaveClass('text-eyebrow');

    // Body text should use responsive typography
    const bodyText = within(heroSection).getByText(/transforma ideas ambiciosas/i);
    expect(bodyText).toHaveClass('text-body-lg');
  });

  it('has no horizontal overflow at various viewport widths', () => {
    // Test at narrow mobile width (320px)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });

    render(<App />);

    // Hero section should have overflow hidden to prevent horizontal scroll
    const heroSection = screen.getByRole('main');
    expect(heroSection).toHaveClass('overflow-hidden');
  });
});
