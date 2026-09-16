export const LOADER_LABEL_EVENT = 'portfolio:loader-label';

const projectLabels: Record<string, string> = {
  'yap-anonymous-chat': 'YAP.',
  'jangoing-kitchen-intelligence': 'JANGOING',
  'tag-spark-recommendations': 'TAGSPARK',
};

export function getLoaderLabel(pathname: string) {
  if (pathname === '/about') return 'ABOUT ME';

  const projectSlug = pathname.match(/^\/work\/([^/]+)/)?.[1];
  if (projectSlug) {
    return (
      projectLabels[projectSlug] ??
      projectSlug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  }

  return 'JIWOO JEONG';
}
