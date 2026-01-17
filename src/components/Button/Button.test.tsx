import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

describe('Button', () => {
  it('renders primary button with correct styles', () => {
    render(<Button variant="primary">Iniciar Proyecto</Button>);
    const button = screen.getByRole('button', { name: /iniciar proyecto/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('text-background');
  });

  it('renders secondary button with outline style', () => {
    render(<Button variant="secondary">Ver Proyectos</Button>);
    const button = screen.getByRole('button', { name: /ver proyectos/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('bg-transparent');
  });

  it('meets minimum touch target size of 44x44px', () => {
    render(<Button>Touch Target</Button>);
    const button = screen.getByRole('button', { name: /touch target/i });
    expect(button).toHaveClass('min-h-[44px]');
    expect(button).toHaveClass('min-w-[44px]');
  });

  it('renders arrow icon on primary button when provided', () => {
    render(
      <Button variant="primary" icon={ArrowRight}>
        Iniciar Proyecto
      </Button>
    );
    const button = screen.getByRole('button', { name: /iniciar proyecto/i });
    // Icon should be present and hidden from screen readers
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
