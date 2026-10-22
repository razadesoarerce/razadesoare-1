import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import { BLOG_CATEGORIES } from "./blogData";

/** „Vezi toate” expands only when a category has more than this many articles. */
const BLOG_EXPAND_AFTER = 3;

const TitleSpark = () => (
  <svg className="hp-blog__spark" viewBox="0 0 32 32" aria-hidden>
    <g stroke="#f5c542" strokeWidth="2.4" strokeLinecap="round">
      <line x1="16" y1="4" x2="16" y2="11" />
      <line x1="24.5" y1="7.5" x2="20" y2="12.5" />
      <line x1="27.5" y1="16" x2="21" y2="16" />
    </g>
  </svg>
);

const BlogCard = ({ article }) => (
  <article className="hp-blog-card">
    <div className="hp-blog-card__media">
      <img src={article.cover} alt={article.coverAlt || ""} loading="lazy" />
    </div>
    <h3 className="hp-blog-card__title">{article.title}</h3>
  </article>
);

const Blog = () => {
  const [expandedIds, setExpandedIds] = useState(() => new Set());

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
        <header className="hp-section hp-blog__header" aria-labelledby="hp-blog-title">
          <div className="hp-blog__title-row">
            <h1 id="hp-blog-title" className="hp-blog__title">
              Blog educațional
            </h1>
            <TitleSpark />
          </div>
          <p className="hp-blog__subtitle">
            Informații utile pentru părinți și copii cu CES
          </p>
        </header>

        {BLOG_CATEGORIES.map((category) => {
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
                  title={
                    canExpand
                      ? undefined
                      : "Disponibil când categoria are mai mult de 3 articole"
                  }
                  onClick={() => {
                    if (!canExpand) return;
                    toggleExpanded(category.id);
                  }}
                >
                  {isExpanded ? (
                    <>
                      Vezi mai puțin <span aria-hidden>↑</span>
                    </>
                  ) : (
                    <>
                      Vezi toate <span aria-hidden>→</span>
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
                    slidesPerView={1.2}
                    spaceBetween={12}
                    pagination={{ clickable: true }}
                    grabCursor
                    watchOverflow
                    breakpoints={{
                      640: { slidesPerView: 2.2, spaceBetween: 14 },
                      900: { slidesPerView: 3, spaceBetween: 16 },
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
