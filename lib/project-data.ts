export type Project = {
  slug: string; metric: string; category: string; title: string; summary: string;
  headline: string; role: string; duration: string; client: string;
  responsibilities: string; tools: string; brief: string; challenges: string[];
  solutions: { title: string; body: string }[]; impact: string;
};

export const projects: Project[] = [
  {
    slug: 'human-ai-collaboration', metric: '18% ↑ in Task Confidence', category: 'AI Product Design',
    title: 'Human–AI Collaboration', summary: 'Making complex decisions clearer through a multi-agent workspace',
    headline: 'Simplifying complex decisions through a multi-agent AI workspace', role: 'Lead Product Designer',
    duration: '6 months', client: 'Research Partner',
    responsibilities: 'Research, strategy, interaction design, prototyping, testing', tools: 'Figma, Dovetail, After Effects, Jira',
    brief: 'How might we help non-technical teams reflect different perspectives while making high-stakes decisions?',
    challenges: ['Decision makers lack context from people closest to the work.', 'Critical information is scattered across disconnected systems.', 'Teams lose valuable knowledge as projects and people change.'],
    solutions: [
      { title: 'One system, many perspectives.', body: 'A shared workspace surfaces relevant viewpoints before the team commits to a direction.' },
      { title: 'AI that remembers context.', body: 'Project history and supporting documents ground every response in the organization’s reality.' },
      { title: 'Trade-offs made visible.', body: 'Potential consequences appear alongside practical ways to address them.' },
    ], impact: '+18% confidence after completing the guided decision flow',
  },
  {
    slug: 'store-discovery', metric: '44% ↑ in Discovery', category: 'Commerce Experience', title: 'Store Discovery',
    summary: 'A holistic journey that helps customers find the right place faster',
    headline: 'Creating a connected discovery journey across thousands of locations', role: 'Product Designer',
    duration: '4 months', client: 'Retail Platform', responsibilities: 'Journey mapping, workshops, UX design, usability testing',
    tools: 'Figma, FigJam, Maze, Analytics', brief: 'How might we turn location search from a utility into a confident discovery experience?',
    challenges: ['Users cannot quickly compare what makes each location relevant.', 'Search, maps, and location details feel like separate products.', 'Important amenities are buried below generic information.'],
    solutions: [
      { title: 'A clearer comparison model.', body: 'Consistent attributes help people scan and compare options without losing their place.' },
      { title: 'A continuous journey.', body: 'Search context follows the user from the map into each location detail.' },
      { title: 'Useful information first.', body: 'The interface prioritizes the details that most often change a customer’s decision.' },
    ], impact: '+44% engagement with discovery results in moderated testing',
  },
  {
    slug: 'personalized-reordering', metric: '12% ↑ in Return Visits', category: 'Mobile Commerce', title: 'Personalized Reordering',
    summary: 'Removing repetitive steps through timely, contextual shortcuts',
    headline: 'Helping returning customers finish familiar tasks without starting over', role: 'Senior Product Designer',
    duration: '3 months', client: 'Consumer Marketplace', responsibilities: 'Behavior analysis, concept design, experiments, delivery',
    tools: 'Figma, Amplitude, Protopie, Jira', brief: 'How might we make repeat purchases feel effortless without limiting customer choice?',
    challenges: ['Frequent customers repeat the same navigation on every visit.', 'Past orders are useful but difficult to adapt.', 'Generic recommendations ignore timing and intent.'],
    solutions: [
      { title: 'Shortcuts with context.', body: 'The product suggests familiar actions only when the timing and destination make sense.' },
      { title: 'Flexible repeat orders.', body: 'Customers can review and adjust items before they commit.' },
      { title: 'A gentle learning loop.', body: 'Small signals improve future suggestions without interrupting the task.' },
    ], impact: '+12% increase in return visits during the experiment window',
  },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
