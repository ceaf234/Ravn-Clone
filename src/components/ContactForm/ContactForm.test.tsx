import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders all 7 required fields with English labels', () => {
    render(<ContactForm />);

    // Text inputs - accessible names
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /company/i })).toBeInTheDocument();

    // Custom select dropdowns (combobox role)
    expect(screen.getByRole('combobox', { name: /how can we help you/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /budget/i })).toBeInTheDocument();

    // Textarea
    expect(screen.getByRole('textbox', { name: /tell us about your project/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit attempt', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/this field is required/i).length).toBeGreaterThan(0);
    });
  });

  it('has submit button that is present in the form', () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('logs form data and shows success toast on valid submission', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const onSuccess = vi.fn();

    render(<ContactForm onSuccess={onSuccess} />);

    // Fill in all required text fields
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Carlos Alvarez');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '1234 5678');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'carlos@example.com');
    await user.type(screen.getByRole('textbox', { name: /company/i }), 'My Company Inc.');

    // Select from custom dropdowns
    const serviceDropdown = screen.getByRole('combobox', { name: /how can we help you/i });
    await user.click(serviceDropdown);
    await user.click(screen.getByRole('option', { name: /process automation/i }));

    const budgetDropdown = screen.getByRole('combobox', { name: /budget/i });
    await user.click(budgetDropdown);
    await user.click(screen.getByRole('option', { name: /\$1,000.*\$5,000/i }));

    await user.type(
      screen.getByRole('textbox', { name: /tell us about your project/i }),
      'This is a test message with more than twenty characters to pass the validation.'
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(screen.getByText(/thank you for contacting us/i)).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('has honeypot field hidden and rejects filled submissions silently', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<ContactForm />);

    // The honeypot field should be hidden with sr-only
    const honeypotField = document.querySelector('input[name="website"]');
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField?.parentElement).toHaveClass('sr-only');

    // Fill in all required text fields
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Bot User');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '1234 5678');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'bot@example.com');
    await user.type(screen.getByRole('textbox', { name: /company/i }), 'Bot Company');

    // Select from custom dropdowns
    const serviceDropdown = screen.getByRole('combobox', { name: /how can we help you/i });
    await user.click(serviceDropdown);
    await user.click(screen.getByRole('option', { name: /process automation/i }));

    const budgetDropdown = screen.getByRole('combobox', { name: /budget/i });
    await user.click(budgetDropdown);
    await user.click(screen.getByRole('option', { name: /\$1,000.*\$5,000/i }));

    await user.type(
      screen.getByRole('textbox', { name: /tell us about your project/i }),
      'This is a test message with more than twenty characters.'
    );

    // Fill the honeypot field (simulating a bot)
    if (honeypotField) {
      await user.type(honeypotField as HTMLInputElement, 'http://spam.com');
    }

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      // Should log honeypot triggered message
      expect(consoleSpy).toHaveBeenCalledWith('[Honeypot triggered]');
    });

    consoleSpy.mockRestore();
  });

  it('resets form after successful submission', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();

    render(<ContactForm />);

    // Fill in all required text fields
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    await user.type(nameInput, 'Carlos Alvarez');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '1234 5678');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'carlos@example.com');
    await user.type(screen.getByRole('textbox', { name: /company/i }), 'My Company Inc.');

    // Select from custom dropdowns
    const serviceDropdown = screen.getByRole('combobox', { name: /how can we help you/i });
    await user.click(serviceDropdown);
    await user.click(screen.getByRole('option', { name: /process automation/i }));

    const budgetDropdown = screen.getByRole('combobox', { name: /budget/i });
    await user.click(budgetDropdown);
    await user.click(screen.getByRole('option', { name: /\$1,000.*\$5,000/i }));

    await user.type(
      screen.getByRole('textbox', { name: /tell us about your project/i }),
      'This is a test message with more than twenty characters to pass the validation.'
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      // Form should be reset - name field should be empty
      expect(nameInput).toHaveValue('');
    });
  });
});
