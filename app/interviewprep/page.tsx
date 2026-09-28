import type { Metadata } from 'next';
import styles from './interviewprep.module.css';

export const metadata: Metadata = {
  title: "STAR Story Bank | Jiwoo Jeong",
  description: 'Interactive STAR story bank for interview preparation.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InterviewPrepPage() {
  return (
    <main className={styles.page}>
      <iframe
        className={styles.frame}
        sandbox="allow-scripts"
        src="/interviewprep/story-bank.html"
        title="STAR Story Bank"
      />
    </main>
  );
}
