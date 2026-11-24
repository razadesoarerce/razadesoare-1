import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_MAPS_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_MOBILE_DISPLAY,
  CONTACT_PHONE_MOBILE_TEL,
  CONTACT_PHONE_TEL,
} from "./previewContact";

const PreviewContactContext = createContext(null);

export const usePreviewContact = () => useContext(PreviewContactContext);

/** Shared Contact dropdown for DesktopTopNav + cover brand on all preview pages. */
export const PreviewContactProvider = ({ children }) => {
  const { t } = useTranslation();
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPanelPos, setContactPanelPos] = useState(null);
  const contactTriggerRef = useRef(null);
  const lastContactTriggerRef = useRef(null);
  const contactPanelRef = useRef(null);

  const openContactFrom = useCallback((event) => {
    lastContactTriggerRef.current = event?.currentTarget ?? null;
    setContactOpen((open) => !open);
  }, []);

  const openContact = useCallback((event) => {
    lastContactTriggerRef.current = event?.currentTarget ?? null;
    setContactOpen(true);
  }, []);

  useLayoutEffect(() => {
    if (!contactOpen) {
      setContactPanelPos(null);
      return undefined;
    }

    const syncPanelPos = () => {
      const preferred = lastContactTriggerRef.current;
      const trigger =
        preferred && preferred.getClientRects().length > 0
          ? preferred
          : contactTriggerRef.current &&
              contactTriggerRef.current.getClientRects().length > 0
            ? contactTriggerRef.current
            : null;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const minWidth = Math.max(rect.width, 240);
      const maxLeft = Math.max(8, window.innerWidth - minWidth - 8);
      setContactPanelPos({
        top: rect.bottom + 6,
        left: Math.min(Math.max(8, rect.left), maxLeft),
        minWidth,
      });
    };

    syncPanelPos();
    window.addEventListener("resize", syncPanelPos);
    window.addEventListener("scroll", syncPanelPos, true);
    return () => {
      window.removeEventListener("resize", syncPanelPos);
      window.removeEventListener("scroll", syncPanelPos, true);
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!contactOpen) return undefined;

    const onPointerDown = (event) => {
      const target = event.target;
      if (target.closest?.("[data-contact-trigger]")) return;
      if (contactPanelRef.current?.contains(target)) return;
      setContactOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setContactOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  const contactPanel =
    contactOpen && contactPanelPos
      ? createPortal(
          <div
            id="hp-contact-panel"
            ref={contactPanelRef}
            className="hp-contact-dd__panel hp-glass"
            role="region"
            aria-label={t("preview.contact.panelAria")}
            style={{
              top: contactPanelPos.top,
              left: contactPanelPos.left,
              minWidth: contactPanelPos.minWidth,
            }}
          >
            <a
              className="hp-contact-dd__row"
              href={CONTACT_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("preview.contact.openMapAria", { address: CONTACT_ADDRESS })}
            >
              <span className="hp-contact-dd__icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2c-3.9 0-7 3.1-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                  />
                </svg>
              </span>
              <span className="hp-contact-dd__text">
                <span className="hp-contact-dd__label">{t("preview.contact.address")}</span>
                <span className="hp-contact-dd__value">{CONTACT_ADDRESS}</span>
                <span className="hp-contact-dd__action">{t("preview.contact.openMap")}</span>
              </span>
              <span className="hp-contact-dd__go" aria-hidden>
                ↗
              </span>
            </a>
            <a
              className="hp-contact-dd__row"
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={t("preview.contact.sendEmailAria", { email: CONTACT_EMAIL })}
            >
              <span className="hp-contact-dd__icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                  />
                </svg>
              </span>
              <span className="hp-contact-dd__text">
                <span className="hp-contact-dd__label">{t("preview.contact.email")}</span>
                <span className="hp-contact-dd__value">{CONTACT_EMAIL}</span>
                <span className="hp-contact-dd__action">{t("preview.contact.sendEmail")}</span>
              </span>
              <span className="hp-contact-dd__go" aria-hidden>
                ↗
              </span>
            </a>
            <a
              className="hp-contact-dd__row"
              href={CONTACT_PHONE_TEL}
              aria-label={t("preview.contact.callAria", { phone: CONTACT_PHONE_DISPLAY })}
            >
              <span className="hp-contact-dd__icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                  />
                </svg>
              </span>
              <span className="hp-contact-dd__text">
                <span className="hp-contact-dd__label">{t("preview.contact.phone")}</span>
                <span className="hp-contact-dd__value">{CONTACT_PHONE_DISPLAY}</span>
                <span className="hp-contact-dd__action">{t("preview.contact.call")}</span>
              </span>
              <span className="hp-contact-dd__go" aria-hidden>
                ›
              </span>
            </a>
            <a
              className="hp-contact-dd__row"
              href={CONTACT_PHONE_MOBILE_TEL}
              aria-label={t("preview.contact.callAria", {
                phone: CONTACT_PHONE_MOBILE_DISPLAY,
              })}
            >
              <span className="hp-contact-dd__icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                  />
                </svg>
              </span>
              <span className="hp-contact-dd__text">
                <span className="hp-contact-dd__label">{t("preview.contact.phone")}</span>
                <span className="hp-contact-dd__value">
                  {CONTACT_PHONE_MOBILE_DISPLAY}
                </span>
                <span className="hp-contact-dd__action">{t("preview.contact.call")}</span>
              </span>
              <span className="hp-contact-dd__go" aria-hidden>
                ›
              </span>
            </a>
          </div>,
          document.body
        )
      : null;

  const value = useMemo(
    () => ({
      contactOpen,
      contactTriggerRef,
      onContactClick: openContactFrom,
      openContact,
      setContactOpen,
      contactPanel,
    }),
    [contactOpen, openContactFrom, openContact, contactPanel]
  );

  return (
    <PreviewContactContext.Provider value={value}>
      {children}
      {contactPanel}
    </PreviewContactContext.Provider>
  );
};
