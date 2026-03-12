/**
 * Admin dashboard. Only accessible when authenticated (guarded by AdminAuthGuard).
 */
const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Bine ai venit în panoul de administrare.</p>
    </div>
  );
};

export default Dashboard;