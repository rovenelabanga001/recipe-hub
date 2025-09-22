// stores/auth.js
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    signUpData: { email: "" },
    token: null,
  }),
  getters: {
    isLoggedin: (state) => !!state.user,
    favoriteRecipeIds: (state) => state.user?.favoriteRecipeIds || [],
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    async logout() {
      try {
        await $fetch(`${useRuntimeConfig().public.baseUrl}/signout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          credentials: "include",
        });

        await $fetch("/api/auth/logout", { method: "POST" });
      } catch (err) {
        console.error("Logout failed", err);
      } finally {
        this.user = null;
        this.token = null;
        this.signUpData = { email: "" };

        navigateTo("/auth/signin");
      }
    },
    async restoreSession() {
      try {
        const data = await $fetch("/api/auth/me");
        if (data && data.user) {
          this.user = data.user;
          this.token = data.token;
        } else {
          this.user = null;
        }
      } catch {
        this.user = null;
      }
    },

    setSignUpData(data) {
      this.signUpData = data;
    },

    clearSignUpData() {
      this.signUpData = { email: "" };
    },
  },
});
