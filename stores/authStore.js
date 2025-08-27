import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useFetch } from "#app";

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
        await useFetch("/api/auth/logout", { method: "POST" });
      } catch (err) {
        console.error("Logout failed", err);
      }

      this.user = null;
      const router = useRouter();
      router.push("/auth/signin");
    },

    async restoreSession() {
      const data = await useFetch("/api/auth/me");
      this.user = data.value.user || null;
    },
  },
});
