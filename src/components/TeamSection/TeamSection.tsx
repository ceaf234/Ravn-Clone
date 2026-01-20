import { DottedWaveBackground } from '../backgrounds';
import { Container } from '../layout';
import { TeamCard } from '../TeamCard';

/**
 * Team member data interface
 */
interface TeamMember {
  /** Team member's full name */
  name: string;
  /** Team member's role/position */
  role: string;
}

/**
 * Array of 6 team members
 */
const teamMembers: TeamMember[] = [
  {
    name: 'Michael Thompson',
    role: 'Product Director',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Engineering Director',
  },
  {
    name: 'David Chen',
    role: 'Infrastructure Lead',
  },
  {
    name: 'James Wilson',
    role: 'Senior Developer',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Senior Developer',
  },
  {
    name: 'Jessica Taylor',
    role: 'Brand Strategist',
  },
];

/**
 * TeamSection displays the company's team members in a responsive grid.
 *
 * Features:
 * - Dotted wave background consistent with other sections
 * - Section header with eyebrow, title, and optional subtitle
 * - Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
 * - Data-driven cards mapped from teamMembers array
 * - Anchor target for #equipo navigation
 *
 * @example
 * ```tsx
 * <TeamSection />
 * ```
 */
function TeamSection() {
  return (
    <DottedWaveBackground
      as="section"
      id="equipo"
      aria-labelledby="team-heading"
      className="bg-background px-4 py-section md:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20"
      brightnessBoost={1.3}
    >
      <Container>
        {/* Section Header - Left aligned */}
        <div className="mb-12 md:mb-16 2xl:mb-20 3xl:mb-24">
          {/* Eyebrow Text */}
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow 2xl:mb-6">
            Our Team
          </p>

          {/* Section Headline */}
          <h2
            id="team-heading"
            className="mb-4 max-w-3xl text-display-md font-bold leading-[1.1] text-text-primary md:mb-6 2xl:max-w-4xl"
          >
            The people who will work on your project.
          </h2>

          {/* Optional Subtitle */}
          <p className="max-w-2xl text-card-body leading-relaxed text-text-muted">
            We're the ones who answer your messages, build your software, and stand behind the
            results.
          </p>
        </div>

        {/* Team Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8 3xl:gap-10">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} name={member.name} role={member.role} />
          ))}
        </div>
      </Container>
    </DottedWaveBackground>
  );
}

export default TeamSection;
