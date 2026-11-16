import { doc, getDoc, setDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const DOC_PATH = ["stats", "siteViews"];
const DAY_KEY = "hp-site-view-day-v1";

/**
 * Firebase Console → Firestore → Rules: allow public read + +1 update on
 * stats/siteViews only (no other fields). Without this, the counter stays hidden.
 */

const todayKey = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const viewsRef = () => doc(db, ...DOC_PATH);

/** Read current total (0 if missing / denied). */
export const getSiteViewsTotal = async () => {
  try {
    const snap = await getDoc(viewsRef());
    const total = snap.exists() ? Number(snap.data()?.total) : 0;
    return Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;
  } catch {
    return 0;
  }
};

/**
 * Count at most one visit per browser per calendar day, then return total.
 * Uses localStorage as a gate so refresh / Strict Mode remounts do not inflate the number.
 */
export const trackSiteViewOncePerDay = async () => {
  let alreadyCountedToday = false;
  try {
    const today = todayKey();
    alreadyCountedToday = window.localStorage.getItem(DAY_KEY) === today;
    if (!alreadyCountedToday) {
      window.localStorage.setItem(DAY_KEY, today);
    }
  } catch {
    /* private mode — still try a single soft increment this session via memory */
  }

  if (!alreadyCountedToday) {
    try {
      await setDoc(
        viewsRef(),
        { total: increment(1), updatedAt: serverTimestamp() },
        { merge: true }
      );
    } catch {
      /* rules / offline — UI still shows last known / 0 */
    }
  }

  return getSiteViewsTotal();
};
