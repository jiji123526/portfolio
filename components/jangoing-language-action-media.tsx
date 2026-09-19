export function JangoingLanguageActionMedia() {
  return (
    <div
      aria-label="Jangoing request-to-reviewed-action flow"
      className="jangoing-hero-placeholder jg-action-media magnetic"
      role="img"
    >
      <div className="jg-action-media__flow" aria-hidden="true">
        <section className="jg-action-media__request">
          <div className="jg-action-media__heading">
            <span>USER REQUEST</span>
            <i className="jg-action-media__mic" />
          </div>
          <blockquote>“We&apos;re out of oat milk.”</blockquote>
        </section>

        <span className="jg-action-media__connector" />

        <section className="jg-action-media__context">
          <div className="jg-action-media__heading">
            <span>HOUSEHOLD CONTEXT</span>
            <b>FOUND</b>
          </div>
          <strong>Oat Milk</strong>
          <div className="jg-action-media__pills">
            <span>0 remaining</span>
            <span>Fridge</span>
            <span>Shared kitchen</span>
            <span>Member request</span>
          </div>
        </section>

        <span className="jg-action-media__connector" />

        <div className="jg-action-media__outcome">
          <section className="jg-action-media__proposal">
            <div className="jg-action-media__heading">
              <span>PROPOSED ACTION</span>
              <b>ADD_TO_SHOPPING_LIST</b>
            </div>
            <dl>
              <div>
                <dt>ITEM</dt>
                <dd>oat_milk</dd>
              </div>
              <div>
                <dt>QUANTITY</dt>
                <dd>1</dd>
              </div>
            </dl>
          </section>

          <section className="jg-action-media__updated">
            <span className="jg-action-media__check">✓</span>
            <div>
              <small>SHOPPING LIST UPDATED</small>
              <strong>Oat Milk</strong>
              <p>Added just now</p>
            </div>
          </section>
        </div>

        <span className="jg-action-media__connector" />

        <section className="jg-action-media__review">
          <p>Review before updating the shared kitchen.</p>
          <div>
            <button type="button" tabIndex={-1}>Edit</button>
            <button className="is-confirm" type="button" tabIndex={-1}>
              Confirm
            </button>
          </div>
        </section>
      </div>

      <p>REQUEST → CONTEXT → REVIEW → SHARED STATE</p>
    </div>
  );
}
