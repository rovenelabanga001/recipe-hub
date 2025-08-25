<script setup>
const props = defineProps({
  recipes: Array,
});

const showTags = ref(false);

</script>
<template>
  <h6 class="md:text-2xl text-lg font-bold text-gray-900 self-start">
    Recipes
  </h6>
  <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
    <RecipeCard
      :recipes="recipes"
      :show-tags="showTags"
      text-attributes="lg:text-xs md:text-xs text-xs "
      card-class="max-h-[200px]"
    />
  </div>
</template>
