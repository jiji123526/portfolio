export type Project = {
  slug: string; metric: string; category: string; title: string; summary: string;
  headline: string; role: string; duration: string; client: string;
  responsibilities: string; tools: string; brief: string; challenges: string[];
  liveUrl?: string; repoUrl?: string;
  solutions: { title: string; body: string; mediaNote?: string }[]; impact: string;
  process?: { label: string; title: string; body: string }[];
  challengeIntro?: string;
  statement?: string;
  limitation?: { title: string; body: string; tension: [string, string] };
  architecture?: { title: string; body: string; mediaNote: string; nodes?: string[] };
  impactBody?: string;
  takeaways?: { title: string; body: string }[];
  coverNote?: string;
};

export const projects: Project[] = [
  {
    slug: 'yap-anonymous-chat', metric: '350+ Daily Active Users', category: 'Independent Product',
    title: 'yap. Anonymous Chat', summary: 'Link-based conversations that start without asking everyone to create an account',
    headline: 'Designing a link-first anonymous chat for conversations that shouldn’t need an account', role: 'Product Designer & Full-stack Developer',
    duration: 'Ongoing', client: 'Independent Product',
    responsibilities: 'Product strategy, UX/UI, frontend, edge backend, security, and operations', tools: 'Next.js, React, Tailwind CSS, Workers, D1, R2, Durable Objects',
    liveUrl: 'https://yapndot.com', repoUrl: 'https://github.com/jiji123526/letmetellu',
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
    architecture: { title: 'One product, deliberately separated responsibilities.', body: 'Next.js handles the web experience and account session boundary. A Cloudflare Worker re-checks authorization and runs APIs; D1 stores durable records, Durable Objects coordinate each realtime room, and R2 stores protected media.', mediaNote: 'Architecture animation: browser → Next.js / Worker → D1, Durable Object, R2', nodes: ['Browser', 'Next.js', 'Worker', 'D1 · DO · R2'] },
    impact: 'Grew to 350+ daily active users during limited beta',
    impactBody: 'The production system supports public and passcode-protected channels, realtime messaging, private owner DMs, media, bilingual interfaces, live sessions, moderation, support, and Web Push. During a production database cutover, 42 users, 36 channels, and 16,606 messages were validated and migrated with matching counts and no orphaned records.',
    takeaways: [
      { title: 'Designing permissions as part of the interface', body: 'Privacy boundaries only work when the interface, cookies, API routes, and realtime connection agree. Each owner, guest, room viewer, and private sender state needed an explicit contract.' },
      { title: 'Treating operational reliability as user experience', body: 'A successful request that takes several seconds still feels broken. Route timing, health events, rollback paths, and production runbooks became part of how I protected the conversation experience.' },
      { title: 'Keeping temporary and permanent state separate', body: 'Live participation is coordinated in realtime, while durable history remains in the database. Separating those jobs made expiry and recovery easier to reason about.' },
    ],
  },
  {
    slug: 'jangoing-kitchen-intelligence', metric: 'NLP · REVIEWABLE AI', category: 'AI Product', title: 'Jangoing',
    summary: 'Turning everyday kitchen language into safe, reviewable household actions',
    headline: 'Designing conversational kitchen intelligence that learns from reviewed human corrections', role: 'Product Designer & Full-stack Developer',
    duration: 'Ongoing', client: 'Independent Product', responsibilities: 'Product strategy, NLP schemas, UX/UI, annotation systems, frontend, backend, and evaluation',
    tools: 'Next.js, TypeScript, Cloudflare Workers, D1, Python, scikit-learn', brief: 'How might a household assistant understand natural language without making silent, irreversible changes to shared state?',
    liveUrl: 'https://jangoing-web.vercel.app', repoUrl: 'https://github.com/jiji123526/jangoing',
    coverNote: 'Product demo: natural-language request → structured proposal → review → household update',
    process: [
      { label: 'Language problem', title: 'Conversation is not a command line', body: 'Real requests contain irrelevant phrases, aliases, multiple actions, and relative dates that must be grounded before they become data.' },
      { label: 'Safety principle', title: 'Interpretations stay reviewable', body: 'Every state-changing proposal can be confirmed or corrected, turning uncertainty into a visible product interaction.' },
      { label: 'Learning loop', title: 'Corrections become evidence', body: 'Reviewed examples feed annotation queues, frozen evaluation sets, and reproducible model comparisons instead of disappearing after the interaction.' },
    ],
    challengeIntro: 'The core challenge was not adding a chatbot to an inventory app. It was building a trustworthy bridge between ambiguous household language and durable shared state.',
    challenges: ['Everyday speech mixes relevant actions with context, shorthand, and household-specific vocabulary.', 'Dates such as “tomorrow” or “next Friday” need deterministic grounding to avoid unsafe inventory changes.', 'A model can look accurate on easy examples while failing on joint intent, entity span, or normalization.'],
    statement: 'How might we let an assistant learn household language while keeping every consequential interpretation visible and correctable?',
    solutions: [
      { title: 'Language becomes a proposal, not an automatic mutation.', body: 'The system separates relevance, intent, entities, normalization, and multi-action parsing, then asks the user to review the structured result before updating household state.', mediaNote: 'Interaction: typed request → highlighted entities → editable action proposal' },
      { title: 'The product doubles as an annotation environment.', body: 'AI-assisted candidates move through review queues into versioned JSONL exports, making user corrections useful for training and evaluation.', mediaNote: 'Annotation queue: candidate label, correction controls, reviewed state' },
      { title: 'Household state is reconstructed from events.', body: 'Inventory and shopping projections preserve the history behind expiry, quantity, low-stock, and leftover changes instead of storing only the latest value.', mediaNote: 'System view: action events flowing into inventory and shopping projections' },
    ],
    architecture: { title: 'A product foundation built for model iteration.', body: 'Next.js serves the household and annotation experience. A Cloudflare Worker and D1 persist household-scoped events, while shared contracts keep the web app, API, and Python evaluation tools aligned.', mediaNote: 'Architecture: web app + shared contracts → Worker/D1 and ML evaluation pipeline', nodes: ['Next.js', 'Contracts', 'Worker · D1', 'ML evaluation'] },
    impact: 'Built the product and evaluation loop for the first reviewed English benchmark',
    impactBody: 'The authenticated MVP supports shared household inventory, shopping lists, expiry and low-stock workflows, reviewed text commands, correction logging, annotation queues, dataset export, and reproducible baseline tooling. The current milestone progresses from a 300/100 workflow pilot toward a 1,000-training / 200-evaluation human-data baseline.',
    takeaways: [
      { title: 'Uncertainty needs an interface', body: 'A confidence score alone does not create trust. Showing the proposed action, its extracted details, and a correction path makes model uncertainty actionable.' },
      { title: 'Evaluation starts in the product', body: 'The annotation schema and review workflow determine whether future model comparisons will be meaningful, so they belong in the initial product architecture.' },
      { title: 'Personalization should be layered', body: 'A shared base can define safety and general language behavior while household-specific aliases and preferences remain in a separate adapter.' },
    ],
  },
  {
    slug: 'tag-spark-recommendations', metric: 'FULL-STACK · RECOMMENDATION', category: 'Recommendation Product', title: 'TagSpark',
    summary: 'Helping people discover relevant works through the language of their preferences',
    headline: 'Building a tag-based recommendation journey from preference selection to ranked results', role: 'Product Designer & Full-stack Developer',
    duration: '2026', client: 'Independent Product', responsibilities: 'Product design, recommendation logic, frontend, APIs, database, and deployment',
    tools: 'React, TypeScript, Tailwind CSS, Neon Postgres, Vercel', brief: 'How might we make recommendations feel understandable and controllable instead of opaque?',
    liveUrl: 'https://kwkrecom.vercel.app', repoUrl: 'https://github.com/jiji123526/tag-spark',
    coverNote: 'Product demo: onboarding → tag selection → ranked recommendation results',
    process: [
      { label: 'Input model', title: 'Preferences expressed as tags', body: 'Users select contextual tags that describe what they want, creating an explicit signal they can inspect and change.' },
      { label: 'Ranking model', title: 'Transparent weighted matching', body: 'Recommendations combine tag overlap, category weights, and alias matching rather than relying on an unexplained black box.' },
      { label: 'Product loop', title: 'Discovery beyond one result', body: 'Filtered lists, sorting, and work detail patterns let the user continue exploring after the first recommendation.' },
    ],
    challengeIntro: 'Recommendation products often hide why something appeared. TagSpark instead makes preference input visible and keeps the path from selection to result legible.',
    challenges: ['Free-form taste is difficult to compare consistently across different works.', 'Exact tag matching misses related terms and category context.', 'A mobile recommendation flow needs enough control without turning preference setup into a form.'],
    statement: 'How might we translate subjective taste into a recommendation model users can see, adjust, and understand?',
    solutions: [
      { title: 'A lightweight preference canvas.', body: 'Mobile onboarding and tag selection turn an abstract question—“what do I like?”—into a set of quick, reversible choices.', mediaNote: 'Mobile sequence: onboarding, tag groups, selected preference state' },
      { title: 'Scoring with context.', body: 'The recommendation engine ranks works through tag overlap, weighted categories, and alias matching so related preferences can still surface useful results.', mediaNote: 'Animated explainer: selected tags flowing into weighted ranked cards' },
      { title: 'A maintained recommendation catalog.', body: 'Serverless APIs expose works and tags, support catalog management, and refresh metadata through a scheduled scrape.', mediaNote: 'System view: catalog CRUD, daily metadata refresh, recommendation response' },
    ],
    architecture: { title: 'A compact full-stack recommendation service.', body: 'A React and TypeScript client renders the selection and discovery flows. Vercel serverless functions handle works, tags, recommendation data, and scheduled metadata refreshes against Neon Postgres.', mediaNote: 'Architecture: React client → Vercel functions → Neon database + scheduled scraper', nodes: ['React', 'Vercel API', 'Neon', 'Daily scrape'] },
    impact: 'Shipped a production-ready recommendation flow with a live catalog and scheduled data refresh',
    impactBody: 'The product includes first-time onboarding, mobile tag selection, ranked recommendation results, filtered work lists, catalog CRUD, and a daily metadata scrape. The same system runs locally through Vite middleware and in production through Vercel serverless functions.',
    takeaways: [
      { title: 'Explicit signals can feel more personal', body: 'Letting people state and revise their preferences creates control that passive recommendation systems often lack.' },
      { title: 'Aliases are a product decision', body: 'Deciding which tags should be treated as related changes the recommendation experience, not just the implementation.' },
      { title: 'Catalog quality shapes recommendation quality', body: 'Fresh, consistent metadata is a prerequisite for useful ranking, so ingestion and maintenance are part of the user experience.' },
    ],
  },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
