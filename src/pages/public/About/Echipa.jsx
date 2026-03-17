import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";
import { getTeamMembers } from "../../../services/teamService";
import "./Echipa.css";

const CATEGORY_LABELS = {
  conducere: "Conducere",
  "cadre-didactice": "Cadre didactice",
  specialisti: "Specialiști",
  "personal-auxiliar": "Personal auxiliar",
};

const CATEGORY_ORDER = ["conducere", "cadre-didactice", "specialisti", "personal-auxiliar"];

const Echipa = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    getTeamMembers()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter(
      (m) =>
        (m.name || "").toLowerCase().includes(q) &&
        (categoryFilter ? m.category === categoryFilter : true)
    );
  }, [members, search, categoryFilter]);

  const grouped = useMemo(() => {
    const g = {
      conducere: [],
      "cadre-didactice": [],
      specialisti: [],
      "personal-auxiliar": [],
    };
    filtered.forEach((m) => {
      const key = m.category && g[m.category] ? m.category : "cadre-didactice";
      g[key].push(m);
    });
    return g;
  }, [filtered]);

  if (loading) {
    return (
      <>
        <SEO titleKey="about.team" descriptionKey="about.sectionTitle" />
        <section className="page-content-section editorial-content team-content">
          <h2 className="editorial-main-title">{t("about.teamPage.title")}</h2>
          <p className="team-loading">Se încarcă…</p>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO titleKey="about.team" descriptionKey="about.sectionTitle" />

      <section className="page-content-section editorial-content team-content">
        <h2 className="editorial-main-title">
          {t("about.teamPage.title")}
        </h2>

        <p className="team-intro">
          {t("about.teamPage.intro1")}
        </p>

        <p className="team-intro">
          {t("about.teamPage.intro2")}
        </p>

        <div className="team-controls">
          <input
            type="text"
            placeholder="Caută membru..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Toate</option>
            <option value="conducere">Conducere</option>
            <option value="cadre-didactice">Cadre didactice</option>
            <option value="specialisti">Specialiști</option>
            <option value="personal-auxiliar">Personal auxiliar</option>
          </select>
        </div>

        {CATEGORY_ORDER.map((key) => {
          const list = grouped[key] || [];
          if (list.length === 0) return null;
          const title = CATEGORY_LABELS[key] || key;
          return (
            <div className="team-category" key={key}>
              <h3>{title}</h3>
              <div className="team-cards-grid">
                {list.map((member) => {
                  const details = [
                    member.specialization,
                    member.experience ? `${member.experience} ani` : null,
                  ]
                    .filter(Boolean)
                    .join(" • ");
                  return (
                    <div className="team-card" key={member.id}>
                      {member.imageUrl ? (
                        <img src={member.imageUrl} alt={member.name || ""} />
                      ) : (
                        <div className="team-card-placeholder">Foto</div>
                      )}
                      <h3>{member.name}</h3>
                      {(member.function ?? "") && (
                        <p className="team-card-role">{member.function}</p>
                      )}
                      {details && (
                        <p className="team-card-details">{details}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Echipa;
