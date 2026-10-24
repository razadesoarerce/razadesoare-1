import PreviewPageMark from "./PreviewPageMark";

/**
 * Shared centered page title + subtitle with progressive sun mark.
 * rays: Informații=1, Despre=2, Echipă=3, Galerie=4, Blog=5
 */
const PreviewPageHead = ({
  id,
  title,
  subtitle,
  rays = 1,
  subtitleClassName = "",
}) => (
  <div className="hp-pagehead">
    <div className="hp-pagehead__title-row">
      <h1 id={id} className="hp-despre-intro__title">
        {title}
      </h1>
      <PreviewPageMark rays={rays} />
    </div>
    {subtitle ? (
      <p className={`hp-despre-intro__subtitle ${subtitleClassName}`.trim()}>
        {subtitle}
      </p>
    ) : null}
  </div>
);

export default PreviewPageHead;
