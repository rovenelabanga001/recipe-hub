<script setup>
const config = useRuntimeConfig();

const { data: popularRecipes } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {
    key: "popular-recipes",
    transform: (popularRecipes) => popularRecipes.slice(-4),
  },
  "Server is down, Please Try Again Later"
);
</script>
<template>
  <div class="max-w-7xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Popular recipes</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RecipeCard :recipes="popularRecipes" />
    </div>
  </div>
</template>
