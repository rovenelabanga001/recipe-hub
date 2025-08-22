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
</script>
<template>
  <LoadingComponent v-if="pending" />
  <div v-else class="flex flex-col items-start gap-4 w-[100%] md:w-[40%]">
    <SingleRecipeHeader :recipe="recipe" />
    <img
      :src="recipe.image"
      class="h-[auto] rounded-xl object-cover w-[70%] md:w-[100%]"
    />
    <div>
      <h3 class="font-bold text-lg">Details</h3>
      <ol>
        <li>prep time:{{ recipe.prepTime }}</li>
        <li>cook time: {{ recipe.cookTime }}</li>
        <li>servings: {{ recipe.servings }}</li>
      </ol>
    </div>
  </div>
</template>
