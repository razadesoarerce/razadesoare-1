import SEO from "../../../components/common/SEO";

const Logopedie = () => {
  return (
    <>
      <SEO titleKey="education.logopedie" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content therapy-content">
        <h2 className="editorial-main-title">Logopedie</h2>

        <p className="lead-paragraph">
          Activitatea logopedică din cadrul Școlii Speciale „Rază de Soare” se adresează copiilor cu dizabilități intelectuale medii, severe și profunde, la care tulburările de limbaj sunt frecvent asociate cu dificultăți cognitive și de dezvoltare globală.
        </p>

        <p>
          Intervenția logopedică nu se limitează la corectarea unor sunete izolate, așa cum se întâmplă frecvent în învățământul de masă, ci vizează dezvoltarea comunicării funcționale de la nivel de bază, pornind de la limbajul receptiv, conformarea la instrucțiuni simple și stimularea intenției de comunicare.
        </p>

        <div className="therapy-section">
          <h3>Contextul intervenției</h3>
          <p>
            Un procent semnificativ dintre elevii școlii prezintă retard de limbaj asociat retardului intelectual, iar o parte importantă dintre aceștia sunt nonverbali. În aceste situații, intervenția logopedică urmărește procesul de demutizare și construirea treptată a abilităților de comunicare.
          </p>
        </div>

        <div className="therapy-section">
          <h3>Direcții principale de intervenție</h3>
          <ul className="therapy-list">
            <li>Stimularea limbajului receptiv și a înțelegerii comenzilor simple</li>
            <li>Dezvoltarea intenției de comunicare</li>
            <li>Demutizare și stimularea vocalizărilor funcționale</li>
            <li>Exersarea coordonării oro-motorii</li>
            <li>Formarea complianței și a capacității de a urma instrucțiuni</li>
          </ul>
        </div>

        <div className="therapy-section">
          <h3>Metode utilizate</h3>
          <p>
            Intervenția include utilizarea sistemelor alternative și augmentative de comunicare (AAC), pictograme, suport vizual, gesturi funcționale și alte instrumente adaptate nivelului fiecărui copil.
          </p>
          <p>
            Scopul este dezvoltarea unei comunicări cât mai funcționale, indiferent de forma acesteia – verbală sau alternativă – astfel încât copilul să își poată exprima nevoile, preferințele și emoțiile.
          </p>
        </div>

        <div className="therapy-section">
          <h3>Rolul logopedului în echipa multidisciplinară</h3>
          <p>
            Logopedul colaborează constant cu cadrele didactice, consilierul și kinetoterapeutul pentru a integra obiectivele de comunicare în activitățile educaționale zilnice și pentru a asigura coerența intervenției.
          </p>
        </div>
      </section>
    </>
  );
};

export default Logopedie;
