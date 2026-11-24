export const CONTACT_ADDRESS = "Arad, Strada Diogene nr 12";
export const CONTACT_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(CONTACT_ADDRESS);
export const CONTACT_EMAIL = "razadesoarerce@yahoo.com";
export const CONTACT_PHONE_DISPLAY = "0257 214 805";
export const CONTACT_PHONE_TEL = "tel:+40257214805";
export const CONTACT_PHONE_MOBILE_DISPLAY = "0741 058 138";
export const CONTACT_PHONE_MOBILE_TEL = "tel:+40741058138";

const CONTACT_PANEL_GAP = 6;
/** Approx panel height — used to flip above when near the bottom of the viewport. */
const CONTACT_PANEL_EST_HEIGHT = 268;

/** Fixed position + surface for the portaled contact dropdown. */
export const resolveContactPanelPos = (trigger) => {
  const rect = trigger.getBoundingClientRect();
  const minWidth = Math.max(rect.width, 240);
  const maxLeft = Math.max(8, window.innerWidth - minWidth - 8);
  const left = Math.min(Math.max(8, rect.left), maxLeft);
  const spaceBelow = window.innerHeight - rect.bottom - 8;
  const spaceAbove = rect.top - 8;
  const placeAbove =
    spaceBelow < CONTACT_PANEL_EST_HEIGHT && spaceAbove > spaceBelow;
  const surfaceAttr = trigger.getAttribute?.("data-contact-surface");
  const surface =
    surfaceAttr === "cover" || surfaceAttr === "chrome"
      ? surfaceAttr
      : trigger.classList?.contains("hp-hero__contact")
        ? "cover"
        : "chrome";

  if (placeAbove) {
    return {
      placement: "above",
      top: "auto",
      bottom: window.innerHeight - rect.top + CONTACT_PANEL_GAP,
      left,
      minWidth,
      surface,
    };
  }

  return {
    placement: "below",
    top: rect.bottom + CONTACT_PANEL_GAP,
    bottom: "auto",
    left,
    minWidth,
    surface,
  };
};
