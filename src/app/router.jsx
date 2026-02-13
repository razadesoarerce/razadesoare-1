import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home/Home";
import Istoric from "../pages/public/About/Istoric";
import Viziune from "../pages/public/About/Viziune";
import Organigrama from "../pages/public/About/Organigrama";
import Curriculum from "../pages/public/Education/Curriculum";
import ABA from "../pages/public/Education/ABA";
import Consiliere from "../pages/public/Education/Consiliere";
import Logopedie from "../pages/public/Education/Logopedie";
import Kinetoterapie from "../pages/public/Education/Kinetoterapie";
import StructuraAnului from "../pages/public/Information/StructuraAnului";
import Location from "../pages/public/Information/Location";
import Events from "../pages/public/Events/Events";
import EventDetails from "../pages/public/Events/EventDetails";
import NotFound from "../pages/public/NotFound";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/admin/Login";
import EventsList from "../pages/admin/events/EventsList";
import CreateEvent from "../pages/admin/events/CreateEvent";
import EditEvent from "../pages/admin/events/EditEvent";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      // DESPRE NOI
      { path: "despre/istoric", element: <Istoric /> },
      { path: "despre/viziune", element: <Viziune /> },
      { path: "despre/organigrama", element: <Organigrama /> },

      // EDUCATIE
      { path: "educatie/curriculum-adaptat", element: <Curriculum /> },
      { path: "educatie/terapii-aba", element: <ABA /> },
      { path: "educatie/consiliere", element: <Consiliere /> },
      { path: "educatie/logopedie", element: <Logopedie /> },
      { path: "educatie/kinetoterapie", element: <Kinetoterapie /> },

      // INFORMATII
      { path: "informatii/structura-anului-scolar", element: <StructuraAnului /> },
      { path: "informatii/locatie", element: <Location /> },

      // EVENIMENTE
      { path: "evenimente", element: <Events /> },
      { path: "evenimente/:id", element: <EventDetails /> },
    ],
  },

  // ADMIN LOGIN
  {
    path: "/admin/login",
    element: <Login />,
  },

  // ADMIN PROTECTED ROUTES
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },

      { path: "events", element: <EventsList /> },
      { path: "events/create", element: <CreateEvent /> },
      { path: "events/edit/:id", element: <EditEvent /> },
    ],
  },
]);

export default router;