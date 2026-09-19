export function JangoingAnnotationWorkspace() {
  return (
    <div
      aria-label="Test annotation moving from AI draft to human-reviewed data"
      className="jangoing-media-placeholder jangoing-annotation-workspace"
      role="img"
    >
      <div className="jg-annotation-toolbar">
        <span>QUEUE</span>
        <strong>Production feedback</strong>
        <small>TEST DATA</small>
      </div>

      <div className="jg-annotation-utterance">
        <span>RAW UTTERANCE</span>
        <blockquote>
          “We’re out of <mark>frozen blueberries</mark>.”
        </blockquote>
      </div>

      <div className="jg-annotation-review-grid">
        <section>
          <span>AI DRAFT</span>
          <dl>
            <div>
              <dt>Intent</dt>
              <dd>ADD_TO_SHOPPING_LIST</dd>
            </div>
            <div>
              <dt>ITEM span</dt>
              <dd>“blueberries” → blueberry</dd>
            </div>
            <div>
              <dt>Phrase family</dt>
              <dd>availability_absence</dd>
            </div>
          </dl>
        </section>
        <i aria-hidden="true">→</i>
        <section className="is-reviewed">
          <span>HUMAN REVIEWED</span>
          <dl>
            <div>
              <dt>Intent</dt>
              <dd>ADD_TO_SHOPPING_LIST</dd>
            </div>
            <div>
              <dt>ITEM span</dt>
              <dd>“frozen blueberries” → frozen_blueberry</dd>
            </div>
            <div>
              <dt>Phrase family</dt>
              <dd>availability_absence</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="jg-annotation-footer">
        <span>Draft → Reviewed</span>
        <strong>REVIEW SAVED ✓</strong>
      </div>
      <p>ANNOTATION WORKSPACE · REVIEWED TEST EXAMPLE</p>
    </div>
  );
}
