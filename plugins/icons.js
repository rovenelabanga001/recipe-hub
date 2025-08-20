import { defineNuxtPlugin } from "#app";
import * as Icons from "@kalimahapps/vue-icons";

export default defineNuxtPlugin((nuxtApp) => {
  for (const [name, component] of Object.entries(Icons)) {
    nuxtApp.vueApp.component(name, component);
  }
});
