<script setup>
const config = useRuntimeConfig();

const { data: allRecipes, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {},
  "Something went wrong, Please Try Again Later"
);
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div v-else>
    <div class="flex flex-col items-center justify-center mt-4 gap-10 w-full">
      <RecipesPageHeader />
      <h6 class="md:text-2xl text-lg font-bold text-gray-900 self-start">
        Recipes
      </h6>
    </div>
  </div>
</template>
