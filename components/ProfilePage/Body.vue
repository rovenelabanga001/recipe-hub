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
        'px-3 py-1 rounded-2xl border cursor-pointer',
        activeTab === tab
          ? 'bg-[orangered] text-white border-[orangered]'
          : 'text-[orangered] border-[orangered]',
      ]"
    >
      {{ tab }}
    </button>
  </div>
  <!-- <div class="space-y-4 bg-gray-100 py-6 px-10 rounded-lg min-h-[500px]">
    <profile-page-body-overview
      v-if="activeTab === 'Overview' && overviewItems.length >= 1"
      :overview-items="overviewItems"
    />
    <empty-placeholder
      v-else
      message="No recent activities"
      instructions="Your activity will show up here once you engage with the app."
    />
    <profile-page-body-posts
      v-if="activeTab === 'Posts' && posts.length >= 1"
      :posts="posts"
    />
    <empty-placeholder
      v-else
      message="No posts yet"
      instructions="Start by creating your first recipe"
    />
    <profile-page-body-comments
      v-if="activeTab === 'Comments' && comments.length >= 1"
      :comments="comments"
    />
    <empty-placeholder
      v-else
      message="Looks quiet in here 👀."
      instructions="Go ahead and comment on a post"
    />
    <profile-page-body-favorites v-if="activeTab === 'Favorites'" />
  </div> -->
  <div class="space-y-4 bg-gray-100 py-6 px-10 rounded-lg min-h-[500px]">
    <!-- Overview -->
    <template v-if="activeTab === 'Overview'">
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
    <template v-else-if="activeTab === 'Posts'">
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
    <template v-else-if="activeTab === 'Comments'">
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
    <template v-else-if="activeTab === 'Favorites'">
      <profile-page-body-favorites />
    </template>
  </div>
</template>
