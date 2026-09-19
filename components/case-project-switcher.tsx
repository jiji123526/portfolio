import { TransitionLink } from '@/components/transition-link';
import { projects } from '@/lib/project-data';

export function CaseProjectSwitcher({ currentSlug }: { currentSlug: string }) {
  const otherProjects = projects.filter(
    (project) => project.slug !== currentSlug,
  );

  return (
    <nav className="case-project-switcher" aria-label="Other selected work">
      {otherProjects.map((project) => (
        <TransitionLink
          className={`case-project-switcher__link is-${project.slug}`}
          direction="forward"
          href={`/work/${project.slug}`}
          key={project.slug}
        >
          <span aria-hidden="true">
            {project.title === 'Jangoing'
              ? 'J'
              : project.title === 'TagSpark'
                ? 'T'
                : 'Y'}
          </span>
          <strong>{project.title}</strong>
        </TransitionLink>
      ))}
    </nav>
  );
}
