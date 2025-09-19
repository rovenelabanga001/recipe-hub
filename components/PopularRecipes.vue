<script setup>
const { $authApi } = useNuxtApp();

const { data: popularRecipes } = await useAsyncData("popularRecipes", async() =>{
  const res = await $authApi("/recipes/popular")
  return res.data
}
);
</script>
<template>
  <div class="max-w-7xl mx-auto py-8">
    <h2 class="md:text-2xl font-bold text-gray-900 mb-6 text-lg">
      Popular recipes
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RecipeCard :recipes="popularRecipes" />
    </div>
  </div>
</template>
