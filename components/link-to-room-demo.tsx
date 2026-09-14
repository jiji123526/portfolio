'use client';

import { useEffect, useRef, useState } from 'react';

const room = {
  name: 'random thoughts',
  slug: '/ch/randomthoughts',
  initial: 'R',
};

type DemoState = 'invite' | 'opening' | 'room';

export function LinkToRoomDemo() {
  const [state, setState] = useState<DemoState>('invite');
  const [draft, setDraft] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const timer = useRef<number | null>(null);

  const clearTimer = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => clearTimer, []);

  const openRoom = () => {
    clearTimer();
    setState('opening');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    timer.current = window.setTimeout(
      () => {
        setState('room');
        timer.current = null;
      },
      reducedMotion ? 80 : 420,
    );
  };

  const reset = () => {
    clearTimer();
    setState('invite');
    setDraft('');
    setSentMessage('');
  };

  const sendMessage = () => {
    const message = draft.trim().slice(0, 120);
    if (!message || state !== 'room') return;
    setSentMessage(message);
    setDraft('');
  };

  return (
    <div className="link-room-demo" data-state={state}>
      {state === 'invite' ? (
        <section className="link-room-demo__invite" aria-label="Shared room invitation">
          <div className="link-room-demo__invite-top">
            <span>SHARED ROOM LINK</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
            </svg>
          </div>
          <div className="link-room-demo__url">
            <span>yapndot.com</span>
            <strong>{room.slug}</strong>
          </div>
          <div className="link-room-demo__room">
            <span className="link-room-demo__avatar" aria-hidden="true">
              {room.initial}
            </span>
            <div>
              <strong>{room.name}</strong>
              <span>Anonymous chat through a shared link</span>
            </div>
          </div>
          <p>Open the room and join instantly without signup.</p>
          <div className="link-room-demo__invite-footer">
            <span>No login, nickname, or profile required</span>
            <button type="button" onClick={openRoom}>
              Open room
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7 4 6 6-6 6" />
              </svg>
            </button>
          </div>
        </section>
      ) : (
        <section
          className="link-room-demo__phone"
          aria-label={`${room.name} anonymous chat room`}
        >
          <header className="link-room-demo__header">
            <button
              type="button"
              className="link-room-demo__back"
              aria-label="Back to room invitation"
              onClick={reset}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
            <div className="link-room-demo__identity">
              <span className="link-room-demo__avatar" aria-hidden="true">
                {room.initial}
              </span>
              <span>{room.name}</span>
            </div>
            <span className="link-room-demo__share" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 15V3m0 0L8 7m4-4 4 4M6 10v9h12v-9" />
              </svg>
            </span>
          </header>

          {state === 'opening' ? (
            <output
              className="link-room-demo__loading"
              aria-label={`Opening ${room.name}`}
            >
              <span className="link-room-demo__loading-label">
                Opening room
              </span>
              <span className="link-room-demo__skeleton" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </output>
          ) : (
            <>
              <div className="link-room-demo__messages">
                <span className="link-room-demo__joined">
                  Joined anonymously · No login required
                </span>
                <div className="link-room-demo__message-row">
                  <p>Welcome to {room.name}.</p>
                </div>
                <div className="link-room-demo__message-row">
                  <p>Glad the link worked. Say hi when you’re ready.</p>
                </div>
                {sentMessage && (
                  <div className="link-room-demo__message-row is-sent">
                    <p>{sentMessage}</p>
                  </div>
                )}
              </div>
              <span className="sr-only" aria-live="polite" aria-atomic="true">
                {sentMessage ? `Message sent: ${sentMessage}` : ''}
              </span>

              <form
                className="link-room-demo__composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <textarea
                  aria-label="Type a message"
                  placeholder="Type a message"
                  rows={1}
                  maxLength={120}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value.slice(0, 120))}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!draft.trim()}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 17V7m0 0-4 4m4-4 4 4" />
                  </svg>
                </button>
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
}
