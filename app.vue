<script setup>
const goToSingleRecipe = (recipeId) => {
  navigateTo(`/recipes/${recipeId}`);
};

provide("goToSingleRecipe", goToSingleRecipe);
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
