import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import PreviewPageHead from "./PreviewPageHead";
import { BLOG_CATEGORIES, BLOG_FILTERS } from "./blogData";

/** „Vezi toate” expands only when a category has more than this many articles. */
const BLOG_EXPAND_AFTER = 3;

const BlogCard = ({ article }) => (
  <article className="hp-blog-card">
    <div className="hp-blog-card__media">
      <img src={article.cover} alt={article.coverAlt || ""} loading="lazy" />
    </div>
    <h3 className="hp-blog-card__title">{article.title}</h3>
  </article>
);

const Blog = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("toate");
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  const filters = BLOG_FILTERS.map((filter) => ({
    ...filter,
    label: t(`preview.blog.filters.${filter.id}`),
  }));

  const categories = BLOG_CATEGORIES.map((category) => ({
    ...category,
    title: t(`preview.blog.categories.${category.id}`),
    articles: category.articles.map((article) => ({
      ...article,
      title: t(`preview.blog.articles.${article.id}.title`),
      coverAlt: t(`preview.blog.articles.${article.id}.coverAlt`),
    })),
  }));

  const visibleCategories = useMemo(() => {
    const filter = filters.find((item) => item.id === activeFilter);
    if (!filter?.categoryId) return categories;
    return categories.filter((category) => category.id === filter.categoryId);
  }, [activeFilter, categories, filters]);

  const toggleExpanded = (categoryId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  return (
    <PreviewShell>
      <main className="hp-page hp-blog">
        <section
          className="hp-hero hp-despre-hero hp-echipa-hero"
          aria-label={t("preview.blog.heroAria")}
        >
          <img
            className="hp-echipa-hero__cover"
            src="/images/preview/blog/cover.jpg"
            alt={t("preview.blog.coverAlt")}
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

        <header
          className="hp-section hp-despre-intro hp-blog__header"
          aria-labelledby="hp-blog-title"
        >
          <PreviewPageHead
            id="hp-blog-title"
            title={t("preview.blog.title")}
            subtitle={t("preview.blog.subtitle")}
            rays={5}
            subtitleClassName="hp-blog__subtitle"
          />
        </header>

        <div
          className="hp-section hp-blog-filters"
          role="tablist"
          aria-label={t("preview.blog.filtersAria")}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`hp-blog-filters__chip ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {visibleCategories.map((category) => {
          const canExpand = category.articles.length > BLOG_EXPAND_AFTER;
          const isExpanded = expandedIds.has(category.id);
          const panelId = `hp-blog-panel-${category.id}`;

          return (
            <section
              key={category.id}
              className={`hp-section hp-blog-category ${isExpanded ? "is-expanded" : ""}`}
              aria-labelledby={`hp-blog-cat-${category.id}`}
            >
              <div className="hp-blog-category__head">
                <h2 id={`hp-blog-cat-${category.id}`} className="hp-blog-category__title">
                  {category.title}
                </h2>
                <button
                  type="button"
                  className={`hp-blog-category__all ${canExpand ? "" : "is-disabled"}`}
                  disabled={!canExpand}
                  aria-disabled={!canExpand}
                  aria-expanded={canExpand ? isExpanded : undefined}
                  aria-controls={canExpand ? panelId : undefined}
                  title={canExpand ? undefined : t("preview.blog.expandDisabledTitle")}
                  onClick={() => {
                    if (!canExpand) return;
                    toggleExpanded(category.id);
                  }}
                >
                  {isExpanded ? (
                    <>
                      {t("preview.blog.seeLess")} <span aria-hidden>↑</span>
                    </>
                  ) : (
                    <>
                      {t("preview.blog.seeAll")} <span aria-hidden>→</span>
                    </>
                  )}
                </button>
              </div>

              {isExpanded && canExpand ? (
                <div id={panelId} className="hp-blog-category__grid">
                  {category.articles.map((article) => (
                    <BlogCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="hp-blog-category__carousel">
                  <Swiper
                    modules={[Pagination]}
                    slidesPerView={2.15}
                    spaceBetween={8}
                    pagination={{ clickable: true }}
                    grabCursor
                    watchOverflow
                    breakpoints={{
                      480: { slidesPerView: 2.4, spaceBetween: 9 },
                      640: { slidesPerView: 3, spaceBetween: 10 },
                      900: { slidesPerView: 3.2, spaceBetween: 12 },
                    }}
                    className="hp-blog-swiper"
                  >
                    {category.articles.map((article) => (
                      <SwiperSlide key={article.id}>
                        <BlogCard article={article} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </section>
          );
        })}

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default Blog;
