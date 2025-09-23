<script setup>
const props = defineProps(["recipe"]);
const { $authApi } = useNuxtApp();

const mounted = ref(false);
const isFavorite = ref(false);
const isLiked = ref(false);
const userFavorites = ref([]);

const localRecipe = reactive({ ...props.recipe });
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
  } catch (err) {
    console.error("Failed to toggle favorite", err);
  }
};

const toggleLike = async () => {
  const prevLiked = isLiked.value;
  const prevLikes = props.recipe.likesCount;

  if (isLiked.value) {
    isLiked.value = false;
    props.recipe.likesCount--;
  } else {
    isLiked.value = true;
    props.recipe.likesCount++;
  }
  try {
    const data = await $authApi(`/recipes/${props.recipe.id}/like`, {
      method: "POST",
    });
    isLiked.value = data.liked;
    localRecipe.likesCount = data.likesCount;
  } catch (error) {
    console.error("Failed to toggle like", error);
    isLiked.value = prevLiked;
    props.recipe.likesCount = prevLikes;
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
      <div class="flex flex-col items-center">
        <button class="cursor-pointer" @click="toggleLike">
          <template v-if="mounted">
            <IconsLiked v-if="isLiked" color="red" class="text-2xl" />
            <IconsFavorite v-else color="orangered" class="text-2xl" />
          </template>
        </button>

        <!-- <p v-if="localRecipe.likesCount >= 1" class="text-xs text-gray-500">
          {{ localRecipe.likesCount }}
        </p> -->
      </div>
      <button @click="toggleFavorite">
        <template v-if="mounted">
          <IconsBookMarked v-if="isFavorite" color="red" class="text-2xl" />
          <IconsBookMark v-else color="orangered" class="text-2xl" />
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
