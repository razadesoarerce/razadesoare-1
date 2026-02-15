import SEO from "../../../components/common/SEO";

const Kinetoterapie = () => {
  return (
    <>
      <SEO titleKey="education.kinetoterapie" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content therapy-content">
        <h2 className="editorial-main-title">Kinetoterapie</h2>

        <p className="lead-paragraph">
          Serviciul de kinetoterapie din cadrul Școlii Speciale „Rază de Soare” este orientat spre recuperarea și dezvoltarea funcțională a abilităților motorii ale copiilor cu dizabilități intelectuale și tulburări asociate.
        </p>

        <p>
          Intervenția kinetoterapeutică are rolul de a susține dezvoltarea coordonării globale, a echilibrului și a tonusului muscular, contribuind la creșterea gradului de autonomie în activitățile zilnice.
        </p>

        <div className="therapy-section">
          <h3>Obiectivele intervenției</h3>
          <ul className="therapy-list">
            <li>Îmbunătățirea coordonării motorii globale</li>
            <li>Dezvoltarea echilibrului și stabilității posturale</li>
            <li>Creșterea tonusului muscular și a rezistenței fizice</li>
            <li>Formarea deprinderilor motrice necesare autonomiei</li>
            <li>Prevenirea regresului motor și a complicațiilor asociate</li>
          </ul>
        </div>

        <div className="therapy-section">
          <h3>Modalități de intervenție</h3>
          <p>
            Activitățile de kinetoterapie sunt adaptate nivelului de dezvoltare al fiecărui copil și includ exerciții structurate pentru coordonare, mobilitate, echilibru și control postural.
          </p>
          <p>
            Intervenția poate avea caracter individual sau integrat în activități de grup, în funcție de obiectivele stabilite în planul educațional individualizat.
          </p>
        </div>

        <div className="therapy-section">
          <h3>Integrarea în activitatea educațională</h3>
          <p>
            Kinetoterapeutul colaborează cu cadrele didactice și ceilalți specialiști pentru a integra obiectivele motrice în activitățile zilnice, facilitând transferul abilităților dobândite în contexte funcționale reale.
          </p>
          <p>
            Dezvoltarea motrică este strâns legată de autonomia personală, de capacitatea de participare și de integrarea copilului în mediul școlar și comunitar.
          </p>
        </div>
      </section>
    </>
  );
};

export default Kinetoterapie;
