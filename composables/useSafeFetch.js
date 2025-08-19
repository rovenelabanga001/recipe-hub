export const useSafeFetch = async (url, options = {}, errorMessage) => {
  const { handleError } = useErrorHandler();

  const { data, pending, error } = await useFetch(url, options);

  if (error.value) {
    handleError(error.value, errorMessage);
  }

  return { data, pending, error };
};
