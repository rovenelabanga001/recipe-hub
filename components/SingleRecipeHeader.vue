<script setup>
const props = defineProps(["recipe"]);

const {$authApi} = useNuxtApp()
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

  try {
    const res = await $authApi(`/users/favorites/${props.recipe.id}`, {
      method: "POST",
    });

    // The backend returns the updated user and favorited status
    auth.user = res.data;

    // Optional: update local recipe favorite count if you track it
    if (props.recipe) {
      props.recipe.favoriteCount = res.favorited
        ? (props.recipe.favoriteCount || 0) + 1
        : Math.max(0, (props.recipe.favoriteCount || 0) - 1);
    }

  } catch (error) {
    console.error("Failed to toggle favorite", error);
  }
};

</script>
<template>
  <div class="flex justify-between items-start w-[100%] md:w[50%]" v-if="recipe">
    <h3 class="font-bold text-2xl">{{ recipe?.name }}</h3>
    <button class="cursor-pointer" @click="toggleFavorite">
      <template v-if="mounted">
        <IconsFavorite color="orangered" class="size-5" v-if="!isFavorite" />
        <IconsLiked color="red" v-else />
      </template>
    </button>
  </div>
  <ul class="flex gap-3">
    <li
      v-for="tag in recipe?.tags"
      :key="tag"
      class="bg-gray-200 rounded-lg px-2 py-1 text-xs"
    >
      {{ tag }}
    </li>
  </ul>
</template>
