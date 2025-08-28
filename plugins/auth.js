// plugins/auth.ts
export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  try {
    const { user } = await $fetch("/api/auth/me", {
      headers: useRequestHeaders(["cookie"]),
    });
    auth.user = user;
  } catch {
    auth.user = null;
  }
});
