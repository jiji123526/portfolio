export type Project = {
  slug: string; metric: string; category: string; title: string; summary: string;
  headline: string; role: string; duration: string; client: string;
  responsibilities: string; tools: string; brief: string; challenges: string[];
  solutions: { title: string; body: string; mediaNote?: string }[]; impact: string;
  process?: { label: string; title: string; body: string }[];
  challengeIntro?: string;
  statement?: string;
  limitation?: { title: string; body: string; tension: [string, string] };
  architecture?: { title: string; body: string; mediaNote: string };
  impactBody?: string;
  takeaways?: { title: string; body: string }[];
  coverNote?: string;
};

export const projects: Project[] = [
  {
    slug: 'yap-anonymous-chat', metric: 'LIVE · LIMITED BETA', category: 'Independent Product',
    title: 'yap. Anonymous Chat', summary: 'Link-based conversations that start without asking everyone to create an account',
    headline: 'Designing a link-first anonymous chat for conversations that shouldn’t need an account', role: 'Product Designer & Full-stack Developer',
    duration: 'Ongoing', client: 'Independent Product',
    responsibilities: 'Product strategy, UX/UI, frontend, edge backend, security, and operations', tools: 'Next.js, React, Tailwind CSS, Workers, D1, R2, Durable Objects',
    brief: 'How might we make it effortless to start a small anonymous conversation while giving the host enough control to keep it useful and safe?',
    coverNote: 'Product demo: shared link → guest entry → first anonymous message',
    process: [
      { label: 'Product constraint', title: 'Zero-account entry', body: 'A guest should be able to open a shared channel and participate immediately, without creating an identity first.' },
      { label: 'Trust boundary', title: 'Control without surveillance', body: 'The owner needs moderation tools, while private messages and visitor identity remain deliberately scoped.' },
      { label: 'Technical constraint', title: 'Realtime at the edge', body: 'Long-lived chat connections, durable history, and protected media need different infrastructure responsibilities.' },
    ],
    challengeIntro: 'The design problem was not simply “make a chat app.” It was balancing instant participation with explicit privacy and moderation boundaries.',
    challenges: ['Account creation makes lightweight, one-off conversations feel heavier than the conversation itself.', 'Anonymous participation becomes fragile when access, moderation, and private communication are unclear.', 'Temporary live moments need a distinct lifecycle so they do not blur into permanent channel history.'],
    statement: 'How might we keep joining as light as opening a link—without making ownership, privacy, or safety ambiguous?',
    solutions: [
      { title: 'A room begins with a link.', body: 'Hosts create a channel and share its URL. Guests can enter public rooms immediately, while optional passcodes add friction only when the conversation needs it.', mediaNote: 'Flow capture: create channel, copy link, open as a guest' },
      { title: 'Anonymous does not mean unstructured.', body: 'Replies, reactions, search, notices, rules, freezing, banned words, and blocking give a lightweight room enough structure to stay usable.', mediaNote: 'Chat screen: replies, reactions, notice, and owner controls' },
      { title: 'Private messages have a visible boundary.', body: 'A visitor can start a thread that only they and the channel owner can read. Authorization is enforced on the server, not by hiding UI.', mediaNote: 'Split view: guest DM composer and owner-only thread' },
      { title: 'Live is intentionally temporary.', body: 'A host can start a separate live session for a shared moment. Session identity, presence, and expiry are kept distinct from normal channel history.', mediaNote: 'Sequence: live starts, reactions appear, session ends cleanly' },
    ],
    limitation: { title: 'Lowering the door also widens the abuse surface.', body: 'Anonymous entry is the product’s advantage and its central risk. I treated rate limits, signed visitor identities, scoped room tokens, moderation logs, and recoverable deletion as product behavior—not invisible backend cleanup.', tension: ['Fast entry with no guest account', 'Clear limits, revocation, and owner control'] },
    architecture: { title: 'One product, deliberately separated responsibilities.', body: 'Next.js handles the web experience and account session boundary. A Cloudflare Worker re-checks authorization and runs APIs; D1 stores durable records, Durable Objects coordinate each realtime room, and R2 stores protected media.', mediaNote: 'Architecture animation: browser → Next.js / Worker → D1, Durable Object, R2' },
    impact: 'A monitored limited beta is live at yapndot.com',
    impactBody: 'The production system supports public and passcode-protected channels, realtime messaging, private owner DMs, media, bilingual interfaces, live sessions, moderation, support, and Web Push. During a production database cutover, 42 users, 36 channels, and 16,606 messages were validated and migrated with matching counts and no orphaned records.',
    takeaways: [
      { title: 'Designing permissions as part of the interface', body: 'Privacy boundaries only work when the interface, cookies, API routes, and realtime connection agree. Each owner, guest, room viewer, and private sender state needed an explicit contract.' },
      { title: 'Treating operational reliability as user experience', body: 'A successful request that takes several seconds still feels broken. Route timing, health events, rollback paths, and production runbooks became part of how I protected the conversation experience.' },
      { title: 'Keeping temporary and permanent state separate', body: 'Live participation is coordinated in realtime, while durable history remains in the database. Separating those jobs made expiry and recovery easier to reason about.' },
    ],
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
