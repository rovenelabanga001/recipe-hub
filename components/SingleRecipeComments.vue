<script setup>
const recipeId = inject("recipeId");
const commentId = inject("commentId");
const config = useRuntimeConfig();
const auth = useAuthStore();

const { data: comments } = await useSafeFetch(
  `${config.public.baseUrl}/comments?recipeId=${encodeURIComponent(recipeId)}`,
  {
    key: `comment-recipe: ${recipeId}`,
  }
);

onMounted(() => {
  if (commentId) {
    const stop = watch(
      () => comments.value,
      async (newVal) => {
        if (newVal?.length) {
          await nextTick(); // wait until DOM updates

          const elId = `comment-${commentId}`;
          const el = document.getElementById(elId);

          if (el) {
            // Scroll the element into view
            el.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });

            // Highlight effect
            el.classList.add(
              "bg-yellow-100",
              "transition-colors",
              "duration-700"
            );
            // setTimeout(() => el.classList.remove("bg-yellow-100"), 3000);

            stop(); // ✅ stop watching once done
          }
        }
      },
      { immediate: true }
    );
  }
});

const newComment = reactive({
  body: "",
});

const onPostCommentClick = async () => {
  try {
    const savedComment = await $fetch("/comments", {
      baseURL: config.public.baseUrl,
      method: "POST",
      body: {
        username: auth.user.username,
        recipeId: recipeId,
        body: newComment.body,
        time: new Date().toISOString(),
      },
    });

    comments.value = [savedComment, ...comments.value.slice()];

    newComment.body = "";

    //Fetch recipe to know the owner
    const recipe = await $fetch(`/recipes/${recipeId}`, {
      baseURL: config.public.baseUrl,
    });

    //Create a notification for the recipe owner (skip if commenting on own post)
    if (recipe.userID !== auth.user.id) {
      await $fetch("/notifications", {
        baseURL: config.public.baseUrl,
        method: "POST",
        body: {
          userId: recipe.userID,
          type: "comment",
          user: auth.user.username,
          message: `${auth.user.username} commented on your recipe "${recipe.title}"`,
          postId: recipeId,
          createdAt: new Date().toISOString(),
          read: false,
          commentId: savedComment.id,
        },
      });
    }

    await refreshNuxtData(`comment-recipe:${recipeId}`);
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = (commentId) => {
  comments.value = comments.value.filter((c) => c.id !== commentId);
};
</script>
<template>
  <div class="w-[100%] md:w-[100%]">
    <h5 class="font-bold text-lg mb-4">Comments</h5>
    <div class="flex flex-col gap-4 items-start w-[100%]">
      <CommentCard
        :comments="comments"
        @delete="handleDelete"
        v-if="comments.length >= 1"
      />
      <p v-else class="text-gray-500 text-sm">No comments yet</p>
    </div>
    <div class="mt-3 flex flex-col items-start gap-2">
      <h5 class="font-bold text-lg mb-4">Add Comment</h5>
      <textarea
        v-model="newComment.body"
        class="border border-gray-300 w-full rounded-xl min-h-[80px] p-3 focus:outline-none focus:border-2 focus:border-[orangered] focus:ring-0"
      ></textarea>

      <button
        class="bg-[orangered] text-white px-3 py-1 rounded-2xl self-end cursor-pointer"
        @click="onPostCommentClick"
      >
        Post
      </button>
    </div>
  </div>
</template>
