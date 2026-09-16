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
  aboutHref = '#about',
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
      {items.map((item) => (
        <a
          className={current === item.id ? 'is-current' : undefined}
          href={hrefs[item.id]}
          key={item.id}
        >
          <span>{item.label}</span>
          <div className="aa-image-placeholder" aria-hidden="true">
            <span>{item.label}</span>
          </div>
        </a>
      ))}
    </nav>
  );
}
