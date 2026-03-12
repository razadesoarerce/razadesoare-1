import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Protects admin routes: only authenticated users can access children.
 * Unauthenticated users are redirected to /admin/login.
 */
const AdminAuthGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>Se încarcă...</div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminAuthGuard;
