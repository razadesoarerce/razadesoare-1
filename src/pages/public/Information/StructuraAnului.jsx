import SEO from "../../../components/common/SEO";

const StructuraAnului = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const periods = [
    { name: "Modul I", type: "course", start: "2025-09-08", end: "2025-10-24" },
    { name: "Vacanță", type: "vacation", start: "2025-10-25", end: "2025-11-02" },
    { name: "Modul II", type: "course", start: "2025-11-03", end: "2025-12-19" },
    { name: "Vacanță de iarnă", type: "vacation", start: "2025-12-20", end: "2026-01-07" },
    { name: "Modul III", type: "course", start: "2026-01-08", end: "2026-02-06" },
    { name: "Vacanță", type: "vacation", start: "2026-02-16", end: "2026-02-22" },
    { name: "Modul IV", type: "course", start: "2026-02-23", end: "2026-04-03" },
    { name: "Vacanță de primăvară", type: "vacation", start: "2026-04-04", end: "2026-04-14" },
    { name: "Modul V", type: "course", start: "2026-04-15", end: "2026-06-19" },
    { name: "Vacanța de vară", type: "summer", start: "2026-06-20", end: "2026-09-01" }
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
        <h2 className="editorial-main-title">Structura Anului Școlar</h2>

        <p className="lead-paragraph">
          Anul școlar la Școala Specială „Rază de Soare” este organizat pe sistem modular, cu perioade de cursuri alternate cu vacanțe intermodulare. Această structură permite o pauză regulată pentru elevi și cadre, asigurând un ritm sustenabil de învățare și recuperare.
        </p>

        <div className="structure-section">
          <h3>Organizare modulară</h3>
          <p>
            Anul școlar este împărțit în cinci module de cursuri, separate între ele de vacanțe intermodulare. Fiecare modul cuprinde o perioadă concentrată de activitate educațională, urmată de o pauză care permite elevilor să se recupereze și familiilor să se aliniereze la ritmul școlii.
          </p>
          <p>
            Structura modulară este adaptată nevoilor copiilor cu cerințe educaționale speciale, reducând oboseala și menținând un echilibru între solicitări și perioade de odihnă. Calendarul este comunicat în avans familiilor și este aliniat cu normele Ministerului Educației.
          </p>
        </div>

        <div className="academic-calendar">
          <h3>Calendarul anului școlar 2025–2026</h3>

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
                  <strong>{period.name}</strong>
                  <span>
                    {new Date(period.start).toLocaleDateString("ro-RO")} –{" "}
                    {new Date(period.end).toLocaleDateString("ro-RO")}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="calendar-note">
            *Structura anului școlar este adaptată conform calendarului stabilit pentru județul Arad și poate suferi modificări în funcție de deciziile autorităților educaționale.*
          </p>
        </div>

        <div className="structure-section">
          <h3>Particularități în învățământ special</h3>
          <p>
            În învățământul special, structura anului școlar și programul zilnic sunt adaptate ritmului și capacităților elevilor. Perioadele de concentrare sunt mai scurte, iar activitățile sunt alternante pentru a menține atenția și a reduce oboseala.
          </p>
          <p>
            Evaluarea progresului se face continuu, iar obiectivele educaționale sunt revizuite la fiecare modul în funcție de evoluția fiecărui copil.
          </p>
        </div>

        <div className="structure-section">
          <h3>Activități complementare</h3>
          <p>
            Pe parcursul anului școlar se desfășoară activități extrașcolare și proiecte educative – ateliere, excursii, sărbători școlare – integrate în programul modular. Acestea sporesc experiența de învățare și oportunitățile de socializare ale elevilor.
          </p>
        </div>

        <div className="structure-section">
          <h3>Concluzie</h3>
          <p>
            Structura modulară a anului școlar reflectă angajamentul școlii față de un mediu educațional echilibrat și adaptat nevoilor copiilor cu cerințe speciale. Calendarul exact (date de început și sfârșit pentru fiecare modul) este afișat la școală și comunicat familiilor la începutul anului școlar.
          </p>
        </div>
      </section>
    </>
  );
};

export default StructuraAnului;
