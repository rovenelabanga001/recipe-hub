<script setup>
const { $authApi } = useNuxtApp();
const auth = useAuthStore();

const hideText = ref(false);

const { data: favoriteRecipes } = await useAsyncData(
  `${auth.user?.username}-recipes`,
  async () => {
    const res = await $authApi("users/favorites");
    return res.data;
  }
);
</script>
<template>
  <div v-if="favoriteRecipes.length >= 1" class="space-y-4">
    <h5>Showing favorite recipes</h5>
    <div
      v-for="recipe in favoriteRecipes"
      class="bg-white shadow rounded-xl p-4"
    >
      <profile-page-tab-card :recipe="recipe" :show-user-info="hideText" />
    </div>
  </div>
  <empty-placeholder
    v-else
    message="No favorites yet."
    instructions="Explore and share to get started"
    btn-txt="Explore recipes"
    route="/recipes"
  />
</template>
