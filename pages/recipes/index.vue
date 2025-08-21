<script setup>
const config = useRuntimeConfig();

const { data: allRecipes, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {},
  "Something went wrong, Please Try Again Later"
);

const currentPage = ref(1);

const pageSize = 8;

const totalPages = computed(() => {
  return allRecipes.value ? Math.ceil(allRecipes.value.length / pageSize) : 0;
});

const paginatedRecipes = computed(() => {
  if (!allRecipes.value) return [];
  const start = (currentPage.value - 1) * pageSize;
  return allRecipes.value.slice(start, start + pageSize);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div v-else>
    <div class="flex flex-col items-center justify-center mt-4 gap-10 w-full">
      <RecipesPageHeader :recipes="allRecipes" />
      <RecipesPageBody :recipes="paginatedRecipes" />
      <RecipesPageFooter
        :current-page="currentPage"
        :go-to-page="goToPage"
        :total-pages="totalPages"
      />
    </div>
  </div>
</template>
