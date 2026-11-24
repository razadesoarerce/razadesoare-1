import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PageSeo from "../../../components/common/PageSeo";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import PreviewPageHead from "./PreviewPageHead";
import PreviewDesktopCoverBrand from "./PreviewDesktopCoverBrand";

const StoryRule = ({ className = "" } = {}) => (
  <div
    className={`hp-despre-rule ${className}`.trim()}
    role="separator"
    aria-hidden
  />
);

const BANNER_META = [
  { id: "b3", src: "/images/preview/despre/banner-3.jpg" },
  { id: "b1", src: "/images/preview/despre/banner-1.jpg" },
  { id: "b2", src: "/images/preview/despre/banner-2.jpg" },
];

/** Shown beside the story image on desktop; full-width list on phone. */
const SIDE_BLOCK_IDS = ["vision", "accreditation"];
/** Always full-width under the intro row. */
const REST_BLOCK_IDS = ["education", "mission"];

const mapBlocks = (t, ids) =>
  ids.map((id) => ({
    id,
    title: t(`preview.about.blocks.${id}.title`),
    text: t(`preview.about.blocks.${id}.text`),
  }));

/** New-site About page — parallel to old /despre/* routes. */
const DespreNoi = () => {
  const { t } = useTranslation();

  const bannerSlides = BANNER_META.map((slide) => ({
    ...slide,
    alt: t(`preview.about.banners.${slide.id}`),
  }));

  const sideBlocks = mapBlocks(t, SIDE_BLOCK_IDS);
  const restBlocks = mapBlocks(t, REST_BLOCK_IDS);

  return (
    <PreviewShell>
      <PageSeo
        title={t("preview.seo.aboutTitle")}
        description={t("preview.seo.aboutDescription")}
        path="/despre-noi"
      />
      <main className="hp-page">
        <section
          className="hp-hero hp-despre-hero"
          aria-label={t("preview.about.heroAria")}
        >
          <PreviewDesktopCoverBrand titleId="hp-despre-cover-title" />
          <div className="hp-hero__media">
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
            <div className="hp-hero__fade" aria-hidden />
            <div className="hp-hero__shade hp-despre-hero__shade" aria-hidden />
          </div>
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
              {/* Desktop only: fill the column beside the image */}
              <div className="hp-despre-intro__copy-extra">
                {sideBlocks.map((block) => (
                  <Fragment key={`side-${block.id}`}>
                    <StoryRule />
                    <article className="hp-despre-block">
                      <h2>{block.title}</h2>
                      <p>{block.text}</p>
                    </article>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="hp-despre-blocks" aria-label={t("preview.about.blocksAria")}>
            {/* Phone: vision + accreditation here; desktop: hidden (shown beside image) */}
            {sideBlocks.map((block) => (
              <Fragment key={block.id}>
                <StoryRule className="hp-despre-rule--side" />
                <article className="hp-despre-block hp-despre-block--side">
                  <h2>{block.title}</h2>
                  <p>{block.text}</p>
                </article>
              </Fragment>
            ))}
            {restBlocks.map((block) => (
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
