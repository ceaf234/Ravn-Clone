import { ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import ScrollIndicator from '../ScrollIndicator';
import { useParallax } from '../../hooks';

function HeroSection() {
  const parallaxOffset = useParallax({ speed: 0.15 });

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="hero-headline"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 pt-20 md:px-6 lg:px-8"
    >
      {/* Parallax Background Layer - Decorative, hidden from assistive technologies */}
      <div
        className="pointer-events-none absolute inset-0 motion-reduce:transform-none"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          willChange: parallaxOffset !== 0 ? 'transform' : 'auto',
        }}
        aria-hidden="true"
        role="presentation"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background-elevated opacity-50" />
        {/* Radial gradient accent - CSS gradient for performance (no images needed) */}
        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/5 blur-3xl" />
      </div>

      {/* Hero Content - Mobile-first with progressive enhancement */}
      <article className="relative z-10 mx-auto w-full max-w-4xl px-0 md:px-4 lg:px-0">
        {/* Eyebrow Text - Responsive sizing with improved contrast */}
        <p
          className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow md:mb-6"
          aria-label="Tipo de servicio"
        >
          Consultoria Tecnologica
        </p>

        {/* Main Headline - Responsive typography with clamp */}
        <h1
          id="hero-headline"
          className="mb-4 text-display-xl font-bold leading-[1.1] text-text-primary md:mb-6"
        >
          Construimos el <span className="text-accent-blue">futuro</span> de la tecnologia
        </h1>

        {/* Subheadline Paragraph - Constrained for optimal readability */}
        <p className="mb-8 max-w-xl text-body-lg leading-[1.6] text-text-muted md:mb-10 md:max-w-2xl">
          Consultoria tecnologica estrategica que transforma ideas ambiciosas en productos digitales
          que definen el mercado. Disenamos innovacion.
        </p>

        {/* CTA Buttons Container - Stacked on mobile, horizontal from sm breakpoint */}
        <div
          className="flex flex-col gap-4 sm:flex-row sm:gap-6"
          role="group"
          aria-label="Acciones principales"
        >
          {/* Primary CTA Button - Full width on mobile, auto on larger screens */}
          <Button variant="primary" href="#contacto" icon={ArrowRight} className="w-full sm:w-auto">
            Iniciar Proyecto
          </Button>

          {/* Secondary CTA Button */}
          <Button variant="secondary" href="#proyectos" className="w-full sm:w-auto">
            Ver Proyectos
          </Button>
        </div>
      </article>

      {/* Scroll Indicator - Responsive positioning with ARIA label */}
      <ScrollIndicator />
    </main>
  );
}

export default HeroSection;
