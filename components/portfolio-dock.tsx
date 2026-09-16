import { TransitionLink } from '@/components/transition-link';

type DockSection = 'home' | 'work' | 'about';

type PortfolioDockProps = {
  current: DockSection;
  className?: string;
  homeHref?: string;
  workHref?: string;
  aboutHref?: string;
};

const items: Array<{ id: DockSection; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
];

export function PortfolioDock({
  current,
  className = '',
  homeHref = '#home',
  workHref = '#work',
  aboutHref = '/about',
}: PortfolioDockProps) {
  const hrefs: Record<DockSection, string> = {
    home: homeHref,
    work: workHref,
    about: aboutHref,
  };

  return (
    <nav
      className={`aa-dock${className ? ` ${className}` : ''}`}
      aria-label="Primary navigation"
    >
      {items.map((item) => {
        const href = hrefs[item.id];
        const content = (
          <>
            <span>{item.label}</span>
            <div className="aa-image-placeholder" aria-hidden="true">
              <span>{item.label}</span>
            </div>
          </>
        );
        const className = current === item.id ? 'is-current' : undefined;

        return href.startsWith('#') ? (
          <a className={className} href={href} key={item.id}>
            {content}
          </a>
        ) : (
          <TransitionLink
            className={className}
            direction={item.id === 'home' ? 'back' : 'forward'}
            href={href}
            key={item.id}
          >
            {content}
          </TransitionLink>
        );
      })}
    </nav>
  );
}
