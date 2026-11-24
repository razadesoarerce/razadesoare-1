import {
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
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

const parseTotal = (snap) => {
  if (!snap?.exists()) return 0;
  const total = Number(snap.data()?.total);
  return Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;
};

/**
 * Read current total. Prefer server so we never paint the local optimistic
 * value of FieldValue.increment() (which looks like "1" on a cold cache).
 */
export const getSiteViewsTotal = async ({ fromServer = false } = {}) => {
  try {
    const snap = fromServer
      ? await getDocFromServer(viewsRef())
      : await getDoc(viewsRef());
    return parseTotal(snap);
  } catch {
    if (fromServer) {
      try {
        return parseTotal(await getDoc(viewsRef()));
      } catch {
        return 0;
      }
    }
    return 0;
  }
};

/* Dedupe concurrent callers (desktop mounts links + visitors separately). */
let sessionTotal = null;
let inflight = null;

/**
 * Count at most one visit per browser per calendar day, then return total.
 * Uses localStorage as a gate so refresh / Strict Mode remounts do not inflate the number.
 */
export const trackSiteViewOncePerDay = async () => {
  if (sessionTotal != null) return sessionTotal;
  if (inflight) return inflight;

  inflight = (async () => {
    // Server read first — avoids cold-cache "1" after increment()
    let total = await getSiteViewsTotal({ fromServer: true });

    let alreadyCountedToday = false;
    try {
      const today = todayKey();
      alreadyCountedToday = window.localStorage.getItem(DAY_KEY) === today;
      if (!alreadyCountedToday) {
        window.localStorage.setItem(DAY_KEY, today);
      }
    } catch {
      /* private mode — still try a single soft increment this session */
    }

    if (!alreadyCountedToday) {
      try {
        await setDoc(
          viewsRef(),
          { total: increment(1), updatedAt: serverTimestamp() },
          { merge: true }
        );
        // Do not re-getDoc from cache (optimistic increment can read as 1).
        total = total > 0 ? total + 1 : 1;
      } catch {
        /* rules / offline — keep server total already read */
      }
    }

    sessionTotal = total > 0 ? total : 0;
    return sessionTotal;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
};
