export const useSpoonacular = () => {
  const getPopularRecipes = async (number = 4) => {
    return await $fetch("/api/recipes/popular");
  };

  return { getPopularRecipes };
};
