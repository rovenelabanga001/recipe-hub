export const useErrorHandler = () => {
  const handleError = (error, customMessage) => {
    if (error) {
      showError({
        statusMessage: customMessage || "Something went wrong, try again later",
      });
    }
  };

  return { handleError };
};
