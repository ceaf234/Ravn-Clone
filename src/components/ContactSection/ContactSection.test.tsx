import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('renders with id="contacto" and aria-labelledby', () => {
    render(<ContactSection />);

    const section = document.getElementById('contacto');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'contact-heading');
  });

  it('contains h2 heading with appropriate text', () => {
    render(<ContactSection />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/tell us what you need/i);
    expect(heading).toHaveAttribute('id', 'contact-heading');
  });

  it('renders ContactForm within the section', () => {
    render(<ContactSection />);

    // ContactForm should be present - check for its form element
    const form = screen.getByRole('form', { name: /contact form/i });
    expect(form).toBeInTheDocument();
  });

  it('has 12-column grid layout with left intro and right form cards', () => {
    render(<ContactSection />);

    // Check for lg:grid-cols-12 on the grid container
    const gridContainer = document.querySelector('.lg\\:grid-cols-12');
    expect(gridContainer).toBeInTheDocument();

    // Check for left card (lg:col-span-4)
    const leftCard = document.querySelector('.lg\\:col-span-4');
    expect(leftCard).toBeInTheDocument();

    // Check for right card (lg:col-span-8)
    const rightCard = document.querySelector('.lg\\:col-span-8');
    expect(rightCard).toBeInTheDocument();
  });
});
