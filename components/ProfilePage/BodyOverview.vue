<script setup>
const auth = useAuthStore();
const config = useRuntimeConfig();
const { data: posts } = await useAsyncData("posts", () =>
  $fetch(`${config.public.baseUrl}/recipes?userID=${auth.user?.id}`)
);

const { data: comments } = await useAsyncData("comments", () =>
  $fetch(`${config.public.baseUrl}/comments?username=${auth.user.username}`)
);

const overviewItems = computed(() => {
  if (!posts.value || comments.value) return [];

  const postsWithType = posts.value.map((p) => ({ ...p, type: "post" }));
  const commentsWithType = comments.value.map((c) => ({
    ...c,
    type: "comment",
  }));

  // Merge
  const combined = [...postsWithType, ...commentsWithType];

  return combined.slice(-4).reverse();
});
</script>
<template>
  <div class="space-y-4">
    <div
      v-for="(item, i) in overviewItems"
      :key="i"
      class="bg-white shadow rounded-xl p-4"
    >
      <h3 class="font-bold">
        <span v-if="item.type === 'post'">📝 {{ item.title }}</span>
        <span v-else>💬 Comment: {{ item.body }}</span>
      </h3>
      <p class="text-gray-600 text-sm">
        {{ item.body || item.description }}
      </p>
      <button
        class="mt-2 text-white px-3 py-1 rounded-lg"
        :class="item.type === 'post' ? 'bg-[orangered]' : 'bg-red-500'"
      >
        {{ item.type === "post" ? "See Post" : "See Comment" }}
      </button>
    </div>
  </div>
</template>
