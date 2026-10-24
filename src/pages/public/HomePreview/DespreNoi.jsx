import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import PreviewPageHead from "./PreviewPageHead";

const StoryRule = () => (
  <hr className="hp-despre-rule" aria-hidden />
);

const BANNER_META = [
  { id: "b1", src: "/images/preview/despre/banner-1.jpg" },
  { id: "b2", src: "/images/preview/despre/banner-2.jpg" },
  { id: "b3", src: "/images/preview/despre/banner-3.jpg" },
];

const STORY_BLOCK_IDS = ["vision", "accreditation", "education", "mission"];

/** New-site About page — parallel to old /despre/* routes. */
const DespreNoi = () => {
  const { t } = useTranslation();

  const bannerSlides = BANNER_META.map((slide) => ({
    ...slide,
    alt: t(`preview.about.banners.${slide.id}`),
  }));

  const storyBlocks = STORY_BLOCK_IDS.map((id) => ({
    id,
    title: t(`preview.about.blocks.${id}.title`),
    text: t(`preview.about.blocks.${id}.text`),
  }));

  return (
    <PreviewShell>
      <main className="hp-page">
        <section
          className="hp-hero hp-despre-hero"
          aria-label={t("preview.about.heroAria")}
        >
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
            {bannerSlides.map((slide) => (
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
          <PreviewPageHead
            id="hp-despre-title"
            title={t("preview.about.title")}
            subtitle={t("preview.about.subtitle")}
            rays={2}
          />

          <div className="hp-despre-intro__row">
            <div className="hp-despre-intro__media">
              <img
                src="/images/preview/despre/story-square.jpg"
                alt={t("preview.about.storyImageAlt")}
              />
            </div>
            <div className="hp-despre-intro__copy">
              <h2>{t("preview.about.historyTitle")}</h2>
              <p>{t("preview.about.historyText")}</p>
            </div>
          </div>

          <div className="hp-despre-blocks" aria-label={t("preview.about.blocksAria")}>
            {storyBlocks.map((block) => (
              <Fragment key={block.id}>
                <StoryRule />
                <article className="hp-despre-block">
                  <h2>{block.title}</h2>
                  <p>{block.text}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </section>

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default DespreNoi;
