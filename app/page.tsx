import Link from 'next/link';
import { projects } from '@/lib/project-data';

const Arrow = () => <span aria-hidden="true">&#8599;</span>;

export default function Home() {
  return (
    <main>
      <section className="home-hero shell">
        <header className="identity">
          <Link href="/" className="wordmark" aria-label="Portfolio home">Your Name <span aria-hidden="true">*</span></Link>
          <p>Product designer based in Your City</p>
        </header>
        <div className="intro-grid">
          <div className="portrait-placeholder media-placeholder" aria-label="Portrait artwork placeholder">
            <div className="portrait-mark">YN</div><span>Portrait / illustration</span>
          </div>
          <div className="intro-copy">
            <h1>Like a great editor, I bring together the <strong>right ideas</strong> at the <strong>right time.</strong></h1>
            <p>I apply strategic design thinking to create clear, scalable products grounded in thoughtful research.</p>
            <nav className="text-links" aria-label="Profile links">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
              <a href="#resume">Resume <Arrow /></a>
            </nav>
          </div>
        </div>
      </section>

      <section className="projects shell" aria-labelledby="selected-projects">
        <p className="eyebrow" id="selected-projects">SELECTED PROJECTS</p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Link className={`project-card tone-${index + 1}`} href={`/work/${project.slug}`} key={project.slug}>
              <div className="project-meta"><span>{project.metric}</span><span>{project.category}</span></div>
              <div className="project-heading"><div><h2>{project.title}</h2><p>{project.summary}</p></div><span className="round-arrow" aria-hidden="true">&#8594;</span></div>
              <div className="project-art" aria-hidden="true"><div className="art-window"><span /><span /><span /></div></div>
            </Link>
          ))}
          <article className="project-card coming-soon" aria-label="Coming soon project">
            <div className="project-meta"><span>Case Study</span><span>Rapid Prototyping</span></div>
            <div className="project-heading"><div><h2>Designing with AI</h2><p>Reimagining how creative teams prioritize their work</p></div><span className="round-arrow muted" aria-hidden="true">&#8594;</span></div>
            <div className="project-art soon-art"><span>COMING SOON</span></div>
          </article>
        </div>
      </section>

      <footer className="footer shell" id="resume">
        <nav className="text-links" aria-label="Footer links"><a href="mailto:hello@example.com">Contact me</a><a href="#resume">Resume <Arrow /></a></nav>
        <p>Copyright © 2026 Your Name</p>
      </footer>
    </main>
  );
}
