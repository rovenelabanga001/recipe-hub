export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();

  const saved = localStorage.getItem("authStore");
  if (saved) {
    auth.$patch(JSON.parse(saved));
  }

  watch(
    auth.$state,
    (state) => {
      localStorage.setItem("authStore", JSON.stringify(state));
    },
    { deep: true }
  );
});
