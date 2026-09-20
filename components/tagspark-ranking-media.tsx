export function TagSparkRankingMedia() {
  return (
    <figure
      className="tagspark-ranking-media magnetic"
      aria-label="TagSpark preference normalization and ranking walkthrough"
    >
      <div className="tagspark-ranking-media__canvas">
        <header className="tagspark-ranking-media__header">
          <span>PREFERENCE INPUT</span>
          <small>LIVE TRACE</small>
        </header>

        <div className="tagspark-ranking-media__preferences">
          <div>
            <span>INCLUDE</span>
            <ul>
              <li>아이돌</li>
              <li>구원</li>
              <li>힐링</li>
            </ul>
          </div>
          <div>
            <span>EXCLUDE</span>
            <ul>
              <li>피폐</li>
            </ul>
          </div>
        </div>

        <div className="tagspark-ranking-media__process">
          <section className="tagspark-ranking-media__normalization">
            <span>ALIAS NORMALIZATION</span>
            <div>
              <b>아이돌</b>
              <i aria-hidden="true">→</i>
              <strong>연예계</strong>
            </div>
          </section>

          <section className="tagspark-ranking-media__relationship">
            <span>CURATED NEIGHBOR</span>
            <div>
              <b>구원</b>
              <i aria-hidden="true" />
              <em>0.60</em>
              <i aria-hidden="true" />
              <b>종교</b>
            </div>
          </section>
        </div>

        <div className="tagspark-ranking-media__results">
          <section>
            <span>PERFECT MATCH</span>
            <strong>작품 01</strong>
            <small>연예계 · 구원 · 힐링</small>
          </section>
          <section>
            <span>RELATED</span>
            <strong>작품 02</strong>
            <small>EXACT 연예계 · CLUSTER 구원</small>
            <b>0.74</b>
          </section>
          <div className="tagspark-ranking-media__excluded">
            <span>피폐</span>
            <b>EXCLUDED BEFORE RANKING</b>
          </div>
        </div>
      </div>

      <figcaption>PREFERENCE → NORMALIZE → RANK</figcaption>
    </figure>
  );
}
