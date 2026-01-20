import { Globe, Workflow, ShoppingCart, Brain, Cpu, Database } from 'lucide-react';
import { DottedWaveBackground } from '../backgrounds';
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
  icon: typeof Globe;
}

/**
 * Array of 6 service offerings
 * Each follows the problem/benefit description pattern
 */
const services: ServiceData[] = [
  {
    title: 'Websites That Sell',
    description:
      'We design your digital presence to convey professionalism and convert visitors into customers.',
    icon: Globe,
  },
  {
    title: 'Process Automation',
    description:
      'We eliminate repetitive work. What takes you hours today, your system will do in minutes.',
    icon: Workflow,
  },
  {
    title: 'Online Stores',
    description:
      'Sell 24/7 with a fast, secure store ready to accept payments from day one.',
    icon: ShoppingCart,
  },
  {
    title: 'Applied Artificial Intelligence',
    description:
      'Chatbots, data analysis, internal assistants — we put AI to work in your real operations.',
    icon: Brain,
  },
  {
    title: 'Internet of Things (IoT)',
    description:
      'Connect sensors and devices to monitor your operations in real time — from inventory to machinery.',
    icon: Cpu,
  },
  {
    title: 'Management Systems (CRM/ERP)',
    description:
      'Centralize customers, sales, inventory, and finances in one place. Less Excel, more control.',
    icon: Database,
  },
];

/**
 * ServicesSection displays the company's 6 core service offerings
 * in a responsive card-based layout.
 *
 * Features:
 * - Semantic HTML with section element and proper heading hierarchy
 * - Accessible via aria-labelledby and navigable via #servicios anchor
 * - Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
 *
 * @example
 * ```tsx
 * <ServicesSection />
 * ```
 */
function ServicesSection() {
  return (
    <DottedWaveBackground
      as="section"
      id="servicios"
      aria-labelledby="services-heading"
      className="bg-background px-4 py-section md:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20"
      brightnessBoost={1.3}
    >
      {/* Container with progressive max-width for large screens */}
      <div className="mx-auto max-w-6xl 2xl:max-w-[90rem] 3xl:max-w-[108rem] 4xl:max-w-[120rem]">
        {/* Section Header - Using div to avoid implicit banner role conflict */}
        <div className="mb-12 md:mb-16 2xl:mb-20 3xl:mb-24 4xl:mb-28">
          {/* Eyebrow Text */}
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow 2xl:mb-6 3xl:mb-8">
            At GravityLabs
          </p>

          {/* Section Headline - Progressive max-width for readability */}
          <h2
            id="services-heading"
            className="max-w-3xl text-display-md font-bold leading-[1.1] text-text-primary 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl"
          >
            We're the software agency that builds custom solutions that work for you — while you
            focus on growing.
          </h2>
        </div>

        {/* Responsive Grid for Service Cards - 4 columns on 2xl+ screens */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8 3xl:gap-10 4xl:gap-12">
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
    </DottedWaveBackground>
  );
}

export default ServicesSection;
