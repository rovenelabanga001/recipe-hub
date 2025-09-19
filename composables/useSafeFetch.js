export const useSafeFetch = async (
  url,
  options = {},
  fallbackMessage = "Something Went Wrong, Try Again Later"
) => {
  const { handleError } = useErrorHandler();
  const { $authApi } = useNuxtApp(); // use your auth-aware fetch

  let data = ref(null);
  let pending = ref(true);
  let error = ref(null);

  try {
    const res = await $authApi(url, options);
    data.value = res.data ?? res; // in case your API returns { data }
  } catch (err) {
    error.value = err;
    const message = err?.message || err?.statusMessage || fallbackMessage;
    handleError(err, message);
  } finally {
    pending.value = false;
  }

  return { data, pending, error };
};
