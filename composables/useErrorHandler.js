export const useErrorHandler = () => {
  const handleError = (error, customMessage) => {
    if (error) {
      showError({
        statusMessage: "Something went wrong, try again later",
      });
    }
  };

  return { handleError };
};
