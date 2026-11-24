import { useTranslation } from "react-i18next";
import PreviewHeroBrandMark from "./PreviewHeroBrandMark";
import { usePreviewContact } from "./PreviewContactContext";
import { CONTACT_EMAIL } from "./previewContact";

/**
 * Desktop-only left brand panel for preview covers (same format as homepage).
 * Hidden on phone via existing `.hp-hero__brand { display: none }` / desktop overrides.
 * Uses shared contact context when available (inner pages); props override on homepage.
 */
const PreviewDesktopCoverBrand = ({
  titleId,
  titleAs = "p",
  onContactClick,
  contactTriggerRef,
} = {}) => {
  const { t } = useTranslation();
  const sharedContact = usePreviewContact();
  const TitleTag = titleAs === "h1" ? "h1" : "p";

  const handleContact = onContactClick || sharedContact?.onContactClick;
  const triggerRef = contactTriggerRef || undefined;

  return (
    <div className="hp-hero__brand">
      <PreviewHeroBrandMark />
      <p className="hp-hero__school">
        <span className="hp-hero__school-text">{t("preview.home.heroSchoolName")}</span>
      </p>
      <TitleTag id={titleId} className="hp-hero__desktop-title">
        {t("preview.home.heroTitle")}
      </TitleTag>
      <p className="hp-hero__motto">{t("preview.home.heroMotto")}</p>
      {typeof handleContact === "function" ? (
        <button
          type="button"
          className="hp-hero__contact"
          data-contact-trigger
          ref={triggerRef}
          onClick={handleContact}
        >
          {t("preview.contact.cta")}
        </button>
      ) : (
        <a className="hp-hero__contact" href={`mailto:${CONTACT_EMAIL}`}>
          {t("preview.contact.cta")}
        </a>
      )}
    </div>
  );
};

export default PreviewDesktopCoverBrand;
