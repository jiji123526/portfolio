import Link from 'next/link';
import { projects } from '@/lib/project-data';
import { ExternalArrow } from '@/components/external-arrow';
import { TransitionLink } from '@/components/transition-link';
import { TunerIllustration } from '@/components/tuner-illustration';
import { YapAmbientThumbnail } from '@/components/yap-ambient-thumbnail';
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
          <p>Language Engineer &amp; AI Product Builder</p>
          <p>ML Data Associate at Amazon · Seattle, WA</p>
        </header>
        <div className="intro-grid">
          <div className="portrait-placeholder tuner-hero">
            <TunerIllustration src="/tuner-hero.jpg" />
          </div>
          <div className="intro-copy">
            <h1><strong>People</strong> are complicated. Products <strong>shouldn’t be.</strong></h1>
            <p>I design language systems that turn noisy human signals into clear, reviewable actions.</p>
            <nav className="text-links" aria-label="Profile links">
              <a href="https://github.com/jiji123526" target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
              <a href="https://www.linkedin.com/in/jiwoo-jeong-9351962b1/" target="_blank" rel="noreferrer">LinkedIn <ExternalArrow /></a>
              <a href="mailto:jiwoo315@ucla.edu">Email <ExternalArrow /></a>
            </nav>
          </div>
        </div>
      </section>

      <section className="projects shell" aria-labelledby="selected-projects">
        <div className="section-label reveal"><p className="eyebrow" id="selected-projects">SELECTED LANGUAGE &amp; AI SYSTEMS</p><span /></div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <TransitionLink className={`project-card tone-${index + 1} reveal`} href={`/work/${project.slug}`} key={project.slug} direction="forward">
              <div className="project-meta"><span className="metric-badge">{project.metric}</span><span className="sr-only">{project.category}</span></div>
              <div className="project-heading"><div><h2>{project.title}</h2><p>{project.summary}</p></div><ArrowCircle /></div>
              <div
                className={`project-art ${project.slug === 'yap-anonymous-chat' ? 'yap-thumbnail-art' : ''}`}
                aria-hidden="true"
              >
                {project.slug === 'yap-anonymous-chat' ? (
                  <YapAmbientThumbnail />
                ) : (
                  <div className="art-window"><span /><span /><span /></div>
                )}
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>

      <section className="experiments shell" aria-labelledby="other-experiments">
        <div className="section-label reveal"><p className="eyebrow" id="other-experiments">OTHER EXPERIMENTS</p><span /></div>
        <a className="experiment-row reveal" href="https://github.com/jiji123526/eathis" target="_blank" rel="noreferrer">
          <span>DECISION SUPPORT · IN DEVELOPMENT</span>
          <div><h2>eathis</h2><p>Reducing the daily decision load across eating out, cooking, and leftovers</p></div>
          <ExternalArrow />
        </a>
      </section>

      <footer className="footer shell" id="resume">
        <nav className="text-links" aria-label="Footer links"><a href="mailto:jiwoo315@ucla.edu">Contact me</a><a href="https://github.com/jiji123526" target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a></nav>
        <p>Copyright © 2026 Jiwoo Jeong</p>
      </footer>
    </main>
  );
}
