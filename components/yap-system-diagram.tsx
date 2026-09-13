'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type NodeId = 'browser' | 'next' | 'worker' | 'd1' | 'do' | 'r2';
type EdgeId = 'browser-next' | 'next-worker' | 'worker-d1' | 'd1-do' | 'do-browser' | 'worker-r2';

const nodes: Record<NodeId, { role: string; tech: string; note: string; detail: string }> = {
  browser: { role: 'Guest or owner', tech: 'Browser', note: 'Anonymous guest · authenticated owner', detail: 'Two entry modes share the same client surface: anonymous guests and authenticated channel owners.' },
  next: { role: 'Web & session', tech: 'Next.js', note: 'Session boundary · API proxy', detail: 'Next.js establishes the web and session boundary, then proxies requests to the edge API.' },
  worker: { role: 'Authorization', tech: 'Worker', note: 'Every request authorized again', detail: 'The Worker independently re-authorizes every request before touching durable state or protected media.' },
  d1: { role: 'Source of truth', tech: 'D1', note: 'Commit first', detail: 'D1 is authoritative. Realtime delivery begins only after the write succeeds.' },
  do: { role: 'Realtime delivery', tech: 'Durable Objects', note: 'Presence · fan-out', detail: 'Durable Objects accelerate room presence and fan-out after durable persistence succeeds.' },
  r2: { role: 'Protected media', tech: 'R2', note: 'Authorized upload · signed read', detail: 'Media uploads and reads pass through Worker authorization before protected R2 objects are signed or served.' },
};

const edges: { id: EdgeId; path: string; nodes: NodeId[]; core?: boolean }[] = [
  { id: 'browser-next', path: 'M 200 120 H 280', nodes: ['browser', 'next'], core: true },
  { id: 'next-worker', path: 'M 460 120 H 540', nodes: ['next', 'worker'], core: true },
  { id: 'worker-d1', path: 'M 720 120 H 800', nodes: ['worker', 'd1'], core: true },
  { id: 'd1-do', path: 'M 890 170 V 245', nodes: ['d1', 'do'] },
  { id: 'do-browser', path: 'M 800 295 H 760 V 485 H 110 V 170', nodes: ['do', 'browser'] },
  { id: 'worker-r2', path: 'M 630 170 V 360', nodes: ['worker', 'r2'] },
];

const nodeEdges: Record<NodeId, EdgeId[]> = {
  browser: ['browser-next', 'next-worker'],
  next: ['browser-next', 'next-worker'],
  worker: ['browser-next', 'next-worker', 'worker-d1', 'd1-do', 'do-browser', 'worker-r2'],
  d1: ['worker-d1', 'd1-do', 'do-browser'],
  do: ['worker-d1', 'd1-do', 'do-browser'],
  r2: ['browser-next', 'next-worker', 'worker-r2'],
};

const nodeOrder: NodeId[] = ['browser', 'next', 'worker', 'd1', 'do', 'r2'];

export function YapSystemDiagram() {
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [pinned, setPinned] = useState<NodeId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = pinned ?? hovered;
  const activeEdges = useMemo(() => active ? nodeEdges[active] : [], [active]);
  const activeNodes = useMemo(() => {
    if (!active) return new Set<NodeId>();
    const connected = new Set<NodeId>([active]);
    edges.forEach((edge) => { if (activeEdges.includes(edge.id)) edge.nodes.forEach((node) => connected.add(node)); });
    return connected;
  }, [active, activeEdges]);

  useEffect(() => {
    const clearPinned = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as globalThis.Node)) setPinned(null);
    };
    document.addEventListener('pointerdown', clearPinned);
    return () => document.removeEventListener('pointerdown', clearPinned);
  }, []);

  const nodeButton = (id: NodeId, location: 'desktop' | 'mobile' = 'desktop') => {
    const node = nodes[id];
    const selected = pinned === id;
    return <button
      type="button"
      className={`yap-system-node yap-node-${id}`}
      data-muted={active && !activeNodes.has(id) ? 'true' : undefined}
      data-active={activeNodes.has(id) ? 'true' : undefined}
      aria-pressed={selected}
      aria-label={`${node.tech}: ${node.role}. ${node.detail}`}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(id)}
      onBlur={() => setHovered(null)}
      onClick={() => setPinned((current) => current === id ? null : id)}
      key={`${location}-${id}`}
    >
      <span>{node.role}</span><strong>{node.tech}</strong><small>{node.note}</small>
    </button>;
  };

  const isEdgeActive = (id: EdgeId) => activeEdges.includes(id);

  return <div className="yap-system-diagram" ref={rootRef} onMouseLeave={() => setHovered(null)}>
    <div className="yap-diagram-head"><div><span>REQUEST</span><i /><span>COMMIT</span><i /><span>DELIVER</span></div><p>Hover to trace · click to pin</p></div>

    <div className="yap-desktop-graph">
      <svg className="yap-graph-lines" viewBox="0 0 1000 520" preserveAspectRatio="none">
        <defs><marker id="yap-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" /></marker></defs>
        {edges.map((edge) => <g key={edge.id} className={`yap-edge ${edge.core ? 'is-core' : ''} ${isEdgeActive(edge.id) ? 'is-active' : ''} ${active && !isEdgeActive(edge.id) ? 'is-muted' : ''}`}>
          <path d={edge.path} markerEnd="url(#yap-arrow)" />
          {isEdgeActive(edge.id) && <circle r="4" className="yap-route-dot" key={`${active}-${edge.id}`}><animateMotion dur=".72s" repeatCount="1" fill="freeze" path={edge.path} /></circle>}
        </g>)}
      </svg>
      <span className="yap-path-label request-label">REQUEST</span><span className="yap-path-label commit-label">COMMIT FIRST</span><span className="yap-path-label fanout-label">REALTIME FAN-OUT</span><span className="yap-path-label media-label">MEDIA</span>
      {nodeOrder.map((id) => nodeButton(id))}
    </div>

    <div className="yap-mobile-graph">
      {nodeButton('browser', 'mobile')}
      <i className={`yap-mobile-arrow ${isEdgeActive('browser-next') ? 'is-active' : ''}`} aria-hidden="true">↓</i>
      {nodeButton('next', 'mobile')}
      <i className={`yap-mobile-arrow ${isEdgeActive('next-worker') ? 'is-active' : ''}`} aria-hidden="true">↓</i>
      {nodeButton('worker', 'mobile')}
      <div className="yap-mobile-branches">
        <section><span>MESSAGE PATH · COMMIT FIRST</span>{nodeButton('d1', 'mobile')}<i className={`yap-mobile-arrow ${isEdgeActive('d1-do') ? 'is-active' : ''}`} aria-hidden="true">↓</i>{nodeButton('do', 'mobile')}<p>↩ Realtime fan-out to Browser</p></section>
        <section><span>MEDIA PATH</span>{nodeButton('r2', 'mobile')}</section>
      </div>
    </div>

    <div className="yap-diagram-detail" aria-live="polite"><span>{pinned ? 'PINNED PATH' : active ? 'ACTIVE PATH' : 'SYSTEM PRINCIPLE'}</span><p>{active ? nodes[active].detail : 'D1 defines what happened; realtime delivery and protected media remain downstream acceleration layers.'}</p></div>
  </div>;
}
