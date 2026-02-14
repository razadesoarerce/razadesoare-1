import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home/Home";
import Istoric from "../pages/public/About/Istoric";
import MissionVision from "../pages/public/About/MissionVision";
import Echipa from "../pages/public/About/Echipa";
import Curriculum from "../pages/public/Education/Curriculum";
import Consiliere from "../pages/public/Education/Consiliere";
import Logopedie from "../pages/public/Education/Logopedie";
import Kinetoterapie from "../pages/public/Education/Kinetoterapie";
import Admitere from "../pages/public/Information/Admitere";
import Documente from "../pages/public/Information/Documente";
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
              { path: "/despre/misiune-viziune", labelKey: "about.missionVision" },
              { path: "/despre/echipa", labelKey: "about.team" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "about.sectionTitle" },
        children: [
          { path: "istoric", element: <Istoric />, handle: { breadcrumbKey: "about.history" } },
          { path: "misiune-viziune", element: <MissionVision />, handle: { breadcrumbKey: "about.missionVision" } },
          { path: "echipa", element: <Echipa />, handle: { breadcrumbKey: "about.team" } },
        ],
      },

      // EDUCATIE
      {
        path: "educatie",
        element: (
          <PageLayout
            heroImage="/images/educatie.jpg"
            heroTitleKey="education.sectionTitle"
            sidebarItems={[
              { path: "/educatie/curriculum-adaptat", labelKey: "education.curriculum" },
              { path: "/educatie/consiliere", labelKey: "education.counseling" },
              { path: "/educatie/logopedie", labelKey: "education.logopedie" },
              { path: "/educatie/kinetoterapie", labelKey: "education.kinetoterapie" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "education.sectionTitle" },
        children: [
          { path: "curriculum-adaptat", element: <Curriculum />, handle: { breadcrumbKey: "education.curriculum" } },
          { path: "consiliere", element: <Consiliere />, handle: { breadcrumbKey: "education.counseling" } },
          { path: "logopedie", element: <Logopedie />, handle: { breadcrumbKey: "education.logopedie" } },
          { path: "kinetoterapie", element: <Kinetoterapie />, handle: { breadcrumbKey: "education.kinetoterapie" } },
        ],
      },

      // INFORMATII
      {
        path: "informatii",
        element: (
          <PageLayout
            heroImage="/images/informatii.jpg"
            heroTitleKey="information.sectionTitle"
            sidebarItems={[
              { path: "/informatii/admitere", labelKey: "info.admission" },
              { path: "/informatii/documente", labelKey: "info.documents" },
              { path: "/informatii/structura-anului-scolar", labelKey: "info.structure" },
              { path: "/informatii/locatie", labelKey: "info.location" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "information.sectionTitle" },
        children: [
          { path: "admitere", element: <Admitere />, handle: { breadcrumbKey: "info.admission" } },
          { path: "documente", element: <Documente />, handle: { breadcrumbKey: "info.documents" } },
          { path: "structura-anului-scolar", element: <StructuraAnului />, handle: { breadcrumbKey: "info.structure" } },
          { path: "locatie", element: <Location />, handle: { breadcrumbKey: "info.location" } },
        ],
      },

      // EVENIMENTE
      {
        path: "evenimente",
        element: <PageLayout heroImage="/images/evenimente.jpg" heroTitleKey="events.sectionTitle" sidebarItems={[]} />,
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