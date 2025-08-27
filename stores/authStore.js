import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  getters: {
    isLoggedin: (state) => !!state.user,
  },
  actions: {
    setUser(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },

    logout() {
      const router = useRouter();
      this.user = null;
      localStorage.removeItem("user");
      router.push("/auth/signin");
    },

    restoreSession() {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) this.user = savedUser;
    },
  },
});
