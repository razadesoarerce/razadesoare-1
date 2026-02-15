import SEO from "../../../components/common/SEO";

const Curriculum = () => {
  return (
    <>
      <SEO titleKey="education.curriculum" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content curriculum-content">
        <h2 className="editorial-main-title">Curriculum Adaptat</h2>

        <p className="lead-paragraph">
          Curriculumul adaptat al Școlii Speciale „Rază de Soare” este construit pornind de la nevoile reale ale fiecărui copil. Procesul educațional nu urmărește standarde uniforme de performanță academică, ci dezvoltarea progresivă a autonomiei, a comunicării și a abilităților funcționale necesare integrării în comunitate.
        </p>

        <p>
          Fiecare elev beneficiază de un plan educațional individualizat, adaptat nivelului său de dezvoltare, ritmului propriu de învățare și particularităților cognitive și emoționale.
        </p>

        <div className="curriculum-section">
          <h3>Principii fundamentale</h3>
          <ul className="curriculum-list">
            <li>Individualizarea intervenției educaționale</li>
            <li>Respectarea ritmului propriu de dezvoltare</li>
            <li>Stabilirea unor obiective funcționale și realiste</li>
            <li>Colaborare constantă cu familia</li>
            <li>Evaluare continuă și adaptare permanentă</li>
          </ul>
        </div>

        <div className="curriculum-section">
          <h3>Domenii de dezvoltare</h3>

          <div className="curriculum-domain">
            <h4>Dezvoltare cognitivă</h4>
            <p>
              Stimularea proceselor de învățare prin activități adaptate nivelului de înțelegere al fiecărui elev.
            </p>
          </div>

          <div className="curriculum-domain">
            <h4>Comunicare și limbaj</h4>
            <p>
              Dezvoltarea comunicării funcționale, verbale sau alternative, în funcție de nevoile individuale.
            </p>
          </div>

          <div className="curriculum-domain">
            <h4>Autonomie personală</h4>
            <p>
              Formarea deprinderilor de autoservire și independență în activitățile zilnice.
            </p>
          </div>

          <div className="curriculum-domain">
            <h4>Abilități sociale</h4>
            <p>
              Exersarea interacțiunilor sociale, a regulilor de conviețuire și a comportamentelor adecvate în comunitate.
            </p>
          </div>

          <div className="curriculum-domain">
            <h4>Abilități practice de viață</h4>
            <p>
              Învățarea competențelor necesare unei integrări cât mai funcționale în mediul familial și social.
            </p>
          </div>
        </div>

        <div className="curriculum-section">
          <h3>Organizare și structură</h3>
          <p>
            Clasele sunt formate din 6–8 elevi și sunt coordonate de două cadre didactice, ceea ce permite o intervenție personalizată și o atenție constantă acordată fiecărui copil.
          </p>
          <p>
            Activitatea educațională este completată prin colaborarea cu specialiști (consilier, logoped, kinetoterapeut), asigurând o abordare multidisciplinară.
          </p>
        </div>

        <div className="curriculum-section">
          <h3>Evaluare și progres</h3>
          <p>
            Evaluarea progresului se realizează continuu, prin observarea evoluției individuale și prin adaptarea obiectivelor educaționale.
          </p>
          <p>
            Accentul este pus pe progres real, măsurat în pași concreți către autonomie și integrare.
          </p>
        </div>
      </section>
    </>
  );
};

export default Curriculum;
