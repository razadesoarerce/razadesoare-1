import { useTranslation } from "react-i18next";
import "./footer.css";
import logo from "../../assets/logo.svg";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">

      <div className="footer-container container">

      <div className="footer-column">
    <h4>Școala Specială Raza de Soare</h4>
  <p>{t("footer.motto")}</p>
</div>

        <div className="footer-column">
          <h4>{t("footer.quickNav")}</h4>
          <ul>
            <li><a href="/despre/istoric">{t("footer.about")}</a></li>
            <li><a href="/educatie/curriculum-adaptat">{t("footer.education")}</a></li>
            <li><a href="/evenimente">{t("footer.events")}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t("footer.usefulLinks")}</h4>
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
          <p>{t("footer.address")}: Arad, Str Diogene nr 12</p>
          <p>{t("footer.email")}: contact@razadesoare.ro</p>
          <p>{t("footer.phone")}: 0257 257 257</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Școala Specială Raza de Soare. {t("footer.rights")}.
      </div>
    </footer>
  );
};

export default Footer;