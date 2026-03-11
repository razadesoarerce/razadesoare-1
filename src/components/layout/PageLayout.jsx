import { Outlet, Link, NavLink, useMatches } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./PageLayout.css";

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ verticalAlign: "middle", marginRight: "4px" }}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PageLayout = ({ sidebarItems, heroImage, heroTitleKey }) => {
  const matches = useMatches();
  const { t } = useTranslation();
  const breadcrumbItems = matches
    .filter((match) => match.handle?.breadcrumbKey)
    .map((match) => ({
      path: match.pathname,
      label: t(match.handle.breadcrumbKey),
    }));

  return (
    <>
      <section className="page-hero">
        <div
          className="page-hero-image"
          style={
            heroImage
              ? {
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {heroTitleKey && (
            <div className="container">
              <motion.div
                className="page-hero-title-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="page-hero-title">{t(heroTitleKey)}</h1>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <section className="page-body container">
        <div className="page-breadcrumb">
          <Link to="/">
            <HomeIcon /> Home
          </Link>
          {breadcrumbItems.map((item, index) => (
            <span key={item.path}>
              {" | "}
              {index === breadcrumbItems.length - 1 ? (
                <span className="active">{item.label}</span>
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </span>
          ))}
        </div>

        {sidebarItems && sidebarItems.length > 0 && (
          <div className="page-content-grid">
            <aside className="page-sidebar">
              <nav>
                <ul>
                  {sidebarItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.end !== false}
                        className={({ isActive }) =>
                          isActive ? "sidebar-link active" : "sidebar-link"
                        }
                      >
                        {t(item.labelKey)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <main className="page-content">
              <Outlet />
            </main>
          </div>
        )}
        {(!sidebarItems || sidebarItems.length === 0) && (
          <main className="page-content container">
            <Outlet />
          </main>
        )}
      </section>
    </>
  );
};

export default PageLayout;
