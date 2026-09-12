import Link from 'next/link';
import { projects } from '@/lib/project-data';
import { MotionEffects } from './motion-effects';

const Arrow = () => <span aria-hidden="true">&#8599;</span>;
const ArrowCircle = () => (
  <span className="round-arrow magnetic" aria-hidden="true">
    <svg viewBox="0 0 10 18"><path d="M1 1l8 8-8 8" /></svg>
  </span>
);

export default function Home() {
  return (
    <main>
      <MotionEffects />
      <section className="home-hero shell">
        <header className="identity">
          <Link href="/" className="wordmark" aria-label="Portfolio home">Jiwoo Jeong <span aria-hidden="true">*</span></Link>
          <p>Product designer based in Seattle, WA</p>
        </header>
        <div className="intro-grid">
          <div className="portrait-placeholder media-placeholder" aria-label="Portrait artwork placeholder">
            <div className="portrait-mark">JJ</div><span>Portrait / illustration</span>
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
        <div className="section-label reveal"><p className="eyebrow" id="selected-projects">SELECTED PROJECTS</p><span /></div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Link className={`project-card tone-${index + 1} reveal`} href={`/work/${project.slug}`} key={project.slug}>
              <div className="project-meta"><span className="metric-badge">{project.metric}</span><span className="sr-only">{project.category}</span></div>
              <div className="project-heading"><div><h2>{project.title}</h2><p>{project.summary}</p></div><ArrowCircle /></div>
              <div className="project-art" aria-hidden="true"><div className="art-window"><span /><span /><span /></div></div>
            </Link>
          ))}
          <article className="project-card coming-soon reveal" aria-label="Coming soon project">
            <div className="project-meta"><span className="metric-badge">Case Study · Rapid Prototyping</span></div>
            <div className="project-heading"><div><h2>Designing with AI</h2><p>Reimagining how creative teams prioritize their work</p></div><ArrowCircle /></div>
            <div className="project-art soon-art"><span>COMING SOON</span></div>
          </article>
        </div>
      </section>

      <footer className="footer shell" id="resume">
        <nav className="text-links" aria-label="Footer links"><a href="mailto:hello@example.com">Contact me</a><a href="#resume">Resume <Arrow /></a></nav>
        <p>Copyright © 2026 Jiwoo Jeong</p>
      </footer>
    </main>
  );
}
