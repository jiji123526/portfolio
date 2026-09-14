'use client';

import { useState } from 'react';

const blockedMessage = 'you are such a [blocked word]';

export function ChannelOwnerControlsDemo() {
  const [passcodeEnabled, setPasscodeEnabled] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [blockedAttempt, setBlockedAttempt] = useState(false);
  const [draft, setDraft] = useState('');
  const [passcode, setPasscode] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const resetTransientState = () => {
    setBlockedAttempt(false);
    setDraft('');
    setSentMessage('');
  };

  const togglePasscode = (enabled: boolean) => {
    setPasscodeEnabled(enabled);
    if (enabled) setFrozen(false);
    resetTransientState();
  };

  const toggleFreeze = (enabled: boolean) => {
    setFrozen(enabled);
    if (enabled) setPasscodeEnabled(false);
    resetTransientState();
  };

  const toggleBlockedAttempt = () => {
    if (blockedAttempt) {
      setBlockedAttempt(false);
      setDraft('');
      return;
    }
    setPasscodeEnabled(false);
    setFrozen(false);
    setDraft(blockedMessage);
    setBlockedAttempt(true);
    setSentMessage('');
  };

  const resetDemo = () => {
    setPasscodeEnabled(false);
    setFrozen(false);
    setBlockedAttempt(false);
    setDraft('');
    setPasscode('');
    setSentMessage('');
  };

  const sendMessage = () => {
    const message = draft.trim().slice(0, 120);
    if (!message || frozen || passcodeEnabled) return;
    if (message.includes('[blocked word]')) {
      setBlockedAttempt(true);
      return;
    }
    setSentMessage(message);
    setDraft('');
    setBlockedAttempt(false);
  };

  const roomState = passcodeEnabled
    ? 'Passcode required'
    : frozen
      ? 'Chat frozen'
      : blockedAttempt
        ? 'Blocked message rejected'
        : 'Room active';

  return (
    <div className="owner-control-demo">
      <aside className="owner-control-demo__controls" aria-label="Demo controls">
        <span className="owner-control-demo__label">DEMO CONTROLS</span>
        <h3>Owner actions</h3>
        <p>Change a room rule and see the participant experience update.</p>

        <div className="owner-control-demo__state">
          <span>Current room state</span>
          <strong>{roomState}</strong>
        </div>

        <div className="owner-control-demo__toggles">
          <label
            className="owner-control-demo__toggle"
            htmlFor="owner-demo-passcode"
            aria-label="Passcode owner control"
          >
            <span>
              <strong>Passcode</strong>
              <small>Control room entry</small>
            </span>
            <input
              id="owner-demo-passcode"
              type="checkbox"
              checked={passcodeEnabled}
              onChange={(event) => togglePasscode(event.target.checked)}
            />
            <i aria-hidden="true" />
          </label>

          <label
            className="owner-control-demo__toggle"
            htmlFor="owner-demo-freeze"
            aria-label="Freeze chat owner control"
          >
            <span>
              <strong>Freeze chat</strong>
              <small>Pause conversation</small>
            </span>
            <input
              id="owner-demo-freeze"
              type="checkbox"
              checked={frozen}
              onChange={(event) => toggleFreeze(event.target.checked)}
            />
            <i aria-hidden="true" />
          </label>
        </div>

        <button
          className="owner-control-demo__blocked-trigger"
          type="button"
          onClick={toggleBlockedAttempt}
        >
          {blockedAttempt ? 'Clear blocked attempt' : 'Try blocked message'}
        </button>
        <button
          className="owner-control-demo__reset"
          type="button"
          onClick={resetDemo}
        >
          Reset demo
        </button>
      </aside>

      <section
        className="owner-control-demo__phone"
        aria-label="Channel owner control effect preview"
      >
        <header className="owner-control-demo__header">
          <span className="owner-control-demo__back" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </span>
          <div className="owner-control-demo__identity">
            <span className="owner-control-demo__avatar" aria-hidden="true">
              R
            </span>
            <span>random thoughts</span>
          </div>
          <span className="owner-control-demo__share" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 15V3m0 0L8 7m4-4 4 4M6 10v9h12v-9" />
            </svg>
          </span>
        </header>

        {passcodeEnabled ? (
          <form
            className="owner-control-demo__passcode"
            onSubmit={(event) => {
              event.preventDefault();
              if (passcode.length !== 4) return;
              setPasscodeEnabled(false);
              setPasscode('');
            }}
          >
            <span className="owner-control-demo__passcode-avatar" aria-hidden="true">
              R
            </span>
            <strong>random thoughts</strong>
            <p>This channel requires a passcode</p>
            <label>
              <span className="sr-only">Channel passcode</span>
              <input
                type="password"
                inputMode="numeric"
                placeholder="Enter passcode"
                maxLength={4}
                value={passcode}
                onChange={(event) =>
                  setPasscode(event.target.value.replace(/\D/g, '').slice(0, 4))
                }
              />
            </label>
            <button type="submit" disabled={passcode.length !== 4}>
              Enter room
            </button>
            <small>Hint: use any four digits for this walkthrough.</small>
          </form>
        ) : (
          <>
            <div className="owner-control-demo__room">
              {frozen && (
                <output className="owner-control-demo__frozen">
                  Chat is frozen <span aria-hidden="true">🧊</span>
                </output>
              )}
              <div className="owner-control-demo__messages">
                <div className="owner-control-demo__message">
                  <p>What’s everyone thinking about today?</p>
                </div>
                <div className="owner-control-demo__message is-sent">
                  <p>Mostly small ideas that won’t leave me alone.</p>
                </div>
                {sentMessage && (
                  <div className="owner-control-demo__message is-sent is-new">
                    <p>{sentMessage}</p>
                  </div>
                )}
              </div>

              {blockedAttempt && (
                <div className="owner-control-demo__blocked" role="alert">
                  <strong>Message could not be sent</strong>
                  <span>Contains a blocked word</span>
                </div>
              )}
            </div>

            <form
              className="owner-control-demo__composer"
              data-invalid={blockedAttempt ? 'true' : undefined}
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <textarea
                aria-label="Type a room message"
                placeholder={frozen ? 'Chat is frozen' : 'Type a message'}
                rows={1}
                maxLength={120}
                disabled={frozen}
                value={draft}
                onChange={(event) => {
                  setDraft(event.target.value.slice(0, 120));
                  setBlockedAttempt(false);
                }}
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
                disabled={frozen || blockedAttempt || !draft.trim()}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 17V7m0 0-4 4m4-4 4 4" />
                </svg>
              </button>
            </form>
          </>
        )}

        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {roomState}
        </span>
      </section>
    </div>
  );
}
