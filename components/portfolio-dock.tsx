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

function DockIcon({ id }: { id: DockSection }) {
  if (id === 'home') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20h-5v-5H9v5H4Z" />
      </svg>
    );
  }

  if (id === 'work') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 7.5h17v12h-17zM8 7.5V5h8v2.5M3.5 12h17" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c.7-4 2.8-6 6.5-6s5.8 2 6.5 6" />
    </svg>
  );
}

export function PortfolioDock({
  current,
  className = '',
  homeHref = '#home',
  workHref = '/work',
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
        const isCurrent = current === item.id;
        const content = (
          <>
            <span>{item.label}</span>
            <div className="aa-image-placeholder" aria-hidden="true">
              {isCurrent ? <span>{item.label}</span> : <DockIcon id={item.id} />}
            </div>
          </>
        );
        const itemClassName = isCurrent ? 'is-current' : undefined;

        return href.startsWith('#') ? (
          <a className={itemClassName} href={href} key={item.id}>
            {content}
          </a>
        ) : (
          <TransitionLink
            className={itemClassName}
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
