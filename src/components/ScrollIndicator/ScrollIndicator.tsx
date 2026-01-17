import { ChevronDown } from 'lucide-react';

function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8"
      role="presentation"
      aria-hidden="false"
    >
      <a
        href="#servicios"
        className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:bg-white/10"
        aria-label="Desplazarse hacia abajo para ver mas contenido"
      >
        <ChevronDown
          className="h-6 w-6 text-text-muted motion-safe:animate-bounce md:h-8 md:w-8"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

export default ScrollIndicator;
