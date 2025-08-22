<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const recipeId = route.params.id;

const { data: recipe, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes/${recipeId}`,
  {
    key: `single-recipe:${recipeId}`,
  }
);

const user = ref(null);

watch(recipe, async (newRecipe) => {
  if (newRecipe?.userID) {
    const { data } = await useSafeFetch(
      `${config.public.baseUrl}/users/${newRecipe.userID}`,
      { key: `user:${newRecipe.userID}` }
    );
    user.value = data.value;
  }
});
provide("recipeId", recipeId);
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div
    v-else
    class="flex flex-col items-start gap-4 w-[100%] md:w-[80%] lg:w-[50%]"
  >
    <SingleRecipeHeader :recipe="recipe" />
    <img
      :src="recipe.image"
      class="h-[auto] rounded-xl object-cover w-[70%] md:w-[100%]"
    />
    <SingleRecipeBody :recipe="recipe" />
  </div>
</template>
