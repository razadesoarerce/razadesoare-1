import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";

const BANNER_SLIDES = [
  {
    src: "/images/preview/despre/banner-1.jpg",
    alt: "Profesoară și elevi la activitate pe masa portocalie",
  },
  {
    src: "/images/preview/despre/banner-2.jpg",
    alt: "Activitate de pictură cu frunze de toamnă",
  },
  {
    src: "/images/preview/despre/banner-3.jpg",
    alt: "Două profesoare și elevi la masă în clasă",
  },
];

const STORY_BLOCKS = [
  {
    title: "Extinderea viziunii",
    text: "Dacă inițial viziunea RCE a fost să ajute copiii abandonați din orfelinate, centre de plasament, datorită cererii din comunitate, serviciile s-au extins și pentru copiii cu dizabilități grave, severe din familii.",
  },
  {
    title: "Acreditare și autorizare",
    text: "Din anul 2002 și până în anul 2009, Centrul educațional Școala „Rază de Soare” a funcționat cu acreditare din partea Ministerului Muncii. În 2009, Școala Specială „Rază de Soare” a fost autorizată de către Ministerul Educației pentru învățământ preșcolar și primar, în momentul de față fiind acreditată pe ciclurile de învățământ preșcolar-primar-gimnazial.",
  },
  {
    title: "Educație adaptată și atenție personalizată",
    text: "Pe parcursul anilor, „Rază de Soare” s-a dezvoltat constant, oferind educație adaptată preșcolarilor și elevilor înscriși aici. Programul nostru acoperă nivelurile de grădiniță (grupa mică) până la clasa a 10-a, cu clase formate dintr-un număr restrâns de copii (6–8 elevi) și coordonate de doi profesori la clasă, pentru a asigura o atenție personalizată și un progres real pentru fiecare elev.",
  },
  {
    title: "Misiunea noastră",
    text: "De-a lungul timpului, misiunea noastră s-a extins dincolo de simpla predare, devenind un centru de sprijin holistic care promovează incluziunea, dezvoltarea personală și creșterea demnității fiecărui copil.",
  },
];

/** New-site About page — parallel to old /despre/* routes. */
const DespreNoi = () => (
  <PreviewShell>
    <main className="hp-page">
      <section className="hp-hero hp-despre-hero" aria-label="Galerie Despre noi">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          loop
          speed={450}
          pagination={{ clickable: true }}
          grabCursor
          className="hp-despre-hero__swiper"
        >
          {BANNER_SLIDES.map((slide) => (
            <SwiperSlide key={slide.src}>
              <img
                className="hp-despre-hero__img"
                src={slide.src}
                alt={slide.alt}
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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

      <section className="hp-section hp-despre-intro" aria-labelledby="hp-despre-title">
        <h1 id="hp-despre-title" className="hp-despre-intro__title">
          Despre noi
        </h1>
        <p className="hp-despre-intro__subtitle">
          Istoria și misiunea școlii
        </p>

        <div className="hp-despre-intro__row">
          <div className="hp-despre-intro__media">
            <img
              src="/images/preview/despre/story-square.jpg"
              alt="Activitate educațională la Școala Raza de Soare"
            />
          </div>
          <div className="hp-despre-intro__copy">
            <h2>Istoricul Școlii Speciale „Rază de Soare”</h2>
            <p>
              Școala Specială „Rază de Soare” reprezintă unul din proiectele
              Fundației Creștine RCE „Speranța Copiilor” din Arad, care și-a
              început activitatea în anul 1992. Școala a luat ființă în ianuarie
              2002, sub formă de centru educațional și de recuperare, mai întâi
              pentru cei 8 copii cu dizabilități din centrul rezidențial și de
              recuperare „Casa Darius”, din cadrul fundației.
            </p>
          </div>
        </div>
      </section>

      <section className="hp-section hp-despre-blocks" aria-label="Istorie și misiune">
        {STORY_BLOCKS.map((block) => (
          <article key={block.title} className="hp-despre-block">
            <h2>{block.title}</h2>
            <p>{block.text}</p>
          </article>
        ))}
      </section>

      <PreviewSupportFooter />
    </main>
  </PreviewShell>
);

export default DespreNoi;
