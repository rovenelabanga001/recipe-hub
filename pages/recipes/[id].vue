<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();
const auth = useAuthStore();

const recipeId = route.params.id;
const { data: recipe, pending } = await useSafeFetch(
  `${config.public.baseUrl}/recipes/${recipeId}`,
  { key: `single-recipe:${recipeId}` }
);

const { data: user, pending: userPending } = await useAsyncData(
  `user-${recipeId}`,
  async () => {
    const recipeData = await $fetch(
      `${config.public.baseUrl}/recipes/${recipeId}`
    );
    return await $fetch(`${config.public.baseUrl}/users/${recipeData.userID}`);
  }
);

const goBack = () => {
  router.back();
};

provide("recipeId", recipeId);
</script>
<template>
  <IconsBack class="text-lg mb-4 bg-[orangered]" fill="white" @click="goBack" />
  <LoadingComponent v-if="pending" />
  <div
    v-else
    class="flex flex-col items-start gap-4 w-[100%] md:w-[80%] lg:w-[50%]"
  >
    <SingleRecipeHeader :recipe="recipe" />
    <img
      :src="recipe.image"
      class="h-[400px] rounded-xl object-cover w-[100%] md:min-h-[500px]"
    />
    <div class="flex items-center gap-4">
      <IconsUser />
      <p class="font-bold text-gray-400">{{ user.username }}</p>
    </div>
    <SingleRecipeBody :recipe="recipe" />
  </div>
</template>
