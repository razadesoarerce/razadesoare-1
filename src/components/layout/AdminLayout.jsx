import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Admin</h2>

        <nav style={styles.nav}>
          <Link to="/admin" style={styles.link}>Dashboard</Link>
          <Link to="/admin/events" style={styles.link}>Evenimente</Link>
        </nav>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </aside>

      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  logout: {
    padding: "10px",
    backgroundColor: "#facc15",
    border: "none",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f3f4f6",
  },
};

export default AdminLayout;