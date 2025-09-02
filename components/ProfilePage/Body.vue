<script setup>
const auth = useAuthStore();
const config = useRuntimeConfig();
const tabs = ref(["Overview", "Posts", "Comments", "Favorites"]);

const activeTab = ref("Overview");

const { data: posts } = await useAsyncData("posts", () =>
  $fetch(`${config.public.baseUrl}/recipes?userID=${auth.user?.id}`)
);

const { data: comments } = await useAsyncData("comments", () =>
  $fetch(`${config.public.baseUrl}/comments?username=${auth.user.username}`)
);

const overviewItems = computed(() => {
  if (!posts.value || !comments.value) return [];

  const postsWithType = posts.value.map((p) => ({ ...p, type: "post" }));
  const commentsWithType = comments.value.map((c) => ({
    ...c,
    type: "comment",
  }));

  const combined = [...postsWithType, ...commentsWithType];
  return combined.slice(-4).reverse();
});
</script>
<template>
  <div class="grid grid-cols-4 space-x-3 w-[50%]">
    <button
      v-for="tab in tabs"
      @click="activeTab = tab"
      :class="[
        'px-3 py-1 rounded-2xl border',
        activeTab === tab
          ? 'bg-[orangered] text-white border-[orangered]'
          : 'text-[orangered] border-[orangered]',
      ]"
    >
      {{ tab }}
    </button>
  </div>
  <!-- Content -->
  <div v-if="activeTab === 'Overview'" class="space-y-4">
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
        class="mt-2 text-white w-40 text-start px-3 py-1 rounded-lg"
        :class="item.type === 'post' ? 'bg-[orangered]' : 'bg-red-500'"
      >
        {{ item.type === "post" ? "See Post" : "See Comment" }}
      </button>
    </div>
  </div>

  <div v-if="activeTab === 'Posts'" class="space-y-4">
    <div
      v-for="post in posts"
      :key="post.id"
      class="bg-white shadow rounded-xl p-4"
    >
      <h3 class="font-bold">📝 {{ post.title }}</h3>
      <p class="text-gray-600">{{ post.body }}</p>
    </div>
  </div>

  <div v-if="activeTab === 'Comments'" class="space-y-4">
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="bg-white shadow rounded-xl p-4"
    >
      <h3 class="font-bold">💬 Comment</h3>
      <p class="text-gray-600">{{ comment.body }}</p>
    </div>
  </div>
</template>
