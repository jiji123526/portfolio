import type { Metadata } from 'next';
import Image from 'next/image';
import { AboutConstellation } from '@/components/about-constellation';
import { AboutExperience } from '@/components/about-experience';
import { AboutSocialLinks } from '@/components/about-social-links';
import { GravityStars } from '@/components/gravity-stars';
import { PortfolioDock } from '@/components/portfolio-dock';
import { TransitionLink } from '@/components/transition-link';
import { homeContent } from '@/lib/home-content';

export const metadata: Metadata = {
  title: "About Jiwoo | Jiwoo Jeong's Portfolio",
  description:
    'About Jiwoo Jeong, a Machine Learning Data Associate building toward language engineering through full-stack product systems.',
};

export default function AboutPage() {
  return (
    <main className="aa-about-page aa-about-reference">
      <section className="aa-about-reference__hero" aria-labelledby="about-title">
        <GravityStars />

        <header className="aa-about-reference__header">
          <TransitionLink
            aria-label="Home"
            className="aa-about-reference__mark"
            direction="back"
            href="/#home"
          >
            JJ
          </TransitionLink>
          <span>[ABOUT]</span>
          <div>
            <strong>{homeContent.name}</strong>
            <span>LISTENING · BUILDING · ITERATING</span>
          </div>
        </header>

        <div className="aa-about-reference__body">
          <div className="aa-about-reference__copy">
            <div className="aa-about-reference__handwriting">
              <Image
                alt="Hey! I'm Jiwoo. Let me introduce myself."
                height={545}
                priority
                src="/about/intro-handwriting-horizontal.png"
                width={1844}
              />
            </div>
            <h1 id="about-title" className="sr-only">
              About Jiwoo Jeong
            </h1>
            <p className="aa-about-reference__bio">
              I&apos;m a <strong>Machine Learning Data Associate</strong> building
              toward language engineering. I create reviewable language systems
              and full-stack products that turn ambiguous human input into clear,
              recoverable actions.
            </p>
            <dl className="aa-about-reference__facts">
              <div>
                <dt>Seattle, WA</dt>
                <dd>Originally from Korea</dd>
              </div>
              <div>
                <dt>Machine Learning Data Associate</dt>
                <dd>Amazon</dd>
              </div>
              <div>
                <dt>Linguistics &amp; Computer Science</dt>
                <dd>UCLA</dd>
              </div>
            </dl>
            <a className="aa-about-reference__scroll" href="#about-details">
              <Image
                alt="There's more below"
                height={1714}
                src="/about/scroll-more.png"
                width={4096}
              />
            </a>
          </div>

          <AboutConstellation />
        </div>

      </section>

      <AboutSocialLinks
        email={homeContent.links.email}
        linkedin={homeContent.links.linkedin}
        resume={homeContent.links.resume}
      />

      <AboutExperience />

      <footer className="aa-about-page__footer">
        <TransitionLink direction="back" href="/#work">
          Selected work ↗
        </TransitionLink>
        <div>
          <a href={homeContent.links.email}>Email</a>
          <a href={homeContent.links.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
        </div>
      </footer>

      <PortfolioDock
        aboutHref="/about"
        current="about"
        homeHref="/#home"
        workHref="/#work"
      />
    </main>
  );
}
