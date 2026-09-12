import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/project-data';

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <main className="case-study">
      <nav className="case-nav shell" aria-label="Project navigation"><Link href="/">Your Name *</Link><Link href="/">Selected work</Link></nav>
      <header className="case-hero shell">
        <span className="metric-pill">{project.metric}</span><h1>{project.headline}</h1>
        <div className="case-facts">
          <dl><div><dt>ROLE</dt><dd>{project.role}</dd></div><div><dt>DURATION</dt><dd>{project.duration}</dd></div><div><dt>CLIENT</dt><dd>{project.client}</dd></div></dl>
          <dl><div><dt>RESPONSIBILITIES</dt><dd>{project.responsibilities}</dd></div><div><dt>TOOLS</dt><dd>{project.tools}</dd></div></dl>
        </div>
      </header>
      <div className={`case-cover tone-${index + 1}`} aria-label="Project media placeholder"><div className="cover-interface"><div className="cover-sidebar" /><div className="cover-content"><span /><span /><span /><span /></div></div></div>

      <section className="brief shell case-section"><p className="eyebrow">PROJECT BRIEF</p><h2>{project.brief}</h2><p className="caption">The brief was narrowed by defining the audience, context, and measurable outcome.</p></section>

      <section className="process-section shell case-section">
        <p className="eyebrow">NAVIGATING AMBIGUITY</p><h2>I started by answering <strong>who</strong> and <strong>why</strong>—the unknowns that shaped our research direction.</h2>
        <div className="insight-grid">
          {['Literature review', 'Stakeholder interviews', 'Concept testing'].map((label, i) => <article key={label}><span>{label}</span><strong>{['A timely shift', 'A familiar behavior', 'A complex system'][i]}</strong><p>{['The landscape was changing toward more human-centered practices.', 'Existing workflows revealed an easier path for adoption.', 'Real-world constraints gave the concept a meaningful proving ground.'][i]}</p></article>)}
        </div>
      </section>

      <section className="challenge-block"><div className="shell case-section"><p className="eyebrow">PAIN POINTS</p><h2>Challenges people face today</h2><p className="section-note">Based on interviews, surveys, and workflow observation</p><div className="challenge-list">{project.challenges.map((challenge, i) => <article key={challenge}><span>Challenge {i + 1}</span><p>{challenge}</p></article>)}</div></div></section>

      <section className="statement case-section shell"><p className="eyebrow">REFRAMED PROBLEM STATEMENT</p><h2>How might we make a complex choice feel informed, inclusive, and actionable?</h2></section>

      <section className="solutions shell case-section"><p className="eyebrow">SOLUTION</p>{project.solutions.map((solution, i) => <article className="solution-row" key={solution.title}><div><span>0{i + 1}</span><h2>{solution.title}</h2><p>{solution.body}</p></div><div className={`solution-visual tone-${((index + i) % 3) + 1}`} aria-label="Solution media placeholder"><div className="mini-ui"><span /><span /><span /></div></div></article>)}</section>

      <section className="impact-block"><div className="shell impact-grid"><div><p className="eyebrow">IMPACT</p><h2>{project.impact}</h2></div><div><p className="eyebrow">TAKEAWAY</p><p>Progress came from making uncertainty visible, testing early, and giving every stakeholder a clear role in the process.</p></div></div></section>
      <section className="next-project shell"><Link href="/">Home</Link><Link href={`/work/${nextProject.slug}`}>Next project <span aria-hidden="true">&#8594;</span></Link></section>
      <footer className="footer shell"><nav className="text-links"><a href="mailto:hello@example.com">Contact me</a><Link href="/">Resume &#8599;</Link></nav><p>Copyright © 2026 Your Name</p></footer>
    </main>
  );
}
