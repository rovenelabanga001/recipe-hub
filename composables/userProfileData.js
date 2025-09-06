export function useProfileData() {
  const auth = useAuthStore();
  const config = useRuntimeConfig();
  const route = useRoute();

  const rawUsername = computed(() =>
    route.path === "/profile" ? auth.user?.username : route.params.name
  );

  // ✅ Fetch user
  const {
    data: user,
    pending: userPending,
    error: userError,
  } = useAsyncData(
    () => `user-${rawUsername.value || "self"}`,
    async () => {
      if (!rawUsername.value) return null;

      const foundUser = await $fetch(
        `${config.public.baseUrl}/users?username=${rawUsername.value}`
      );

      if (!foundUser || foundUser.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: `User ${rawUsername.value} not found`,
        });
      }

      return foundUser[0];
    },
    { watch: [rawUsername], default: () => null }
  );

  // ✅ Fetch recipes
  const { data: recipes, pending: recipesPending } = useAsyncData(
    () => `recipes-${user.value?.id}`,
    async () => {
      if (!user.value?.id) return [];
      return await $fetch(`${config.public.baseUrl}/recipes`, {
        query: { userID: Number(user.value.id) },
      });
    },
    {
      watch: [user],
      default: () => [],
      enabled: computed(() => Boolean(user.value?.id)),
    }
  );

  const totalPosts = computed(() => recipes.value?.length || 0);

  return { user, recipes, totalPosts, userPending, recipesPending, userError };
}
