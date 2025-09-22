<script setup>
const props = defineProps({
  mode: { type: String, default: "self" }, // "self" | "other"
  username: { type: String, default: "" },
});

const auth = useAuthStore();
const activeTab = useProfileActiveTabStore();
const { $authApi } = useNuxtApp();

// function to set default based on mode
const setDefaultTab = () => {
  if (props.mode === "other") {
    activeTab.setAcitveTab("Posts");
  } else {
    activeTab.setAcitveTab("Overview");
  }
};

// ensure correct default on mount
onMounted(() => {
  setDefaultTab();
});

const tabs =
  props.mode === "other"
    ? ["Posts"]
    : ["Overview", "Posts", "Comments", "Favorites"];

let userId = ref(null);

// Determine userId
if (props.mode === "other") {
  const { data: fetchedUser } = await useAsyncData(
    `user-${props.username}`,
    async () => {
      const res = await $authApi(`/users/username/${props.username}`);
      return res.data; 
    }
  );

  if (!fetchedUser.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `User "${props.username}" not found`,
      fatal: true,
    });
  }

  userId.value = fetchedUser.value.id;
} else {
  userId.value = auth.user?.id;
}


// Fetch posts
const { data: posts } = await useAsyncData(`posts-${userId.value}`, () =>
  $authApi(`/users/${userId.value}/recipes`)
);

// Fetch comments only in self mode
const { data: comments } =
  props.mode === "self"
    ? await useAsyncData(`comments-${auth.user.username}`, async () => {
        const res = await $authApi("/my-comments");
        return res.data; 
      })
    : { value: [] };

// Overview items (only for self)
const overviewItems = computed(() => {
  if (props.mode !== "self") return [];

  if (!posts.value || !comments.value) return [];

  const postsWithType = posts.value.map((p) => ({
    ...p,
    type: "post",
    sortDate: p.createdAt ?? null,
  }));

  const commentsWithType = comments.value.map((c) => ({
    ...c,
    type: "comment",
    sortDate: c.time ?? null,
  }));

  return [...postsWithType, ...commentsWithType]
    .filter((item) => item.sortDate)
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
    .slice(0, 4);
});
</script>
<template>
  <!-- Tabs -->
  <div class="grid grid-cols-3 gap-3 md:grid-cols-4 w-full lg:w-[50%]">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="activeTab.setAcitveTab(tab)"
      :class="[
        'px-3 py-1 rounded-2xl border cursor-pointer',
        activeTab.activeTab === tab
          ? 'bg-[orangered] text-white border-[orangered]'
          : 'text-[orangered] border-[orangered]',
      ]"
    >
      {{ tab }}
    </button>
  </div>

  <!-- Tab Content -->
  <div
    class="space-y-4 bg-gray-100 py-6 px-4 rounded-lg min-h-[500px] max-h-[550px] overflow-y-auto w-full lg:px-8"
  >
    <!-- Overview (self only) -->
    <template
      v-if="activeTab.activeTab === 'Overview' && props.mode === 'self'"
    >
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

    <!-- Posts (always visible) -->
    <template v-else-if="activeTab.activeTab === 'Posts'">
      <profile-page-body-posts v-if="posts.length >= 1" :posts="posts.reverse()" />
      <empty-placeholder
        v-else
        :message="
          props.mode === 'self'
            ? 'No posts yet'
            : `${username} has no posts yet`
        "
        :instructions="
          props.mode === 'self' ? 'Start by creating your first recipe' : ''
        "
        :btn-txt="props.mode === 'self' ? 'Add recipe' : ''"
        :route="props.mode === 'self' ? '/recipes/new' : ''"
        :show-btn="props.mode === 'self' ? true : false"
      />
    </template>

    <!-- Comments (self only) -->
    <template
      v-else-if="activeTab.activeTab === 'Comments' && props.mode === 'self'"
    >
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

    <!-- Favorites (self only) -->
    <template
      v-else-if="activeTab.activeTab === 'Favorites' && props.mode === 'self'"
    >
      <profile-page-body-favorites />
    </template>
  </div>
</template>
