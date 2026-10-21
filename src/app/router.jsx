/**
 * App router: createBrowserRouter (browser history) for client-side routing.
 * Works on Vercel when vercel.json rewrites send all requests to index.html.
 * Admin: single /admin route, AdminLayout with Outlet; login is public, dashboard/events protected by AdminAuthGuard.
 */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";
import AdminLayout from "../components/layout/AdminLayout";
import AdminAuthGuard from "../components/common/AdminAuthGuard";
import RedirectIfAuthenticated from "../components/common/RedirectIfAuthenticated";

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
import Events from "../pages/public/Events/Events";
import EventDetails from "../pages/public/Events/EventDetails";
import GalerieFoto from "../pages/public/GalerieFoto/GalerieFoto";
import HomePreview from "../pages/public/HomePreview/HomePreview";
import DespreNoi from "../pages/public/HomePreview/DespreNoi";
import EchipaNoastra from "../pages/public/HomePreview/EchipaNoastra";
import NotFound from "../pages/public/NotFound";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/admin/Login";
import EventsList from "../pages/admin/events/EventsList";
import CreateEvent from "../pages/admin/events/CreateEvent";
import EditEvent from "../pages/admin/events/EditEvent";
import DocumentsList from "../pages/admin/documents/DocumentsList";
import GalleryList from "../pages/admin/gallery/GalleryList";
import AlbumPhotos from "../pages/admin/gallery/AlbumPhotos";
import TeamAdmin from "../pages/admin/team/TeamAdmin";

// Sidebar items for Evenimente section (reused on both /evenimente and /galerie-foto)
const evenimenteSidebarItems = [
  { path: "/evenimente", labelKey: "events.stiriActivitati", end: false },
  { path: "/galerie-foto", labelKey: "events.galerieFoto" },
];

const router = createBrowserRouter([
  // New-site preview (parallel to old public pages — nothing removed yet)
  {
    path: "/preview",
    element: <HomePreview />,
  },
  {
    path: "/preview/despre-noi",
    element: <DespreNoi />,
  },
  {
    path: "/preview/echipa-noastra",
    element: <EchipaNoastra />,
  },

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
            heroImage="/images/home/hero-vision2.jpg"
            heroTitleKey="about.sectionTitle"
            sidebarItems={[
              { path: "/despre/istoric", labelKey: "about.history.label" },
              { path: "/despre/misiune-viziune", labelKey: "about.missionVision" },
              { path: "/despre/echipa", labelKey: "about.team" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "about.sectionTitle" },
        children: [
          { path: "istoric", element: <Istoric />, handle: { breadcrumbKey: "about.history.label" } },
          { path: "misiune-viziune", element: <MissionVision />, handle: { breadcrumbKey: "about.missionVision" } },
          { path: "echipa", element: <Echipa />, handle: { breadcrumbKey: "about.team" } },
        ],
      },

      // EDUCATIE
      {
        path: "educatie",
        element: (
          <PageLayout
            heroImage="/images/home/hero-curriculum.jpg"
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
            heroImage="/images/home/hero-informatii.jpg"
            heroTitleKey="information.sectionTitle"
            sidebarItems={[
              { path: "/informatii/admitere", labelKey: "info.admission.title" },
              { path: "/informatii/documente", labelKey: "info.documents" },
              { path: "/informatii/structura-anului-scolar", labelKey: "info.structure" },
            ]}
          />
        ),
        handle: { breadcrumbKey: "information.sectionTitle" },
        children: [
          { path: "admitere", element: <Admitere />, handle: { breadcrumbKey: "info.admission.title" } },
          { path: "documente", element: <Documente />, handle: { breadcrumbKey: "info.documents" } },
          { path: "structura-anului-scolar", element: <StructuraAnului />, handle: { breadcrumbKey: "info.structure" } },
        ],
      },

      // EVENIMENTE (same banner + section sidebar as Galerie Foto)
      {
        path: "evenimente",
        element: (
          <PageLayout
            heroImage="/images/home/hero-events.jpg"
            heroTitleKey="events.sectionTitle"
            sidebarItems={evenimenteSidebarItems}
          />
        ),
        handle: { breadcrumbKey: "events.sectionTitle" },
        children: [
          { index: true, element: <Events />, handle: { breadcrumbKey: "events.sectionTitle" } },
          { path: ":id", element: <EventDetails />, handle: { breadcrumbKey: "events.details" } },
        ],
      },

      // GALERIE FOTO (same banner + section sidebar as Evenimente)
      {
        path: "galerie-foto",
        element: (
          <PageLayout
            heroImage="/images/home/hero-events.jpg"
            heroTitleKey="events.sectionTitle"
            sidebarItems={evenimenteSidebarItems}
          />
        ),
        handle: { breadcrumbKey: "galerieFoto.pageTitle" },
        children: [
          { index: true, element: <GalerieFoto />, handle: { breadcrumbKey: "galerieFoto.pageTitle" } },
        ],
      },
    ],
  },

  // ADMIN: single /admin route with nested children; login is public, rest protected by AdminAuthGuard
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> },
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminAuthGuard><Dashboard /></AdminAuthGuard> },
      { path: "documents", element: <AdminAuthGuard><DocumentsList /></AdminAuthGuard> },
      { path: "events", element: <AdminAuthGuard><EventsList /></AdminAuthGuard> },
      { path: "events/create", element: <AdminAuthGuard><CreateEvent /></AdminAuthGuard> },
      { path: "events/edit/:id", element: <AdminAuthGuard><EditEvent /></AdminAuthGuard> },
      { path: "gallery", element: <AdminAuthGuard><GalleryList /></AdminAuthGuard> },
      { path: "gallery/:albumId", element: <AdminAuthGuard><AlbumPhotos /></AdminAuthGuard> },
      { path: "team", element: <AdminAuthGuard><TeamAdmin /></AdminAuthGuard> },
    ],
  },

  // Fallback: unknown routes show NotFound (no redirect so SPA can load on Vercel)
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;