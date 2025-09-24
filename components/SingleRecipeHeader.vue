<script setup>
const props = defineProps(["recipe"]);
const { $authApi } = useNuxtApp();

const mounted = ref(false);
const isFavorite = ref(false);
const isLiked = ref(false);
const userFavorites = ref([]);
const animateLike = ref(false);
const animateFavorite = ref(false);
const localRecipe = reactive({
  id: props.recipe.id,
  name: props.recipe.name,
  tags: props.recipe.tags ?? [],
  likesCount: Number(props.recipe.likesCount) || 0,
});
onMounted(async () => {
  mounted.value = true;

  try {
    // Fetch user info including favorites
    const data = await $authApi("/users/me");
    userFavorites.value = data.favoriteRecipeIds || [];

    // Set initial states
    isFavorite.value = userFavorites.value.includes(props.recipe.id);
    isLiked.value = props.recipe.likedBy?.includes(data.id);
  } catch (err) {
    console.error("Failed to load initial states", err);
  }
});

const toggleFavorite = async () => {
  try {
    const data = await $authApi(`/recipes/${props.recipe.id}/favorite`, {
      method: "POST",
    });

    // Update local state based on backend response
    isFavorite.value = data.favorited;
    userFavorites.value = data.favorites;
    animateFavorite.value = true;
    setTimeout(() => (animateFavorite.value = false), 1500);
  } catch (err) {
    console.error("Failed to toggle favorite", err);
  }
};

const toggleLike = async () => {
  const prevLiked = isLiked.value;
  const prevLikes = localRecipe.likesCount;

  if (isLiked.value) {
    isLiked.value = false;
    localRecipe.likesCount--;
  } else {
    isLiked.value = true;
    localRecipe.likesCount++;

    animateLike.value = true;
    setTimeout(() => (animateLike.value = false), 1500);
  }
  try {
    const data = await $authApi(`/recipes/${props.recipe.id}/like`, {
      method: "POST",
    });
    isLiked.value = data.liked;
    localRecipe.likesCount = data.likesCount ?? localRecipe.likesCount;
  } catch (error) {
    console.error("Failed to toggle like", error);
    isLiked.value = prevLiked;
    localRecipe.likesCount = prevLikes;
  }
};
</script>

<template>
  <div
    class="flex justify-between items-start w-[100%] md:w[50%]"
    v-if="recipe"
  >
    <h3 class="font-bold text-2xl">{{ recipe?.name }}</h3>

    <div class="flex gap-3 items-start justiy-center pt-3">
      <div class="flex flex-col items-center min-w-[24px]">
        <button class="cursor-pointer" @click="toggleLike">
          <template v-if="mounted">
            <IconsLiked
              v-show="isLiked"
              color="red"
              class="text-2xl"
              :class="{ 'animate-bounce-once': animateLike }"
            />
            <IconsFavorite
              v-show="!isLiked"
              color="orangered"
              class="text-2xl"
            />
          </template>
        </button>

        <p class="text-xs text-gray-500 min-h-[1rem]">
          {{ localRecipe.likesCount }}
        </p>
      </div>
      <button @click="toggleFavorite">
        <template v-if="mounted">
          <IconsBookMarked
            v-show="isFavorite"
            color="red"
            class="text-2xl"
            :class="{ 'animate-bounce-once': animateFavorite }"
          />
          <IconsBookMark
            v-show="!isFavorite"
            color="orangered"
            class="text-2xl"
          />
        </template>
      </button>
    </div>
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
<style scoped>
@keyframes bounce-once {
  0%,
  100% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.4);
  }
  60% {
    transform: scale(0.9);
  }
}
.animate-bounce-once {
  animation: bounce-once 0.6s ease forwards;
  transform-origin: center;
}
</style>
