import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedin: (state) => !!state.user,
  },
  actions: {
    async logout() {
      try {
        await $fetch("/api/auth/logout", { method: "POST" });

        this.user = null;
        navigateTo("/auth/signin");
      } catch (err) {
        console.error("Logout failed", err);
      }
    },

    async restoreSession() {
      const data = await $fetch("/api/auth/me");
      this.user = data.value.user || null;
    },
  },
});
