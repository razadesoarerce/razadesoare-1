/**
 * Public site is the former preview.
 * Old public URLs redirect here so existing Google results keep a destination.
 * Admin stays at /admin.
 */
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import AdminLayout from "../components/layout/AdminLayout";
import AdminAuthGuard from "../components/common/AdminAuthGuard";
import RedirectIfAuthenticated from "../components/common/RedirectIfAuthenticated";

import HomePreview from "../pages/public/HomePreview/HomePreview";
import DespreNoi from "../pages/public/HomePreview/DespreNoi";
import EchipaNoastra from "../pages/public/HomePreview/EchipaNoastra";
import Informatii from "../pages/public/HomePreview/Informatii";
import GalerieFoto from "../pages/public/HomePreview/GalerieFoto";
import GalerieAlbum from "../pages/public/HomePreview/GalerieAlbum";
import NotFound from "../pages/public/NotFound";

import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/admin/Login";
import EventsList from "../pages/admin/events/EventsList";
import CreateEvent from "../pages/admin/events/CreateEvent";
import EditEvent from "../pages/admin/events/EditEvent";
import DocumentsList from "../pages/admin/documents/DocumentsList";
import GalleryList from "../pages/admin/gallery/GalleryList";
import AlbumPhotos from "../pages/admin/gallery/AlbumPhotos";
import TeamAdmin from "../pages/admin/team/TeamAdmin";

/** Maps retired public and /preview URLs onto the current pages. */
const LegacyRedirect = () => {
  const { pathname } = useLocation();
  let to = "/";

  if (pathname === "/preview" || pathname === "/preview/test" || pathname === "/preview/blog") {
    to = "/";
  } else if (pathname.startsWith("/preview/")) {
    to = pathname.slice("/preview".length) || "/";
  } else if (pathname === "/despre/echipa" || pathname.startsWith("/despre/echipa/")) {
    to = "/echipa-noastra";
  } else if (pathname === "/despre" || pathname.startsWith("/despre/")) {
    to = "/despre-noi";
  } else if (pathname === "/educatie" || pathname.startsWith("/educatie/")) {
    to = "/";
  } else if (pathname.startsWith("/informatii/")) {
    to = "/informatii";
  } else if (pathname === "/evenimente" || pathname.startsWith("/evenimente/")) {
    to = "/";
  }

  return <Navigate to={to} replace />;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePreview /> },
      { path: "despre-noi", element: <DespreNoi /> },
      { path: "echipa-noastra", element: <EchipaNoastra /> },
      { path: "informatii", element: <Informatii /> },
      { path: "galerie-foto", element: <GalerieFoto /> },
      { path: "galerie-foto/:albumId", element: <GalerieAlbum /> },

      { path: "preview", element: <LegacyRedirect /> },
      { path: "preview/*", element: <LegacyRedirect /> },
      { path: "despre", element: <LegacyRedirect /> },
      { path: "despre/*", element: <LegacyRedirect /> },
      { path: "educatie", element: <LegacyRedirect /> },
      { path: "educatie/*", element: <LegacyRedirect /> },
      { path: "informatii/*", element: <LegacyRedirect /> },
      { path: "evenimente", element: <LegacyRedirect /> },
      { path: "evenimente/*", element: <LegacyRedirect /> },

      {
        path: "admin",
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

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
