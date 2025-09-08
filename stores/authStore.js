import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    signUpData: {
      email: "",
      password: "",
    },
  }),
  getters: {
    isLoggedin: (state) => !!state.user,
  },
  actions: {
    async logout() {
      try {
        await $fetch("/api/auth/logout", { method: "POST" });

        this.user = null;
        localStorage.removeItem("authStore");
        navigateTo("/auth/signin");
      } catch (err) {
        console.error("Logout failed", err);
      }
    },

    async restoreSession() {
      try {
        const data = await $fetch("/api/auth/me", {
          credentials: "include",
        });
        this.user = data.user || null;
      } catch {
        this.user = null;
      }
    },
    setSignUpData(data) {
      this.signUpData = data;
    },
    clearSignUpData(data) {
      this.signUpData = { email: "", password: "" };
    },
  },
});
