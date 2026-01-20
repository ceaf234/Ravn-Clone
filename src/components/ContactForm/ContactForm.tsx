import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Toast } from '../Toast';
import { validateContactForm, type ContactFormData } from '../../utils/formValidation';
import { Button } from '../Button';
import { CustomSelect, type CustomSelectOption } from '../CustomSelect';

export interface ContactFormProps {
  /** Callback function called after successful form submission */
  onSuccess?: () => void;
  /** Additional CSS classes to apply to the form */
  className?: string;
  /** Whether to show the card wrapper (default: true) */
  showCard?: boolean;
}

/** Service options for the dropdown */
const serviceOptions: CustomSelectOption[] = [
  { value: 'Process automation', label: 'Process Automation' },
  { value: 'Artificial intelligence', label: 'Artificial Intelligence' },
  { value: 'Website or landing page', label: 'Website or Landing Page' },
  { value: 'Online store', label: 'Online Store (E-commerce)' },
  { value: 'Internet of things', label: 'Internet of Things (IoT)' },
  { value: 'Management system', label: 'Management System (CRM/ERP)' },
  { value: 'Other', label: 'Other / Not sure yet' },
];

/** Budget options for the dropdown */
const budgetOptions: CustomSelectOption[] = [
  { value: 'Under $1,000', label: 'Under $1,000' },
  { value: '$1,000-$5,000', label: '$1,000 - $5,000' },
  { value: '$5,000-$10,000', label: '$5,000 - $10,000' },
  { value: '$10,000+', label: '$10,000+' },
  { value: 'Not yet defined', label: 'Not yet defined' },
];

/** Initial empty form state */
const initialFormData: ContactFormData = {
  name: '',
  phone: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
};

/** Shared input field styles - compact version */
const inputBaseStyles =
  'h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:border-accent-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold';

const inputErrorStyles = 'border-red-500 focus:border-red-500';

const labelStyles = 'mb-1.5 block text-xs font-medium text-white/70';

const requiredStyles = 'text-white/50';

const errorTextStyles = 'mt-1 text-xs text-red-400';

/**
 * ContactForm is a reusable contact form component with 7 required fields,
 * honeypot spam prevention, and English labels and error messages.
 *
 * Features:
 * - 2-column grid layout on sm+, single column on mobile
 * - Custom styled dropdowns matching the site's design
 * - All fields have English labels and validation messages
 * - Honeypot field prevents bot submissions
 * - Toast notification on successful submission
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <ContactForm onSuccess={() => console.log('Form submitted!')} />
 * ```
 */
function ContactForm({ onSuccess, className = '', showCard = true }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleHoneypotChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHoneypot(e.target.value);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setHoneypot('');
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check honeypot first - silently "succeed" for bots
    if (honeypot) {
      console.log('[Honeypot triggered]');
      setShowToast(true);
      resetForm();
      return;
    }

    // Validate form
    const validationResult = validateContactForm(formData);

    if (!validationResult.isValid) {
      // Convert errors array to object for easier field lookup
      const errorMap: Record<string, string> = {};
      validationResult.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    // Form is valid - simulate submission
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setShowToast(true);
      resetForm();
      onSuccess?.();
    }, 500);
  };

  const getInputClasses = (fieldName: string) => {
    return `${inputBaseStyles} ${errors[fieldName] ? inputErrorStyles : ''}`;
  };

  const cardClasses = showCard
    ? 'rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10'
    : '';

  return (
    <>
      {/* Form Card Container (conditional) */}
      <div className={`${cardClasses} ${className}`.trim()}>
        <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
          {/* Honeypot field - hidden from users, visible to bots */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={honeypot}
              onChange={handleHoneypotChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Form Grid - 2 columns on sm+ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Row 1: Name, Email */}
            <div>
              <label htmlFor="name" className={labelStyles}>
                Name <span className={requiredStyles}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={getInputClasses('name')}
                placeholder="Your full name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                minLength={2}
                maxLength={100}
              />
              {errors.name && (
                <p id="name-error" className={errorTextStyles} role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelStyles}>
                Email <span className={requiredStyles}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={getInputClasses('email')}
                placeholder="you@email.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className={errorTextStyles} role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Row 2: Phone, Company */}
            <div>
              <label htmlFor="phone" className={labelStyles}>
                Phone <span className={requiredStyles}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={getInputClasses('phone')}
                placeholder="(555) 123-4567"
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className={errorTextStyles} role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className={labelStyles}>
                Company <span className={requiredStyles}>*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={getInputClasses('company')}
                placeholder="Your company name"
                aria-required="true"
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? 'company-error' : undefined}
                minLength={2}
                maxLength={150}
              />
              {errors.company && (
                <p id="company-error" className={errorTextStyles} role="alert">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Row 3: Service, Budget (Custom Dropdowns) */}
            <div>
              <label htmlFor="service" className={labelStyles}>
                How can we help you? <span className={requiredStyles}>*</span>
              </label>
              <CustomSelect
                id="service"
                name="service"
                value={formData.service}
                onChange={(value) => handleSelectChange('service', value)}
                options={serviceOptions}
                placeholder="Select a service"
                required
                hasError={!!errors.service}
                errorId={errors.service ? 'service-error' : undefined}
              />
              {errors.service && (
                <p id="service-error" className={errorTextStyles} role="alert">
                  {errors.service}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="budget" className={labelStyles}>
                Budget <span className={requiredStyles}>*</span>
              </label>
              <CustomSelect
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={(value) => handleSelectChange('budget', value)}
                options={budgetOptions}
                placeholder="Select a range"
                required
                hasError={!!errors.budget}
                errorId={errors.budget ? 'budget-error' : undefined}
              />
              {errors.budget && (
                <p id="budget-error" className={errorTextStyles} role="alert">
                  {errors.budget}
                </p>
              )}
            </div>

            {/* Row 4: Message (Full Width) */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelStyles}>
                Tell us about your project <span className={requiredStyles}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`${getInputClasses('message')} h-auto min-h-[110px] resize-y`}
                placeholder="Briefly describe your project or needs..."
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                minLength={20}
                maxLength={1000}
                rows={4}
              />
              {errors.message && (
                <p id="message-error" className={errorTextStyles} role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Row 5: Submit Button (Full Width) */}
            <div className="sm:col-span-2">
              <Button
                type="submit"
                variant="primary"
                className="h-11 w-full rounded-lg font-semibold uppercase tracking-wide"
                disabled={isSubmitting}
                ariaLabel={isSubmitting ? 'Submitting form...' : 'Submit contact form'}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  'Request Consultation'
                )}
              </Button>
            </div>
          </div>

          {/* Accessible live region for error announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {Object.keys(errors).length > 0 && (
              <p>
                There {Object.keys(errors).length === 1 ? 'is' : 'are'} {Object.keys(errors).length}{' '}
                error{Object.keys(errors).length > 1 ? 's' : ''} in the form
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Success Toast */}
      {showToast && (
        <Toast
          message="Thank you for contacting us! We'll get back to you soon."
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

export default ContactForm;
