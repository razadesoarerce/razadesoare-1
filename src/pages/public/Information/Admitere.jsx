import SEO from "../../../components/common/SEO";

const Admitere = () => {
  return (
    <>
      <SEO titleKey="info.admission" descriptionKey="information.sectionTitle" />

      <section className="page-content-section editorial-content admission-content">
        <h2 className="editorial-main-title">Admitere / Înscriere</h2>

        <div className="admission-section">
          <h3>Criterii de admitere</h3>

          <p>
            Școala Specială „Rază de Soare” se adresează copiilor și tinerilor diagnosticați cu dizabilitate intelectuală de grad mediu, sever sau profund.
          </p>

          <p>
            Pentru admitere este necesară existența unui certificat de încadrare în grad de handicap și a unui certificat de orientare școlară către învățământ special.
          </p>

          <p>
            Procesul de admitere include un interviu cu părinții sau reprezentanții legali și o evaluare a copilului, în vederea stabilirii compatibilității cu specificul instituției și a identificării nevoilor educaționale.
          </p>
        </div>

        <div className="admission-section">
          <h3>Documente necesare pentru înscriere</h3>

          <ul className="admission-list">
            <li>Certificatul de naștere al copilului (copie)</li>
            <li>Documentul de identitate al părintelui / reprezentantului legal</li>
            <li>Certificat de divorț (dacă este cazul)</li>
            <li>Certificat medical NPI, format A5, cu diagnosticul copilului</li>
            <li>Certificat de încadrare în grad de handicap</li>
            <li>Certificat de orientare școlară către învățământ special</li>
            <li>Alte documente medicale relevante pentru condiția copilului</li>
          </ul>

          <p className="admission-note">
            Documentele medicale suplimentare sunt importante în situații precum epilepsie, alergii severe sau tratamente psihiatrice, pentru a asigura siguranța și buna îngrijire a copilului în mediul școlar.
          </p>
        </div>
      </section>
    </>
  );
};

export default Admitere;
