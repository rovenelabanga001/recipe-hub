<script setup>
const config = useRuntimeConfig();
const props = defineProps(["user"]);
const showTags = ref(false);

const { data: userRecipes } = await useSafeFetch(
  `${config.public.baseUrl}/recipes?userID=${props.user?.id}`,
  {
    key: "user-recipes",
    transform: (userRecipes) => userRecipes.slice(0, 3),
  }
);

console.log("Recipes:", userRecipes.value, "User Id:", props.user.username);
console.log(props.user.id);
</script>
<template>
  <div class="flex gap-5 items-center">
    <h6>{{ user.recipeCount }} recipes</h6>
    <ViewAllBtn />
  </div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <RecipeCard
      :recipes="userRecipes"
      :show-tags="showTags"
      card-class="max-h-[200px] h-[10rem]"
      text-attributes="text-sm text-black-500"
    />
  </div>
</template>
