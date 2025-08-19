import { createError } from "#app";
export const usePopularRecipes = () => {
  const config = useRuntimeConfig();

  const {
    data: popularRecipes,
    pending,
    error,
    refresh,
  } = useFetch(`${config.public.baseUrl}/recipes`, {
    transform: (recipes) => recipes.slice(-4),
    onError(err) {
      throw createError({
        statusCode: err?.statusCode || 500,
        statusMessage: "Failed to fetch recipes",
      });
    },
  });

  return {
    popularRecipes,
    pending,
    error,
    refresh,
  };
};
