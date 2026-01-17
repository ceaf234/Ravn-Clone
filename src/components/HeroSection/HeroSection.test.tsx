import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('occupies full viewport height', () => {
    render(<HeroSection />);
    const heroSection = screen.getByRole('main');
    expect(heroSection).toHaveClass('min-h-screen');
  });

  it('renders headline with correct h1 structure', () => {
    render(<HeroSection />);
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent(/construimos el futuro de la tecnologia/i);
  });

  it('renders CTA buttons that are accessible', () => {
    render(<HeroSection />);
    const primaryCTA = screen.getByRole('link', { name: /iniciar proyecto/i });
    const secondaryCTA = screen.getByRole('link', { name: /ver proyectos/i });
    expect(primaryCTA).toBeInTheDocument();
    expect(secondaryCTA).toBeInTheDocument();
  });

  it('has vertically centered content with flexbox', () => {
    render(<HeroSection />);
    const heroSection = screen.getByRole('main');
    expect(heroSection).toHaveClass('flex');
    expect(heroSection).toHaveClass('items-center');
    expect(heroSection).toHaveClass('justify-center');
  });
});
