import SEO from "../../../components/common/SEO";

const Echipa = () => {
  return (
    <>
      <SEO titleKey="about.team" descriptionKey="about.sectionTitle" />

      <section className="page-content-section editorial-content team-content">
        <h2 className="editorial-main-title">Echipa Noastră</h2>

        <p className="team-intro">
          Echipa Școlii Speciale „Rază de Soare” este formată din cadre didactice și specialiști cu experiență în lucrul cu copii cu cerințe educaționale speciale. Activitatea noastră se bazează pe colaborare interdisciplinară, responsabilitate profesională și respect pentru demnitatea fiecărui copil.
        </p>

        <p className="team-intro">
          Printr-o abordare individualizată și prin muncă în echipă, urmărim dezvoltarea autonomiei, a comunicării și a abilităților practice necesare integrării în comunitate.
        </p>

        <div className="team-category">
          <h3>Conducere</h3>
          <div className="team-grid">
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Director</span>
              <span className="details">Psihopedagogie specială • 18 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Coordonator educațional</span>
              <span className="details">Management educațional • 14 ani experiență</span>
            </div>
          </div>
        </div>

        <div className="team-category">
          <h3>Cadre didactice</h3>
          <div className="team-grid">
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Profesor învățământ special</span>
              <span className="details">Pedagogie specială • 12 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Profesor învățământ special</span>
              <span className="details">Intervenție educațională personalizată • 9 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Educator</span>
              <span className="details">Formare în terapie ocupațională • 7 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Educator</span>
              <span className="details">Stimulare cognitivă • 10 ani experiență</span>
            </div>
          </div>
        </div>

        <div className="team-category">
          <h3>Specialiști</h3>
          <div className="team-grid">
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Consilier psihologic</span>
              <span className="details">Psihologie clinică • 11 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Logoped</span>
              <span className="details">Terapie logopedică • 8 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Kinetoterapeut</span>
              <span className="details">Recuperare neuromotorie • 13 ani experiență</span>
            </div>
          </div>
        </div>

        <div className="team-category">
          <h3>Personal auxiliar</h3>
          <div className="team-grid">
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Îngrijitor</span>
              <span className="details">Suport activități zilnice • 10 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Personal administrativ</span>
              <span className="details">Gestionare administrativă • 15 ani experiență</span>
            </div>
            <div className="team-member">
              <strong>Nume Prenume</strong>
              <span className="role">Bucătăreasă</span>
              <span className="details">Alimentație adaptată • 9 ani experiență</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Echipa;
