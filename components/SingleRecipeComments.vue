<script setup>
const recipeId = inject("recipeId");
const commentId = inject("commentId");
const config = useRuntimeConfig();
const auth = useAuthStore();

const { $authApi } = useNuxtApp();

const { data: comments } = await useAsyncData(
  `recipe-comments:${recipeId}`,
  () => $authApi(`/recipes/${recipeId}/comments`)
);

const loading = ref(false);

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
    loading.value = true;
    const savedComment = await $authApi("/comments", {
      baseURL: config.public.baseUrl,
      method: "POST",
      body: {
        recipe: recipeId,
        body: newComment.body,
      },
    });

    comments.value = [savedComment, ...comments.value.slice()];

    newComment.body = "";

    await refreshNuxtData(`comment-recipe:${recipeId}`);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleDelete = (commentId) => {
  comments.value = comments.value.filter((c) => c.id !== commentId);
  refreshNuxtData(`recipe-comments:${recipeId}`);
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
        class="bg-[orangered] text-white px-3 py-1 rounded-2xl self-end cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
        :disabled="loading"
        @click="onPostCommentClick"
      >
        <svg
          v-if="loading"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span>{{ loading ? "Posting..." : "Post" }}</span>
      </button>
    </div>
  </div>
</template>
