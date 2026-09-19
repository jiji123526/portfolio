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

function CopyPlaceholder() {
  return (
    <div className={styles.copyPlaceholder} aria-label="Project copy placeholder">
      <span className={styles.lineLong} />
      <span className={styles.lineShort} />
      <span className={styles.lineMedium} />
    </div>
  );
}

export default function WorkIndexPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="work-index-title">
        <div className={styles.noise} aria-hidden="true" />
        <header className={styles.heroHeader}>
          <h1 id="work-index-title">WORK</h1>
          <CopyPlaceholder />
        </header>

        <div className={styles.quickLinks}>
          <div>
            <span>[SELECTED PROJECTS]</span>
            <small>QUICK LINKS</small>
          </div>
          <nav aria-label="Selected project placeholders">
            {selectedProjects.map((project) => (
              <a href={`#selected-${project}`} key={project}>
                <i aria-hidden="true" />
                <span>PROJECT {project}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.quickLinks}>
          <div>
            <span>[OTHER WORK]</span>
            <small>CHOSEN PROJECTS</small>
          </div>
          <nav aria-label="Other project placeholders">
            {otherProjects.map((project) => (
              <a href={`#other-${project}`} key={project}>
                <i aria-hidden="true" />
                <span>PROJECT {project}</span>
              </a>
            ))}
          </nav>
        </div>

        <a className={styles.scrollCue} href="#selected-01">
          <span>[SCROLL]</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className={styles.selected} aria-label="Selected work placeholders">
        {selectedProjects.map((project, index) => (
          <article
            className={`${styles.project} ${index % 2 ? styles.projectReverse : ''}`}
            id={`selected-${project}`}
            key={project}
          >
            <div className={styles.projectCopy}>
              <span className={styles.projectNumber}>{project}</span>
              <div className={styles.titlePlaceholder} aria-hidden="true" />
              <div className={styles.metaRow} aria-hidden="true">
                <span />
                <span />
              </div>
              <CopyPlaceholder />
              <div className={styles.rolePlaceholder} aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
            <div className={styles.mediaPlaceholder} aria-label="Project media placeholder">
              <div className={styles.mediaFrame}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.other} aria-labelledby="other-work-title">
        <header>
          <span>[OTHER PROJECTS]</span>
          <h2 id="other-work-title">SELECTED ARCHIVE</h2>
        </header>
        <div className={styles.otherGrid}>
          {otherProjects.map((project) => (
            <article id={`other-${project}`} key={project}>
              <div className={styles.otherMedia} aria-label="Project image placeholder" />
              <div className={styles.otherCopy}>
                <span>{project}</span>
                <div className={styles.otherTitle} aria-hidden="true" />
                <CopyPlaceholder />
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>JIWOO JEONG</span>
        <span>[WORK]</span>
      </footer>

      <div className={styles.socialLinks}>
        <a href={homeContent.links.email}>Email</a>
        {homeContent.links.resume ? (
          <a href={homeContent.links.resume} rel="noreferrer" target="_blank">
            Resume
          </a>
        ) : null}
        <a href={homeContent.links.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
      </div>

      <PortfolioDock
        aboutHref="/about"
        current="work"
        homeHref="/"
        workHref="/work"
      />
    </main>
  );
}
