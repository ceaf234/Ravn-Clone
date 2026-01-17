import { Code2, Palette, Brain, Workflow } from 'lucide-react';
import { ServiceCard } from '../ServiceCard';

/**
 * Service data interface for type safety
 */
interface ServiceData {
  /** Service title displayed as h3 heading in card */
  title: string;
  /** Service description following problem/benefit pattern */
  description: string;
  /** Lucide icon component for the service */
  icon: typeof Code2;
}

/**
 * Array of 4 service offerings with Spanish copy
 * Each follows the problem/benefit description pattern
 */
const services: ServiceData[] = [
  {
    title: 'Desarrollo de Software',
    description:
      'Construimos software escalable y de alto rendimiento adaptado a las necesidades de tu negocio, entregado por equipos de ingenieria que se mueven rapido y se adaptan a tus objetivos.',
    icon: Code2,
  },
  {
    title: 'Diseno de Experiencia de Usuario',
    description:
      'Creamos interfaces intuitivas centradas en el usuario que combinan innovacion con practicidad, generando soluciones que tus clientes amaran usar.',
    icon: Palette,
  },
  {
    title: 'Integracion de IA',
    description:
      'Aprovechamos la inteligencia artificial para desbloquear el valor de tus datos, integrando soluciones inteligentes y modelos de aprendizaje que impulsan decisiones mas acertadas.',
    icon: Brain,
  },
  {
    title: 'Automatizacion de Procesos',
    description:
      'Eliminamos el trabajo manual con automatizacion inteligente, combinando las mejores practicas para mantener tus sistemas funcionando de manera eficiente y sin interrupciones.',
    icon: Workflow,
  },
];

/**
 * ServicesSection displays the company's 4 core service offerings
 * in a responsive card-based layout.
 *
 * Features:
 * - Semantic HTML with section element and proper heading hierarchy
 * - Accessible via aria-labelledby and navigable via #servicios anchor
 * - Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
 * - Spanish copy targeting Guatemalan SMBs
 *
 * @example
 * ```tsx
 * <ServicesSection />
 * ```
 */
function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="services-heading"
      className="bg-background px-4 py-section md:px-6 lg:px-8"
    >
      {/* Container with max-width for readability */}
      <div className="mx-auto max-w-6xl">
        {/* Section Header - Using div to avoid implicit banner role conflict */}
        <div className="mb-12 md:mb-16">
          {/* Eyebrow Text */}
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow">
            En Antigravity
          </p>

          {/* Section Headline */}
          <h2
            id="services-heading"
            className="max-w-3xl text-display-md font-bold leading-[1.1] text-text-primary"
          >
            disenamos, construimos y escalamos productos digitales. Desde el concepto hasta el
            lanzamiento, y mas alla.
          </h2>
        </div>

        {/* Responsive Grid for Service Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
