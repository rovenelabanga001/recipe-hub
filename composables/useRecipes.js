import { createError } from "#app";

export const useRecipes = () => {
  const config = useRuntimeConfig();

  const {
    data: recipes,
    pending,
    error,
    refresh,
  } = useFetch(`${config.public.baseUrl}/recipes`, {
    onError(err) {
      throw createError({
        statusCode: err.statusCode || 500,
        statusMessage: "Failed to fetch recipes",
      });
    },
  });

  return { recipes, pending, error, refresh };
};
