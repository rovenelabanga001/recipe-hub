<script setup>
const recipeId = inject("recipeId");
const config = useRuntimeConfig();
const { data: comments } = await useSafeFetch(
  `${config.public.baseUrl}/comments?recipeId=${recipeId}`,
  {
    key: `comment-recipe: ${recipeId}`,
  }
);
</script>
<template>
  <div>
    <h5 class="font-bold text-lg">Comments</h5>
    <div v-for="comment in comments" class="flex gap-4 items-start">
      <IconsUser class="max-w-14 max-h-14" />
      <div class="flex flex-col items-start">
        <p class="text-gray-400 text-xs">{{ comment.username }}</p>
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>
