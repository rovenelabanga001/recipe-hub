<script setup>
const auth = useAuthStore();
const config = useRuntimeConfig();

const hideText = ref(false);

const { data: user } = await useSafeFetch(
  `${config.public.baseUrl}/users/${auth.user?.id}`
);

const favoriteRecipeIds = user.value?.favoriteRecipeIds || [];

const { data: allRecipes } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  { key: "all-recipes" }
);

const favoriteRecipes = computed(() => {
  if (!allRecipes.value || !favoriteRecipeIds.length) return [];

  return [...favoriteRecipeIds]
    .reverse()
    .map((id) => allRecipes.value.find((recipe) => recipe.id === id))
    .filter(Boolean);
});

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
