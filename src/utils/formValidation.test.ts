import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateMinLength,
  validateMaxLength,
  validateContactForm,
  type ContactFormData,
} from './formValidation';

describe('Form Validation Utilities', () => {
  it('returns English error message for empty required field', () => {
    const result = validateRequired('', 'Name');
    expect(result).toBe('This field is required');

    const resultWithValue = validateRequired('Carlos', 'Name');
    expect(resultWithValue).toBeNull();
  });

  it('validates email format correctly', () => {
    // Invalid emails
    expect(validateEmail('')).toBe('Please enter a valid email address');
    expect(validateEmail('invalid')).toBe('Please enter a valid email address');
    expect(validateEmail('invalid@')).toBe('Please enter a valid email address');
    expect(validateEmail('@domain.com')).toBe('Please enter a valid email address');

    // Valid emails
    expect(validateEmail('test@example.com')).toBeNull();
    expect(validateEmail('user.name@domain.co')).toBeNull();
    expect(validateEmail('user+tag@example.org')).toBeNull();
  });

  it('validates phone numbers with digits, spaces, dashes, and parentheses', () => {
    // Valid phone formats
    expect(validatePhone('12345678')).toBeNull();
    expect(validatePhone('1234 5678')).toBeNull();
    expect(validatePhone('(502) 1234-5678')).toBeNull();
    expect(validatePhone('+502 1234-5678')).toBeNull();
    expect(validatePhone('123-456-7890')).toBeNull();

    // Invalid phone formats
    expect(validatePhone('')).toBe('Please enter a valid phone number');
    expect(validatePhone('abc123')).toBe('Please enter a valid phone number');
    expect(validatePhone('phone: 123')).toBe('Please enter a valid phone number');
  });

  it('validates minLength and maxLength with English messages', () => {
    // minLength validation
    expect(validateMinLength('A', 2, 'Name')).toBe(
      'The Name field must be at least 2 characters'
    );
    expect(validateMinLength('AB', 2, 'Name')).toBeNull();
    expect(validateMinLength('ABC', 2, 'Name')).toBeNull();

    // maxLength validation
    expect(validateMaxLength('A'.repeat(101), 100, 'Name')).toBe(
      'The Name field cannot exceed 100 characters'
    );
    expect(validateMaxLength('A'.repeat(100), 100, 'Name')).toBeNull();
    expect(validateMaxLength('A'.repeat(50), 100, 'Name')).toBeNull();
  });

  it('validates entire form and returns all errors', () => {
    const emptyForm: ContactFormData = {
      name: '',
      phone: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: '',
    };

    const result = validateContactForm(emptyForm);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    // Check that multiple fields have errors
    const fieldNames = result.errors.map((e) => e.field);
    expect(fieldNames).toContain('name');
    expect(fieldNames).toContain('email');
    expect(fieldNames).toContain('phone');

    // Valid form
    const validForm: ContactFormData = {
      name: 'Carlos Alvarez',
      phone: '1234 5678',
      email: 'carlos@example.com',
      company: 'My Company Inc.',
      service: 'Software Development',
      budget: '$1,000-$5,000',
      message: 'This is a test message with more than twenty characters.',
    };

    const validResult = validateContactForm(validForm);
    expect(validResult.isValid).toBe(true);
    expect(validResult.errors).toHaveLength(0);
  });
});
