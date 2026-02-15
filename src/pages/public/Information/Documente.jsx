import SEO from "../../../components/common/SEO";

const Documente = () => {
  return (
    <>
      <SEO titleKey="info.documents" descriptionKey="information.sectionTitle" />

      <section className="page-content-section editorial-content documents-content">
        <h2 className="editorial-main-title">Documente și Informații</h2>

        <p className="lead-paragraph">
          Pe această pagină găsiți documentele și formularele necesare pentru înscrierea la Școala Specială „Rază de Soare”, precum și referințe la cadrul legal aplicabil copiilor cu dizabilități.
        </p>

        <div className="documents-block">
          <h3>Documente interne – Școala Specială „Rază de Soare”</h3>
          <div className="documents-list">
            <div className="document-item">
              <div className="document-info">
                <h4>Formular de înscriere</h4>
                <p>Formular oficial pentru cererea de înscriere a copilului la școală.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
            <div className="document-item">
              <div className="document-info">
                <h4>Regulament de organizare</h4>
                <p>Regulamentul intern al școlii, norme de funcționare și drepturi.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
            <div className="document-item">
              <div className="document-info">
                <h4>Contract educațional</h4>
                <p>Acordul între școală și familie privind programul educațional individualizat.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
            <div className="document-item">
              <div className="document-info">
                <h4>Acord GDPR</h4>
                <p>Consimțământ pentru prelucrarea datelor personale în scop educațional.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
          </div>
        </div>

        <div className="documents-block">
          <h3>Formulare oficiale</h3>
          <div className="documents-list">
            <div className="document-item">
              <div className="document-info">
                <h4>Formular 230</h4>
                <p>Declarație fiscală pentru deduceri și drepturi sociale.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
            <div className="document-item">
              <div className="document-info">
                <h4>Certificat încadrare handicap</h4>
                <p>Certificat medical de încadrare în grad de handicap.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
            <div className="document-item">
              <div className="document-info">
                <h4>Certificat orientare școlară</h4>
                <p>Certificat de orientare către învățământ special.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
            <div className="document-item">
              <div className="document-info">
                <h4>Certificat medical A5 (NPI)</h4>
                <p>Certificat medical cu diagnosticul și recomandările NPI.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
            <div className="document-item">
              <div className="document-info">
                <h4>Documente pentru drepturi sociale</h4>
                <p>Informații și formulare pentru alocații și drepturi sociale.</p>
              </div>
              <a href="#" className="document-download">Descarcă</a>
            </div>
          </div>
        </div>

        <div className="documents-block">
          <h3>Drepturile copilului cu dizabilitate</h3>
          <div className="legal-reference">
            <h4>Legea 448/2006</h4>
            <p>Legea privind protecția și promovarea drepturilor persoanelor cu handicap.</p>
          </div>
          <div className="legal-reference">
            <h4>Legea educației 1/2011</h4>
            <p>Legea educației naționale – dispoziții privind educația incluzivă și specială.</p>
          </div>
          <div className="legal-reference">
            <h4>Convenția ONU</h4>
            <p>Convenția ONU privind drepturile persoanelor cu dizabilități (ratificată de România).</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Documente;
