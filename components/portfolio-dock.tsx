import { TransitionLink } from '@/components/transition-link';

type DockSection = 'home' | 'about';
type DockItem = DockSection | 'ask';

type PortfolioDockProps = {
  current?: DockSection;
  className?: string;
  homeHref?: string;
  aboutHref?: string;
};

const items: Array<{ id: DockItem; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'ask', label: 'Ask' },
];

function DockIcon({ id }: { id: DockItem }) {
  if (id === 'home') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20h-5v-5H9v5H4Z" />
      </svg>
    );
  }

  if (id === 'ask') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5.5h14v10H9l-4 3v-13Z" />
        <path d="m12 7.5.65 1.55 1.6.65-1.6.65L12 12l-.65-1.65-1.6-.65 1.6-.65Z" />
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
  aboutHref = '/about',
}: PortfolioDockProps) {
  const hrefs: Record<DockSection, string> = {
    home: homeHref,
    about: aboutHref,
  };

  return (
    <nav
      className={`aa-dock${className ? ` ${className}` : ''}`}
      aria-label="Primary navigation"
    >
      {items.map((item) => {
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

        if (item.id === 'ask') {
          return (
            <span
              aria-disabled="true"
              aria-label="Ask, coming soon"
              className="aa-dock-disabled"
              key={item.id}
            >
              {content}
            </span>
          );
        }

        const href = hrefs[item.id];

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
