<script setup>
const config = useRuntimeConfig();
const props = defineProps(["user"]);
const showTags = ref(false);

const { $authApi } = useNuxtApp();

const { data: userRecipes } = await useAsyncData(
  `user-recipes-${props.user?.id}`,
  () => $authApi(`/users/${props.user?.id}/recipes`).then(r => r.slice(-6))
);
const viewUserProfile = inject("viewUserProfile");
</script>
<template>
  <div class="flex gap-5 items-center">
    <h6 class="font-bold">{{ user.recipeCount }} recipes</h6>
    <ViewAllBtn @click="viewUserProfile(props.user.username)" />
  </div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <RecipeCard
      :recipes="userRecipes"
      :show-tags="showTags"
      card-class="max-h-[200px] h-[8rem]"
      text-attributes="lg:text-xs md:text-xs text-xs"
    />
  </div>
</template>
