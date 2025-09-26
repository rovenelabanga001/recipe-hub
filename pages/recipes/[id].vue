<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();
const { $authApi } = useNuxtApp();

const recipeId = route.params.id;
const commentId = route.query.commentId;
const { data: recipe, pending } = await useAsyncData(
  `recipe-${recipeId}`,
  async () => {
    const res = await $authApi(`recipes/${recipeId}`);
    return res;
  }
);

const { data: user } = await useAsyncData(`user-${recipeId}`, async () => {
  const res = await $authApi(`recipes/${recipeId}/user`);
  return res;
});

const goBack = () => {
  router.back();
};

provide("recipeId", recipeId);
provide("commentId", commentId);
const viewUserProfile = inject("viewUserProfile");
</script>
<template>
  <BackBtn />
  <div
    v-if="recipe"
    class="flex flex-col items-start gap-4 w-[100%] md:w-[80%] lg:w-[50%] overflow-y-auto"
  >
    <SingleRecipeHeader :recipe="recipe" />
    <img
      :src="recipe?.image"
      class="h-[400px] rounded-xl object-cover w-[100%] md:min-h-[500px]"
    />
    <div
      class="flex items-center gap-4 cursor-pointer"
      @click="viewUserProfile(user.username)"
    >
      <UserNameCard :user-id="user?.id" />
      <p class="font-bold text-gray-400">
        <span>{{ user.username }}</span>
      </p>
    </div>
    <SingleRecipeBody :recipe="recipe" />
  </div>
</template>
