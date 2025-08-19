<script setup>
import LoadingComponent from "~/components/LoadingComponent.vue";

definePageMeta({
  layout: "no-navbar-layout",
});

const route = useRoute();
const config = useRuntimeConfig();

const category = route.params.name;

const { data: recipes, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {
    key: "all-recipes",
  }
);

const filteredRecipes = computed(() => {
  if (!recipes.value) return [];
  return recipes.value.filter((recipe) =>
    recipe.category.some((c) => c.toLowerCase() === category.toLowerCase())
  );
});
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div v-else>
    <h1 class="text-xl text-[orangered] mb-4">{{ category }}</h1>
    <div v-if="filteredRecipes.length === 0">
      <p class="text-gray-500 text-lg">No recipes found for {{ category }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <RecipeCard :recipes="filteredRecipes" />
    </div>
  </div>
</template>
