export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  if (process.server) {
    try {
      const data = await $fetch("/api/auth/me", {
        headers: useRequestHeaders(["cookie"]),
      });
      auth.user = data.user || null;
      auth.token = data.token || null; 
    } catch (err) {
      console.error("[Auth SSR Init] Failed:", err);
      auth.user = null;
      auth.token = null;
    }
  } else {
    await auth.restoreSession();
  }
});
