'use client';

import { useEffect, useRef, useState } from 'react';

const initialDraft = 'Hi! I joined from the link.';
const initialReply = 'Hey! you made it. No account needed.';
const incomingReplies = [
  'Welcome in! glad you found the link.',
  'Same here. I joined a minute ago.',
  'That’s it! the conversation has started.',
];

type DemoStatus = 'idle' | 'active' | 'complete';

export function YapHeroDemo() {
  const [draft, setDraft] = useState(initialDraft);
  const [sentMessage, setSentMessage] = useState('');
  const [status, setStatus] = useState<DemoStatus>('idle');
  const [isTyping, setIsTyping] = useState(false);
  const [visibleReplyCount, setVisibleReplyCount] = useState(0);
  const [incomingAnnouncement, setIncomingAnnouncement] = useState('');
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const sendMessage = () => {
    const message = draft.trim().slice(0, 120);
    if (!message || status !== 'idle') return;

    clearTimers();
    setSentMessage(message);
    setDraft('');
    setStatus('active');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      timers.current.push(window.setTimeout(() => {
        setVisibleReplyCount(incomingReplies.length);
        setIncomingAnnouncement(incomingReplies.join(' '));
        setStatus('complete');
      }, 200));
      return;
    }

    const queueReply = (typingAt: number, replyAt: number, replyIndex: number) => {
      timers.current.push(window.setTimeout(() => {
        setIsTyping(true);
        setIncomingAnnouncement(replyIndex === 0 ? 'Someone is typing.' : 'Another person is typing.');
      }, typingAt));
      timers.current.push(window.setTimeout(() => {
        setIsTyping(false);
        setVisibleReplyCount(replyIndex + 1);
        setIncomingAnnouncement(incomingReplies[replyIndex]);
        if (replyIndex === incomingReplies.length - 1) setStatus('complete');
      }, replyAt));
    };

    queueReply(400, 1100, 0);
    queueReply(1400, 2100, 1);
    queueReply(2400, 3200, 2);
  };

  const replay = () => {
    clearTimers();
    setDraft(initialDraft);
    setSentMessage('');
    setVisibleReplyCount(0);
    setIsTyping(false);
    setIncomingAnnouncement('');
    setStatus('idle');
  };

  return (
    <div className="yap-hero-stage reveal">
      <div className="yap-demo-wrap">
        <div className="yap-hero-stage-copy">
          <span>ANONYMOUS ENTRY, IN ONE STEP</span>
          <h2>Open a shared room, enter without an account, and start the conversation.</h2>
          <p>Your first message is ready.<br />Send it to see the room respond.</p>
        </div>

        <div className="yap-demo-column">
          <div className="yap-demo">
            <header className="yap-demo__header">
              <span className="yap-demo__header-action yap-demo__back" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7" /></svg>
              </span>
              <div className="yap-demo__identity">
                <span className="yap-demo__avatar" aria-hidden="true">y.</span>
                <span>yap. demo</span>
              </div>
              <div className="yap-demo__header-actions" aria-hidden="true">
                <span className="yap-demo__header-action">
                  <svg viewBox="0 0 24 24"><path d="M12 15V3m0 0L8 7m4-4 4 4M6 10v9h12v-9" /></svg>
                </span>
                <span className="yap-demo__header-action">
                  <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.25" /><circle cx="12" cy="12" r="1.25" /><circle cx="19" cy="12" r="1.25" /></svg>
                </span>
              </div>
            </header>

            <div className="yap-demo__messages">
              <div className="yap-demo__row yap-demo__row--received">
                <div className="yap-demo__bubble yap-demo__bubble--received">{initialReply}</div>
              </div>

              {sentMessage && (
                <div className="yap-demo__row yap-demo__row--sent yap-demo__row--new">
                  <div className="yap-demo__bubble yap-demo__bubble--sent">{sentMessage}</div>
                </div>
              )}

              {incomingReplies.slice(0, visibleReplyCount).map((reply) => (
                <div className="yap-demo__row yap-demo__row--received yap-demo__row--new" key={reply}>
                  <div className="yap-demo__bubble yap-demo__bubble--received">{reply}</div>
                </div>
              ))}

              {isTyping && (
                <div className="yap-demo__row yap-demo__row--received yap-demo__row--new">
                  <div className="yap-demo__bubble yap-demo__bubble--received yap-demo__typing" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              <span className="sr-only" aria-live="polite" aria-atomic="true">{incomingAnnouncement}</span>
            </div>

            <form
              className="yap-demo__composer"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <span className="yap-demo__plus" aria-hidden="true">+</span>
              <textarea
                aria-label="Send a demo message"
                maxLength={120}
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value.slice(0, 120))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                className="yap-demo__send"
                type="submit"
                aria-label="Send demo message"
                data-guided={status === 'idle' && draft.trim() ? 'true' : undefined}
                disabled={status !== 'idle' || !draft.trim()}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17V7m0 0-4 4m4-4 4 4" /></svg>
              </button>
            </form>
          </div>

          <div className="yap-demo__replay-slot">
            <button
              className="yap-demo__replay"
              type="button"
              onClick={replay}
              data-visible={status === 'complete' ? 'true' : undefined}
              disabled={status !== 'complete'}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8V4m0 0h4M5 4l3 3a7 7 0 1 1-2 7" /></svg>
              Replay
            </button>
          </div>
        </div>

        <div className="yap-demo-side-cue" data-visible={status === 'idle' ? 'true' : undefined}>
          <span>send to join</span>
        </div>
      </div>
    </div>
  );
}
