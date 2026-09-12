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
  platformOperations?: {
    title: string; intro: string;
    cards: { title: string; body: string }[];
    boundary: { title: string; body: string };
    flow: string[]; media: string[];
  };
  architecture?: { title: string; body: string; detail?: string; mediaNote: string; nodes?: string[] };
  reliability?: { title: string; body: string; evidence: { value: string; label: string }[] };
  impactLabel?: string;
  impactBody?: string;
  takeaways?: { title: string; body: string }[];
  coverNote?: string;
};

const projectCatalog: Project[] = [
  {
    slug: 'yap-anonymous-chat', metric: '6.5K Messages in 7 Days', category: 'Independent Product',
    title: 'yap. Anonymous Chat', summary: 'Operating reliable realtime conversations with explicit moderation and trust boundaries',
    headline: 'Engineering a link-first realtime system for conversations that shouldn’t need an account', role: 'Full-stack Product Engineer',
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
      { title: 'Anonymous does not mean unstructured.', body: 'Replies, reactions, search, notices, and banned-word feedback give lightweight conversations structure. User reports can escalate from owner review to platform-level moderation, while blocking, freezing, warnings, petitions, and recoverable deletion make enforcement explicit and reversible where appropriate.', mediaNote: 'Moderation flow: user report → owner review → warning or enforcement → visible feedback' },
      { title: 'Private messages have a visible boundary.', body: 'A visitor can start a thread that only they and the channel owner can read. Authorization is enforced on the server, not by hiding UI.', mediaNote: 'Split view: guest DM composer and owner-only thread' },
      { title: 'Live is intentionally temporary.', body: 'A host can start a separate live session for a shared moment. Session identity, presence, and expiry are kept distinct from normal channel history.', mediaNote: 'Sequence: live starts, reactions appear, session ends cleanly' },
    ],
    limitation: { title: 'Lowering the door also widens the abuse surface.', body: 'Anonymous entry is the product’s advantage and its central risk. I treated rate limits, signed visitor identities, scoped room tokens, server-side authorization, idempotent message IDs, moderation logs, and recoverable deletion as product behavior—not invisible backend cleanup. Realtime delivery improves immediacy, but durable storage remains authoritative when connections fail or clients retry.', tension: ['Fast entry with no guest account', 'Clear limits, revocation, and owner control'] },
    platformOperations: {
      title: 'Moderation had to extend beyond a single room.',
      intro: 'Channel owners can manage everyday behavior inside their own communities, but some problems require a service-wide response. I built a separate platform-admin workspace for handling escalated abuse, user support, appeals, operational communication, and production health without giving ordinary channel owners access to platform-level data.',
      cards: [
        { title: 'Layered enforcement', body: 'Message and channel reports enter dedicated review queues with the relevant evidence loaded on demand. A platform administrator can issue warnings, suspend or freeze a channel, record a resolution, and review an owner’s petition instead of treating every report as an irreversible deletion.' },
        { title: 'Scoped user support', body: 'Authenticated users can open private one-to-one support threads with the platform administrator. Session ownership, thread visibility, closure, and user-side removal are enforced by server-side authorization rather than by hiding conversations in the interface.' },
        { title: 'Operational visibility', body: 'The same workspace surfaces bounded health summaries for failed and unusually slow core requests, authentication and email-delivery outcomes, notification delivery, and database availability. Versioned global notices can be published across every entry route without requiring a realtime broadcast.' },
      ],
      boundary: { title: 'The dashboard does not grant authority.', body: 'Client-side session state is used only to choose the interface. Every platform-admin read and mutation is independently authorized by the Worker against the authoritative server-side role. Responses remain scoped, sensitive evidence is loaded only when requested, and operational metrics avoid storing message content or raw identity values.' },
      flow: ['User report', 'Scoped evidence review', 'Warning / restriction / dismissal', 'Owner notification', 'Petition or support follow-up', 'Resolution retained with status and timestamps'],
      media: ['Platform moderation loop: channel report → scoped evidence → warning or restriction → owner petition → resolution', 'Operations loop: private support thread → resolution → health summary → versioned global notice'],
    },
    architecture: { title: 'One product, deliberately separated responsibilities.', body: 'Next.js handles the web experience and account session boundary. A Cloudflare Worker re-checks authorization and runs APIs; D1 stores durable records, Durable Objects coordinate each realtime room, and R2 stores protected media.', detail: 'Realtime delivery is an acceleration layer rather than the source of truth. Messages become visible from authoritative persistence results, client-generated IDs make retries idempotent, and reconnect fallback is deliberately rate-limited to avoid amplifying an outage. Long histories use cursor-bounded pagination and a client-side sliding window, while public messages and authorized private threads remain in one ordered timeline without widening DM visibility.', mediaNote: 'Architecture animation: browser → Next.js session boundary → Worker authorization → D1 commit → Durable Object delivery / R2 media, with reconnect, idempotent retry, and cursor-pagination paths', nodes: ['Browser', 'Next.js', 'Worker', 'D1 · DO · R2'] },
    reliability: {
      title: 'Diagnosing latency meant separating SQL time from infrastructure wait.',
      body: 'When one production D1 database began adding 4–18 seconds of request delay despite millisecond-level SQL execution, I added route-level stage timings to isolate the wait from authentication, query execution, media signing, and rendering. I validated a replacement database, migrated production data with matching counts, checked referential integrity and targeted orphaned records, retained a rollback copy, and moved traffic without changing the public product contract.',
      evidence: [
        { value: '4–18 sec', label: 'Observed database and primary-path wait' },
        { value: 'Low-ms SQL', label: 'Query execution was not the primary delay' },
        { value: '16,606', label: 'Messages validated during the cutover' },
        { value: '0 detected violations', label: 'Foreign-key and targeted orphan checks' },
        { value: '~80 ms init', label: 'Observed post-cutover Worker sample' },
      ],
    },
    impact: '6,517 messages created in one production week',
    impactLabel: 'PRODUCTION EVIDENCE',
    impactBody: 'From September 5–11 UTC, yap. handled 6,517 created messages across public conversations and private DMs, including messages later deleted by users. Usage was event-driven rather than uniform: the median was 332 messages per day, while the average excluding the largest spike was approximately 550 per day.',
    takeaways: [
      { title: 'Designing permissions as part of the interface', body: 'Privacy boundaries only work when the interface, cookies, API routes, and realtime connection agree. Each owner, guest, room viewer, and private sender state needed an explicit contract.' },
      { title: 'Treating operational reliability as user experience', body: 'A successful request that takes several seconds still feels broken. Stage-level timings, bounded retries, health events, integrity checks, rollback copies, and production runbooks became part of the product experience—not separate operational paperwork.' },
      { title: 'Keeping temporary and permanent state separate', body: 'Live participation is coordinated in realtime, while durable history remains in the database. Separating those jobs made expiry and recovery easier to reason about.' },
    ],
  },
  {
    slug: 'jangoing-kitchen-intelligence', metric: 'LANGUAGE DATA · EVALUATION', category: 'Language Engineering', title: 'Jangoing',
    summary: 'Turning ambiguous household language into grounded, reviewable actions and evaluation data',
    headline: 'Engineering a language system that learns from reviewed human corrections', role: 'Language Engineer & Full-stack Developer',
    duration: 'Ongoing', client: 'Independent Product', responsibilities: 'Annotation schemas, guidelines, NLP evaluation, temporal normalization, product workflows, frontend, and backend',
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
    slug: 'tag-spark-recommendations', metric: 'TAXONOMY · RANKING', category: 'Recommendation Systems', title: 'TagSpark',
    summary: 'Structuring subjective preferences into transparent, tag-based rankings',
    headline: 'Building a taxonomy-driven recommendation system from preference input to ranked results', role: 'Recommendation Systems & Full-stack Developer',
    duration: '2026', client: 'Independent Product', responsibilities: 'Tag taxonomy, alias logic, weighted ranking, product design, APIs, database, and deployment',
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

const projectOrder = ['jangoing-kitchen-intelligence', 'yap-anonymous-chat', 'tag-spark-recommendations'];
export const projects = projectOrder.map((slug) => projectCatalog.find((project) => project.slug === slug)!);

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
