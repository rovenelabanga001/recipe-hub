<script setup>
const { getPopularRecipes } = useSpoonacular();

const { data: recipes, error } = await useAsyncData("popularRecipes", () =>
  getPopularRecipes(4)
);
watchEffect(() => {
  if (error.value) {
    console.error("Error fetching recipes:", error.value);
  }
  if (recipes.value) {
    console.log("Recipes loaded:", recipes.value);
  }
});
</script>
<template>
  <div class="max-w-7xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Popular recipes</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <img
          :src="recipe.image"
          :alt="recipe.title"
          class="w-full h-full object-cover"
        />
        <!-- Gradient overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        ></div>
        <!-- Action Buttons visible on hover-->
        <div
          class="absolute top-3 right-5 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            class="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
          >
            <IconsFavorite />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
