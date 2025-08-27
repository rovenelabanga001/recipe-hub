export const useAuth = () => {
  const { $api } = useNuxtApp();

  const login = async (email, password) => {
    try {
      return await $api("auth/login", {
        method: "POST",
        body: { email, password },
      });
    } catch (error) {
      console.error("Login error", error);
      return {
        success: false,
        message: "Network or server error",
      };
    }
  };

  return { login };
};
