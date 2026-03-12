import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Wraps the login page: if the user is already authenticated,
 * redirects to /admin/dashboard instead of showing the login form.
 */
const RedirectIfAuthenticated = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>Se încarcă...</div>
    );
  }

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
