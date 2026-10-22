import { Fragment, useState } from "react";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";

const INFO_CARDS = [
  {
    id: "admitere",
    title: "Admitere",
    text: "Condițiile și pașii pentru admiterea în Școala Specială „Rază de Soare”.",
    icon: "clipboard",
  },
  {
    id: "inscriere",
    title: "Înscriere",
    text: "Cum se face înscrierea și ce informații sunt necesare pentru dosar.",
    icon: "pen",
  },
  {
    id: "documente",
    title: "Documente",
    text: "Formulare, acte și materiale utile pentru părinți și tutori.",
    icon: "folder",
  },
  {
    id: "structura",
    title: "Structura anului școlar",
    text: "Calendarul anului școlar, modulele de curs și perioadele de vacanță.",
    icon: "calendar",
  },
];

const INSCRIERE_DOCS = [
  "Certificatul de naștere al copilului (copie)",
  "Documentul de identitate al părintelui / reprezentantului legal",
  "Certificat de divorț (dacă este cazul)",
  "Certificat medical NPI, format A5, cu diagnosticul copilului",
  "Certificat de încadrare în grad de handicap",
  "Certificat de orientare școlară către învățământ special",
  "Alte documente medicale relevante pentru condiția copilului",
];

const INTERNAL_DOCS = [
  "Regulament de Ordine Interioară",
  "Formularul de înscriere al copilului în Școala Specială Rază de Soare",
  "Formular 230",
];

const LEGAL_REFS = [
  {
    title: "Legea 448/2006",
    text: "Legea privind protecția și promovarea drepturilor persoanelor cu handicap.",
  },
  {
    title: "Legea educației 1/2011",
    text: "Legea educației naționale – dispoziții privind educația incluzivă și specială.",
  },
  {
    title: "Convenția ONU",
    text: "Convenția ONU privind drepturile persoanelor cu dizabilități (ratificată de România).",
  },
];

const InfoIcon = ({ name }) => {
  if (name === "clipboard") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect x="12" y="8" width="24" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M18 8h12a3 3 0 0 1 3 3v2H15v-2a3 3 0 0 1 3-3z"
          fill="currentColor"
          opacity="0.9"
        />
        <path d="M18 22h12M18 28h12M18 34h8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "pen") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path
          d="M30 10l8 8-18 18H12v-8L30 10z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M26 14l8 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 40h24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "folder") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path
          d="M8 16a3 3 0 0 1 3-3h10l3 4h13a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V16z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M8 22h32" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect x="10" y="12" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 20h28" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M18 8v6M30 8v6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="28" r="1.8" fill="currentColor" />
      <circle cx="24" cy="28" r="1.8" fill="currentColor" />
      <circle cx="30" cy="28" r="1.8" fill="currentColor" />
      <circle cx="18" cy="34" r="1.8" fill="currentColor" />
      <circle cx="24" cy="34" r="1.8" fill="currentColor" />
    </svg>
  );
};

const DownloadPlaceholder = ({ label }) => (
  <li className="hp-info-doc">
    <span className="hp-info-doc__name">{label}</span>
    <button type="button" className="hp-info-download" disabled>
      Download
    </button>
  </li>
);

const CardPanel = ({ id }) => {
  if (id === "admitere") {
    return (
      <>
        <h3 className="hp-info-panel__heading">Criterii de admitere</h3>
        <p>
          Școala Specială „Rază de Soare” se adresează copiilor și tinerilor
          diagnosticați cu dizabilitate intelectuală de grad mediu, sever sau
          profund.
        </p>
        <p>
          Pentru admitere este necesară existența unui certificat de încadrare în
          grad de handicap și a unui certificat de orientare școlară către
          învățământ special.
        </p>
        <p>
          Procesul de admitere include un interviu cu părinții sau reprezentanții
          legali și o evaluare a copilului, în vederea stabilirii
          compatibilității cu specificul instituției și a identificării nevoilor
          educaționale.
        </p>
      </>
    );
  }

  if (id === "inscriere") {
    return (
      <>
        <h3 className="hp-info-panel__heading">Documente necesare pentru înscriere</h3>
        <ul className="hp-info-list">
          {INSCRIERE_DOCS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          Documentele medicale suplimentare sunt importante în situații precum
          epilepsie, alergii severe sau tratamente psihiatrice, pentru a asigura
          siguranța și buna îngrijire a copilului în mediul școlar.
        </p>
      </>
    );
  }

  if (id === "documente") {
    return (
      <>
        <p>
          Pe această pagină găsiți documentele și formularele necesare pentru
          înscrierea la Școala Specială „Rază de Soare”, precum și referințe la
          cadrul legal aplicabil copiilor cu dizabilități.
        </p>
        <h3 className="hp-info-panel__heading">
          Documente interne – Școala Specială „Rază de Soare”
        </h3>
        <ul className="hp-info-docs">
          {INTERNAL_DOCS.map((label) => (
            <DownloadPlaceholder key={label} label={label} />
          ))}
        </ul>
        <h3 className="hp-info-panel__heading">Drepturile copilului cu dizabilitate</h3>
        <ul className="hp-info-legal">
          {LEGAL_REFS.map((ref) => (
            <li key={ref.title}>
              <p className="hp-info-legal__title">{ref.title}</p>
              <p className="hp-info-legal__text">{ref.text}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <p>
        Anul școlar la Școala Specială „Rază de Soare” este organizat pe sistem
        modular, cu perioade de cursuri alternate cu vacanțe intermodulare.
        Această structură permite o pauză regulată pentru elevi și cadre,
        asigurând un ritm sustenabil de învățare și recuperare.
      </p>
      <h3 className="hp-info-panel__heading">Organizare modulară</h3>
      <p>
        Anul școlar este împărțit în cinci module de cursuri, separate între ele
        de vacanțe intermodulare. Fiecare modul cuprinde o perioadă concentrată
        de activitate educațională, urmată de o pauză care permite elevilor să se
        recupereze și familiilor să se aliniereze la ritmul școlii.
      </p>
      <p>
        Structura modulară este adaptată nevoilor copiilor cu cerințe
        educaționale speciale, reducând oboseala și menținând un echilibru între
        solicitări și perioade de odihnă. Calendarul este comunicat în avans
        familiilor și este aliniat cu normele Ministerului Educației.
      </p>
      <div className="hp-info-media-ph" aria-hidden>
        Imagine — structura anului școlar (în curând)
      </div>
    </>
  );
};

/** New-site Informații page — parallel to old /informatii/* routes. */
const Informatii = () => {
  const [openId, setOpenId] = useState(null);

  const toggleCard = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <PreviewShell>
      <main className="hp-page">
        <section className="hp-hero hp-despre-hero hp-echipa-hero" aria-label="Informații">
          <img
            className="hp-echipa-hero__cover"
            src="/images/preview/informatii/cover.jpg"
            alt="Semnarea unui document pe birou, cu un elev alături — admitere și informații școlare"
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

        <section className="hp-section hp-despre-intro hp-informatii" aria-labelledby="hp-informatii-title">
          <h1 id="hp-informatii-title" className="hp-despre-intro__title">
            Informații
          </h1>
          <p className="hp-despre-intro__subtitle">
            Admitere, documente și detalii utile pentru părinți.
          </p>

          <div className="hp-info-cards">
            {INFO_CARDS.map((card, index) => {
              const isOpen = openId === card.id;
              const panelId = `hp-info-panel-${card.id}`;

              return (
                <Fragment key={card.id}>
                  {index > 0 ? <hr className="hp-despre-rule" aria-hidden /> : null}
                  <article className={`hp-info-card ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="hp-info-card__toggle"
                      onClick={() => toggleCard(card.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="hp-info-card__icon" aria-hidden>
                        <InfoIcon name={card.icon} />
                      </span>
                      <span className="hp-info-card__body">
                        <span className="hp-info-card__title">{card.title}</span>
                        <span className="hp-info-card__text">{card.text}</span>
                      </span>
                      <span className="hp-info-card__arrow" aria-hidden>
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            d="M6 9l6 6 6-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div className="hp-info-card__collapse" id={panelId}>
                      <div className="hp-info-card__panel">
                        <CardPanel id={card.id} />
                      </div>
                    </div>
                  </article>
                </Fragment>
              );
            })}
          </div>
        </section>

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default Informatii;
