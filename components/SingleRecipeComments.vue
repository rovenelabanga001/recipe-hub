<script setup>
const recipeId = inject("recipeId");
const config = useRuntimeConfig();
const { data: comments } = await useSafeFetch(
  `${config.public.baseUrl}/comments?recipeId=${recipeId}`,
  {
    key: `comment-recipe: ${recipeId}`,
  }
);

const newComment = reactive({
  body: "",
});

const onPostCommentClick = async () => {
  try {
  } catch (error) {}
};
console.log(new Date());
</script>
<template>
  <div class="w-[100%] md:w-[100%]">
    <h5 class="font-bold text-lg mb-4">Comments</h5>
    <div class="flex flex-col gap-4 items-start w-[100%]">
      <CommentCard :comments="comments" />
    </div>
    <div class="mt-3 flex flex-col items-start gap-2">
      <h5 class="font-bold text-lg mb-4">Add Comment</h5>
      <textarea
        v-model="newComment.body"
        class="border border-gray-300 w-full rounded-xl min-h-[80px] p-3 focus:outline-none focus:ring-2 focus:ring-[orangered]-500 focus:border-[orangered]-500"
      ></textarea>
      <button
        class="bg-[orangered] text-white px-3 py-1 rounded-2xl self-end cursor-pointer"
      >
        Post
      </button>
      {{ newComment.body }}
    </div>
  </div>
</template>
