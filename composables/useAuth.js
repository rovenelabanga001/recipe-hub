export const useAuth = () => {
  const { $api } = useNuxtApp();

  const login = async (email, password) => {
    try {
     const response = await $api("auth/login", {
        method: "POST",
        body: { email, password },
      });

      return response

    } catch (error) {
      return {
        success: false,
        message: "Network or server error",
      };
    }
  };

  return { login };
};
