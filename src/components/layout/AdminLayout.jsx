import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import BackToTop from "../ui/BackToTop";
import "../../styles/admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin</h2>

        <nav>
          <NavLink to="/admin/dashboard" end className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/documents" className={({ isActive }) => (isActive ? "active" : "")}>
            Documente
          </NavLink>
          <NavLink to="/admin/events" className={({ isActive }) => (isActive ? "active" : "")}>
            Evenimente
          </NavLink>
          <NavLink to="/admin/gallery" className={({ isActive }) => (isActive ? "active" : "")}>
            Galerie
          </NavLink>
          <NavLink to="/admin/team" className={({ isActive }) => (isActive ? "active" : "")}>
            Gestionare Echipă
          </NavLink>
        </nav>

        <button type="button" onClick={handleLogout} className="admin-logout">
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
      <BackToTop />
    </div>
  );
};

export default AdminLayout;