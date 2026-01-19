# Specification: Contact Form with Email Functionality

## Goal

Create a reusable contact form system for the GravityLabs landing page that allows visitors to submit business inquiries, with both an inline ContactSection and a ContactModal triggered by CTA buttons.

## User Stories

- As a potential client, I want to fill out a contact form with my business details so that GravityLabs can understand my needs and contact me back.
- As a mobile user, I want to quickly access the contact form via a modal from any CTA button so that I can submit an inquiry without scrolling to the contact section.

## Specific Requirements

**ContactForm Component**
- Reusable form component used by both ContactSection and ContactModal
- All 7 form fields are required with Spanish labels and placeholder text
- Uses native HTML5 form validation enhanced with custom client-side validation
- Includes hidden honeypot field (`website` field, styled with `sr-only`) for spam prevention
- Manages form state using React useState hook (no external form library)
- Disabled submit button until all required fields are valid

**Form Field Specifications**
- Nombre: text input, minLength 2, maxLength 100
- Telefono: text input, accepts digits/spaces/dashes/parens, pattern validation
- Correo: email input, HTML5 email validation pattern
- Nombre de Empresa: text input, minLength 2, maxLength 150
- Service dropdown: select with 4 options (Automatizacion de Procesos, Integraciones con IA, Desarrollo de Software, Aun por definir)
- Budget dropdown: select with 4 options ($1,000-$5,000, $5,000-$10,000, $10,000+, Por definir)
- Textarea: minLength 20, maxLength 1000, resize-y only

**ContactSection Component**
- New page section placed after ServicesSection in App.tsx
- Uses Container component for consistent horizontal alignment with other sections
- Section id="contacto" with aria-labelledby for accessibility
- Follows ServicesSection layout pattern: eyebrow text, h2 heading, content area
- Two-column layout on desktop (lg+): left column with heading/description, right column with form

**ContactModal Component**
- Modal dialog triggered by CTA buttons with text "Agenda tu llamada"
- Uses role="dialog" with aria-modal="true" and aria-labelledby
- Implements focus trap using existing Header mobile menu pattern
- Closes on Escape key, backdrop click, or close button
- Prevents body scroll when open (document.body.style.overflow = 'hidden')
- Slide-in animation from right using existing animate-slide-in-right class
- Respects prefers-reduced-motion via motion-reduce utility classes

**Toast Notification Component**
- New Toast component for success feedback after form submission
- Fixed position bottom-right with z-50
- Auto-dismisses after 5 seconds with manual close button
- Uses bg-background-elevated with border-accent-gold accent
- Slide-in animation with fade-out on dismiss
- Accessible: role="status" with aria-live="polite"

**Form Submission Handling**
- Frontend-only implementation (no backend)
- On valid submission: console.log form data object, show success toast, reset form
- If honeypot field has value, silently reject (no error shown, appears successful to bots)
- Loading state on submit button with disabled state and spinner icon

**Styling and Visual Design**
- Dark input backgrounds using bg-background-elevated (#242424)
- Border color: border-border with hover:border-accent-gold on focus
- Text colors: text-text-primary for values, text-text-muted for placeholders
- Focus ring: focus-visible:outline-accent-gold matching existing Button pattern
- Error state: border-red-500, text-red-400 for error messages
- Input height minimum 44px for touch targets (existing Button min-h pattern)
- Responsive padding scales with breakpoints (2xl, 3xl, 4xl) matching existing components

**Accessibility Compliance**
- All inputs have associated label elements with htmlFor
- Error messages linked via aria-describedby with unique ids
- aria-invalid="true" on inputs with validation errors
- aria-required="true" on all required inputs
- Form uses noValidate attribute, validation handled in JS for better UX
- Screen reader announcements via aria-live regions for errors and success
- Color contrast ratios meet WCAG 2.1 AA (text-muted at 9:1 ratio per index.css)

## Visual Design

No visual mockups were provided. Implementation should follow existing design patterns from ServicesSection and Header components, maintaining the dark theme (#1a1a1a background), warm gold accent (#d4a574), and Spanish language UI.

## Existing Code to Leverage

**Button Component (src/components/Button/)**
- Reuse for form submit button with variant="primary"
- Follow the baseStyles pattern for consistent sizing and focus states
- Apply same responsive scaling pattern (2xl, 3xl, 4xl breakpoints)

**Container Component (src/components/layout/)**
- Use for ContactSection horizontal alignment
- Ensures left edge alignment matches Header and HeroSection
- Progressive max-width scaling for large screens already implemented

**Header Mobile Menu Pattern (src/components/Header/)**
- Copy focus trap implementation (handleMenuKeyDown function)
- Reuse Escape key handler pattern (handleKeyDown with useCallback)
- Apply same body scroll prevention logic
- Use identical backdrop styling (bg-black/60 backdrop-blur-sm)

**ServicesSection Layout (src/components/ServicesSection/)**
- Follow section structure: id, aria-labelledby, semantic section element
- Use same padding pattern (px-4 py-section md:px-6 lg:px-8)
- Match eyebrow and heading typography classes
- Apply same container max-width progression

**index.css Design Tokens**
- Use CSS custom properties: --color-background-elevated, --color-accent-gold, --color-border
- Apply existing focus-visible styles from :focus-visible selector
- Leverage motion-reduce styles for animation preferences

## Out of Scope

- Backend email sending functionality (future consideration)
- Database storage of form submissions
- Email confirmation to the form submitter
- CAPTCHA or reCAPTCHA integration
- Analytics or conversion tracking
- A/B testing variants
- File upload fields
- Multi-step form wizard
- Form data persistence (localStorage/sessionStorage)
- Third-party form service integration (Formspree, Netlify Forms, etc.)
