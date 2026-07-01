import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#f6f9ea",
          100: "#ecf3d2",
          200: "#d9e7aa",
          300: "#bdd87c",
          400: "#9dc550",
          500: "#7ca236",
          600: "#67882d",
          700: "#516b24",
          800: "#3d511c",
          900: "#2d3d15",
          950: "#1b250d",
        },
        brand: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
