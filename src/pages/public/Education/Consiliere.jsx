import SEO from "../../../components/common/SEO";

const Consiliere = () => {
  return (
    <>
      <SEO titleKey="education.counseling" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content therapy-content">
        <h2 className="editorial-main-title">Consiliere</h2>

        <p className="lead-paragraph">
          Serviciul de consiliere din cadrul Școlii Speciale „Rază de Soare” oferă sprijin psihologic adaptat nevoilor copiilor cu cerințe educaționale speciale. Intervenția urmărește susținerea dezvoltării emoționale, comportamentale și sociale, într-un cadru sigur și structurat.
        </p>

        <p>
          Consilierea este parte integrantă a abordării multidisciplinare a școlii, contribuind la crearea unui echilibru între procesul educațional și nevoile individuale ale fiecărui copil.
        </p>

        <div className="therapy-section">
          <h3>Obiectivele intervenției</h3>
          <ul className="therapy-list">
            <li>Dezvoltarea autoreglării emoționale</li>
            <li>Reducerea comportamentelor dezadaptative</li>
            <li>Creșterea capacității de adaptare la mediul școlar</li>
            <li>Susținerea comunicării funcționale</li>
            <li>Sprijin pentru familie în gestionarea dificultăților</li>
          </ul>
        </div>

        <div className="therapy-section">
          <h3>Modalități de intervenție</h3>
          <p>
            Intervenția psihologică se desfășoară prin sesiuni individuale, activități de grup și colaborare constantă cu cadrele didactice.
          </p>
          <p>
            Consilierul lucrează în strânsă legătură cu familia, oferind recomandări și sprijin pentru continuitatea intervenției în mediul de acasă.
          </p>
        </div>

        <div className="therapy-section">
          <h3>Rolul în echipa multidisciplinară</h3>
          <p>
            Consilierul face parte din echipa multidisciplinară a școlii, colaborând cu profesorii, logopedul și kinetoterapeutul pentru a asigura o intervenție coerentă și adaptată fiecărui copil.
          </p>
        </div>
      </section>
    </>
  );
};

export default Consiliere;
