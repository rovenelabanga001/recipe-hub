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
    `user-by-username-${props.username}`,
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
const { data: posts, pending: postsLoading } = await useAsyncData(
  `user-posts-${userId.value}`,
  async () => {
    const res = await $authApi(`users/${userId.value}/recipes`);
    return Array.isArray(res) ? res : [];
  }
);

// Fetch comments only in self mode
const { data: comments, pending: commentsLoading } =
  props.mode === "self"
    ? await useAsyncData(`comments-${auth.user.username}`, async () => {
        const res = await $authApi("/my-comments");
        return res.data;
      })
    : { data: ref([]), pending: ref(false) };

// combined loading state
const loading = computed(() => postsLoading.value || commentsLoading.value);
// Overview items (only for self)
const overviewItems = computed(() => {
  if (props.mode !== "self") return [];
  if (!posts.value || !comments.value) return [];

  // Add type and a common date field
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
    .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate)) // sort descending by date
    .slice(0, 4); // get latest 4
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
        'py-1 rounded-2xl border cursor-pointer w-auto',
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
      <div
        v-if="loading"
        class="w-full h-full flex items-center justify-center"
      >
        <loading-component class="w-10 h-10" />
      </div>
      <profile-page-body-overview
        v-else-if="overviewItems.length >= 1"
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
      <div
        v-if="postsLoading"
        class="w-full h-full flex items-center justify-center"
      >
        <loading-component class="w-10 h-10" />
      </div>
      <profile-page-body-posts
        v-else-if="posts.length >= 1"
        :posts="posts.reverse()"
      />
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
      <div
        v-if="commentsLoading"
        class="w-full h-full flex items-center justify-center"
      >
        <loading-component class="w-10 h-10" />
      </div>
      <profile-page-body-comments
        v-else-if="comments.length >= 1"
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
