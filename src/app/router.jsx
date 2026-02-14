import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";
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
      {
        path: "despre",
        element: (
          <PageLayout
            heroImage="/images/despre.jpg"
            heroTitleKey="about.sectionTitle"
            sidebarItems={[
              { path: "/despre/istoric", labelKey: "about.history" },
              { path: "/despre/viziune", labelKey: "about.vision" },
              { path: "/despre/organigrama", labelKey: "about.organization" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "about.sectionTitle" },
        children: [
          { path: "istoric", element: <Istoric />, handle: { breadcrumbKey: "about.history" } },
          { path: "viziune", element: <Viziune />, handle: { breadcrumbKey: "about.vision" } },
          { path: "organigrama", element: <Organigrama />, handle: { breadcrumbKey: "about.organization" } },
        ],
      },

      // EDUCATIE
      {
        path: "educatie",
        element: (
          <PageLayout
            heroTitleKey="education.sectionTitle"
            sidebarItems={[
              { path: "/educatie/curriculum-adaptat", labelKey: "education.curriculum" },
              { path: "/educatie/terapii-aba", labelKey: "education.aba" },
              { path: "/educatie/consiliere", labelKey: "education.counseling" },
              { path: "/educatie/logopedie", labelKey: "education.speech" },
              { path: "/educatie/kinetoterapie", labelKey: "education.kinesiotherapy" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "education.sectionTitle" },
        children: [
          { path: "curriculum-adaptat", element: <Curriculum />, handle: { breadcrumbKey: "education.curriculum" } },
          { path: "terapii-aba", element: <ABA />, handle: { breadcrumbKey: "education.aba" } },
          { path: "consiliere", element: <Consiliere />, handle: { breadcrumbKey: "education.counseling" } },
          { path: "logopedie", element: <Logopedie />, handle: { breadcrumbKey: "education.speech" } },
          { path: "kinetoterapie", element: <Kinetoterapie />, handle: { breadcrumbKey: "education.kinesiotherapy" } },
        ],
      },

      // INFORMATII
      {
        path: "informatii",
        element: (
          <PageLayout
            heroTitleKey="information.sectionTitle"
            sidebarItems={[
              { path: "/informatii/structura-anului-scolar", labelKey: "information.structure" },
              { path: "/informatii/locatie", labelKey: "information.location" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "information.sectionTitle" },
        children: [
          { path: "structura-anului-scolar", element: <StructuraAnului />, handle: { breadcrumbKey: "information.structure" } },
          { path: "locatie", element: <Location />, handle: { breadcrumbKey: "information.location" } },
        ],
      },

      // EVENIMENTE
      {
        path: "evenimente",
        element: <PageLayout heroTitleKey="events.sectionTitle" />,
        handle: { breadcrumbKey: "events.sectionTitle" },
        children: [
          { index: true, element: <Events />, handle: { breadcrumbKey: "events.sectionTitle" } },
          { path: ":id", element: <EventDetails />, handle: { breadcrumbKey: "events.details" } },
        ],
      },
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