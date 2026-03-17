import { useEffect, useState } from "react";
import "./BackToTop.css";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setVisible(scrollTop > 300);
      setProgress(Math.min(100, percent));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg className="progress-ring" width="42" height="42" aria-hidden="true">
        <circle
          className="progress-ring-bg"
          cx="21"
          cy="21"
          r="18"
        />
        <circle
          className="progress-ring-fill"
          cx="21"
          cy="21"
          r="18"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
      <span className="arrow">↑</span>
    </button>
  );
};

export default BackToTop;
