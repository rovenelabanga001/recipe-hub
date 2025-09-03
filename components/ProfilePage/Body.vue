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
  <div class="grid grid-cols-2 gap-3 w-[50%] md:grid-cols-4">
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
  <div
    v-if="activeTab === 'Overview'"
    class="space-y-4 bg-gray-200 py-6 px-10 rounded-lg min-h-[500px]"
  >
    <h5>Showing recent contributions</h5>
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
        @click="
          item.type === 'post'
            ? navigateTo(`/recipes/${item.id}`)
            : navigateTo(`/recipes/${item.recipeId}?commentId=${item.id}`)
        "
        class="mt-2 text-white w-[auto] text-start px-3 py-1 rounded-lg bg-[orangered] cursor-pointer"
      >
        {{ item.type === "post" ? "See Post" : "See Comment" }}
      </button>
    </div>
  </div>

  <div
    v-if="activeTab === 'Posts'"
    class="space-y-4 bg-gray-200 py-6 px-10 rounded-lg min-h-[500px]"
  >
    <h5>Showing recent posts</h5>
    <div
      v-for="post in posts"
      :key="post.id"
      class="bg-white shadow rounded-xl p-4 space-y-3"
    >
      <h3 class="font-bold">📝 {{ post.title }}</h3>
      <p class="text-gray-600">{{ post.body }}</p>
      <button
        @click="navigateTo(`recipes/${post.id}`)"
        class="bg-[orangered] px-2 py-1 text-white rounded-lg cursor-pointer"
      >
        See Post
      </button>
    </div>
  </div>

  <div
    v-if="activeTab === 'Comments'"
    class="space-y-4 bg-gray-200 py-6 px-10 rounded-lg min-h-[500px]"
  >
    <h5>Showing recent comments</h5>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="bg-white shadow rounded-xl p-4"
    >
      <h3 class="font-bold">💬 Comment</h3>
      <p class="text-gray-600">{{ comment.body }}</p>
      <button
        @click="navigateTo(`/recipes/${item.recipeId}?commentId=${item.id}`)"
        class="bg-[orangered] px-2 py-1 text-white rounded-lg cursor-pointer"
      >
        See Comment
      </button>
    </div>
  </div>
</template>
