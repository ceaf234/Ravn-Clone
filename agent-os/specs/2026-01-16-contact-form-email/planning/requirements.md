# Spec Requirements: Contact Form with Email Functionality

## Initial Description

A contact form section for the GravityLabs landing page that allows visitors to submit inquiries and sends emails to the business.

**Project Context:**
- Project: GravityLabs landing page
- Tech Stack: React + Tailwind + Vite

## Requirements Discussion

### First Round Questions

**Q1:** What form fields should be included in the contact form?
**Answer:** The form should include:
- Nombre (Name) - Required text input
- Telefono (Phone) - Required text input
- Correo (Email) - Required email input
- Nombre de Empresa (Company Name) - Required text input
- "Como puede GravityLabs ayudarte?" - Required dropdown with options: "Automatizacion de Procesos", "Integraciones con Inteligencia Artificial", "Desarrollo de Software", "Aun por definir"
- "Presupuesto" (Budget) - Required dropdown with budget ranges (e.g., $1,000-$5,000, $5,000-$10,000, $10,000+, Por definir/TBD)
- "Cuentanos sobre tu negocio" (Tell us about your business) - Required text area

**Q2:** Where should the contact form be placed on the landing page?
**Answer:** BOTH implementations needed:
1. New ContactSection component placed after ServicesSection
2. ContactModal triggered by CTA buttons ("Agenda tu llamada")

**Q3:** What email service integration is needed?
**Answer:** Frontend only for now (no backend email functionality). Future consideration: Will need email to both business and submitter.

**Q4:** What spam prevention measures should be implemented?
**Answer:** Honeypot field (hidden field that bots fill but humans don't)

**Q5:** What success feedback should users receive after form submission?
**Answer:** Toast notification on successful submission

### Existing Code to Reference

**Similar Features Identified:**
- Existing components: Button, Container, ServiceCard in the codebase
- Design system: Dark background (#1a1a1a) with warm gold accent (#d4a574)
- Language: Spanish language UI throughout
- Layout patterns: Mobile-first responsive design approach

### Follow-up Questions

No additional follow-up questions were needed.

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
N/A - No visual mockups were provided. Implementation should follow existing design patterns from the landing page.

## Requirements Summary

### Functional Requirements

**Form Fields (All Required):**
1. **Nombre (Name)** - Text input field
2. **Telefono (Phone)** - Text input field
3. **Correo (Email)** - Email input field with email validation
4. **Nombre de Empresa (Company Name)** - Text input field
5. **Como puede GravityLabs ayudarte? (How can GravityLabs help you?)** - Dropdown select with options:
   - "Automatizacion de Procesos"
   - "Integraciones con Inteligencia Artificial"
   - "Desarrollo de Software"
   - "Aun por definir"
6. **Presupuesto (Budget)** - Dropdown select with options:
   - "$1,000 - $5,000"
   - "$5,000 - $10,000"
   - "$10,000+"
   - "Por definir"
7. **Cuentanos sobre tu negocio (Tell us about your business)** - Textarea field

**Form Submission:**
- Frontend-only implementation (no backend email sending)
- Console log or local storage of submissions for development
- Success feedback via toast notification

**Spam Prevention:**
- Honeypot field implementation (hidden field that bots fill but humans ignore)

### Component Requirements

**ContactSection Component:**
- New section component to be placed after ServicesSection
- Contains the full contact form
- Follows existing section layout patterns
- Uses Container component for consistent width

**ContactModal Component:**
- Modal dialog containing the contact form
- Triggered by CTA buttons labeled "Agenda tu llamada"
- Proper modal accessibility (focus trap, escape to close)
- Overlay background with click-outside-to-close

### UI/UX Requirements

**Visual Design:**
- Dark background (#1a1a1a)
- Warm gold accent color (#d4a574) for interactive elements
- Consistent with existing landing page aesthetic
- Clear form labels in Spanish

**Responsive Design:**
- Mobile-first approach
- Form should stack vertically on mobile
- Appropriate input sizing for touch targets on mobile
- Proper spacing and padding across breakpoints

**User Feedback:**
- Toast notification on successful form submission
- Inline validation error messages
- Clear visual states for form inputs (focus, error, success)
- Loading state during form submission

### Accessibility Requirements

- Proper form labels associated with inputs
- ARIA attributes for form validation states
- Focus management in modal (focus trap)
- Keyboard navigation support
- Screen reader announcements for validation errors
- Sufficient color contrast ratios

### Reusability Opportunities

- Leverage existing Button component for form submission
- Use Container component for consistent layout
- Follow patterns from ServiceCard for consistent styling
- Consider creating reusable form input components

### Scope Boundaries

**In Scope:**
- ContactSection component with full form
- ContactModal component triggered by CTAs
- Form validation (client-side)
- Honeypot spam prevention
- Toast notification for success feedback
- Spanish language UI
- Responsive design (mobile-first)
- Accessibility compliance

**Out of Scope:**
- Backend email sending functionality
- Database storage of submissions
- Email confirmation to submitter
- CAPTCHA or reCAPTCHA integration
- Analytics tracking
- A/B testing variants

### Technical Considerations

**Tech Stack:**
- React + Vite + TypeScript
- Tailwind CSS v4
- No backend required for initial implementation

**Form State Management:**
- React useState or useReducer for form state
- Consider React Hook Form for complex validation

**Validation:**
- Required field validation on all fields
- Email format validation for Correo field
- Phone format validation (optional enhancement)

**Integration Points:**
- Modal trigger from existing CTA buttons ("Agenda tu llamada")
- Section placement after ServicesSection in page layout

### Future Considerations

- Backend integration for actual email sending
- Email notifications to both business and form submitter
- Form submission storage in database
- Advanced spam prevention (reCAPTCHA)
- Analytics and conversion tracking
