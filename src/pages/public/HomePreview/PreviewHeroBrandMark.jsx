import { useId } from "react";

/** Geometric sun mark for the desktop cover brand panel. */
const PreviewHeroBrandMark = () => {
  const rawId = useId().replace(/:/g, "");
  const coreId = `hp-brand-core-${rawId}`;
  const glowId = `hp-brand-glow-${rawId}`;

  return (
    <span className="hp-hero__mark" aria-hidden>
      <svg className="hp-hero__mark-svg" viewBox="0 0 96 96" role="img">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c542" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#f5c542" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#f5c542" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={coreId} cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#fff6d6" />
            <stop offset="42%" stopColor="#f5c542" />
            <stop offset="100%" stopColor="#e08a2a" />
          </radialGradient>
        </defs>
        <circle cx="48" cy="48" r="30" fill={`url(#${glowId})`} />
        <g className="hp-hero__mark-rays" stroke="#e08a2a" strokeLinecap="round">
          {Array.from({ length: 24 }, (_, i) => {
            const tier = i % 3;
            const outer = tier === 0 ? 8 : tier === 1 ? 12 : 15.5;
            const inner = 21;
            const width = tier === 0 ? 1.15 : tier === 1 ? 0.9 : 0.7;
            return (
              <line
                key={i}
                x1="48"
                y1={outer}
                x2="48"
                y2={inner}
                strokeWidth={width}
                opacity={tier === 2 ? 0.55 : 0.85}
                transform={`rotate(${i * 15} 48 48)`}
              />
            );
          })}
        </g>
        <circle cx="48" cy="48" r="13.5" fill={`url(#${coreId})`} />
        <circle
          cx="48"
          cy="48"
          r="13.5"
          fill="none"
          stroke="#e08a2a"
          strokeWidth="0.6"
          opacity="0.35"
        />
      </svg>
    </span>
  );
};

export default PreviewHeroBrandMark;
