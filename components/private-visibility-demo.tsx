'use client';

import { useEffect, useRef, useState } from 'react';

type ViewerRole = 'guest' | 'owner' | 'other';

const roles: { id: ViewerRole; label: string }[] = [
  { id: 'guest', label: 'Guest' },
  { id: 'owner', label: 'Owner' },
  { id: 'other', label: 'Other visitor' },
];

const roleLabels: Record<ViewerRole, string> = {
  guest: 'Guest',
  owner: 'Owner',
  other: 'Other visitor',
};

export function PrivateVisibilityDemo() {
  const [role, setRole] = useState<ViewerRole>('guest');
  const [privateMessageSent, setPrivateMessageSent] = useState(false);
  const [ownerReplied, setOwnerReplied] = useState(false);
  const replyTimer = useRef<number | null>(null);

  const clearReplyTimer = () => {
    if (replyTimer.current !== null) window.clearTimeout(replyTimer.current);
    replyTimer.current = null;
  };

  useEffect(() => clearReplyTimer, []);

  const sendPrivateMessage = () => {
    if (privateMessageSent) {
      setRole('guest');
      return;
    }

    clearReplyTimer();
    setRole('guest');
    setPrivateMessageSent(true);
    setOwnerReplied(false);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    replyTimer.current = window.setTimeout(
      () => {
        setOwnerReplied(true);
        replyTimer.current = null;
      },
      reducedMotion ? 200 : 700,
    );
  };

  const resetDemo = () => {
    clearReplyTimer();
    setRole('guest');
    setPrivateMessageSent(false);
    setOwnerReplied(false);
  };

  const privateMessagesVisible =
    privateMessageSent && (role === 'guest' || role === 'owner');
  const stateDescription = privateMessagesVisible
    ? `${roleLabels[role]} can see the private messages within the room timeline.`
    : `${roleLabels[role]} is viewing public room messages only.`;

  return (
    <div className="private-visibility-demo">
      <aside
        className="private-visibility-demo__controls"
        aria-label="Private visibility demo controls"
      >
        <span className="private-visibility-demo__label">DEMO CONTROLS</span>
        <h3>Private visibility boundaries</h3>
        <p>Switch perspectives to see exactly who can read the thread.</p>

        <fieldset className="private-visibility-demo__roles">
          <legend className="sr-only">View the room as</legend>
          {roles.map((item) => (
            <button
              type="button"
              aria-pressed={role === item.id}
              className={role === item.id ? 'is-active' : undefined}
              key={item.id}
              onClick={() => setRole(item.id)}
            >
              {item.label}
            </button>
          ))}
        </fieldset>

        <div className="private-visibility-demo__state">
          <span>Current view</span>
          <strong>{roleLabels[role]}</strong>
          <small>
            {privateMessagesVisible
              ? 'Room timeline · private messages visible'
              : 'Public room messages only'}
          </small>
        </div>

        <button
          className="private-visibility-demo__send"
          type="button"
          onClick={sendPrivateMessage}
        >
          {privateMessageSent ? 'View private message' : 'Send private message'}
        </button>
        <button
          className="private-visibility-demo__reset"
          type="button"
          onClick={resetDemo}
          disabled={!privateMessageSent && role === 'guest'}
        >
          Reset demo
        </button>

        <p className="private-visibility-demo__boundary">
          Guest and Owner share one thread. Other visitors never receive it.
        </p>
      </aside>

      <section
        className="private-visibility-demo__phone"
        aria-label={`${roleLabels[role]} view of random thoughts`}
      >
        <header className="private-visibility-demo__header">
          <span className="private-visibility-demo__back" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </span>
          <div className="private-visibility-demo__identity">
            <span className="private-visibility-demo__avatar" aria-hidden="true">
              R
            </span>
            <span>random thoughts</span>
          </div>
          <span className="private-visibility-demo__share" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 15V3m0 0L8 7m4-4 4 4M6 10v9h12v-9" />
            </svg>
          </span>
        </header>

        <div
          className="private-visibility-demo__content"
          key={`${role}-${privateMessagesVisible ? 'private-visible' : 'public-only'}`}
        >
          <div className="private-visibility-demo__messages">
            <div className="private-visibility-demo__message is-other is-public">
              <p>Anyone around?</p>
            </div>
            <div className="private-visibility-demo__message is-own is-public">
              <p>The background looks great today.</p>
            </div>
            <div className="private-visibility-demo__message is-other is-public">
              <p>I’ll be back in 10.</p>
            </div>

            {privateMessagesVisible && (
              <>
                <div
                  className={`private-visibility-demo__message ${
                    role === 'guest' ? 'is-own' : 'is-other'
                  }`}
                >
                  <p>Can I ask something privately?</p>
                </div>

                {ownerReplied ? (
                  <div
                    className={`private-visibility-demo__reply is-new ${
                      role === 'guest'
                        ? 'is-right is-other-message'
                        : 'is-left is-own-message'
                    }`}
                  >
                    <span
                      className="private-visibility-demo__reply-arrow"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20">
                        <path d="M15 4v3c0 4.4-3 7-7.5 7H4m4-4-4 4 4 4" />
                      </svg>
                    </span>
                    <div className="private-visibility-demo__reply-body">
                      <p>Yes. Only you and I can see this thread.</p>
                    </div>
                  </div>
                ) : (
                  <output
                    className={`private-visibility-demo__replying ${
                      role === 'guest' ? 'is-right' : 'is-left'
                    }`}
                  >
                    Owner is replying
                    <span aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  </output>
                )}
              </>
            )}
          </div>
        </div>

        <div className="private-visibility-demo__composer">
          <span>Type a message</span>
          <i aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 17V7m0 0-4 4m4-4 4 4" />
            </svg>
          </i>
        </div>

        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {ownerReplied && privateMessagesVisible
            ? `${stateDescription} Owner replied: Yes. Only you and I can see this thread.`
            : stateDescription}
        </span>
      </section>
    </div>
  );
}
