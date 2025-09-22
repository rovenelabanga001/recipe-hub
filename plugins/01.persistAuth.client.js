export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  const saved = localStorage.getItem("authStore");
  if (saved) {
    const parsed = JSON.parse(saved);
    auth.$patch({
      user: parsed.user ? { ...parsed.user } : null,
      token: parsed.token || null,
      signUpData: parsed.signUpData || { email: "" },
    });
  }

  if (!auth.user) {
    await auth.restoreSession();
  }

  watch(
    auth.$state,
    (state) => {
      localStorage.setItem("authStore", JSON.stringify(state));
    },
    { deep: true }
  );
});
