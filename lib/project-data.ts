export type Project = {
  slug: string; metric: string; category: string; title: string; summary: string;
  headline: string; role: string; duration: string; client: string;
  responsibilities: string; tools: string; brief: string; challenges: string[];
  liveUrl?: string; repoUrl?: string;
  solutions: { title: string; body: string; mediaNote?: string }[]; impact: string;
  process?: { label: string; title: string; body: string }[];
  challengeIntro?: string;
  statement?: string;
  transformation?: { body: string; stats: { value: string; label: string }[] };
  solutionsLabel?: string;
  limitation?: { title: string; body: string; tension: [string, string] };
  platformOperations?: {
    title: string; intro: string;
    cards: { title: string; body: string }[];
    boundary: { title: string; body: string };
  };
  architecture?: { title: string; body: string; detail?: string; mediaNote: string; nodes?: string[] };
  reliability?: { title: string; body: string; evidence: { value: string; label: string }[] };
  incidents?: {
    cases: { title: string; signal: string; diagnosis: string; response: string; prevention: string }[];
    additionalHardening: string;
  };
  impactLabel?: string;
  impactBody?: string;
  takeaways?: { title: string; body: string }[];
  coverNote?: string;
};

const projectCatalog: Project[] = [
  {
    slug: 'yap-anonymous-chat', metric: '400+ ACTIVE USERS', category: 'Independent Product',
    title: 'yap.', summary: 'Anonymous realtime chat with owner controls, private messaging boundaries, and temporary live sessions',
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
    statement: 'Remove account friction, not product boundaries.',
    transformation: {
      body: 'yap. began as a single-channel personal page built with Vanilla JS and Supabase. Rather than porting that implementation, I used its behavior as a specification and redesigned the product as a multi-tenant platform on Next.js, Cloudflare Workers, D1, Durable Objects, and R2. This required explicit channel ownership, separate anonymous and authenticated identities, platform-admin authority, media lifecycle rules, and operational monitoring. I later selectively migrated the original production channel, preserving its history while keeping legacy anonymous identities pseudonymous and unlinked. Reply and gallery references, along with record counts, were verified before and after the move.',
      stats: [{ value: '685', label: 'Messages preserved' }, { value: '204', label: 'Replies preserved' }, { value: '25', label: 'Images preserved' }],
    },
    solutionsLabel: 'KEY PRODUCT SOLUTIONS',
    solutions: [
      { title: 'A room begins with a link.', body: 'Hosts create a channel and share its URL. Guests can enter public rooms immediately, while optional passcodes add friction only when the conversation needs it.', mediaNote: 'Flow capture: create channel, copy link, open as a guest' },
      { title: 'Anonymous does not mean chaotic.', body: 'Owners can shape entry, pacing, and message rules without leaving the conversation. Passcodes, chat freezes, and word filters change the room immediately.', mediaNote: 'Passcode, freeze, and word filters change the room instantly' },
      { title: 'Private messages have a visible boundary.', body: 'A visitor can message the channel owner privately without leaving the room. The sender and owner see the same exchange; other visitors continue to see only public messages.', mediaNote: 'Guest sends privately → owner replies → other visitor only sees the room' },
      { title: 'Live is intentionally temporary.', body: 'A host can open a separate live session for a shared moment, then end it cleanly. Live messages and reactions disappear while the normal room remains.', mediaNote: 'Start → join → react → end → return' },
    ],
    platformOperations: {
      title: 'Platform operations',
      intro: 'Beyond room-level moderation, yap. needed an operational layer for monitoring service health, triaging reports, and handling support. This dashboard brought incident awareness, queue management, and escalated user issues into one place.',
      cards: [
        { title: 'Layered enforcement', body: 'Message and channel reports enter separate review queues with evidence loaded on demand. Administrators can warn, restrict, dismiss, and resolve a case while preserving an owner’s path to petition.' },
        { title: 'Scoped user support', body: 'Authenticated users can open private one-to-one support threads. Ownership, visibility, closure, and user-side removal are enforced through server authorization rather than hidden UI.' },
        { title: 'Operational communication', body: 'Scoped service summaries support triage, while versioned global notices can reach every entry route without requiring a realtime broadcast or widening access to message content.' },
      ],
      boundary: { title: 'The dashboard does not grant authority.', body: 'Client-side state only selects the interface. Every platform-admin read and mutation is re-authorized by the Worker against the authoritative server-side role; evidence remains request-scoped, and operational metrics exclude message content and raw identity values.' },
    },
    architecture: { title: 'One product, deliberately separated responsibilities.', body: 'Next.js owns the web experience and session boundary. The Worker independently authorizes API access, D1 stores durable records, Durable Objects coordinate room presence and delivery, and R2 stores protected media.', detail: 'Authoritative writes commit to D1 before realtime fan-out. Public messages and authorized private threads can share one ordered timeline without widening DM visibility, while media access remains separately signed and scoped.', mediaNote: 'Architecture animation: browser → Next.js session boundary → Worker authorization → D1 commit → Durable Object delivery / R2 media', nodes: ['Browser', 'Next.js', 'Worker', 'D1 · DO · R2'] },
    incidents: {
      cases: [
        { title: 'Database-scoped latency', signal: 'Channel initialization slowed by 4–18 seconds while measured SQL execution remained in the millisecond range.', diagnosis: 'Route-level stage timings and a same-code, same-data comparison on a fresh D1 database isolated the delay to one database path rather than query complexity or traffic volume.', response: 'I prepared and validated a production snapshot, ran integrity checks, retained a rollback copy, and moved traffic to the replacement database. A post-cutover Worker sample reduced channel initialization to about 80 ms.', prevention: 'Core routes retain stage-level latency instrumentation. Successful but abnormally slow requests are now recorded as operational health events, surfaced in the super-admin dashboard, and included in deduplicated external alerts. A documented, reversible database-cutover procedure remains available if database-scoped degradation recurs.' },
        { title: 'Recursive query amplification', signal: 'Production query metrics showed one reply-thread lookup accumulating 212.62M rows read as message history grew.', diagnosis: 'An audit of real reply relationships confirmed that production threads were only one level deep, making recursive ancestry resolution unnecessary.', response: 'New replies now store the top-level root_id directly at write time, and reads use bounded batches backed by primary-key and index lookups.', prevention: 'Normalizing the relationship once removes repeated traversal from every read instead of relying on incremental query tuning.' },
        { title: 'Ambiguous message delivery', signal: 'A message could persist while its HTTP or WebSocket confirmation was missed, leading a user to resend and create a duplicate.', diagnosis: 'Persistence, acknowledgement, fan-out, and link indexing were coupled closely enough that delivery ambiguity leaked into user behavior.', response: 'Stable client_message_id values, a D1 uniqueness constraint, and an authoritative HTTP acknowledgement now define the write result.', prevention: 'WebSocket fan-out and link indexing run after persistence, while retries reuse the same ID and converge on the existing record through idempotent retry and authoritative persistence.' },
      ],
      additionalHardening: 'Long-history navigation was stabilized with bounded rendering windows, anchor-based scroll correction, and geometry-aware media placeholders. Non-critical presence failures no longer block channel initialization, while cross-service deletion runs as a durable cleanup job with idempotent retries.',
    },
    impact: '6,517 messages created in one production week',
    impactLabel: 'PRODUCTION EVIDENCE',
    impactBody: 'From September 5–11, 2026 (UTC), yap. handled 6,517 created messages across public conversations and private DMs, including messages later deleted by users. Usage was event-driven rather than uniform: the median was 332 messages per day, while the average excluding the largest spike was approximately 550 per day.',
    takeaways: [
      { title: 'Realtime makes chat feel immediate, but persistence makes it trustworthy.', body: 'Once messages, DMs, reactions, live state, and moderation actions had to survive reconnects, retries, and partial failure, I stopped treating realtime delivery as the system itself. yap. taught me to separate transport from the durable record and design the interface around recoverable sync rather than perfect immediacy.' },
      { title: 'Operational visibility became part of the product, not just backend maintenance.', body: 'Once room entry, messaging, previews, authentication, and moderation were live, failures stopped being abstract engineering problems and became user experience problems. Building yap. pushed me to think in route-level health, alerting, queue triage, and reversible incident response, not just feature completion.' },
      { title: 'Moderation works better as explicit, recoverable state.', body: 'Anonymous chat created edge cases around freezing rooms, passcodes, banned words, reports, deletion, and appeals. yap. taught me that enforcement should not be hidden operator intervention. It works better when actions are legible, stateful, and reversible where appropriate for both room owners and platform operators.' },
    ],
  },
  {
    slug: 'jangoing-kitchen-intelligence', metric: 'LANGUAGE DATA · EVALUATION', category: 'Language Engineering', title: 'Jangoing',
    summary: 'A review-first language system for a Raspberry Pi–based conversational kitchen device',
    headline: 'Designing a review-first language system for a physical kitchen assistant.', role: 'Language Engineer & NLP Systems Designer\nFull-stack implementation',
    duration: 'Ongoing', client: 'Independent Product', responsibilities: 'Language ontology, annotation conventions, corpus design, relevance and intent taxonomy, entity-span policy, normalization, temporal grounding, evaluation methodology, error analysis, and product integration',
    tools: 'Python, scikit-learn, TypeScript, Next.js, Cloudflare Workers, D1, Zod', brief: 'Jangoing is an English-first language and evaluation system for a future Raspberry Pi–based kitchen assistant. It asks how ordinary conversation can be grounded in permitted household context and turned into safe, correctable actions or recommendations.',
    liveUrl: 'https://jangoing-web.vercel.app', repoUrl: 'https://github.com/jiji123526/jangoing',
    // Future hero media: demonstrate the multi-user MVP, not the annotation interface.
    coverNote: 'Product demo: authenticated household member enters a natural-language update → reviews the structured proposal → confirms it → shared inventory updates for all household members',
    process: [
      { label: 'Language problem', title: 'Conversation is not a command line', body: 'Real requests contain irrelevant phrases, aliases, multiple actions, and relative dates that must be grounded before they become data.' },
      { label: 'Safety principle', title: 'Interpretations stay reviewable', body: 'Every state-changing proposal can be confirmed or corrected, turning uncertainty into a visible product interaction.' },
      { label: 'Learning loop', title: 'Corrections become evidence', body: 'Reviewed examples feed annotation queues, frozen evaluation sets, and reproducible model comparisons instead of disappearing after the interaction.' },
    ],
    challengeIntro: 'The core challenge was not adding a chatbot to an inventory app. It was building a trustworthy bridge between ambiguous household language and durable shared state.',
    challenges: ['Everyday speech mixes relevant actions with context, shorthand, and household-specific vocabulary.', 'Dates such as “tomorrow” or “next Friday” need deterministic grounding to avoid unsafe inventory changes.', 'A model can look accurate on easy examples while failing on joint intent, entity span, or normalization.'],
    statement: 'How might we let an assistant learn household language while keeping every consequential interpretation visible and correctable?',
    solutions: [
      // Future media: use “Add two cartons of oat milk tomorrow.” and expose relevance,
      // intent, ITEM, QUANTITY, UNIT, EXPIRY_DATE, normalized values, and the joint action.
      { title: 'Language becomes a proposal, not an automatic mutation.', body: 'The system separates relevance, intent, entities, normalization, and multi-action parsing, then asks the user to review the structured result before updating household state.', mediaNote: 'Annotated utterance breakdown: raw sentence → relevance → intent → exact entity spans → canonical normalized values → complete joint action' },
      // Future media only needs to prove the operational queue workflow; it does not
      // need to show all nine queue types simultaneously.
      { title: 'The product doubles as an annotation environment.', body: 'AI-assisted candidates move through review queues into versioned JSONL exports, making user corrections useful for training and evaluation.', mediaNote: 'Production annotation workspace: purpose-specific queue selection → AI-assisted draft → relevance, action, phrase-family, entity-span, and normalized-value review → saved annotation' },
      { title: 'Household state is reconstructed from events.', body: 'Inventory and shopping projections preserve the history behind expiry, quantity, low-stock, and leftover changes instead of storing only the latest value.', mediaNote: 'System view: action events flowing into inventory and shopping projections' },
    ],
    // Future diagram: separate CURRENT (Web MVP → deterministic NLU → review →
    // Worker/D1; annotation → export → baseline) from FUTURE (Pi → ASR → trained
    // contextual NLU), then show the shared confirmation/authorization/event path.
    architecture: { title: 'A product foundation built for model iteration.', body: 'Next.js serves the household and annotation experience. A Cloudflare Worker and D1 persist household-scoped events, while shared contracts keep the web app, API, and Python evaluation tools aligned.', mediaNote: 'Current-to-future architecture: multi-user web MVP → shared structured-action contract → Worker/D1 household state and inference logging → annotation and evaluation pipeline; future Raspberry Pi + ASR replaces the input surface while reusing the same language contract, confirmation, and event path', nodes: ['Next.js', 'Contracts', 'Worker · D1', 'ML evaluation'] },
    impact: 'Built the annotation schema, review workflow, dataset pipeline, and reproducible baseline required to collect Jangoing’s first reviewed English benchmark',
    takeaways: [
      { title: 'Annotation policy is part of model architecture', body: 'Deciding what becomes an entity span and what remains contextual evidence defines the problem the model is asked to learn.' },
      { title: 'Generated and evaluation data require different trust policies', body: 'Synthetic data can expand coverage, but examples influenced by a generator cannot become independent evidence of model quality.' },
      { title: 'Text-first development makes voice errors diagnosable', body: 'Validating NLU first preserves the ability to separate future ASR failures from language-understanding failures on the Raspberry Pi.' },
      { title: 'Physical actions require visible uncertainty', body: 'A confidence score is insufficient when language can change household state; clarification, confirmation, and correction logging must travel together.' },
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
