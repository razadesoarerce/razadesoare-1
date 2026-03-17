import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MobileAlbumProvider } from "./context/MobileAlbumContext";
import router from "./app/router";

import "./i18n";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MobileAlbumProvider>
        <RouterProvider router={router} />
      </MobileAlbumProvider>
    </AuthProvider>
  </React.StrictMode>
);
