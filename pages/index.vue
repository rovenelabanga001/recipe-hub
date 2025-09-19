<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
const { $authApi } = useNuxtApp();

const { pending: recipesPending } = await useAsyncData("recipes", () =>
  $authApi("/recipes/popular")
);
</script>
<template>
  <LoadingComponent v-if="recipesPending" />
  <div class="h-screen w-full">
    <PopularRecipes />
    <PopularCategories />
    <QuickRecipes />
    <TopUsers />
  </div>
</template>
