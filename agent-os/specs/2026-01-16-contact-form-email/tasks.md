# Task Breakdown: Contact Form with Email Functionality

## Overview
Total Tasks: 36

This task list implements a contact form system for the GravityLabs landing page, including:
- Toast notification component for success feedback
- Form validation utilities with Spanish error messages
- ContactForm reusable component with 7 fields and honeypot
- ContactSection page section
- ContactModal triggered by CTA buttons
- Integration with existing App and HeroSection

## Task List

### Foundation Layer

#### Task Group 1: Toast Notification Component
**Dependencies:** None

- [x] 1.0 Complete Toast notification component
  - [x] 1.1 Write 4 focused tests for Toast functionality
    - Test Toast renders with message content
    - Test Toast auto-dismisses after 5 seconds (mock timers)
    - Test manual close button dismisses Toast
    - Test Toast has correct accessibility attributes (role="status", aria-live="polite")
  - [x] 1.2 Create Toast component structure
    - Create `src/components/Toast/Toast.tsx`
    - Create `src/components/Toast/index.ts` barrel export
    - Props: `message: string`, `onClose: () => void`, `duration?: number` (default 5000)
    - State: internal visibility for fade-out animation
  - [x] 1.3 Implement Toast styling
    - Fixed position bottom-right with z-50
    - Use bg-background-elevated with border-accent-gold left accent border
    - Text colors: text-text-primary for message
    - Close button with X icon, min-h-[44px] touch target
    - Responsive padding matching existing components (2xl, 3xl, 4xl breakpoints)
  - [x] 1.4 Add Toast animations
    - Slide-in animation from right (reuse animate-slide-in-right)
    - Fade-out animation on dismiss
    - Add motion-reduce:animate-none for accessibility
  - [x] 1.5 Implement auto-dismiss timer
    - useEffect with setTimeout for auto-dismiss
    - Cleanup timer on unmount or manual close
  - [x] 1.6 Ensure Toast tests pass
    - Run ONLY the 4 tests written in 1.1
    - Verify component renders and behaves correctly

**Acceptance Criteria:**
- Toast renders with message and close button
- Auto-dismisses after specified duration
- Manual close works via button click
- Animations respect prefers-reduced-motion
- Meets WCAG 2.1 AA accessibility requirements

---

#### Task Group 2: Form Validation Utilities
**Dependencies:** None (can run parallel with Task Group 1)

- [x] 2.0 Complete form validation utilities
  - [x] 2.1 Write 5 focused tests for validation functions
    - Test required field validation returns Spanish error message
    - Test email validation with valid/invalid formats
    - Test phone validation accepts digits/spaces/dashes/parens
    - Test minLength/maxLength validation with Spanish messages
    - Test validateForm returns all errors for a form state object
  - [x] 2.2 Create validation utility module
    - Create `src/utils/formValidation.ts`
    - Define FormFieldError type: `{ field: string; message: string }`
    - Define ValidationResult type: `{ isValid: boolean; errors: FormFieldError[] }`
  - [x] 2.3 Implement individual field validators
    - `validateRequired(value: string, fieldName: string): string | null`
    - `validateEmail(value: string): string | null`
    - `validatePhone(value: string): string | null` - pattern: `/^[\d\s\-()]+$/`
    - `validateMinLength(value: string, min: number, fieldName: string): string | null`
    - `validateMaxLength(value: string, max: number, fieldName: string): string | null`
  - [x] 2.4 Implement Spanish error messages
    - "Este campo es obligatorio" (required)
    - "Por favor ingresa un correo electronico valido" (email)
    - "Por favor ingresa un numero de telefono valido" (phone)
    - "El campo {fieldName} debe tener al menos {min} caracteres" (minLength)
    - "El campo {fieldName} no puede exceder {max} caracteres" (maxLength)
  - [x] 2.5 Implement form-level validation function
    - `validateContactForm(formData: ContactFormData): ValidationResult`
    - Validates all 7 fields with appropriate rules
    - Returns aggregated validation result
  - [x] 2.6 Ensure validation tests pass
    - Run ONLY the 5 tests written in 2.1
    - Verify all validators return correct Spanish messages

**Acceptance Criteria:**
- All individual validators work correctly
- Spanish error messages display properly
- Form-level validation aggregates all errors
- Phone validation accepts international formats

---

### Core Component Layer

#### Task Group 3: ContactForm Component
**Dependencies:** Task Groups 1, 2

- [x] 3.0 Complete ContactForm reusable component
  - [x] 3.1 Write 6 focused tests for ContactForm functionality
    - Test form renders all 7 required fields with Spanish labels
    - Test form validation shows errors for empty required fields
    - Test submit button is disabled until all fields are valid
    - Test successful submission logs data and shows success toast
    - Test honeypot field is hidden (sr-only) and rejects filled submissions silently
    - Test form resets after successful submission
  - [x] 3.2 Create ContactForm component structure
    - Create `src/components/ContactForm/ContactForm.tsx`
    - Create `src/components/ContactForm/index.ts` barrel export
    - Define ContactFormData interface with all 7 fields
    - Props: `onSuccess?: () => void`, `className?: string`
  - [x] 3.3 Implement form state management
    - useState for formData object with all fields initialized empty
    - useState for errors object (field -> error message mapping)
    - useState for isSubmitting boolean
    - useState for showToast boolean
  - [x] 3.4 Build text input fields
    - Nombre: text input, minLength 2, maxLength 100
    - Telefono: text input with pattern validation
    - Correo: email input with HTML5 + custom validation
    - Nombre de Empresa: text input, minLength 2, maxLength 150
    - Each with: label (htmlFor), aria-describedby for errors, aria-invalid, aria-required
  - [x] 3.5 Build select dropdown fields
    - Service dropdown: 4 options (Automatizacion de Procesos, Integraciones con IA, Desarrollo de Software, Aun por definir)
    - Budget dropdown: 4 options ($1,000-$5,000, $5,000-$10,000, $10,000+, Por definir)
    - Each with proper labels and accessibility attributes
    - Default empty option with "Selecciona una opcion" placeholder
  - [x] 3.6 Build textarea field
    - "Cuentanos sobre tu negocio" label
    - minLength 20, maxLength 1000
    - resize-y only (CSS: resize: vertical)
    - Character count display (optional enhancement)
  - [x] 3.7 Implement honeypot spam prevention
    - Hidden "website" field with sr-only class
    - tabIndex={-1} to skip in tab order
    - autocomplete="off" to prevent autofill
    - On submit: if honeypot has value, silently "succeed" (no actual processing)
  - [x] 3.8 Implement form styling
    - Input backgrounds: bg-background-elevated (#242424)
    - Border: border-border with focus:border-accent-gold
    - Focus ring: focus-visible:outline-accent-gold (match Button pattern)
    - Error state: border-red-500, error text text-red-400
    - Min-height 44px for touch targets on all inputs
    - Responsive padding scaling (2xl, 3xl, 4xl breakpoints)
  - [x] 3.9 Implement form submission handling
    - Validate all fields using validateContactForm utility
    - If invalid: set errors state, do not submit
    - If honeypot filled: console.log("[Honeypot triggered]"), show toast, reset form
    - If valid: console.log form data, show success toast, reset form, call onSuccess
    - Submit button: disabled when isSubmitting or form invalid
    - Loading state: spinner icon + "Enviando..." text
  - [x] 3.10 Implement accessible error display
    - Error messages below each field with unique ids
    - aria-describedby linking input to error message
    - aria-live="polite" region for screen reader announcements
  - [x] 3.11 Integrate Toast component
    - Render Toast when showToast is true
    - Success message: "Gracias por contactarnos. Te responderemos pronto."
    - Pass onClose handler to hide toast
  - [x] 3.12 Ensure ContactForm tests pass
    - Run ONLY the 6 tests written in 3.1
    - Verify all form behaviors work correctly

**Acceptance Criteria:**
- All 7 form fields render with Spanish labels
- Validation prevents submission with errors
- Submit button disabled until form is valid
- Honeypot silently rejects bot submissions
- Success toast displays after valid submission
- Form resets after successful submission
- All accessibility requirements met (WCAG 2.1 AA)

---

### Section Layer

#### Task Group 4: ContactSection Component
**Dependencies:** Task Group 3

- [x] 4.0 Complete ContactSection page component
  - [x] 4.1 Write 4 focused tests for ContactSection
    - Test section renders with id="contacto" and aria-labelledby
    - Test section contains h2 heading with appropriate text
    - Test ContactForm is rendered within the section
    - Test two-column layout applies on desktop (check lg: classes)
  - [x] 4.2 Create ContactSection component structure
    - Create `src/components/ContactSection/ContactSection.tsx`
    - Create `src/components/ContactSection/index.ts` barrel export
    - Follow ServicesSection pattern for section structure
  - [x] 4.3 Implement section layout
    - Use Container component for consistent horizontal alignment
    - Section element with id="contacto", aria-labelledby="contact-heading"
    - Padding pattern: px-4 py-section md:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20
    - Background: bg-background (consistent with page)
  - [x] 4.4 Build section header
    - Eyebrow text: "Contacto" (uppercase, tracking-[0.2em], text-text-eyebrow)
    - h2 heading: "Hablemos sobre tu proyecto" (id="contact-heading")
    - Description paragraph with text-text-muted
    - Match ServicesSection typography classes
  - [x] 4.5 Implement two-column desktop layout
    - Mobile: single column, stacked (heading/description above form)
    - Desktop (lg+): two columns - left: heading/description, right: form
    - Grid or flex layout: `lg:grid lg:grid-cols-2 lg:gap-12`
    - Left column max-width for readability
  - [x] 4.6 Integrate ContactForm component
    - Render ContactForm in the right column (desktop) or below header (mobile)
    - Pass appropriate className for section-specific styling if needed
  - [x] 4.7 Ensure ContactSection tests pass
    - Run ONLY the 4 tests written in 4.1
    - Verify section structure and layout

**Acceptance Criteria:**
- Section has correct id for navigation anchor
- Proper semantic HTML with aria-labelledby
- Two-column layout on desktop, stacked on mobile
- Follows existing ServicesSection patterns
- ContactForm renders and functions within section

---

#### Task Group 5: ContactModal Component
**Dependencies:** Task Group 3

- [x] 5.0 Complete ContactModal dialog component
  - [x] 5.1 Write 5 focused tests for ContactModal
    - Test modal renders when isOpen is true, hidden when false
    - Test modal has role="dialog" with aria-modal="true" and aria-labelledby
    - Test Escape key closes the modal
    - Test backdrop click closes the modal
    - Test focus is trapped within modal when open
  - [x] 5.2 Create ContactModal component structure
    - Create `src/components/ContactModal/ContactModal.tsx`
    - Create `src/components/ContactModal/index.ts` barrel export
    - Props: `isOpen: boolean`, `onClose: () => void`
  - [x] 5.3 Implement modal overlay and panel
    - Fixed inset-0 overlay with z-50
    - Backdrop: bg-black/60 backdrop-blur-sm (match Header pattern)
    - Panel: slide-in from right, max-w-lg, bg-background-elevated
    - Panel padding and scrollable content area
  - [x] 5.4 Implement modal header
    - Title: "Agenda tu llamada" with appropriate heading level
    - Close button with X icon, positioned top-right
    - Close button: min-h-[44px] touch target, hover:bg-white/10
  - [x] 5.5 Implement focus trap (copy Header pattern)
    - useRef for first and last focusable elements
    - handleModalKeyDown function for Tab key trapping
    - Query focusable elements: `#contact-modal a, #contact-modal button, #contact-modal input, #contact-modal select, #contact-modal textarea`
    - Wrap Tab at last element, Shift+Tab at first element
  - [x] 5.6 Implement Escape key handler
    - useCallback for handleKeyDown
    - useEffect to add/remove keydown listener
    - Close modal on Escape key (match Header pattern)
  - [x] 5.7 Implement body scroll prevention
    - useEffect to set document.body.style.overflow = 'hidden' when open
    - Cleanup: restore document.body.style.overflow = '' on close/unmount
  - [x] 5.8 Implement focus management
    - useRef for close button
    - Focus close button when modal opens (setTimeout for render)
    - Return focus to trigger element on close (via onClose callback pattern)
  - [x] 5.9 Add modal animations
    - Panel: animate-slide-in-right from existing CSS
    - Backdrop: fade-in (opacity transition)
    - motion-reduce:animate-none for accessibility
  - [x] 5.10 Integrate ContactForm component
    - Render ContactForm within modal panel
    - Pass onSuccess callback to close modal after submission
  - [x] 5.11 Ensure ContactModal tests pass
    - Run ONLY the 5 tests written in 5.1
    - Verify modal behaviors and accessibility

**Acceptance Criteria:**
- Modal opens/closes correctly based on isOpen prop
- Proper dialog accessibility attributes
- Focus trapped within modal when open
- Escape key and backdrop click close modal
- Body scroll prevented when modal is open
- Animations respect prefers-reduced-motion
- ContactForm functions correctly within modal

---

### Integration Layer

#### Task Group 6: App Integration
**Dependencies:** Task Groups 4, 5

- [x] 6.0 Complete App integration
  - [x] 6.1 Write 3 focused tests for App integration
    - Test ContactSection renders after ServicesSection
    - Test ContactModal state is managed in App (or parent component)
    - Test CTA button click opens ContactModal
  - [x] 6.2 Add ContactSection to App.tsx
    - Import ContactSection component
    - Place after ServicesSection in component order
    - Verify navigation anchor #contacto works from Header
  - [x] 6.3 Implement modal state management
    - Add useState for isModalOpen in App.tsx
    - Create openModal and closeModal handler functions
  - [x] 6.4 Update HeroSection CTA button
    - Modify "Agenda tu llamada" Button to trigger modal
    - Change from href="#contacto" to onClick={openModal}
    - Pass openModal function as prop to HeroSection (or use context)
  - [x] 6.5 Update Header "Hablemos" button (optional)
    - Consider if desktop "Hablemos" link should also trigger modal
    - OR keep as anchor link to #contacto section
    - Decision: Keep as anchor link for progressive enhancement
  - [x] 6.6 Render ContactModal in App
    - Import ContactModal component
    - Render with isOpen={isModalOpen} onClose={closeModal}
    - Position at end of App component (portal-like behavior via fixed positioning)
  - [x] 6.7 Ensure App integration tests pass
    - Run ONLY the 3 tests written in 6.1
    - Verify full user flow works

**Acceptance Criteria:**
- ContactSection appears after ServicesSection
- "Agenda tu llamada" CTA opens ContactModal
- Modal closes after successful form submission
- Navigation to #contacto section works from Header
- No duplicate form submissions or state issues

---

### Testing Layer

#### Task Group 7: Test Review and Gap Analysis
**Dependencies:** Task Groups 1-6

- [x] 7.0 Review existing tests and fill critical gaps
  - [x] 7.1 Review tests from Task Groups 1-6
    - Toast tests (4 from Task 1.1)
    - Validation tests (5 from Task 2.1)
    - ContactForm tests (6 from Task 3.1)
    - ContactSection tests (4 from Task 4.1)
    - ContactModal tests (5 from Task 5.1)
    - App integration tests (3 from Task 6.1)
    - Total existing tests: 27 tests
  - [x] 7.2 Analyze test coverage gaps for contact form feature
    - Review end-to-end user workflows
    - Identify critical integration points not covered
    - Focus ONLY on this feature's requirements
    - Prioritize: form submission flow, modal interaction, accessibility
  - [x] 7.3 Write up to 9 additional strategic tests to fill gaps
    - Add tests for edge cases only if business-critical:
      - Test form validation shows multiple errors simultaneously
      - Test form preserves data on validation failure
      - Test modal + form submission + toast full flow
      - Test keyboard navigation through form fields
      - Test screen reader announcements for errors (aria-live)
      - Additional gap tests as identified (max 4 more)
    - Do NOT write exhaustive coverage for all scenarios
  - [x] 7.4 Run feature-specific tests only
    - Run ONLY tests related to contact form feature
    - Expected total: approximately 27-36 tests
    - Do NOT run entire application test suite
    - Command: `npm test -- --grep "Toast|ContactForm|ContactSection|ContactModal|validation"`
    - Verify all critical workflows pass

**Acceptance Criteria:**
- All 27+ feature-specific tests pass (32 tests passing)
- Critical user workflows covered (form submit, modal open/close, validation)
- No more than 9 additional tests added for gaps (5 gap tests added)
- Testing focused exclusively on contact form feature

---

## Execution Order

Recommended implementation sequence:

```
Phase 1: Foundation (Parallel)
├── Task Group 1: Toast Component
└── Task Group 2: Form Validation Utilities

Phase 2: Core Component
└── Task Group 3: ContactForm Component (depends on 1 & 2)

Phase 3: Section Components (Parallel)
├── Task Group 4: ContactSection (depends on 3)
└── Task Group 5: ContactModal (depends on 3)

Phase 4: Integration
└── Task Group 6: App Integration (depends on 4 & 5)

Phase 5: Testing
└── Task Group 7: Test Review & Gap Analysis (depends on 1-6)
```

## File Structure Summary

After implementation, the following files will be created:

```
src/
├── components/
│   ├── Toast/
│   │   ├── Toast.tsx
│   │   ├── Toast.test.tsx
│   │   └── index.ts
│   ├── ContactForm/
│   │   ├── ContactForm.tsx
│   │   ├── ContactForm.test.tsx
│   │   └── index.ts
│   ├── ContactSection/
│   │   ├── ContactSection.tsx
│   │   ├── ContactSection.test.tsx
│   │   └── index.ts
│   ├── ContactModal/
│   │   ├── ContactModal.tsx
│   │   ├── ContactModal.test.tsx
│   │   └── index.ts
│   ├── __tests__/
│   │   ├── AppIntegration.test.tsx
│   │   └── ContactFormGaps.test.tsx
│   └── HeroSection/
│       └── HeroSection.tsx (modified - accept onOpenModal prop)
├── utils/
│   ├── formValidation.ts
│   └── formValidation.test.ts
└── App.tsx (modified - add ContactSection, ContactModal, modal state)
```

## Key Patterns to Follow

1. **Component Structure**: Follow Button pattern with Component.tsx + index.ts barrel export
2. **Styling**: Use existing Tailwind classes and CSS custom properties from index.css
3. **Accessibility**: Follow Header mobile menu pattern for focus trap and keyboard handling
4. **Testing**: Use Vitest + React Testing Library, follow Button.test.tsx pattern
5. **Responsive**: Use existing breakpoints (2xl, 3xl, 4xl) and scaling patterns
6. **Spanish UI**: All labels, error messages, and feedback in Spanish
