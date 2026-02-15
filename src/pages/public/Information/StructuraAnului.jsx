import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";

const StructuraAnului = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const periods = [
    { key: "module1", type: "course", start: "2025-09-08", end: "2025-10-24" },
    { key: "autumnBreak", type: "vacation", start: "2025-10-25", end: "2025-11-02" },
    { key: "module2", type: "course", start: "2025-11-03", end: "2025-12-19" },
    { key: "winterBreak", type: "vacation", start: "2025-12-20", end: "2026-01-07" },
    { key: "module3", type: "course", start: "2026-01-08", end: "2026-02-06" },
    { key: "interBreak", type: "vacation", start: "2026-02-16", end: "2026-02-22" },
    { key: "module4", type: "course", start: "2026-02-23", end: "2026-04-03" },
    { key: "springBreak", type: "vacation", start: "2026-04-04", end: "2026-04-14" },
    { key: "module5", type: "course", start: "2026-04-15", end: "2026-06-19" },
    { key: "summerBreak", type: "summer", start: "2026-06-20", end: "2026-09-01" }
  ];

  const getActivePeriod = () => {
    return periods.find((period) => {
      const start = new Date(period.start);
      start.setHours(0, 0, 0, 0);

      const end = new Date(period.end);
      end.setHours(23, 59, 59, 999);

      return today >= start && today <= end;
    });
  };

  const activePeriod = getActivePeriod();

  return (
    <>
      <SEO titleKey="info.structure" descriptionKey="information.sectionTitle" />

      <section className="page-content-section editorial-content structure-content">
        <h2 className="editorial-main-title">{t("structure.title")}</h2>

        <p className="lead-paragraph">
          {t("structure.lead")}
        </p>

        <div className="structure-section">
          <h3>{t("structure.modularTitle")}</h3>
          <p>
            {t("structure.modularText1")}
          </p>
          <p>
            {t("structure.modularText2")}
          </p>
        </div>

        <div className="academic-calendar">
          <h3>{t("structure.calendarTitle")}</h3>

          <div className="calendar-grid">
            {periods.map((period, index) => {
              const isActive = activePeriod?.start === period.start && activePeriod?.end === period.end;

              const periodStart = new Date(period.start);
              periodStart.setHours(0, 0, 0, 0);

              const periodEnd = new Date(period.end);
              periodEnd.setHours(23, 59, 59, 999);

              const isPast = today > periodEnd;
              const isFuture = today < periodStart;

              return (
                <div
                  key={index}
                  className={`calendar-item
  ${isActive ? "active-period" : ""}
  ${isPast ? "past-period" : ""}
  ${!isPast ? "upcoming-period" : ""}
`}
                >
                  <strong>{t(`structure.periods.${period.key}`)}</strong>
                  <span>
                    {new Date(period.start).toLocaleDateString(lang === "en" ? "en-GB" : "ro-RO")} –{" "}
                    {new Date(period.end).toLocaleDateString(lang === "en" ? "en-GB" : "ro-RO")}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="calendar-note">
            {t("structure.note")}
          </p>
        </div>

        <div className="structure-section">
          <h3>{t("structure.specialTitle")}</h3>
          <p>
            {t("structure.specialText1")}
          </p>
          <p>
            {t("structure.specialText2")}
          </p>
        </div>

        <div className="structure-section">
          <h3>{t("structure.activitiesTitle")}</h3>
          <p>
            {t("structure.activitiesText")}
          </p>
        </div>

        <div className="structure-section">
          <h3>{t("structure.conclusionTitle")}</h3>
          <p>
            {t("structure.conclusionText")}
          </p>
        </div>
      </section>
    </>
  );
};

export default StructuraAnului;
