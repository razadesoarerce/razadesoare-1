/**
 * Pulsing sun core + N rays (one more ray per preview page, starting at Informații = 1).
 */
const PreviewPageMark = ({ rays = 1 }) => {
  const count = Math.max(1, Math.min(Number(rays) || 1, 8));
  /* Upper-right arc — sits nicely beside centered titles */
  const startDeg = count === 1 ? 48 : 8;
  const endDeg = count === 1 ? 48 : 98;
  const angles =
    count === 1
      ? [startDeg]
      : Array.from({ length: count }, (_, i) => startDeg + ((endDeg - startDeg) * i) / (count - 1));

  const inner = 5.6;
  const outer = 13.2;

  return (
    <svg className="hp-page-mark" viewBox="0 0 32 32" aria-hidden>
      <circle className="hp-page-mark__pulse" cx="16" cy="16" r="5.2" />
      <circle className="hp-page-mark__core" cx="16" cy="16" r="3.15" />
      <g className="hp-page-mark__rays" fill="none" stroke="#f5c542" strokeWidth="2.35" strokeLinecap="round">
        {angles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          return (
            <line
              key={deg}
              x1={16 + cos * inner}
              y1={16 - sin * inner}
              x2={16 + cos * outer}
              y2={16 - sin * outer}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default PreviewPageMark;
