import { HomeLanguageExperience } from '@/components/home-language-experience';
import { homeContent } from '@/lib/home-content';
import { projects } from '@/lib/project-data';

export default function Home() {
  const selectedProjects = projects.map(
    ({ slug, title, summary, metric, category, role, duration }) => ({
      slug,
      title,
      summary,
      metric,
      category,
      role,
      duration,
    }),
  );

  return (
    <HomeLanguageExperience content={homeContent} projects={selectedProjects} />
  );
}
