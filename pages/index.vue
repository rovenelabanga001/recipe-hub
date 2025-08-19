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
  <div v-else>
    <PopularRecipes />
    <PopularCategories />
  </div>
</template>
