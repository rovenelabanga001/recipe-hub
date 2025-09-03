<script setup>
const props = defineProps({
  comment: Object,
});

const config = useRuntimeConfig();
const auth = useAuthStore();

const recipe = ref(null);
const user = ref(null);

onMounted(async () => {
  try {
    // 1️⃣ Fetch the recipe using the comment.recipeId
    recipe.value = await $fetch(
      `${config.public.baseUrl}/recipes/${props.comment.recipeId}`
    );

    // 2️⃣ Fetch the user who owns the recipe
    if (recipe.value?.userID) {
      user.value = await $fetch(
        `${config.public.baseUrl}/users/${recipe.value.userID}`
      );
    }
  } catch (error) {
    console.error("Failed to fetch recipe or user:", error);
  }
});
</script>
<template>
  <!-- <h3 class="font-bold">💬 Comment</h3> -->
  <p v-if="user" class="italic text-sm text-gray-500">
    You commented on
    <span v-if="user.username === auth.user?.username" class="font-semibold">
      your recipe
    </span>
    <span v-else>
      a recipe by <span class="font-semibold">{{ user.username }}</span>
    </span>
  </p>

  <p class="text-gray-600 font-bold">{{ comment.body }}</p>
  <button
    @click="navigateTo(`/recipes/${comment.recipeId}?commentId=${comment.id}`)"
    class="mt-2 text-[orangered] w-[auto] text-start text-sm px-1 py-1 rounded-lg bg-none cursor-pointer"
  >
    See Comment
  </button>
</template>
