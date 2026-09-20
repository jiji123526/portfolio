import styles from './TagSparkThumbnailScreen.module.css';

const settingTags = [
  { label: '캠퍼스' },
  { label: '오피스' },
  { label: '연예인', selected: true },
  { label: '여행' },
  { label: '종교' },
];

const relationshipTags = [
  { label: '소꿉친구' },
  { label: '선후배' },
  { label: '재회' },
  { label: '구원', selected: true },
];

const moodTags = [
  { label: '달달' },
  { label: '힐링', selected: true },
  { label: '피폐', excluded: true },
  { label: '풋풋' },
];

const relatedWorks = [
  { title: '온이네', author: '만타', tags: '연예인 · 재회 · 힐링' },
  {
    title: '아직도 깨어있는 새벽,',
    author: '과타쿠',
    tags: '동갑 · 연예인 · 달달 · 힐링',
  },
  { title: '산 자의 연애', author: '도꾸', tags: '연예인 · 구원 · 완결' },
];

export default function TagSparkThumbnailScreen() {
  return (
    <div
      className={styles.screen}
      aria-label="TagSpark tag selection and recommendation preview"
    >
      <section className={styles.selectorPage}>
        <MobileTopbar title="키워드 선택하기" />

        <div className={styles.search}>⌕&nbsp; 키워드 검색...</div>
        <div className={styles.mode}>
          <span className={styles.activeMode}>포함</span>
          <span>제외</span>
        </div>

        <div className={styles.tagGroups}>
          <TagGroup label="설정" tags={settingTags} />
          <TagGroup label="관계" tags={relationshipTags} />
          <TagGroup label="분위기" tags={moodTags} />
        </div>

        <div className={styles.selectionTray}>
          <div>
            <span>연예인</span>
            <span>구원</span>
            <span>힐링</span>
            <span className={styles.excludedSummary}>− 피폐</span>
          </div>
          <button type="button" tabIndex={-1}>추천작 보기</button>
        </div>
      </section>

      <section className={styles.resultsPage}>
        <MobileTopbar title="키워드 매칭 결과" />
        <div className={styles.selectedQuery}>◇&nbsp; 연예인, 구원, 힐링</div>

        <div className={styles.resultHeading}>
          <strong>완벽 매치 추천작</strong>
          <span>(1)</span>
        </div>
        <article className={styles.perfectResult}>
          <strong>Touch</strong>
          <small>하얀꿈</small>
          <p># 연예인, 구원, 힐링, 장편, 완결</p>
        </article>

        <div className={styles.relatedHeading}>이런 포타는 어떠세요?</div>
        <div className={styles.relatedList}>
          {relatedWorks.map((work) => (
            <article key={work.title}>
              <strong>{work.title}</strong>
              <small>{work.author}</small>
              <p># {work.tags}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MobileTopbar({ title }: { title: string }) {
  return (
    <header className={styles.topbar}>
      <span>‹</span>
      <i aria-hidden="true">•••</i>
      <h1>{title}</h1>
    </header>
  );
}

function TagGroup({
  label,
  tags,
}: {
  label: string;
  tags: Array<{ label: string; selected?: boolean; excluded?: boolean }>;
}) {
  return (
    <section className={styles.tagGroup}>
      <h2>{label}</h2>
      <div>
        {tags.map((tag) => (
          <span
            className={`${tag.selected ? styles.selectedTag : ''} ${tag.excluded ? styles.excludedTag : ''}`}
            key={tag.label}
          >
            {tag.selected ? '✓ ' : tag.excluded ? '⊖ ' : ''}
            {tag.label}
          </span>
        ))}
      </div>
    </section>
  );
}
