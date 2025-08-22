export const useSafeFetch = async (
  url,
  options = {},
  fallbackMessage = "Something Went Wrong, Try Again Later"
) => {
  const { handleError } = useErrorHandler();

  const { data, pending, error } = await useFetch(url, {
    key: options.key || url, //ensures unique key to prevent clashes
    ...options,
  });

  if (error.value) {
    const message =
      error.value?.message || error.value?.statusMessage || fallbackMessage;
    handleError(error.value, fallbackMessage);
  }

  return { data, pending, error };
};
