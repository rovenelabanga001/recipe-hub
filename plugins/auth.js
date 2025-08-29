export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  if (process.server) {
    // SSR: cookies available in server request
    const data = await $fetch("/api/auth/me", {
      headers: useRequestHeaders(["cookie"]), // 🔹 forward cookies to internal call
    });
    auth.user = data.user || null;
  } else {
    // Client-side
    await auth.restoreSession();
  }
});
