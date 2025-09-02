<script setup>
const props = defineProps(["recipe"]);

const config = useRuntimeConfig();
const auth = useAuthStore();

const isFavorite = computed(() =>
  auth.user?.favoriteRecipeIds?.includes(props.recipe.id)
);

const toggleFavorite = async () => {
  if (!auth.user?.id) return;

  let updatedFavorites = [...(auth.user.favoriteRecipeIds || [])];

  if (isFavorite.value) {
    updatedFavorites = updatedFavorites.filter((id) => id !== props.recipe.id);
  } else {
    updatedFavorites.push(props.recipe.id);
  }

  try {
    const updatedUser = await $fetch(
      `${config.public.baseUrl}/users/${auth.user?.id}`,
      {
        method: "PATCH",
        body: { favoriteRecipeIds: updatedFavorites },
      }
    );

    auth.user = updatedUser;
  } catch (error) {
    console.error("Failed to update favorites", error);
  }
};
</script>
<template>
  <div class="flex justify-between items-start w-[100%] md:w[50%]">
    <h3 class="font-bold text-2xl">{{ recipe.name }}</h3>
    <button class="cursor-pointer" @click="toggleFavorite">
      <IconsFavorite color="orangered" class="size-5" v-if="!isFavorite" />
      <IconsLiked color="red" v-else />
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
