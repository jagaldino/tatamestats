import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProviders } from "@/app/providers/AppProviders";
import { router } from "@/app/router";
import { PwaInstallPrompt } from "@/app/pwa/PwaInstallPrompt";
import "@/app/styles/globals.css";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
      <PwaInstallPrompt />
    </AppProviders>
  </React.StrictMode>,
);
