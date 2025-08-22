// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.API_BASE || "http://localhost:5000",
    public: {
      baseUrl: process.env.API_BASE,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["@/assets/css/main.css", "swiper/swiper-bundle.css"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Space Grotesk": [300, 400, 500, 600, 700], // font weights you need
    },
    display: "swap", // ensures text shows immediately
    preconnect: true, // preconnects to fonts.googleapis.com & fonts.gstatic.com
    download: true, // downloads and serves fonts locally (faster load)
    inject: true, // automatically injects into your <head>
  },
});
