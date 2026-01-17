import { Button } from '../Button';
import { Container } from '../layout';
import ScrollIndicator from '../ScrollIndicator';
import { TypewriterText } from '../TypewriterText';

function HeroSection() {
  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="hero-headline"
      className="dot-wave relative flex min-h-screen flex-col items-start justify-center overflow-hidden bg-background pt-20"
    >
      {/* Hero Content - Uses shared Container for alignment with navbar */}
      <Container className="relative z-10">
        <article className="w-full">
          {/* Main Headline - Massive bold geometric sans with typing effect
              ~5× larger on very large screens using inline clamp() */}
          <h1
            id="hero-headline"
            className="mb-6 font-display font-extrabold leading-[0.95] tracking-tight text-white md:mb-8 2xl:mb-12 3xl:mb-16 4xl:mb-20"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 10.5rem)' }}
          >
            <TypewriterText
              text="Diseñamos, construimos y escalamos."
              speed={45}
              pauseAfterPunctuation={350}
              startDelay={300}
              keepCaretAfterComplete={true}
            />
          </h1>

          {/* Subheadline Paragraph - Muted text with max-width for readability */}
          <p className="mb-10 max-w-[60ch] text-sm leading-[1.6] text-text-muted sm:text-base md:mb-12 2xl:text-lg 2xl:mb-14 3xl:mb-16 4xl:text-xl">
            Consultoria tecnologica estrategica que transforma ideas ambiciosas en productos digitales
            que definen el mercado.
          </p>

          {/* CTA Button - Single primary action with responsive scaling */}
          <div role="group" aria-label="Acciones principales">
            <Button variant="primary" href="#contacto" className="w-full sm:w-auto">
              Agenda una llamada
            </Button>
          </div>
        </article>
      </Container>

      {/* Scroll Indicator - Responsive positioning with ARIA label */}
      <ScrollIndicator />
    </main>
  );
}

export default HeroSection;
