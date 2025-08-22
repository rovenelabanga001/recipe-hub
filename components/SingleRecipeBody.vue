<script setup>
const props = defineProps({
  recipe: Object,
});
</script>
<template>
  <div>
    <h3 class="font-bold text-lg">Details</h3>
    <ol class="list-disc list-inside">
      <li>prep time:{{ recipe.prepTime }}</li>
      <li>cook time: {{ recipe.cookTime }}</li>
      <li>servings: {{ recipe.servings }}</li>
    </ol>
  </div>
  <div>
    <h3 class="font-bold text-lg">Ingredients</h3>
    <ol class="list-disc list-inside">
      <li v-for="ingredient in recipe.ingredients">
        {{ ingredient }}
      </li>
    </ol>
  </div>
  <div>
    <h3 class="font-bold text-lg">Directions</h3>
    <ol class="list-decimal list-inside">
      <li v-for="direction in recipe.directions">
        {{ direction }}
      </li>
    </ol>
  </div>
  <SingleRecipeComments />
</template>
