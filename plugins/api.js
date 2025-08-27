export default defineNuxtPlugin(() => {
  const apiFetch = async (url, options = {}) => {
    try {
      return await $fetch(url, {
        baseURL: "/api",
        credentials: "include",
        ...options,
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    provide: {
      api: apiFetch,
    },
  };
});
