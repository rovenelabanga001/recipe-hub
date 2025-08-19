export const useSafeFetch = async (
  url,
  options = {},
  errorMessage = "Something Went Wrong, Try Again Later"
) => {
  const { handleError } = useErrorHandler();

  const { data, pending, error } = await useFetch(url, {
    key: options.key || url, //ensures unique key to prevent clashes
    ...options,
  });

  if (error.value) {
    handleError(error.value, errorMessage);
  }

  return { data, pending, error };
};
