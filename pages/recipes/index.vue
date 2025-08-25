<script setup>
const config = useRuntimeConfig();

const recipeCategoryStore = useRecipeCategoryStore();

const { data: allRecipes, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {},
  "Something went wrong, Please Try Again Later"
);

const currentPage = ref(1);

const pageSize = 8;

const searchTerm = ref("");

const { selectedCategory } = storeToRefs(recipeCategoryStore);

const totalPages = computed(() => {
  return filteredRecipes.value
    ? Math.ceil(filteredRecipes.value.length / pageSize)
    : 0;
});

const filteredRecipes = computed(() => {
  if (!allRecipes.value) return [];

  const q = (searchTerm.value || "").trim().toLowerCase();
  const cat = selectedCategory.value;

  return allRecipes.value.filter((recipe) => {
    const matchesSearch =
      !q ||
      recipe.title?.toLowerCase().includes(q) ||
      recipe.name?.toLowerCase().includes(q);

    const matchesCategory =
      !cat ||
      cat === "All" ||
      recipe.category?.some((c) => c?.toLowerCase() === cat.toLowerCase());

    return matchesSearch && matchesCategory;
  });
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

watch([searchTerm, () => recipeCategoryStore.selectedCategory], () => {
  currentPage.value = 1;
});

provide("searchTerm", searchTerm);
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div v-else>
    <div class="flex flex-col items-center justify-center mt-4 gap-10 w-full">
      <RecipesPageHeader :recipes="allRecipes" />
      <NotFoundComponent
        v-if="
          !filteredRecipes.length &&
          (searchTerm || (selectedCategory && selectedCategory !== 'All'))
        "
        :searchTerm="searchTerm"
        :selectedCategory="selectedCategory"
        :has-results="filteredRecipes.length > 0"
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
