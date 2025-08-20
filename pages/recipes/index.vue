<script setup>
const config = useRuntimeConfig();

const { data: allRecipes, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {},
  "Something went wrong, Please Try Again Later"
);

const currentPage = ref(1);

const pageSize = 4;

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
      <div class="flex gap-2 mt-6">
        <button
          class="px-3 py-1 rounded-xl bg-gray-200 hover:bg-gray-400 disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Prev
        </button>
        <div class="flex gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            class="px-3 py-1 rounded"
            :class="
              page === currentPage
                ? 'bg-[orangered] text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            "
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
        <button
          class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
