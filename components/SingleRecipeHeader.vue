<script setup>
const props = defineProps(["recipe"]);

const config = useRuntimeConfig();
const auth = useAuthStore();

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});
const isFavorite = computed(() =>
  auth.user?.favoriteRecipeIds?.includes(props.recipe.id)
);

const toggleFavorite = async () => {
  if (!auth.user?.id) return;

  let updatedFavorites = [...(auth.user.favoriteRecipeIds || [])];
  const isCurrentlyFavorite = isFavorite.value;

  if (isCurrentlyFavorite) {
    updatedFavorites = updatedFavorites.filter((id) => id !== props.recipe.id);
  } else {
    updatedFavorites.push(props.recipe.id);
  }

  try {
    // Update user favorites
    const updatedUser = await $fetch(
      `${config.public.baseUrl}/users/${auth.user?.id}`,
      {
        method: "PATCH",
        body: { favoriteRecipeIds: updatedFavorites },
      }
    );

    auth.user = updatedUser;

    // If favoriting (not unfavoriting), create notification
    if (!isCurrentlyFavorite) {
      const recipe = await $fetch(
        `${config.public.baseUrl}/recipes/${props.recipe.id}`,
        { baseURL: config.public.baseUrl }
      );

      if (recipe.userID !== auth.user.id) {
        await $fetch("/notifications", {
          baseURL: config.public.baseUrl,
          method: "POST",
          body: {
            userId: recipe.userID,
            type: "favorite",
            user: auth.user.username,
            message: `${auth.user.username} liked your recipe "${recipe.title}"`,
            recipeId: props.recipe.id,
            createdAt: new Date().toISOString(),
            read: false,
          },
        });
      }
    }
  } catch (error) {
    console.error("Failed to update favorites", error);
  }
};
</script>
<template>
  <div class="flex justify-between items-start w-[100%] md:w[50%]">
    <h3 class="font-bold text-2xl">{{ recipe.name }}</h3>
    <button class="cursor-pointer" @click="toggleFavorite">
      <template v-if="mounted">
        <IconsFavorite color="orangered" class="size-5" v-if="!isFavorite" />
        <IconsLiked color="red" v-else />
      </template>
    </button>
  </div>
  <ul class="flex gap-3">
    <li
      v-for="tag in recipe.tags"
      :key="tag"
      class="bg-gray-200 rounded-lg px-2 py-1 text-xs"
    >
      {{ tag }}
    </li>
  </ul>
</template>
