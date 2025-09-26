// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.API_BASE,
    public: {
      baseUrl: process.env.API_BASE,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["@/assets/css/main.css", "swiper/swiper-bundle.css"],
  modules: [
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-toastify",
    "@nuxt/image-edge",
  ],
  toastify: {
    autoClose: 2000,
    position: "top-right",
    theme: "auto",
  },
  googleFonts: {
    families: {
      "Space Grotesk": [300, 400, 500, 600, 700], // font weights you need
    },
    display: "swap", // ensures text shows immediately
    preconnect: true, // preconnects to fonts.googleapis.com & fonts.gstatic.com
    download: true, // downloads and serves fonts locally (faster load)
    inject: true, // automatically injects into your <head>
  },
  ssr:false,
  // nitro: {
  //   routeRules: {
  //     "/api/**": {
  //       // applies to all API routes
  //       cors: true, // enable CORS headers
  //       headers: {
  //         "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  //         "Access-Control-Allow-Credentials": "true",
  //       },
  //     },
  //   },
  // },
});
