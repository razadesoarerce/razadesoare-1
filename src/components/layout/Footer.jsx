import "./footer.css";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container container">

      <div className="footer-column">
    <h4>Școala Specială Raza de Soare</h4>
  
  <p>
    Educație adaptată, sprijin și dezvoltare pentru fiecare copil.
  </p>
</div>

        <div className="footer-column">
          <h4>Navigare rapidă</h4>
          <ul>
            <li><a href="/despre/istoric">Despre noi</a></li>
            <li><a href="/educatie/curriculum-adaptat">Educație</a></li>
            <li><a href="/evenimente">Evenimente</a></li>
            <li><a href="/informatii/locatie">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Link-uri utile</h4>
          <ul>
            <li>
              <a
                href="https://www.dgaspc-arad.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DGASPC
              </a>
            </li>
            <li>
              <a
                href="https://cjrae-arad.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CJRAE
              </a>
            </li>
            <li>
              <a
                href="http://www.isjarad.ro/forum/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ISJ ARAD
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <p>Adresă: Arad, Str Diogene nr 12</p>
          <p>Email: contact@razadesoare.ro</p>
          <p>Telefon: 0257 257 257</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Școala Specială Raza de Soare. Toate drepturile rezervate.
      </div>
    </footer>
  );
};

export default Footer;