<script setup>
const auth = useAuthStore();
const config = useRuntimeConfig();
const tabs = ref(["Overview", "Posts", "Comments", "Favorites"]);

const activeTab = useProfileActiveTabStore();

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
  <div class="grid grid-cols-3 gap-3 md:grid-cols-4 w-[100%] lg:w-[50%]">
    <button
      v-for="tab in tabs"
      @click="activeTab.setAcitveTab(tab)"
      :class="[
        'px-3 py-1 rounded-2xl border cursor-pointer w-[auto]',
        activeTab.activeTab === tab
          ? 'bg-[orangered] text-white border-[orangered]'
          : 'text-[orangered] border-[orangered]',
      ]"
    >
      {{ tab }}
    </button>
  </div>
  <div
    class="space-y-4 bg-gray-100 py-6 px-4 rounded-lg min-h-[500px] w-[100%] lg:px-8"
  >
    <!-- Overview -->
    <template v-if="activeTab.activeTab === 'Overview'">
      <profile-page-body-overview
        v-if="overviewItems.length >= 1"
        :overview-items="overviewItems"
      />
      <empty-placeholder
        v-else
        message="No recent activities"
        instructions="Your activity will show up here once you engage with the app."
        btn-txt="Engage"
        route="/"
      />
    </template>

    <!-- Posts -->
    <template v-else-if="activeTab.activeTab === 'Posts'">
      <profile-page-body-posts v-if="posts.length >= 1" :posts="posts" />
      <empty-placeholder
        v-else
        message="No posts yet"
        instructions="Start by creating your first recipe"
        btn-txt="Add recipe"
        route="/recipes/new"
      />
    </template>

    <!-- Comments -->
    <template v-else-if="activeTab.activeTab === 'Comments'">
      <profile-page-body-comments
        v-if="comments.length >= 1"
        :comments="comments"
      />
      <empty-placeholder
        v-else
        message="Looks quiet in here 👀"
        instructions="Go ahead and comment on a post"
        btn-txt="Explore recipes"
        route="/recipes"
      />
    </template>

    <!-- Favorites -->
    <template v-else-if="activeTab.activeTab === 'Favorites'">
      <profile-page-body-favorites />
    </template>
  </div>
</template>
