import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebookF } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePreview.css";

const NAV_ITEMS = [
  "Acasă",
  "Despre noi",
  "Activități",
  "Echipa",
  "Noutăți",
  "Contact",
];

const OFFER_CARDS = [
  {
    title: "Misiune și Viziune",
    text: "Direcția noastră: sprijin, respect și potențial pentru fiecare copil.",
    detail:
      "Misiunea Școlii Raza de Soare este să ofere un mediu educațional sigur, cald și adaptat, în care fiecare copil cu cerințe educaționale speciale să se simtă acceptat și încurajat. Viziunea noastră este o comunitate în care diferențele sunt respectate, progresul este celebrat pas cu pas, iar familiile găsesc parteneri de încredere pe drumul dezvoltării copilului.",
    tone: "pink",
    icon: "people",
  },
  {
    title: "Educație",
    text: "Programe adaptate care sprijină învățarea fiecărui copil.",
    detail:
      "La Raza de Soare, educația înseamnă mai mult decât lecții: fiecare copil are un parcurs personalizat, construit împreună cu familia și specialiștii. Lucrăm cu curriculum adaptat, metode interactive și obiective mici, clare, care cresc încrederea. Evaluăm progresul cu blândețe, celebrăm reușitele și ajustăm ritmul astfel încât învățarea să rămână sigură, motivațională și potrivită nevoilor fiecărui elev.",
    tone: "blue",
    icon: "book",
    imageIcon: "/images/preview/icon-educatie.jpg",
  },
  {
    title: "Dezvoltare",
    text: "Fiecare pas înainte contează.",
    headline: "Dezvoltare – Fiecare pas înainte contează",
    detailParagraphs: [
      "Fiecare copil are propriul ritm de învățare și dezvoltare. La Școala Raza de Soare, ne dorim ca fiecare copil cu cerințe educaționale speciale (CES) să primească sprijinul și încurajarea de care are nevoie pentru a-și dezvolta abilitățile și a deveni, pas cu pas, mai independent.",
      "Pentru unii copii, progresul înseamnă să învețe să citească, să scrie sau să recunoască literele și cifrele. Pentru alții, poate însemna să țină corect un creion, să folosească tacâmurile, să se îmbrace singuri, să comunice mai ușor sau să își exprime nevoile.",
      "Punem un accent deosebit pe dezvoltarea autonomiei personale și a abilităților de viață independentă. Îi sprijinim pe copii să înțeleagă și să respecte o rutină zilnică, să recunoască situațiile periculoase, să relaționeze cu cei din jur și să deprindă lucruri practice care îi pot ajuta în viața de zi cu zi.",
      "Știm că dezvoltarea copiilor cu cerințe educaționale speciale necesită răbdare, exercițiu și multă încurajare. De aceea, adaptăm activitățile de învățare la nevoile și posibilitățile fiecărui copil, fără grabă și fără comparații.",
      "Pentru noi, fiecare reușită contează. O literă învățată, un cuvânt rostit, un obiect folosit corect sau o activitate realizată pentru prima dată fără ajutor reprezintă pași importanți spre mai multă încredere și independență.",
    ],
    tone: "green",
    icon: "sprout",
    imageIcon: "/images/preview/icon-dezvoltare.jpg",
  },
  {
    title: "Activități",
    text: "Experiențe creative și jocuri care dezvoltă abilități practice.",
    detail:
      "Atelierele noastre îmbină joaca cu învățarea: artă, muzică, mișcare, grădinărit și activități senzoriale. Copiii exersează colaborarea, autonomia și comunicarea într-un cadru plin de culoare. Organizăm și momente tematice pe parcursul anului — de la sărbători la ieșiri în natură — ca fiecare zi să aducă curiozitate, bucurie și abilități pe care le pot folosi acasă și la școală.",
    tone: "yellow",
    icon: "palette",
    imageIcon: "/images/preview/icon-activitati.jpg",
  },
];

const GALLERY = [
  {
    src: "/images/preview/life-landscape.jpg",
    alt: "Versiune portrait — test încadrare",
    frame: "portrait",
    label: "Portrait 819×1024",
  },
  {
    src: "/images/preview/life-square.jpg",
    alt: "Versiune pătrată — test încadrare",
    frame: "square",
    label: "Pătrat 1000×1000",
  },
  {
    src: "/images/preview/life-landscape.jpg",
    alt: "Versiune portrait — duplicat pentru swipe",
    frame: "portrait",
    label: "Portrait 819×1024",
  },
  {
    src: "/images/preview/life-square.jpg",
    alt: "Versiune pătrată — duplicat pentru swipe",
    frame: "square",
    label: "Pătrat 1000×1000",
  },
];

const Icon = ({ name }) => {
  if (name === "book") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path
          fill="currentColor"
          d="M10 8h16a6 6 0 0 1 6 6v24a4 4 0 0 0-4-4H10V8zm28 0H26a6 6 0 0 0-6 6v24a4 4 0 0 1 4-4h14V8z"
          opacity="0.9"
        />
      </svg>
    );
  }
  if (name === "palette") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path
          fill="currentColor"
          d="M24 6c-9.9 0-18 7.4-18 16.5C6 33 14.1 42 24 42c2.2 0 4-1.8 4-4 0-1.1-.4-2-1.2-2.7-.7-.7-1.1-1.6-1.1-2.6 0-2.1 1.7-3.7 3.8-3.7H32c7.2 0 13-5.4 13-12C45 12.2 35.5 6 24 6z"
        />
        <circle cx="16" cy="18" r="2.5" fill="#fff" />
        <circle cx="24" cy="14" r="2.5" fill="#fff" />
        <circle cx="32" cy="18" r="2.5" fill="#fff" />
      </svg>
    );
  }
  if (name === "people") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <circle cx="16" cy="16" r="5" fill="currentColor" />
        <circle cx="32" cy="16" r="5" fill="currentColor" />
        <circle cx="24" cy="14" r="5.5" fill="currentColor" />
        <path
          fill="currentColor"
          d="M8 36c0-4.4 3.6-8 8-8h0c1.7 0 3.3.5 4.6 1.5A9.9 9.9 0 0 0 24 28c1.7 0 3.3.4 4.7 1.2A8 8 0 0 1 32 28h0c4.4 0 8 3.6 8 8v2H8v-2z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path
        fill="currentColor"
        d="M24 42c-1.5-7-8-11-8-18 0-4.4 3.6-8 8-8s8 3.6 8 8c0 7-6.5 11-8 18z"
      />
      <path
        fill="currentColor"
        d="M22 10c0-3 2-6 2-6s2 3 2 6-2 4-2 4-2-1-2-4zm-8 6c-2.5-2-4-5-4-5s4.2.8 6.5 2.8S20 18 20 18s-3.5.1-6-2zm16 0c-2.5 2.1-6 2-6 2s1.2-2.2 3.5-4.2S36 11 36 11s-1.5 3-4 5z"
      />
    </svg>
  );
};

const SunRays = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 64 24" aria-hidden>
    <path
      d="M4 18 Q8 4 12 18 M16 18 Q20 2 24 18 M28 18 Q32 6 36 18 M40 18 Q44 2 48 18 M52 18 Q56 6 60 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const SWIPE_CLOSE_PX = 56;

const HomePreview = () => {
  const { i18n } = useTranslation();
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const swipeStart = useRef(null);
  const menuSwipeStart = useRef(null);
  const activeLang = i18n.language?.startsWith("en") ? "EN" : "RO";

  useEffect(() => {
    const id = "home-preview-fonts";
    if (document.getElementById(id)) return undefined;

    // latin-ext is required for Romanian diacritics (ă â î ș ț) in all weights
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.gstatic.com";
    preconnect.crossOrigin = "anonymous";
    document.head.appendChild(preconnect);

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    // Nunito + latin-ext: Romanian diacritics (ă â î ș ț) stay correct in bold titles/body
    link.href =
      "https://fonts.googleapis.com/css?family=Nunito:400,600,700,800&subset=latin,latin-ext&display=swap";
    document.head.appendChild(link);
    return undefined;
  }, []);

  useEffect(() => {
    if (!expandedOffer && !menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (expandedOffer) setExpandedOffer(null);
      else if (menuOpen) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expandedOffer, menuOpen]);

  const closeExpanded = () => setExpandedOffer(null);
  const closeMenu = () => setMenuOpen(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(activeLang === "RO" ? "en" : "ro");
  };

  const onExpandTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onExpandTouchEnd = (event) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Close only on clear horizontal swipe — vertical scroll must keep working
    if (Math.abs(dx) >= SWIPE_CLOSE_PX && Math.abs(dx) > Math.abs(dy) * 1.25) {
      closeExpanded();
    }
  };

  const onMenuTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    menuSwipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onMenuTouchEnd = (event) => {
    const start = menuSwipeStart.current;
    menuSwipeStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Swipe right closes the right-side drawer
    if (dx >= SWIPE_CLOSE_PX && Math.abs(dx) > Math.abs(dy) * 1.1) {
      closeMenu();
    }
  };

  return (
    <div
      className={`hp ${expandedOffer ? "hp--offer-open" : ""} ${menuOpen ? "hp--menu-open" : ""}`}
    >
      <div className="hp-dock" aria-label="Controale rapide">
        <button type="button" className="hp-dock__btn" aria-label="Căutare (mock)">
          <svg viewBox="0 0 24 24" aria-hidden>
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          className="hp-dock__btn hp-dock__lang"
          onClick={toggleLanguage}
          aria-label={`Limba activă ${activeLang}. Apasă pentru a schimba.`}
        >
          {activeLang}
        </button>
        <a
          className="hp-dock__btn hp-dock__facebook"
          href="https://www.facebook.com/scoala.razadesoare"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF aria-hidden />
        </a>
        <button
          type="button"
          className={`hp-dock__btn hp-dock__menu ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={menuOpen}
          aria-controls="hp-drawer"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen ? (
        <div className="hp-drawer-root">
          <button
            type="button"
            className="hp-drawer__backdrop"
            aria-label="Închide meniul"
            onClick={closeMenu}
          />
          <aside
            id="hp-drawer"
            className="hp-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Meniu"
            onTouchStart={onMenuTouchStart}
            onTouchEnd={onMenuTouchEnd}
          >
            <div className="hp-drawer__head">
              <p className="hp-drawer__hint">Swipe dreapta sau tap în afară pentru a închide</p>
              <button type="button" className="hp-drawer__close" onClick={closeMenu} aria-label="Închide">
                ×
              </button>
            </div>
            <nav className="hp-drawer__nav" aria-label="Navigare mockup">
              {NAV_ITEMS.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`hp-drawer__link ${index === 0 ? "is-active" : ""}`}
                  onClick={closeMenu}
                >
                  {item}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}

      <main>
        <section className="hp-hero" aria-labelledby="hp-hero-title">
          <div
            className="hp-hero__bg"
            style={{
              backgroundImage: "url(/images/preview/hero-main.jpg)",
            }}
          />
          <div className="hp-hero__shade" />
          <div className="hp-hero__doodles" aria-hidden>
            <svg className="hp-doodle hp-doodle--heart" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M12 21s-7.2-4.5-9.4-8.2C.8 9.6 2.1 6.5 5 6.2c1.8-.2 3.4.8 4 2.3.6-1.5 2.2-2.5 4-2.3 2.9.3 4.2 3.4 2.4 6.6C19.2 16.5 12 21 12 21z"
              />
            </svg>
            <span className="hp-doodle hp-doodle--rays" />
            <svg className="hp-doodle hp-doodle--heart hp-doodle--sm" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M12 21s-7.2-4.5-9.4-8.2C.8 9.6 2.1 6.5 5 6.2c1.8-.2 3.4.8 4 2.3.6-1.5 2.2-2.5 4-2.3 2.9.3 4.2 3.4 2.4 6.6C19.2 16.5 12 21 12 21z"
              />
            </svg>
          </div>
          <div className="hp-hero__content">
            <span className="hp-hero__sun" aria-hidden />
            <h1 id="hp-hero-title">Raza de Soare</h1>
            <p>
              Un loc în care copiii cresc, învață și descoperă lumea în jurul
              lor, cu încredere și bucurie.
            </p>
            <div className="hp-hero__actions">
              <button type="button" className="hp-btn hp-btn--ghost">
                Descoperă Raza de Soare <span aria-hidden>→</span>
              </button>
              <button type="button" className="hp-btn hp-btn--ghost">
                Contactează-ne <span aria-hidden>→</span>
              </button>
            </div>
          </div>
          <svg
            className="hp-hero__wave"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* Smooth continuous wave flush to bottom — no photo strip under the curve */}
            <path
              d="M0,72 C180,108 360,108 540,78 C720,48 900,36 1080,58 C1260,80 1350,92 1440,78 L1440,122 L0,122 Z"
              fill="#ffffff"
            />
          </svg>
        </section>

        <section className="hp-section hp-offer" aria-labelledby="hp-offer-title">
          <div className="hp-section__head">
            <SunRays className="hp-rays" />
            <h2 id="hp-offer-title">Ce oferim</h2>
            <SunRays className="hp-rays" />
          </div>
          <p className="hp-section__lead">
            Activități și experiențe care sprijină dezvoltarea armonioasă a
            copiilor.
          </p>
          <div className="hp-offer__carousel">
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={12}
              pagination={{ clickable: true }}
              grabCursor
              className="hp-offer-swiper"
              onTouchStart={() => {
                if (expandedOffer) closeExpanded();
              }}
              onSlideChange={() => {
                if (expandedOffer) closeExpanded();
              }}
            >
              {OFFER_CARDS.map((card) => (
                <SwiperSlide key={card.title}>
                  <button
                    type="button"
                    className={`hp-offer-card hp-offer-card--${card.tone} ${
                      expandedOffer?.title === card.title ? "is-active" : ""
                    }`}
                    onClick={() => setExpandedOffer(card)}
                    aria-expanded={expandedOffer?.title === card.title}
                    aria-controls="hp-offer-expanded"
                  >
                    <span className="hp-offer-card__icon" aria-hidden>
                      {card.imageIcon ? (
                        <img src={card.imageIcon} alt="" />
                      ) : (
                        <Icon name={card.icon} />
                      )}
                    </span>
                    <span className="hp-offer-card__title">{card.title}</span>
                    <span className="hp-offer-card__text">{card.text}</span>
                    <span className="hp-offer-card__go" aria-hidden>
                      →
                    </span>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {expandedOffer ? (
            <div
              className="hp-offer-expand"
              id="hp-offer-expanded"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hp-offer-expand-title"
              onTouchStart={onExpandTouchStart}
              onTouchEnd={onExpandTouchEnd}
            >
              <button
                type="button"
                className="hp-offer-expand__backdrop"
                aria-label="Închide"
                onClick={closeExpanded}
              />
              <article
                className={`hp-offer-expand__panel hp-offer-expand__panel--${expandedOffer.tone}`}
              >
                <div className="hp-offer-expand__handle" aria-hidden />
                <p className="hp-offer-expand__hint">
                  Derulează pentru a citi · swipe stânga/dreapta sau tap în afară pentru a închide
                </p>
                <div className="hp-offer-expand__icon" aria-hidden>
                  {expandedOffer.imageIcon ? (
                    <img src={expandedOffer.imageIcon} alt="" />
                  ) : (
                    <Icon name={expandedOffer.icon} />
                  )}
                </div>
                <h3 id="hp-offer-expand-title">
                  {expandedOffer.headline || expandedOffer.title}
                </h3>
                {!expandedOffer.detailParagraphs ? (
                  <p className="hp-offer-expand__lead">{expandedOffer.text}</p>
                ) : null}
                {expandedOffer.detailParagraphs ? (
                  <div className="hp-offer-expand__body">
                    {expandedOffer.detailParagraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="hp-offer-expand__detail">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="hp-offer-expand__detail">{expandedOffer.detail}</p>
                )}
                <button
                  type="button"
                  className="hp-btn hp-btn--primary hp-offer-expand__close"
                  onClick={closeExpanded}
                >
                  Închide
                </button>
              </article>
            </div>
          ) : null}
        </section>

        <section className="hp-section hp-about" aria-labelledby="hp-about-title">
          <div className="hp-about__text">
            <span className="hp-eyebrow">Despre noi</span>
            <h2 id="hp-about-title">Cine suntem</h2>
            <p>
              Suntem o comunitate dedicată copiilor, unde educația specială,
              grija și bucuria se întâlnesc în fiecare zi. Credem în potențialul
              fiecărui copil și construim împreună un drum plin de soare.
            </p>
            <button type="button" className="hp-btn hp-btn--primary">
              Află mai multe <span aria-hidden>→</span>
            </button>
            <div className="hp-about__hearts" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path
                  fill="#ef6b8a"
                  d="M12 21s-7.2-4.5-9.4-8.2C.8 9.6 2.1 6.5 5 6.2c1.8-.2 3.4.8 4 2.3.6-1.5 2.2-2.5 4-2.3 2.9.3 4.2 3.4 2.4 6.6C19.2 16.5 12 21 12 21z"
                />
              </svg>
              <svg viewBox="0 0 24 24">
                <path
                  fill="#ef6b8a"
                  d="M12 21s-7.2-4.5-9.4-8.2C.8 9.6 2.1 6.5 5 6.2c1.8-.2 3.4.8 4 2.3.6-1.5 2.2-2.5 4-2.3 2.9.3 4.2 3.4 2.4 6.6C19.2 16.5 12 21 12 21z"
                />
              </svg>
              <svg viewBox="0 0 24 24">
                <path
                  fill="#ef6b8a"
                  d="M12 21s-7.2-4.5-9.4-8.2C.8 9.6 2.1 6.5 5 6.2c1.8-.2 3.4.8 4 2.3.6-1.5 2.2-2.5 4-2.3 2.9.3 4.2 3.4 2.4 6.6C19.2 16.5 12 21 12 21z"
                />
              </svg>
            </div>
          </div>
          <div className="hp-about__media">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80"
              alt="Clădire — placeholder mockup"
            />
          </div>
        </section>

        <section className="hp-section hp-life" aria-labelledby="hp-life-title">
          <div className="hp-section__head">
            <SunRays className="hp-rays" />
            <h2 id="hp-life-title">Viața la Raza de Soare</h2>
            <SunRays className="hp-rays" />
          </div>
          <p className="hp-section__lead">
            Momente din activitățile și evenimentele noastre.
          </p>
          <div className="hp-life__carousel">
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={12}
              pagination={{ clickable: true }}
              grabCursor
              className="hp-life-swiper"
            >
              {GALLERY.map((item, index) => (
                <SwiperSlide key={`${item.frame}-${index}`}>
                  <figure className={`hp-life__item hp-life__item--${item.frame}`}>
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    <figcaption className="hp-life__caption">{item.label}</figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="hp-life__cta">
            <button type="button" className="hp-btn hp-btn--primary">
              Vezi galeria foto <span aria-hidden>→</span>
            </button>
          </div>
        </section>
      </main>

      <footer className="hp-footer">
        <p>Raza de Soare — preview design (fără legături reale)</p>
      </footer>
    </div>
  );
};

export default HomePreview;
