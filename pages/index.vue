<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
const config = useRuntimeConfig();

const { pending: recipesPending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {},
  "Something went wrong, Please Try Again Later"
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
