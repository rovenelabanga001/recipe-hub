// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.API_BASE || "http://localhost:5000",
    public: {
      spoonacularBaseUrl: "https://api.spoonacular.com",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["@/assets/css/main.css"],
});
