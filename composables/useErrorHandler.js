export const useErrorHandler = () => {
  const handleError = (error, customMessage) => {
    if (error) {
      showError({
        statusMessage: customMessage,
      });
    }
  };

  return { handleError };
};
