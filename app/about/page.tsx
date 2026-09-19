import type { Metadata } from 'next';
import Image from 'next/image';
import { AboutConstellation } from '@/components/about-constellation';
import { AboutExperience } from '@/components/about-experience';
import { AboutFunFacts } from '@/components/about-fun-facts';
import { AboutSocialLinks } from '@/components/about-social-links';
import { GravityStars } from '@/components/gravity-stars';
import { PortfolioDock } from '@/components/portfolio-dock';
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
          <span className="aa-about-reference__page-name">[About]</span>
          <div className="aa-about-reference__header-identity">
            <strong className="aa-about-reference__identity">
              {homeContent.name}
            </strong>
            <AboutFunFacts />
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
              I work at <strong>Amazon AGI-DS</strong>, where I help shape reliable
              language data for agentic AI. At the intersection of linguistics and
              computer science, I design language systems and full-stack products
              that turn ambiguous human input into clear, reviewable experiences.
            </p>
            <dl className="aa-about-reference__facts">
              <div>
                <dt>Seattle, WA</dt>
                <dd>SEA 106</dd>
              </div>
              <div>
                <dt>Machine Learning Data Associate</dt>
                <dd>Amazon AGI-DS</dd>
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

      <PortfolioDock
        aboutHref="/about"
        current="about"
        homeHref="/#home"
        workHref="/work"
      />
    </main>
  );
}
