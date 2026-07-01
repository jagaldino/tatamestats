import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "favicon.svg",
                "icons/icon-192.svg",
                "icons/icon-512.svg",
                "icons/icon-maskable.svg",
            ],
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,svg,png,webp,woff2}"],
                navigateFallback: "/index.html",
                runtimeCaching: [
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return request.destination === "document";
                        },
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "tatamestats-pages",
                            networkTimeoutSeconds: 3,
                        },
                    },
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return ["style", "script", "worker"].includes(request.destination);
                        },
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "tatamestats-assets",
                        },
                    },
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return request.destination === "image";
                        },
                        handler: "CacheFirst",
                        options: {
                            cacheName: "tatamestats-images",
                        },
                    },
                ],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
