/**
 * Form validation utilities with English error messages
 * for the GravityLabs contact form
 */

export interface FormFieldError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormFieldError[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

/**
 * Validates that a field is not empty
 * @returns Error message or null if valid
 */
export function validateRequired(value: string, _fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return null;
}

/**
 * Validates email format
 * @returns Error message or null if valid
 */
export function validateEmail(value: string): string | null {
  if (!value || value.trim() === '') {
    return 'Please enter a valid email address';
  }

  // Standard email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return 'Please enter a valid email address';
  }

  return null;
}

/**
 * Validates phone number format
 * Accepts digits, spaces, dashes, parentheses, and plus sign
 * @returns Error message or null if valid
 */
export function validatePhone(value: string): string | null {
  if (!value || value.trim() === '') {
    return 'Please enter a valid phone number';
  }

  // Pattern accepts digits, spaces, dashes, parentheses, and plus sign
  const phonePattern = /^[\d\s\-()+ ]+$/;
  if (!phonePattern.test(value)) {
    return 'Please enter a valid phone number';
  }

  return null;
}

/**
 * Validates minimum length of a field
 * @returns Error message or null if valid
 */
export function validateMinLength(value: string, min: number, fieldName: string): string | null {
  if (value.length < min) {
    return `The ${fieldName} field must be at least ${min} characters`;
  }
  return null;
}

/**
 * Validates maximum length of a field
 * @returns Error message or null if valid
 */
export function validateMaxLength(value: string, max: number, fieldName: string): string | null {
  if (value.length > max) {
    return `The ${fieldName} field cannot exceed ${max} characters`;
  }
  return null;
}

/**
 * Validates the entire contact form
 * @returns ValidationResult with isValid flag and array of errors
 */
export function validateContactForm(formData: ContactFormData): ValidationResult {
  const errors: FormFieldError[] = [];

  // Validate name
  const nameRequired = validateRequired(formData.name, 'Name');
  if (nameRequired) {
    errors.push({ field: 'name', message: nameRequired });
  } else {
    const nameMinLength = validateMinLength(formData.name, 2, 'Name');
    if (nameMinLength) {
      errors.push({ field: 'name', message: nameMinLength });
    }
    const nameMaxLength = validateMaxLength(formData.name, 100, 'Name');
    if (nameMaxLength) {
      errors.push({ field: 'name', message: nameMaxLength });
    }
  }

  // Validate phone
  const phoneError = validatePhone(formData.phone);
  if (phoneError) {
    errors.push({ field: 'phone', message: phoneError });
  }

  // Validate email
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }

  // Validate company
  const companyRequired = validateRequired(formData.company, 'Company');
  if (companyRequired) {
    errors.push({ field: 'company', message: companyRequired });
  } else {
    const companyMinLength = validateMinLength(formData.company, 2, 'Company');
    if (companyMinLength) {
      errors.push({ field: 'company', message: companyMinLength });
    }
    const companyMaxLength = validateMaxLength(formData.company, 150, 'Company');
    if (companyMaxLength) {
      errors.push({ field: 'company', message: companyMaxLength });
    }
  }

  // Validate service
  const serviceRequired = validateRequired(formData.service, 'Service');
  if (serviceRequired) {
    errors.push({ field: 'service', message: serviceRequired });
  }

  // Validate budget
  const budgetRequired = validateRequired(formData.budget, 'Budget');
  if (budgetRequired) {
    errors.push({ field: 'budget', message: budgetRequired });
  }

  // Validate message
  const messageRequired = validateRequired(formData.message, 'Message');
  if (messageRequired) {
    errors.push({ field: 'message', message: messageRequired });
  } else {
    const messageMinLength = validateMinLength(formData.message, 20, 'Message');
    if (messageMinLength) {
      errors.push({ field: 'message', message: messageMinLength });
    }
    const messageMaxLength = validateMaxLength(formData.message, 1000, 'Message');
    if (messageMaxLength) {
      errors.push({ field: 'message', message: messageMaxLength });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
