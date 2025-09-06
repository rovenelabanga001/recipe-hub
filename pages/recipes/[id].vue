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
const commentId = route.query.commentId;
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
provide("commentId", commentId);
const viewUserProfile = inject("viewUserProfile");
</script>
<template>
  <BackBtn />
  <LoadingComponent v-if="pending" />
  <div
    v-else
    class="flex flex-col items-start gap-4 w-[100%] md:w-[80%] lg:w-[50%] overflow-y-auto"
  >
    <SingleRecipeHeader :recipe="recipe" />
    <img
      :src="recipe.image"
      class="h-[400px] rounded-xl object-cover w-[100%] md:min-h-[500px]"
    />
    <div class="flex items-center gap-4">
      <IconsUser />
      <p class="font-bold text-gray-400">
        <span @click="viewUserProfile(user.username)" class="cursor-pointer">{{
          user.username
        }}</span>
      </p>
    </div>
    <SingleRecipeBody :recipe="recipe" />
  </div>
</template>
