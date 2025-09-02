<script setup>
const props = defineProps({
  recipes: Array,
  showTags: {
    type: Boolean,
    default: true,
  },
  cardClass: {
    type: String,
  },
  textAttributes: {
    type: String,
  },
});
const goToSingleRecipe = (recipeId) => {
  navigateTo(`/recipes/${recipeId}`);
};
</script>
<template>
  <div
    v-for="recipe in recipes"
    :key="recipe.id"
    :class="[
      'h-48 sm:h-64 md:h-80 lg:h-96 relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300',
      cardClass,
    ]"
    @click="goToSingleRecipe(recipe.id)"
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
      <!-- <button
        class="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
      >
        <IconsFavorite color="orangered" />
      </button> -->
    </div>
    <!--Recipe Content-->
    <div class="absolute bottom-0 left-0 right-0 p-4">
      <h3
        :class="[
          'text-white font-semibold text-xs mb-2 md:text-lg',
          textAttributes,
        ]"
      >
        {{ recipe.name }}
      </h3>
      <!--Tags-->
      <div v-if="showTags" class="flex flex-wrap gap-2">
        <span
          v-for="tag in recipe.tags"
          :key="tag"
          class="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium"
          >{{ tag }}</span
        >
      </div>
    </div>
  </div>
</template>
