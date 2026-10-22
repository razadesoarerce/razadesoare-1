import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";

/** New-site Informații page — parallel to old /informatii/* routes. Content TBD. */
const Informatii = () => (
  <PreviewShell>
    <main className="hp-page">
      <section className="hp-hero hp-despre-hero hp-echipa-hero" aria-label="Informații">
        <img
          className="hp-echipa-hero__cover"
          src="/images/preview/informatii/cover.jpg"
          alt="Completarea unui formular pe birou — admitere și informații școlare"
        />
        <div className="hp-hero__shade hp-despre-hero__shade" aria-hidden />
        <svg
          className="hp-hero__wave"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,72 C180,108 360,108 540,78 C720,48 900,36 1080,58 C1260,80 1350,92 1440,78 L1440,122 L0,122 Z"
            fill="#ffffff"
          />
        </svg>
      </section>

      <section className="hp-section hp-despre-intro" aria-labelledby="hp-informatii-title">
        <h1 id="hp-informatii-title" className="hp-despre-intro__title">
          Informații
        </h1>
        <p className="hp-despre-intro__subtitle">
          Admitere, documente și detalii utile pentru părinți.
        </p>
      </section>

      <PreviewSupportFooter />
    </main>
  </PreviewShell>
);

export default Informatii;
