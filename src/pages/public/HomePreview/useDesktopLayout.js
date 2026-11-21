import { useEffect, useState } from "react";

/** Matches CSS desktop breakpoint (`min-width: 900px`). */
export const DESKTOP_MQ = "(min-width: 900px)";

export const useDesktopLayout = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(DESKTOP_MQ).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isDesktop;
};
