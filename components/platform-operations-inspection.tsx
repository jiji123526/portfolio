import Image from 'next/image';

const callouts = [
  {
    number: '01',
    title: 'Service health',
    body: 'Platform-wide health, failures, slow paths, and alert status.',
    position: 'health',
  },
  {
    number: '02',
    title: 'Routes needing attention',
    body: 'Problem routes surface where errors and slow responses are accumulating.',
    position: 'routes',
  },
  {
    number: '03',
    title: 'Queue triage',
    body: 'Open, unread, stale, and reply-needed work is summarized for fast prioritization.',
    position: 'queue',
  },
  {
    number: '04',
    title: 'Escalated reports',
    body: 'Abuse reports move beyond room-owner handling into platform review.',
    position: 'reports',
  },
  {
    number: '05',
    title: 'Support tickets',
    body: 'One-to-one user issues are handled in the same operational surface.',
    position: 'tickets',
  },
];

export function PlatformOperationsInspection() {
  return (
    <figure className="yap-operations-inspection">
      <div className="yap-operations-inspection__heading">
        <span>PRODUCTION VIEW</span>
        <h3>How the platform was actually operated</h3>
        <p>
          The admin surface connected incident awareness, queue management,
          escalated reports, and support handling in one operational view.
        </p>
      </div>

      <div className="yap-operations-inspection__stage">
        <div className="yap-operations-inspection__visual">
          <div className="yap-operations-inspection__device">
            <Image
              src="/yap-platform-operations.png"
            alt="yap. production operations dashboard showing service health, routes needing attention, queue status, reports, and support tickets."
              width={599}
              height={1236}
              sizes="(max-width: 720px) 82vw, 430px"
            />
            {callouts.map((callout) => (
              <span
                className={`yap-operations-inspection__marker is-${callout.position}`}
                key={callout.number}
                aria-hidden="true"
              >
                {callout.number}
              </span>
            ))}
          </div>
          <figcaption>A production view, not a concept mock.</figcaption>
        </div>

        <ol className="yap-operations-inspection__callouts">
          {callouts.map((callout) => (
            <li key={callout.number}>
              <span>{callout.number}</span>
              <div>
                <strong>{callout.title}</strong>
                <p>{callout.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <aside
        className="yap-alert-policy"
        aria-labelledby="yap-alert-policy-title"
      >
        <div className="yap-alert-policy__heading">
          <span>OPERATOR EMAILS</span>
          <h4 id="yap-alert-policy-title">External alert policy</h4>
          <p>
            Alert emails summarize the severity-triggering event set and the
            five most affected routes.
          </p>
        </div>

        <div className="yap-alert-policy__content">
          <section>
            <h5>Signals included</h5>
            <ul>
              <li>5xx request failures</li>
              <li>Slow core routes</li>
              <li>Unhandled exceptions</li>
              <li>D1 unavailable</li>
              <li>Maintenance failures</li>
              <li>Cleanup failures</li>
              <li>Realtime unavailable</li>
              <li>Rate-limit spikes</li>
            </ul>
          </section>

          <section>
            <h5>Notification thresholds</h5>
            <dl>
              <div>
                <dt>Critical</dt>
                <dd>Sends immediately</dd>
              </div>
              <div>
                <dt>Degraded</dt>
                <dd>Two consecutive unhealthy 15-minute windows</dd>
              </div>
              <div>
                <dt>Recovery</dt>
                <dd>Two consecutive healthy windows</dd>
              </div>
            </dl>
          </section>
        </div>

        <p className="yap-alert-policy__note">
          Preview upstream failures, 403s, and media 404s remain visible on the
          dashboard but do not independently trigger operator email.
        </p>
      </aside>
    </figure>
  );
}
