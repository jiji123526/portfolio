import type { Metadata } from 'next';
import { PortfolioDock } from '@/components/portfolio-dock';
import { homeContent } from '@/lib/home-content';
import styles from './work-index.module.css';

export const metadata: Metadata = {
  title: "Selected Work | Jiwoo Jeong's Portfolio",
  description: 'Selected work by Jiwoo Jeong.',
};

const selectedProjects = ['01', '02', '03'];
const otherProjects = ['04', '05', '06', '07'];

function SmallLink({ index }: { index: string }) {
  return <a href={`#project-${index}`}><i aria-hidden="true" /><span>PROJECT {index}</span></a>;
}

function ProjectCopy({ index }: { index: string }) {
  return (
    <div className={styles.projectCopy}>
      <div className={styles.projectTitle}>
        <span className={styles.projectMark}>{index}</span>
        <div className={styles.placeholderTitle} aria-hidden="true" />
      </div>
      <div className={styles.tagRow} aria-hidden="true"><span /><span /><span /></div>
      <div className={styles.projectDetails} aria-hidden="true">
        <div><span /><span /><span /></div>
        <div><span /><span /><span /></div>
      </div>
    </div>
  );
}

function MediaRow({ variant = 0 }: { variant?: number }) {
  return (
    <div className={`${styles.mediaRow} ${styles[`mediaVariant${variant}`]}`}>
      {[0, 1, 2].map((item) => (
        <div className={styles.devicePlaceholder} aria-hidden="true" key={item}>
          <i /><span /><span /><span />
        </div>
      ))}
    </div>
  );
}

export default function WorkIndexPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="work-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroTopline}>
          <span className={styles.signature}>✦</span>
          <span>[WORK]</span>
          <div><strong>{homeContent.name}</strong><span>SELECTED PROJECTS</span></div>
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 id="work-title">WORK</h1>
            <p><span className={styles.copyLine} /><span className={styles.copyLine} /><span className={styles.copyLineShort} /></p>
            <div className={styles.linkGroup}>
              <header><span>[SELECTED PROJECTS]</span><small>QUICK LINKS</small></header>
              <nav aria-label="Selected projects">{selectedProjects.map((index) => <SmallLink index={index} key={index} />)}</nav>
            </div>
            <div className={styles.linkGroup}>
              <header><span>[OTHER WORK]</span><small>CHOSEN PROJECTS</small></header>
              <nav aria-label="Other projects">{otherProjects.map((index) => <SmallLink index={index} key={index} />)}</nav>
            </div>
            <a className={styles.scrollLink} href="#selected-projects"><span>[SCROLL]</span><i aria-hidden="true" /></a>
          </div>
          <div className={styles.heroVisual} aria-hidden="true"><div className={styles.ruler} /><div className={styles.phone} /></div>
        </div>
      </section>

      <section className={styles.workCanvas} id="selected-projects">
        <div className={styles.workColumn}>
          <nav className={styles.sectionTabs} aria-label="Selected project placeholders">
            <span>[SELECTED PROJECTS]</span>
            <div>{selectedProjects.map((index) => <a href={`#project-${index}`} key={index}>PROJECT {index}</a>)}</div>
          </nav>
          <div className={styles.rule} />
          {selectedProjects.map((index, projectIndex) => (
            <article className={styles.selectedProject} id={`project-${index}`} key={index}>
              <ProjectCopy index={index} />
              <MediaRow variant={projectIndex % 2} />
              <MediaRow variant={(projectIndex + 1) % 2} />
            </article>
          ))}
          <nav className={`${styles.sectionTabs} ${styles.otherTabs}`} aria-label="Other project placeholders">
            <span>[OTHER PROJECTS]</span>
            <div>{otherProjects.map((index) => <a href={`#project-${index}`} key={index}>PROJECT {index}</a>)}</div>
          </nav>
          {otherProjects.map((index, projectIndex) => (
            <article className={styles.otherProject} id={`project-${index}`} key={index}>
              <ProjectCopy index={index} />
              <div className={`${styles.otherMedia} ${styles[`otherMedia${projectIndex % 2}`]}`} aria-hidden="true"><div /></div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}><span>{homeContent.name}</span><span>[WORK]</span></footer>
      <div className={styles.socialLinks}>
        <a href={homeContent.links.email}>Email</a>
        {homeContent.links.resume ? <a href={homeContent.links.resume} rel="noreferrer" target="_blank">Resume</a> : null}
        <a href={homeContent.links.linkedin} rel="noreferrer" target="_blank">LinkedIn</a>
      </div>
      <PortfolioDock current="work" homeHref="/" workHref="/work" aboutHref="/about" />
    </main>
  );
}
