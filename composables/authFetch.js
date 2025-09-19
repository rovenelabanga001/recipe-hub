
export const useAuthFetch = () => {
  const authStore = useAuthStore();
  
  const authFetch = async (url, options = {}) => {
    if (!authStore.token) {
      throw new Error('No authentication token available');
    }
    
    return await $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${authStore.token}`
      }
    });
  };
  
  return { authFetch };
};