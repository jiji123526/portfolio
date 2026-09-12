import Link from 'next/link';
import { projects } from '@/lib/project-data';
import { ExternalArrow } from '@/components/external-arrow';
import { MotionEffects } from './motion-effects';

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
          <p>AI product designer &amp; builder based in Seattle, WA</p>
        </header>
        <div className="intro-grid">
          <div className="portrait-placeholder media-placeholder" aria-label="Portrait artwork placeholder">
            <div className="portrait-mark">JJ</div><span>Portrait / illustration</span>
          </div>
          <div className="intro-copy">
            <h1>People are <strong>complicated.</strong> Products <strong>shouldn’t be.</strong></h1>
            <p>Currently a Machine Learning Data Associate at Amazon, I work across language data, interaction design, and full-stack engineering.</p>
            <nav className="text-links" aria-label="Profile links">
              <a href="https://github.com/jiji123526" target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
              <a href="https://www.linkedin.com/in/jiwoo-jeong-9351962b1/" target="_blank" rel="noreferrer">LinkedIn <ExternalArrow /></a>
              <a href="mailto:jiwoo315@ucla.edu">Email <ExternalArrow /></a>
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
            <div className="project-meta"><span className="metric-badge">IN DEVELOPMENT · FOOD DECISIONS</span></div>
            <div className="project-heading"><div><h2>eathis</h2><p>Reducing the daily decision load across eating out, cooking, and leftovers</p></div><ArrowCircle /></div>
            <div className="project-art soon-art"><span>COMING SOON</span></div>
          </article>
        </div>
      </section>

      <footer className="footer shell" id="resume">
        <nav className="text-links" aria-label="Footer links"><a href="mailto:jiwoo315@ucla.edu">Contact me</a><a href="https://github.com/jiji123526" target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a></nav>
        <p>Copyright © 2026 Jiwoo Jeong</p>
      </footer>
    </main>
  );
}
