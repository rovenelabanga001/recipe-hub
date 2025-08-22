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
  <div class="w-[100%] md:w-[100%]">
    <h5 class="font-bold text-lg mb-4">Comments</h5>
    <div class="flex flex-col gap-4 items-start w-[100%]">
      <CommentCard :comments="comments" />
    </div>
  </div>
</template>
