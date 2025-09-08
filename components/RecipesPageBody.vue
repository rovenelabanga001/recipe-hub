<script setup>
const props = defineProps({
  recipes: Array,
});

const categoryStore = useRecipeCategoryStore();

const showTags = ref(false);
</script>
<template>
  <h6 class="md:text-2xl text-lg font-bold text-gray-900 self-start mb-4">
    Showing "{{ categoryStore.selectedCategory }}" Recipes
  </h6>
  <div class="grid grid-cols-2 gap-3 md:grid-cols-4 w-full">
    <RecipeCard
      :recipes="recipes"
      :show-tags="showTags"
      text-attributes="lg:text-xs md:text-xs text-xs "
      card-class="max-h-[200px]"
    />
  </div>
</template>
