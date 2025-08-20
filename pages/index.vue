<script setup>
const config = useRuntimeConfig();

const { pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {},
  "Something went wrong, Please Try Again Later"
);
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div v-else class="flex flex-col gap-6">
    <PopularRecipes />
    <PopularCategories />
    <QuickRecipes />
    <TopUsers />
  </div>
</template>
