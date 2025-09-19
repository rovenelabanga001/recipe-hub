export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();

  const authApi = $fetch.create({
    baseURL: config.public.baseUrl,
    onRequest({ options }) {
      if (auth.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.token}`,
        };
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout();
      }
    },
  });

  return {
    provide: {
      authApi,
    },
  };
});
