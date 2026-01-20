import { ChevronDown } from 'lucide-react';

function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 2xl:bottom-10 3xl:bottom-12 4xl:bottom-14"
      role="presentation"
      aria-hidden="false"
    >
      <a
        href="#servicios"
        className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:bg-white/10 2xl:p-3 3xl:p-4"
        aria-label="Scroll down to see more content"
      >
        <ChevronDown
          className="h-6 w-6 text-text-muted motion-safe:animate-bounce md:h-8 md:w-8 2xl:h-10 2xl:w-10 3xl:h-12 3xl:w-12 4xl:h-14 4xl:w-14"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

export default ScrollIndicator;
