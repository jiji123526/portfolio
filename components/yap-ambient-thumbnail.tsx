export function YapAmbientThumbnail() {
  return (
    <div className="yap-thumbnail-phone">
      <header className="yap-thumbnail-header">
        <span aria-hidden="true">‹</span>
        <div>
          <i>D</i>
          <strong>demo room</strong>
        </div>
        <span aria-hidden="true">↗</span>
      </header>

      <div className="yap-thumbnail-room">
        <span className="yap-thumbnail-link">
          <i aria-hidden="true">↗</i>
          /ch/demo-room
        </span>

        <div className="yap-thumbnail-messages">
          <p className="yap-thumbnail-bubble is-received">The link worked.</p>
          <p className="yap-thumbnail-bubble is-sent">Welcome in.</p>
          <p className="yap-thumbnail-bubble is-received is-arrival-one">
            Anyone here?
          </p>
          <div className="yap-thumbnail-reply is-arrival-two">
            <p className="yap-thumbnail-bubble is-sent">Yep, I’m here</p>
            <span className="yap-thumbnail-reaction" aria-hidden="true">
              ♥
            </span>
          </div>
        </div>

        <span className="yap-thumbnail-private">
          <i aria-hidden="true">●</i>
          Private message
        </span>
      </div>

      <footer className="yap-thumbnail-composer">
        <span>Type a message</span>
        <i aria-hidden="true">↑</i>
      </footer>
    </div>
  );
}
