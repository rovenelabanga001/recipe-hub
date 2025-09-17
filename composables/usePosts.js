export const usePosts = () => {
  return useAsyncData("posts", () =>
    $fetch("/recipes", { baseURL: useRuntimeConfig().public.baseUrl })
  );
};
