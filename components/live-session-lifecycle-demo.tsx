'use client';

import { useEffect, useRef, useState } from 'react';

type LiveState = 'normal' | 'available' | 'live' | 'ended';

const stateLabels: Record<LiveState, string> = {
  normal: 'Normal room',
  available: 'Live available',
  live: 'In live',
  ended: 'Live ended',
};

const initialDraft = 'This feels more active';

export function LiveSessionLifecycleDemo() {
  const [state, setState] = useState<LiveState>('normal');
  const [draft, setDraft] = useState(initialDraft);
  const [sentMessage, setSentMessage] = useState('');
  const [reactionVisible, setReactionVisible] = useState(false);
  const [reactionKey, setReactionKey] = useState(0);
  const reactionTimer = useRef<number | null>(null);

  const clearReactionTimer = () => {
    if (reactionTimer.current !== null) {
      window.clearTimeout(reactionTimer.current);
    }
    reactionTimer.current = null;
  };

  useEffect(() => clearReactionTimer, []);

  const clearLiveContent = () => {
    clearReactionTimer();
    setDraft(initialDraft);
    setSentMessage('');
    setReactionVisible(false);
  };

  const startLive = () => {
    clearLiveContent();
    setState('available');
  };

  const endLive = () => {
    if (state !== 'live') return;
    clearReactionTimer();
    setReactionVisible(false);
    setState('ended');
  };

  const returnToRoom = () => {
    clearLiveContent();
    setState('normal');
  };

  const sendLiveMessage = () => {
    const message = draft.trim().slice(0, 120);
    if (!message || state !== 'live') return;
    setSentMessage(message);
    setDraft('');
  };

  const broadcastReaction = () => {
    if (state !== 'live') return;
    clearReactionTimer();
    setReactionKey((current) => current + 1);
    setReactionVisible(true);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    reactionTimer.current = window.setTimeout(
      () => {
        setReactionVisible(false);
        reactionTimer.current = null;
      },
      reducedMotion ? 300 : 1300,
    );
  };

  const showNormalRoom = state !== 'live';

  return (
    <div className="live-session-demo">
      <aside
        className="live-session-demo__controls"
        aria-label="Temporary live session demo controls"
      >
        <span className="live-session-demo__label">DEMO CONTROLS</span>
        <h3>Temporary live sessions</h3>
        <p>Start a separate live moment, then end it without changing room history.</p>

        <div className="live-session-demo__state">
          <span>Current state</span>
          <strong>{stateLabels[state]}</strong>
          <small>
            {state === 'live'
              ? 'Live activity is separate from the room'
              : 'Persistent room conversation'}
          </small>
        </div>

        <button
          className="live-session-demo__start"
          type="button"
          onClick={startLive}
          disabled={state !== 'normal'}
        >
          Start live
        </button>
        <button
          className="live-session-demo__end"
          type="button"
          onClick={endLive}
          disabled={state !== 'live'}
        >
          End live
        </button>
        <button
          className="live-session-demo__reset"
          type="button"
          onClick={returnToRoom}
          disabled={state === 'normal' && !sentMessage}
        >
          Reset demo
        </button>

        <p className="live-session-demo__boundary">
          Live messages and reactions disappear when the temporary session ends.
        </p>
      </aside>

      <section
        className="live-session-demo__phone"
        aria-label={`${stateLabels[state]} preview for random thoughts`}
      >
        <header className="live-session-demo__header">
          <span className="live-session-demo__back" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </span>
          <div className="live-session-demo__identity">
            <span className="live-session-demo__avatar" aria-hidden="true">
              R
            </span>
            <span>random thoughts</span>
          </div>
          <span className="live-session-demo__share" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 15V3m0 0L8 7m4-4 4 4M6 10v9h12v-9" />
            </svg>
          </span>
        </header>

        {showNormalRoom ? (
          <>
            <div className="live-session-demo__messages">
              <div className="live-session-demo__message">
                <p>Did everyone see the update?</p>
              </div>
              <div className="live-session-demo__message is-sent">
                <p>I’ll be here for a bit.</p>
              </div>
              <div className="live-session-demo__message">
                <p>Let’s try live for a moment.</p>
              </div>
            </div>
            <div className="live-session-demo__composer is-normal">
              <span>Type a message</span>
              <i aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 17V7m0 0-4 4m4-4 4 4" />
                </svg>
              </i>
            </div>
          </>
        ) : (
          <>
            <div className="live-session-demo__banner">
              <span aria-hidden="true" />
              <div>
                <strong>LIVE · Open room moment</strong>
                <small>Live messages are separate from regular chat</small>
              </div>
            </div>

            <div className="live-session-demo__messages is-live">
              <div className="live-session-demo__message">
                <p>Live is on now.</p>
              </div>
              <div className="live-session-demo__message">
                <p>Can you hear me?</p>
              </div>
              <div className="live-session-demo__message is-sent">
                <p>Tap the reaction button.</p>
              </div>
              {sentMessage && (
                <div className="live-session-demo__message is-sent is-new">
                  <p>{sentMessage}</p>
                </div>
              )}
            </div>

            <form
              className="live-session-demo__composer is-live"
              onSubmit={(event) => {
                event.preventDefault();
                sendLiveMessage();
              }}
            >
              <button
                className="live-session-demo__reaction"
                type="button"
                aria-label="Broadcast heart reaction"
                onClick={broadcastReaction}
              >
                <span aria-hidden="true">♥</span>
              </button>
              <textarea
                aria-label="Type a live message"
                rows={1}
                maxLength={120}
                placeholder="Live message"
                value={draft}
                onChange={(event) => setDraft(event.target.value.slice(0, 120))}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    sendLiveMessage();
                  }
                }}
              />
              <button
                className="live-session-demo__send"
                type="submit"
                aria-label="Send live message"
                disabled={!draft.trim()}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 17V7m0 0-4 4m4-4 4 4" />
                </svg>
              </button>
            </form>

            {reactionVisible && (
              <output
                className="live-session-demo__broadcast"
                aria-label="Heart reaction broadcast"
                key={reactionKey}
              >
                <span>♥</span>
                <span>♥</span>
                <span>♥</span>
              </output>
            )}
          </>
        )}

        {state === 'available' && (
          <div className="live-session-demo__overlay">
            <dialog
              open
              className="live-session-demo__modal"
              aria-labelledby="live-session-available-title"
            >
              <span className="live-session-demo__modal-icon is-live" aria-hidden="true">
                <i />
              </span>
              <h4 id="live-session-available-title">Live has started</h4>
              <strong>Open room moment</strong>
              <p>Join the temporary live session. Its messages stay separate from regular chat.</p>
              <button type="button" onClick={() => setState('live')}>
                Join live
              </button>
              <button
                className="live-session-demo__modal-secondary"
                type="button"
                onClick={returnToRoom}
              >
                Not now
              </button>
            </dialog>
          </div>
        )}

        {state === 'ended' && (
          <div className="live-session-demo__overlay">
            <dialog
              open
              className="live-session-demo__modal"
              aria-labelledby="live-session-ended-title"
            >
              <span className="live-session-demo__modal-icon is-ended" aria-hidden="true">
                <i />
              </span>
              <h4 id="live-session-ended-title">Live session ended</h4>
              <p>Live messages and reactions were removed. The room conversation is unchanged.</p>
              <button type="button" onClick={returnToRoom}>
                Return to room
              </button>
            </dialog>
          </div>
        )}

        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {state === 'live' && reactionVisible
            ? 'Heart reaction broadcast in the live session.'
            : stateLabels[state]}
        </span>
      </section>
    </div>
  );
}
