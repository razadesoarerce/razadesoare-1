import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const RING_R = 20;
const RING_C = 2 * Math.PI * RING_R;
const SHOW_AFTER_PX = 180;

/**
 * Desktop-only fixed circle: scroll progress ring + jump back to top.
 * Hidden below 900px via CSS (phone UI untouched).
 */
const PreviewScrollTop = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const sync = () => {
      frame = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, scrollTop / max));
      setProgress(next);
      setVisible(scrollTop >= SHOW_AFTER_PX);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`hp-scroll-top${visible ? " is-visible" : ""}`}
      aria-label={t("preview.chrome.scrollTopAria")}
      onClick={goTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg className="hp-scroll-top__ring" viewBox="0 0 48 48" aria-hidden>
        <circle className="hp-scroll-top__track" cx="24" cy="24" r={RING_R} />
        <circle
          className="hp-scroll-top__progress"
          cx="24"
          cy="24"
          r={RING_R}
          style={{
            strokeDasharray: RING_C,
            strokeDashoffset: RING_C * (1 - progress),
          }}
        />
      </svg>
      <svg className="hp-scroll-top__arrow" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 19V7M12 7l-5.5 5.5M12 7l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default PreviewScrollTop;
