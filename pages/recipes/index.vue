<script setup>
const config = useRuntimeConfig();

const { data: allRecipes, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {},
  "Something went wrong, Please Try Again Later"
);

const currentPage = ref(1);

const pageSize = 8;

const searchTerm = ref("");

const totalPages = computed(() => {
  return allRecipes.value ? Math.ceil(allRecipes.value.length / pageSize) : 0;
});

const filteredRecipes = computed(() => {
  if (!allRecipes.value) return [];
  if (!searchTerm.value.trim()) return allRecipes.value;

  return allRecipes.value.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      recipe.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
const paginatedRecipes = computed(() => {
  if (!allRecipes.value) return [];
  const start = (currentPage.value - 1) * pageSize;
  return filteredRecipes.value.slice(start, start + pageSize);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

provide("searchTerm", searchTerm);
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div v-else>
    <div class="flex flex-col items-center justify-center mt-4 gap-10 w-full">
      <RecipesPageHeader :recipes="allRecipes" />
      <NotFoundComponent
        v-if="!filteredRecipes.length && searchTerm"
        :searchTerm="searchTerm"
      />
      <div class="flex flex-col items-center" v-else>
        <RecipesPageBody :recipes="paginatedRecipes" />
        <RecipesPageFooter
          :current-page="currentPage"
          :go-to-page="goToPage"
          :total-pages="totalPages"
        />
      </div>
    </div>
  </div>
</template>
